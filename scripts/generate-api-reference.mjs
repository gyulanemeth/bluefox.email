/**
 * Generates static, indexable markdown pages for every resource in the bluefox.email
 * public API - one page per OpenAPI tag, written directly into docs/api/ alongside the
 * hand-written pages there - plus a manifest the VitePress sidebar reads to list them. Run
 * manually with `npm run docs:generate-api` whenever the API's OpenAPI spec changes - the
 * output is committed like any other doc page, not regenerated on every `vitepress dev`/
 * `vitepress build`. There is no standalone listing page - every resource is reachable from
 * the sidebar, which is populated straight from the manifest.
 *
 * Replaces the old client-only API Explorer (which fetched the spec in the browser and never
 * appeared in VitePress's static HTML output, so none of it got indexed) with real markdown
 * files VitePress renders to static HTML like any other doc page.
 */
import { writeFileSync, mkdirSync, rmSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'
import { loadEnv } from 'vitepress'

// Shared with docs/api/*.md (contacts-management.md, index.md, etc.) - unlike the old dedicated
// docs/api/reference/ subfolder, generation must only ever touch files it itself wrote (tracked
// via MANIFEST_PATH below), never wipe the whole directory.
const OUT_DIR = 'docs/api'
const MANIFEST_PATH = '.vitepress/api-reference-manifest.json'

const env = loadEnv('', process.cwd())
const specUrl = `${env.VITE_BLUEFOX_URL || 'https://api.bluefox.email'}/v1/openapi.json`

let spec
try {
  const res = await fetch(specUrl)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  spec = await res.json()
} catch (e) {
  console.log(`generate-api-reference: could not load ${specUrl} (${e.message}) - skipping generation, keeping any existing pages`)
  process.exit(0)
}

function resolveRef(value) {
  if (!value) return value
  if (value.$ref) {
    const [, , category, name] = value.$ref.split('/')
    return spec.components[category]?.[name]
  }
  return value
}

function slugify(tag) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// Sidebar order: grouped by what a user is doing, not the OpenAPI tag order - account/project
// setup, then email content & sending, then contacts & audience. Any tag added to the spec later
// that isn't listed here just falls in at the end, in spec order, instead of disappearing.
const RESOURCE_ORDER = [
  // Project setup
  'Project',
  'Sender Identities',
  'Domains',
  'Webhook',
  'Sending Setup',
  'BYO AWS',
  'Production Access',
  'Design Systems',
  // Email content & sending
  'Templates',
  'Campaigns',
  'Transactional Emails',
  'Triggered Emails',
  'Send Email',
  'Test Email',
  'Email Error Log',
  // Contacts & audience
  'Contacts',
  'Segments',
  'Subscriber Lists',
  'Subscriptions',
  'Signup Forms',
  'Suppression List',
]

const operationsByTag = {}
for (const [path, methods] of Object.entries(spec.paths || {})) {
  for (const [method, operation] of Object.entries(methods)) {
    for (const tag of operation.tags || ['Other']) {
      operationsByTag[tag] = operationsByTag[tag] || []
      operationsByTag[tag].push({ method: method.toUpperCase(), path, ...operation })
    }
  }
}

const specTagOrder = (spec.tags || []).map((t) => t.name).filter((t) => operationsByTag[t]?.length)
const tags = [...specTagOrder].sort((a, b) => {
  const ai = RESOURCE_ORDER.indexOf(a)
  const bi = RESOURCE_ORDER.indexOf(b)
  if (ai === -1 && bi === -1) return 0
  if (ai === -1) return 1
  if (bi === -1) return -1
  return ai - bi
})

// Spec text (merge tag docs like "{{verifyLink}}", filter param names like "filter[<field>]")
// legitimately contains "{{...}}" and "<...>" - VitePress renders markdown output through Vue's
// compiler, which treats "{{" in ANY text node (even inside inline `code` spans and table cells)
// as an interpolation expression, and "<field>" as an unclosed HTML tag. HTML-entity-escape both
// in anything sourced from the spec before it reaches markdown.
function escapeSpecText(text) {
  return String(text ?? '')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeCell(text) {
  return escapeSpecText(text).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ')
}

function mdParagraph(text) {
  return escapeSpecText(text).replace(/\r?\n/g, '  \n')
}

// escapeCell() below is responsible for escaping the pipes this can introduce - don't pre-escape here too.
function fieldType(rules) {
  if (rules.enum) return `${rules.type || 'string'} (${rules.enum.join(' | ')})`
  if (rules.type === 'array') return `array${rules.items?.type ? ` of ${rules.items.type}` : ''}`
  return rules.type || 'any'
}

// Flattens a (possibly nested) object schema into dotted-path table rows, e.g. `data.name`,
// `subscriberLists[].id` - avoids nesting markdown tables inside table cells, which GFM can't render.
function schemaRows(schema, prefix = '') {
  const rows = []
  for (const [name, rules] of Object.entries(schema.properties || {})) {
    const path = prefix ? `${prefix}.${name}` : name
    const required = (schema.required || []).includes(name)
    rows.push([path, fieldType(rules), required ? 'yes' : '', rules.description])
    if (rules.type === 'object' && rules.properties) {
      rows.push(...schemaRows(rules, path))
    } else if (rules.type === 'array' && rules.items?.type === 'object' && rules.items.properties) {
      rows.push(...schemaRows(rules.items, `${path}[]`))
    }
  }
  return rows
}

function schemaTable(schema) {
  const rows = schemaRows(schema)
  if (!rows.length) return ''
  const lines = ['| Field | Type | Required | Description |', '| --- | --- | --- | --- |']
  for (const [field, type, required, description] of rows) {
    lines.push(`| \`${field}\` | ${escapeCell(type)} | ${required} | ${escapeCell(description)} |`)
  }
  return lines.join('\n')
}

// Wraps a markdown table in a styling hook (see .api-ref-table in style.css) that keeps
// short, space-free columns (Name/Field, In, Required) on one line and lets the columns that
// can legitimately hold long text - Type (enum lists like "string (sandbox | production |
// byoAwsSes)") and Description - wrap and share the leftover space instead. The variant tells
// the CSS which column index is Type, since that differs between the params/body/responses
// table shapes below. Blank lines on both sides are required - without them markdown-it treats
// the whole block as one HTML block and never parses the table.
function wrapTable(md, variant) {
  return `<div class="api-ref-table api-ref-table--${variant}">\n\n${md}\n\n</div>`
}

function requestBodySchema(op) {
  return resolveRef(op.requestBody?.content?.['application/json']?.schema)
}

// The success response is usually wrapped as { status, result: <the interesting part> } -
// unwrap `result` so the schema table shows the payload shape instead of the envelope.
function responseBodySchema(response) {
  const schema = resolveRef(response?.content?.['application/json']?.schema)
  if (!schema) return null
  const result = schema.properties?.result
  return result ? resolveRef(result) : schema
}

function renderOperation(op) {
  // Heading text feeds the "On this page" outline, so it needs to be the human-readable summary,
  // not the method+path - every operation's outline entry was otherwise "POST /v1/projectId/..."
  // and got truncated to indistinguishable duplicates. The method+path still appears right below,
  // just outside the heading.
  const heading = op.summary ? escapeSpecText(op.summary) : `${op.method} ${op.path}`
  const parts = [`## ${heading}`, `\`${op.method} ${op.path}\``]

  if (op.description) parts.push(mdParagraph(op.description))

  if (op.parameters?.length) {
    const lines = ['| Name | In | Type | Required | Description |', '| --- | --- | --- | --- | --- |']
    for (const p of op.parameters) {
      lines.push(`| \`${escapeSpecText(p.name)}\` | ${p.in} | ${escapeCell(p.schema?.type)} | ${p.required ? 'yes' : ''} | ${escapeCell(p.description)} |`)
    }
    parts.push('### Parameters', wrapTable(lines.join('\n'), 'params'))
  }

  const reqSchema = requestBodySchema(op)
  if (reqSchema) {
    const table = schemaTable(reqSchema)
    if (table) parts.push('### Request body', wrapTable(table, 'body'))
  }

  if (op.responses) {
    const codes = Object.keys(op.responses).sort()
    const lines = ['| Status | Description |', '| --- | --- |']
    let successBody = null
    for (const code of codes) {
      const response = resolveRef(op.responses[code])
      lines.push(`| ${code} | ${escapeCell(response?.description)} |`)
      if (!successBody && code.startsWith('2')) successBody = responseBodySchema(op.responses[code])
    }
    parts.push('### Responses', wrapTable(lines.join('\n'), 'responses'))
    if (successBody) {
      const table = schemaTable(successBody)
      if (table) parts.push('### Response body', wrapTable(table, 'body'))
    }
  }

  return parts.join('\n\n')
}

// YAML plain scalars break on a bare ": " mid-string (and our descriptions contain one, e.g.
// "... API: parameters, ..."), so every frontmatter string value is JSON-stringified - YAML's
// double-quoted scalar syntax is a compatible superset of JSON string escaping.
function yamlString(str) {
  return JSON.stringify(str)
}

function pageFrontmatter(tag) {
  const title = `${tag} API Reference | bluefox.email documentation`
  const description = `Every ${tag} endpoint in the bluefox.email API: parameters, request body, and response schemas.`
  const url = `https://bluefox.email/docs/api/${slugify(tag)}`
  return `---
title: ${yamlString(title)}
description: ${yamlString(description)}
head:
  - - meta
    - name: description
      content: ${yamlString(description)}
  - - meta
    - property: og:title
      content: ${yamlString(title)}
  - - meta
    - property: og:description
      content: ${yamlString(description)}
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: ${yamlString(url)}
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: ${yamlString(title)}
  - - meta
    - name: twitter:description
      content: ${yamlString(description)}
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---`
}

function renderPage(tag) {
  const ops = operationsByTag[tag]
  const intro = `Full reference for the **${tag}** resource in the bluefox.email API. See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.`
  const body = ops.map(renderOperation).join('\n\n')
  return `${pageFrontmatter(tag)}\n\n# ${tag}\n\n${intro}\n\n${body}\n`
}

// Remove only the files the previous run generated (per the old manifest) - never the whole
// OUT_DIR, which also holds hand-written pages like docs/api/index.md. Covers a tag being
// renamed or removed (e.g. the old "aws-setup" slug when that tag later split in two).
if (existsSync(MANIFEST_PATH)) {
  const oldManifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf-8'))
  for (const { slug } of oldManifest) {
    rmSync(join(OUT_DIR, `${slug}.md`), { force: true })
  }
}
mkdirSync(OUT_DIR, { recursive: true })

const manifest = []
for (const tag of tags) {
  const slug = slugify(tag)
  writeFileSync(join(OUT_DIR, `${slug}.md`), renderPage(tag))
  manifest.push({ tag, slug, count: operationsByTag[tag].length })
}

mkdirSync('.vitepress', { recursive: true })
writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2))

console.log(`generate-api-reference: wrote ${manifest.length} resource pages to ${OUT_DIR}/`)
