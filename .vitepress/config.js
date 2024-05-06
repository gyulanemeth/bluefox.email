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
            { text: 'Analytics', link: '/docs/projects/analytics' },
            { text: 'Theme settings', link: '/docs/projects/theme-settings' },
            { text: 'Settings', link: '/docs/projects/settings' }
          ]
        }, {
          text: 'Themes',
          link: '/docs/themes/',
          collapsed: false,
          items: [
            { text: 'Theme parameters', link: '/docs/themes/theme-parameters' },
            { text: 'Blocks (or modules)', link: '/docs/themes/blocks' },
            { text: 'Templates', link: '/docs/themes/templates' }
          ]
        }, {
          text: 'Personalization (merge tags)',
          link: '/docs/personalization',
        }, {
          text: 'API',
          link: '/docs/api'
        }]
      }
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/bluefoxemail' }
    ],
    footer: {
      copyright: 'Copyright © 2023-present GYN Technologies OÜ'
    }
  }
})
