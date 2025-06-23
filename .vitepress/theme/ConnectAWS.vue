<script setup>
import { ref } from 'vue'

const props = defineProps({
  isDark: {
    type: Boolean,
    default: false
  },
  xs: {
    type: Boolean,
    default: false
  }
})

const tab = ref('tab-1')
const tabs = [
  {
    value: 'tab-1',
    text: 'Subscribe',
    url: 'https://api.bluefox.email/v1/subscriber-lists/##YOUR_SUBSCRIBER_LIST_ID##',
    method: 'POST'
  },
  {
    value: 'tab-2',
    text: 'Unsubscribe',
    url: 'https://api.bluefox.email/v1/subscriber-lists/##YOUR_SUBSCRIBER_LIST_ID##/##SUBSCRIBER_EMAIL_ADDRESS##',
    method: 'PATCH'
  },
  {
    value: 'tab-3',
    text: 'Send transactional email',
    url: 'https://api.bluefox.email/v1/send-transactional',
    method: 'POST'
  },
  {
    value: 'tab-4',
    text: 'Send triggered email',
    url: 'https://api.bluefox.email/v1/send-triggered',
    method: 'POST'
  }
]

function getTabItem () {
  return tabs.find(item => item.value === tab.value)
}
</script>

<template>
<div>
  <v-row class="mt-6">
    <v-col>
      <v-card
        class="pa-8 d-flex flex-column align-center integrationCard"
        variant="outlined"
        height="100%"
        :theme="isDark ? 'dark' : 'light'"
      >
        <h3 class="mt-3 integrationCardTitle">Access Keys (Quick Start)</h3>
        <v-card-text class="mt-3 text-center" style="color: var(--vp-code-block-color)">
          Connect using your Access Key ID and Secret Access Key. Fast and easy setup in under 5 minutes.
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card
        class="pa-8 d-flex flex-column align-center integrationCard"
        variant="outlined"
        height="100%"
        :theme="isDark ? 'dark' : 'light'"
      >
        <h3 class="mt-3 integrationCardTitle">STS (Recommended)</h3>
        <v-card-text class="mt-3 text-center" style="color: var(--vp-code-block-color)">
          Use temporary credentials via AWS STS for a more secure, limited-scope connection. You stay in control of permissions and can revoke access anytime.
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card
        class="pa-8 d-flex flex-column align-center integrationCard"
        variant="outlined"
        height="100%"
        :theme="isDark ? 'dark' : 'light'"
      >
        <h3 class="mt-3 integrationCardTitle">Using our CloudFormation Script</h3>
        <v-card-text class="mt-3 text-center" style="color: var(--vp-code-block-color)">
          We provide an AWS-native script to automate everything safely. Just review and deploy.
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</div>
</template>

<style scoped>
  .mobileTabs {
    color: #bdbdbd;
    position: relative;
    left: calc(-50vw + 50%);
    width: 100vw;
  }

  .integrationCard {
    border-color: lightgray;
  }

  html.dark .integrationCard {
    border-color: #3e3e42;
  }

  .integrationCardTitle {
    font-size: 16px;
    color: var(--vp-c-text-1);
  }
</style>
