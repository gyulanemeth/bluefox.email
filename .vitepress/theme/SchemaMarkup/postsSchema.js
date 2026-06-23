import {
  SITE_ORIGIN,
  ORG_ID,
  DEFAULT_AUTHOR,
  asString,
  toIsoDate,
  resolveImageUrl,
  buildBreadcrumbList,
  appendJsonLd
} from './shared'
import { buildOrganization } from './organizationSchema'

function isPostPage(relativePath) {
  if (!relativePath) {
    return false
  }
  return relativePath.startsWith('posts/')
}

function postUrl(relativePath) {
  return `${SITE_ORIGIN}/${relativePath.replace(/\.md$/, '')}`
}

function buildAuthor(fm) {
  return {
    '@type': 'Person',
    name: asString(fm.author) || DEFAULT_AUTHOR,
    url: asString(fm.authorUrl) || `${SITE_ORIGIN}/about`
  }
}

function buildBlogPosting(pageData) {
  const { relativePath, frontmatter: fm } = pageData
  const url = postUrl(relativePath)
  const title = asString(fm.title)
  const publishedRaw = fm.published !== false ? toIsoDate(fm.published) : null
  const published = toIsoDate(fm.datePublished) || toIsoDate(fm.date) || publishedRaw
  const modified = toIsoDate(fm.dateModified) || toIsoDate(fm.lastUpdated) || published

  const article = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': url,
    headline: title,
    name: title,
    description: asString(fm.description),
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: { '@type': 'ImageObject', url: resolveImageUrl(fm) },
    author: buildAuthor(fm),
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
    isAccessibleForFree: true
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
  const section = asString(fm.category)
  if (section) {
    article.articleSection = section
  }
  return article
}

function buildBreadcrumbs(pageData) {
  return buildBreadcrumbList([
    { name: 'BlueFox Email', url: `${SITE_ORIGIN}/` },
    { name: 'Articles', url: `${SITE_ORIGIN}/articles` },
    { name: asString(pageData.frontmatter.title), url: postUrl(pageData.relativePath) }
  ])
}

function buildFaqSchema(faqs) {
  if (!Array.isArray(faqs) || !faqs.length) {
    return null
  }
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer }
    }))
  }
}

function shouldSkip(pageData) {
  const { relativePath, frontmatter: fm } = pageData
  if (!isPostPage(relativePath)) {
    return true
  }
  if (!fm || !fm.title || !fm.description) {
    return true
  }
  return fm.published === false
}

export function addPostsSchema(pageData) {
  if (shouldSkip(pageData)) {
    return
  }

  const graph = [buildBlogPosting(pageData), buildBreadcrumbs(pageData), buildOrganization()]
  const faqSchema = buildFaqSchema(pageData.frontmatter.faqs)
  if (faqSchema) {
    graph.push(faqSchema)
  }

  appendJsonLd(pageData, {
    '@context': 'https://schema.org',
    '@graph': graph
  })
}
