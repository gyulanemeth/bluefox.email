<script setup>
import { useData } from 'vitepress'

const { isDark } = useData()
</script>

<template>
  <div class="py-12 deliverabilityDiv">
    <v-container style="max-width: 800px">
      <h2 class="sectionTitle text-center mt-0 pt-0">
        Hands-Free Send Queue Management
      </h2>
      <div class="mt-4 text-center">
        We handle your send queues for you, so you never have to worry about delays, retries, and rate limits.
      </div>
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
</style>
