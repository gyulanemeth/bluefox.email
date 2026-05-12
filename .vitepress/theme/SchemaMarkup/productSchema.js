import {
  SITE_ORIGIN,
  ORG_ID,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  asString,
  pageUrl,
  buildBreadcrumbList,
  appendJsonLd
} from './shared'

const PRODUCT_PAGES = {
  'pricing.md': {
    breadcrumb: [{ name: 'Pricing', slug: 'pricing' }],
    offer: {
      price: '0',
      priceCurrency: 'USD',
      description: 'Pay-per-send pricing with 3,000 free emails to start. No per-contact fees.'
    }
  },
  'byo-amazon-ses-pricing.md': {
    breadcrumb: [{ name: 'BYO Amazon SES Pricing', slug: 'byo-amazon-ses-pricing' }],
    offer: {
      price: '0',
      priceCurrency: 'USD',
      description: 'Bring your own Amazon SES. Pay platform credits plus AWS sending costs.'
    }
  },
  'for/marketing-agencies.md': {
    breadcrumb: [{ name: 'Marketing Agencies', slug: 'for/marketing-agencies' }],
    audience: 'Marketing Agencies'
  },
  'for/occasional-senders.md': {
    breadcrumb: [{ name: 'Occasional Senders', slug: 'for/occasional-senders' }],
    audience: 'Occasional Senders'
  },
  'for/saas-companies.md': {
    breadcrumb: [{ name: 'SaaS Companies', slug: 'for/saas-companies' }],
    audience: 'SaaS Companies'
  },
  'for/amazon-ses-users.md': {
    breadcrumb: [{ name: 'Amazon SES Users', slug: 'for/amazon-ses-users' }],
    audience: 'Amazon SES Users'
  }
}

function buildOffer(config, url) {
  return {
    '@type': 'Offer',
    price: config.offer.price,
    priceCurrency: config.offer.priceCurrency,
    description: config.offer.description,
    url,
    availability: 'https://schema.org/InStock',
    seller: { '@id': ORG_ID }
  }
}

function buildProduct(pageData, config) {
  const { frontmatter: fm } = pageData
  const url = pageUrl(pageData.relativePath)

  const product = {
    '@context': 'https://schema.org',
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
    image: DEFAULT_OG_IMAGE
  }

  if (config.audience) {
    product.audience = { '@type': 'Audience', audienceType: config.audience }
  }
  if (config.offer) {
    product.offers = buildOffer(config, url)
  }
  return product
}

function buildBreadcrumbs(config) {
  const root = { name: SITE_NAME, url: `${SITE_ORIGIN}/` }
  const trail = config.breadcrumb.map(item => ({
    name: item.name,
    url: `${SITE_ORIGIN}/${item.slug}`
  }))
  return buildBreadcrumbList([root, ...trail])
}

function isEligible(pageData, config) {
  if (!config) {
    return false
  }
  const fm = pageData.frontmatter
  return Boolean(fm && fm.title && fm.description)
}

export function addProductSchema(pageData) {
  const config = PRODUCT_PAGES[pageData.relativePath]
  if (!isEligible(pageData, config)) {
    return
  }

  appendJsonLd(pageData, {
    '@context': 'https://schema.org',
    '@graph': [buildProduct(pageData, config), buildBreadcrumbs(config)]
  })
}
