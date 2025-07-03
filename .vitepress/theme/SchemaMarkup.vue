<template>
  <!-- This component doesn't render any visible content -->
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'TechArticle'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  datePublished: {
    type: String,
    default: ''
  },
  dateModified: {
    type: String,
    default: ''
  },
  termName: {
    type: String,
    default: ''
  },
  termDescription: {
    type: String,
    default: ''
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  },
  faqs: {
    type: Array,
    default: () => []
  }
})

const schemaData = computed(() => {
  // Base schema
  const schema = {
    '@context': 'https://schema.org',
    '@type': props.type,
    'headline': props.title,
    'description': props.description,
    'mainEntityOfPage': props.url,
    'author': {
      '@type': 'Organization',
      'name': 'BlueFox Email'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'BlueFox Email'
    }
  }

  // Add optional fields if provided
  if (props.image) {
    schema.image = props.image
  }

  if (props.datePublished) {
    schema.datePublished = props.datePublished
  }

  if (props.dateModified) {
    schema.dateModified = props.dateModified
  }

  // Add breadcrumbs if provided
  if (props.breadcrumbs.length > 0) {
    schema.isPartOf = {
      '@type': 'WebPage',
      'breadcrumb': {
        '@type': 'BreadcrumbList',
        'itemListElement': props.breadcrumbs.map((crumb, index) => ({
          '@type': 'ListItem',
          'position': index + 1,
          'name': crumb.name,
          'item': crumb.url
        }))
      }
    }
  }

  // Add glossary term definition if provided
  if (props.termName && props.termDescription) {
    schema.mainEntity = {
      '@type': 'DefinedTerm',
      'name': props.termName,
      'description': props.termDescription
    }
  }

  // Add FAQs if provided
  if (props.faqs.length > 0) {
    schema.hasPart = {
      '@type': 'FAQPage',
      'mainEntity': props.faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    }
  }

  return schema
})

let scriptElement = null

onMounted(() => {
  // Create and inject the JSON-LD script element
  scriptElement = document.createElement('script')
  scriptElement.setAttribute('type', 'application/ld+json')
  scriptElement.textContent = JSON.stringify(schemaData.value)
  document.head.appendChild(scriptElement)
})

onBeforeUnmount(() => {
  // Clean up the script element when component is unmounted
  if (scriptElement && document.head.contains(scriptElement)) {
    document.head.removeChild(scriptElement)
  }
})
</script>
