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
    date: '1 day ago',
    subject: 'Awesome Experience with BlueFox Email',
    testimonial: 'As an email marketing agency owner, I had an awesome experience with BlueFox Email. No where else will you be able to get this level of service directly from the founder who made sure my onboarding was smooth, took the time to understand exactly what my requirements were and actually implemented feedback (which is rare these days). Apart from the service, the deliverability is great, automations are solid and email editor is smooth. I\'m really grateful to have found these guys and would strongly recommend them.',
    profileImg: '/assets/testimonials/NiccoloOssude.webp',
    logo: '/assets/testimonials/mailsmiths.webp',
    logoAlt: 'Mailsmiths Logo',
    url: 'https://mailsmiths.com/',
    highlight: 'Great Support, Awesome Platform',
    starred: true,
    unread: true
  },
  {
    id: 1,
    name: 'Nicole Darechuk',
    initials: 'ND',
    company: 'Founder @Ndconsulting',
    role: 'Agency Owner',
    date: '3 days ago',
    subject: 'Amazing Experience with BlueFox Email',
    testimonial: `One of the best I've had in a long time working with an email marketing platform. I love how easy it is to configure branding elements for repurposing. I also love the campaign configuration and setup of new campaigns is so simple. Add to that, the support to get setup was above and beyond. I would highly recommend!`,
    profileImg: '/assets/testimonials/ND.webp',
    logo: '/assets/testimonials/NDcompany.webp',
    logoAlt: 'ND Logo',
    url: 'https://ndcon.ca/',
    starred: true,
    unread: false
  },
  {
    id: 2,
    name: 'Gabriel Varaljay',
    initials: 'GV',
    company: 'Founder of TrendFingers.com',
    role: 'Marketing Agency Owner',
    date: '5 days ago',
    subject: 'Re: BlueFox Email - Perfect for My Newsletter',
    testimonial: `I've been using Blue Fox to send out my newsletters, and I couldn't be happier. The system integrates seamlessly with my own AWS SES, giving me full control and transparency without the hefty price tag of overpriced black-box solutions like Mailchimp. It's an excellent choice for anyone seeking reliability and efficiency.`,
    profileImg: '/assets/testimonials/gabriel-varaljay.webp',
    logo: '/assets/testimonials/trendfingers.webp',
    logoAlt: 'TrendFingers Logo',
    url: 'https://trendfingers.com',
    highlight: 'Full control & transparency',
    starred: true,
    unread: false
  },
  {
    id: 3,
    name: 'Garth Brennan',
    initials: 'GB',
    company: 'POS Solutions Australia',
    role: 'Technical Director',
    date: '1 week ago',
    subject: 'Email Rendering Finally Works!',
    testimonial: 'We have recently started using Bluefox. The combination of the BlueFox Email design tools and the reliability of AWS is very impressive. The emails we create appear in our clients\' inboxes exactly how we have designed them. This is a big step forward for us, after having issues with other email platforms, where the design was definitely not uniform across all email clients.',
    profileImg: '/assets/testimonials/garth-brennan.webp',
    logo: '/assets/testimonials/possolutions-logo.webp',
    logoAlt: 'POS Solutions Logo',
    url: 'https://possolutions.com.au',
    highlight: 'Perfect email rendering',
    starred: false,
    unread: false
  },
  {
    id: 4,
    name: 'Matt Luo',
    initials: 'ML',
    company: 'Founder of ClarityText.com',
    role: 'Startup Founder',
    date: '2 weeks ago',
    subject: 'Why ClarityText Chose BlueFox Email',
    testimonial: `ClarityText chose BlueFox Email because it guides us toward success. Unlike with other vendors and libraries, it's BlueFox Email's responsibility to make sure that our emails fit in every client and device. This is a big relief for a startup. Also, BlueFox Email's pricing is easy to understand, unlike a typical and complicated contacts-based pricing.`,
    profileImg: '/assets/testimonials/matt-luo.webp',
    logo: '/assets/testimonials/clarity-text.svg',
    logoAlt: 'ClarityText Logo',
    url: 'https://www.claritytext.com',
    highlight: 'Simple, transparent pricing',
    starred: false,
    unread: false
  },
  {
    id: 5,
    name: 'Gergely Csaba Nagy',
    initials: 'GN',
    company: 'Head of Marketing @chamaileon.io',
    role: 'Marketing Lead',
    date: '3 weeks ago',
    subject: 'Incredible Delivery Stats!',
    testimonial: `When I saw the delivery stats from my first campaign sent with BlueFox Email, I had to double-check the click rate—I could hardly believe it! It appears that every email landed in the primary inbox, and the deliverability and tracking are simply outstanding. BlueFox Email has set a new standard for me.`,
    profileImg: '/assets/testimonials/gergely-nagy.webp',
    logo: '/assets/testimonials/chamaileon.svg',
    logoAlt: 'Chamaileon Logo',
    url: 'https://chamaileon.io/',
    highlight: 'Outstanding deliverability',
    starred: true,
    unread: false
  }
]

const mobileEmailView = ref(true)

function selectTestimonial(id) {
  selectedTestimonialId.value = id
  mobileEmailView.value = true
}
</script>

<template>
  <div class="apple-mail-container">
    <!-- Desktop View -->
    <div v-if="lgAndUp || md" class="apple-mail-desktop">
      <!-- Window Chrome -->
      <div class="mail-window">
        <div class="window-titlebar">
          <div class="traffic-lights">
            <span class="traffic-light close"></span>
            <span class="traffic-light minimize"></span>
            <span class="traffic-light maximize"></span>
          </div>
          <div class="window-title">Customer Testimonials</div>
          <div class="window-controls">
            <v-icon size="16" class="control-icon">mdi-cog-outline</v-icon>
          </div>
        </div>

        <!-- Toolbar -->
        <div class="mail-toolbar">
          <div class="toolbar-left">
            <v-btn icon variant="text" size="small" class="toolbar-btn">
              <v-icon size="20">mdi-email-edit-outline</v-icon>
            </v-btn>
            <v-divider vertical class="mx-2" style="height: 20px;" />
            <v-btn icon variant="text" size="small" class="toolbar-btn" disabled>
              <v-icon size="20">mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn icon variant="text" size="small" class="toolbar-btn" disabled>
              <v-icon size="20">mdi-archive-outline</v-icon>
            </v-btn>
            <v-btn icon variant="text" size="small" class="toolbar-btn" disabled>
              <v-icon size="20">mdi-reply</v-icon>
            </v-btn>
          </div>
          <div class="toolbar-right">
            <v-text-field
              prepend-inner-icon="mdi-magnify"
              placeholder="Search"
              variant="outlined"
              density="compact"
              hide-details
              disabled
              class="search-input"
            />
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="mail-content">
          <!-- Sidebar -->
          <div class="mail-sidebar">
            <div class="sidebar-section">
              <div class="sidebar-title">MAILBOXES</div>
              <div class="sidebar-item active">
                <v-icon size="18" class="mr-2">mdi-inbox</v-icon>
                <span class="sidebar-label">Inbox</span>
                <span class="sidebar-count">{{ testimonials.length }}</span>
              </div>
              <div class="sidebar-item">
                <v-icon size="18" class="mr-2">mdi-star-outline</v-icon>
                <span class="sidebar-label">Starred</span>
                <span class="sidebar-count">{{ testimonials.filter(t => t.starred).length }}</span>
              </div>
              <div class="sidebar-item">
                <v-icon size="18" class="mr-2">mdi-send</v-icon>
                <span class="sidebar-label">Sent</span>
              </div>
              <div class="sidebar-item">
                <v-icon size="18" class="mr-2">mdi-file-outline</v-icon>
                <span class="sidebar-label">Drafts</span>
              </div>
            </div>
          </div>

          <!-- Message List -->
          <div class="message-list">
            <div class="list-header">
              <span class="list-title">Inbox</span>
              <span class="list-count">{{ testimonials.length }} messages</span>
            </div>
            <div
              v-for="item in testimonials"
              :key="item.id"
              class="message-item"
              :class="{ 
                'selected': item.id === selectedTestimonialId,
                'unread': item.unread
              }"
              @click="selectTestimonial(item.id)"
            >
              <div class="message-header">
                <v-avatar
                  :image="item.profileImg"
                  size="32"
                  class="message-avatar"
                />
                <div class="message-info">
                  <div class="message-from">
                    <span class="from-name">{{ item.name }}</span>
                    <span class="message-date">{{ item.date }}</span>
                  </div>
                  <div class="message-subject">
                    <v-icon v-if="item.starred" size="14" class="star-icon" color="#FFB800">mdi-star</v-icon>
                    {{ item.subject }}
                  </div>
                  <div class="message-preview">
                    {{ item.testimonial.substring(0, 80) }}...
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Message View -->
          <div class="message-view">
            <div class="message-header-bar">
              <div class="header-from">
                <v-avatar
                  :image="testimonials[selectedTestimonialId].profileImg"
                  size="40"
                  class="mr-3"
                />
                <div class="header-info">
                  <div class="header-name">{{ testimonials[selectedTestimonialId].name }}</div>
                  <div class="header-email">{{ testimonials[selectedTestimonialId].company }}</div>
                </div>
              </div>
              <div class="header-meta">
                <span class="header-date">{{ testimonials[selectedTestimonialId].date }}</span>
                <v-btn icon variant="text" size="small" class="header-btn">
                  <v-icon size="18">mdi-star{{ testimonials[selectedTestimonialId].starred ? '' : '-outline' }}</v-icon>
                </v-btn>
                <v-btn icon variant="text" size="small" class="header-btn">
                  <v-icon size="18">mdi-reply</v-icon>
                </v-btn>
                <v-btn icon variant="text" size="small" class="header-btn">
                  <v-icon size="18">mdi-dots-horizontal</v-icon>
                </v-btn>
              </div>
            </div>

            <div class="message-subject-line">
              <h2 class="subject-text">{{ testimonials[selectedTestimonialId].subject }}</h2>
            </div>

            <div class="message-body">
              <p class="body-text">{{ testimonials[selectedTestimonialId].testimonial }}</p>

              <div class="message-signature">
                <div class="signature-divider"></div>
                <div class="signature-content">
                  <div class="signature-role">{{ testimonials[selectedTestimonialId].role }}</div>
                  <a
                    :href="testimonials[selectedTestimonialId].url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="signature-company"
                  >
                    <img
                      :src="testimonials[selectedTestimonialId].logo"
                      :alt="testimonials[selectedTestimonialId].logoAlt"
                      class="signature-logo"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile View -->
    <div v-else-if="xs" class="apple-mail-mobile">
      <div v-if="mobileEmailView" class="mobile-message-view">
        <div class="mobile-header">
          <v-btn icon variant="text" size="small" @click="mobileEmailView = false">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <span class="mobile-header-title">Message</span>
          <div class="mobile-header-actions">
            <v-btn icon variant="text" size="small" @click="selectedTestimonialId = Math.max(0, selectedTestimonialId - 1)">
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
            <v-btn icon variant="text" size="small" @click="selectedTestimonialId = Math.min(testimonials.length - 1, selectedTestimonialId + 1)">
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </div>
        </div>

        <div class="mobile-message-content">
          <div class="mobile-message-header">
            <div class="mobile-from-row">
              <v-avatar :image="testimonials[selectedTestimonialId].profileImg" size="48" class="mr-3" />
              <div class="mobile-from-info">
                <div class="mobile-from-name">{{ testimonials[selectedTestimonialId].name }}</div>
                <div class="mobile-from-email">{{ testimonials[selectedTestimonialId].company }}</div>
              </div>
            </div>
            <div class="mobile-subject">{{ testimonials[selectedTestimonialId].subject }}</div>
            <div class="mobile-date">{{ testimonials[selectedTestimonialId].date }}</div>
          </div>

          <div class="mobile-message-body">
            <p>{{ testimonials[selectedTestimonialId].testimonial }}</p>
            <div class="mobile-signature">
              <div class="mobile-signature-role">{{ testimonials[selectedTestimonialId].role }}</div>
              <a :href="testimonials[selectedTestimonialId].url" target="_blank">
                <img :src="testimonials[selectedTestimonialId].logo" :alt="testimonials[selectedTestimonialId].logoAlt" class="mobile-signature-logo" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="mobile-inbox">
        <div class="mobile-inbox-header">
          <h2 class="mobile-inbox-title">Inbox</h2>
          <span class="mobile-inbox-count">{{ testimonials.length }}</span>
        </div>
        <div
          v-for="item in testimonials"
          :key="item.id"
          class="mobile-message-item"
          @click="selectTestimonial(item.id)"
        >
          <div class="mobile-item-header">
            <v-avatar :image="item.profileImg" size="40" class="mr-3" />
            <div class="mobile-item-info">
              <div class="mobile-item-from">
                <span class="mobile-item-name">{{ item.name }}</span>
                <span class="mobile-item-date">{{ item.date }}</span>
              </div>
              <div class="mobile-item-subject">{{ item.subject }}</div>
              <div class="mobile-item-preview">{{ item.testimonial.substring(0, 60) }}...</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tablet View -->
    <div v-else-if="sm" class="apple-mail-tablet">
      <div class="tablet-window">
        <div class="window-titlebar">
          <div class="traffic-lights">
            <span class="traffic-light close"></span>
            <span class="traffic-light minimize"></span>
            <span class="traffic-light maximize"></span>
          </div>
          <div class="window-title">Customer Testimonials</div>
        </div>

        <div class="mail-toolbar">
          <v-btn icon variant="text" size="small" class="toolbar-btn">
            <v-icon size="20">mdi-email-edit-outline</v-icon>
          </v-btn>
          <v-btn icon variant="text" size="small" class="toolbar-btn" disabled>
            <v-icon size="20">mdi-delete-outline</v-icon>
          </v-btn>
          <v-spacer />
          <v-icon size="20">mdi-magnify</v-icon>
        </div>

        <div class="tablet-content">
          <div class="tablet-list">
            <div class="list-header-tablet">
              <span class="list-title">Inbox</span>
            </div>
            <div
              v-for="item in testimonials"
              :key="item.id"
              class="tablet-message-item"
              :class="{ 'selected': item.id === selectedTestimonialId }"
              @click="selectTestimonial(item.id)"
            >
              <v-avatar :image="item.profileImg" size="32" class="mr-2" />
              <div class="tablet-item-info">
                <div class="tablet-item-from">{{ item.name }}</div>
                <div class="tablet-item-subject">{{ item.subject }}</div>
              </div>
            </div>
          </div>

          <div class="tablet-message-view">
            <div class="tablet-message-header">
              <v-avatar :image="testimonials[selectedTestimonialId].profileImg" size="36" class="mr-3" />
              <div>
                <div class="tablet-header-name">{{ testimonials[selectedTestimonialId].name }}</div>
                <div class="tablet-header-email">{{ testimonials[selectedTestimonialId].company }}</div>
              </div>
            </div>
            <div class="tablet-subject">{{ testimonials[selectedTestimonialId].subject }}</div>
            <div class="tablet-body">
              <p>{{ testimonials[selectedTestimonialId].testimonial }}</p>
              <a :href="testimonials[selectedTestimonialId].url" target="_blank" class="tablet-logo-link">
                <img :src="testimonials[selectedTestimonialId].logo" :alt="testimonials[selectedTestimonialId].logoAlt" class="tablet-logo" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Apple Mail Container */
.apple-mail-container {
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
}

/* Desktop View */
.apple-mail-desktop {
  width: 100%;
}

.mail-window {
  background: var(--vp-c-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

html.dark .mail-window {
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Window Titlebar - macOS Style */
.window-titlebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 16px;
  background: rgba(0, 0, 0, 0.02);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

html.dark .window-titlebar {
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.traffic-lights {
  display: flex;
  gap: 8px;
  align-items: center;
}

.traffic-light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: block;
}

.traffic-light.close {
  background: #FF5F57;
}

.traffic-light.minimize {
  background: #FFBD2E;
}

.traffic-light.maximize {
  background: #28CA42;
}

.window-title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 13px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.window-controls {
  display: flex;
  gap: 8px;
}

.control-icon {
  opacity: 0.5;
  cursor: pointer;
  transition: opacity 0.2s;
}

.control-icon:hover {
  opacity: 1;
}

/* Toolbar */
.mail-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 4px;
}

.toolbar-btn {
  opacity: 0.7;
}

.toolbar-btn:not([disabled]):hover {
  opacity: 1;
}

.toolbar-btn[disabled] {
  opacity: 0.3;
}

.search-input {
  width: 220px;
}

.search-input :deep(.v-field) {
  border-radius: 6px;
  font-size: 13px;
}

/* Main Content */
.mail-content {
  display: flex;
  height: 600px;
  background: var(--vp-c-bg);
}

/* Sidebar */
.mail-sidebar {
  width: 200px;
  background: var(--vp-c-bg-soft);
  border-right: 1px solid var(--vp-c-divider);
  padding: 16px 8px;
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: 24px;
}

.sidebar-title {
  font-size: 11px;
  font-weight: 700;
  color: var(--vp-c-text-2);
  padding: 0 12px 8px;
  letter-spacing: 0.5px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 13px;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background 0.2s;
  margin-bottom: 2px;
}

.sidebar-item:hover {
  background: rgba(0, 0, 0, 0.04);
}

html.dark .sidebar-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.sidebar-item.active {
  background: #007AFF;
  color: white;
}

html.dark .sidebar-item.active {
  background: #0A84FF;
}

.sidebar-label {
  flex: 1;
}

.sidebar-count {
  font-size: 12px;
  opacity: 0.7;
  font-weight: 600;
}

/* Message List */
.message-list {
  width: 340px;
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
  overflow-y: auto;
}

.list-header {
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.list-title {
  font-size: 22px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  display: block;
  margin-bottom: 2px;
}

.list-count {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.message-item {
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: background 0.2s;
}

.message-item:hover {
  background: rgba(0, 0, 0, 0.03);
}

html.dark .message-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.message-item.selected {
  background: rgba(0, 122, 255, 0.12);
}

html.dark .message-item.selected {
  background: rgba(10, 132, 255, 0.15);
}

.message-item.unread {
  background: rgba(0, 122, 255, 0.05);
}

html.dark .message-item.unread {
  background: rgba(10, 132, 255, 0.08);
}

.message-header {
  display: flex;
  gap: 12px;
}

.message-avatar {
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

html.dark .message-avatar {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.message-info {
  flex: 1;
  min-width: 0;
}

.message-from {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.from-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.message-item.unread .from-name {
  font-weight: 700;
}

.message-date {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.message-subject {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: 4px;
}

.message-item.unread .message-subject {
  font-weight: 600;
}

.star-icon {
  flex-shrink: 0;
}

.message-preview {
  font-size: 12px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Message View */
.message-view {
  flex: 1;
  overflow-y: auto;
  background: var(--vp-c-bg);
}

.message-header-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.header-from {
  display: flex;
  align-items: center;
}

.header-info {
  display: flex;
  flex-direction: column;
}

.header-name {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.header-email {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.header-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-date {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-right: 8px;
}

.header-btn {
  opacity: 0.6;
}

.header-btn:hover {
  opacity: 1;
}

.message-subject-line {
  padding: 20px 24px 12px;
}

.subject-text {
  font-size: 20px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0;
}

.message-body {
  padding: 12px 24px 24px;
}

.body-text {
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
  margin: 0 0 24px 0;
}

.message-signature {
  margin-top: 32px;
}

.signature-divider {
  height: 1px;
  background: var(--vp-c-divider);
  margin-bottom: 16px;
}

.signature-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.signature-role {
  font-size: 13px;
  color: var(--vp-c-text-2);
  font-weight: 500;
}

.signature-company {
  display: inline-block;
  transition: opacity 0.2s;
}

.signature-company:hover {
  opacity: 0.7;
}

.signature-logo {
  height: 32px;
  width: auto;
}

/* Mobile Styles */
.apple-mail-mobile {
  background: var(--vp-c-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.mobile-header-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.mobile-header-actions {
  display: flex;
  gap: 4px;
}

.mobile-message-content {
  padding: 16px;
}

.mobile-message-header {
  margin-bottom: 20px;
}

.mobile-from-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.mobile-from-info {
  flex: 1;
}

.mobile-from-name {
  font-size: 17px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.mobile-from-email {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.mobile-subject {
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.mobile-date {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.mobile-message-body {
  font-size: 16px;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.mobile-signature {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--vp-c-divider);
}

.mobile-signature-role {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-bottom: 8px;
}

.mobile-signature-logo {
  height: 28px;
  width: auto;
}

.mobile-inbox {
  padding: 16px;
}

.mobile-inbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.mobile-inbox-title {
  font-size: 28px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
}

.mobile-inbox-count {
  font-size: 17px;
  color: var(--vp-c-text-2);
}

.mobile-message-item {
  padding: 12px 0;
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
}

.mobile-item-header {
  display: flex;
}

.mobile-item-info {
  flex: 1;
  min-width: 0;
}

.mobile-item-from {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.mobile-item-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.mobile-item-date {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.mobile-item-subject {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-item-preview {
  font-size: 13px;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

/* Tablet Styles */
.apple-mail-tablet {
  width: 100%;
}

.tablet-window {
  background: var(--vp-c-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

html.dark .tablet-window {
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tablet-content {
  display: flex;
  height: 500px;
}

.tablet-list {
  width: 280px;
  border-right: 1px solid var(--vp-c-divider);
  overflow-y: auto;
  background: var(--vp-c-bg-soft);
}

.list-header-tablet {
  padding: 16px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.tablet-message-item {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  cursor: pointer;
  transition: background 0.2s;
}

.tablet-message-item:hover {
  background: rgba(0, 0, 0, 0.03);
}

html.dark .tablet-message-item:hover {
  background: rgba(255, 255, 255, 0.05);
}

.tablet-message-item.selected {
  background: rgba(0, 122, 255, 0.12);
}

.tablet-item-info {
  flex: 1;
  min-width: 0;
}

.tablet-item-from {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tablet-item-subject {
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tablet-message-view {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.tablet-message-header {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.tablet-header-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.tablet-header-email {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.tablet-subject {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin-bottom: 16px;
}

.tablet-body {
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-1);
}

.tablet-logo-link {
  display: inline-block;
  margin-top: 20px;
}

.tablet-logo {
  height: 32px;
  width: auto;
}

/* Scrollbar Styling */
.mail-sidebar::-webkit-scrollbar,
.message-list::-webkit-scrollbar,
.message-view::-webkit-scrollbar {
  width: 10px;
}

.mail-sidebar::-webkit-scrollbar-track,
.message-list::-webkit-scrollbar-track,
.message-view::-webkit-scrollbar-track {
  background: transparent;
}

.mail-sidebar::-webkit-scrollbar-thumb,
.message-list::-webkit-scrollbar-thumb,
.message-view::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  border: 2px solid transparent;
  background-clip: content-box;
}

html.dark .mail-sidebar::-webkit-scrollbar-thumb,
html.dark .message-list::-webkit-scrollbar-thumb,
html.dark .message-view::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  background-clip: content-box;
}

.mail-sidebar::-webkit-scrollbar-thumb:hover,
.message-list::-webkit-scrollbar-thumb:hover,
.message-view::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
  background-clip: content-box;
}

html.dark .mail-sidebar::-webkit-scrollbar-thumb:hover,
html.dark .message-list::-webkit-scrollbar-thumb:hover,
html.dark .message-view::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
  background-clip: content-box;
}
</style>
