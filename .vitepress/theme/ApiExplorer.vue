<script setup>
import { ref, computed, onMounted } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  specUrl: { type: String, default: `${import.meta.env.VITE_BLUEFOX_URL}/v1/openapi.json` }
})

const { isDark } = useData()

const spec = ref(null)
const loadFailed = ref(false)
const selectedTag = ref(null)

onMounted(async () => {
  try {
    const res = await fetch(props.specUrl)
    if (!res.ok) throw new Error(`Request failed: ${res.status}`)
    spec.value = await res.json()
    selectedTag.value = spec.value.tags?.[0]?.name || null
  } catch (e) {
    loadFailed.value = true
  }
})

const tags = computed(() => spec.value?.tags?.map(t => t.name) || [])

const operationsByTag = computed(() => {
  const byTag = {}
  if (!spec.value) return byTag
  for (const [path, methods] of Object.entries(spec.value.paths || {})) {
    for (const [method, operation] of Object.entries(methods)) {
      for (const tag of operation.tags || ['Other']) {
        byTag[tag] = byTag[tag] || []
        byTag[tag].push({ method: method.toUpperCase(), path, ...operation })
      }
    }
  }
  return byTag
})

function resolveSchema(schema) {
  if (!schema) return null
  if (schema.$ref) {
    const name = schema.$ref.split('/').pop()
    return spec.value.components.schemas[name]
  }
  return schema
}

function requestBodySchema(op) {
  const schema = op.requestBody?.content?.['application/json']?.schema
  return resolveSchema(schema)
}

function methodColor(method) {
  return { GET: 'primary', POST: 'success', PATCH: 'warning', PUT: 'warning', DELETE: 'error' }[method] || undefined
}

function statusColor(code) {
  return String(code).startsWith('2') ? 'success' : 'error'
}
</script>

<template>
  <div class="api-explorer" :class="{ dark: isDark }">
    <p v-if="loadFailed">
      Could not load the API reference. View the raw spec at <a :href="specUrl">{{ specUrl }}</a>.
    </p>
    <p v-else-if="!spec">Loading&hellip;</p>
    <v-row v-else no-gutters>
      <v-col cols="12" md="3" class="api-explorer-nav">
        <v-tabs v-model="selectedTag" direction="vertical" color="primary" density="compact">
          <v-tab v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="12" md="9" class="api-explorer-content">
        <v-tabs-window v-model="selectedTag">
          <v-tabs-window-item v-for="tag in tags" :key="tag" :value="tag">
            <v-card
              v-for="op in operationsByTag[tag]"
              :key="op.method + op.path"
              variant="outlined"
              class="api-operation"
            >
              <v-card-title class="api-operation-title">
                <v-chip :color="methodColor(op.method)" size="small" label>{{ op.method }}</v-chip>
                <code class="api-path">{{ op.path }}</code>
              </v-card-title>
              <v-card-subtitle v-if="op.summary">{{ op.summary }}</v-card-subtitle>
              <v-card-text>
                <p v-if="op.description" class="api-description">{{ op.description }}</p>

                <template v-if="op.parameters?.length">
                  <h4>Parameters</h4>
                  <table class="api-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>In</th>
                        <th>Type</th>
                        <th>Required</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="p in op.parameters" :key="p.name">
                        <td><code>{{ p.name }}</code></td>
                        <td>{{ p.in }}</td>
                        <td>{{ p.schema?.type }}</td>
                        <td>{{ p.required ? 'yes' : '' }}</td>
                        <td class="api-description">{{ p.description }}</td>
                      </tr>
                    </tbody>
                  </table>
                </template>

                <template v-if="requestBodySchema(op)">
                  <h4>Request body</h4>
                  <SchemaTable :schema="requestBodySchema(op)" />
                </template>

                <template v-if="op.responses">
                  <h4>Responses</h4>
                  <table class="api-table">
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(response, code) in op.responses" :key="code">
                        <td><v-chip :color="statusColor(code)" size="x-small" label>{{ code }}</v-chip></td>
                        <td class="api-description">{{ response.description }}</td>
                      </tr>
                    </tbody>
                  </table>
                </template>
              </v-card-text>
            </v-card>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-col>
    </v-row>
  </div>
</template>

<style>
.api-explorer-nav .v-tabs {
  position: sticky;
  top: 24px;
}

.api-explorer-content {
  padding-left: 24px;
}

@media (max-width: 959px) {
  .api-explorer-content {
    padding-left: 0;
    padding-top: 16px;
  }
}

.api-operation {
  margin-bottom: 24px;
  background: var(--vp-c-bg-soft);
}

.api-operation-title {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.api-path {
  font-size: 0.95em;
  background: var(--vp-c-bg-alt);
  padding: 2px 8px;
  border-radius: 4px;
}

.api-description {
  white-space: pre-line;
  color: var(--vp-c-text-2);
}

.api-table {
  width: 100%;
  border-collapse: collapse;
  margin: 8px 0 16px;
  font-size: 0.9em;
}

.api-table th,
.api-table td {
  text-align: left;
  padding: 6px 10px;
  border-bottom: 1px solid var(--vp-c-divider);
  vertical-align: top;
}

.api-table th {
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.api-nested {
  padding: 0 0 0 8px !important;
  border-bottom: none !important;
}

.api-explorer h4 {
  margin: 16px 0 4px;
  font-size: 0.95em;
}
</style>
