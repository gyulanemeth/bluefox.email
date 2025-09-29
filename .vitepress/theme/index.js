import { h, defineAsyncComponent } from 'vue'
import Theme from 'vitepress/theme'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// import * as components from 'vuetify/components'
import {
  VBtn,
  VCard,
  VCardText,
  VCardTitle,
  VCardActions,
  VChip,
  VCol,
  VContainer,
  VImg,
  VRow,
  VSheet,
  VTabs,
  VTab,
  VTabsWindow,
  VTabsWindowItem,
  VIcon,
  VDivider,
  VList,
  VListItem,
  VListItemTitle,
  VListItemSubtitle,
  VAvatar,
  VSpacer,
  VTextField
} from 'vuetify/components'

import { Ripple } from 'vuetify/directives'

import '@fontsource/amatic-sc/400.css'
import '@fontsource/amatic-sc/700.css'
import '@fontsource/indie-flower/400.css'

import './style.css'

import Posts from './Posts.vue'
import Post from './Post.vue'
import NavigationButton from './NavigationButton.vue'
import CustomFooter from './CustomFooter.vue'

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "layout-bottom": () => h(CustomFooter),
    })
  },
  enhanceApp({ app, router, siteData }) {
    const vuetify = createVuetify({
      components: {
        VBtn,
        VCard,
        VCardText,
        VCardTitle,
        VCardActions,
        VChip,
        VCol,
        VContainer,
        VImg,
        VRow,
        VSheet,
        VTabs,
        VTab,
        VTabsWindow,
        VTabsWindowItem,
        VIcon,
        VDivider,
        VList,
        VListItem,
        VListItemTitle,
        VListItemSubtitle,
        VAvatar,
        VSpacer,
        VTextField
      },
      directives: {
        Ripple
      },
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
    })

    app.use(vuetify)

    // Register small, common components globally
    app.component('posts', Posts)
    app.component('post', Post)
    app.component('NavigationButton', NavigationButton)
    app.component('CustomFooter', CustomFooter)

    // Register large, page-specific components ASYNCHRONOUSLY
    // This is the key performance improvement
    app.component('TestimonialDiv', defineAsyncComponent(() => import('./TestimonialDiv.vue')))
    app.component('DesignSystem', defineAsyncComponent(() => import('./DesignSystem.vue')))
    app.component('RenderingIssues', defineAsyncComponent(() => import('./RenderingIssues.vue')))
    app.component('Deliverability', defineAsyncComponent(() => import('./Deliverability.vue')))
    app.component('Automation', defineAsyncComponent(() => import('./Automation.vue')))
    app.component('Integration', defineAsyncComponent(() => import('./Integration.vue')))
    app.component('GlossaryCTA', defineAsyncComponent(() => import('./GlossaryCTA.vue')))
    app.component('GlossaryNavigation', defineAsyncComponent(() => import('./GlossaryNavigation.vue')))

    // Register all "tool" components asynchronously
    app.component('DkimChecker', defineAsyncComponent(() => import('./free-tools/DkimChecker.vue')))
    app.component('DmarcChecker', defineAsyncComponent(() => import('./free-tools/DmarcChecker.vue')))
    app.component('SpfChecker', defineAsyncComponent(() => import('./free-tools/SpfChecker.vue')))
    app.component('MxChecker', defineAsyncComponent(() => import('./free-tools/MxChecker.vue')))
    app.component('DmarcReportAnalyzer', defineAsyncComponent(() => import('./free-tools/DmarcReportAnalyzer.vue')))
    app.component('LinkChecker', defineAsyncComponent(() => import('./free-tools/LinkChecker.vue')))
  },
}