<script setup>
import { ref } from 'vue'

const activeStage = ref(0)

const stages = [
  {
    number: '01',
    label: 'Onboarding',
    color: '#13b0ee',
    colorLight: 'rgba(19, 176, 238, 0.1)',
    colorDark: 'rgba(19, 176, 238, 0.18)',
    goal: 'First value in under 24 hours',
    goalDesc: 'Move new users from account creation to a meaningful first experience before they disengage.',
    trigger: 'Contact added to onboarding list or account created event',
    emailTypes: ['Welcome email', 'Setup checklist', 'Day 3 check-in', 'First milestone congrats'],
    bluefoxFeature: 'Triggered emails + Automations',
    featureDesc: 'Fire a multi-step welcome sequence automatically when a new contact is added — no engineering sprint needed to update the flow.'
  },
  {
    number: '02',
    label: 'Activation',
    color: '#6366f1',
    colorLight: 'rgba(99, 102, 241, 0.1)',
    colorDark: 'rgba(99, 102, 241, 0.18)',
    goal: 'User reaches the activation milestone',
    goalDesc: 'Push users toward the key action that predicts long-term retention — whether that\'s connecting an integration, inviting a teammate, or running a first workflow.',
    trigger: 'Key action not taken after X days; enter/leave segment',
    emailTypes: ['Feature spotlight', 'Aha-moment nudge', 'Progress reminder', 'Peer social proof'],
    bluefoxFeature: 'Automations with branching + Segments',
    featureDesc: 'Branch your activation flow based on which features the user has tried. Segments let you target users who have not hit the milestone yet.'
  },
  {
    number: '03',
    label: 'Retention',
    color: '#10b981',
    colorLight: 'rgba(16, 185, 129, 0.1)',
    colorDark: 'rgba(16, 185, 129, 0.18)',
    goal: 'Build habit and reduce churn risk',
    goalDesc: 'Keep active users engaged between sessions and bring drifting users back before their usage drops to a cancellation signal.',
    trigger: 'Session frequency drop; weekly digest schedule; inactivity threshold reached',
    emailTypes: ['Weekly activity digest', 'Tip & trick series', 'Re-engagement nudge', 'Usage milestone alert'],
    bluefoxFeature: 'Campaigns + Audience filter nodes',
    featureDesc: 'Use scheduled campaigns for weekly digests and automation audience filters to detect inactivity before it becomes churn.'
  },
  {
    number: '04',
    label: 'Expansion',
    color: '#f59e0b',
    colorLight: 'rgba(245, 158, 11, 0.1)',
    colorDark: 'rgba(245, 158, 11, 0.18)',
    goal: 'Grow revenue from existing accounts',
    goalDesc: 'Identify accounts approaching usage limits or showing power-user behavior and present upgrade or seat-expansion opportunities at the right moment.',
    trigger: 'Usage limit approached; plan property change; team size milestone',
    emailTypes: ['Upgrade prompt', 'Seat invitation nudge', 'Feature upsell', 'Annual plan offer'],
    bluefoxFeature: 'Triggered emails + Set Value nodes',
    featureDesc: 'Use Set Value nodes to update a contact\'s lifecycle stage property when they cross a threshold, then trigger the expansion sequence automatically.'
  },
  {
    number: '05',
    label: 'Win-back',
    color: '#ef4444',
    colorLight: 'rgba(239, 68, 68, 0.1)',
    colorDark: 'rgba(239, 68, 68, 0.18)',
    goal: 'Prevent churn or learn from it',
    goalDesc: 'Catch at-risk accounts before they cancel and give them a reason to stay — or collect feedback from those who leave to improve your product.',
    trigger: 'Inactivity threshold exceeded; cancellation signal; downgrade event',
    emailTypes: ['Churn-risk alert', 'Save offer email', 'Personalized check-in', 'Exit feedback request'],
    bluefoxFeature: 'Automations with exit criteria + Branching',
    featureDesc: 'Set exit criteria to stop win-back sequences when a user reactivates. Use branching to route re-engaged users into a recovery path automatically.'
  }
]
</script>

<template>
  <section class="lifecycle-section" aria-labelledby="lifecycle-title">
    <div class="lifecycle-head">
      <v-chip color="primary" class="lifecycle-badge" aria-label="Lifecycle coverage badge">
        <span class="text-overline">Full Lifecycle Coverage</span>
      </v-chip>
      <h2 id="lifecycle-title">One Platform. Every Stage of the User Journey.</h2>
      <p>Map your entire SaaS lifecycle to BlueFox Email automations and triggered emails — from the first welcome message to the last win-back attempt.</p>
    </div>

    <div class="stage-nav" role="tablist" aria-label="Lifecycle stages">
      <button
        v-for="(stage, index) in stages"
        :key="stage.number"
        type="button"
        class="stage-btn"
        :class="{ active: activeStage === index }"
        :aria-selected="activeStage === index"
        :style="activeStage === index ? { borderColor: stage.color, color: stage.color } : {}"
        @click="activeStage = index"
      >
        <span class="stage-btn-num">{{ stage.number }}</span>
        <span class="stage-btn-label">{{ stage.label }}</span>
      </button>
    </div>

    <div
      class="stage-panel"
      role="tabpanel"
      :aria-label="`${stages[activeStage].label} stage details`"
    >
      <div class="panel-grid">
        <div class="panel-left">
          <div class="panel-goal-row">
            <span
              class="stage-label-pill"
              :style="{ background: stages[activeStage].colorLight, color: stages[activeStage].color }"
            >
              Stage {{ stages[activeStage].number }} — {{ stages[activeStage].label }}
            </span>
          </div>
          <h3 class="panel-goal-title">{{ stages[activeStage].goal }}</h3>
          <p class="panel-goal-desc">{{ stages[activeStage].goalDesc }}</p>

          <div class="panel-trigger">
            <span class="trigger-label">Typical trigger</span>
            <p class="trigger-text">{{ stages[activeStage].trigger }}</p>
          </div>
        </div>

        <div class="panel-right">
          <div class="emails-block">
            <p class="block-heading">Emails fired at this stage</p>
            <ul class="email-type-list" role="list">
              <li
                v-for="type in stages[activeStage].emailTypes"
                :key="type"
                class="email-type-item"
                role="listitem"
              >{{ type }}</li>
            </ul>
          </div>

          <div class="feature-block">
            <p class="block-heading feature-kicker">
              BlueFox Email feature
            </p>
            <strong class="feature-name">{{ stages[activeStage].bluefoxFeature }}</strong>
            <p class="feature-desc">{{ stages[activeStage].featureDesc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.lifecycle-section {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 36px 24px;
  background: #ffffff;
}

html.dark .lifecycle-section {
  background: rgba(15, 23, 42, 0.72);
  border-color: #334155;
}

.lifecycle-head {
  margin-bottom: 28px;
}

.lifecycle-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.lifecycle-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.lifecycle-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .lifecycle-head p {
  color: #94a3b8;
}

.stage-nav {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.stage-btn {
  display: flex;
  align-items: center;
  gap: 7px;
  border: 1px solid #cbd5e1;
  background: transparent;
  border-radius: 999px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  color: #475569;
  transition: border-color 0.2s, color 0.2s, background 0.2s;
}

.stage-btn:hover {
  border-color: #94a3b8;
  color: #0f172a;
}

.stage-btn.active {
  background: rgba(0, 0, 0, 0.03);
  font-weight: 700;
}

html.dark .stage-btn {
  border-color: #475569;
  color: #94a3b8;
}

html.dark .stage-btn:hover {
  color: #f1f5f9;
  border-color: #64748b;
}

html.dark .stage-btn.active {
  background: rgba(255, 255, 255, 0.04);
}

.stage-btn-num {
  font-size: 11px;
  font-weight: 800;
  opacity: 0.6;
}

.stage-panel {
  border-radius: 18px;
  padding: 28px 24px;
  background: #f8fafc;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.06);
}

html.dark .stage-panel {
  background: rgba(30, 41, 59, 0.6);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.2);
}

.panel-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: start;
}

.panel-goal-row {
  margin-bottom: 12px;
}

.stage-label-pill {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  border-radius: 999px;
  padding: 4px 10px;
  letter-spacing: 0.02em;
}

.panel-goal-title {
  margin: 0 0 10px;
  font-size: clamp(17px, 2.2vw, 22px);
  line-height: 1.3;
  border-top: 0 !important;
  padding-top: 0 !important;
  color: #0f172a;
}

html.dark .panel-goal-title {
  color: #f1f5f9;
}

.panel-goal-desc {
  margin: 0 0 20px;
  font-size: 14px;
  line-height: 1.65;
  color: #475569;
}

html.dark .panel-goal-desc {
  color: #94a3b8;
}

.panel-trigger {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 12px 14px;
}

html.dark .panel-trigger {
  background: rgba(15, 23, 42, 0.5);
  border-color: #334155;
}

.trigger-label {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
  margin-bottom: 4px;
}

html.dark .trigger-label {
  color: #94a3b8;
}

.trigger-text {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: #334155;
}

html.dark .trigger-text {
  color: #cbd5e1;
}

.emails-block {
  margin-bottom: 16px;
}

.block-heading {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}

html.dark .block-heading {
  color: #94a3b8;
}

.email-type-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.email-type-item {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: #334155;
  background: rgba(15, 23, 42, 0.06);
  border-radius: 999px;
  padding: 5px 12px;
}

html.dark .email-type-item {
  color: #cbd5e1;
  background: rgba(248, 250, 252, 0.1);
}

.feature-block {
  background: #ffffff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

html.dark .feature-block {
  background: rgba(15, 23, 42, 0.5);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.feature-kicker {
  margin-bottom: 4px;
  color: #13b0ee !important;
}

.feature-name {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

html.dark .feature-name {
  color: #f1f5f9;
}

.feature-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #475569;
}

html.dark .feature-desc {
  color: #94a3b8;
}

@media (prefers-reduced-motion: reduce) {
  .stage-btn,
  .stage-panel {
    transition: none;
  }
}

@media (max-width: 860px) {
  .lifecycle-section {
    padding: 24px 16px;
  }

  .stage-panel {
    padding: 20px;
  }

  .panel-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .email-type-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 520px) {
  .stage-nav {
    gap: 6px;
  }

  .stage-btn {
    padding: 7px 12px;
    font-size: 13px;
  }

  .stage-btn-num {
    display: none;
  }
}
</style>
