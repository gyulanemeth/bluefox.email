import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const TOOLS_CONFIG = {
  'tools': {
    imageFileName: 'free-tools.png',
    collectionName: 'Tools',
    collectionUrl: 'https://bluefox.email/tools/',
    isMainIndex: true
  },
  'tools/deliverability': {
    imageFileName: 'free-email-tools.png',
    collectionName: 'Email Authentication Tools',
    collectionUrl: 'https://bluefox.email/tools/deliverability/',
    parentCollection: { name: 'Tools', url: 'https://bluefox.email/tools/' }
  },
  'tools/content': {
    imageFileName: 'free-content-tools.png',
    collectionName: 'Content Creation Tools',
    collectionUrl: 'https://bluefox.email/tools/content/',
    parentCollection: { name: 'Tools', url: 'https://bluefox.email/tools/' }
  }
}

function resolveImageUrl(fm, data) {
  if (fm.thumbnail?.startsWith?.('http')) {
    return fm.thumbnail
  }
  
  if (fm.thumbnail) {
    return `https://bluefox.email${fm.thumbnail}`
  }
  
  if (data.imageFileName) {
    return `https://bluefox.email/assets/${data.imageFileName}`
  }
}

function getSubPages(collectionFolder) {
  const absDir = path.resolve(process.cwd(), collectionFolder)
  
  if (!fs.existsSync(absDir)) {
    return []
  }
  
  return fs.readdirSync(absDir)
    .filter(file => {
      return file.endsWith('.md') && file !== 'index.md'
    })
    .map(file => {
      const { data: fm } = matter.read(path.join(absDir, file))
      return {
        name: fm.title || file.replace(/\.md$/, ''),
        url: `https://bluefox.email/${collectionFolder}/${file.replace(/\.md$/, '')}`
      }
    })
}

function getSubsections(toolsFolder) {
  const absDir = path.resolve(process.cwd(), toolsFolder)
  
  if (!fs.existsSync(absDir)) {
    return []
  }
  
  return fs.readdirSync(absDir, { withFileTypes: true })
    .filter(dirent => {
      return dirent.isDirectory()
    })
    .map(dirent => {
      const indexPath = path.join(absDir, dirent.name, 'index.md')
      
      if (!fs.existsSync(indexPath)) {
        return null
      }
      
      const { data: fm } = matter.read(indexPath)
      return {
        name: fm.title || dirent.name,
        url: `https://bluefox.email/${toolsFolder}/${dirent.name}/`
      }
    })
    .filter(item => {
      return Boolean(item)
    })
}

function createBreadcrumbs(levels) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: levels.map((level, index) => {
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: level.name,
        item: level.url
      }
    })
  }
}

function cleanSchema(obj) {
  Object.keys(obj).forEach(key => {
    if (obj[key] === undefined) {
      delete obj[key]
    }
  })
  return obj
}

function addSchemaToHead(pageData, jsonLdData) {
  if (!pageData.frontmatter.head) {
    pageData.frontmatter.head = []
  }
  
  pageData.frontmatter.head = pageData.frontmatter.head.filter(item => {
    return !(item[0] === 'script' && item[1]?.type === 'application/ld+json')
  })
  
  pageData.frontmatter.head.push([
    'script', 
    { type: 'application/ld+json' }, 
    JSON.stringify(jsonLdData)
  ])
}

function createMainToolsSchema(pageData, data) {
  const { frontmatter: fm } = pageData
  const subsections = getSubsections(path.dirname(pageData.relativePath))
  
  const schema = cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: fm.title,
    description: fm.description,
    url: `https://bluefox.email/${pageData.relativePath.replace(/\/?index\.md$/, '')}`,
    inLanguage: 'en',
    isAccessibleForFree: true,
    author: { '@type': 'Organization', name: 'BlueFox Email' },
    publisher: { '@type': 'Organization', name: 'BlueFox Email' },
    image: resolveImageUrl(fm, data),
    datePublished: fm.datePublished,
    dateModified: fm.dateModified,
    mainEntity: {
      '@type': 'ItemList',
      name: fm.title,
      description: fm.description
    },
    keywords: [fm.title, ...subsections.map(s => s.name)].filter(item => {
      return Boolean(item)
    }),
    hasPart: subsections.map(s => {
      return { '@type': 'Collection', name: s.name, url: s.url }
    })
  })
  
  const breadcrumbs = createBreadcrumbs([
    { name: 'BlueFox Email', url: 'https://bluefox.email/' },
    { name: data.collectionName, url: data.collectionUrl }
  ])
  
  addSchemaToHead(pageData, {
    '@context': 'https://schema.org',
    '@graph': [schema, breadcrumbs]
  })
}

function createCategorySchema(pageData, data) {
  const { frontmatter: fm } = pageData
  const subPages = getSubPages(path.dirname(pageData.relativePath))
  
  const schema = cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: fm.title,
    description: fm.description,
    url: `https://bluefox.email/${pageData.relativePath.replace(/\/?index\.md$/, '')}`,
    inLanguage: 'en',
    isAccessibleForFree: true,
    author: { '@type': 'Organization', name: 'BlueFox Email' },
    publisher: { '@type': 'Organization', name: 'BlueFox Email' },
    image: resolveImageUrl(fm, data),
    datePublished: fm.datePublished,
    dateModified: fm.dateModified,
    mainEntity: {
      '@type': 'ItemList',
      name: fm.title,
      description: fm.description
    },
    keywords: [fm.title, ...subPages.map(s => s.name)].filter(item => {
      return Boolean(item)
    }),
    hasPart: subPages.map(s => {
      return { '@type': 'WebApplication', name: s.name, url: s.url }
    })
  })
  
  const breadcrumbs = createBreadcrumbs([
    { name: 'BlueFox Email', url: 'https://bluefox.email/' },
    { name: data.parentCollection.name, url: data.parentCollection.url },
    { name: data.collectionName, url: data.collectionUrl }
  ])
  
  addSchemaToHead(pageData, {
    '@context': 'https://schema.org',
    '@graph': [schema, breadcrumbs]
  })
}

function createToolSchema(pageData, data) {
  const { frontmatter: fm } = pageData
  const toolName = fm.title.split('|')[0].trim()
  
  const schema = cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: toolName,
    headline: fm.title,
    description: fm.description,
    mainEntityOfPage: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
    author: { '@type': 'Organization', name: 'BlueFox Email' },
    publisher: { '@type': 'Organization', name: 'BlueFox Email' },
    image: resolveImageUrl(fm, data),
    datePublished: fm.datePublished,
    dateModified: fm.dateModified,
    keywords: Array.isArray(fm.keywords) ? fm.keywords : undefined,
    url: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
    isAccessibleForFree: true,
    inLanguage: 'en',
    applicationCategory: 'Web Application',
    operatingSystem: 'Web Browser',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    isPartOf: data.isPartOf
  })
  
  const breadcrumbs = createBreadcrumbs([
    { name: 'BlueFox Email', url: 'https://bluefox.email/' },
    { name: data.parentCollection.name, url: data.parentCollection.url },
    { name: data.collectionName, url: data.collectionUrl },
    { name: toolName, url: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}` }
  ])
  
  addSchemaToHead(pageData, {
    '@context': 'https://schema.org',
    '@graph': [schema, breadcrumbs]
  })
}

export function addToolsSchemaMarkup(pageData) {
  const { frontmatter: fm, relativePath } = pageData
  
  if (!fm?.title || !fm?.description) {
    return
  }
  
  if (relativePath === 'tools/index.md') {
    createMainToolsSchema(pageData, TOOLS_CONFIG.tools)
    return
  }
  
  const categoryKey = relativePath.replace('/index.md', '')
  if (TOOLS_CONFIG[categoryKey] && relativePath.endsWith('/index.md')) {
    createCategorySchema(pageData, TOOLS_CONFIG[categoryKey])
    return
  }
  
  for (const [configKey, config] of Object.entries(TOOLS_CONFIG)) {
    if (configKey !== 'tools' && 
        relativePath.startsWith(`${configKey}/`) && 
        !relativePath.endsWith('index.md')) {
      
      const toolData = {
        ...config,
        isPartOf: {
          '@type': 'Collection',
          name: config.collectionName,
          url: config.collectionUrl
        }
      }
      createToolSchema(pageData, toolData)
      return
    }
  }
}
