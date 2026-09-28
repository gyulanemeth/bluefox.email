<script setup>
import { ref, computed } from 'vue'
import { useData } from 'vitepress'
import {
  mdiEmailFastOutline,
  mdiLightningBoltOutline,
  mdiBullhornOutline,
  mdiRss,
  mdiPaperclip,
  mdiCardAccountMailOutline,
  mdiFilterVariant,
  mdiFormSelect,
  mdiTuneVariant,
  mdiSitemapOutline,
  mdiFlashOutline,
  mdiSourceBranch,
  mdiPlayOutline,
  mdiTimerOutline,
  mdiPencilRulerOutline,
  mdiCodeTags,
  mdiPaletteOutline,
  mdiPaletteSwatchOutline,
  mdiViewDashboardOutline,
  mdiCodeBraces,
  mdiImageOutline,
  mdiCallSplit,
  mdiSync,
  mdiChartLine,
  mdiAlertCircleOutline,
  mdiAccountGroupOutline,
  mdiDownloadOutline,
  mdiCancel,
  mdiAccountOffOutline,
  mdiBroom,
  mdiFlaskOutline,
  mdiRocketLaunchOutline,
  mdiAws,
  mdiFolderMultipleOutline,
  mdiShieldAccountOutline
} from '@mdi/js'

const { isDark } = useData()
const activeFilter = ref('All')

const categories = [
  {
    name: 'Email Sending',
    features: [
      {
        name: 'Transactional Emails',
        desc: 'API-triggered, not tied to subscriber lists. Handlebars data, attachments, data feeds.',
        docs: '/docs/projects/transactional-emails',
        icon: mdiEmailFastOutline
      },
      {
        name: 'Triggered Emails',
        desc: 'Backend-triggered to active subscribers. Per-recipient data overrides and attachments.',
        docs: '/docs/projects/triggered-emails',
        icon: mdiLightningBoltOutline
      },
      {
        name: 'Campaigns',
        desc: 'Schedule or send immediately to a list and optional segment. Draft → scheduled → sent workflow.',
        docs: '/docs/projects/campaigns',
        icon: mdiBullhornOutline
      },
      {
        name: 'Data Feeds',
        desc: 'Embed live RSS, Atom, or JSON feed content in emails, fetched fresh at send time.',
        docs: '/docs/projects/data-feeds',
        icon: mdiRss
      },
      {
        name: 'Attachments',
        desc: 'Attach files as Base64 to transactional and triggered emails via the API.',
        docs: '/docs/api/send-attachments',
        icon: mdiPaperclip
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
        icon: mdiCardAccountMailOutline
      },
      {
        name: 'Segments',
        desc: 'Dynamic groups using AND/OR logic. Filter by properties, tags, or email engagement within N days.',
        docs: '/docs/projects/segments',
        icon: mdiFilterVariant
      },
      {
        name: 'Sign-Up Forms',
        desc: 'Embeddable forms with CAPTCHA, double opt-in, customizable fields, and multi-list assignment.',
        docs: '/docs/projects/forms-and-pages',
        icon: mdiFormSelect
      },
      {
        name: 'Subscription Preferences Page',
        desc: 'Built-in unsubscribe, resubscribe, and pause page, or point unsubscribe/pause links to your own custom page.',
        docs: '/docs/projects/settings#custom-subscription-preferences-page',
        icon: mdiTuneVariant
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
        icon: mdiSitemapOutline
      },
      {
        name: 'Automation Triggers',
        desc: 'Start automations on contact added, contact updated (with from/to conditions), enter segment, or leave segment.',
        docs: '/docs/projects/automations#trigger-node',
        icon: mdiFlashOutline
      },
      {
        name: 'Audience Filter & Branching',
        desc: 'Filter contacts by properties, segments, or email activity (opened/clicked). Split flows with multi-path branching.',
        docs: '/docs/projects/automations#audience-filter-node',
        icon: mdiSourceBranch
      },
      {
        name: 'Automation Actions',
        desc: 'Send emails to contacts, send team notifications to a list, update contact properties, or add/remove tags.',
        docs: '/docs/projects/automations#send-email-node',
        icon: mdiPlayOutline
      },
      {
        name: 'Timers & Exit Criteria',
        desc: 'Delay steps by minutes, hours, or days. Define exit conditions to remove contacts from the flow early.',
        docs: '/docs/projects/automations#timer-node',
        icon: mdiTimerOutline
      },
    ]
  },
  {
    name: 'Design',
    features: [
      {
        name: 'Visual Editor',
        desc: 'Drag-and-drop editor with text, image, button, divider, dynamic image, conditional, and loop elements.',
        docs: '/docs/projects/email-builder#visual-editor',
        icon: mdiPencilRulerOutline
      },
      {
        name: 'Raw HTML & Plain Text Editors',
        desc: 'Write your own HTML or plain text instead of the visual builder, with the same merge tags, feeds, and sending.',
        docs: '/docs/projects/email-builder#raw-html',
        icon: mdiCodeTags
      },
      {
        name: 'Email Themes',
        desc: 'Atomic design system: Basics → Components → Blocks → Templates. Change once, updates everywhere.',
        docs: '/docs/email-themes/',
        icon: mdiPaletteOutline
      },
      {
        name: 'Per-Project Theme Overrides',
        desc: 'Override colors, fonts, images, and components per client without affecting the master theme.',
        docs: '/docs/projects/email-theme-settings',
        icon: mdiPaletteSwatchOutline
      },
      {
        name: 'Predesigned Templates',
        desc: 'Start from a library of ready-made email templates and customize them to match your brand.',
        docs: '/docs/projects/campaigns#creating-a-campaign',
        icon: mdiViewDashboardOutline
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
        icon: mdiCodeBraces
      },
      {
        name: 'Image & Button Personalization',
        desc: 'Dynamic images with per-recipient src, personalized button URLs and tooltips, accessible alt text.',
        docs: '/docs/email-personalization#image-personalization',
        icon: mdiImageOutline
      },
      {
        name: 'Conditionals',
        desc: 'Show or hide content blocks using AND, OR, NOT, EQ, and INCLUDES logic. Nest operators for complex rules.',
        docs: '/docs/email-personalization#conditionals',
        icon: mdiCallSplit
      },
      {
        name: 'Loops & String Helpers',
        desc: 'Iterate arrays with skip/limit support. Format output with CAPITALIZE and TRUNCATE, no backend changes needed.',
        docs: '/docs/email-personalization#loops',
        icon: mdiSync
      },
    ]
  },
  {
    name: 'Analytics',
    features: [
      {
        name: 'Email Performance Metrics',
        desc: 'Track sends, opens, unique opens, clicks, unique clicks, and failures per email and across your project.',
        docs: '/docs/statistics#email-sending-trends',
        icon: mdiChartLine
      },
      {
        name: 'Bounce & Complaint Tracking',
        desc: 'Monitor bounce and complaint rates per email. Overall banners and per-send breakdowns keep you under thresholds.',
        docs: '/docs/statistics#email-card-statistics',
        icon: mdiAlertCircleOutline
      },
      {
        name: 'Subscription Metrics',
        desc: 'Track subscribed, resubscribed, unsubscribed, and paused events over time across all lists.',
        docs: '/docs/statistics#subscription-trends',
        icon: mdiAccountGroupOutline
      },
      {
        name: 'Charts, Filters & CSV Export',
        desc: 'Bar and line charts with time-interval controls, date filters, accumulated view, and a filterable CSV-exportable data table.',
        docs: '/docs/statistics#email-card-statistics',
        icon: mdiDownloadOutline
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
        icon: mdiCancel
      },
      {
        name: 'Unengaged Contact Exclusion',
        desc: 'Build engagement-based segments for contacts who have not opened or clicked within N days to exclude from sends.',
        docs: '/docs/projects/segments#engagment-based-segments',
        icon: mdiAccountOffOutline
      },
      {
        name: 'Bounce & Complaint Cleanup',
        desc: 'Bulk-remove bounced or complained contacts from a list, all lists, or add them to suppression with one action.',
        docs: '/docs/projects/contacts#mass-removal-for-bounced-or-complained-contacts',
        icon: mdiBroom
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
        icon: mdiFlaskOutline
      },
      {
        name: 'Production Mode',
        desc: 'Send to any recipient at full volume using your own verified sending domain after approval.',
        docs: '/docs/projects/delivery-modes',
        icon: mdiRocketLaunchOutline
      },
      {
        name: 'BYO AWS SES',
        desc: 'Bring your own AWS credentials via Access Key or STS role. Full deliverability control, your infrastructure.',
        docs: '/docs/projects/delivery-modes',
        icon: mdiAws
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
        logo: 'api'
      },
      {
        name: 'Webhooks',
        desc: 'Real-time notifications for sent, opened, clicked, bounced, complained, and subscription events.',
        docs: '/docs/integrations/webhooks',
        logo: 'webhooks'
      },
      {
        name: 'Zapier',
        desc: '6 triggers and 8 actions. Connect BlueFox Email to thousands of apps without writing code.',
        docs: '/docs/integrations/zapier',
        logo: 'zapier'
      },
      {
        name: 'Supabase Auth Emails',
        desc: 'Replace Supabase default auth emails with branded, high-deliverability versions via SMTP.',
        docs: '/docs/integrations/supabase',
        logo: 'supabase'
      },
      {
        name: 'MCP Server',
        desc: 'Let Claude, Cursor, and other MCP-compatible AI agents manage campaigns, contacts, and more by asking in plain language. Open source.',
        docs: '/mcp',
        logo: 'mcp'
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
        icon: mdiFolderMultipleOutline
      },
      {
        name: 'Team Roles & Permissions',
        desc: 'Admin, User, Client Editor, Client Viewer. Invite clients to collaborate with scoped, role-based access.',
        docs: '/docs/account-users',
        icon: mdiShieldAccountOutline
      },
    ]
  },
]

const filterLabels = ['All', ...categories.map(c => c.name)]

const faqs = [
  { q: 'Does BlueFox Email include all features on every plan?', a: 'Yes. Every feature is included on every send pack with no tiers or paywalls. Transactional emails, campaigns, automations, segments, email themes, API, webhooks, and more are all available from day one.' },
  { q: 'What email types does BlueFox Email support?', a: 'BlueFox Email supports three email types: transactional emails (API-triggered, not tied to subscriber lists), triggered emails (API-triggered to active subscribers with per-recipient data overrides), and campaigns (scheduled or immediate sends to a subscriber list and optional segment).' },
  { q: 'Does BlueFox Email have a visual automation builder?', a: 'Yes. BlueFox Email includes a visual automation builder with nodes for triggers (contact added, contact updated, enter/leave segment), timers, audience filters, send email, notify, branching, set value, manage tags, and exit criteria.' },
  { q: 'Can I write my own HTML instead of using the visual editor?', a: 'Yes. Every email, transactional, triggered, campaign, and automation, can be created with a Raw HTML editor, a Plain Text editor, or Copy & Paste, in addition to the drag-and-drop Visual Editor. Raw HTML and Plain Text always start from scratch or a copied design and don\'t support design system or pre-designed templates, but personalization, feeds, sending, and analytics all work the same.' },
  { q: 'Can I bring my own AWS SES account?', a: 'Yes. BlueFox Email supports BYO AWS SES via Access Key or STS role. This gives you full deliverability control using your own AWS infrastructure while BlueFox Email handles the sending logic, templates, contacts, and automations.' },
  { q: 'What integrations does BlueFox Email support?', a: 'BlueFox Email integrates with Zapier (6 triggers and 8 actions), supports webhooks for real-time event notifications, Supabase auth emails via SMTP, an open-source MCP server for AI agents like Claude and Cursor, and a full HTTP API for custom integrations.' },
  { q: 'Does BlueFox Email have a free plan?', a: 'BlueFox Email includes 3,000 free sends with no credit card required. There is no monthly subscription, you buy send packs as needed, valid for 12 months. The Essential pack is $50 for 50,000 sends.' },
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
            :aria-label="`${feature.name}: view documentation`"
          >
            <img
              v-if="feature.logo"
              class="card-icon"
              :src="isDark ? `/assets/integrations/${feature.logo}-dark.svg` : `/assets/integrations/${feature.logo}-light.svg`"
              :alt="`${feature.name} logo`"
              width="20"
              height="20"
            />
            <svg v-else class="card-icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path :d="feature.icon" fill="currentColor"/>
            </svg>
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
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background: #eef8fd;
  color: var(--vp-c-text-2);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

html.dark .filter-chip {
  background: #0c1e2d;
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
  gap: 10px;
  padding: 20px 22px;
  background: #eef8fd;
  border: 1px solid transparent;
  border-radius: 4px;
  text-decoration: none;
  color: inherit;
}

html.dark .feature-card {
  background: #0c1e2d;
}

.feature-card:hover {
  border-color: #13B0EE;
}

/* Icon */
.card-icon {
  color: #13B0EE;
  flex-shrink: 0;
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
  color: var(--vp-c-text-1);
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
  .feature-card { padding: 16px 18px; }
}
</style>
