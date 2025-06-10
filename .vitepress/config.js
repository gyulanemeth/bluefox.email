import { defineConfig } from "vitepress";
import tailwindcss from "tailwindcss";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  cleanUrls: true,
  title: "bluefox.email",
  description: "High deliverability & brand consistency.",
  head: [
    [
      "script",
      {
        src: "https://www.googletagmanager.com/gtag/js?id=G-RFX7RXXS7C",
        async: true,
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-RFX7RXXS7C');`,
    ],
    [
      "link",
      {
        rel: "preload",
        as: "image",
        href: "/assets/mascot-bring-your-own-awsses-dark-450x270.webp",
      },
    ],
    [
      "link",
      {
        rel: "preload",
        as: "image",
        href: "/assets/mascot-bring-your-own-awsses-450x270.webp",
      },
    ],
  ],
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

    sidebar: {
      "/docs/": [
        {
          text: "Getting Started",
          items: [
            { text: "Welcome", link: "/docs/" },
            { text: "Getting Started", link: "/docs/getting-started" },
            { text: "Dashboard", link: "/docs/dashboard" },
            {
              text: "Email Personalization",
              link: "/docs/email-personalization",
            },
          ],
        },
        {
          text: "Projects",
          items: [
            { text: "Projects Overview", link: "/docs/projects/" },
            { text: "New Project", link: "/docs/projects/new-project" },
            { text: "Dashboard", link: "/docs/projects/dashboard" },
            {
              text: "Transactional Emails",
              link: "/docs/projects/transactional-emails",
            },
            {
              text: "Triggered Emails",
              link: "/docs/projects/triggered-emails",
            },
            { text: "Campaigns", link: "/docs/projects/campaigns" },
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
          text: "Design Systems",
          items: [
            { text: "Design System Overview", link: "/docs/design-systems/" },
            { text: "Variables", link: "/docs/design-systems/variables" },
            { text: "Blocks", link: "/docs/design-systems/blocks" },
            { text: "Templates", link: "/docs/design-systems/templates" },
          ],
        },
        {
          text: "API",
          items: [
            { text: "API Overview", link: "/docs/api/" },
            {
              text: "Send Transactional Email",
              link: "/docs/api/send-transactional-email",
            },
            {
              text: "Send Triggered Email",
              link: "/docs/api/send-triggered-email",
            },
            { text: "Send Attachments", link: "/docs/api/send-attachments" },
            {
              text: "Subscriber List Management",
              link: "/docs/api/subscriber-list-management",
            },
          ],
        },
        {
          text: "Integrations",
          items: [
            { text: "Integrations Overview", link: "/docs/integrations/" },
            { text: "Webhooks", link: "/docs/integrations/webhooks" },
            { text: "Supabase", link: "/docs/integrations/supabase" },
          ],
        },
      ],
    },
    socialLinks: [{ icon: "x", link: "https://x.com/bluefoxemail" }],
    footer: {
      message:
        '<a href="/terms-of-use">Terms of use.</a> | <a href="/privacy-policy">Privacy policy.</a> | <a href="/refund-policy">Refund policy.</a> | <a href="/email-sending-concepts/">Glossary</a>',
      copyright: "Copyright © 2025 Innovaris Group LLC.",
    },
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
