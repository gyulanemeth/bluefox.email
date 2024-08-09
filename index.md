---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: Beautiful emails for your SaaS.
  text: Effortlessly.
  tagline: Consistent-looking transactional, triggered, & marketing emails that your customers will love.
  image: '/assets/bluefoxemail-screen2.png'
  actions:
    - theme: brand
      text: Join waitlist
      link: /#subscribe
    - theme: alt
      text: Why?
      link: /why
features:
  - title: Design systems
    details: Beautifully designed transactional, triggered, and marketing emails. Easy.
  - title: Your AWS SES
    details: Use your own AWS SES to send, the gold-standard of high deliverability.
  - title: Unbeatable price
    details: $100 for a 1-year access. Or use the free version and advertise us.
---

<script setup>
  import Subscribe from './components/Subscribe.vue'
</script>

<Suspense>
  <Subscribe />
</Suspense>

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
