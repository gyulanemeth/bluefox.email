// All schema markup logic for VitePress
export function addSchemaMarkup(pageData) {
  if (pageData.relativePath.startsWith('email-sending-concepts/') && 
      pageData.relativePath !== 'email-sending-concepts/index.md') {
    const fm = pageData.frontmatter
    if (fm.title && fm.description) {
      const schemaObj = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        'headline': fm.title,
        'description': fm.description,
        'mainEntityOfPage': `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`,
        'author': {
          '@type': 'Organization',
          'name': 'BlueFox Email'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'BlueFox Email'
        }
      }
      if (fm.thumbnail) {
        schemaObj.image = `https://bluefox.email/assets/glossary/email-sending-glossary.png`
      }
      if (fm.datePublished) {
        schemaObj.datePublished = fm.datePublished
      }
      if (fm.dateModified) {
        schemaObj.dateModified = fm.dateModified
      }
      if (fm.termName) {
        schemaObj.mainEntity = {
          '@type': 'DefinedTerm',
          'name': fm.termName,
          'description': fm.termDescription || fm.description
        }
        schemaObj.about = {
          '@type': 'DefinedTerm',
          'name': fm.termName
        }
      }
      if (fm.keywords && Array.isArray(fm.keywords)) {
        schemaObj.keywords = fm.keywords
      } else {
        let inferredKeywords = []
        if (fm.termName) inferredKeywords.push(fm.termName)
        if (fm.title) inferredKeywords.push(...fm.title.replace('| BlueFox Email', '').split(/\s|,|\|/).map(k => k.trim()).filter(Boolean))
        if (pageData.relativePath.startsWith('email-sending-concepts/')) {
          inferredKeywords.push('email deliverability', 'hard bounce', 'soft bounce', 'AWS SES')
        }
        schemaObj.keywords = Array.from(new Set(inferredKeywords))
      }
      schemaObj.url = `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`
      schemaObj.isAccessibleForFree = true
      schemaObj.inLanguage = 'en'
      if (fm.relatedContent && Array.isArray(fm.relatedContent)) {
        schemaObj.mentions = fm.relatedContent.map(link => {
          if (link.startsWith('/email-sending-concepts/') || link.startsWith('/aws-concepts/')) {
            return {
              '@type': 'DefinedTerm',
              'url': `https://bluefox.email${link}`
            }
          }
          return { '@id': `https://bluefox.email${link}` }
        })
        schemaObj.hasPart = fm.relatedContent.map(link => ({ '@id': `https://bluefox.email${link}` }))
      }
      schemaObj.isPartOf = {
        '@type': 'Collection',
        'name': 'Email Sending Concepts',
        'url': 'https://bluefox.email/email-sending-concepts/'
      }
      const breadcrumbSchema = {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'BlueFox Email',
            'item': 'https://bluefox.email/'
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Email Sending Concepts',
            'item': 'https://bluefox.email/email-sending-concepts/'
          },
          {
            '@type': 'ListItem',
            'position': 3,
            'name': fm.termName || fm.title.split('|')[0].trim(),
            'item': `https://bluefox.email/${pageData.relativePath.replace(/\.md$/, '')}`
          }
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
              'name': item.question,
              'acceptedAnswer': {
                '@type': 'Answer',
                'text': item.answer
              }
            })
          }
        })
      }
      const jsonLdData = {
        '@context': 'https://schema.org',
        '@graph': [
          schemaObj,
          breadcrumbSchema
        ]
      }
      if (faqItems.length > 0) {
        jsonLdData['@graph'].push({
          '@type': 'FAQPage',
          'mainEntity': faqItems
        })
      }
      if (!pageData.frontmatter.head) {
        pageData.frontmatter.head = []
      } else {
        pageData.frontmatter.head = pageData.frontmatter.head.filter(item => 
          !(item[0] === 'script' && item[1] && item[1].type === 'application/ld+json')
        )
      }
      pageData.frontmatter.head.push([
        'script',
        { type: 'application/ld+json' },
        JSON.stringify(jsonLdData)
      ])
    }
  }
}
