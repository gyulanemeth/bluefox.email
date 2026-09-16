<script setup>
import { ref } from 'vue'
import PersonaLanding from '../for/components/PersonaLanding.vue'
import {
  mdiAccountMultipleOutline,
  mdiEmailOutline,
  mdiSend,
  mdiChartBar,
  mdiWrenchOutline,
  mdiArrowRight,
  mdiOpenInNew,
  mdiChevronDown
} from '@mdi/js'

const REPO_URL = 'https://github.com/bluefox-email/bluefox.email-mcp'
const GET_STARTED_URL = 'https://app.bluefox.email/accounts/create-account'
// Internal, verified setup docs (see docs/integrations/mcp-server.md) rather
// than the GitHub README, so every link and code sample on this page matches
// content we maintain and have checked against the actual server.
const SETUP_DOCS_URL = '/docs/integrations/mcp-server'
const SETUP_CLIENTS_URL = '/docs/integrations/mcp-server#connecting-your-ai-client'
const TOOLS_DOCS_URL = '/docs/integrations/mcp-server#available-tools'

const prompts = [
  {
    text: 'Create a subscriber list called Product Updates.',
    icon: mdiAccountMultipleOutline
  },
  {
    text: 'Set up a welcome email for new subscribers on that list.',
    icon: mdiEmailOutline
  },
  {
    text: 'Create a campaign announcing our new feature and schedule it for tomorrow morning.',
    icon: mdiSend
  },
  {
    text: 'How did our latest campaigns perform?',
    icon: mdiChartBar
  }
]

// Groups and per-group tool counts follow docs/integrations/mcp-server.md's
// "Available Tools" section, so this stays in step with what the server
// actually ships. Counts are what a reader needs here; the docs page is where
// the individual tools are listed and explained.
// `wide` cards span two columns. The order below is deliberate: it puts the
// wide card on the left of the first row and on the right of the second, so
// the grid reads as composed rather than as a uniform wall of tiles, and it
// fills exactly three rows of three columns.
const toolGroups = [
  {
    name: 'Emails',
    count: 11,
    wide: true,
    desc: 'Create a campaign for a list or a segment, schedule and reschedule it, set up transactional and triggered emails, and read back delivery stats and error logs.'
  },
  {
    name: 'Contacts',
    count: 9,
    desc: 'Add, import, and bulk-update contacts, export them to CSV, and clean out addresses that have already bounced or complained.'
  },
  {
    name: 'Subscriber lists',
    count: 8,
    desc: 'Create lists with double opt-in and their confirmation emails, then subscribe, pause, or unsubscribe contacts.'
  },
  {
    name: 'Project settings',
    count: 9,
    wide: true,
    desc: 'Manage segments, webhooks, sending domains and sender identities, email theme overrides, contact fields and tags, and your suppression list.'
  },
  {
    name: 'Signup forms',
    count: 5,
    desc: 'Build a form for one or more lists, choose which fields it asks for, and get the embed code for your site.'
  },
  {
    name: 'Production access',
    count: 6,
    desc: 'Apply to leave sandbox mode, ask for a higher sending limit, and check bounce and complaint rates by domain.'
  },
  {
    name: 'AWS SES',
    count: 4,
    desc: 'Point the project at your own AWS account, and check that the credentials and sender identities work.'
  }
]

// Derived so the headline number can never drift from the counts above.
const toolCount = toolGroups.reduce((total, group) => total + group.count, 0)

const steps = [
  {
    number: '1',
    title: 'Connect your client',
    detail: "Add the BlueFox MCP server to Claude Desktop, Claude Code, Cursor, or another MCP-compatible client, using your project's ID and API key."
  },
  {
    number: '2',
    title: 'Ask for an outcome',
    detail: 'Describe what you want in plain language, like scheduling a campaign or adding a contact. Your agent picks the right tools and calls them for you.'
  },
  {
    number: '3',
    title: 'Review the result',
    detail: "Check your agent's response and review the resulting changes in BlueFox."
  }
]

// Anchors verified against docs/integrations/mcp-server.md's "Connecting Your
// AI Client" headings, so every badge lands on real, client-specific steps.
// Codex and ChatGPT Desktop share one setup section there because OpenAI's
// docs (https://learn.chatgpt.com/docs/extend/mcp) say all three Codex-family
// surfaces (ChatGPT desktop app, Codex CLI, Codex IDE extension) read the
// same local config.
const clients = [
  { name: 'Claude Desktop', href: '/docs/integrations/mcp-server#claude-desktop' },
  { name: 'Claude Code', href: '/docs/integrations/mcp-server#claude-code' },
  { name: 'Cursor', href: '/docs/integrations/mcp-server#cursor' },
  { name: 'Windsurf', href: '/docs/integrations/mcp-server#windsurf' },
  { name: 'Cline', href: '/docs/integrations/mcp-server#cline' },
  { name: 'Codex', href: '/docs/integrations/mcp-server#codex-and-chatgpt-desktop-app' },
  { name: 'ChatGPT Desktop', href: '/docs/integrations/mcp-server#codex-and-chatgpt-desktop-app' }
]

const faqs = [
  { q: 'Do I need to be a developer to use it?', a: "Setting it up involves some technical steps: cloning a repository, running a couple of terminal commands, and pasting a short config snippet into your AI client. Once that's done, using it is conversational. No code or API knowledge required." },
  { q: 'Do I need a BlueFox Email account?', a: "Yes. You'll need a BlueFox Email account with at least one project, plus that project's Project ID and API key, both available under Project Settings." },
  { q: 'Does using MCP cost extra?', a: "No. The MCP server itself is free to use. It carries out actions through your existing BlueFox Email account, so normal BlueFox Email sending costs apply, exactly as if you'd used the dashboard or API directly." },
  { q: 'Does the MCP server run locally?', a: "Yes. It runs as a local process on your own computer, launched by your AI client, and talks to the BlueFox Email API directly using your own API key. BlueFox doesn't host it for you, and it isn't published to npm; you install it by cloning the repository." },
  { q: 'Is my BlueFox API key safe?', a: "Your API key is stored in your AI client's local MCP configuration and sent straight from your computer to the BlueFox Email API, the same path it would take if you called the API yourself. It doesn't pass through any BlueFox-hosted server in between. Treat your MCP config file like any other file holding a credential." },
  { q: 'Why use MCP instead of the BlueFox API directly?', a: "The API is what you'd build a software integration on. MCP is for when you want an AI agent itself to understand BlueFox's capabilities and carry out tasks conversationally, without you writing integration code or looking up endpoint documentation." }
]
const openFaq = ref(null)
const toggleFaq = (i) => { openFaq.value = openFaq.value === i ? null : i }

const CONFIG_SNIPPET = `{
  "mcpServers": {
    "bluefox-email": {
      "command": "bluefox.email-mcp",
      "env": {
        "BLUEFOX_BASE_URL": "https://api.bluefox.email",
        "BLUEFOX_PROJECT_ID": "YOUR_PROJECT_ID",
        "BLUEFOX_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}`

const configCopied = ref(false)
let configCopiedTimeout
async function copyConfig() {
  try {
    await navigator.clipboard.writeText(CONFIG_SNIPPET)
    configCopied.value = true
    clearTimeout(configCopiedTimeout)
    configCopiedTimeout = setTimeout(() => { configCopied.value = false }, 2000)
  } catch (e) {
    // Clipboard API unavailable (e.g. insecure context) - the snippet stays
    // visible and selectable, so copying by hand still works.
  }
}
</script>

<template>
  <PersonaLanding
    hero-badge=""
    hero-title="Run BlueFox Email from your AI agent."
    hero-description="Create campaigns, manage contacts, and check email performance from Claude, Cursor, or another MCP-compatible AI client."
    :hero-highlights="['Runs on your computer', 'No MCP fee']"
    :hero-feature-items="[]"
    :hero-center-stacked-cta="true"
    hero-primary-cta-text="Set up MCP"
    :hero-primary-cta-href="SETUP_DOCS_URL"
    hero-secondary-cta-text="Create a free account"
    :hero-secondary-cta-href="GET_STARTED_URL"
    cta-text="Create a free account"
    :cta-href="GET_STARTED_URL"
    :show-testimonials="false"
    mid-cta-title=""
    :show-design="false"
    after-pain-stripe="white"
    :show-automation="false"
    :show-analytics="false"
    :show-integrations="false"
    final-cta-stripe="blue"
    final-title="Connect BlueFox Email to your AI agent"
    final-description="Set up your AI client and start managing campaigns, contacts, and more without leaving the conversation."
    final-primary-cta-text="Set up MCP"
    :final-primary-cta-href="SETUP_DOCS_URL"
    final-secondary-cta-text="Create a free account"
    :final-secondary-cta-href="GET_STARTED_URL"
  >
    <template #heroVisual>
      <div class="chat-mock" role="img" aria-label="Example conversation: a user asks their AI agent to create and schedule a campaign, and the agent confirms it using the BlueFox MCP server">
        <div class="chat-mock-header">
          <span class="chat-avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14"><path :d="mdiWrenchOutline" fill="currentColor"/></svg>
          </span>
          <div class="chat-mock-heading">
            <span class="chat-mock-title">BlueFox Agent</span>
            <span class="chat-mock-status"><span class="status-dot" aria-hidden="true"></span>Connected via MCP</span>
          </div>
        </div>
        <div class="chat-mock-body">
          <div class="chat-bubble chat-bubble--user">
            Create a campaign announcing our new AI feature and schedule it for tomorrow at 9am.
          </div>
          <div class="chat-tool-call">
            <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
              <path :d="mdiWrenchOutline" fill="currentColor"/>
            </svg>
            <span>create_campaign</span>
          </div>
          <div class="chat-bubble chat-bubble--agent">
            Done. "New AI Feature Announcement" is scheduled for tomorrow at 9:00 AM to your Newsletter list.
          </div>
        </div>
        <div class="chat-mock-input" aria-hidden="true">
          <span class="chat-mock-input-placeholder">Ask your agent to do something&hellip;</span>
          <span class="chat-mock-send">
            <svg viewBox="0 0 24 24" width="14" height="14"><path :d="mdiSend" fill="currentColor"/></svg>
          </span>
        </div>
      </div>
    </template>

    <template #afterPain>
      <!-- 1. Prompt examples (white) -->
      <section class="mcp-stripe-inner section-block" aria-labelledby="prompts-title">
        <h2 id="prompts-title" class="section-title">Just tell it what you need</h2>
        <p class="section-subtitle constrained">Once connected, no API docs, no copy-pasting requests. Describe the outcome, and your agent handles the rest.</p>
        <div class="prompt-grid" role="list" aria-label="Example prompts">
          <div v-for="(prompt, i) in prompts" :key="i" class="prompt-card" role="listitem">
            <svg class="prompt-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path :d="prompt.icon" fill="currentColor"/>
            </svg>
            <p>"{{ prompt.text }}"</p>
          </div>
        </div>
      </section>

      <!-- 2. Capabilities (blue) -->
      <div class="mcp-stripe mcp-stripe--blue">
        <section class="mcp-stripe-inner section-block" aria-labelledby="capabilities-title">
          <h2 id="capabilities-title" class="section-title">What your agent can do</h2>
          <p class="section-subtitle constrained">{{ toolCount }} tools, grouped the same way the app is. You describe the outcome; your agent works out which ones to call.</p>

          <div class="tool-grid">
            <div
              v-for="group in toolGroups"
              :key="group.name"
              class="tool-card"
              :class="{ 'tool-card--wide': group.wide }"
            >
              <span class="tool-card-count" aria-hidden="true">{{ group.count }}</span>
              <h3 class="tool-card-name">{{ group.name }}</h3>
              <p class="tool-card-desc">{{ group.desc }}</p>
              <span class="visually-hidden">{{ group.count }} tools</span>
            </div>
          </div>

          <p class="capability-link-row">
            <a :href="TOOLS_DOCS_URL" class="capability-link">
              What each tool does
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path :d="mdiArrowRight" fill="currentColor"/>
              </svg>
            </a>
            <a :href="REPO_URL" target="_blank" rel="noopener noreferrer" class="capability-link capability-link--muted">
              View the source on GitHub
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path :d="mdiOpenInNew" fill="currentColor"/>
              </svg>
            </a>
          </p>
        </section>
      </div>

      <!-- 3. Compatible AI clients (white, compact) -->
      <section class="mcp-stripe-inner compat-section" aria-labelledby="clients-title">
        <h2 id="clients-title" class="section-title">Works with the AI tools you already use</h2>
        <p class="section-subtitle constrained">Any MCP-compatible client can connect. Setup steps are documented for:</p>
        <div class="client-row" role="list" aria-label="Compatible AI clients">
          <a
            v-for="client in clients"
            :key="client.name"
            :href="client.href"
            class="client-chip"
            role="listitem"
          >{{ client.name }}</a>
        </div>
        <p class="client-footnote">ChatGPT web (the browser-based chat) doesn't read local configuration and can't connect to this local server; use the <a href="/docs/api/">BlueFox Email API</a> for ChatGPT web integrations instead. A remote MCP server for web-based clients like ChatGPT web is in the works.</p>
      </section>

      <!-- 4. How it works (blue) -->
      <div class="mcp-stripe mcp-stripe--blue">
        <section class="mcp-stripe-inner section-block" aria-labelledby="how-it-works-title">
          <h2 id="how-it-works-title" class="section-title">How it works</h2>
          <p class="section-subtitle constrained">Your AI client connects to BlueFox through a small server running on your computer.</p>

          <div class="flow-diagram" role="img" aria-label="AI Agent connects to the BlueFox MCP Server, which connects to the BlueFox Email API">
            <div class="flow-node">
              <span class="flow-node-title">AI Agent</span>
              <span class="flow-node-sub">Claude, Cursor, etc.</span>
            </div>
            <svg class="flow-arrow" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path :d="mdiArrowRight" fill="currentColor"/></svg>
            <div class="flow-node">
              <span class="flow-node-title">BlueFox MCP Server</span>
              <span class="flow-node-sub">Runs on your computer</span>
            </div>
            <svg class="flow-arrow" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path :d="mdiArrowRight" fill="currentColor"/></svg>
            <div class="flow-node">
              <span class="flow-node-title">BlueFox Email API</span>
              <span class="flow-node-sub">Your account</span>
            </div>
          </div>

          <div class="steps-row">
            <div v-for="step in steps" :key="step.number" class="step">
              <div class="step-circle">{{ step.number }}</div>
              <div class="step-content">
                <strong class="step-title">{{ step.title }}</strong>
                <p class="step-detail">{{ step.detail }}</p>
              </div>
            </div>
          </div>

          <p class="setup-doc-row">
            <a :href="SETUP_CLIENTS_URL" class="setup-doc-link">
              Full setup documentation for every client
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                <path :d="mdiArrowRight" fill="currentColor"/>
              </svg>
            </a>
          </p>

          <details class="config-disclosure">
            <summary class="config-summary">Show configuration example</summary>
            <div class="config-card">
              <p class="config-label">What you add to your AI client's config (Claude Desktop, Cursor, Windsurf, Cline):</p>
              <div class="code-block">
                <button type="button" class="copy-btn" @click="copyConfig">{{ configCopied ? 'Copied!' : 'Copy' }}</button>
                <pre class="json-sample"><code>{{ CONFIG_SNIPPET }}</code></pre>
              </div>
              <p class="config-note">Claude Code uses a one-line terminal command instead of a config file. See the full setup documentation above for exact steps per client.</p>
            </div>
          </details>
        </section>
      </div>

      <!-- 5. FAQ (white) -->
      <section class="mcp-stripe-inner faq-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading" class="section-title">Frequently Asked Questions</h2>
        <dl class="faq-list">
          <div v-for="(faq, i) in faqs" :key="i" class="faq-item" :class="{ open: openFaq === i }">
            <dt>
              <button
                class="faq-question"
                :aria-expanded="openFaq === i"
                :aria-controls="`mcp-faq-answer-${i}`"
                @click="toggleFaq(i)"
              >
                <span>{{ faq.q }}</span>
                <svg class="faq-chevron" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path :d="mdiChevronDown" fill="currentColor"/>
                </svg>
              </button>
            </dt>
            <dd :id="`mcp-faq-answer-${i}`" class="faq-answer" v-show="openFaq === i">
              <p>{{ faq.a }}</p>
            </dd>
          </div>
        </dl>
      </section>
    </template>
  </PersonaLanding>
</template>

<style scoped>
/* Hero mock conversation panel */
.chat-mock {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  box-shadow: 0 6px 20px rgba(15, 23, 42, 0.07);
  overflow: hidden;
}

html.dark .chat-mock {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
}

/* A real chat header - avatar, name, connection status - rather than a
   fake macOS window frame, which no MCP client (Claude Desktop, Cursor,
   the terminal) actually looks like. */
.chat-mock-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 18px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.chat-avatar {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #13B0EE;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-mock-heading {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.chat-mock-title {
  font-size: 13.5px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  line-height: 1.2;
}

.chat-mock-status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 11.5px;
  color: var(--vp-c-text-2);
  line-height: 1.2;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #34d399;
  flex-shrink: 0;
}

.chat-mock-body {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 22px 20px;
}

.chat-bubble {
  padding: 12px 16px;
  border-radius: 14px;
  font-size: 14px;
  line-height: 1.55;
  max-width: 88%;
}

.chat-bubble--user {
  align-self: flex-end;
  background: #392C91;
  color: #ffffff;
  border-bottom-right-radius: 4px;
}

.chat-bubble--agent {
  align-self: flex-start;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-bottom-left-radius: 4px;
}

.chat-tool-call {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(19, 176, 238, 0.1);
  color: #0e7490;
  font-size: 12px;
  font-weight: 600;
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
}

html.dark .chat-tool-call {
  background: rgba(19, 176, 238, 0.18);
  color: #67e8f9;
}

/* Bookends the header: a static message composer, since the single
   strongest "this is a chat app" signal is the box you'd type into. */
.chat-mock-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px 12px 18px;
  border-top: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.chat-mock-input-placeholder {
  flex: 1;
  font-size: 13px;
  color: var(--vp-c-text-2);
}

.chat-mock-send {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #13B0EE;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 480px) {
  .chat-mock { max-width: 100%; }
}

.mcp-stripe {
  position: relative;
  left: calc(-50vw + 50%);
  width: 100vw;
  box-sizing: border-box;
}

.mcp-stripe--blue { background: #eef8fd; }
html.dark .mcp-stripe--blue { background: #0c1e2d; }

.mcp-stripe-inner {
  max-width: 1200px;
  margin: 0 auto;
}

.section-block {
  padding: 56px 24px 56px;
}

.section-title {
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.2;
  margin-top: 0;
  margin-bottom: 12px;
  border-top: 0 !important;
  padding-top: 0 !important;
  text-align: left;
}

.section-subtitle {
  font-size: 17px;
  line-height: 1.65;
  color: #4b5563;
  text-align: left;
}

html.dark .section-subtitle { color: #9ca3af; }

.constrained { max-width: 760px; }

/* Prompt examples */
.prompt-grid {
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

/* Borderless surfaces throughout: the only high-contrast object on the page is
   the dark config block, so the lighter cards separate by fill alone. */
.prompt-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 20px 22px;
  background: #f4f7fa;
  border-radius: 4px;
}

html.dark .prompt-card { background: #16222f; }

.prompt-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: #13B0EE;
}

.prompt-card p {
  margin: 0;
  font-size: 15.5px;
  line-height: 1.6;
  font-style: italic;
  color: var(--vp-c-text-1);
}

/* Capabilities - a composed grid rather than a uniform tile wall. Two cards
   span two columns (see `wide` in the script block), which breaks the rhythm
   on purpose and gives the two largest groups the room their copy needs. The
   tool count is the card's visual anchor, so no decorative icons are needed. */
.tool-grid {
  margin-top: 36px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
}

.tool-card {
  position: relative;
  overflow: hidden;
  padding: 26px 24px 24px;
  background: #ffffff;
  border-radius: 4px;
}

html.dark .tool-card { background: #16222f; }

.tool-card--wide { grid-column: span 2; }

/* The count sits behind the copy as a watermark, big enough to give each card
   its own weight (11 reads heavier than 4) without competing for attention. */
.tool-card-count {
  position: absolute;
  top: 6px;
  right: 14px;
  font-size: 62px;
  font-weight: 800;
  line-height: 1;
  color: rgba(19, 176, 238, 0.12);
  pointer-events: none;
  user-select: none;
}

html.dark .tool-card-count { color: rgba(103, 232, 249, 0.14); }

.tool-card-name {
  position: relative;
  margin: 0 0 8px;
  padding: 0;
  border: none !important;
  padding-right: 52px;
  font-size: 16.5px;
  font-weight: 700;
  line-height: 1.3;
  color: var(--vp-c-text-1);
}

.tool-card-desc {
  position: relative;
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  max-width: 52ch;
}

/* On single-column cards the copy is wide enough to reach the watermark, so
   keep it clear of the number. Wide cards are held back by max-width already. */
.tool-card:not(.tool-card--wide) .tool-card-desc { padding-right: 44px; }

/* PersonaLanding's copy of this rule can't reach slotted content, which keeps
   its own scope id, so the section defines its own. */
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.capability-link-row {
  margin: 28px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 28px;
}

.capability-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  font-weight: 600;
  color: #13B0EE;
  text-decoration: none;
}

.capability-link:hover { text-decoration: underline; }

.capability-link--muted { color: var(--vp-c-text-2); }

/* How it works */
.flow-diagram {
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

.flow-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 18px 22px;
  background: #ffffff;
  border-radius: 4px;
  min-width: 160px;
  text-align: center;
}

html.dark .flow-node { background: #16222f; }

.flow-node-title {
  font-size: 14.5px;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.flow-node-sub {
  font-size: 12px;
  color: var(--vp-c-text-2);
}

.flow-arrow {
  color: #13B0EE;
  flex-shrink: 0;
}

.steps-row {
  margin-top: 48px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  padding: 20px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #13b0ee;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.step-title {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 4px;
}

.step-detail {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

/* Setup docs link (kept visible outside the config disclosure) */
.setup-doc-row {
  margin: 40px 0 0;
  text-align: center;
}

.setup-doc-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 14.5px;
  font-weight: 700;
  color: #13B0EE;
  text-decoration: none;
}

.setup-doc-link:hover { text-decoration: underline; }

/* Config example disclosure */
.config-disclosure {
  margin: 20px auto 0;
  max-width: 640px;
}

.config-summary {
  width: fit-content;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 4px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  list-style: none;
  text-align: center;
}

.config-summary::-webkit-details-marker { display: none; }

.config-summary:hover { color: #13B0EE; }

.config-card {
  margin: 20px auto 0;
}

.config-label {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.code-block {
  position: relative;
}

.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 12px;
  border-radius: 4px;
  border: 1px solid rgba(226, 232, 240, 0.25);
  background: rgba(255, 255, 255, 0.06);
  color: #e2e8f0;
  font-size: 12.5px;
  font-weight: 600;
  cursor: pointer;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.14);
}

.json-sample {
  margin: 0;
  padding: 18px 84px 18px 20px;
  max-width: 100%;
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 4px;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 13px;
  line-height: 1.55;
  overflow-x: auto;
}

.config-note {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

/* Compatible AI clients - compact, quick-scan section */
.compat-section {
  padding: 40px 24px;
}

.client-row {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.client-chip {
  padding: 8px 16px;
  border-radius: 4px;
  background: rgba(19, 176, 238, 0.12);
  color: #0e7490;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
}

.client-chip:hover {
  background: rgba(19, 176, 238, 0.2);
  text-decoration: none;
}

.client-chip:focus-visible {
  outline: 2px solid #13B0EE;
  outline-offset: 2px;
}

html.dark .client-chip {
  background: rgba(19, 176, 238, 0.2);
  color: #67e8f9;
}

html.dark .client-chip:hover {
  background: rgba(19, 176, 238, 0.3);
}

html.dark .client-chip:focus-visible {
  outline-color: #67e8f9;
}

.client-footnote {
  margin: 20px 0 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  max-width: 760px;
}

.client-footnote a {
  color: #13B0EE;
  font-weight: 700;
  text-decoration: none;
}

.client-footnote a:hover {
  text-decoration: underline;
}

/* FAQ (mirrors FeaturesGrid.vue's accordion pattern) */
.faq-section {
  padding: 56px 24px 56px;
}

.faq-section .section-title {
  margin-bottom: 32px;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  margin: 0;
  padding: 0;
}

.faq-item { border-bottom: 1px solid var(--vp-c-divider); }
.faq-item:first-child { border-top: 1px solid var(--vp-c-divider); }

.faq-question {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 0;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.4;
}

.faq-question:hover { color: #13B0EE; }

.faq-chevron {
  flex-shrink: 0;
  color: var(--vp-c-text-2);
  transition: transform 0.25s ease;
}

.faq-item.open .faq-chevron {
  transform: rotate(180deg);
  color: #13B0EE;
}

.faq-answer { margin: 0; padding-bottom: 18px; }

.faq-answer p {
  font-size: 14.5px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
  margin: 0;
}

@media (max-width: 900px) {
  /* Two columns, with the wide cards going full-width so the composed
     rhythm survives the reflow instead of collapsing into a plain stack. */
  .tool-grid { grid-template-columns: repeat(2, 1fr); }
  /* Seven cards over two columns leave the last one alone on its row. */
  .tool-grid > .tool-card:last-child { grid-column: span 2; }
  .steps-row { grid-template-columns: 1fr; gap: 20px; }
}

@media (max-width: 760px) {
  .section-block { padding: 40px 16px 40px; }
  .faq-section { padding: 40px 16px 40px; }
  .compat-section { padding: 32px 16px; }
  .prompt-grid { grid-template-columns: 1fr; }
  .tool-grid { grid-template-columns: 1fr; gap: 10px; margin-top: 28px; }
  /* Undo both span rules from the wider breakpoints. The last-child one
     matches here too, and a spanning card in a one-column grid forces an
     implicit second column that pushes the card off-screen. */
  .tool-card--wide,
  .tool-grid > .tool-card:last-child { grid-column: auto; }
  .tool-card { padding: 18px; }
  /* A big watermark crowds a phone-width card and runs under the copy, so it
     turns into a small solid count that lines up with the title instead. */
  .tool-card-count {
    top: 19px;
    right: 18px;
    font-size: 20px;
    color: rgba(19, 176, 238, 0.75);
  }
  html.dark .tool-card-count { color: rgba(103, 232, 249, 0.8); }
  .tool-card-name { padding-right: 36px; margin-bottom: 6px; font-size: 16px; }
  .tool-card-desc,
  .tool-card:not(.tool-card--wide) .tool-card-desc { font-size: 13.5px; max-width: none; padding-right: 0; }
  .flow-diagram { flex-direction: column; }
  .flow-arrow { transform: rotate(90deg); }
}

@media (max-width: 480px) {
  .section-block { padding: 32px 14px 32px; }
  .faq-section { padding: 32px 14px 32px; }
  .compat-section { padding: 28px 14px; }
}
</style>
