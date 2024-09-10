import { defineConfig } from 'vitepress'



// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "bluefox.email",
  description: "High deliverability & brand consistency.",
  head: [
    ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=G-RFX7RXXS7C' }],
    ['script', {}, `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-RFX7RXXS7C');`]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/assets/bluefoxemail-logo.webp',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Best Practices', link: '/email-best-practices-for-saas/' },
      { text: 'Docs', link: '/docs/' },
      { text: 'About', link: '/about' },
      { text: 'Login', link: 'https://app.bluefox.email' }
      /*
      { text: 'Home', link: '/' },
      { text: 'Email Marketing Concepts', link: '/email-marketing-concepts/' },
      { text: 'About', link: '/about' }
      */
    ],

    sidebar: [
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
        text: 'Docs',
        link: '/docs/',
        collapsed: false,
        items: [{
          text: 'Getting Started',
          link: '/docs/getting-started'
        }, {
          text: 'Projects',
          link: '/docs/projects/',
          collapsed: false,
          items: [
            { text: 'Creating a new project', link: '/docs/projects/new-project.md' },
            { text: 'Transactional Emails', link: '/docs/projects/transactional-emails' },
            { text: 'Triggered Emails', link: '/docs/projects/triggered-emails' },
            { text: 'Campaigns', link: '/docs/projects/campaigns' },
            { text: 'Subscriber Lists', link: '/docs/projects/subscriber-lists' },
            { text: 'Subscriptions Preferences Page', link: '/docs/projects/subscription-preferences-page' },
            { text: 'Analytics', link: '/docs/projects/analytics' },
            { text: 'Design System Settings', link: '/docs/projects/design-system-settings' },
            { text: 'Settings', link: '/docs/projects/settings' }
          ]
        }, {
          text: 'API',
          link: '/docs/api/'
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
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/bluefoxemail' }
    ],
    footer: {
      copyright: 'Copyright © 2024 Innovaris Group LLC.'
    }
  },
  sitemap: {
    hostname: 'https://bluefox.email'
  }
})
