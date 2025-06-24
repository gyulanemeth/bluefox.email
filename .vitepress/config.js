import { defineConfig } from 'vitepress'
import tailwindcss from 'tailwindcss'

const headConf = []
if (process.env.VITE_APP_ENV == 'production') {
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
    `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-RFX7RXXS7C');`,
  ])
}

headConf.push([
  "link",
  {
    rel: "preload",
    as: "image",
    href: "/assets/mascot-bring-your-own-awsses-dark-450x270.webp",
  },
])
headConf.push([
  "link",
  {
    rel: "preload",
    as: "image",
    href: "/assets/mascot-bring-your-own-awsses-450x270.webp",
  },
])

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  title: "bluefox.email",
  description: "High deliverability & brand consistency.",
  head: headConf,
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: "/assets/bluefoxemail-logo-24x24.webp",
      alt: "bluefox.email logo",
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
          link: "https://app.bluefox.email",
          variant: "outlined",
        },
      },
      {
        component: "NavigationButton",
        props: {
          text: "Sign up",
          link: "https://app.bluefox.email/accounts/create-account",
          variant: "flat",
          color: "buttonBackground",
        },
      },
      /*
      { text: 'Home', link: '/' },
      { text: 'Email Marketing Concepts', link: '/email-marketing-concepts/' },
      { text: 'About', link: '/about' }
      */
    ],

    sidebar: [
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
            text: "Projects",
            link: "/docs/projects/",
            collapsed: false,
            items: [
              { text: "Project Dashboard", link: "/docs/projects/dashboard" },
              {
                text: "Creating a new project",
                link: "/docs/projects/new-project",
              },
              {
                text: "Transactional Emails",
                link: "/docs/projects/transactional-emails",
              },
              {
                text: "Triggered Emails",
                link: "/docs/projects/triggered-emails",
              },
              { text: "Campaigns", link: "/docs/projects/campaigns" },
              { text: "Automations", link: "/docs/projects/automations" },
              { text: "Contacts", link: "/docs/projects/contacts" },
              { text: "Forms & Pages", link: "/docs/projects/forms-and-pages" },
              {
                text: "Design System Settings",
                link: "/docs/projects/design-system-settings",
              },
              { text: "Settings", link: "/docs/projects/settings" },
            ],
          },
          {
            text: "API",
            link: "/docs/api/",
            collapsed: false,
            items: [
              {
                text: "Contacts & Subscriber List Management",
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
            text: "Design Systems",
            link: "/docs/design-systems/",
            collapsed: false,
            items: [
              { text: "Variables", link: "/docs/design-systems/variables" },
              {
                text: "Blocks (or modules)",
                link: "/docs/design-systems/blocks",
              },
              { text: "Templates", link: "/docs/design-systems/templates" },
            ],
          },
          {
            text: "Pricing/Credits",
            link: "/docs/credits",
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
    socialLinks: [{ icon: "x", link: "https://x.com/bluefoxemail" }],
    // Disabling the default footer as we're using a custom component
    footer: false,
  },
  sitemap: {
    hostname: "https://bluefox.email",
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
