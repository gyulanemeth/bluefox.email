<template>
  <a :href="specUrl"><slot>{{ specUrl }}</slot></a>
</template>

<script setup>
const specUrl = `${import.meta.env.VITE_BLUEFOX_URL}/v1/openapi.json`
</script>
