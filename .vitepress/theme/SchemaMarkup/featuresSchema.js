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

const FEATURE_LIST = [
  'Transactional Emails',
  'Triggered Emails',
  'Campaigns',
  'Data Feeds',
  'Email Attachments',
  'Contacts & Subscriber Lists',
  'Dynamic Segments',
  'Sign-Up Forms with Double Opt-In',
  'Suppression Lists',
  'Visual Automation Builder',
  'Email Themes (Atomic Design System)',
  'Per-Project Theme Overrides',
  'Personalization with Merge Tags',
  'Analytics & Reporting',
  'Sandbox Mode',
  'Production Mode',
  'BYO AWS SES',
  'HTTP API',
  'Webhooks',
  'Zapier Integration',
  'Supabase Auth Email Integration',
  'Multi-Project Management',
  'Team Roles & Permissions'
]

function buildSoftwareApp(pageData) {
  const url = pageUrl(pageData.relativePath)
  const { frontmatter: fm } = pageData
  return {
    '@type': 'SoftwareApplication',
    '@id': `${url}#product`,
    name: SITE_NAME,
    headline: asString(fm.title),
    description: asString(fm.description),
    url,
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Email Marketing Software',
    operatingSystem: 'Web',
    brand: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    image: DEFAULT_OG_IMAGE,
    featureList: FEATURE_LIST,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Starts free with 3,000 sends. No subscription. Pay only for what you send.',
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

export function addFeaturesSchema(pageData) {
  if (pageData.relativePath !== 'features.md') return
  const { frontmatter: fm } = pageData
  if (!fm || !fm.title) return

  const url = pageUrl(pageData.relativePath)
  const graph = [
    buildSoftwareApp(pageData),
    buildBreadcrumbList([
      { name: SITE_NAME, url: `${SITE_ORIGIN}/` },
      { name: 'Features', url }
    ])
  ]

  const faqSchema = buildFaqSchema(fm.faqs)
  if (faqSchema) graph.push(faqSchema)

  appendJsonLd(pageData, { '@context': 'https://schema.org', '@graph': graph })
}
