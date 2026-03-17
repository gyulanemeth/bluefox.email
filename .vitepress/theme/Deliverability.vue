<script setup>
import { useData } from 'vitepress'

const { isDark } = useData()
</script>

<template>
  <div class="py-12 deliverabilityDiv">
    <v-container style="max-width: 800px">
      <h2 class="sectionTitle text-center mt-0 pt-0">
        Bring your own Amazon SES (Optional)
      </h2>
      <p class="deliverabilitySubtitle">
        For full control and better pricing
      </p>
      <div class="mt-4 text-justified">
        Using your own AWS SES with bluefox.email gives you full control over your sender reputation while still benefiting from AWS's infrastructure. Since you connect your own AWS account, your email campaigns are isolated from other users' activities, ensuring better control over deliverability and security. You get the reliability and performance of AWS SES, but with the added assurance that only your actions affect your email sending reputation.
      </div>
      <div class="mt-4 text-justified">
        If needed, you can easily upgrade to dedicated IPs through AWS SES for even greater control and improved deliverability.
      </div>

      <a href="/byo-amazon-ses-pricing">See our BYO SES pricing</a>
    </v-container>
  </div>
</template>

<style scoped>
  .deliverabilityDiv {
    position: relative;
    left: calc(-50vw + 50%);
    width: 100vw;

    background: linear-gradient(278deg, 
      hsl(247.72, 53.44%, 90%) 10%,
      hsl(196.99, 86.56%, 90%) 90%
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
</style>
