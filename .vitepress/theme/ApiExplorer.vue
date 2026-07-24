<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  specUrl: { type: String, default: `${import.meta.env.VITE_BLUEFOX_URL}/v1/openapi.json` }
})

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

// Resolves any #/components/<category>/<name> ref (schemas AND responses both use this shape) - the spec now
// shares several fully-identical error responses (400/403/405/409) via $ref instead of inlining a full copy of
// each at every one of the ~75 endpoints that uses them, so this needs to handle both kinds of ref, not just schemas.
function resolveRef(value) {
  if (!value) return value
  if (value.$ref) {
    const [, , category, name] = value.$ref.split('/')
    return spec.value.components[category]?.[name]
  }
  return value
}

function requestBodySchema(op) {
  const schema = op.requestBody?.content?.['application/json']?.schema
  return resolveRef(schema)
}

function methodColor(method) {
  return { GET: 'primary', POST: 'success', PATCH: 'warning', PUT: 'warning', DELETE: 'error' }[method] || undefined
}

function statusColor(code) {
  return String(code).startsWith('2') ? 'success' : 'error'
}
</script>

<template>
  <div class="api-explorer">
    <p v-if="loadFailed">
      Could not load the API reference. View the raw spec at <a :href="specUrl">{{ specUrl }}</a>.
    </p>
    <p v-else-if="!spec">Loading&hellip;</p>
    <div v-else class="api-explorer-layout">
      <nav class="api-explorer-nav">
        <a
          v-for="tag in tags"
          :key="tag"
          class="api-explorer-nav-item"
          :class="{ active: tag === selectedTag }"
          href="javascript:void(0)"
          @click="selectedTag = tag"
        >{{ tag }}</a>
      </nav>
      <div class="api-explorer-content">
        <v-card
          v-for="op in operationsByTag[selectedTag]"
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
                    <td class="api-description">{{ resolveRef(response)?.description }}</td>
                  </tr>
                </tbody>
              </table>
            </template>
          </v-card-text>
        </v-card>
      </div>
    </div>
  </div>
</template>

<style>
.api-explorer,
.api-explorer .v-card,
.api-explorer .v-card-title,
.api-explorer .v-card-subtitle,
.api-explorer .v-card-text,
.api-explorer .v-chip {
  font-family: var(--vp-font-family-base);
}

.api-explorer code {
  font-family: var(--vp-font-family-mono);
}

.api-explorer-layout {
  display: flex;
  align-items: flex-start;
  gap: 32px;
}

.api-explorer-nav {
  flex: 0 0 220px;
  position: sticky;
  top: 24px;
  display: flex;
  flex-direction: column;
}

.api-explorer-nav-item {
  display: block;
  padding: 6px 12px;
  border-left: 2px solid transparent;
  color: var(--vp-c-text-2);
  font-size: 0.92em;
  line-height: 1.4;
  text-decoration: none;
  border-radius: 0 6px 6px 0;
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

.api-explorer-nav-item:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}

.api-explorer-nav-item.active {
  color: var(--vp-c-brand-1);
  border-left-color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
  font-weight: 600;
}

.api-explorer-content {
  flex: 1 1 auto;
  min-width: 0;
}

@media (max-width: 640px) {
  .api-explorer-layout {
    flex-direction: column;
  }

  .api-explorer-nav {
    position: static;
    flex-basis: auto;
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
  }

  .api-explorer-nav-item {
    border-left: none;
    border-bottom: 2px solid transparent;
    border-radius: 6px;
  }

  .api-explorer-nav-item.active {
    border-left-color: transparent;
    border-bottom-color: var(--vp-c-brand-1);
  }
}

.api-operation {
  margin-bottom: 24px;
  background: var(--vp-c-bg-soft);
}

.api-operation .v-card-title {
  font-size: 1em;
  font-weight: 600;
}

.api-operation .v-card-subtitle {
  opacity: 1;
  color: var(--vp-c-text-2);
  white-space: normal;
}

.api-operation-title {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.api-explorer .v-chip {
  text-transform: none;
  letter-spacing: normal;
  font-weight: 600;
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
  font-weight: 600;
}
</style>
