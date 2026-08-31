<script setup>
// Mirrors the real BlueFox email builder: element palette on the left,
// canvas in the middle, element details on the right.
const contentElements = [
  { label: 'Title',     glyph: 'H1' },
  { label: 'Paragraph', glyph: 'P'  },
  { label: 'Text',      glyph: 'T'  },
  { label: 'Image',     icon: 'image' },
  { label: 'Button',    icon: 'button' },
  { label: 'Divider',   icon: 'divider' },
  { label: 'Social',    icon: 'social' },
  { label: 'Block',     icon: 'block' }
]

const editorPoints = [
  {
    title: 'Drag and drop, no HTML',
    description: 'Text, images, buttons, dividers, and columns. Arrange them on the canvas and preview how it renders in dark mode before you send.'
  },
  {
    title: 'Saved blocks',
    description: 'Save a section once and reuse it in every newsletter. Update the block and every email built from it follows.'
  },
  {
    title: 'Saved templates',
    description: 'Keep your finished layouts — the monthly student newsletter, the event invitation, the alumni update — ready for whoever sends next.'
  }
]
</script>

<template>
  <section class="editor-section" aria-labelledby="editor-title">
    <h2 id="editor-title" class="section-title">Build the newsletter once. Save the parts you’ll use again.</h2>
    <p class="section-subtitle constrained">
      A drag-and-drop editor, no HTML. Save any section as a block and drop it into the next newsletter.
      Save whole layouts as templates so the next person to send starts from something finished.
    </p>

    <div class="editor-mock" role="img" aria-label="The BlueFox email builder: an element palette on the left, the newsletter canvas in the middle, and element settings on the right">
      <!-- Top bar -->
      <div class="ed-topbar" aria-hidden="true">
        <span class="ed-back">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
          </svg>
        </span>
        <span class="ed-doc-name">Spring Student Newsletter</span>
        <span class="ed-topbar-spacer"></span>
        <span class="ed-zoom">100%</span>
        <span class="ed-btn ed-btn--ghost">Preview</span>
        <span class="ed-btn ed-btn--save">Save &amp; Close</span>
      </div>

      <!-- Breadcrumb bar -->
      <div class="ed-crumbbar" aria-hidden="true">
        <span class="ed-crumb-icon">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
            <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
          </svg>
        </span>
        <span class="ed-crumb">Body</span>
      </div>

      <div class="ed-body">
        <!-- Left: element palette -->
        <div class="ed-panel ed-panel--left" aria-hidden="true">
          <p class="ed-panel-title">Content</p>
          <div class="ed-tiles">
            <div v-for="el in contentElements" :key="el.label" class="ed-tile">
              <span v-if="el.glyph" class="ed-tile-glyph">{{ el.glyph }}</span>
              <span v-else class="ed-tile-icon">
                <svg v-if="el.icon === 'image'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
                </svg>
                <svg v-else-if="el.icon === 'button'" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <rect x="3" y="8" width="18" height="8" rx="2" />
                </svg>
                <svg v-else-if="el.icon === 'divider'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
                  <line x1="3" y1="12" x2="21" y2="12" /><line x1="7" y1="7" x2="17" y2="7" /><line x1="7" y1="17" x2="17" y2="17" />
                </svg>
                <svg v-else-if="el.icon === 'social'" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="7" r="3" /><circle cx="17" cy="9" r="2.4" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M15.5 20a4.5 4.5 0 0 1 5.5-4.4" />
                </svg>
                <svg v-else viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="16" rx="2" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </span>
              <span class="ed-tile-label">{{ el.label }}</span>
            </div>
          </div>
        </div>

        <!-- Middle: canvas -->
        <div class="ed-canvas-wrap">
          <div class="ed-canvas" aria-hidden="true">
            <div class="ed-node ed-node--masthead">
              <span class="ed-crest"></span>
              <span class="ed-line ed-line--short"></span>
            </div>

            <div class="ed-node ed-node--hero">
              <span class="ed-hero-kicker">March edition</span>
              <span class="ed-hero-title">This month on campus</span>
            </div>

            <div class="ed-node ed-node--selected">
              <span class="ed-node-tag">Text</span>
              <span class="ed-line"></span>
              <span class="ed-line"></span>
              <span class="ed-line ed-line--short"></span>
            </div>

            <div class="ed-node ed-node--cta">
              <span class="ed-cta-button">Read the full issue</span>
            </div>

            <div class="ed-dropzone">
              <span>Drop element here</span>
            </div>
          </div>
        </div>

        <!-- Right: details panel -->
        <div class="ed-panel ed-panel--right" aria-hidden="true">
          <p class="ed-panel-title ed-panel-title--right">Details</p>

          <p class="ed-field-label">Email content width</p>
          <div class="ed-slider">
            <span class="ed-slider-track"><span class="ed-slider-fill"></span></span>
            <span class="ed-slider-knob"></span>
          </div>
          <div class="ed-input">
            <span>600</span><span class="ed-input-unit">px</span>
          </div>

          <p class="ed-field-label ed-field-label--spaced">Body background</p>
          <div class="ed-swatch-row">
            <span class="ed-swatch"></span>
            <span class="ed-swatch-name">transparent</span>
          </div>

          <p class="ed-field-label ed-field-label--spaced">Theme</p>
          <div class="ed-swatch-row">
            <span class="ed-theme-dot ed-theme-dot--a"></span>
            <span class="ed-theme-dot ed-theme-dot--b"></span>
            <span class="ed-theme-dot ed-theme-dot--c"></span>
            <span class="ed-swatch-name">University</span>
          </div>
        </div>
      </div>
    </div>

    <ul class="editor-points" role="list">
      <li v-for="point in editorPoints" :key="point.title" class="editor-point">
        <div class="editor-point-dot" aria-hidden="true"></div>
        <div>
          <p class="editor-point-title">{{ point.title }}</p>
          <p class="editor-point-desc">{{ point.description }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.editor-section { padding: 0; }

.section-title {
  margin: 0 0 12px;
  max-width: 900px;
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.2;
  text-align: left;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.section-subtitle {
  margin: 0;
  font-size: 17px;
  line-height: 1.65;
  color: #4b5563;
  text-align: left;
}

html.dark .section-subtitle { color: #9ca3af; }

.constrained { max-width: 760px; }

/* ── Editor mock ─────────────────────────────────────────────────────────── */
.editor-mock {
  margin-top: 32px;
  border-radius: 16px;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.06);
}

html.dark .editor-mock {
  background: rgba(15, 23, 42, 0.6);
  border-color: rgba(148, 163, 184, 0.2);
  box-shadow: none;
}

/* Top bar */
.ed-topbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #ffffff;
  border-bottom: 1px solid #e2e8f0;
}

html.dark .ed-topbar {
  background: rgba(15, 23, 42, 0.8);
  border-bottom-color: rgba(148, 163, 184, 0.2);
}

.ed-back { display: inline-flex; color: #64748b; }
html.dark .ed-back { color: #94a3b8; }

.ed-doc-name {
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

html.dark .ed-doc-name { color: #f1f5f9; }

.ed-topbar-spacer { flex: 1; }

.ed-zoom {
  font-size: 11px;
  font-weight: 600;
  color: #64748b;
  padding: 4px 8px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

html.dark .ed-zoom { color: #94a3b8; border-color: rgba(148, 163, 184, 0.25); }

.ed-btn {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 6px 12px;
  border-radius: 6px;
  white-space: nowrap;
}

.ed-btn--ghost {
  color: #13b0ee;
  border: 1px solid rgba(19, 176, 238, 0.4);
}

.ed-btn--save {
  color: #ffffff;
  background: #16a34a;
}

/* Breadcrumb bar */
.ed-crumbbar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

html.dark .ed-crumbbar {
  background: rgba(30, 41, 59, 0.5);
  border-bottom-color: rgba(148, 163, 184, 0.2);
}

.ed-crumb-icon { display: inline-flex; color: #94a3b8; }

.ed-crumb {
  font-size: 12px;
  font-weight: 700;
  color: #475569;
}

html.dark .ed-crumb { color: #cbd5e1; }

/* Body grid */
.ed-body {
  display: grid;
  grid-template-columns: 168px 1fr 176px;
  gap: 0;
  min-height: 380px;
}

.ed-panel {
  padding: 16px 14px;
  background: #ffffff;
}

html.dark .ed-panel { background: rgba(15, 23, 42, 0.35); }

.ed-panel--left { border-right: 1px solid #e2e8f0; }
.ed-panel--right { border-left: 1px solid #e2e8f0; }

html.dark .ed-panel--left { border-right-color: rgba(148, 163, 184, 0.2); }
html.dark .ed-panel--right { border-left-color: rgba(148, 163, 184, 0.2); }

.ed-panel-title {
  margin: 0 0 12px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94a3b8;
}

.ed-panel-title--right { color: #13b0ee; }

/* Element tiles */
.ed-tiles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.ed-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px 4px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

html.dark .ed-tile {
  background: rgba(30, 41, 59, 0.5);
  border-color: rgba(148, 163, 184, 0.18);
  color: #94a3b8;
}

.ed-tile-glyph {
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
  color: #475569;
}

html.dark .ed-tile-glyph { color: #cbd5e1; }

.ed-tile-icon { display: inline-flex; }

.ed-tile-label {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* Canvas */
.ed-canvas-wrap {
  padding: 20px 18px;
  background: #f1f5f9;
}

html.dark .ed-canvas-wrap { background: rgba(2, 8, 20, 0.5); }

.ed-canvas {
  max-width: 320px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border-radius: 10px;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.08);
}

html.dark .ed-canvas {
  background: #111c2e;
  box-shadow: none;
}

.ed-node {
  position: relative;
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ed-node--masthead {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.ed-crest {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: linear-gradient(135deg, #13b0ee, #392c91);
  flex: 0 0 auto;
}

.ed-node--hero {
  gap: 4px;
  padding: 16px 12px;
  border-radius: 8px;
  background: linear-gradient(135deg, #6366f1, #13b0ee);
}

.ed-hero-kicker {
  font-size: 8px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
}

.ed-hero-title {
  font-size: 15px;
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
}

.ed-node--selected {
  /* room for the selection tag, which sits above the node's top edge */
  margin-top: 6px;
  border-color: #13b0ee;
  background: rgba(19, 176, 238, 0.04);
}

.ed-node-tag {
  position: absolute;
  top: -9px;
  left: 8px;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffffff;
  background: #13b0ee;
  padding: 2px 6px;
  border-radius: 4px;
}

.ed-line {
  display: block;
  height: 6px;
  border-radius: 3px;
  background: #e6ebf2;
}

html.dark .ed-line { background: rgba(148, 163, 184, 0.22); }

.ed-line--short { width: 58%; }

.ed-node--cta { align-items: center; }

.ed-cta-button {
  padding: 7px 14px;
  border-radius: 6px;
  background: #13b0ee;
  color: #ffffff;
  font-size: 9px;
  font-weight: 700;
}

.ed-dropzone {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 40px;
  border-radius: 8px;
  border: 1.5px dashed #13b0ee;
  background: rgba(19, 176, 238, 0.06);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #0369a1;
}

html.dark .ed-dropzone {
  background: rgba(19, 176, 238, 0.1);
  color: #67e8f9;
}

/* Right panel fields */
.ed-field-label {
  margin: 0 0 8px;
  font-size: 10px;
  font-weight: 700;
  color: #64748b;
}

html.dark .ed-field-label { color: #94a3b8; }

.ed-field-label--spaced { margin-top: 20px; }

.ed-slider {
  position: relative;
  display: flex;
  align-items: center;
  height: 16px;
  margin-bottom: 10px;
}

.ed-slider-track {
  flex: 1;
  height: 3px;
  border-radius: 2px;
  background: #e2e8f0;
  overflow: hidden;
}

html.dark .ed-slider-track { background: rgba(148, 163, 184, 0.25); }

.ed-slider-fill {
  display: block;
  width: 62%;
  height: 100%;
  background: #13b0ee;
}

.ed-slider-knob {
  position: absolute;
  left: 62%;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #13b0ee;
  transform: translateX(-50%);
}

.ed-input {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 9px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  font-size: 11px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .ed-input {
  border-color: rgba(148, 163, 184, 0.25);
  color: #f1f5f9;
}

.ed-input-unit { color: #94a3b8; font-weight: 600; }

.ed-swatch-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.ed-swatch {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 1px solid #cbd5e1;
  background:
    linear-gradient(45deg, #e2e8f0 25%, transparent 25%, transparent 75%, #e2e8f0 75%),
    linear-gradient(45deg, #e2e8f0 25%, #ffffff 25%, #ffffff 75%, #e2e8f0 75%);
  background-size: 8px 8px;
  background-position: 0 0, 4px 4px;
}

.ed-swatch-name {
  font-size: 11px;
  font-weight: 600;
  color: #475569;
}

html.dark .ed-swatch-name { color: #cbd5e1; }

.ed-theme-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.ed-theme-dot--a { background: #392c91; }
.ed-theme-dot--b { background: #13b0ee; }
.ed-theme-dot--c { background: #f59e0b; }

/* ── Supporting points ───────────────────────────────────────────────────── */
.editor-points {
  list-style: none;
  margin: 32px 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.editor-point {
  /* the global `li + li` rule would otherwise nudge cards 2 and 3 down 8px */
  margin-top: 0;
  background: #f8fafc;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

html.dark .editor-point { background: rgba(30, 41, 59, 0.5); }

.editor-point-dot {
  flex: 0 0 auto;
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 50%;
  background: #6366f1;
}

.editor-point-title {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
}

html.dark .editor-point-title { color: #f1f5f9; }

.editor-point-desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.55;
  color: #475569;
}

html.dark .editor-point-desc { color: #94a3b8; }

@media (max-width: 980px) {
  .ed-body { grid-template-columns: 148px 1fr; }
  .ed-panel--right { display: none; }
  .editor-points { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 620px) {
  .ed-body { grid-template-columns: 1fr; min-height: 0; }
  .ed-panel--left { display: none; }
  .ed-canvas-wrap { padding: 16px 12px; }
  .ed-btn--ghost, .ed-zoom { display: none; }
  .editor-points { grid-template-columns: 1fr; }
}

@media (prefers-reduced-motion: reduce) {
  .ed-node { transition: none; }
}
</style>
