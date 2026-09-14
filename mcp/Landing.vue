<script setup>
import { ref } from 'vue'
import PersonaLanding from '../for/components/PersonaLanding.vue'

const REPO_URL = 'https://github.com/bluefox-email/bluefox.email-mcp'
const TOOLS_URL = `${REPO_URL}#tools`
const SETUP_URL = `${REPO_URL}#setup`
const GET_STARTED_URL = 'https://app.bluefox.email/accounts/create-account'

const prompts = [
  {
    text: 'Create a subscriber list called Product Updates.',
    iconPaths: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'
  },
  {
    text: 'Set up a welcome email for new subscribers on that list.',
    iconPaths: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
  },
  {
    text: 'Create a campaign announcing our new feature.',
    iconPaths: '<polygon points="22 2 15 22 11 13 2 9 22 2"/>'
  },
  {
    text: 'Schedule the campaign for tomorrow morning.',
    iconPaths: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>'
  },
  {
    text: 'How did our latest campaigns perform?',
    iconPaths: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><polyline points="2 20 22 20"/>'
  },
  {
    text: 'Add example.com as a sending domain and tell me what DNS records I need.',
    iconPaths: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'
  }
]

const capabilities = [
  {
    name: 'Campaigns & scheduling',
    desc: 'Create a campaign, schedule it, reschedule or cancel it, and check delivery stats and error logs once it sends.',
    iconPaths: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'
  },
  {
    name: 'Transactional & triggered emails',
    desc: 'Set up reusable transactional emails and list-triggered emails, send them, or fire a one-off test without touching real stats.',
    iconPaths: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>'
  },
  {
    name: 'Contacts & subscriber lists',
    desc: 'Add, import, or bulk-update contacts, manage subscriber lists, and clean up bounced or complained addresses.',
    iconPaths: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>'
  },
  {
    name: 'Segments & signup forms',
    desc: 'Build segments from contact properties or engagement, and create embeddable signup forms with double opt-in.',
    iconPaths: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'
  },
  {
    name: 'Sending domains & deliverability',
    desc: 'Add a sending domain and get the DNS records you need, check sandbox or production deliverability, and request production access or higher limits.',
    iconPaths: '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>'
  },
  {
    name: 'Project settings',
    desc: 'Manage webhooks, design system overrides, custom contact fields and tags, your suppression list, and BYO AWS SES credentials.',
    iconPaths: '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>'
  }
]

const steps = [
  {
    number: '1',
    title: 'Connect your AI client',
    detail: "Add the BlueFox MCP server to Claude Desktop, Claude Code, Cursor, or another MCP-compatible client, using your project's ID and API key."
  },
  {
    number: '2',
    title: 'Your agent sees what BlueFox can do',
    detail: "The MCP server exposes BlueFox's capabilities as tools your agent can call, so it looks up things like your real subscriber lists instead of guessing."
  },
  {
    number: '3',
    title: 'Actions go through the BlueFox API',
    detail: 'When you ask it to create a campaign or add a contact, the server calls the same BlueFox Email API your account already uses, from your own computer.'
  }
]

const clients = ['Claude Desktop', 'Claude Code', 'Cursor', 'Windsurf', 'Cline']

const faqs = [
  { q: 'What is MCP?', a: 'Model Context Protocol (MCP) is an open standard for connecting AI assistants to external tools and data. An MCP server describes a set of actions an AI agent can call directly, so instead of you copying data back and forth, the agent can look things up and make changes on your behalf, with your permission.' },
  { q: 'What can I do with the BlueFox MCP server?', a: 'You can create and schedule campaigns, set up transactional and triggered emails, manage contacts and subscriber lists, build segments and signup forms, check analytics and deliverability, and manage sending domains and project settings, all by describing what you want in plain language. See the full list of tools in the GitHub README.' },
  { q: 'Which AI tools does it work with?', a: "Any MCP-compatible client. The README documents setup for Claude Desktop, Claude Code, Cursor, Windsurf, and Cline. ChatGPT's current MCP support expects a hosted server URL rather than a local command, so it can't connect to this server directly; use the BlueFox Email API for ChatGPT-based integrations instead." },
  { q: 'Is the BlueFox MCP server open source?', a: 'Yes. The full source is public on GitHub, so you can read exactly what it does, run it yourself, or open a pull request.' },
  { q: 'Does the MCP server run locally?', a: "Yes. It runs as a local process on your own computer, launched by your AI client, and talks to the BlueFox Email API directly using your own API key. BlueFox doesn't host it for you, and it isn't published to npm; you install it by cloning the repository." },
  { q: 'Is my BlueFox API key safe?', a: "Your API key is stored in your AI client's local MCP configuration and sent straight from your computer to the BlueFox Email API, the same path it would take if you called the API yourself. It doesn't pass through any BlueFox-hosted server in between. Treat your MCP config file like any other file holding a credential." },
  { q: 'Do I need a BlueFox Email account?', a: "Yes. You'll need a BlueFox Email account with at least one project, plus that project's Project ID and API key, both available under Project Settings." },
  { q: 'Do I need to be a developer to use it?', a: "Setting it up involves some technical steps: cloning a repository, running a couple of terminal commands, and pasting a short config snippet into your AI client. Once that's done, using it is conversational. No code or API knowledge required." },
  { q: 'Does using MCP cost extra?', a: "No. The MCP server itself is free and open source. It carries out actions through your existing BlueFox Email account, so normal BlueFox Email sending costs apply, exactly as if you'd used the dashboard or API directly." },
  { q: 'Why use MCP instead of the BlueFox API directly?', a: "The API is what you'd build a software integration on. MCP is for when you want an AI agent itself to understand BlueFox's capabilities and carry out tasks conversationally, without you writing integration code or looking up endpoint documentation." }
]
const openFaq = ref(null)
const toggleFaq = (i) => { openFaq.value = openFaq.value === i ? null : i }
</script>

<template>
  <PersonaLanding
    hero-badge="Open source · MCP"
    hero-title="Run BlueFox Email from your AI agent."
    hero-description="The BlueFox MCP server lets Claude, Cursor, and other MCP-compatible AI clients create campaigns, manage contacts and lists, check analytics, and more, just by asking in plain language."
    :hero-highlights="['Open source', 'Runs on your computer', 'No extra cost']"
    :hero-feature-items="[]"
    hero-primary-cta-text="Get started"
    :hero-primary-cta-href="GET_STARTED_URL"
    hero-secondary-cta-text="View on GitHub"
    :hero-secondary-cta-href="REPO_URL"
    cta-text="Get started"
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
    final-description="Open source, runs on your computer, and works with the MCP client you already use."
    final-primary-cta-text="Get started"
    :final-primary-cta-href="GET_STARTED_URL"
    final-secondary-cta-text="View on GitHub"
    :final-secondary-cta-href="REPO_URL"
  >
    <template #heroVisual>
      <div class="chat-mock" role="img" aria-label="Example conversation: a user asks their AI agent to create and schedule a campaign, and the agent confirms it using the BlueFox MCP server">
        <div class="chat-mock-header">
          <span class="chat-dot chat-dot--red" aria-hidden="true"></span>
          <span class="chat-dot chat-dot--yellow" aria-hidden="true"></span>
          <span class="chat-dot chat-dot--green" aria-hidden="true"></span>
          <span class="chat-mock-title">AI Agent</span>
        </div>
        <div class="chat-mock-body">
          <div class="chat-bubble chat-bubble--user">
            Create a campaign announcing our new AI feature and schedule it for tomorrow at 9am.
          </div>
          <div class="chat-tool-call">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
            </svg>
            <span>create_campaign</span>
          </div>
          <div class="chat-bubble chat-bubble--agent">
            Done. "New AI Feature Announcement" is scheduled for tomorrow at 9:00 AM to your Newsletter list.
          </div>
        </div>
      </div>
    </template>

    <template #afterPain>
      <!-- 1. Prompt examples (white) -->
      <section class="mcp-stripe-inner section-block" aria-labelledby="prompts-title">
        <h2 id="prompts-title" class="section-title">Just tell it what you need</h2>
        <p class="section-subtitle constrained">No API docs, no copy-pasting requests. Describe the outcome, and your agent handles the rest.</p>
        <div class="prompt-grid" role="list" aria-label="Example prompts">
          <div v-for="(prompt, i) in prompts" :key="i" class="prompt-card" role="listitem">
            <svg class="prompt-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="prompt.iconPaths" />
            <p>"{{ prompt.text }}"</p>
          </div>
        </div>
      </section>

      <!-- 2. Capabilities (blue) -->
      <div class="mcp-stripe mcp-stripe--blue">
        <section class="mcp-stripe-inner section-block" aria-labelledby="capabilities-title">
          <h2 id="capabilities-title" class="section-title">What your agent can do</h2>
          <p class="section-subtitle constrained">The BlueFox MCP server exposes dozens of tools covering every part of your account.</p>
          <div class="capability-grid">
            <div v-for="cap in capabilities" :key="cap.name" class="capability-card">
              <div class="capability-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" v-html="cap.iconPaths" />
              </div>
              <h3 class="capability-name">{{ cap.name }}</h3>
              <p class="capability-desc">{{ cap.desc }}</p>
            </div>
          </div>
          <p class="capability-link-row">
            <a :href="TOOLS_URL" target="_blank" rel="noopener noreferrer" class="capability-link">
              See the full list of tools on GitHub
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </p>
        </section>
      </div>

      <!-- 3. How it works (white) -->
      <section class="mcp-stripe-inner section-block" aria-labelledby="how-it-works-title">
        <h2 id="how-it-works-title" class="section-title">Three moving parts</h2>
        <p class="section-subtitle constrained">Keep the mental model simple: your agent talks to a small local server, which talks to BlueFox on your behalf.</p>

        <div class="flow-diagram" role="img" aria-label="AI Agent connects to the BlueFox MCP Server, which connects to the BlueFox Email API">
          <div class="flow-node">
            <span class="flow-node-title">AI Agent</span>
            <span class="flow-node-sub">Claude, Cursor, etc.</span>
          </div>
          <svg class="flow-arrow" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          <div class="flow-node">
            <span class="flow-node-title">BlueFox MCP Server</span>
            <span class="flow-node-sub">Runs on your computer</span>
          </div>
          <svg class="flow-arrow" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
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

        <div class="config-card">
          <p class="config-label">What you add to your AI client's config (Claude Desktop, Cursor, Windsurf, Cline):</p>
          <pre class="json-sample"><code>{
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
}</code></pre>
          <p class="config-note">
            Claude Code uses a one-line terminal command instead of a config file.
            <a :href="SETUP_URL" target="_blank" rel="noopener noreferrer">Full setup steps for every client are on GitHub</a>.
          </p>
        </div>
      </section>

      <!-- 4. Works with your AI tools (blue) -->
      <div class="mcp-stripe mcp-stripe--blue">
        <section class="mcp-stripe-inner section-block" aria-labelledby="clients-title">
          <h2 id="clients-title" class="section-title">Works with the AI tools you already use</h2>
          <p class="section-subtitle constrained">Any MCP-compatible client can connect. Setup is documented on GitHub for:</p>
          <div class="client-row" role="list" aria-label="Compatible AI clients">
            <span v-for="client in clients" :key="client" class="client-chip" role="listitem">{{ client }}</span>
          </div>
          <p class="client-footnote">ChatGPT's current MCP support expects a hosted server URL rather than a local command, so it can't connect directly. Use the <a href="/docs/api/">BlueFox Email API</a> for ChatGPT-based integrations instead.</p>
        </section>
      </div>

      <!-- 5. Open source (white) -->
      <section class="mcp-stripe-inner section-block" aria-labelledby="opensource-title">
        <div class="opensource-card">
          <svg class="opensource-icon" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          <div class="opensource-body">
            <h2 id="opensource-title" class="opensource-title">Open source, by design</h2>
            <p>The BlueFox MCP server's full source is public on GitHub. Inspect exactly what it does before connecting it to your account, run it yourself, or open a pull request to extend it.</p>
          </div>
          <a :href="REPO_URL" target="_blank" rel="noopener noreferrer" class="opensource-btn">
            View source on GitHub
          </a>
        </div>
      </section>

      <!-- 6. FAQ (white) -->
      <section class="mcp-stripe-inner faq-section" aria-labelledby="faq-heading">
        <h2 id="faq-heading" class="faq-heading">Frequently Asked Questions</h2>
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
                <svg class="faq-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9"/>
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
  max-width: 440px;
  margin: 0 auto;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  box-shadow: 0 12px 40px rgba(15, 23, 42, 0.12);
  overflow: hidden;
}

html.dark .chat-mock {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
}

.chat-mock-header {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}

.chat-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

.chat-dot--red { background: #f87171; }
.chat-dot--yellow { background: #fbbf24; }
.chat-dot--green { background: #34d399; }

.chat-mock-title {
  margin-left: 8px;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vp-c-text-2);
}

.chat-mock-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
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
  background: linear-gradient(135deg, #13B0EE 0%, #392C91 100%);
  color: #ffffff;
  border-bottom-right-radius: 4px;
}

.chat-bubble--agent {
  align-self: flex-start;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
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
  padding: 64px 24px 96px;
}

.section-title {
  font-size: clamp(28px, 4vw, 42px);
  line-height: 1.2;
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

.prompt-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 20px 22px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
}

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

/* Capabilities */
.capability-grid {
  margin-top: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.capability-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
}

.capability-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(19, 176, 238, 0.12), rgba(57, 44, 145, 0.1));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #13B0EE;
  flex-shrink: 0;
}

.capability-name {
  font-size: 15px;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 0;
  padding: 0;
  border: none !important;
  line-height: 1.3;
}

.capability-desc {
  font-size: 13.5px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.capability-link-row {
  margin: 28px 0 0;
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
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 14px;
  min-width: 160px;
  text-align: center;
}

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

/* Config snippet */
.config-card {
  margin: 48px auto 0;
  max-width: 640px;
}

.config-label {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.json-sample {
  margin: 0;
  padding: 18px 20px;
  background: #0f172a;
  color: #e2e8f0;
  border-radius: 10px;
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

.config-note a {
  color: #13B0EE;
  font-weight: 600;
}

/* Works with your AI tools */
.client-row {
  margin-top: 28px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.client-chip {
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(19, 176, 238, 0.12);
  color: #0e7490;
  font-size: 14px;
  font-weight: 700;
}

html.dark .client-chip {
  background: rgba(19, 176, 238, 0.2);
  color: #67e8f9;
}

.client-footnote {
  margin: 20px 0 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  max-width: 760px;
}

/* Open source */
.opensource-card {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
  padding: 32px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
}

.opensource-icon {
  color: var(--vp-c-text-1);
  flex-shrink: 0;
}

.opensource-body {
  flex: 1;
  min-width: 240px;
}

.opensource-title {
  font-size: clamp(20px, 3vw, 26px);
  margin: 0 0 8px;
  padding: 0;
  border: none !important;
}

.opensource-body p {
  margin: 0;
  font-size: 15px;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

.opensource-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 48px;
  padding: 0 24px;
  border-radius: 10px;
  background: #13B0EE;
  color: #ffffff;
  font-weight: 700;
  font-size: 14.5px;
  text-decoration: none;
  white-space: nowrap;
}

.opensource-btn:hover { background: #0f8ec0; color: #ffffff; }

/* FAQ (mirrors FeaturesGrid.vue's accordion pattern) */
.faq-section {
  padding: 64px 24px 96px;
}

.faq-heading {
  font-size: clamp(22px, 3vw, 30px);
  font-weight: 800;
  margin: 0 0 32px;
  padding: 0;
  border: none !important;
  background: linear-gradient(120deg, #392C91 30%, #13B0EE 70%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
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
  .capability-grid { grid-template-columns: repeat(2, 1fr); }
  .steps-row { grid-template-columns: 1fr; gap: 20px; }
}

@media (max-width: 760px) {
  .section-block { padding: 48px 16px 72px; }
  .faq-section { padding: 48px 16px 72px; }
  .prompt-grid { grid-template-columns: 1fr; }
  .capability-grid { grid-template-columns: 1fr; }
  .flow-diagram { flex-direction: column; }
  .flow-arrow { transform: rotate(90deg); }
  .opensource-card { flex-direction: column; align-items: flex-start; }
  .opensource-btn { width: 100%; }
}

@media (max-width: 480px) {
  .section-block { padding: 36px 14px 56px; }
  .faq-section { padding: 36px 14px 56px; }
}
</style>
