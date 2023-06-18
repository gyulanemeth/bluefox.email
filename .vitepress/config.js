import { defineConfig } from 'vitepress'



// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "bluefox.email",
  description: "High deliverability & brand consistency.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/assets/bluefoxemail-logo.png',
    head: [
      ['script', { src: 'https://www.googletagmanager.com/gtag/js?id=G-RFX7RXXS7C' }],
      ['script', {}, `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-RFX7RXXS7C');`]
    ],
    nav: [
      /*
      { text: 'Home', link: '/' },
      { text: 'Email Marketing Concepts', link: '/email-marketing-concepts/' },
      { text: 'Tutorials', link: '/tutorials/' },
      { text: 'About', link: '/about' }
      */
    ],

    sidebar: [
      {
        text: 'Email Marketing Concepts',
        link: '/email-marketing-concepts/'
      },
      {
        text: 'Tutorials',
        link: '/tutorials/',
        collapsed: true,
        items: [
          {
            text: 'Email Marketing 101',
            link: '/tutorials/email-marketing-101/',
            collapsed: true,
            items: [
              {
                text: 'Getting Started with Building Your List',
                link: '/tutorials/email-marketing-101/getting-started-with-building-your-list'
              },
              {
                text: 'Crafting Compelling Emails',
                link: '/tutorials/email-marketing-101/crafting-compelling-emails-the-art-of-effective-copywriting'
              },
              {
                text: 'Unlocking the Power of Personalization',
                link: '/tutorials/email-marketing-101/unlocking-the-power-of-personalization-segmentation-and-dynamic-content'
              },
              {
                text: 'Designing Engaging Emails',
                link: '/tutorials/email-marketing-101/designing-engaging-emails-templates-layouts-and-visual-elements'
              },
              {
                text: 'Mastering Subject Lines',
                link: '/tutorials/email-marketing-101/mastering-subject-lines-strategies-for-higher-open-rates'
              },
              {
                text: 'Automation Demystified',
                link: '/tutorials/email-marketing-101/automation-demistified-nurturing-leads-with-automated-email-campaigns'
              },
              {
                text: 'Maximizing Clicks and Conversions',
                link: '/tutorials/email-marketing-101/maximizing-clicks-and-conversions-optimizing-ctas-and-landing-pages'
              },
              {
                text: 'Analyzing Email Performance',
                link: '/tutorials/email-marketing-101/analyzing-email-performance-metrics-and-insights-for-success'
              },
              {
                text: 'Deliverability Matters',
                link: '/tutorials/email-marketing-101/deliverability-matters-best-practices-for-inbox-placement'
              },
              {
                text: 'Growing and Maintaining a Healthy Email List',
                link: '/tutorials/email-marketing-101/growing-and-maintaining-a-healthy-email-list-list-hygene-and-complience'
              }
            ]
          }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'twitter', link: 'https://twitter.com/gyulanemeth85' }
    ],
    footer: {
      copyright: 'Copyright © 2023-present GYN Technologies OÜ'
    }
  }
})
