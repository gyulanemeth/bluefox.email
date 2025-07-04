<script setup>
import { useData } from 'vitepress'

const { isDark } = useData()
</script>

<template>
  <div class="heroDiv">
    <div class="d-flex flex-column align-center justify-center pb-12 heroMain">
      <div style="max-width:800px; width: 90%;">
        <h1 class="title">
          Supercharge Your Amazon SES
        </h1>
        <p class="tagline">BlueFox Email gives you beautiful emails, smart list management, effortless automation, and in-depth analytics, without giving up any control or deliverability.</p>
        <p class="tagline2">Get started with 3,000 free sends per month, and personalized support.</p>
        <div>
          <v-btn
            size="x-large"
            color="primary"
            variant="flat"
            class="no-uppercase mt-4"
            href="https://app.bluefox.email/accounts/create-account"
            target="_blank"
          >
            <strong>Get More from SES Today</strong>
          </v-btn>
        </div>
      </div>
    </div>
      <img
        :src="`/assets/mascot-bring-your-own-awsses${isDark ? '-dark' : ''}-450x270.webp`"
        alt="Bring your own AmazonSES"
        class="cornerImage"
      />
  </div>
</template>

<style scoped>
  .heroDiv {
    margin-top: calc((var(--vp-nav-height) + var(--vp-layout-top-height, 0px)) * -1);
    height: 100vh;
    padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 64px 64px;

    position: relative;
    left: calc(-50vw + 50%);
    width: 100vw;
    box-sizing: border-box;

    background: linear-gradient(278deg, hsl(247.72, 53.44%, 90%) 10%, hsl(196.99, 86.56%, 90%) 90%);
  }
  html.dark .heroDiv {
    background: linear-gradient(278deg, hsl(247.72, 53.44%, 10%) 10%, hsl(196.99, 86.56%, 10%) 90%);
  }

  .heroMain {
    height: 100%;
  }

  .title {
    font-size: 56px;
    background: -webkit-linear-gradient(
      120deg,
      #392C91 5%,
      #13B0EE
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
    margin-bottom: 24px;
  }
  html.dark .title {
    background: -webkit-linear-gradient(
      120deg,
      #8a7ed8 5%,
      #13B0EE
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.3;
  }

  .tagline {
    font-size: 24px;
    line-height: 28px;
    color: var(--vp-c-text-2);
  }

  .tagline2 {
    font-size: 20px;
    line-height: 24px;
    color: var(--vp-c-text-2);

    font-weight: 600;
  }

  a {
    text-decoration: none;
  }

  .cornerImage {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 450px;
    height: auto;
    max-width: calc(100vh / 1.5);
  }

  @media (max-width: 640px) {
    .heroDiv {
      padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 80px) 48px 64px;
    }
    .heroMain {
      justify-content: flex-start !important;
    }
  }

  @media (max-width: 480px) {
    .heroDiv {
      padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
    }
    .title {
      font-size: 40px;
    }
    .tagline {
      font-size: 18px;
    }
    .tagline2 {
      font-size: 16px;
    }
    .cornerImage {
      max-width: 80%;
    }
  }

  @media (max-width: 380px) {
    .heroDiv {
      padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
    }
    .title {
      font-size: 32px;
    }
    .tagline {
      font-size: 16px;
    }
    .tagline2 {
      font-size: 14px;
    }
    .cornerImage {
      max-width: 60%;
    }
  }
  
  @media (orientation: landscape) {
    .cornerImage {
      max-width: calc(100vh / 2);
    }
  }

  @media (orientation: landscape) and (max-height: 640px) {
    .heroDiv {
      padding: calc(var(--vp-nav-height) + var(--vp-layout-top-height, 0px) + 48px) 24px 48px;
    }
    .title {
      font-size: 32px;
    }
    .tagline {
      font-size: 16px;
    }
    .tagline2 {
      font-size: 14px;
    }
  }
</style>
