<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const openDropdown = ref(null)
function toggleDropdown(id) {
  openDropdown.value = openDropdown.value === id ? null : id
}
function closeDropdown() { openDropdown.value = null }
function onDocClick(e) {
  if (!e.target.closest('.seg-select-wrap')) closeDropdown()
}
onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))

function labelFor(list, val) {
  return list.find(o => o.value === val)?.label || ''
}

const props = defineProps({
  isDark: { type: Boolean, default: false },
  lgAndUp: { type: Boolean, default: true },
  md: { type: Boolean, default: false },
  sm: { type: Boolean, default: false },
  xs: { type: Boolean, default: false }
})

const contacts = [
  { email: 'mark@acme.io',        name: 'Mark Chen',      userVersion: 'pro',    projectCreated: true,  awsSetup: true,  hasAPIKey: true,  lists: ['Alert center', 'Performance reports'], engagement: { opened: 4, clicked: 2 } },
  { email: 'robert@nova.co',      name: 'Robert Willis',  userVersion: 'free',   projectCreated: true,  awsSetup: false, hasAPIKey: false, lists: ['Alert center'], engagement: { opened: 0, clicked: 0 } },
  { email: 'parth@bluefox.email', name: 'Parth Tiwari',   userVersion: 'pro',    projectCreated: true,  awsSetup: true,  hasAPIKey: true,  lists: ['Test 2', 'parth\'s docs test'], engagement: { opened: 12, clicked: 5 } },
  { email: 'nicole@darechuk.com', name: 'Nicole Darechuk',userVersion: 'pro',    projectCreated: true,  awsSetup: true,  hasAPIKey: false, lists: ['Performance reports'], engagement: { opened: 7, clicked: 3 } },
  { email: 'gabriel@fox.dev',     name: 'Gabriel Ramos',  userVersion: 'trial',  projectCreated: false, awsSetup: false, hasAPIKey: false, lists: ['Advanced strategies'], engagement: { opened: 1, clicked: 0 } },
  { email: 'alex@sendly.io',      name: 'Alex Kim',       userVersion: 'pro',    projectCreated: true,  awsSetup: true,  hasAPIKey: true,  lists: ['Alert center', 'Advanced strategies'], engagement: { opened: 9, clicked: 4 } },
  { email: 'lina@studio42.com',   name: 'Lina Brandt',    userVersion: 'free',   projectCreated: true,  awsSetup: false, hasAPIKey: true,  lists: ['What\'s new with bluefox.email'], engagement: { opened: 3, clicked: 1 } },
  { email: 'diego@maplecrm.com',  name: 'Diego Alvarez',  userVersion: 'pro',    projectCreated: true,  awsSetup: true,  hasAPIKey: false, lists: ['Performance reports'], engagement: { opened: 6, clicked: 2 } }
]

const properties = [
  { value: 'awsSetup',       label: 'awsSetup',       type: 'boolean' },
  { value: 'projectCreated', label: 'projectCreated', type: 'boolean' },
  { value: 'hasAPIKey',      label: 'hasAPIKey',      type: 'boolean' },
  { value: 'userVersion',    label: 'userVersion',    type: 'string'  },
  { value: 'name',           label: 'name',           type: 'string'  }
]

const booleanOperators = [
  { value: 'is-true',  label: 'is-true'  },
  { value: 'is-false', label: 'is-false' }
]

const stringOperators = [
  { value: 'equals',           label: 'equals'           },
  { value: 'does-not-equal',   label: 'does-not-equal'   },
  { value: 'contains',         label: 'contains'         },
  { value: 'does-not-contain', label: 'does-not-contain' },
  { value: 'is-empty',         label: 'is-empty'         },
  { value: 'is-not-empty',     label: 'is-not-empty'     }
]

const engagementOperators = [
  { value: 'received',     label: 'received'     },
  { value: 'not-received', label: 'not-received' },
  { value: 'opened',       label: 'opened'       },
  { value: 'not-opened',   label: 'not-opened'   },
  { value: 'clicked',      label: 'clicked'      },
  { value: 'not-clicked',  label: 'not-clicked'  }
]

const tab = ref('property')
const property = ref('awsSetup')
const operator = ref('is-true')
const value = ref('')
const engagementOp = ref('opened')
const engagementDays = ref(30)

const currentProperty = computed(() => properties.find(p => p.value === property.value))

const operators = computed(() =>
  currentProperty.value?.type === 'boolean' ? booleanOperators : stringOperators
)

function onPropertyChange() {
  operator.value = operators.value[0].value
  value.value = ''
}

const matches = computed(() => {
  if (tab.value === 'property') {
    const prop = property.value
    const op = operator.value
    const v = value.value
    return contacts.filter(c => {
      const cv = c[prop]
      switch (op) {
        case 'is-true':          return cv === true
        case 'is-false':         return cv === false
        case 'equals':           return String(cv).toLowerCase() === v.toLowerCase()
        case 'does-not-equal':   return String(cv).toLowerCase() !== v.toLowerCase()
        case 'contains':         return String(cv).toLowerCase().includes(v.toLowerCase())
        case 'does-not-contain': return !String(cv).toLowerCase().includes(v.toLowerCase())
        case 'is-empty':         return cv === '' || cv == null
        case 'is-not-empty':     return cv !== '' && cv != null
        default: return true
      }
    })
  }
  const op = engagementOp.value
  return contacts.filter(c => {
    const o = c.engagement.opened
    const cl = c.engagement.clicked
    switch (op) {
      case 'received':     return true
      case 'not-received': return false
      case 'opened':       return o > 0
      case 'not-opened':   return o === 0
      case 'clicked':      return cl > 0
      case 'not-clicked':  return cl === 0
      default: return true
    }
  })
})

const showValueInput = computed(() => {
  const op = operator.value
  return !['is-true', 'is-false', 'is-empty', 'is-not-empty'].includes(op)
})

function reset() {
  tab.value = 'property'
  property.value = 'awsSetup'
  operator.value = 'is-true'
  value.value = ''
  engagementOp.value = 'opened'
  engagementDays.value = 30
}
</script>

<template>
  <div class="seg-demo" :class="{ 'seg-dark': isDark }">
    <!-- Segments dropdown (visual only) -->
    <div class="seg-field seg-field--outlined">
      <label class="seg-field-label">Segments</label>
      <div class="seg-field-control">
        <span>No Segment Filter</span>
        <svg class="seg-chevron" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
      </div>
    </div>

    <!-- Builder card -->
    <div class="seg-card">
      <div class="seg-tabs">
        <button
          class="seg-tab"
          :class="{ 'seg-tab--active': tab === 'property' }"
          @click="tab = 'property'"
          type="button"
        >Contact Property</button>
        <button
          class="seg-tab"
          :class="{ 'seg-tab--active': tab === 'engagement' }"
          @click="tab = 'engagement'"
          type="button"
        >Engagement</button>
      </div>

      <!-- Contact property row -->
      <div v-if="tab === 'property'" class="seg-row">
        <div class="seg-select-wrap seg-flex">
          <div
            class="seg-field seg-field--outlined"
            :class="{ 'seg-field--open': openDropdown === 'property' }"
            @click.stop="toggleDropdown('property')"
          >
            <label class="seg-field-label">Property</label>
            <div class="seg-field-control">
              <span>{{ labelFor(properties, property) }}</span>
              <svg class="seg-chevron" :class="{ 'seg-chevron--up': openDropdown === 'property' }" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
            </div>
          </div>
          <ul v-if="openDropdown === 'property'" class="seg-menu" @click.stop>
            <li
              v-for="p in properties"
              :key="p.value"
              class="seg-menu-item"
              :class="{ 'seg-menu-item--active': p.value === property }"
              @click="property = p.value; onPropertyChange(); closeDropdown()"
            >{{ p.label }}</li>
          </ul>
        </div>
        <div class="seg-select-wrap seg-flex">
          <div
            class="seg-field seg-field--outlined"
            :class="{ 'seg-field--open': openDropdown === 'operator' }"
            @click.stop="toggleDropdown('operator')"
          >
            <label class="seg-field-label">Operator</label>
            <div class="seg-field-control">
              <span>{{ labelFor(operators, operator) }}</span>
              <svg class="seg-chevron" :class="{ 'seg-chevron--up': openDropdown === 'operator' }" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
            </div>
          </div>
          <ul v-if="openDropdown === 'operator'" class="seg-menu" @click.stop>
            <li
              v-for="o in operators"
              :key="o.value"
              class="seg-menu-item"
              :class="{ 'seg-menu-item--active': o.value === operator }"
              @click="operator = o.value; closeDropdown()"
            >{{ o.label }}</li>
          </ul>
        </div>
        <div class="seg-field seg-field--outlined seg-value" :class="{ 'seg-value--hidden': !showValueInput }">
          <input
            v-model="value"
            class="seg-input"
            :disabled="!showValueInput"
            placeholder=""
            type="text"
          />
        </div>
        <button class="seg-trash" type="button" aria-label="Remove condition">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      </div>

      <!-- Engagement row -->
      <div v-else class="seg-row seg-row--engagement">
        <span class="seg-engagement-label">Email</span>
        <div class="seg-select-wrap seg-flex">
          <div
            class="seg-field seg-field--outlined"
            :class="{ 'seg-field--open': openDropdown === 'engagementOp' }"
            @click.stop="toggleDropdown('engagementOp')"
          >
            <label class="seg-field-label">Operator</label>
            <div class="seg-field-control">
              <span>{{ labelFor(engagementOperators, engagementOp) }}</span>
              <svg class="seg-chevron" :class="{ 'seg-chevron--up': openDropdown === 'engagementOp' }" viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M7 10l5 5 5-5z"/></svg>
            </div>
          </div>
          <ul v-if="openDropdown === 'engagementOp'" class="seg-menu" @click.stop>
            <li
              v-for="o in engagementOperators"
              :key="o.value"
              class="seg-menu-item"
              :class="{ 'seg-menu-item--active': o.value === engagementOp }"
              @click="engagementOp = o.value; closeDropdown()"
            >{{ o.label }}</li>
          </ul>
        </div>
        <span class="seg-engagement-text">in the last</span>
        <input v-model.number="engagementDays" type="number" min="1" max="365" class="seg-days-input" />
        <span class="seg-engagement-text">days</span>
        <button class="seg-trash" type="button" aria-label="Remove condition">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
        </button>
      </div>

      <div class="seg-pill-row">
        <button class="seg-pill" type="button">
          <svg class="seg-pill-plus" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v10M7 12h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> AND
        </button>
      </div>
    </div>

    <div class="seg-or-row">
      <button class="seg-pill" type="button">
        <svg class="seg-pill-plus" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v10M7 12h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> OR
      </button>
      <div class="seg-actions">
        <button class="seg-btn seg-btn--ghost" @click="reset" type="button">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 5V2L8 6l4 4V7a5 5 0 11-5 5H5a7 7 0 107-7z"/></svg>
          Reset
        </button>
        <button class="seg-btn seg-btn--ghost" type="button">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M17 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V7l-4-4zm-5 16a3 3 0 110-6 3 3 0 010 6zm3-10H5V5h10v4z"/></svg>
          Save
        </button>
        <button class="seg-btn seg-btn--danger" type="button">
          <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
          Delete
        </button>
      </div>
    </div>

    <!-- Contacts preview -->
    <div class="seg-preview">
      <div class="seg-preview-head">
        <div class="seg-match-count">
          <strong>{{ matches.length }}</strong> of {{ contacts.length }} contacts match
        </div>
      </div>
      <div class="seg-table-wrap">
        <table class="seg-table">
          <thead>
            <tr>
              <th>E-mail</th>
              <th>Lists</th>
              <th>Name</th>
              <th>User Version</th>
              <th>Project Created</th>
              <th>Aws Set Up</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="c in matches" :key="c.email">
              <td class="seg-email">{{ c.email }}</td>
              <td>
                <span v-for="l in c.lists" :key="l" class="seg-list-chip">{{ l }}</span>
              </td>
              <td>{{ c.name }}</td>
              <td>{{ c.userVersion }}</td>
              <td>{{ c.projectCreated }}</td>
              <td>{{ c.awsSetup }}</td>
            </tr>
            <tr v-if="matches.length === 0">
              <td colspan="6" class="seg-empty">No contacts match the current conditions.</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.seg-demo {
  max-width: 1100px;
  margin: 0 auto;
  font-size: 14px;
  color: #1f2937;
}

/* Outlined field (Vuetify-like) */
.seg-field--outlined {
  position: relative;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 10px 12px;
  background: #ffffff;
  min-height: 48px;
  display: flex;
  align-items: center;
  transition: border-color 0.15s ease;
}

.seg-field--outlined:focus-within,
.seg-field--outlined:hover {
  border-color: #13B0EE;
}

.seg-field-label {
  position: absolute;
  top: -8px;
  left: 10px;
  padding: 0 6px;
  background: #ffffff;
  font-size: 11px;
  color: #13B0EE;
  font-weight: 500;
  letter-spacing: 0.2px;
}

.seg-field-control {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #374151;
}

.seg-chevron { color: #9ca3af; transition: transform 0.15s ease; }
.seg-chevron--up { transform: rotate(180deg); }

/* Custom dropdown */
.seg-select-wrap { position: relative; min-width: 0; }
.seg-select-wrap .seg-field--outlined { cursor: pointer; user-select: none; }
.seg-field--open { border-color: #13B0EE !important; }
.seg-field--open .seg-field-label { color: #13B0EE; }

.seg-menu {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 6px 0;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  box-shadow: 0 6px 24px rgba(15, 23, 42, 0.12);
  z-index: 20;
  max-height: 260px;
  overflow-y: auto;
}
.seg-menu-item {
  padding: 10px 14px;
  font-size: 14px;
  color: #374151;
  cursor: pointer;
  transition: background 0.1s ease;
}
.seg-menu-item:hover { background: #f3f4f6; }
.seg-menu-item--active { background: #e0f2fe; color: #0369a1; font-weight: 500; }

/* Card */
.seg-card {
  margin-top: 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
  background: #ffffff;
}

/* Tabs */
.seg-tabs {
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
}
.seg-tab {
  padding: 8px 16px;
  border: none;
  background: transparent;
  color: #6b7280;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.seg-tab--active {
  background: #13B0EE;
  color: #ffffff;
}

/* Row */
.seg-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr auto;
  gap: 14px;
  align-items: center;
}
.seg-row--engagement {
  grid-template-columns: auto 1fr auto 90px auto auto;
}

.seg-flex { min-width: 0; }

.seg-input {
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  font-size: 14px;
  color: #1f2937;
  font-family: inherit;
}

.seg-value--hidden .seg-input { background: #f3f4f6; cursor: not-allowed; }

.seg-engagement-label { font-size: 14px; color: #374151; padding: 0 4px; }
.seg-engagement-text  { font-size: 14px; color: #6b7280; white-space: nowrap; }
.seg-days-input {
  border: 1px solid #d1d5db;
  border-radius: 6px;
  padding: 10px 12px;
  width: 90px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s ease;
}
.seg-days-input:focus { border-color: #13B0EE; }

.seg-trash {
  background: transparent;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.15s ease;
}
.seg-trash:hover { background: rgba(239, 68, 68, 0.08); }

/* Pill buttons */
.seg-pill-row { margin-top: 16px; }
.seg-or-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.seg-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  border: 1px solid #13B0EE;
  border-radius: 999px;
  background: transparent;
  color: #13B0EE;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
  cursor: pointer;
  transition: background 0.15s ease;
}
.seg-pill:hover { background: rgba(19, 176, 238, 0.08); }
.seg-pill-plus {
  display: inline-block;
  vertical-align: middle;
  color: currentColor;
}

/* Action buttons bottom-right */
.seg-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.seg-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
  cursor: pointer;
  background: transparent;
  transition: background 0.15s ease;
}
.seg-btn--ghost {
  border: 1px solid rgba(19, 176, 238, 0.4);
  color: rgba(19, 176, 238, 0.75);
}
.seg-btn--ghost:hover { background: rgba(19, 176, 238, 0.08); }
.seg-btn--danger {
  border: 1px solid #ef4444;
  color: #ef4444;
}
.seg-btn--danger:hover { background: rgba(239, 68, 68, 0.08); }

/* Preview */
.seg-preview {
  margin-top: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
  padding: 20px;
}
.seg-preview-head {
  display: flex;
  justify-content: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #f3f4f6;
  margin-bottom: 12px;
}
.seg-match-count { font-size: 14px; color: #4b5563; }
.seg-match-count strong { color: #13B0EE; font-size: 18px; font-weight: 700; }

.seg-table-wrap { overflow-x: auto; }
.seg-table { width: 100%; border-collapse: collapse; }
.seg-table th {
  text-align: left;
  padding: 10px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 1px solid #f3f4f6;
  white-space: nowrap;
}
.seg-table td {
  padding: 12px;
  font-size: 13px;
  border-bottom: 1px solid #f9fafb;
  color: #374151;
  vertical-align: top;
}
.seg-email { color: #1f2937; font-weight: 500; }
.seg-list-chip {
  display: inline-block;
  padding: 2px 10px;
  margin: 2px 4px 2px 0;
  background: rgba(19, 176, 238, 0.1);
  color: #13B0EE;
  border-radius: 999px;
  font-size: 12px;
  border: 1px solid rgba(19, 176, 238, 0.25);
}
.seg-empty { text-align: center; color: #9ca3af; padding: 24px; font-style: italic; }

/* Dark mode */
.seg-dark { color: #e2e8f0; }
.seg-dark .seg-field--outlined,
.seg-dark .seg-card,
.seg-dark .seg-preview {
  background: #1e293b;
  border-color: #334155;
}
.seg-dark .seg-field-label { background: #1e293b; }
.seg-dark .seg-field-control,
.seg-dark .seg-menu { background: #1e293b; border-color: #334155; }
.seg-dark .seg-menu-item { color: #e2e8f0; }
.seg-dark .seg-menu-item:hover { background: #263244; }
.seg-dark .seg-menu-item--active { background: #0c3a4f; color: #7dd3fc; }
.seg-dark .seg-input,
.seg-dark .seg-days-input { color: #e2e8f0; }
.seg-dark .seg-days-input { background: #1e293b; border-color: #334155; }
.seg-dark .seg-engagement-text { color: #94a3b8; }
.seg-dark .seg-table th { color: #94a3b8; border-color: #334155; }
.seg-dark .seg-table td { color: #cbd5e1; border-color: #263244; }
.seg-dark .seg-preview-head { border-color: #334155; }
.seg-dark .seg-match-count { color: #94a3b8; }
.seg-dark .seg-email { color: #f1f5f9; }
.seg-dark .seg-value--hidden .seg-input { background: #263244; }

/* Responsive */
@media (max-width: 820px) {
  .seg-row { grid-template-columns: 1fr 1fr; }
  .seg-row .seg-value { grid-column: span 2; }
  .seg-row .seg-trash { grid-column: span 2; justify-self: end; }
  .seg-row--engagement {
    grid-template-columns: 1fr 1fr;
    row-gap: 10px;
  }
  .seg-row--engagement > * { grid-column: span 2; }
  .seg-row--engagement .seg-flex { grid-column: span 2; }
}
@media (max-width: 599px) {
  .seg-row { grid-template-columns: 1fr; }
  .seg-row > * { grid-column: span 1 !important; }
}
</style>
