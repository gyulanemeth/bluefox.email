<script setup>
import { useData } from 'vitepress'

const { isDark } = useData()
</script>

<template>
  <div class="pt-12 deliverabilityDiv">
    <v-container style="max-width: 800px; padding-bottom: 0;">
      <h2 class="sectionTitle text-center mt-0 pt-0">
        Keep SES. Just Make It Better.
      </h2>
      <div class="mt-4 text-center">
        BlueFox Email builds on top of your existing Amazon SES account -> no need to change your sending setup. You get a better UI, smarter workflows, and beautiful emails, without giving up control or deliverability.
      </div>

      <div class="mt-4 text-center justify-center">
        <v-btn
          size="large"
          color="primary"
          variant="flat"
          class="no-uppercase mr-3"
          href="https://app.bluefox.email/accounts/create-account"
          target="_blank"
        >
          <strong>Upgrade Your Amazon SES</strong>
        </v-btn>
      </div>

      <v-row class="mt-4">
        <v-col class="pb-0 d-flex align-end" cols="12" sm="6">
          <v-img src="/assets/testimonials/guillermo.webp"></v-img>
        </v-col>

        <v-col class="d-flex align-center justify-center mb-0" cols="12" sm="6">
          <div>
            <quote style="font-size: 14px; text-align: justify; display:block">
              <v-icon>mdi-format-quote-close</v-icon>
              <i>I honestly can't believe nobody had built something like this before. I've been using Amazon SES for years, and it's great, but you need to be a hacker to use it, and self-hosted solutions out there don't fully solve that problem. I'm so happy that BlueFox exists. I truly can't think of any reason why anyone would choose something different to send their emails. Finally you can get the SES pricing, with analytics, list management and design tools that match those of any of the big players in this space.</i>
              <v-icon>mdi-format-quote-close</v-icon>
            </quote>
            <div class="mt-3">
              <strong>Guillermo Carone</strong>
            </div>
            <div>
              Founder of <a href="https://wikiarquitectura.com/" target="_blank">wikiarquitectura.com</a>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
  .deliverabilityDiv {
    position: relative;
    left: calc(-50vw + 50%);
    width: 100vw;

    background: linear-gradient(278deg, 
      hsl(247.72, 53.44%, 95%) 10%,
      hsl(196.99, 86.56%, 95%) 90%
    );
    /*
    background: linear-gradient(278deg, 
      #392C91 0%,
      #13B0EE 100%
    );
    color: white;
    */

    /*background: #392C91;*/
  }
  html.dark .deliverabilityDiv {
    background: linear-gradient(278deg, hsl(247.72, 53.44%, 10%) 10%, hsl(196.99, 86.56%, 10%) 90%);
  }

  .deliverabilitySubtitle {
    background: var(--vp-c-bg);
    font-weight: bold;
    padding: 10px;
    text-align: center;
    color: var(--vp-c-text-1);
  }

  .text-justified {
    text-align: justify;
  }

  @media (max-width: 825px) {
    .deliverabilityDiv {
      padding: 0 40px;
    }
  }

  @media (max-width: 600px) {
    .deliverabilityDiv {
      padding: 0 20px;
    }
  }

  .sectionTitle {
    font-size: 30px !important;
  }
  @media (max-width: 640px) {
    .sectionTitle {
      font-size: 26px !important;
    }
  }
</style>
