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
  'Production Access',
  'BYO AWS',
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

// The spec's tags carry no descriptions, so every generated page used to share one templated meta
// description and intro - Google left them "Discovered - currently not indexed". Hand-written per-tag
// copy gives each page a unique description and an intro with contextual links to the product docs.
// Intros are trusted markdown (not spec text), so they skip escapeSpecText(). A tag missing here
// falls back to the generic copy.
const TAG_INFO = {
  'Project': {
    description: 'Get and update BlueFox Email project settings over the REST API, including the sending status: sandbox, production, or BYO AWS SES.',
    intro: 'Use the **Project** endpoints to read a project\'s settings, including its sending status, and to update them. The same settings are editable in the app under [Project Settings](/docs/projects/settings).',
  },
  'Sender Identities': {
    description: 'List, add, delete, and set the default sender identity (the From address) for a BlueFox Email project via the REST API.',
    intro: 'A **sender identity** is the From address your emails are sent from. These endpoints list a project\'s identities, add new ones, set the default, and delete them. Add and verify the domain first with the [Domains API](/docs/api/domains). For the in-app flow, see [Managing Identities in Production Mode](/docs/projects/delivery-modes#managing-identities-in-production-mode).',
  },
  'Domains': {
    description: 'Add a sending domain, get the DNS records to publish, re-check verification, and remove domains in BlueFox Email via the REST API.',
    intro: 'To send from your own domain: add it, have the domain owner publish the DNS records the API returns, then call the check endpoint until the domain verifies. The check re-reads the domain\'s [DKIM](/email-sending-concepts/dkim), [SPF](/email-sending-concepts/spf), [MX](/email-sending-concepts/mx-record), and [DMARC](/email-sending-concepts/dmarc) records, and the first successful check creates a default [sender identity](/docs/api/sender-identities) (`no-reply@` your domain). A domain can\'t be removed while a sender identity still uses it. Not available for BYO AWS projects, which manage domains in their own AWS account. If the check keeps reporting the domain as unverified, confirm the records resolve publicly with the free [deliverability checkers](/tools/deliverability/), which read the same four record types from outside your network. Once DNS is live, confirm the policy with the free [DMARC checker](/tools/deliverability/dmarc-checker).',
  },
  'Webhook': {
    description: 'Configure the BlueFox Email project webhook via the REST API: the URL, the API key it sends, and which email events it receives.',
    intro: 'Read, create or replace, and delete a project\'s webhook: the URL events are sent to, the API key sent with each request so your endpoint can verify it, and which events it receives (sent, failed, opens, clicks, bounces, complaints, and subscription changes). The key must be one of the project\'s existing API keys, which are managed in the app, not through the API. Send a synthetic event with the test webhook endpoint in [Sending Setup](/docs/api/sending-setup), and see [Webhooks](/docs/integrations/webhooks) for verifying requests.',
  },
  'Sending Setup': {
    description: 'List AWS regions, check sandbox and production deliverability, send a test webhook event, and export a domain\'s DNS records as CSV.',
    intro: 'Helper endpoints for configuring and monitoring sending: the AWS regions available for production sending, deliverability figures for [sandbox and production](/docs/projects/delivery-modes) sending (for production, the worst [bounce](/email-sending-concepts/bounce-rate) and [complaint](/email-sending-concepts/complaints) rates over the last 7, 30, and 90 days, and this month\'s sends against the monthly limit), a synthetic test event for your [webhook](/docs/api/webhook), and a CSV export of a [domain\'s](/docs/api/domains) required DNS records.',
  },
  'Production Access': {
    description: 'Check production access status, apply to leave sandbox mode, and request a sending-limit increase for a BlueFox Email project via the API.',
    intro: 'New projects start in sandbox mode, with a low daily send cap. These endpoints return a project\'s production access status and domain readiness, submit the application to move to production, and request a higher sending limit once the project is in production. Applying requires at least one domain with SPF, MX, and DKIM verified through the [Domains API](/docs/api/domains), and approval is manual. Before applying, confirm your sending domain authenticates cleanly with the free [deliverability tools](/tools/deliverability/), which check SPF, DKIM, DMARC, and MX from public DNS. [Maintaining Production Access](/docs/projects/delivery-modes#maintaining-production-access) lists the bounce and complaint thresholds you need to stay under.',
  },
  'BYO AWS': {
    description: 'Validate bring-your-own Amazon SES credentials and get the CloudFormation setup link for a BYO AWS BlueFox Email project.',
    intro: 'For projects that send through their own Amazon SES account: validate the AWS credentials and get the CloudFormation setup link. See [Delivery Modes](/docs/projects/delivery-modes) for how BYO AWS compares to sandbox and production, and [BYO Amazon SES pricing](/byo-amazon-ses-pricing) for costs.',
  },
  'Design Systems': {
    description: 'Read a project\'s email design system merged with its overrides, and set or reset those overrides, via the BlueFox Email REST API.',
    intro: 'Read the design system a project\'s emails are built on, merged with the project\'s own overrides, and set or reset those overrides. For why a design system keeps every email on brand, read [The Power of Modern Email Design Systems](/posts/the-power-of-modern-email-design-systems).',
  },
  'Templates': {
    description: 'List, create, get, update, and delete reusable email templates in a BlueFox Email project via the REST API.',
    intro: 'Templates are reusable email designs. These endpoints cover the full lifecycle: list, create, read, update, and delete. To build and edit a template visually, use the [email builder](/docs/projects/email-builder).',
  },
  'Campaigns': {
    description: 'Create, update, and delete email campaigns, and fetch per-campaign stats and recipient lists, with the BlueFox Email REST API.',
    intro: 'Campaigns are one-off sends to a subscriber list. Use these endpoints to create and update campaigns, then pull stats and the recipient list for each one. The in-app workflow is covered in [Campaigns](/docs/projects/campaigns); to target part of a list, create a segment with the [Segments API](/docs/api/segments).',
  },
  'Transactional Emails': {
    description: 'Create and manage transactional emails such as password resets and receipts, and fetch their stats and recipients, via the BlueFox Email API.',
    intro: 'Transactional emails are one-to-one messages caused by something a user did, like a password reset or an order receipt. These endpoints manage the emails and return their stats and recipients; to send one, call the [Send Email API](/docs/api/send-email). For the in-app setup, see [Transactional Emails](/docs/projects/transactional-emails).',
  },
  'Triggered Emails': {
    description: 'Create and manage triggered emails sent to subscriber lists, and fetch their stats and recipients, via the BlueFox Email REST API.',
    intro: 'Triggered emails go to subscribers of a list when your application asks for them, for example onboarding steps or follow-ups. These endpoints manage the emails and return their stats and recipients; to send one, call the [Send Email API](/docs/api/send-email). For how they differ from transactional emails, see [Triggered Emails](/docs/projects/triggered-emails).',
  },
  'Send Email': {
    description: 'Send transactional and triggered emails with the BlueFox Email REST API: endpoints, request body fields, and error responses.',
    intro: 'Two endpoints send email: one for [transactional emails](/docs/api/transactional-emails) and one for [triggered emails](/docs/api/triggered-emails). Both accept merge tag `data` and [file attachments](/docs/api/send-attachments). The older flat-URL versions are documented below them for existing integrations. Sends fail with a 405 when the account is out of credit, a sandbox project has hit its daily cap, or high bounce or complaint rates have restricted sending. If a send is accepted but never arrives, look it up in the [Email Error Log](/docs/api/email-error-log).',
  },
  'Test Email': {
    description: 'Send a test of a campaign, transactional, or triggered email to one recipient via the BlueFox Email API, without affecting send stats.',
    intro: 'Send a campaign, transactional, or triggered email to a single recipient to check rendering, links, and personalization before real recipients get it. Test sends don\'t affect real send stats or contact state. The in-app equivalent is [Send Test Emails](/docs/projects/send-test-email).',
  },
  'Email Error Log': {
    description: 'List the last 30 days of processing and delivery errors for a campaign, transactional, or triggered email with the BlueFox Email API.',
    intro: 'When a send is accepted but fails later, during processing or delivery, the error is recorded against the email it belongs to. This endpoint lists those errors for one campaign, transactional email, or triggered email, newest first, covering the last 30 days. Reach for it when a [Send Email](/docs/api/send-email) call succeeded but the recipient never got the message, and keep an eye on bounce and complaint rates on the [project dashboard](/docs/projects/dashboard).',
  },
  'Contacts': {
    description: 'Create, get, update, list, and delete contacts, custom contact fields, and contact tags in BlueFox Email via the REST API.',
    intro: 'Contacts are the people in your project, independent of any single list. These endpoints manage contacts by email address, the custom fields stored on them, and contact tags, and resend double opt-in verification emails. To put a contact on a list, use [Subscriber Lists](/docs/api/subscriber-lists). The in-app view is [Contacts](/docs/projects/contacts).',
  },
  'Segments': {
    description: 'Create, list, update, and delete contact segments in BlueFox Email via the REST API, for targeted campaigns and automations.',
    intro: 'Segments are saved filters that select a dynamic group of contacts for campaigns and automations. See [Segments](/docs/projects/segments) for the available conditions and operators.',
  },
  'Subscriber Lists': {
    description: 'Manage BlueFox Email subscriber lists via the API: create lists, subscribe contacts, update or pause subscriptions, and fetch list stats.',
    intro: 'Subscriber lists hold the contacts who opted in to a kind of email. These endpoints manage the lists, list and subscribe contacts, update a subscriber\'s status, and return list stats. For growing a list the right way, see [How to build a high-quality email list](/posts/how-to-build-a-high-quality-email-list-in-bluefox-email).',
  },
  'Subscriptions': {
    description: 'Subscribe, update, pause, and one-click unsubscribe contacts on a BlueFox Email list, and submit signup forms, via the flat-URL API.',
    intro: 'The flat-URL subscription endpoints. Subscribing a contact, and reading or updating a single subscriber, accept either an API key or a whitelisted browser origin, so a signup form can call them without exposing a key; set up the whitelist under [API Keys and Domain Whitelist](/docs/projects/settings#api-keys-and-domain-whitelist). The [one-click unsubscribe](/email-sending-concepts/one-click-unsubscribe) endpoint instead takes the signed token from an email\'s List-Unsubscribe link. New server-side integrations should use [Subscriber Lists](/docs/api/subscriber-lists).',
  },
  'Signup Forms': {
    description: 'Create, update, and delete BlueFox Email signup forms and get their embeddable HTML via the REST API.',
    intro: 'Manage hosted and embedded signup forms, and get the HTML snippet to embed one on your site. For the in-app editor, see [Sign-Up Forms](/docs/projects/forms-and-pages#sign-up-forms).',
  },
  'Suppression List': {
    description: 'List and add suppressed email addresses in a BlueFox Email project via the REST API, so they are never emailed again.',
    intro: 'Addresses on the suppression list are never emailed, whatever list they are on. See [Suppression Lists](/docs/projects/suppression-list) for importing and exporting the list in the app.',
  },
  'Gallery': {
    description: 'Upload, rename, and delete images and organize them in folders in the BlueFox Email image gallery via the REST API.',
    intro: 'Manage a project\'s image gallery: create, rename, and delete folders, and upload (JPEG, PNG, or GIF), rename, and delete images. Folders belong either to the project or to the whole account, shared across every project. Deleting a folder also deletes everything inside it, and cannot be undone.',
  },
}

function pageFrontmatter(tag) {
  const title = `${tag} API Reference | bluefox.email documentation`
  const description = TAG_INFO[tag]?.description || `Every ${tag} endpoint in the bluefox.email API: parameters, request body, and response schemas.`
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
  const intro = `${TAG_INFO[tag]?.intro || `Full reference for the **${tag}** resource in the bluefox.email API.`} See the [API overview](/docs/api/) for authentication, the response envelope, and pagination.`
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
