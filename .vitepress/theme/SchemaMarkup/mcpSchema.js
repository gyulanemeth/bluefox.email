import {
  SITE_ORIGIN,
  ORG_ID,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  asString,
  pageUrl,
  buildBreadcrumbList,
  appendJsonLd
} from './shared'

function buildSoftwareApp(pageData) {
  const url = pageUrl(pageData.relativePath)
  const { frontmatter: fm } = pageData
  return {
    '@type': 'SoftwareApplication',
    '@id': `${url}#product`,
    name: 'BlueFox Email MCP Server',
    headline: asString(fm.title),
    description: asString(fm.description),
    url,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Node.js 20+',
    isAccessibleForFree: true,
    brand: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    image: DEFAULT_OG_IMAGE,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free, open-source MCP server. Normal BlueFox Email usage applies to the actions it performs.',
      url,
      availability: 'https://schema.org/InStock',
      seller: { '@id': ORG_ID }
    }
  }
}

function buildFaqSchema(faqs) {
  if (!Array.isArray(faqs) || !faqs.length) return null
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  }
}

export function addMcpSchema(pageData) {
  if (pageData.relativePath !== 'mcp.md') return
  const { frontmatter: fm } = pageData
  if (!fm || !fm.title) return

  const url = pageUrl(pageData.relativePath)
  const graph = [
    buildSoftwareApp(pageData),
    buildBreadcrumbList([
      { name: SITE_NAME, url: `${SITE_ORIGIN}/` },
      { name: 'MCP Server', url }
    ])
  ]

  const faqSchema = buildFaqSchema(fm.faqs)
  if (faqSchema) graph.push(faqSchema)

  appendJsonLd(pageData, { '@context': 'https://schema.org', '@graph': graph })
}
