<script setup>
import { computed } from 'vue'

const props = defineProps({
  testimonialIds: {
    type: Array,
    default: null
  }
})

const testimonials = [
  {
    id: 0,
    name: 'Niccolo Ossude',
    company: 'Mailsmiths',
    role: 'Agency Owner',
    testimonial: 'As an email marketing agency owner, I had an awesome experience with BlueFox Email. No where else will you be able to get this level of service directly from the founder who made sure my onboarding was smooth, took the time to understand exactly what my requirements were and actually implemented feedback (which is rare these days). Apart from the service, the deliverability is great, automations are solid and email editor is smooth.',
    profileImg: '/assets/testimonials/NiccoloOssude.webp',
    logo: '/assets/testimonials/mailsmiths.webp',
    logoAlt: 'Mailsmiths Logo',
    url: 'https://mailsmiths.com/'
  },
  {
    id: 1,
    name: 'Nicole Darechuk',
    company: 'Founder @Ndconsulting',
    role: 'Agency Owner',
    testimonial: `One of the best I've had in a long time working with an email marketing platform. I love how easy it is to configure branding elements for repurposing. I also love the campaign configuration and setup of new campaigns is so simple. Add to that, the support to get setup was above and beyond.`,
    profileImg: '/assets/testimonials/ND.webp',
    logo: '/assets/testimonials/NDcompany.webp',
    logoAlt: 'ND Logo',
    url: 'https://ndcon.ca/'
  },
  {
    id: 2,
    name: 'Gabriel Varaljay',
    company: 'Founder of TrendFingers.com',
    role: 'Marketing Agency Owner',
    testimonial: `I can now see all my clients in one place, top up credits for their campaigns, and give them access to their own accounts where they only see their own statistics. That setup makes client management simple and clean. BlueFox Email is a perfect fit for marketing agencies, while costing a fraction of what Mailchimp charges.`,
    profileImg: '/assets/testimonials/gabriel-varaljay.webp',
    logo: '/assets/testimonials/Trendfingers-logo.webp',
    logoAlt: 'TrendFingers Logo',
    url: 'https://trendfingers.com'
  },
  {
    id: 3,
    name: 'Garth Brennan',
    company: 'POS Solutions Australia',
    role: 'Technical Director',
    testimonial: 'We have recently started using Bluefox. The combination of the BlueFox Email design tools and the reliability of AWS is very impressive. The emails we create appear in our clients\' inboxes exactly how we have designed them, after having issues with other platforms where the design was not uniform across all email clients.',
    profileImg: '/assets/testimonials/garth-brennan.webp',
    logo: '/assets/testimonials/possolutions-logo.webp',
    logoAlt: 'POS Solutions Logo',
    url: 'https://possolutions.com.au'
  },
  {
    id: 4,
    name: 'Matt Luo',
    company: 'Founder of ClarityText.com',
    role: 'Startup Founder',
    testimonial: `ClarityText chose BlueFox Email because it guides us toward success. Unlike with other vendors and libraries, it's BlueFox Email's responsibility to make sure that our emails fit in every client and device. This is a big relief for a startup. Also, pricing is easy to understand, unlike a typical and complicated contacts-based pricing.`,
    profileImg: '/assets/testimonials/matt-luo.webp',
    logo: '/assets/testimonials/clarity-text.svg',
    logoAlt: 'ClarityText Logo',
    url: 'https://www.claritytext.com'
  },
  {
    id: 5,
    name: 'Gergely Csaba Nagy',
    company: 'Head of Marketing @chamaileon.io',
    role: 'Marketing Lead',
    testimonial: `When I saw the delivery stats from my first campaign sent with BlueFox Email, I had to double-check the click rate. It appears that every email landed in the primary inbox, and the deliverability and tracking are simply outstanding. BlueFox Email has set a new standard for me.`,
    profileImg: '/assets/testimonials/gergely-nagy.webp',
    logo: '/assets/testimonials/chamaileon.svg',
    logoAlt: 'Chamaileon Logo',
    url: 'https://chamaileon.io/'
  }
]

const visibleTestimonials = computed(() =>
  props.testimonialIds ? testimonials.filter(t => props.testimonialIds.includes(t.id)) : testimonials
)
</script>

<template>
  <div class="testimonial-grid" role="list">
    <article
      v-for="t in visibleTestimonials"
      :key="t.id"
      class="testimonial-card"
      role="listitem"
    >
      <p class="testimonial-text">{{ t.testimonial }}</p>
      <div class="testimonial-footer">
        <v-avatar :image="t.profileImg" size="44" class="testimonial-avatar" />
        <div class="testimonial-who">
          <div class="testimonial-name">{{ t.name }}</div>
          <div class="testimonial-role">{{ t.role }}, {{ t.company }}</div>
        </div>
        <a
          v-if="t.logo"
          :href="t.url"
          target="_blank"
          rel="noopener noreferrer"
          class="testimonial-logo-link"
          :aria-label="`Visit ${t.company}`"
        >
          <img :src="t.logo" :alt="t.logoAlt" class="testimonial-logo" width="72" height="24" loading="lazy" decoding="async" />
        </a>
      </div>
    </article>
  </div>
</template>

<style scoped>
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 28px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}

html.dark .testimonial-card {
  background: #1e293b;
  border-color: #334155;
}

.testimonial-text {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.65;
  color: #334155;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

html.dark .testimonial-text { color: #cbd5e1; }

.testimonial-footer {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
}

html.dark .testimonial-footer { border-top-color: #334155; }

.testimonial-who {
  flex: 1;
  min-width: 0;
}

.testimonial-name {
  font-size: 14px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .testimonial-name { color: #f1f5f9; }

.testimonial-role {
  font-size: 12.5px;
  line-height: 1.4;
  color: #64748b;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

html.dark .testimonial-role { color: #94a3b8; }

.testimonial-logo-link {
  flex-shrink: 0;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.testimonial-logo-link:hover { opacity: 1; }

.testimonial-logo {
  height: 24px;
  width: auto;
  max-width: 72px;
  object-fit: contain;
}

@media (max-width: 960px) {
  .testimonial-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .testimonial-grid { grid-template-columns: 1fr; }
  .testimonial-card { padding: 22px; }
}
</style>
