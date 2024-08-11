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
    logo: '/assets/bluefoxemail-logo.png',
    search: {
      // provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Why?', link: '/why' },
      { text: 'About', link: '/about' },
      { text: 'Docs', link: '/docs/' }
      /*
      { text: 'Home', link: '/' },
      { text: 'Email Marketing Concepts', link: '/email-marketing-concepts/' },
      { text: 'About', link: '/about' }
      */
    ],

    sidebar: [
      {
        text: 'Why?',
        link: '/why'
      },
      {
        text: 'About',
        link: '/about'
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
      }
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/bluefoxemail' }
    ],
    footer: {
      copyright: 'Copyright © 2024 Innovaris Group LLC.'
    }
  }
})
