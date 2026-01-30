import { defineConfig, loadEnv } from 'vitepress'
import tailwindcss from 'tailwindcss'
import { addSchemaMarkup } from './theme/SchemaMarkup/schemaMarkup'
import { addToolsSchemaMarkup } from './theme/SchemaMarkup/toolsSchemaMarkup'
import { addComparisonSchemaMarkup } from './theme/SchemaMarkup/ComparisonSchemaMarkup'

const env = loadEnv('', process.cwd())

let headConf = [];

if (env.VITE_APP_ENV === 'production') {
  // Preconnect to external domains for better performance (only in production)
  headConf.push(['link', { rel: 'preconnect', href: 'https://www.googletagmanager.com' }]);
  headConf.push(['link', { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' }]);
  // only add GA if in production
  headConf.push([
    "script",
    {
      src: "https://www.googletagmanager.com/gtag/js?id=G-RFX7RXXS7C",
      async: true,
    },
  ])
  headConf.push([
    "script",
    {},
    `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-RFX7RXXS7C');\ngtag('config', 'AW-16693655873');`,
  ])
}

//   https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  title: "BlueFox Email",
  description: "High deliverability & brand consistency.",
  head: headConf,
  transformHead({ assets, ...context }) {
    const mdiFontFile = assets.find(asset =>
      asset.includes('materialdesignicons') && asset.endsWith('.woff2')
    );

    if (mdiFontFile) {
      return [
        [
          'link',
          {
            rel: 'preload',
            href: `${mdiFontFile}`,
            as: 'font',
            type: 'font/woff2',
            crossorigin: '',
          }
        ]
      ];
    }
    return [];
  },
  transformPageData(pageData) {
    addToolsSchemaMarkup(pageData)
    addSchemaMarkup(pageData)
    addComparisonSchemaMarkup(pageData)
  },
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor chunks more granularly for better performance
          if (id.includes('node_modules')) {
            if (id.includes('vuetify')) {
              return 'vuetify-vendor';
            }
            if (id.includes('vue')) {
              return 'vue-vendor';
            }
            if (id.includes('@mdi')) {
              return 'mdi-vendor';
            }
            return 'vendor';
          }
        }
      }
    }
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: "/assets/bluefoxemail-logo-48x48.webp",
      alt: "bluefox.email logo",
      width: "24",
      height: "24"
    },

    // Enable next and previous links at the bottom of doc pages
    docFooter: {
      prev: "Previous",
      next: "Next",
    },

    search: {
      provider: "local",
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Pricing", link: "/pricing" },
      { text: "Tutorials", link: "/tutorials" },
      { text: "Articles", link: "/articles" },
      { text: "Docs", link: "/docs/" },
      {
        component: "NavigationButton",
        props: {
          text: "Login",
          link: "https://app.bluefox.email", // Removed trailing space
          variant: "outlined",
        },
      },
      {
        component: "NavigationButton",
        props: {
          text: "Get Started for Free",
          link: "https://app.bluefox.email/accounts/create-account", // Removed trailing space
          variant: "flat",
          color: "primary",
        },
      },
      /*
      { text: 'Home', link: '/' },
      { text: 'Email Marketing Concepts', link: '/email-marketing-concepts/' },
      { text: 'About', link: '/about' }
      */
    ],

    sidebar: {
      "/": [
        {
          text: "Docs",
          link: "/docs/",
          collapsed: false,
          items: [
            {
              text: "Getting Started",
              link: "/docs/getting-started",
            },
            {
              text: "Account Dashboard",
              link: "/docs/dashboard",
            },
            {
              text: "Account Users",
              link:"/docs/account-users.md"
            },
            {
              text: "Projects",
              link: "/docs/projects/",
              collapsed: false,
              items: [
                {
                  text: "Project Dashboard",
                  link: "/docs/projects/dashboard"
                },
                {
                  text: "Creating a new project",
                  link: "/docs/projects/new-project",
                },
                {
                  text: "Delivery Modes",
                  link: "/docs/projects/delivery-modes",
                },
                {
                  text: "Transactional Emails",
                  link: "/docs/projects/transactional-emails",
                },
                {
                  text: "Triggered Emails",
                  link: "/docs/projects/triggered-emails",
                },
                {
                  text: "Campaigns",
                  link: "/docs/projects/campaigns"
                },
                {
                  text:"Send Test Emails",
                  link: "/docs/projects/send-test-email"
                },
                {
                  text: "Automations",
                  link: "/docs/projects/automations"
                },
                {
                  text: "Contacts",
                  link: "/docs/projects/contacts"
                },
                {
                  text: "Forms & Pages",
                  link: "/docs/projects/forms-and-pages"
                },
                {
                  text: "Email Theme Settings",
                  link: "/docs/projects/email-theme-settings",
                },
                {
                  text: "Suppression Lists",
                  link: "/docs/projects/suppression-list"
                },
                {
                  text: "Settings",
                  link: "/docs/projects/settings"
                },
              ],
            },
            {
              text: "API",
              link: "/docs/api/",
              collapsed: false,
              items: [
                {
                  text: "Contacts Management",
                  link: "/docs/api/contacts-management",
                },
                {
                  text: "Subscriber List Management",
                  link: "/docs/api/subscriber-list-management",
                },
                {
                  text: "Send Transactional Email",
                  link: "/docs/api/send-transactional-email",
                },
                {
                  text: "Send Triggered Email",
                  link: "/docs/api/send-triggered-email",
                },
                { text: "Send Attachments", link: "/docs/api/send-attachments" },
              ],
            },
            {
              text: "Integrations",
              link: "/docs/integrations/",
              collapsed: false,
              items: [
                {
                  text: "Webhooks for Event Notifications",
                  link: "/docs/integrations/webhooks",
                },
                { text: "Supabase", link: "/docs/integrations/supabase" },
                {
                  text: "Zapier", 
                  link: "/docs/integrations/zapier",
                }
              ],
            },
            {
              text: "Analytics",
              link: "/docs/analytics",
            },
            {
              text: "Email Personalization (Merge Tags)",
              link: "/docs/email-personalization",
            },
            {
              text: "Email Theme",
              link: "/docs/email-theme/",
              collapsed: false,
              items: [
                {
                  text: "Email Theme Basics",
                  link: "/docs/email-theme/email-theme-basics"
                },
                {
                  text: "Email Theme Components",
                  link: "/docs/email-theme/components"
                },
                {
                  text: "Blocks (or modules)",
                  link: "/docs/email-theme/blocks",
                },
                {
                  text: "Templates",
                  link: "/docs/email-theme/templates"
                }
              ],
            },
            {
              text: "Pricing",
              link: "/docs/pricing",
            },
          ],
        },
        {
          text: "Best Practices",
          link: "/email-best-practices-for-saas/",
          collapsed: false,
          items: [
            {
              text: "Double Opt-In",
              link: "/email-best-practices-for-saas/double-opt-in",
            },
            {
              text: "Unsubscribe and Pause Subscription",
              link: "/email-best-practices-for-saas/unsubscribe-and-pause-subscription",
            },
            {
              text: "DMARC",
              link: "/email-best-practices-for-saas/dmarc",
            },
          ],
        },
        {
          text: "Email Marketing Concepts",
          link: "/email-marketing-concepts/",
          collapsed: true,
          items: [
            {
              text: "Copywriting",
              link: "/email-marketing-concepts/copywriting/",
            },
            {
              text: "Design",
              link: "/email-marketing-concepts/design/",
            },
            {
              text: "List management",
              link: "/email-marketing-concepts/list-management/",
            },
            {
              text: "Metrics and analytics",
              link: "/email-marketing-concepts/metrics-and-analytics/",
            },
            {
              text: "Deliverability",
              link: "/email-marketing-concepts/deliverability/",
            },
            {
              text: "Personalization",
              link: "/email-marketing-concepts/personalization/",
            },
            {
              text: "Automation",
              link: "/email-marketing-concepts/automation/",
            },
            {
              text: "Testing and optimization",
              link: "/email-marketing-concepts/testing-and-optimization/",
            },
            {
              text: "Strategy",
              link: "/email-marketing-concepts/strategy/",
            },
            {
              text: "Compliance and legal considerations",
              link: "/email-marketing-concepts/compliance-and-legal-considerations/",
            },
          ],
        },
        {
          text: "Why?",
          link: "/why",
        },
        {
          text: "About",
          link: "/about",
        },
        {
          text: "Terms of use",
          link: "/terms-of-use",
        },
        {
          text: "Privacy policy",
          link: "/privacy-policy",
        },
        {
          text: "Refund policy",
          link: "/refund-policy",
        },
        {
          text: "Partners",
          link: "/partners",
        },
      ],
      "/courses/email-marketing-saas/": [
        {
          text: "Course Overview",
          link: "/courses/email-marketing-saas/",
          items: [
            {
              text: "Send Your First Newsletter",
              link: "/courses/email-marketing-saas/lesson-01-send-first-newsletter",
            },
            {
              text: "Welcome Email Flow",
              link: "/courses/email-marketing-saas/lesson-02-welcome-email-flow"
            },
            {
              text: "Educational Email Series as a Lead Magnet",
              link: "/courses/email-marketing-saas/lesson-03",
            },
            {
              text: "Segmentation",
              link: "/courses/email-marketing-saas/lesson-04",
            },
            {
              text: "Personalization",
              link: "/courses/email-marketing-saas/lesson-05",
            },
            {
              text: "Other Lead Magnets",
              link: "/courses/email-marketing-saas/lesson-06",
            },
          ]
        },
      ],
    },
    // Disabling the default footer as we're using a custom component
    footer: false,
  },
  sitemap: {
    hostname: "https://bluefox.email", // Removed trailing space
  },
  markdown: {
    config(md) {
      // Patch default image renderer
      const defaultRender =
        md.renderer.rules.image ||
        function (tokens, idx, options, env, self) {
          return self.renderToken(tokens, idx, options);
        };

      md.renderer.rules.image = function (tokens, idx, options, env, self) {
        const token = tokens[idx];
        const existingAttr = token.attrs?.map(([name]) => name) || [];

        // Add loading="lazy" if not already present
        if (!existingAttr.includes("loading")) {
          token.attrPush(["loading", "lazy"]);
        }

        return defaultRender(tokens, idx, options, env, self);
      };
    },
  },
});