import {
  SITE_ORIGIN,
  ORG_ID,
  SITE_NAME,
  asString,
  toIsoDate,
  pageUrl,
  resolveImageUrl,
  buildBreadcrumbList,
  appendJsonLd
} from './shared'

const DOCS_ROOT_URL = `${SITE_ORIGIN}/docs/`
const SECTION_LABELS = {
  '': 'Docs',
  projects: 'Projects',
  api: 'API',
  integrations: 'Integrations',
  'email-themes': 'Email Themes'
}

function isDocsPage(relativePath) {
  if (!relativePath) {
    return false
  }
  return relativePath.startsWith('docs/')
}

function isIndexPage(relativePath) {
  return relativePath.endsWith('/index.md')
}

function sectionKey(relativePath) {
  const parts = relativePath.split('/')
  if (parts.length < 3) {
    return ''
  }
  return parts[1]
}

function sectionLabel(key) {
  return SECTION_LABELS[key] || key
}

function sectionUrl(key) {
  if (!key) {
    return DOCS_ROOT_URL
  }
  return `${SITE_ORIGIN}/docs/${key}/`
}

function buildBreadcrumbs(pageData) {
  const { relativePath, frontmatter: fm } = pageData
  const trail = [
    { name: SITE_NAME, url: `${SITE_ORIGIN}/` },
    { name: 'Docs', url: DOCS_ROOT_URL }
  ]

  const key = sectionKey(relativePath)
  if (key) {
    trail.push({ name: sectionLabel(key), url: sectionUrl(key) })
  }

  if (!isIndexPage(relativePath)) {
    const title = asString(fm.title) || relativePath
    trail.push({ name: title.split('|')[0].trim(), url: pageUrl(relativePath) })
  }

  return buildBreadcrumbList(trail)
}

function buildTechArticle(pageData) {
  const { relativePath, frontmatter: fm } = pageData
  const url = pageUrl(relativePath)
  const title = asString(fm.title)
  const published = toIsoDate(fm.datePublished) || toIsoDate(fm.date)
  const modified = toIsoDate(fm.dateModified) || toIsoDate(fm.lastUpdated)

  const article = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': url,
    headline: title,
    name: title,
    description: asString(fm.description),
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: { '@type': 'ImageObject', url: resolveImageUrl(fm) },
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
    isAccessibleForFree: true,
    isPartOf: {
      '@type': 'TechArticle',
      name: sectionLabel(sectionKey(relativePath)),
      url: sectionUrl(sectionKey(relativePath))
    }
  }

  if (published) {
    article.datePublished = published
  }
  if (modified) {
    article.dateModified = modified
  }
  if (Array.isArray(fm.keywords)) {
    article.keywords = fm.keywords
  }
  return article
}

function buildCollectionPage(pageData) {
  const { relativePath, frontmatter: fm } = pageData
  const url = pageUrl(relativePath)
  const key = sectionKey(relativePath)

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': url,
    name: asString(fm.title),
    description: asString(fm.description),
    url,
    inLanguage: 'en',
    isAccessibleForFree: true,
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    image: { '@type': 'ImageObject', url: resolveImageUrl(fm) },
    about: {
      '@type': 'Thing',
      name: key ? sectionLabel(key) : SITE_NAME
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

function isEligible(pageData) {
  const { relativePath, frontmatter: fm } = pageData
  if (!isDocsPage(relativePath)) {
    return false
  }
  return Boolean(fm && fm.title && fm.description)
}

export function addDocsSchema(pageData) {
  if (!isEligible(pageData)) {
    return
  }

  const { frontmatter: fm } = pageData
  const primary = isIndexPage(pageData.relativePath)
    ? buildCollectionPage(pageData)
    : buildTechArticle(pageData)

  const graph = [primary, buildBreadcrumbs(pageData)]
  const faqSchema = buildFaqSchema(fm.faqs)
  if (faqSchema) graph.push(faqSchema)

  appendJsonLd(pageData, {
    '@context': 'https://schema.org',
    '@graph': graph
  })
}
