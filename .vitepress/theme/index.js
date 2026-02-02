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


function setCookie(name, value, days = 30) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; Domain=.bluefox.email; path=/; SameSite=Lax; Secure`
}

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

function cleanUrl(clickKey) {
  const url = new URL(window.location.href)
  url.searchParams.delete('utm_source')
  url.searchParams.delete('utm_medium')
  url.searchParams.delete('utm_campaign')
  if (clickKey) {
    url.searchParams.delete(clickKey)
  }
  const newUrl = url.pathname + (url.search ? url.search : '') + (url.hash ? url.hash : '')
  window.history.replaceState(null, document.title, newUrl)
}

function getClickId(url) {
  const params = new URL(url).searchParams
  const clickIdParams = [
    "gclid",
    "fbclid",
    "rdclid",
    "ttclid",
    "li_fat_id",
    "msclkid",
    "scclid",
    "epik",
  ]
  for (const key of clickIdParams) {
    const value = params.get(key)
    if (value){ 
      return {key, value}
    }
  }
}

function saveUtmToCookie() {
  if (typeof window === 'undefined') {
    return false
  }
  const params = new URLSearchParams(window.location.search)
  let utmFromCookie = JSON.parse(getCookie('utmTags') || '[]')
  const utm = {}
  const tags = ['utm_source', 'utm_medium', 'utm_campaign']
  tags.forEach((tag) => {
    const value = params.get(tag)
    if (value) {
      utm[tag.replace(/^utm_/, '')] = value
    }
  })
  if (!Object.keys(utm).length) {
    return false
  }
  const clickData = getClickId(window.location.href)
  utm.clickId = clickData?.value
  if (Array.isArray(utmFromCookie)) {
    if (utmFromCookie.some((ele) => JSON.stringify(ele) === JSON.stringify(utm))) {
      return cleanUrl(clickData?.key)
    }
    utmFromCookie.push(utm)
  } else {
    utmFromCookie = [utm]
  }
  setCookie('utmTags', JSON.stringify(utmFromCookie), 100)
  cleanUrl(clickData?.key)
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
      saveUtmToCookie()
    }
    router.onAfterRouteChanged = () => {
      saveUtmToCookie()
      if (typeof window !== 'undefined' && window.rdt) {
        window.rdt('track', 'PageVisit')
      }
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
