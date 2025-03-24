<script setup>
import { defineProps, ref } from 'vue'

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
  <div
    v-if="!xs"
    class="d-flex justify-center mt-6"
  >
    <v-card
      elevation="6"
      width="100%"
      class="px-8"
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
  </div>
</template>

<style scoped>
  .mobileTabs {
    color: #bdbdbd;
    position: relative;
    left: calc(-50vw + 50%);
    width: 100vw;
  }
</style>
