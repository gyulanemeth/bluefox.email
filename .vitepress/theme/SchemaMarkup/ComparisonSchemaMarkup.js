import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const COMPARISON_CONFIG = {
     'comparison': {
          imageFileName: 'comparison/bluefox-comparison.png',
          collectionName: 'BlueFox Email Provider Comparison',
          collectionUrl: 'https://bluefox.email/comparison/',
          isMainIndex: true
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

function getComparisonArticles(comparisonFolder) {
     const absDir = path.resolve(process.cwd(), comparisonFolder)

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
                    url: `https://bluefox.email/${comparisonFolder}/${file.replace(/\.md$/, '')}`,
                    description: fm.description,
                    datePublished: fm.datePublished,
                    dateModified: fm.dateModified,
                    image: resolveImageUrl(fm, {}),
                    thumbnail: fm.thumbnail
               }
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
          JSON.stringify(jsonLdData, null, 2)
     ])
}

function createComparisonCollectionSchema(pageData, data) {
     const { frontmatter: fm } = pageData
     const articles = getComparisonArticles(path.dirname(pageData.relativePath))

     const schema = cleanSchema({
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: fm.title,
          headline: fm.title,
          description: fm.description,
          url: `https://bluefox.email/${pageData.relativePath.replace(/\/?index\.md$/, '')}`,
          inLanguage: 'en',
          isAccessibleForFree: true,
          author: {
               '@type': 'Organization',
               name: 'BlueFox Email',
               url: 'https://bluefox.email'
          },
          publisher: {
               '@type': 'Organization',
               name: 'BlueFox Email',
               url: 'https://bluefox.email',
               logo: {
                    '@type': 'ImageObject',
                    url: 'https://bluefox.email/assets/logo.png'
               }
          },
          image: {
               '@type': 'ImageObject',
               url: resolveImageUrl(fm, data),
               width: 1200,
               height: 630
          },
          datePublished: fm.datePublished,
          dateModified: fm.dateModified,
          mainEntity: {
               '@type': 'ItemList',
               name: fm.title,
               description: fm.description,
               numberOfItems: articles.length,
               itemListElement: articles.map((article, index) => ({
                    '@type': 'ListItem',
                    position: index + 1,
                    item: {
                         '@type': 'Article',
                         '@id': article.url,
                         name: article.name,
                         headline: article.name,
                         description: article.description,
                         url: article.url,
                         image: article.image,
                         datePublished: article.datePublished,
                         dateModified: article.dateModified,
                         articleSection: 'Comparison',
                         author: { '@type': 'Organization', name: 'BlueFox Email' },
                         publisher: { '@type': 'Organization', name: 'BlueFox Email' }
                    }
               }))
          },
          keywords: [
               'BlueFox Email comparison',
               'email marketing platforms',
               'email service providers',
               'email platform comparison',
               ...articles.map(a => {
                    const match = a.name.match(/BlueFox Email vs (.+?)\s*[|:]/)
                    return match ? match[1] : null
               }).filter(Boolean)
          ],
          hasPart: articles.map(article => ({
               '@type': 'Article',
               name: article.name,
               url: article.url,
               description: article.description
          }))
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

function createComparisonArticleSchema(pageData) {
     const { frontmatter: fm } = pageData
     const articleTitle = fm.title.split('|')[0].trim()

     // Extract comparison subjects from title (e.g., "BlueFox Email vs Mailchimp")
     const comparisonMatch = articleTitle.match(/(.+?)\s+vs\s+(.+?)(?:\s*:.*)?$/)
     const [, subject1, subject2] = comparisonMatch || [null, 'BlueFox Email', 'Email Platform']

     const schema = cleanSchema({
          '@context': 'https://schema.org',
          '@type': 'Article',
          '@id': `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
          headline: fm.title,
          name: articleTitle,
          description: fm.description,
          url: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
          mainEntityOfPage: {
               '@type': 'WebPage',
               '@id': `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`
          },
          author: {
               '@type': 'Organization',
               name: 'BlueFox Email',
               url: 'https://bluefox.email'
          },
          publisher: {
               '@type': 'Organization',
               name: 'BlueFox Email',
               url: 'https://bluefox.email',
               logo: {
                    '@type': 'ImageObject',
                    url: 'https://bluefox.email/assets/logo.png'
               }
          },
          image: {
               '@type': 'ImageObject',
               url: resolveImageUrl(fm, {}),
               width: 1200,
               height: 630
          },
          datePublished: fm.datePublished,
          dateModified: fm.dateModified,
          keywords: [
               `${subject1} vs ${subject2}`,
               subject1,
               subject2,
               'email marketing comparison',
               'email platform comparison',
               'email service provider',
               'SaaS comparison',
               'email automation',
               'email deliverability'
          ],
          inLanguage: 'en',
          isAccessibleForFree: true,
          articleSection: 'Comparison',
          about: comparisonMatch ? [
               {
                    '@type': 'SoftwareApplication',
                    name: subject1,
                    applicationCategory: 'Email Marketing Software'
               },
               {
                    '@type': 'SoftwareApplication',
                    name: subject2,
                    applicationCategory: 'Email Marketing Software'
               }
          ] : undefined,
          mentions: comparisonMatch ? [
               {
                    '@type': 'SoftwareApplication',
                    name: subject1,
                    applicationCategory: 'Email Marketing Software'
               },
               {
                    '@type': 'SoftwareApplication',
                    name: subject2,
                    applicationCategory: 'Email Marketing Software'
               }
          ] : undefined,
          isPartOf: {
               '@type': 'Collection',
               name: 'BlueFox Email Provider Comparisons',
               url: 'https://bluefox.email/comparison/'
          }
     })

     const breadcrumbs = createBreadcrumbs([
          { name: 'BlueFox Email', url: 'https://bluefox.email/' },
          { name: 'Comparisons', url: 'https://bluefox.email/comparison/' },
          { name: articleTitle, url: `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}` }
     ])

     addSchemaToHead(pageData, {
          '@context': 'https://schema.org',
          '@graph': [schema, breadcrumbs]
     })
}

export function addComparisonSchemaMarkup(pageData) {
     const { frontmatter: fm, relativePath } = pageData

     if (!fm?.title || !fm?.description) {
          return
     }

     // Handle main comparison index page
     if (relativePath === 'comparison/index.md') {
          createComparisonCollectionSchema(pageData, COMPARISON_CONFIG['comparison'])
          return
     }

     // Handle individual comparison articles
     if (relativePath.startsWith('comparison/') && !relativePath.endsWith('index.md')) {
          createComparisonArticleSchema(pageData)
          return
     }
}
