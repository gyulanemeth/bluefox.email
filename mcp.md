---
layout: home

title: MCP Server for AI Agents
description: Connect Claude, Cursor, and other MCP-compatible AI agents to BlueFox Email. Manage campaigns, contacts, and more through the open-source BlueFox MCP server.

faqs:
  - question: "What is MCP?"
    answer: "Model Context Protocol (MCP) is an open standard for connecting AI assistants to external tools and data. An MCP server describes a set of actions an AI agent can call directly, so instead of you copying data back and forth, the agent can look things up and make changes on your behalf, with your permission."
  - question: "What can I do with the BlueFox MCP server?"
    answer: "You can create and schedule campaigns, set up transactional and triggered emails, manage contacts and subscriber lists, build segments and signup forms, check analytics and deliverability, and manage sending domains and project settings, all by describing what you want in plain language. See the full list of tools in the GitHub README."
  - question: "Which AI tools does it work with?"
    answer: "Any MCP-compatible client. The README documents setup for Claude Desktop, Claude Code, Cursor, Windsurf, and Cline. ChatGPT's current MCP support expects a hosted server URL rather than a local command, so it can't connect to this server directly; use the BlueFox Email API for ChatGPT-based integrations instead."
  - question: "Is the BlueFox MCP server open source?"
    answer: "Yes. The full source is public on GitHub, so you can read exactly what it does, run it yourself, or open a pull request."
  - question: "Does the MCP server run locally?"
    answer: "Yes. It runs as a local process on your own computer, launched by your AI client, and talks to the BlueFox Email API directly using your own API key. BlueFox doesn't host it for you, and it isn't published to npm; you install it by cloning the repository."
  - question: "Is my BlueFox API key safe?"
    answer: "Your API key is stored in your AI client's local MCP configuration and sent straight from your computer to the BlueFox Email API, the same path it would take if you called the API yourself. It doesn't pass through any BlueFox-hosted server in between. Treat your MCP config file like any other file holding a credential."
  - question: "Do I need a BlueFox Email account?"
    answer: "Yes. You'll need a BlueFox Email account with at least one project, plus that project's Project ID and API key, both available under Project Settings."
  - question: "Do I need to be a developer to use it?"
    answer: "Setting it up involves some technical steps: cloning a repository, running a couple of terminal commands, and pasting a short config snippet into your AI client. Once that's done, using it is conversational. No code or API knowledge required."
  - question: "Does using MCP cost extra?"
    answer: "No. The MCP server itself is free and open source. It carries out actions through your existing BlueFox Email account, so normal BlueFox Email sending costs apply, exactly as if you'd used the dashboard or API directly."
  - question: "Why use MCP instead of the BlueFox API directly?"
    answer: "The API is what you'd build a software integration on. MCP is for when you want an AI agent itself to understand BlueFox's capabilities and carry out tasks conversationally, without you writing integration code or looking up endpoint documentation."
---

<script setup>
import Landing from './mcp/Landing.vue'
</script>

<Landing />
