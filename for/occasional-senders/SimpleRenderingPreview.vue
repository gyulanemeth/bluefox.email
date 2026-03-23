<script setup>
const issues = [
  { label: 'Images broken', type: 'broken' },
  { label: 'Layout shifted', type: 'broken' },
  { label: 'CTA hidden', type: 'broken' }
]

const fixes = [
  { label: 'Images load', type: 'fixed' },
  { label: 'Layout holds', type: 'fixed' },
  { label: 'CTA visible', type: 'fixed' }
]
</script>

<template>
  <section class="rendering-preview" aria-labelledby="rendering-preview-title">
    <div class="preview-head">
      <v-chip color="primary" class="preview-badge">
        <span class="text-overline">Reliable Rendering</span>
      </v-chip>
      <h2 id="rendering-preview-title">Preview Your Email. Know It Looks Right. Send It.</h2>
      <p>You should not need email rendering expertise. BlueFox generates markup that handles every inbox quirk automatically — including Outlook and Gmail.</p>
    </div>

    <div class="comparison-grid">
      <!-- Broken side -->
      <div class="comparison-card card--broken">
        <span class="card-label card-label--broken">Without proper rendering</span>
        <div class="mock-email mock-email--broken">
          <div class="mock-header mock-header--broken">
            <div class="mock-logo-broken" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" />
              </svg>
            </div>
          </div>
          <div class="mock-body">
            <div class="mock-text-line mock-shift-left" />
            <div class="mock-text-line mock-shift-right" />
            <div class="mock-text-line mock-narrow" />
            <div class="mock-image-broken" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div class="mock-cta mock-cta--broken" />
          </div>
        </div>
        <div class="issue-pills">
          <span v-for="issue in issues" :key="issue.label" class="pill pill--broken">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            {{ issue.label }}
          </span>
        </div>
      </div>

      <!-- Fixed side -->
      <div class="comparison-card card--fixed">
        <span class="card-label card-label--fixed">With BlueFox</span>
        <div class="mock-email mock-email--fixed">
          <div class="mock-header mock-header--fixed">
            <div class="mock-logo-fixed" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
          </div>
          <div class="mock-body">
            <div class="mock-text-line" />
            <div class="mock-text-line" />
            <div class="mock-text-line mock-narrow" />
            <div class="mock-image-fixed" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
              </svg>
            </div>
            <div class="mock-cta mock-cta--fixed" />
          </div>
        </div>
        <div class="issue-pills">
          <span v-for="fix in fixes" :key="fix.label" class="pill pill--fixed">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            {{ fix.label }}
          </span>
        </div>
      </div>
    </div>

    <div class="device-row">
      <div class="device-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
        <span>Desktop tested</span>
      </div>
      <div class="device-badge">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></svg>
        <span>Mobile tested</span>
      </div>
    </div>

    <div class="preview-callout" role="note">
      <strong>No rendering expertise needed.</strong>
      <span> BlueFox's markup handles email client quirks automatically — including Outlook's Word rendering engine, Gmail's CSS stripping, and mobile viewport handling.</span>
    </div>
  </section>
</template>

<style scoped>
.rendering-preview {
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 36px 24px;
  background: #ffffff;
}

html.dark .rendering-preview {
  background: rgba(15, 23, 42, 0.72);
  border-color: #334155;
}

.preview-head { margin-bottom: 24px; }

.preview-badge {
  height: auto !important;
  padding: 6px 12px !important;
  margin-bottom: 14px;
}

.preview-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.preview-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
  max-width: 680px;
}

html.dark .preview-head p { color: #94a3b8; }

/* Comparison grid */
.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 20px;
}

.comparison-card {
  border-radius: 18px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.card--broken {
  background: rgba(239, 68, 68, 0.04);
}

.card--fixed {
  background: rgba(16, 185, 129, 0.04);
}

html.dark .card--broken { background: rgba(239, 68, 68, 0.08); }
html.dark .card--fixed { background: rgba(16, 185, 129, 0.08); }

.card-label {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.card-label--broken { color: #dc2626; }
.card-label--fixed { color: #047857; }
html.dark .card-label--broken { color: #f87171; }
html.dark .card-label--fixed { color: #34d399; }

/* Mock email */
.mock-email {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

html.dark .mock-email { box-shadow: 0 1px 4px rgba(0,0,0,0.3); }

.mock-header {
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mock-header--broken { background: #fca5a5; }
.mock-header--fixed { background: #13b0ee; }
html.dark .mock-header--broken { background: #991b1b; }
html.dark .mock-header--fixed { background: #0284c7; }

.mock-logo-broken { color: #dc2626; }
.mock-logo-fixed { color: #ffffff; }
html.dark .mock-logo-broken { color: #fca5a5; }

.mock-body {
  background: #ffffff;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

html.dark .mock-body { background: #1e293b; }

.mock-text-line {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
}

html.dark .mock-text-line { background: #334155; }

.mock-shift-left {
  transform: translateX(-8px);
  width: 85%;
}

.mock-shift-right {
  transform: translateX(12px);
  width: 75%;
}

.mock-narrow { width: 60%; }

.mock-image-broken {
  height: 48px;
  background: #fef2f2;
  border: 1px dashed #fca5a5;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dc2626;
}

html.dark .mock-image-broken {
  background: rgba(239, 68, 68, 0.08);
  border-color: #991b1b;
  color: #f87171;
}

.mock-image-fixed {
  height: 48px;
  background: rgba(19, 176, 238, 0.08);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #13b0ee;
}

html.dark .mock-image-fixed { background: rgba(19, 176, 238, 0.12); }

.mock-cta {
  height: 24px;
  border-radius: 6px;
  width: 50%;
  margin: 4px auto 0;
}

.mock-cta--broken {
  background: #fca5a5;
  transform: translateX(20px);
}

.mock-cta--fixed {
  background: #0f172a;
}

html.dark .mock-cta--broken { background: #991b1b; }
html.dark .mock-cta--fixed { background: #13b0ee; }

/* Pills */
.issue-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 999px;
  padding: 4px 10px;
}

.pill--broken {
  background: rgba(239, 68, 68, 0.1);
  color: #dc2626;
}

.pill--fixed {
  background: rgba(16, 185, 129, 0.1);
  color: #047857;
}

html.dark .pill--broken { background: rgba(239, 68, 68, 0.15); color: #f87171; }
html.dark .pill--fixed { background: rgba(16, 185, 129, 0.15); color: #34d399; }

/* Device badges */
.device-row {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 20px;
}

.device-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #f8fafc;
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 12px;
  font-weight: 600;
  color: #334155;
}

html.dark .device-badge {
  background: rgba(30, 41, 59, 0.6);
  color: #cbd5e1;
}

.device-badge svg { color: #10b981; }

.preview-callout {
  background: #f8fafc;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 14px;
  line-height: 1.55;
  color: #475569;
}

html.dark .preview-callout {
  background: rgba(30, 41, 59, 0.6);
  color: #94a3b8;
}

.preview-callout strong { color: #0f172a; }
html.dark .preview-callout strong { color: #f1f5f9; }

@media (max-width: 860px) {
  .rendering-preview { padding: 24px 16px; }
  .comparison-grid { grid-template-columns: 1fr; }
}
</style>
