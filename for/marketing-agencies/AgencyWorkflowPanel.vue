<script setup>
import { ref } from 'vue'

const activeTab = ref('setup')

const tabs = [
  { id: 'setup', label: 'Client Setup' },
  { id: 'produce', label: 'Campaign Production' },
  { id: 'report', label: 'Client Reporting' }
]

const workflows = {
  setup: {
    title: 'Onboard a New Client in Under 30 Minutes',
    description: 'Each client gets a fully isolated workspace with their own contacts, templates, automations, and brand settings. No cross-client bleed.',
    steps: [
      {
        number: '01',
        title: 'Create a dedicated project',
        detail: 'Spin up a new project for the client. Contacts, campaigns, and automations are fully isolated from every other client account you manage.'
      },
      {
        number: '02',
        title: 'Apply their brand kit',
        detail: "Set the client's colors, fonts, and logo in the shared email theme. Every template created inside that project inherits the brand automatically."
      },
      {
        number: '03',
        title: 'Import contacts and configure lists',
        detail: 'Upload subscriber lists, define segments, and configure suppression rules for the client. List hygiene is enforced from day one.'
      },
      {
        number: '04',
        title: 'Grant team and client access',
        detail: 'Invite internal team members or the client directly with the correct permission level. Full multi-user support is included per project.'
      }
    ]
  },
  produce: {
    title: 'Go From Brief to Send Without Starting From Scratch',
    description: 'Clone proven layouts, apply brand overrides, and ship campaigns without rebuilding work your team has already proven.',
    steps: [
      {
        number: '01',
        title: 'Clone a proven template',
        detail: "Start from your agency's best-performing layouts or the client's last campaign. No blank canvas, no guesswork, no wasted hours on structure."
      },
      {
        number: '02',
        title: 'Apply brand overrides',
        detail: 'Swap colors, images, and copy using the design system. Brand rules prevent drift and enforce consistency without a manual QA checklist.'
      },
      {
        number: '03',
        title: 'Review before sending',
        detail: 'Check how the campaign looks before client review. BlueFox Email generates templates that aim for visual consistency across desktop and mobile clients, including Outlook.'
      },
      {
        number: '04',
        title: 'Send or schedule',
        detail: 'Launch immediately or queue for the optimal delivery window. Monitor delivery health and engagement from the analytics dashboard in real time.'
      }
    ]
  },
  report: {
    title: 'Deliver Polished Reporting Without Manual Data Cleanup',
    description: 'Export clean, visual analytics that help clients understand performance and make your retainer renewals and upsells straightforward.',
    steps: [
      {
        number: '01',
        title: 'Review engagement metrics',
        detail: 'Open rates, click-through rates, bounces, and unsubscribes are presented cleanly. No data wrangling required before the client call.'
      },
      {
        number: '02',
        title: 'Compare against previous campaigns',
        detail: 'Show campaign-over-campaign trends to demonstrate program improvement and the strategic value your agency delivers over time.'
      },
      {
        number: '03',
        title: 'Export or share with the client',
        detail: 'Send clean, client-facing data that communicates performance clearly without requiring them to interpret raw dashboards themselves.'
      },
      {
        number: '04',
        title: 'Plan the next campaign from real data',
        detail: 'Turn engagement signals into actionable strategy: better subject lines, refined segments, and stronger content for the next send window.'
      }
    ]
  }
}
</script>

<template>
  <section class="agency-workflow" aria-labelledby="agency-workflow-title">
    <div class="workflow-head">
      <v-chip color="primary" class="workflow-badge" aria-label="Agency workflow badge">
        <span class="text-overline">How It Works</span>
      </v-chip>
      <h2 id="agency-workflow-title">The agency workflow on BlueFox Email</h2>
      <p>From onboarding to delivery to reporting, every stage of your client workflow in one place.</p>
    </div>

    <div class="workflow-tabs" role="tablist" aria-label="Agency workflow stages">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="workflow-tab"
        :class="{ active: activeTab === tab.id }"
        :aria-selected="activeTab === tab.id"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="workflow-panel" role="tabpanel">
      <div class="panel-intro">
        <h3>{{ workflows[activeTab].title }}</h3>
        <p>{{ workflows[activeTab].description }}</p>
      </div>

      <div class="steps-grid">
        <div
          v-for="step in workflows[activeTab].steps"
          :key="step.number"
          class="step-card"
        >
          <span class="step-ghost" aria-hidden="true">{{ step.number }}</span>
          <strong class="step-title">{{ step.title }}</strong>
          <p class="step-detail">{{ step.detail }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.agency-workflow {
  padding: 36px 24px;
}

.workflow-head {
  margin-bottom: 28px;
}

.workflow-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.workflow-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.workflow-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .workflow-head p {
  color: #94a3b8;
}

.workflow-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.workflow-tab {
  border: 1px solid #cbd5e1;
  background: #ffffff;
  color: #334155;
  border-radius: 999px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}

.workflow-tab.active {
  border-color: #13b0ee;
  background: rgba(19, 176, 238, 0.12);
  color: #0369a1;
}

html.dark .workflow-tab {
  border-color: #475569;
  background: transparent;
  color: #e2e8f0;
}

html.dark .workflow-tab.active {
  border-color: #13b0ee;
  background: rgba(19, 176, 238, 0.18);
  color: #67e8f9;
}

.workflow-panel {
  background: rgba(248, 250, 252, 0.8);
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 28px 24px;
}

html.dark .workflow-panel {
  background: rgba(30, 41, 59, 0.5);
  border-color: #334155;
}

.panel-intro {
  margin-bottom: 24px;
}

.panel-intro h3 {
  margin: 0 0 8px;
  font-size: clamp(18px, 2.5vw, 24px);
  line-height: 1.25;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.panel-intro p {
  margin: 0;
  font-size: 15px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .panel-intro p {
  color: #94a3b8;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

/* Ghost-number tile: no visible border, decoration via large number */
.step-card {
  position: relative;
  overflow: hidden;
  background: #f8fafc;
  border-radius: 16px;
  padding: 22px 20px 20px;
  transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}

.step-card:hover {
  background: #ffffff;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

html.dark .step-card {
  background: rgba(30, 41, 59, 0.55);
}

html.dark .step-card:hover {
  background: rgba(30, 41, 59, 0.85);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.28);
}

/* The large ghost number in the background */
.step-ghost {
  position: absolute;
  top: -6px;
  right: 10px;
  font-size: 80px;
  font-weight: 900;
  line-height: 1;
  color: #0f172a;
  opacity: 0.04;
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.04em;
}

html.dark .step-ghost {
  color: #f8fafc;
  opacity: 0.06;
}

.step-title {
  display: block;
  font-size: 14px;
  font-weight: 700;
  line-height: 1.35;
  margin-bottom: 8px;
  color: #0f172a;
  position: relative;
}

html.dark .step-title {
  color: #f1f5f9;
}

.step-detail {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #475569;
  position: relative;
}

html.dark .step-detail {
  color: #94a3b8;
}

@media (prefers-reduced-motion: reduce) {
  .workflow-tab,
  .step-card {
    transition: none;
  }
}

@media (max-width: 860px) {
  .agency-workflow {
    padding: 24px 16px;
  }

  .workflow-panel {
    padding: 20px;
  }

  .steps-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .workflow-panel {
    padding: 16px;
  }

  .step-ghost {
    font-size: 56px;
  }
}
</style>
