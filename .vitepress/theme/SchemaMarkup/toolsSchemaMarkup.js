import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

// --- TOOLS COLLECTION CONFIG ---
const TOOLS_COLLECTION_CONFIG = {
  'tools': {
    imageFileName: 'FreeTools.png',
    collectionName: 'Tools',
    collectionUrl: 'https://bluefox.email/tools/',
    isMainToolsIndex: true
  },
  'tools/deliverability': {
    imageFileName: 'FreeDeliverabilityTools.png',
    collectionName: 'Email Authentication Tools',
    collectionUrl: 'https://bluefox.email/tools/deliverability/',
    parentCollection: {
      name: 'Tools',
      url: 'https://bluefox.email/tools/'
    }
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
    return `https://bluefox.email/assets/${data.imageFileName}`
  }
}

// --- TOOL SCHEMA FIELDS ---
function getToolSchemaFields(fm) {
  return {
    mainEntity: {
      '@type': 'WebApplication',
      name: fm.title.split('|')[0].trim(),
      description: fm.description,
      applicationCategory: 'Web Application',
      operatingSystem: 'Web Browser',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }
}

// --- HELPER FUNCTIONS (EXACTLY LIKE GLOSSARY) ---
function getToolSubPagesInfo(collectionFolder) {
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

function getToolSubsections(toolsFolder) {
  const absDir = path.resolve(process.cwd(), toolsFolder)
  if (!fs.existsSync(absDir)) {
    return []
  }
  
  return fs.readdirSync(absDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
      const subsectionPath = path.join(absDir, dirent.name, 'index.md')
      if (fs.existsSync(subsectionPath)) {
        const { data: fm } = matter.read(subsectionPath)
        return {
          name: fm.title ? fm.title : dirent.name,
          url: `https://bluefox.email/${toolsFolder}/${dirent.name}/`
        }
      }
      return null
    })
    .filter(Boolean)
}

// --- LEVEL 1: MAIN TOOLS INDEX SCHEMA (/tools/) ---
function addSchemaMarkupForMainToolsIndex(pageData, data) {
  const fm = pageData.frontmatter
  const collectionFolder = path.dirname(pageData.relativePath)
  
  // Get all 2nd level tool categories (subsections)
  const subsections = getToolSubsections(collectionFolder)
  const hasPart = subsections.map(sub => ({
    '@type': 'Collection',
    name: sub.name,
    url: sub.url
  }))
  
  const keywords = Array.from(
    new Set([fm.title, ...subsections.map(sub => sub.name)].filter(Boolean))
  )
  
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
      '@type': 'ItemList',
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

  addSchemaToHead(pageData, jsonLdData)
}

// --- LEVEL 2: TOOL CATEGORY INDEX SCHEMA (/tools/deliverability/) ---
function addSchemaMarkupForToolCategoryIndex(pageData, data) {
  const fm = pageData.frontmatter
  const collectionFolder = path.dirname(pageData.relativePath)
  
  // Get all individual tools in this category using gray-matter
  const subPages = getToolSubPagesInfo(collectionFolder)
  const hasPart = subPages.map(sub => ({
    '@type': 'WebApplication',
    name: sub.name,
    url: sub.url
  }))
  
  const keywords = Array.from(
    new Set([fm.title, ...subPages.map(sub => sub.name)].filter(Boolean))
  )
  
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
      '@type': 'ItemList',
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

  // Build breadcrumbs: Home → Tools → Category
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'BlueFox Email', item: 'https://bluefox.email/' },
    { '@type': 'ListItem', position: 2, name: data.parentCollection.name, item: data.parentCollection.url },
    { '@type': 'ListItem', position: 3, name: data.collectionName, item: data.collectionUrl }
  ]

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [schemaObj, breadcrumbSchema]
  }

  addSchemaToHead(pageData, jsonLdData)
}

// --- LEVEL 3: INDIVIDUAL TOOL PAGE SCHEMA ---
function addSchemaMarkupForToolPage(pageData, data) {
  const fm = pageData.frontmatter
  const image = resolveImageUrl(fm, data)
  const toolFields = getToolSchemaFields(fm)

  const schemaObj = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolFields.mainEntity.name,
    headline: fm.title,
    description: fm.description,
    mainEntityOfPage: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
    author: { '@type': 'Organization', name: 'BlueFox Email' },
    publisher: { '@type': 'Organization', name: 'BlueFox Email' },
    image: image,
    datePublished: fm.datePublished,
    dateModified: fm.dateModified,
    keywords: (fm.keywords && Array.isArray(fm.keywords))
      ? fm.keywords
      : undefined,
    url: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
    isAccessibleForFree: true,
    inLanguage: 'en',
    applicationCategory: toolFields.mainEntity.applicationCategory,
    operatingSystem: toolFields.mainEntity.operatingSystem,
    offers: toolFields.mainEntity.offers,
    isPartOf: data.isPartOf
  }

  Object.keys(schemaObj).forEach(k => {
    if (schemaObj[k] === undefined) {
      delete schemaObj[k]
    }
  })

  // Build breadcrumbs: Home → Tools → Category → Tool
  const breadcrumbItems = [
    { '@type': 'ListItem', position: 1, name: 'BlueFox Email', item: 'https://bluefox.email/' },
    { '@type': 'ListItem', position: 2, name: data.parentCollection.name, item: data.parentCollection.url },
    { '@type': 'ListItem', position: 3, name: data.collectionName, item: data.collectionUrl },
    { '@type': 'ListItem', position: 4, name: fm.title.split('|')[0].trim(), item: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}` }
  ]

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems
  }

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@graph': [schemaObj, breadcrumbSchema]
  }

  addSchemaToHead(pageData, jsonLdData)
}

// --- UTILITY FUNCTION TO ADD SCHEMA TO HEAD ---
function addSchemaToHead(pageData, jsonLdData) {
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

// --- MAIN EXPORT WITH EXPLICIT 3-LEVEL ROUTING ---
export function addToolsSchemaMarkup(pageData) {
  const fm = pageData.frontmatter
  if (!fm || !fm.title || !fm.description) {
    return
  }

  const relativePath = pageData.relativePath

  // LEVEL 1: Main Tools Index (/tools/)
  if (relativePath === 'tools/index.md') {
    const data = {
      imageFileName: 'free-tools.png',
      collectionName: 'Tools',
      collectionUrl: 'https://bluefox.email/tools/',
      parentCollection: null
    }
    addSchemaMarkupForMainToolsIndex(pageData, data)
    return
  }

  // LEVEL 2: Tool Category Indexes (/tools/[category]/)
  if (relativePath === 'tools/deliverability/index.md') {
    const data = {
      imageFileName: 'free-email-tools.png',
      collectionName: 'Email Authentication Tools',
      collectionUrl: 'https://bluefox.email/tools/deliverability/',
      parentCollection: {
        name: 'Tools',
        url: 'https://bluefox.email/tools/'
      }
    }
    addSchemaMarkupForToolCategoryIndex(pageData, data)
    return
  }

  // LEVEL 3: Individual Tools (/tools/[category]/[tool])
  if (relativePath.startsWith('tools/deliverability/') && !relativePath.endsWith('index.md')) {
    const data = {
      imageFileName: 'free-email-tools.png',
      collectionName: 'Email Authentication Tools',
      collectionUrl: 'https://bluefox.email/tools/deliverability/',
      parentCollection: {
        name: 'Tools',
        url: 'https://bluefox.email/tools/'
      },
      isPartOf: {
        '@type': 'Collection',
        name: 'Email Authentication Tools',
        url: 'https://bluefox.email/tools/deliverability/'
      }
    }
    addSchemaMarkupForToolPage(pageData, data)
    return
  }
}
