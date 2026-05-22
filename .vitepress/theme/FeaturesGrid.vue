<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('All')

const categories = [
  {
    name: 'Email Sending',
    features: [
      {
        name: 'Transactional Emails',
        desc: 'API-triggered, not tied to subscriber lists. Handlebars data, attachments, data feeds.',
        docs: '/docs/projects/transactional-emails',
        iconPaths: `<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M3 7l9 6 9-6"/>`
      },
      {
        name: 'Triggered Emails',
        desc: 'Backend-triggered to active subscribers. Per-recipient data overrides and attachments.',
        docs: '/docs/projects/triggered-emails',
        iconPaths: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`
      },
      {
        name: 'Campaigns',
        desc: 'Schedule or send immediately to a list and optional segment. Draft → scheduled → sent workflow.',
        docs: '/docs/projects/campaigns',
        iconPaths: `<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>`
      },
      {
        name: 'Data Feeds',
        desc: 'Embed live RSS, Atom, or JSON feed content in emails, fetched fresh at send time.',
        docs: '/docs/projects/data-feeds',
        iconPaths: `<path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/><circle cx="5" cy="19" r="1" fill="currentColor" stroke="none"/>`
      },
      {
        name: 'Attachments',
        desc: 'Attach files as Base64 to transactional and triggered emails via the API.',
        docs: '/docs/api/send-attachments',
        iconPaths: `<path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>`
      },
    ]
  },
  {
    name: 'Contacts & Audience',
    features: [
      {
        name: 'Contacts & Lists',
        desc: 'Centralized contacts with multiple list memberships, custom properties, tags, CSV import/export, and bulk actions.',
        docs: '/docs/projects/contacts',
        iconPaths: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>`
      },
      {
        name: 'Segments',
        desc: 'Dynamic groups using AND/OR logic. Filter by properties, tags, or email engagement within N days.',
        docs: '/docs/projects/segments',
        iconPaths: `<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>`
      },
      {
        name: 'Sign-Up Forms',
        desc: 'Embeddable forms with CAPTCHA, double opt-in, customizable fields, and multi-list assignment.',
        docs: '/docs/projects/forms-and-pages',
        iconPaths: `<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>`
      },
    ]
  },
  {
    name: 'Automations',
    features: [
      {
        name: 'Visual Automation Builder',
        desc: 'Build workflows on a visual canvas. Chain nodes together and run automations triggered by contact events.',
        docs: '/docs/projects/automations',
        iconPaths: `<circle cx="12" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><circle cx="18" cy="6" r="3"/><path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9"/><path d="M12 12v3"/>`
      },
      {
        name: 'Automation Triggers',
        desc: 'Start automations on contact added, contact updated (with from/to conditions), enter segment, or leave segment.',
        docs: '/docs/projects/automations#trigger-node',
        iconPaths: `<circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/>`
      },
      {
        name: 'Audience Filter & Branching',
        desc: 'Filter contacts by properties, segments, or email activity (opened/clicked). Split flows with multi-path branching.',
        docs: '/docs/projects/automations#audience-filter-node',
        iconPaths: `<line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>`
      },
      {
        name: 'Automation Actions',
        desc: 'Send emails to contacts, send team notifications to a list, update contact properties, or add/remove tags.',
        docs: '/docs/projects/automations#send-email-node',
        iconPaths: `<polyline points="22 2 15 22 11 13 2 9 22 2"/>`
      },
      {
        name: 'Timers & Exit Criteria',
        desc: 'Delay steps by minutes, hours, or days. Define exit conditions to remove contacts from the flow early.',
        docs: '/docs/projects/automations#timer-node',
        iconPaths: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`
      },
    ]
  },
  {
    name: 'Design',
    features: [
      {
        name: 'Visual Email Builder',
        desc: 'Drag-and-drop editor with text, image, button, divider, dynamic image, conditional, and loop elements.',
        docs: '/docs/email-builder',
        iconPaths: `<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>`
      },
      {
        name: 'Email Themes',
        desc: 'Atomic design system: Basics → Components → Blocks → Templates. Change once, updates everywhere.',
        docs: '/docs/email-themes/',
        iconPaths: `<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>`
      },
      {
        name: 'Per-Project Theme Overrides',
        desc: 'Override colors, fonts, images, and components per client without affecting the master theme.',
        docs: '/docs/projects/email-theme-settings',
        iconPaths: `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`
      },
    ]
  },
  {
    name: 'Personalization',
    features: [
      {
        name: 'Merge Tags & Handlebars',
        desc: 'Dynamic text in subject, body, and URLs. Use contact properties or API request data with {{mustache}} syntax.',
        docs: '/docs/email-personalization#text-personalization',
        iconPaths: `<line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/>`
      },
      {
        name: 'Image & Button Personalization',
        desc: 'Dynamic images with per-recipient src, personalized button URLs and tooltips, accessible alt text.',
        docs: '/docs/email-personalization#image-personalization',
        iconPaths: `<rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>`
      },
      {
        name: 'Conditionals',
        desc: 'Show or hide content blocks using AND, OR, NOT, EQ, and INCLUDES logic. Nest operators for complex rules.',
        docs: '/docs/email-personalization#conditionals',
        iconPaths: `<polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>`
      },
      {
        name: 'Loops & String Helpers',
        desc: 'Iterate arrays with skip/limit support. Format output with CAPITALIZE and TRUNCATE — no backend changes needed.',
        docs: '/docs/email-personalization#loops',
        iconPaths: `<polyline points="17 1 21 5 17 9"/><path d="M3 11V9a4 4 0 0 1 4-4h14"/><polyline points="7 23 3 19 7 15"/><path d="M21 13v2a4 4 0 0 1-4 4H3"/>`
      },
    ]
  },
  {
    name: 'Analytics',
    features: [
      {
        name: 'Email Performance Metrics',
        desc: 'Track sends, opens, unique opens, clicks, unique clicks, and failures per email and across your project.',
        docs: '/docs/analytics#email-card-analytics',
        iconPaths: `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><polyline points="2 20 22 20"/>`
      },
      {
        name: 'Bounce & Complaint Tracking',
        desc: 'Monitor bounce and complaint rates per email. Overall banners and per-send breakdowns keep you under thresholds.',
        docs: '/docs/analytics#overall-banners',
        iconPaths: `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`
      },
      {
        name: 'Subscription Metrics',
        desc: 'Track subscribed, resubscribed, unsubscribed, and paused events over time across all lists.',
        docs: '/docs/analytics#email-and-subscription-charts',
        iconPaths: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>`
      },
      {
        name: 'Charts, Filters & CSV Export',
        desc: 'Bar and line charts with time-interval controls, date filters, accumulated view, and a filterable CSV-exportable data table.',
        docs: '/docs/analytics#data-table',
        iconPaths: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`
      },
    ]
  },
  {
    name: 'Deliverability',
    features: [
      {
        name: 'Suppression Lists',
        desc: 'Per-project permanent blocklist. Suppressed addresses are never emailed. CSV import/export for bulk management.',
        docs: '/docs/projects/suppression-list',
        iconPaths: `<circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>`
      },
      {
        name: 'Unengaged Contact Exclusion',
        desc: 'Build engagement-based segments for contacts who have not opened or clicked within N days to exclude from sends.',
        docs: '/docs/projects/segments#engagment-based-segments',
        iconPaths: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="23" y1="11" x2="17" y2="11"/>`
      },
      {
        name: 'Bounce & Complaint Cleanup',
        desc: 'Bulk-remove bounced or complained contacts from a list, all lists, or add them to suppression with one action.',
        docs: '/docs/projects/contacts#mass-removal-for-bounced-or-complained-contacts',
        iconPaths: `<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`
      },
    ]
  },
  {
    name: 'Delivery & Infrastructure',
    features: [
      {
        name: 'Sandbox Mode',
        desc: 'Safe test environment: up to 5 verified addresses, 100 emails/day. No production approval needed to start.',
        docs: '/docs/projects/delivery-modes',
        iconPaths: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`
      },
      {
        name: 'Production Mode',
        desc: 'Send to any recipient at full volume using your own verified sending domain after approval.',
        docs: '/docs/projects/delivery-modes',
        iconPaths: `<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`
      },
      {
        name: 'BYO AWS SES',
        desc: 'Bring your own AWS credentials via Access Key or STS role. Full deliverability control, your infrastructure.',
        docs: '/docs/projects/delivery-modes',
        iconPaths: `<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>`
      },
    ]
  },
  {
    name: 'Integrations & API',
    features: [
      {
        name: 'API',
        desc: 'Full programmatic access. Send emails, manage contacts and subscriber lists. Auto-generated code examples.',
        docs: '/docs/api/',
        iconPaths: `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`
      },
      {
        name: 'Webhooks',
        desc: 'Real-time notifications for sent, opened, clicked, bounced, complained, and subscription events.',
        docs: '/docs/integrations/webhooks',
        iconPaths: `<path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81a3 3 0 0 0 0-6 3 3 0 0 0-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9a3 3 0 0 0 0 6 3 3 0 0 0 2.96-2.59l7.09 4.13c-.05.23-.09.47-.09.71 0 1.66 1.34 3 3 3a3 3 0 0 0 0-6z"/>`
      },
      {
        name: 'Zapier',
        desc: '6 triggers and 8 actions. Connect BlueFox Email to thousands of apps without writing code.',
        docs: '/docs/integrations/zapier',
        iconPaths: `<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>`
      },
      {
        name: 'Supabase Auth Emails',
        desc: 'Replace Supabase default auth emails with branded, high-deliverability versions via SMTP.',
        docs: '/docs/integrations/supabase',
        iconPaths: `<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>`
      },
    ]
  },
  {
    name: 'Team & Multi-Project',
    features: [
      {
        name: 'Multi-Project Management',
        desc: 'Separate client projects with fully isolated contacts, themes, automations, and analytics.',
        docs: '/docs/projects/',
        iconPaths: `<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>`
      },
      {
        name: 'Team Roles & Permissions',
        desc: 'Admin, User, Client Editor, Client Viewer. Invite clients to collaborate with scoped, role-based access.',
        docs: '/docs/account-users',
        iconPaths: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>`
      },
    ]
  },
]

const totalFeatures = categories.reduce((sum, c) => sum + c.features.length, 0)
const filterLabels = ['All', ...categories.map(c => c.name)]

const faqs = [
  { q: 'Does BlueFox Email include all features on every plan?', a: 'Yes. Every feature is included on every send pack with no tiers or paywalls. Transactional emails, campaigns, automations, segments, email themes, API, webhooks, and more are all available from day one.' },
  { q: 'What email types does BlueFox Email support?', a: 'BlueFox Email supports three email types: transactional emails (API-triggered, not tied to subscriber lists), triggered emails (API-triggered to active subscribers with per-recipient data overrides), and campaigns (scheduled or immediate sends to a subscriber list and optional segment).' },
  { q: 'Does BlueFox Email have a visual automation builder?', a: 'Yes. BlueFox Email includes a visual automation builder with nodes for triggers (contact added, contact updated, enter/leave segment), timers, audience filters, send email, notify, branching, set value, manage tags, and exit criteria.' },
  { q: 'Can I bring my own AWS SES account?', a: 'Yes. BlueFox Email supports BYO AWS SES via Access Key or STS role. This gives you full deliverability control using your own AWS infrastructure while BlueFox Email handles the sending logic, templates, contacts, and automations.' },
  { q: 'What integrations does BlueFox Email support?', a: 'BlueFox Email integrates with Zapier (6 triggers and 8 actions), supports webhooks for real-time event notifications, Supabase auth emails via SMTP, and provides a full HTTP API for custom integrations.' },
  { q: 'Does BlueFox Email have a free plan?', a: 'BlueFox Email includes 3,000 free sends with no credit card required. There is no monthly subscription — you buy send packs as needed, valid for 12 months. The Essential pack is $50 for 50,000 sends.' },
  { q: 'How does segmentation work in BlueFox Email?', a: 'Segments are dynamic groups built with AND/OR logic. Filter contacts by custom properties, tags, or email engagement (opened/not opened/clicked within N days). Segments update automatically and work in campaigns, automations, and audience filters.' },
  { q: 'What analytics does BlueFox Email provide?', a: 'BlueFox Email tracks opens, unique opens, clicks, unique clicks, bounces, complaints, sends, and failures. Subscription metrics include subscribed, resubscribed, unsubscribed, and paused. Data is shown in bar or line charts with CSV export and a filterable data table.' },
  { q: 'Can I send emails with attachments?', a: 'Yes. Transactional and triggered emails support file attachments via the API. Each attachment requires a file name and Base64-encoded content.' },
  { q: 'How does BlueFox Email handle bounce and complaint rates?', a: 'BlueFox Email monitors bounce and complaint rates continuously. Production access requires bounce rates below 2.5% and complaint rates below 0.05%. The platform provides reporting and alerts to help you stay within these thresholds.' },
]
const openFaq = ref(null)
const toggleFaq = (i) => { openFaq.value = openFaq.value === i ? null : i }
const visibleCategories = computed(() =>
  activeFilter.value === 'All' ? categories : categories.filter(c => c.name === activeFilter.value)
)
</script>

<template>
  <div class="features-page">
    <!-- Filter chips -->
    <div class="filter-bar" role="group" aria-label="Filter features by category">
      <button
        v-for="label in filterLabels"
        :key="label"
        class="filter-chip"
        :class="{ active: activeFilter === label }"
        @click="activeFilter = label"
      >{{ label }}</button>
    </div>

    <!-- Feature categories -->
    <div class="features-body">
      <section
        v-for="category in visibleCategories"
        :key="category.name"
        class="feature-category"
      >
        <h2 class="category-name">{{ category.name }}</h2>
        <div class="feature-grid">
          <a
            v-for="feature in category.features"
            :key="feature.name"
            :href="feature.docs"
            class="feature-card"
            aria-label="`${feature.name} — view documentation`"
          >
            <div class="card-icon" aria-hidden="true">
              <!-- iconPaths is static SVG path markup from our own data, safe for v-html -->
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="feature.iconPaths" />
            </div>
            <div class="card-body">
              <h3 class="card-name">{{ feature.name }}</h3>
              <p class="card-desc">{{ feature.desc }}</p>
            </div>
            <div class="card-link" aria-hidden="true">
              View docs
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </div>
          </a>
        </div>
      </section>

      <!-- FAQ section -->
      <section class="faq-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading" class="faq-heading">Frequently Asked Questions</h2>
        <dl class="faq-list">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="faq-item"
            :class="{ open: openFaq === i }"
          >
            <dt>
              <button
                class="faq-question"
                :aria-expanded="openFaq === i"
                :aria-controls="`faq-answer-${i}`"
                @click="toggleFaq(i)"
              >
                <span>{{ faq.q }}</span>
                <svg class="faq-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            </dt>
            <dd :id="`faq-answer-${i}`" class="faq-answer" v-show="openFaq === i">
              <p>{{ faq.a }}</p>
            </dd>
          </div>
        </dl>
      </section>
    </div>
  </div>
</template>

<style scoped>
.features-page {
  width: 100%;
}

/* Filter bar */
.filter-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  padding: 40px 24px 0;
  max-width: 1200px;
  margin: 0 auto;
}

.filter-chip {
  padding: 6px 16px;
  border-radius: 999px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-chip:hover {
  border-color: rgba(19, 176, 238, 0.4);
  color: var(--vp-c-text-1);
}

.filter-chip.active {
  background: #13B0EE;
  border-color: #13B0EE;
  color: #fff;
}

/* Body */
.features-body {
  max-width: 1200px;
  margin: 0 auto;
  padding: 64px 24px 80px;
}

/* Category */
.feature-category {
  margin-bottom: 60px;
}

.category-name {
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #13B0EE;
  margin: 0 0 20px;
  padding: 0;
  border: none !important;
}

/* Grid */
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

/* Card */
.feature-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
  cursor: pointer;
}

.feature-card:hover {
  border-color: rgba(19, 176, 238, 0.5);
  box-shadow: 0 8px 28px rgba(19, 176, 238, 0.15);
  transform: translateY(-3px);
}

html.dark .feature-card:hover {
  box-shadow: 0 8px 28px rgba(19, 176, 238, 0.22);
}

/* Icon */
.card-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.12), rgba(57, 44, 145, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #13B0EE;
  flex-shrink: 0;
  transition: background 0.25s ease;
}

.feature-card:hover .card-icon {
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.22), rgba(57, 44, 145, 0.18));
}

/* Card body */
.card-body {
  flex: 1;
}

.card-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0 0 6px;
  padding: 0;
  border: none !important;
  line-height: 1.3;
}

.card-desc {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

/* Docs link */
.card-link {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  font-weight: 600;
  color: #13B0EE;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.feature-card:hover .card-link {
  opacity: 1;
}


/* FAQ */
.faq-section {
  border-top: 1px solid var(--vp-c-divider);
  margin-top: 20px;
  padding-top: 52px;
}

.faq-heading {
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 800;
  margin: 0 0 32px;
  padding: 0;
  border: none !important;
  background: linear-gradient(120deg, #392C91 30%, #13B0EE 70%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  padding: 0;
}

.faq-item {
  border-bottom: 1px solid var(--vp-c-divider);
}

.faq-item:first-child {
  border-top: 1px solid var(--vp-c-divider);
}

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.faq-question:hover { color: #13B0EE; }

.faq-chevron {
  flex-shrink: 0;
  color: var(--vp-c-text-2);
  transition: transform 0.25s ease;
}

.faq-item.open .faq-chevron {
  transform: rotate(180deg);
  color: #13B0EE;
}

.faq-answer {
  margin: 0;
  padding-bottom: 18px;
}

.faq-answer p {
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
}

/* Responsive */
@media (max-width: 900px) {
  .feature-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 560px) {
  .features-hero { padding: 56px 20px 52px; }
  .features-body { padding: 40px 16px 60px; }
  .feature-grid { grid-template-columns: 1fr; }
  .feature-card { padding: 20px; }
  .card-link { opacity: 1; }
}
</style>
