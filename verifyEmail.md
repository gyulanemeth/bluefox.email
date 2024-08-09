---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
---

<script setup>
  import VerifyEmail from './components/VerifyEmail.vue'
</script>

<Suspense>
  <VerifyEmail />
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
