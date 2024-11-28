<template>
  <div v-if="page.isNotFound">Not found!</div>
  <div>
    <h1 class="cards-title">{{ title }}</h1>
  </div>

  <div class="card-list">
    <div v-for="item in items" :key="item.slug" class="card">
      <a :href="item.url"><img :src="item.frontmatter.thumbnail"/></a>
      <a :href="item.url"><h2>{{ item.frontmatter.title }}</h2></a>
      <p>{{ item.frontmatter.description }}</p>
      <a :href="item.url">Read more</a>
    </div>
  </div>
</template>

<style scoped>
.cards-title {
  text-align: center;
  margin-top: 50px;
  font-size: 36px;
  line-height: 36px;
  background: var(--vp-home-hero-name-background);
  color: transparent;
  background-clip: text;
  font-weight: 700;
}

.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  padding-top: 50px;
  max-width: 1280px;
  margin: auto;
}

.card {
  width: 300px;
  padding: 20px;
}

.card h2 {
  margin-top: 20px;
  font-size: 20px;
  line-height: 22px;
  color: #333;
  font-weight: 600;
}

.card p {
  margin-top: 20px;
  color: #666;
}

.card a {
  display: block;
  margin-top: 20px;
  color: #13B0EE;
  text-decoration: none;
}

</style>

<script setup>

import { useData } from 'vitepress'

const { page, frontmatter } = useData();

const title = frontmatter.title || 'Articles'

import { data } from './articles.data.js'

const items = data.filter(article => article.frontmatter.published)

</script>
