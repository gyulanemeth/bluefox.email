<script setup>
import { ref } from 'vue'

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  },
  lgAndUp: {
    type: Boolean,
    default: true
  },
  md: {
    type: Boolean,
    default: false
  },
  sm: {
    type: Boolean,
    default: false
  },
  xs: {
    type: Boolean,
    default: false
  }
})

const selectedTestimonialId = ref(0)
const testimonials = [
  {
    id: 0,
    name: 'Niccolo Ossude',
    initials: 'NO',
    company: 'Mailsmiths',
    role: 'Agency Owner',
    testimonial: 'As an email marketing agency owner, I had an awesome experience with BlueFox Email. No where else will you be able to get this level of service directly from the founder who made sure my onboarding was smooth, took the time to understand exactly what my requirements were and actually implemented feedback (which is rare these days). Apart from the service, the deliverability is great, automations are solid and email editor is smooth. I\'m really grateful to have found these guys and would strongly recommend them.',
    profileImg: '/assets/testimonials/NiccoloOssude.webp',
    logo: '/assets/testimonials/mailsmiths.webp',
    logoAlt: 'Mailsmiths Logo',
    url: 'https://mailsmiths.com/',
    highlight: 'Great Support, Awesome Platform'
  },
  {
    id: 1,
    name: 'Nicole Darechuk',
    initials: 'ND',
    company: 'Founder @Ndconsulting',
    role: 'Agency Owner',
    testimonial: `One of the best I've had in a long time working with an email marketing platform. I love how easy it is to configure branding elements for repurposing. I also love the campaign configuration and setup of new campaigns is so simple. Add to that, the support to get setup was above and beyond. I would highly recommend!`,
    profileImg: '/assets/testimonials/ND.webp',
    logo: '/assets/testimonials/NDcompany.webp',
    logoAlt: 'ND Logo',
    url: 'https://ndcon.ca/',
    highlight: 'Easy Setup & Configuration'
  },
  {
    id: 2,
    name: 'Gabriel Varaljay',
    initials: 'GV',
    company: 'Founder of TrendFingers.com',
    role: 'Marketing Agency Owner',
    testimonial: `I first used BlueFox Email for my own professional newsletter, and it worked so well that I soon started offering newsletter campaigns to my agency clients too. Email is clearly having a comeback as more people feel worn out by social media noise and want something more direct. What keeps me loyal to BlueFox Email is the team mindset. When I have an idea, it goes on their roadmap and often gets built. The platform keeps getting better, with features that matter in real agency work. I can now see all my clients in one place, top up credits for their campaigns, and give them access to their own accounts where they only see their own statistics. That setup makes client management simple and clean. BlueFox Email is a perfect fit for marketing agencies, while costing a fraction of what Mailchimp charges, and for that reason alone, I can confidently recommend it.`,
    profileImg: '/assets/testimonials/gabriel-varaljay.webp',
    logo: '/assets/testimonials/trendfingers.webp',
    logoAlt: 'TrendFingers Logo',
    url: 'https://trendfingers.com',
    highlight: 'Full control & transparency'
  },
  {
    id: 3,
    name: 'Garth Brennan',
    initials: 'GB',
    company: 'POS Solutions Australia',
    role: 'Technical Director',
    testimonial: 'We have recently started using Bluefox. The combination of the Bluefox design tools and the reliability of AWS is very impressive. The emails we create appear in our clients\' inboxes exactly how we have designed them. This is a big step forward for us, after having issues with other email platforms, where the design was definitely not uniform across all email clients.',
    profileImg: '/assets/testimonials/garth-brennan.webp',
    logo: '/assets/testimonials/possolutions-logo.webp',
    logoAlt: 'POS Solutions Logo',
    url: 'https://possolutions.com.au',
    highlight: 'Perfect email rendering'
  },
  {
    id: 4,
    name: 'Matt Luo',
    initials: 'ML',
    company: 'Founder of ClarityText.com',
    role: 'Startup Founder',
    testimonial: `ClarityText chose Bluefox because it guides us toward success. Unlike with other vendors and libraries, it's Bluefox's responsibility to make sure that our emails fit in every client and device. This is a big relief for a startup. Also, Bluefox's pricing is easy to understand, unlike a typical and complicated contacts-based pricing.`,
    profileImg: '/assets/testimonials/matt-luo.webp',
    logo: '/assets/testimonials/clarity-text.svg',
    logoAlt: 'ClarityText Logo',
    url: 'https://www.claritytext.com',
    highlight: 'Simple, transparent pricing'
  },
  {
    id: 5,
    name: 'Gergely Csaba Nagy',
    initials: 'GN',
    company: 'Head of Marketing @chamaileon.io',
    role: 'Marketing Lead',
    testimonial: `When I saw the delivery stats from my first campaign sent with BlueFox, I had to double-check the click rate—I could hardly believe it! It appears that every email landed in the primary inbox, and the deliverability and tracking are simply outstanding. BlueFox has set a new standard for me.`,
    profileImg: '/assets/testimonials/gergely-nagy.webp',
    logo: '/assets/testimonials/chamaileon.svg',
    logoAlt: 'Chamaileon Logo',
    url: 'https://chamaileon.io/',
    highlight: 'Outstanding deliverability'
  }
]

const mobileEmailView = ref(true)

function selectTestimonialEmail (id) {
  selectedTestimonialId.value = id
  mobileEmailView.value = true
}
</script>

<template>
    <v-card
      v-if="lgAndUp || md"
      elevation="0"
      :theme="isDark ? 'dark' : 'light'"
      class="testimonial-inbox"
      rounded="xl"
    >
      <!-- Mac-style Window Header -->
      <div class="window-header">
        <div class="window-controls">
          <span class="window-dot red"></span>
          <span class="window-dot yellow"></span>
          <span class="window-dot green"></span>
        </div>
        <div class="window-title">Customer Love</div>
        <div class="window-spacer"></div>
      </div>

      <!-- Toolbar -->
      <div class="inbox-toolbar">
        <div class="toolbar-section">
          <v-icon size="small" class="toolbar-icon">mdi-email-outline</v-icon>
          <v-icon size="small" class="toolbar-icon">mdi-star-outline</v-icon>
        </div>
        <div class="toolbar-section">
          <v-icon size="small" class="toolbar-icon">mdi-archive-outline</v-icon>
          <v-icon size="small" class="toolbar-icon">mdi-delete-outline</v-icon>
        </div>
        <v-spacer />
        <div class="toolbar-section" v-if="lgAndUp">
          <v-text-field
            prepend-inner-icon="mdi-magnify"
            placeholder="Search testimonials..."
            variant="outlined"
            density="compact"
            hide-details
            disabled
            class="search-field"
          />
        </div>
      </div>

      <v-divider class="toolbar-divider" />

      <!-- Main Content -->
      <div class="inbox-content">
        <!-- Sidebar: Email List -->
        <div class="email-list">
          <v-list 
            lines="three" 
            color="primary"
            class="testimonial-list"
          >
            <v-list-item
              v-for="item in testimonials"
              :key="item.id"
              :value="item.id"
              :active="item.id === selectedTestimonialId"
              @click="selectTestimonialEmail(item.id)"
              class="email-list-item"
              :class="{ 'active-item': item.id === selectedTestimonialId }"
            >
              <template v-slot:prepend>
                <v-avatar
                  :image="item.profileImg"
                  size="48"
                  class="email-avatar"
                />
              </template>

              <v-list-item-title class="email-sender">
                {{ item.name }}
                <v-chip 
                  size="x-small" 
                  class="ml-2 role-chip"
                  variant="tonal"
                >
                  {{ item.role }}
                </v-chip>
              </v-list-item-title>
              
              <v-list-item-subtitle class="email-subject">
                {{ item.highlight }}
              </v-list-item-subtitle>
              
              <v-list-item-subtitle class="email-preview">
                {{ item.testimonial.substring(0, 80) }}...
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </div>

        <v-divider vertical />

        <!-- Main: Email Content -->
        <div class="email-content">
          <!-- Email Header -->
          <div class="email-header">
            <div class="d-flex align-center">
              <v-avatar
                :image="testimonials[selectedTestimonialId].profileImg"
                size="56"
                class="mr-4"
              />
              <div class="flex-grow-1">
                <div class="email-from">
                  {{ testimonials[selectedTestimonialId].name }}
                </div>
                <div class="email-meta">
                  {{ testimonials[selectedTestimonialId].company }}
                </div>
              </div>
              <v-chip 
                color="primary" 
                variant="tonal"
                size="small"
                prepend-icon="mdi-check-circle"
              >
                Verified Customer
              </v-chip>
            </div>
          </div>

          <v-divider class="my-4" />

          <!-- Email Body -->
          <div class="email-body">
            <div class="testimonial-quote">
              <v-icon class="quote-icon quote-start">mdi-format-quote-open</v-icon>
              <p class="testimonial-text">
                {{ testimonials[selectedTestimonialId].testimonial }}
              </p>
              <v-icon class="quote-icon quote-end">mdi-format-quote-close</v-icon>
            </div>

            <!-- Company Logo Card -->
            <div class="company-card">
              <a
                :href="testimonials[selectedTestimonialId].url"
                target="_blank"
                rel="noopener noreferrer"
                class="company-link"
              >
                <img
                  :src="testimonials[selectedTestimonialId].logo"
                  :alt="testimonials[selectedTestimonialId].logoAlt"
                  class="company-logo"
                />
                <div class="visit-text">
                  <v-icon size="small">mdi-open-in-new</v-icon>
                  Visit Website
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </v-card>

    <!-- Mobile View -->
    <div v-else-if="xs" class="mobile-testimonials">
      <v-card
        v-if="mobileEmailView"
        :theme="isDark ? 'dark' : 'light'"
        rounded="lg"
        elevation="2"
      >
        <!-- Mobile Header -->
        <div class="mobile-header">
          <v-btn
            icon
            variant="text"
            size="small"
            @click="mobileEmailView = false"
          >
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
          <span class="mobile-title">Testimonial</span>
          <div class="d-flex">
            <v-btn
              icon
              variant="text"
              size="small"
              :disabled="selectedTestimonialId === 0"
              @click="selectedTestimonialId--"
            >
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn
              icon
              variant="text"
              size="small"
              :disabled="selectedTestimonialId === testimonials.length - 1"
              @click="selectedTestimonialId++"
            >
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
        </div>

        <v-divider />

        <!-- Mobile Content -->
        <div class="mobile-content">
          <div class="mobile-sender">
            <v-avatar
              :image="testimonials[selectedTestimonialId].profileImg"
              size="64"
              class="mb-3"
            />
            <h3 class="mb-1">{{ testimonials[selectedTestimonialId].name }}</h3>
            <p class="text-subtitle-2 text-medium-emphasis mb-2">
              {{ testimonials[selectedTestimonialId].company }}
            </p>
            <v-chip size="small" color="primary" variant="tonal">
              {{ testimonials[selectedTestimonialId].role }}
            </v-chip>
          </div>

          <v-divider class="my-4" />

          <div class="mobile-testimonial">
            <p class="testimonial-text">
              {{ testimonials[selectedTestimonialId].testimonial }}
            </p>
          </div>

          <div class="mobile-company">
            <a
              :href="testimonials[selectedTestimonialId].url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                :src="testimonials[selectedTestimonialId].logo"
                :alt="testimonials[selectedTestimonialId].logoAlt"
                class="mobile-logo"
              />
            </a>
          </div>
        </div>
      </v-card>

      <!-- Mobile List View -->
      <v-card
        v-else
        :theme="isDark ? 'dark' : 'light'"
        rounded="lg"
        elevation="2"
      >
        <div class="mobile-header">
          <span class="mobile-title">Customer Testimonials</span>
        </div>
        <v-divider />
        <v-list lines="three">
          <v-list-item
            v-for="item in testimonials"
            :key="item.id"
            @click="selectTestimonialEmail(item.id)"
            class="mobile-list-item"
          >
            <template v-slot:prepend>
              <v-avatar :image="item.profileImg" size="48" />
            </template>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ item.company }}</v-list-item-subtitle>
            <v-list-item-subtitle class="mobile-preview">
              {{ item.testimonial.substring(0, 60) }}...
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card>
    </div>

    <!-- Tablet View (sm) -->
    <v-card
      v-else-if="sm"
      :theme="isDark ? 'dark' : 'light'"
      class="testimonial-inbox"
      rounded="xl"
      elevation="2"
    >
      <div class="window-header">
        <div class="window-controls">
          <span class="window-dot red"></span>
          <span class="window-dot yellow"></span>
          <span class="window-dot green"></span>
        </div>
        <div class="window-title">Customer Love</div>
      </div>

      <div class="inbox-toolbar">
        <v-icon size="small" class="toolbar-icon">mdi-email-outline</v-icon>
        <v-icon size="small" class="toolbar-icon">mdi-star-outline</v-icon>
        <v-spacer />
        <v-icon size="small" class="toolbar-icon">mdi-magnify</v-icon>
      </div>

      <v-divider />

      <div class="inbox-content-tablet">
        <div class="email-list-tablet">
          <v-list lines="two" color="primary">
            <v-list-item
              v-for="item in testimonials"
              :key="item.id"
              :active="item.id === selectedTestimonialId"
              @click="selectTestimonialEmail(item.id)"
              class="tablet-list-item"
            >
              <template v-slot:prepend>
                <v-avatar :image="item.profileImg" size="40" />
              </template>
              <v-list-item-title class="text-body-2">{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle class="text-caption">
                {{ item.highlight }}
              </v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </div>

        <v-divider vertical />

        <div class="email-content-tablet">
          <div class="tablet-sender">
            <v-avatar
              :image="testimonials[selectedTestimonialId].profileImg"
              size="48"
              class="mr-3"
            />
            <div>
              <div class="font-weight-bold">{{ testimonials[selectedTestimonialId].name }}</div>
              <div class="text-caption">{{ testimonials[selectedTestimonialId].company }}</div>
            </div>
          </div>
          <v-divider class="my-3" />
          <div class="tablet-testimonial">
            <p>{{ testimonials[selectedTestimonialId].testimonial }}</p>
            <a
              :href="testimonials[selectedTestimonialId].url"
              target="_blank"
              class="d-block mt-4"
            >
              <img
                :src="testimonials[selectedTestimonialId].logo"
                :alt="testimonials[selectedTestimonialId].logoAlt"
                style="height: 40px;"
              />
            </a>
          </div>
        </div>
      </div>
    </v-card>
</template>

<style scoped>
/* Desktop: Modern Inbox Design */
.testimonial-inbox {
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.08);
}

html.dark .testimonial-inbox {
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.window-header {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

html.dark .window-header {
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.window-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.window-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
}

.window-dot.red {
  background: #ff5f57;
}

.window-dot.yellow {
  background: #ffbd2e;
}

.window-dot.green {
  background: #28ca42;
}

.window-title {
  flex: 1;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.window-spacer {
  width: 76px;
}

.inbox-toolbar {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  gap: 12px;
  background: var(--vp-c-bg);
}

.toolbar-section {
  display: flex;
  gap: 8px;
  align-items: center;
}

.toolbar-icon {
  opacity: 0.6;
  cursor: not-allowed;
}

.toolbar-divider {
  margin: 0 !important;
}

.search-field {
  max-width: 240px;
}

.inbox-content {
  display: flex;
  height: 600px;
}

.email-list {
  width: 340px;
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
  border-right: 1px solid var(--vp-c-divider);
}

.testimonial-list {
  padding: 0 !important;
  background: transparent !important;
}

.email-list-item {
  border-bottom: 1px solid var(--vp-c-divider);
  transition: all 0.2s ease;
  cursor: pointer;
  padding: 16px !important;
}

.email-list-item:hover {
  background: rgba(19, 176, 238, 0.08);
}

html.dark .email-list-item:hover {
  background: rgba(19, 176, 238, 0.12);
}

.email-list-item.active-item {
  background: rgba(19, 176, 238, 0.15);
  border-left: 3px solid #13B0EE;
}

html.dark .email-list-item.active-item {
  background: rgba(19, 176, 238, 0.2);
  border-left: 3px solid #13B0EE;
}

/* Fix active state text visibility */
.email-list-item.active-item .email-sender,
.email-list-item.active-item .email-subject,
.email-list-item.active-item .email-preview {
  color: var(--vp-c-text-1) !important;
  opacity: 1 !important;
}

html.dark .email-list-item.active-item .email-sender,
html.dark .email-list-item.active-item .email-subject,
html.dark .email-list-item.active-item .email-preview {
  color: var(--vp-c-text-1) !important;
  opacity: 1 !important;
}

.email-avatar {
  border: 2px solid rgba(19, 176, 238, 0.3);
}

.email-list-item.active-item .email-avatar {
  border: 2px solid #13B0EE;
}

.email-sender {
  font-weight: 600 !important;
  font-size: 14px !important;
  margin-bottom: 4px !important;
  display: flex;
  align-items: center;
  color: var(--vp-c-text-1) !important;
}

.role-chip {
  font-size: 10px !important;
  height: 18px !important;
}

.email-subject {
  font-weight: 500 !important;
  font-size: 13px !important;
  color: #13B0EE !important;
  margin-bottom: 4px !important;
}

html.dark .email-subject {
  color: #13B0EE !important;
}

.email-preview {
  font-size: 12px !important;
  opacity: 0.7 !important;
  line-height: 1.4 !important;
  margin-top: 4px !important;
  color: var(--vp-c-text-2) !important;
}

.email-content {
  flex: 1;
  overflow-y: auto;
  padding: 32px;
  background: var(--vp-c-bg);
}

.email-header {
  margin-bottom: 24px;
}

.email-from {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 4px;
  color: var(--vp-c-text-1);
}

.email-meta {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.email-body {
  padding: 0;
}

/* Match HeroUnit gradient colors */
.testimonial-quote {
  position: relative;
  padding: 32px;
  background: linear-gradient(278deg, hsl(247.72, 53.44%, 90%) 10%, hsl(196.99, 86.56%, 90%) 90%);
  border-radius: 16px;
  border-left: 4px solid #13B0EE;
  margin-bottom: 32px;
}

html.dark .testimonial-quote {
  background: linear-gradient(278deg, hsl(247.72, 53.44%, 10%) 10%, hsl(196.99, 86.56%, 10%) 90%);
  border-left: 4px solid #13B0EE;
}

.quote-icon {
  opacity: 0.15;
  font-size: 48px;
  position: absolute;
  color: #392C91;
}

html.dark .quote-icon {
  color: #13B0EE;
  opacity: 0.2;
}

.quote-start {
  top: 16px;
  left: 16px;
}

.quote-end {
  bottom: 16px;
  right: 16px;
}

.testimonial-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--vp-c-text-1);
  margin: 0;
  position: relative;
  z-index: 1;
  padding: 2rem;
  font-weight: 500;
}

html.dark .testimonial-text {
  color: var(--vp-c-text-1);
}

.company-card {
  display: inline-flex;
  align-items: center;
  padding: 20px 32px;
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.company-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(19, 176, 238, 0.15);
  border-color: #13B0EE;
}

html.dark .company-card:hover {
  box-shadow: 0 8px 16px rgba(19, 176, 238, 0.25);
  border-color: #13B0EE;
}

.company-link {
  display: flex;
  align-items: center;
  gap: 16px;
  text-decoration: none;
}

.company-logo {
  height: 48px;
  width: auto;
  max-width: 180px;
  object-fit: contain;
  filter: grayscale(30%);
  transition: filter 0.3s ease;
}

.company-card:hover .company-logo {
  filter: grayscale(0%);
}

.visit-text {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #13B0EE;
}

html.dark .visit-text {
  color: #13B0EE;
}

/* Mobile Styles */
.mobile-testimonials {
  padding: 0;
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--vp-c-bg-soft);
}

.mobile-title {
  font-weight: 600;
  font-size: 16px;
  color: var(--vp-c-text-1);
}

.mobile-content {
  padding: 24px;
}

.mobile-sender {
  text-align: center;
}

.mobile-testimonial {
  padding: 24px 0;
}

/* Mobile testimonial quote styling */
.mobile-testimonial .testimonial-text {
  background: linear-gradient(278deg, hsl(247.72, 53.44%, 90%) 10%, hsl(196.99, 86.56%, 90%) 90%);
  padding: 24px;
  border-radius: 12px;
  border-left: 3px solid #13B0EE;
}

html.dark .mobile-testimonial .testimonial-text {
  background: linear-gradient(278deg, hsl(247.72, 53.44%, 10%) 10%, hsl(196.99, 86.56%, 10%) 90%);
}

.mobile-company {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid var(--vp-c-divider);
}

.mobile-logo {
  height: 48px;
  width: auto;
}

.mobile-list-item {
  cursor: pointer;
  transition: background 0.2s ease;
}

.mobile-list-item:hover {
  background: rgba(19, 176, 238, 0.08);
}

html.dark .mobile-list-item:hover {
  background: rgba(19, 176, 238, 0.12);
}

.mobile-preview {
  margin-top: 8px !important;
  font-size: 13px !important;
}

/* Tablet Styles */
.inbox-content-tablet {
  display: flex;
  height: 500px;
}

.email-list-tablet {
  width: 280px;
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
}

.tablet-list-item {
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: background 0.2s ease;
}

.tablet-list-item:hover {
  background: rgba(19, 176, 238, 0.08);
}

html.dark .tablet-list-item:hover {
  background: rgba(19, 176, 238, 0.12);
}

.tablet-list-item[aria-selected="true"] {
  background: rgba(19, 176, 238, 0.15);
  border-left: 3px solid #13B0EE;
}

html.dark .tablet-list-item[aria-selected="true"] {
  background: rgba(19, 176, 238, 0.2);
}

.email-content-tablet {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.tablet-sender {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.tablet-testimonial {
  font-size: 14px;
  line-height: 1.7;
}

/* Tablet testimonial quote styling */
.tablet-testimonial p {
  background: linear-gradient(278deg, hsl(247.72, 53.44%, 90%) 10%, hsl(196.99, 86.56%, 90%) 90%);
  padding: 20px;
  border-radius: 12px;
  border-left: 3px solid #13B0EE;
  margin: 0;
}

html.dark .tablet-testimonial p {
  background: linear-gradient(278deg, hsl(247.72, 53.44%, 10%) 10%, hsl(196.99, 86.56%, 10%) 90%);
}

/* Scrollbar Styling */
.email-list::-webkit-scrollbar,
.email-content::-webkit-scrollbar {
  width: 8px;
}

.email-list::-webkit-scrollbar-track,
.email-content::-webkit-scrollbar-track {
  background: transparent;
}

.email-list::-webkit-scrollbar-thumb,
.email-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}

html.dark .email-list::-webkit-scrollbar-thumb,
html.dark .email-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}
</style>
