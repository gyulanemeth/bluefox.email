<template>
  <div v-if="page.isNotFound">Not found!</div>
  <div>
    <h1 class="cards-title">{{ frontmatter.title }}</h1>
  </div>
  <div class="card-list">
    <div v-for="item in items.filter(post => post.frontmatter.category === frontmatter.category)" :key="item.slug" class="card">
      <a :href="item.url"><img :src="item.frontmatter.thumbnail"/></a>
      <h2><a :href="item.url">{{ item.frontmatter.title }}</a></h2>
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
  gap: 30px;
  padding-top: 50px;
  padding-bottom: 50px;
  max-width: 1280px;
  margin: auto;
}

.card-list .card {
  width: 600px;
  max-width: 100%;
  padding: 10px;
  height: unset;
  border: unset;
  background: unset;
}

.card h2 {
  margin-top: 20px;
  font-size: 20px;
  line-height: 22px;
  font-weight: 600;
}

.card p {
  margin-top: 20px;
}

.card > a {
  display: block;
  margin-top: 20px;
  color: #13B0EE;
  text-decoration: none;
}

</style>

<script setup>

import { useData } from 'vitepress'

const { page, frontmatter } = useData();

import { data } from './posts.data.js'

const items = data.filter(post => post.frontmatter.published).sort((a, b) => new Date(b.frontmatter.published) - new Date(a.frontmatter.published))

</script>
