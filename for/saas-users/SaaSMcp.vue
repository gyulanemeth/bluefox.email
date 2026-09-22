<script setup>
// Prompts and facts follow mcp/Landing.vue and docs/integrations/mcp-server.md.
const prompts = [
  'Create a campaign announcing our new feature and schedule it for tomorrow morning.',
  'Set up a welcome email for new subscribers on that list.',
  'Set up a webhook for bounces and complaints.',
  'How did our latest campaigns perform?'
]

const facts = [
  '50+ tools for emails, contacts, lists, and project settings',
  'Runs on your computer and calls the BlueFox API with your own key',
  'No MCP fee. Normal sending costs apply',
  'Works with Claude Desktop, Claude Code, Cursor, Windsurf, Cline, and Codex'
]
</script>

<template>
  <section id="mcp" class="mcp-section" aria-labelledby="mcp-title">
    <div class="mcp-head">
      <h2 id="mcp-title">Your product sends through the API. Your agent runs the rest.</h2>
      <p>The BlueFox MCP server lets Claude, Cursor, and other MCP-compatible AI clients manage your project for you. Describe the outcome in plain language, and your agent calls the right tools.</p>
    </div>

    <div class="mcp-cards">
      <div class="mcp-card">
        <span class="mcp-card-label">Ask for an outcome</span>
        <ul>
          <li v-for="prompt in prompts" :key="prompt">"{{ prompt }}"</li>
        </ul>
      </div>
      <div class="mcp-card">
        <span class="mcp-card-label">What you get</span>
        <ul>
          <li v-for="fact in facts" :key="fact">{{ fact }}</li>
        </ul>
      </div>
    </div>

    <p class="mcp-links">
      <a href="/docs/integrations/mcp-server" class="mcp-link">Set up the MCP server</a>
      <a href="/mcp" class="mcp-link mcp-link--muted">How MCP works with BlueFox</a>
    </p>
  </section>
</template>

<style scoped>
.mcp-section { padding: 36px 24px; }

.mcp-head {
  max-width: 760px;
  margin: 0 auto 28px;
  text-align: center;
}

.mcp-head h2 {
  margin: 0 0 10px;
  font-size: clamp(22px, 3vw, 32px);
  line-height: 1.2;
  border-top: 0 !important;
  padding-top: 0 !important;
}

.mcp-head p {
  margin: 0;
  font-size: 16px;
  line-height: 1.65;
  color: #475569;
}

html.dark .mcp-head p { color: #94a3b8; }

.mcp-cards {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.mcp-card {
  background: #eef8fd;
  border-radius: 4px;
  padding: 36px 24px;
  text-align: center;
}

html.dark .mcp-card { background: #0c1e2d; }

.mcp-card-label {
  display: block;
  margin-bottom: 14px;
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
}

html.dark .mcp-card-label { color: #f1f5f9; }

.mcp-card ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mcp-card li {
  font-size: 17px;
  line-height: 1.5;
  color: #334155;
}

html.dark .mcp-card li { color: #cbd5e1; }

.mcp-links {
  margin: 24px 0 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px 28px;
}

.mcp-link {
  font-size: 15px;
  font-weight: 700;
  color: #0369a1;
  text-decoration: none;
}

.mcp-link:hover {
  text-decoration: underline;
  text-underline-offset: 2px;
}

.mcp-link--muted {
  font-weight: 600;
  color: #475569;
}

html.dark .mcp-link { color: #67e8f9; }
html.dark .mcp-link--muted { color: #94a3b8; }

@media (max-width: 720px) {
  .mcp-section { padding: 24px 16px; }
  .mcp-cards { grid-template-columns: 1fr; }
}
</style>
