import {
  SITE_ORIGIN,
  ORG_ID,
  SITE_NAME,
  DEFAULT_AUTHOR,
  appendJsonLd
} from './shared'

const WEBSITE_ID = `${SITE_ORIGIN}/#website`

export function buildOrganization() {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_ORIGIN}/assets/bluefoxemail-logo-48x48.webp`,
      width: 48,
      height: 48
    },
    sameAs: [
      'https://x.com/bluefoxemail',
      'https://www.linkedin.com/company/bluefox-email/',
      'https://www.youtube.com/@bluefox-email-official'
    ],
    founder: {
      '@type': 'Person',
      name: DEFAULT_AUTHOR,
      url: `${SITE_ORIGIN}/about`
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'Innovaris Group LLC'
    }
  }
}

function buildWebSite() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_ORIGIN,
    name: SITE_NAME,
    description: 'High deliverability email platform for agencies and SaaS teams.',
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_ORIGIN}/?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  }
}

export function addOrganizationSchema(pageData) {
  if (pageData.relativePath !== 'index.md') {
    return
  }

  appendJsonLd(pageData, {
    '@context': 'https://schema.org',
    '@graph': [buildOrganization(), buildWebSite()]
  })
}
