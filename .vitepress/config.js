import { defineConfig } from 'vitepress'
import tailwindcss from 'tailwindcss'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  title: "bluefox.email",
  description: "High deliverability & brand consistency.",
  head: [
    ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=G-RFX7RXXS7C' }],
    ['script', {}, `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-RFX7RXXS7C');`]
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/assets/bluefoxemail-logo.webp',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Pricing', link: '/pricing' },
      { text: 'Tutorials', link: '/tutorials/' },
      { text: 'Articles', link: '/articles/' },
      { text: 'Docs', link: '/docs/' },
      { text: 'Login', link: 'https://app.bluefox.email' },
      { text: 'Sign up', link: 'https://app.bluefox.email/accounts/create-account' }
      /*
      { text: 'Home', link: '/' },
      { text: 'Email Marketing Concepts', link: '/email-marketing-concepts/' },
      { text: 'About', link: '/about' }
      */
    ],

    sidebar: [
      {
        text: 'Docs',
        link: '/docs/',
        collapsed: false,
        items: [{
          text: 'Getting Started',
          link: '/docs/getting-started'
        }, {
          text: 'Account Dashboard',
          link: '/docs/dashboard'
        }, {
          text: 'Projects',
          link: '/docs/projects/',
          collapsed: false,
          items: [
            { text: 'Project Dashboard', link: '/docs/projects/dashboard' },
            { text: 'Creating a new project', link: '/docs/projects/new-project' },
            { text: 'Transactional Emails', link: '/docs/projects/transactional-emails' },
            { text: 'Triggered Emails', link: '/docs/projects/triggered-emails' },
            { text: 'Campaigns', link: '/docs/projects/campaigns' },
            { text: 'Subscriber Lists', link: '/docs/projects/subscriber-lists' },
            { text: 'Subscriptions Preferences Page', link: '/docs/projects/subscription-preferences-page' },
            { text: 'Design System Settings', link: '/docs/projects/design-system-settings' },
            { text: 'Settings', link: '/docs/projects/settings' }
          ]
        }, {
          text: 'API',
          link: '/docs/api/',
          collapsed: false,
          items: [
            { text: 'Subscriber List Management', link: '/docs/api/subscriber-list-management' },
            { text: 'Send Transactional Email', link: '/docs/api/send-transactional-email' },
            { text: 'Send Triggered Email', link: '/docs/api/send-triggered-email' },
            { text: 'Send Attachments', link: '/docs/api/send-attachments' },
            { text: 'Webhooks for Event Notifications', link: '/docs/webhooks' }
          ]
        }, { 
          text: 'Analytics',
          link: '/docs/analytics' 
        }, {
          text: 'Personalization (merge tags)',
          link: '/docs/personalization',
        }, {
          text: 'Design Systems',
          link: '/docs/design-systems/',
          collapsed: false,
          items: [
            { text: 'Variables', link: '/docs/design-systems/variables' },
            { text: 'Blocks (or modules)', link: '/docs/design-systems/blocks' },
            { text: 'Templates', link: '/docs/design-systems/templates' }
          ]
        }, {
          text: 'Pricing/Credits',
          link: '/docs/credits'
        }]
      },
      {
        text: 'Best Practices',
        link: '/email-best-practices-for-saas/',
        collapsed: false,
        items: [{
          text: 'Double Opt-In',
          link: '/email-best-practices-for-saas/double-opt-in'
        }, {
          text: 'Unsubscribe and Pause Subscription',
          link: '/email-best-practices-for-saas/unsubscribe-and-pause-subscription'
        }, {
          text: 'DMARC',
          link: '/email-best-practices-for-saas/dmarc'
        }]
      },
      {
        text: 'Email Marketing Concepts',
        link: '/email-marketing-concepts/',
        collapsed: true,
        items: [{
            text: 'Copywriting',
            link: '/email-marketing-concepts/copywriting/'
          }, {
            text: 'Design',
            link: '/email-marketing-concepts/design/'
          }, {
            text: 'List management',
            link: '/email-marketing-concepts/list-management/'
          }, {
            text: 'Metrics and analytics',
            link: '/email-marketing-concepts/metrics-and-analytics/'
          }, {
            text: 'Deliverability',
            link: '/email-marketing-concepts/deliverability/'
          }, {
            text: 'Personalization',
            link: '/email-marketing-concepts/personalization/'
          }, {
            text: 'Automation',
            link: '/email-marketing-concepts/automation/'
          }, {
            text: 'Testing and optimization',
            link: '/email-marketing-concepts/testing-and-optimization/'
          }, {
            text: 'Strategy',
            link: '/email-marketing-concepts/strategy/'
          }, {
            text: 'Compliance and legal considerations',
            link: '/email-marketing-concepts/compliance-and-legal-considerations/'
          }
        ]
      },
      {
        text: 'Why?',
        link: '/why'
      },
      {
        text: 'About',
        link: '/about'
      },
      {
        text: 'Terms of use',
        link: '/terms-of-use'
      },
      {
        text: 'Privacy policy',
        link: '/privacy-policy'
      },
      {
        text: 'Refund policy',
        link: '/refund-policy'
      },
      {
        text: 'Partners',
        link: '/partners'
      }
    ],

    socialLinks: [
      { icon: 'x', link: 'https://x.com/bluefoxemail' }
    ],
    footer: {
      message: '<a href="/terms-of-use">Terms of use.</a> | <a href="/privacy-policy">Privacy policy.</a> | <a href="/refund-policy">Refund policy.</a>',
      copyright: 'Copyright © 2025 Innovaris Group LLC.'
    }
  },
  sitemap: {
    hostname: 'https://bluefox.email'
  }
})
