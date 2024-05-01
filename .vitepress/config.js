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
          items: [
            { text: 'Settings', link: '/docs/projects/settings' },
            { text: 'Subscriber Lists', link: '/docs/projects/subscriber-lists' },
            { text: 'Transactional Emails', link: '/docs/projects/transactional-emails' },
            { text: 'Triggered Emails', link: '/docs/projects/triggered-emails' },
            { text: 'Campaigns', link: '/docs/projects/newsletters' },
            { text: 'Analytics', link: '/docs/projects/analytics' }
          ]
        }, {
          text: 'Design Systems',
          link: '/docs/design-systems'
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
