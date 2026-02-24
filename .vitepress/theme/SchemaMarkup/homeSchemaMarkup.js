// Schema markup for the homepage (index.md)
// Adds: SoftwareApplication, Organization, WebSite with sitelinks searchbox

export function addHomeSchemaMarkup(pageData) {
  // Only apply to the homepage
  if (pageData.relativePath !== 'index.md') {
    return
  }

  const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': 'https://bluefox.email/#software',
    name: 'BlueFox Email',
    url: 'https://bluefox.email',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Email Marketing Software',
    description: 'Email marketing platform built for marketing agencies managing multiple clients. Powered by AWS SES with send-based pricing, design systems, multi-client project management, automation, and deliverability tools.',
    operatingSystem: 'Web',
    browserRequirements: 'Requires JavaScript',
    inLanguage: 'en',
    offers: {
      '@type': 'Offer',
      price: '100',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: '100',
        priceCurrency: 'USD',
        billingIncrement: 1,
        unitText: 'per year'
      },
      description: 'Annual platform access fee. Email sending costs billed separately via your own AWS SES account.',
      url: 'https://bluefox.email/pricing'
    },
    featureList: [
      'Multi-client project management',
      'Email design system with reusable components',
      'Drag-and-drop no-code email editor',
      'Transactional email sending via AWS SES',
      'Triggered email automation',
      'Campaign broadcasts',
      'Contact and list management with double opt-in',
      'Suppression list management',
      'Email analytics (opens, clicks, bounces, complaints)',
      'Domain authentication monitoring',
      'API for contacts, subscriber lists, and email sending',
      'Webhooks, Supabase, and Zapier integrations',
      'Free SPF, DKIM, DMARC, and MX checker tools'
    ],
    screenshot: 'https://bluefox.email/assets/share.png',
    softwareVersion: '1.0',
    creator: {
      '@type': 'Organization',
      '@id': 'https://bluefox.email/#organization',
      name: 'BlueFox Email',
      legalName: 'Innovaris Group LLC',
      url: 'https://bluefox.email',
      logo: {
        '@type': 'ImageObject',
        url: 'https://bluefox.email/assets/bluefoxemail-logo-48x48.webp',
        width: 48,
        height: 48
      },
      sameAs: [
        'https://x.com/bluefoxemail',
        'https://www.linkedin.com/company/104663633/',
        'https://www.youtube.com/@bluefox-email-official/shorts'
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@bluefox.email',
        contactType: 'customer support'
      },
      founder: {
        '@type': 'Person',
        name: 'Gyula Németh',
        jobTitle: 'Founder & CTO',
        description: 'HTML email design and rendering expert with 10+ years of experience. Built edmdesigner.com, chamaileon.io, and emailhero.io.',
        sameAs: [
          'https://www.linkedin.com/company/104663633/'
        ]
      }
    },
    audience: {
      '@type': 'Audience',
      audienceType: 'Marketing agencies, SaaS companies, developers managing multi-client email campaigns'
    }
  }

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://bluefox.email/#organization',
    name: 'BlueFox Email',
    legalName: 'Innovaris Group LLC',
    url: 'https://bluefox.email',
    description: 'Email marketing platform built for agencies managing multiple clients, powered by AWS SES with send-based pricing.',
    logo: {
      '@type': 'ImageObject',
      url: 'https://bluefox.email/assets/bluefoxemail-logo-48x48.webp',
      width: 48,
      height: 48
    },
    image: 'https://bluefox.email/assets/share.png',
    email: 'hello@bluefox.email',
    sameAs: [
      'https://x.com/bluefoxemail',
      'https://www.linkedin.com/company/104663633/',
      'https://www.youtube.com/@bluefox-email-official/shorts',
      'https://github.com/gyulanemeth/bluefox.email'
    ],
    founder: {
      '@type': 'Person',
      name: 'Gyula Németh',
      jobTitle: 'Founder & CTO'
    },
    knowsAbout: [
      'Email Marketing',
      'Email Deliverability',
      'AWS SES',
      'HTML Email Design',
      'Email Automation',
      'Transactional Email',
      'Email Design Systems'
    ]
  }

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://bluefox.email/#website',
    name: 'BlueFox Email',
    url: 'https://bluefox.email',
    description: 'Email marketing platform for agencies. Scale campaigns across multiple clients with design systems, automation, and AWS SES-powered sending.',
    inLanguage: 'en',
    publisher: {
      '@id': 'https://bluefox.email/#organization'
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://bluefox.email/?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [softwareApplicationSchema, organizationSchema, webSiteSchema]
  }

  if (!pageData.frontmatter.head) {
    pageData.frontmatter.head = []
  } else {
    // Remove any existing ld+json to avoid duplicates
    pageData.frontmatter.head = pageData.frontmatter.head.filter(item => {
      return !(item[0] === 'script' && item[1]?.type === 'application/ld+json')
    })
  }

  pageData.frontmatter.head.push([
    'script',
    { type: 'application/ld+json' },
    JSON.stringify(jsonLdData)
  ])
}
