<template>
  <div class="page-nav">
    <div class="page-nav-title">On This Page</div>
    <ul>
      <li v-for="(link, index) in links" :key="index">
        <a :href="link.href" :class="{ active: activeLink === link.href }">{{ link.text }}</a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  links: {
    type: Array,
    required: true
  }
})

const activeLink = ref('')

function updateActiveLink() {
  if (typeof window === 'undefined') return
  
  const scrollPosition = window.scrollY + 100
  
  for (const link of props.links) {
    const id = link.href.substring(1)
    const section = document.getElementById(id)
    
    if (section && section.offsetTop <= scrollPosition && 
        section.offsetTop + section.offsetHeight > scrollPosition) {
      activeLink.value = link.href
      return
    }
  }
}

function smoothScrollTo(event, href) {
  event.preventDefault()
  const targetElement = document.querySelector(href)
  
  if (targetElement) {
    window.scrollTo({
      top: targetElement.offsetTop - 70,
      behavior: 'smooth'
    })
    
    history.pushState(null, null, href)
    
    activeLink.value = href
  }
}

onMounted(() => {
  updateActiveLink()
  window.addEventListener('scroll', updateActiveLink)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveLink)
})
</script>

<style>
.page-nav {
  position: sticky;
  top: 72px;
  max-height: calc(100vh - 72px);
  overflow-y: auto;
  width: 220px;
  float: right;
  margin-left: 30px;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-size: 0.9rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.dark .page-nav {
  background-color: #252529;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.page-nav-title {
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
  font-size: 0.95rem;
}

.dark .page-nav-title {
  color: #e4e4e4;
}

.page-nav ul {
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

.page-nav ul li {
  margin-bottom: 8px;
  line-height: 1.4;
}

.page-nav ul li a {
  color: #13B0EE;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-block;
}

.page-nav ul li a:hover {
  color: #0e8ebf;
  transform: translateX(2px);
}

.page-nav ul li a.active {
  color: #0e8ebf;
  font-weight: 600;
  transform: translateX(3px);
}

/* Make the page navigation responsive */
@media (max-width: 768px) {
  .page-nav {
    position: relative;
    float: none;
    width: 100%;
    margin-left: 0;
    margin-bottom: 25px;
    top: 0;
  }
}

@media (max-width: 640px) {
  .page-nav {
    display: none;
  }
}
</style>
