import { h } from 'vue'
import Theme from 'vitepress/theme'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
// Custom MDI CSS with font-display: swap for 1,660ms performance improvement
import './mdi-font-display-swap.css'

// import * from 'vuetify/components'
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
  VTextField,
  VSelect  // Add this line
} from 'vuetify/components'

import { Ripple } from 'vuetify/directives'

// Custom fonts - subset loaded, see config for preload hints
import '@fontsource/amatic-sc/400.css'
import '@fontsource/amatic-sc/700.css'
import '@fontsource/indie-flower/400.css'

import './style.css'

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


function saveUtm() {
  if (typeof window === 'undefined') {
    return false
  }

  const params = new URLSearchParams(window.location.search)
  let utmFromLocalStorage = localStorage.getItem('utmTags')
  utmFromLocalStorage = JSON.parse(utmFromLocalStorage)
  const utm = {}
  const tags = ['utm_source', 'utm_medium', 'utm_campaign']
  tags.forEach((tag) => {
    const tagData = params.get(tag)
    if (tagData) {
      utm[tag] = tagData
    }
  })

  if (Object.keys(utm).length) {
    if (Array.isArray(utmFromLocalStorage)) {
      if (utmFromLocalStorage.some((ele) => JSON.stringify(ele) === JSON.stringify(utm))) {
        return
      }
      utmFromLocalStorage.push(utm)
    } else {
      utmFromLocalStorage = [utm]
    }
    localStorage.setItem('utmTags', JSON.stringify(utmFromLocalStorage))
  }
}

export default {
  extends: Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      "layout-bottom": () => h(CustomFooter),
    })
  },
  enhanceApp({ app, router, siteData }) {
    if (typeof window !== 'undefined') {
      saveUtm()
    }
    router.onAfterRouteChanged = () => saveUtm()
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
        VTextField,
        VSelect  // Add this line
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
              primary: "#13B0EE",
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
  },
}
