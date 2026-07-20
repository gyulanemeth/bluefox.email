<script setup>
defineProps({
  schema: { type: Object, required: true },
  depth: { type: Number, default: 0 }
})

function fieldType(rules) {
  if (rules.enum) return `${rules.type || 'string'} (${rules.enum.join(' | ')})`
  if (rules.type === 'array') return `array${rules.items?.type ? ` of ${rules.items.type}` : ''}`
  return rules.type || 'any'
}

function nestedSchema(rules) {
  if (rules.type === 'object' && rules.properties) return rules
  if (rules.type === 'array' && rules.items?.type === 'object' && rules.items.properties) return rules.items
  return null
}
</script>

<template>
  <table class="api-table">
    <thead v-if="depth === 0">
      <tr>
        <th>Field</th>
        <th>Type</th>
        <th>Required</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(rules, name) in schema.properties" :key="name">
        <tr>
          <td :style="{ paddingLeft: `${depth * 16}px` }"><code>{{ name }}</code></td>
          <td>{{ fieldType(rules) }}</td>
          <td>{{ (schema.required || []).includes(name) ? 'yes' : '' }}</td>
          <td class="api-description">{{ rules.description }}</td>
        </tr>
        <tr v-if="nestedSchema(rules)">
          <td colspan="4" class="api-nested">
            <SchemaTable :schema="nestedSchema(rules)" :depth="depth + 1" />
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>
