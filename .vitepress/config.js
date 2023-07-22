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
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Email Marketing Concepts', link: '/email-marketing-concepts/' },
      { text: 'About', link: '/about' }
    ],

    sidebar: [
      {
        text: 'Email Marketing Concepts',
        link: '/email-marketing-concepts/',
        collapsed: true,
        items: [{
          text: 'Strategy',
          link: '/email-marketing-concepts/strategy/'
        }, {
          text: 'Design',
          link: '/email-marketing-concepts/design/'
        }, {
          text: 'Copywriting',
          link: '/email-marketing-concepts/copywriting/'
        }, {
          text: 'List Management',
          link: '/email-marketing-concepts/list-management/'
        }, {
          text: 'Metrics and analytics',
          link: '/email-marketing-concepts/metrics-and-analytics/'
        }, {
          text: 'Automation',
          link: '/email-marketing-concepts/automation/'
        }, {
          text: 'Personalization',
          link: '/email-marketing-concepts/personalization/'
        }, {
          text: 'Testing and Optimization',
          link: '/email-marketing-concepts/testing-and-optimization/'
        }, {
          text: 'Deliverability',
          link: '/email-marketing-concepts/deliverability/'
        }, {
          text: 'Compliance and Legal Considerations',
          link: '/email-marketing-concepts/compliance-and-legal-considerations/'
        }]
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
      copyright: 'Copyright © 2023-present GYN Technologies OÜ'
    }
  }
})
