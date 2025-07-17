import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// --- HELPER FUNCTIONS ---
function getSubPagesInfo(collectionFolder) {
  const absDir = path.resolve(process.cwd(), collectionFolder)
  if (!fs.existsSync(absDir)) return []
  return fs.readdirSync(absDir)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => {
      const filePath = path.join(absDir, file)
      const { data: fm } = matter.read(filePath)
      return {
        name: fm.termName || fm.title || file.replace(/\.md$/, ''),
        url: `https://bluefox.email/${collectionFolder}/${file.replace(/\.md$/, '')}`,
      }
    })
}

// --- INDEX PAGE SCHEMA ---
function addSchemaMarkupForIndex(pageData, data) {
  const fm = pageData.frontmatter
  const collectionFolder = pageData.relativePath.split('/')[0]
  const subPages = getSubPagesInfo(collectionFolder)
  const keywords = Array.from(
    new Set([fm.termName, ...subPages.map(sub => sub.name)].filter(Boolean))
  )
  const hasPart = subPages.map(sub => ({
    '@type': 'TechArticle',
    name: sub.name,
    url: sub.url
  }))

  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: fm.title,
    description: fm.description,
    url: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
    inLanguage: 'en',
    isAccessibleForFree: true,
    author: { '@type': 'Organization', name: 'BlueFox Email' },
    publisher: { '@type': 'Organization', name: 'BlueFox Email' },
    image: fm.thumbnail ? `https://bluefox.email/assets/glossary/${data.imageFileName}` : undefined,
    datePublished: fm.datePublished,
    dateModified: fm.dateModified,
    mainEntity: fm.termName ? {
      '@type': 'DefinedTermSet',
      name: fm.termName,
      description: fm.termDescription || fm.description
    } : undefined,
    keywords,
    hasPart,
  }
  // Remove undefined keys
  Object.keys(schemaObj).forEach(k => schemaObj[k] === undefined && delete schemaObj[k])

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'BlueFox Email', item: 'https://bluefox.email/' },
      { '@type': 'ListItem', position: 2, name: data.collectionName, item: data.collectionUrl }
    ]
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [schemaObj, breadcrumbSchema]
  }

  // Replace/append to page head
  if (!pageData.frontmatter.head) pageData.frontmatter.head = []
  else {
    pageData.frontmatter.head = pageData.frontmatter.head.filter(
      item => !(item[0] === 'script' && item[1] && item[1].type === 'application/ld+json')
    )
  }
  pageData.frontmatter.head.push([
    'script',
    { type: 'application/ld+json' },
    JSON.stringify(jsonLdData)
  ])
}

// --- INDIVIDUAL PAGE SCHEMA ---
function addSchemaMarkupForPage(pageData, data) {
  const fm = pageData.frontmatter
  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: fm.title,
    description: fm.description,
    mainEntityOfPage: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
    author: { '@type': 'Organization', name: 'BlueFox Email' },
    publisher: { '@type': 'Organization', name: 'BlueFox Email' },
    image: fm.thumbnail ? `https://bluefox.email/assets/glossary/${data.imageFileName}` : undefined,
    datePublished: fm.datePublished,
    dateModified: fm.dateModified,
    mainEntity: fm.termName ? {
      '@type': 'DefinedTerm',
      name: fm.termName,
      description: fm.termDescription || fm.description
    } : undefined,
    about: fm.termName ? { '@type': 'DefinedTerm', name: fm.termName } : undefined,
    keywords: (fm.keywords && Array.isArray(fm.keywords))
      ? fm.keywords
      : undefined,
    url: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
    isAccessibleForFree: true,
    inLanguage: 'en',
    mentions: fm.relatedContent && Array.isArray(fm.relatedContent)
      ? fm.relatedContent.map(link =>
          (typeof link === 'string')
            ? (link.startsWith('/email-sending-concepts/') || link.startsWith('/aws-concepts/'))
                ? { '@type': 'DefinedTerm', url: `https://bluefox.email${link}` }
                : { '@id': `https://bluefox.email${link}` }
            : (link.url
                ? ((link.url.startsWith('/email-sending-concepts/') || link.url.startsWith('/aws-concepts/'))
                  ? { '@type': 'DefinedTerm', url: `https://bluefox.email${link.url}` }
                  : { '@id': `https://bluefox.email${link.url}` })
                : undefined)
        )
      : undefined,
    isPartOf: data.isPartOf
  }
  // Remove undefined keys
  Object.keys(schemaObj).forEach(k => schemaObj[k] === undefined && delete schemaObj[k])

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'BlueFox Email', item: 'https://bluefox.email/' },
      { '@type': 'ListItem', position: 2, name: data.collectionName, item: data.collectionUrl },
      { '@type': 'ListItem', position: 3, name: fm.termName || fm.title.split('|')[0].trim(), item: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}` }
    ]
  }
  let faqItems = []
  if (fm.faqs && Array.isArray(fm.faqs) && fm.faqs.length > 0) {
    const questionSet = new Set()
    fm.faqs.forEach(item => {
      if (!questionSet.has(item.question)) {
        questionSet.add(item.question)
        faqItems.push({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer
          }
        })
      }
    })
  }
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [schemaObj, breadcrumbSchema]
  }
  if (faqItems.length > 0) {
    jsonLdData['@graph'].push({
      '@type': 'FAQPage',
      mainEntity: faqItems
    })
  }

  if (!pageData.frontmatter.head) pageData.frontmatter.head = []
  else {
    pageData.frontmatter.head = pageData.frontmatter.head.filter(
      item => !(item[0] === 'script' && item[1] && item[1].type === 'application/ld+json')
    )
  }
  pageData.frontmatter.head.push([
    'script',
    { type: 'application/ld+json' },
    JSON.stringify(jsonLdData)
  ])
}

// --- MAIN EXPORT ---
export function addSchemaMarkup(pageData) {
  // Only run on glossary collections
  if (
    !pageData.relativePath.startsWith('email-sending-concepts/') &&
    !pageData.relativePath.startsWith('aws-concepts/')
  ) {
    return
  }
  const fm = pageData.frontmatter
  if (!fm || !fm.title || !fm.description) return

  const data = {
    imageFileName: null,
    collectionName: null,
    collectionUrl: null,
    isPartOf: null,
  }

  if (pageData.relativePath.startsWith('email-sending-concepts/')) {
    data.imageFileName = 'email-sending-glossary.png'
    data.collectionName = 'Email Sending Concepts'
    data.collectionUrl = 'https://bluefox.email/email-sending-concepts/'
  } else if (pageData.relativePath.startsWith('aws-concepts/')) {
    data.imageFileName = 'aws-concepts-glossary.png'
    data.collectionName = 'AWS Concepts'
    data.collectionUrl = 'https://bluefox.email/aws-concepts/'
  }

  if (
    pageData.relativePath === 'email-sending-concepts/index.md' ||
    pageData.relativePath === 'aws-concepts/index.md'
  ) {
    addSchemaMarkupForIndex(pageData, data)
  } else {
    data.isPartOf = {
      '@type': 'Collection',
      name: data.collectionName,
      url: data.collectionUrl
    }
    addSchemaMarkupForPage(pageData, data)
  }
}
