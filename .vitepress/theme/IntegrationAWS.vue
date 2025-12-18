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
  <div
    v-if="!xs"
    class="d-flex justify-center mt-6"
  >
    <v-card
      variant="outlined"
      width="100%"
      class="px-8 integrationCard"
      :theme="isDark ? 'dark' : 'light'"
    >
      <v-tabs
        v-model="tab"
        :items="tabs"
        align-tabs="center"
        height="60"
        style="color: #bdbdbd"
        color="secondary"
        hide-slider
      >
        <template v-slot:tab="{ item }">
          <v-tab
            :prepend-icon="item.icon"
            :text="item.text"
            :value="item.value"
            class="text-none"
          />
        </template>
      </v-tabs>

      <v-tabs-window v-model="tab">
        <v-tabs-window-item
          v-for="item in tabs"
          :key="item.value"
          :value="item.value"
        >
        <div class="language- vp-adaptive-theme">
          <button title="Copy Code" class="copy" />
          <span class="lang" />
          <pre
            class="shiki shiki-themes github-light github-dark vp-code"
            tabindex="0"
          ><code><span class="line"><span><v-chip label density="compact" class="mr-2">{{ item.method }}</v-chip>{{ item.url }}</span></span></code></pre>
        </div>
        
        <div>
          <slot :name="tab" />
        </div>
        </v-tabs-window-item>
      </v-tabs-window>

      <v-card-actions class="justify-end">
        <v-btn
          variant="text"
          size="small"
          class="text-none"
          style="color: var(--vp-c-text-1)"
          href="https://bluefox.email/docs/api/"
          target="_blank"
        >
          <v-icon class="mr-2">mdi-open-in-new</v-icon>
          Docs
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
  <div v-else>
    <v-tabs
      v-model="tab"
      :items="tabs"
      :color="isDark ? '#13B0EE' : '#392C91'"
      show-arrows
      hide-slider
      class="mobileTabs"
    >
    <template v-slot:tab="{ item }">
      <v-tab
        :prepend-icon="item.icon"
        :text="item.text"
        :value="item.value"
        class="text-none"
      />
    </template>
    </v-tabs>

    <div class="language- vp-adaptive-theme">
      <button title="Copy Code" class="copy" />
      <span class="lang" />
      <pre
        class="shiki shiki-themes github-light github-dark vp-code"
        tabindex="0"
      ><code><span class="line"><span><v-chip label density="compact" class="mr-2">{{ getTabItem().method }}</v-chip>{{ getTabItem().url }}</span></span></code></pre>
    </div>

    <slot :name="tab" />

    <div class="d-flex justify-center">
      <v-btn
        variant="text"
        size="small"
        class="text-none"
        style="color: var(--vp-c-text-1)"
        href="https://bluefox.email/docs/api/"
        target="_blank"
      >
        <v-icon class="mr-2">mdi-open-in-new</v-icon>
        Docs
      </v-btn>
    </div>
  </div>

  <v-row class="mt-6">
    <v-col>
      <v-card
        class="pa-8 d-flex flex-column align-center integrationCard"
        variant="outlined"
        height="100%"
        :theme="isDark ? 'dark' : 'light'"
        href="https://bluefox.email/docs/integrations/webhooks"
        target="_blank"
      >
        <v-img
          :width="50"
          :src="isDark ? '/assets/integrations/webhooks-dark.svg' : '/assets/integrations/webhooks-light.svg'"
          eager
        />
        <h3 class="mt-3 integrationCardTitle">Webhooks</h3>
        <v-card-text class="mt-3 text-center" style="color: var(--vp-code-block-color)">
          Webhooks send real-time notifications for email events (opens, clicks, bounces, complaints, subscriptions), enabling direct integration for improved tracking and automation.
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
