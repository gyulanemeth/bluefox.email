<script setup>
import { ref } from 'vue'

const props = defineProps({
  faqs: {
    type: Array,
    required: true,
    validator: (value) => {
      return value.every(item => 
        item.question && item.answer && item.sectionId
      )
    }
  }
})

const openIndex = ref(null)

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const scrollToSection = (event, sectionId) => {
  event.preventDefault()
  
  const element = document.querySelector(sectionId)
  
  if (element) {
    openIndex.value = null
    
    setTimeout(() => {
      const yOffset = -80
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      })
      
      history.pushState(null, '', sectionId)
    }, 100)
  }
}
</script>

<template>
  <div class="lesson-tldr">
    <div class="tldr-header">
      <strong>TL;DR</strong>
      <span class="tldr-subtitle">Quick navigation to key sections</span>
    </div>

    <div class="tldr-list">
      <div 
        v-for="(item, index) in faqs" 
        :key="index"
        class="tldr-item"
      >
        <button 
          class="tldr-question"
          :aria-expanded="openIndex === index"
          :aria-controls="`tldr-answer-${index}`"
          @click="toggleFaq(index)"
        >
          <span class="question-text">{{ item.question }}</span>
          <svg 
            class="chevron-icon" 
            :class="{ 'is-open': openIndex === index }"
            width="14" 
            height="14" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="2"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <div 
          v-show="openIndex === index"
          :id="`tldr-answer-${index}`"
          class="tldr-answer"
        >
          <p>{{ item.answer }}</p>
          <a 
            :href="item.sectionId" 
            class="read-more"
            @click="scrollToSection($event, item.sectionId)"
          >
            Read full section →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lesson-tldr {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 16px;
  margin: 24px 0;
  background-color: var(--vp-c-bg-soft);
}

.tldr-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tldr-header strong {
  font-size: 16px;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.tldr-subtitle {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.tldr-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tldr-item {
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  background-color: var(--vp-c-bg);
}

.tldr-question {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.tldr-question:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}

.tldr-question:focus-visible {
  outline: 2px solid var(--vp-c-brand);
  outline-offset: -2px;
}

.question-text {
  flex: 1;
  line-height: 1.5;
}

.chevron-icon {
  flex-shrink: 0;
  color: var(--vp-c-text-3);
}

.tldr-question:hover .chevron-icon {
  color: var(--vp-c-brand);
}

.chevron-icon.is-open {
  transform: rotate(180deg);
  color: var(--vp-c-brand);
}

.tldr-answer {
  padding: 0 14px 14px 14px;
  color: var(--vp-c-text-2);
}

.tldr-answer p {
  margin: 0 0 10px 0;
  font-size: 14px;
  line-height: 1.6;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--vp-c-brand);
  text-decoration: none;
  font-size: 13px;
  font-weight: 500;
}

.read-more:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: underline;
}

/* Mobile responsiveness */
@media (max-width: 640px) {
  .lesson-tldr {
    padding: 14px;
    margin: 20px 0;
  }

  .tldr-header {
    margin-bottom: 14px;
    padding-bottom: 10px;
  }

  .tldr-header strong {
    font-size: 15px;
  }

  .tldr-subtitle {
    font-size: 12px;
  }

  .tldr-question {
    padding: 10px 12px;
    font-size: 13px;
  }

  .tldr-answer {
    padding: 0 12px 12px 12px;
  }

  .tldr-answer p {
    font-size: 13px;
  }

  .read-more {
    font-size: 12px;
  }
}
</style>
