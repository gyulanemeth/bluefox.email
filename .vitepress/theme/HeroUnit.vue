<script setup>
import { useData } from 'vitepress'

const { isDark } = useData()
</script>

<template>
  <div class="heroDiv">
    <div class="d-flex flex-column align-center justify-center pb-12 heroMain">
      <h1 class="title text-center">Beautiful emails for SaaS companies</h1>
      <p class="tagline text-center">Send consistent and beautiful transactional, triggered, & marketing emails that your customers will love.</p>
      <div>
        <v-btn
          rounded
          size="large"
          color="primary"
          variant="flat"
          class="no-uppercase mr-3"
          href="https://app.bluefox.email/accounts/create-account"
          target="_blank"
        >
          Get started
        </v-btn>
        <v-btn
          rounded
          size="large"
          color="buttonBackground"
          variant="flat"
          class="no-uppercase ml-3"
          :theme="isDark? 'dark' : 'light'"
          href="/pricing"
        >
          Pricing
        </v-btn>
      </div>
    </div>
      <img
        :src="`/assets/mascot-bring-your-own-awsses${isDark ? '-dark' : ''}.png`"
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
    line-height: 1.3;
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
    color: var(--vp-c-text-2);
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
      font-size: 45px;
    }
    .tagline {
      font-size: 18px;
    }
    .cornerImage {
      max-width: 80%;
    }
  }
  
  @media (orientation: landscape) {
    .cornerImage {
      max-width: calc(100vh / 2);
    }
  }
</style>
