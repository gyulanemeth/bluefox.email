---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Now, only $100 per project annually
  text: plus AWS costs
  tagline: Or use our free plan and advocate us.
  image: '/assets/bluefoxemail-screen2.webp'
  actions:
    - theme: brand
      text: Join waitlist
      link: /signup-waitlist
    - theme: alt
      text: Why?
      link: /why
---
<script setup>
  import Pricing from './components/Pricing.vue'

</script>
<Pricing></Pricing>

<style>
  .VPFeatures .title {
    font-size: 20px !important;
  }
  .VPFeatures .details {
    font-size: 16px !important;
  }

  .VPImage {
    max-width: 100% !important;
    max-height: 100% !important;
  }

  .image-container {
    transform: unset !important;
  }
</style>
