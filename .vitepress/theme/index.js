// filepath: c:\Users\Parth\Desktop\BlueFoxEmail\bluefox.email\.vitepress\theme\index.js
// https://vitepress.dev/guide/custom-theme
import { h } from "vue";
import Theme from "vitepress/theme";
import { createVuetify } from "vuetify";
import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@fontsource/amatic-sc/400.css";
import "@fontsource/amatic-sc/700.css";
import "@fontsource/indie-flower/400.css";

import "./style.css";

import Posts from "./Posts.vue";
import Post from "./Post.vue";
import NavigationButton from "./NavigationButton.vue";
import TestimonialDiv from "./TestimonialDiv.vue";
import DesignSystem from "./DesignSystem.vue";
import RenderingIssues from "./RenderingIssues.vue";
import Deliverability from "./Deliverability.vue";
import Automation from "./Automation.vue";
import Integration from "./Integration.vue";
import GlossaryCTA from "./GlossaryCTA.vue";
import CustomFooter from "./CustomFooter.vue";

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'layout-bottom': () => h(CustomFooter)
    });
  },
  enhanceApp({ app, router, siteData }) {
    const vuetify = createVuetify({
      components,
      directives,
      theme: {
        themes: {
          light: {
            colors: {
              primary: "#13B0EE",
              secondary: "#392C91",
              buttonBackground: "#ebebef",
            },
          },
          dark: {
            colors: {
              primary: "#392C91",
              secondary: "#13B0EE",
              buttonBackground: "#161618",
            },
          },
        },
      },
      ssr: true,
    });

    app.use(vuetify);

    app.component("posts", Posts);
    app.component("post", Post);
    app.component("NavigationButton", NavigationButton);
    app.component("TestimonialDiv", TestimonialDiv);
    app.component("DesignSystem", DesignSystem);
    app.component("RenderingIssues", RenderingIssues);
    app.component("Deliverability", Deliverability);    app.component("Automation", Automation);
    app.component("Integration", Integration);
    app.component("GlossaryCTA", GlossaryCTA);
    app.component("CustomFooter", CustomFooter);
    // Remove the DocNavigation component registration since it's not needed
  },
};
