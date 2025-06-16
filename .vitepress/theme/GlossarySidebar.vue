<template>
  <aside class="vp-toc-clone">
    <div class="vp-doc">
      <div class="vp-toc-container">
        <div class="vp-toc-title">On this page</div>
        <nav class="vp-toc">
          <ul class="vp-toc-list">
            <li v-for="letter in letters" :key="letter" 
                :class="['vp-toc-item', { active: active === letter.toLowerCase() }]">
              <a class="vp-toc-link" 
                 :href="'#' + letter.toLowerCase()" 
                 @click="scrollToLetter($event, letter.toLowerCase())"
                 :class="{ active: active === letter.toLowerCase() }">
                 <div class="vp-toc-link-content">
                   <span class="vp-toc-marker" :class="{ visible: active === letter.toLowerCase() }"></span>
                   <span class="vp-toc-text">{{ letter }}</span>
                 </div>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { ref, onMounted, nextTick, onBeforeUnmount } from 'vue';

const props = defineProps({
  letters: {
    type: Array,
    default: () => ["C", "D", "E", "I", "M", "P", "R", "S", "T"]
  }
});

const letters = props.letters;
const active = ref('');

function scrollToLetter(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (el) {
    const headerOffset = 80; // Adjust based on your fixed header height
    const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    
    // Update active state immediately for better feedback
    active.value = id;
  }
}

function highlightOnScroll() {
  const scrollY = window.scrollY;
  const headerHeight = 120;
  let current = '';
  const visibleSections = letters
    .map(letter => {
      const el = document.getElementById(letter.toLowerCase());
      if (!el) return null;
      
      const top = el.offsetTop - headerHeight;
      const bottom = top + el.offsetHeight;
      const isVisible = scrollY >= top && scrollY <= bottom;
      
      return { id: letter.toLowerCase(), top, isVisible };
    })
    .filter(Boolean);
    
  // Find the first visible section, or the closest section above the viewport
  const currentSection = visibleSections.find(section => section.isVisible) || 
                         [...visibleSections].reverse().find(section => section.top < scrollY);
                         
  if (currentSection) {
    current = currentSection.id;
  }
  
  active.value = current;
}

onMounted(() => {
  nextTick(() => {
    window.addEventListener('scroll', highlightOnScroll, { passive: true });
    highlightOnScroll();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', highlightOnScroll);
});
</script>

<style scoped>
.vp-toc-clone {
  position: sticky;
  top: 100px;
  width: 256px;
  background: var(--vp-c-bg, #fff);
  padding-left: 11px;
  font-size: 14px;
  color: var(--vp-c-text-2, #444);
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  display: block;
  margin-left: 10px;
}

.vp-toc-container {
  position: relative;
}

.vp-toc-title {
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--vp-c-text-2, #888);
  margin-bottom: 0.75rem;
  letter-spacing: 0.4px;
  line-height: 20px;
  padding-left: 8px;
}

.vp-toc-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
  position: relative;
  list-style-image: none;
  border-left: 1px solid var(--vp-c-divider);
  padding-bottom: 1em;
}

.vp-toc-item {
  margin: 0;
  padding: 0;
  text-align: left;
  line-height: 20px;
  list-style: none;
}

.vp-toc-link {
  display: block;
  color: var(--vp-c-text-2, #888);
  text-decoration: none !important;
  font-size: 13px;
  font-weight: 400;
  padding: 6px 0;
  transition: font-weight 0.2s;
  border-bottom: none;
}

.vp-toc-link:hover .vp-toc-text {
  color: var(--vp-c-text-1);
  text-decoration: none !important;
}

.vp-toc-link.active {
  color: var(--vp-c-text-1, #000); /* Use theme text color when active */
  font-weight: 600; /* Bold when active */
  text-decoration: none !important;
}

.vp-toc-link-content {
  display: flex;
  align-items: flex-start;
  text-decoration: none;
  border-bottom: none;
}

.vp-toc-marker {
  opacity: 0;
  position: absolute;
  left: 0;
  width: 1.4px;
  background-color: var(--vp-c-text-1, #000);
  border-radius: 0 4px 4px 0;
  height: 20px;
  transition: opacity 0.25s, transform 0.25s ease-out;
  transform: translateY(0);
  z-index: 1;
}

.vp-toc-marker.visible {
  opacity: 1;
}

.vp-toc-text {
  padding-left: 12px;
  color: var(--vp-c-text-2);
  text-decoration: none;
  position: relative;
}

@media (max-width: 1276px) {
  .vp-toc-clone { display: none; }
}
</style>
