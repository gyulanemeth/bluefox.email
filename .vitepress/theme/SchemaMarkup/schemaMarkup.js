import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// --- COLLECTION CONFIG ---
const COLLECTION_CONFIG = {
  'email-sending-concepts': {
    imageFileName: 'email-sending-glossary.png',
    collectionName: 'Email Sending Concepts',
    collectionUrl: 'https://bluefox.email/email-sending-concepts/'
  },
  'aws-concepts': {
    imageFileName: 'aws-concepts-glossary.png',
    collectionName: 'AWS Concepts',
    collectionUrl: 'https://bluefox.email/aws-concepts/'
  }
}

// --- IMAGE HELPER FUNCTION ---
function resolveImageUrl(fm, data) {
  if (fm.thumbnail && typeof fm.thumbnail === 'string') {
    if (fm.thumbnail.startsWith('http')) {
      return fm.thumbnail
    } 
    return `https://bluefox.email${fm.thumbnail}`
  } else if (data.imageFileName) {
    return `https://bluefox.email/assets/glossary/${data.imageFileName}`
  }
}

// --- MAIN ENTITY / ABOUT FIELDS FOR GLOSSARY ---
function getGlossarySchemaFields(fm) {
  return {
    mainEntity: {
      '@type': 'DefinedTerm',
      name: fm.title,
      description: fm.description
    },
    about: { '@type': 'DefinedTerm', name: fm.title }
  }
}

// --- RELATED CONTENT / MENTIONS MAPPER ---
function mapMentions(relatedContent) {
  if (!relatedContent || !Array.isArray(relatedContent)) {
    return
  }
  return relatedContent.map(link => {
    if (typeof link === 'string') {
      if (link.startsWith('/email-sending-concepts/') || link.startsWith('/aws-concepts/')) {
        return { '@type': 'DefinedTerm', url: `https://bluefox.email${link}` }
      }
      return { '@id': `https://bluefox.email${link}` }
    } else if (link.url) {
      if (link.url.startsWith('/email-sending-concepts/') || link.url.startsWith('/aws-concepts/')) {
        return { '@type': 'DefinedTerm', url: `https://bluefox.email${link.url}` }
      }
      return { '@id': `https://bluefox.email${link.url}` }
    }
  })
}

// --- HELPER FUNCTIONS ---
function getSubPagesInfo(collectionFolder) {
  const absDir = path.resolve(process.cwd(), collectionFolder)
  if (!fs.existsSync(absDir)) {
    return []
  }
  return fs.readdirSync(absDir)
    .filter(file => file.endsWith('.md') && file !== 'index.md')
    .map(file => {
      const filePath = path.join(absDir, file)
      const { data: fm } = matter.read(filePath)
      let name
      if (fm.title) {
        name = fm.title
      } else {
        name = file.replace(/\.md$/, '')
      }
      return {
        name: name,
        url: `https://bluefox.email/${collectionFolder}/${file.replace(/\.md$/, '')}`,
      }
    })
}

// --- INDEX PAGE SCHEMA ---
function addSchemaMarkupForIndex(pageData, data) {
  const fm = pageData.frontmatter
  const collectionFolder = path.dirname(pageData.relativePath)
  const subPages = getSubPagesInfo(collectionFolder)
  const keywords = Array.from(
    new Set([fm.title, ...subPages.map(sub => sub.name)].filter(Boolean))
  )
  const hasPart = subPages.map(sub => ({
    '@type': 'TechArticle',
    name: sub.name,
    url: sub.url
  }))
  const image = resolveImageUrl(fm, data)

  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: fm.title,
    description: fm.description,
    url: `https://bluefox.email/${pageData.relativePath.replace(/\/?index\.md$/, '')}`,
    inLanguage: 'en',
    isAccessibleForFree: true,
    author: { '@type': 'Organization', name: 'BlueFox Email' },
    publisher: { '@type': 'Organization', name: 'BlueFox Email' },
    image: image,
    datePublished: fm.datePublished,
    dateModified: fm.dateModified,
    mainEntity: {
      '@type': 'DefinedTermSet',
      name: fm.title,
      description: fm.description
    },
    keywords: keywords,
    hasPart: hasPart,
  }
  Object.keys(schemaObj).forEach(k => {
    if (schemaObj[k] === undefined) {
      delete schemaObj[k]
    }
  })

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

  if (!pageData.frontmatter.head) {
    pageData.frontmatter.head = []
  } else {
    pageData.frontmatter.head = pageData.frontmatter.head.filter(item => {
      // removing the current ld+json script if it exists
      if (item[0] === 'script' && item[1] && item[1].type === 'application/ld+json') {
        return false
      } else {
        return true
      }
    })
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
  const image = resolveImageUrl(fm, data)

  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: fm.title,
    description: fm.description,
    mainEntityOfPage: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
    author: { '@type': 'Organization', name: 'BlueFox Email' },
    publisher: { '@type': 'Organization', name: 'BlueFox Email' },
    image: image,
    datePublished: fm.datePublished,
    dateModified: fm.dateModified,
    ...getGlossarySchemaFields(fm),
    keywords: (fm.keywords && Array.isArray(fm.keywords))
      ? fm.keywords
      : undefined,
    url: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
    isAccessibleForFree: true,
    inLanguage: 'en',
    mentions: mapMentions(fm.relatedContent),
    isPartOf: data.isPartOf
  }
  Object.keys(schemaObj).forEach(k => {
    if (schemaObj[k] === undefined) {
      delete schemaObj[k]
    }
  })

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'BlueFox Email', item: 'https://bluefox.email/' },
      { '@type': 'ListItem', position: 2, name: data.collectionName, item: data.collectionUrl },
      { '@type': 'ListItem', position: 3, name: fm.title.split('|')[0].trim(), item: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}` }
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

  if (!pageData.frontmatter.head) {
    pageData.frontmatter.head = []
  } else {
    pageData.frontmatter.head = pageData.frontmatter.head.filter(item => {
      if (item[0] === 'script' && item[1] && item[1].type === 'application/ld+json') {
        return false
      } else {
        return true
      }
    })
  }
  pageData.frontmatter.head.push([
    'script',
    { type: 'application/ld+json' },
    JSON.stringify(jsonLdData)
  ])
}

// --- MAIN EXPORT ---
export function addSchemaMarkup(pageData) {
  const fm = pageData.frontmatter
  if (!fm || !fm.title || !fm.description) {
    return
  }

  // Find which collection this page belongs to
  const match = Object.keys(COLLECTION_CONFIG).find(prefix =>
    pageData.relativePath.startsWith(prefix + '/')
  )
  if (!match) {
    return
  }
  const config = COLLECTION_CONFIG[match]
  const isIndexPage = pageData.relativePath === `${match}/index.md`

  const data = {
    imageFileName: config.imageFileName,
    collectionName: config.collectionName,
    collectionUrl: config.collectionUrl,
    isPartOf: null
  }

  if (isIndexPage) {
    addSchemaMarkupForIndex(pageData, data)
  } else {
    data.isPartOf = {
      '@type': 'Collection',
      name: config.collectionName,
      url: config.collectionUrl
    }
    addSchemaMarkupForPage(pageData, data)
  }
}
