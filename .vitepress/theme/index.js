import { h } from 'vue'
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

import Posts from './Posts.vue'
import Post from './Post.vue'
import NavigationButton from './NavigationButton.vue'
import TestimonialDiv from './TestimonialDiv.vue'
import DesignSystem from './DesignSystem.vue'
import RenderingIssues from './RenderingIssues.vue'
import Deliverability from './Deliverability.vue'
import Automation from './Automation.vue'
import Integration from './Integration.vue'
import GlossaryCTA from './GlossaryCTA.vue'
import GlossaryNavigation from './GlossaryNavigation.vue'
import CustomFooter from './CustomFooter.vue'

import DkimChecker from './free-tools/DkimChecker.vue'
import DmarcChecker from './free-tools/DmarcChecker.vue'
import SpfChecker from './free-tools/SpfChecker.vue'
import MxChecker from './free-tools/MxChecker.vue'
import DmarcReportAnalyzer from './free-tools/DmarcReportAnalyzer.vue'
import LinkChecker from './free-tools/LinkChecker.vue'


export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "layout-bottom": () => h(CustomFooter),
    })
  },
  enhanceApp({ app, router, siteData }) {
    // Defer large site fonts & styles to client to reduce initial CSS payload and unused CSS.
    if (typeof window !== 'undefined') {
      // add preconnect hints for common font hosts (helps early connect)
      try {
        const preconnectHosts = [
          'https://fonts.gstatic.com',
          'https://fonts.googleapis.com'
        ]
        preconnectHosts.forEach(href => {
          if (!document.querySelector(`link[rel="preconnect"][href="${href}"]`)) {
            const l = document.createElement('link')
            l.rel = 'preconnect'
            l.href = href
            l.crossOrigin = ''
            document.head.appendChild(l)
          }
        })
      } catch (e) {
        // no-op on SSR or restrictive environments
      }

      // load optional fonts and local theme CSS after hydration
      Promise.resolve().then(async () => {
        try {
          await import('@fontsource/amatic-sc/400.css')
          await import('@fontsource/amatic-sc/700.css')
          await import('@fontsource/indie-flower/400.css')
        } catch (e) {
          // ignore if fonts are not available in the environment
        }

        // load project style last (reduces render-blocking CSS)
        try {
          await import('./style.css')
        } catch (e) {
          // ignore
        }
      })
    }

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

    app.component('posts', Posts)
    app.component('post', Post)
    app.component('NavigationButton', NavigationButton)
    app.component('TestimonialDiv', TestimonialDiv)
    app.component('DesignSystem', DesignSystem)
    app.component('RenderingIssues', RenderingIssues)
    app.component('Deliverability', Deliverability)
    app.component('Automation', Automation)
    app.component('Integration', Integration)
    app.component('GlossaryCTA', GlossaryCTA)
    app.component('GlossaryNavigation', GlossaryNavigation)
    app.component('CustomFooter', CustomFooter)
    app.component('DkimChecker', DkimChecker)
    app.component('DmarcChecker', DmarcChecker)
    app.component('SpfChecker', SpfChecker)
    app.component('MxChecker', MxChecker)
    app.component('DmarcReportAnalyzer', DmarcReportAnalyzer)
    app.component('LinkChecker', LinkChecker)
  },
}
