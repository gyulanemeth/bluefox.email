<template>
<div class="PostContent">
  <div class="vp-doc">
    <Content/>
    <div class="post-byline">
      <img v-if="authorPhoto" :src="authorPhoto" :alt="authorName" class="post-byline-avatar" loading="lazy" />
      <span>{{ authorName }}</span>
      <span v-if="updatedLabel" class="post-updated"> &middot; Updated {{ updatedLabel }}</span>
    </div>
  </div>
</div>
</template>

<style>
.PostContent {
  max-width: 800px;
  margin: 0 auto 100px auto;
  padding: 20px;
}

.PostContent h1 {
  font-size: 2.5em;
  line-height: 1.05em;
  margin-top: 0.75em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.PostContent h2 {
  font-size: 2em;
  line-height: 1.05em;
  margin-top: 3em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.PostContent h3 {
  font-size: 1.5em;
  line-height: 1.05em;
  margin-top: 2em;
  margin-bottom: 0.5em;
  font-weight: 600;
}

.PostContent p {
  font-size: 16px;
  line-height: 28px;
}

.PostContent .custom-block {
  margin: 16px 0;
}

.PostContent .custom-block p:first-child {
    margin: 0;
}

.PostContent .custom-block p {
  padding: 0;
}

.PostContent ul,
.PostContent ol {
  margin: 0; /* Restore default margin */
  padding-left: 1.5em; /* Restore default indentation */
  list-style-position: outside; /* Default list style position */
}

.PostContent ul {
  list-style-type: disc; /* Default bullet style for unordered lists */
}

.PostContent ol {
  list-style-type: decimal; /* Default numbering style for ordered lists */
}

.PostContent a {
  color: var(--vp-c-brand-accessible, hsl(197, 87%, 35%));
  text-decoration: none;
}

.dark .PostContent a {
  color: hsl(197, 87%, 65%);
}

.post-byline {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 2em;
}

.post-updated {
  font-style: italic;
  opacity: 0.7;
}

.post-byline-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 8px;
  object-fit: cover;
}
</style>

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import { DEFAULT_AUTHOR } from './SchemaMarkup/shared'
import { team } from './team'

const { frontmatter } = useData()

const authorName = computed(() => frontmatter.value.author || DEFAULT_AUTHOR)
const authorPhoto = computed(() => team.find(member => member.name === authorName.value)?.photo)

const updatedLabel = computed(() => {
  const raw = frontmatter.value.lastUpdated
  if (typeof raw !== 'string') {
    return null
  }
  const date = new Date(raw)
  if (isNaN(date)) {
    return null
  }
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
})
</script>
