---
title: MCP Server | bluefox.email documentation
description: Connect an AI agent to your BlueFox Email project with the MCP server. Create campaigns, manage contacts and subscriber lists, and inspect your sending setup from Claude, Cursor, Windsurf, or Cline.
faqs:
  - question: "What is the BlueFox Email MCP server?"
    answer: "It is a local Model Context Protocol server that runs as a Node.js process on your own machine. It exposes 52 tools that let an AI agent manage one BlueFox Email project - emails, contacts, subscriber lists, signup forms, project settings, sending setup, and production access. The server is the only thing that talks to the BlueFox Email API; the agent never sees your API key."
  - question: "What do I need to configure before the MCP server will run?"
    answer: "Three environment variables: BLUEFOX_PROJECT_ID (Project Settings > Integrations), BLUEFOX_API_KEY (Project Settings > API Keys and Domain Whitelist), and BLUEFOX_BASE_URL (https://api.bluefox.email). The server exits with an error if any are missing, so it never runs in a partially authenticated state."
  - question: "Which AI clients can connect to the BlueFox Email MCP server?"
    answer: "Any MCP client that can launch a local stdio server: Claude Desktop, Claude Code, Cursor, Windsurf, and Cline are all supported. ChatGPT is not, because its connector model expects a server reachable at a URL rather than a local process - use the BlueFox Email REST API and its OpenAPI spec there instead."
  - question: "Can an AI agent send an email without me asking?"
    answer: "No. Creating a campaign or a transactional or triggered email produces a draft. Sending or scheduling is a separate, explicit tool call, and a campaign is only scheduled if you give an exact send time. Every tool call is visible to you with its arguments and its result."
  - question: "Can the MCP server design emails in the drag-and-drop editor?"
    answer: "No. Every email body created through the MCP server is a plain HTML or plain-text Handlebars string. The agent cannot author or edit visual editor content, and cannot create an email directly from a saved template. It can duplicate an existing template, and it can hand-write full HTML emails including inline CSS."
  - question: "Can the MCP server read my API key?"
    answer: "No tool exposes API keys - not even the project settings tool, which explicitly cannot read or change them. If a tool needs a key, such as the webhook secret key, you have to copy it from Project Settings yourself."
head:
  - - meta
    - name: description
      content: Connect an AI agent to your BlueFox Email project with the MCP server. Create campaigns, manage contacts and subscriber lists, and inspect your sending setup from Claude, Cursor, Windsurf, or Cline.
  - - meta
    - property: og:title
      content: MCP Server | bluefox.email documentation
  - - meta
    - property: og:description
      content: Connect an AI agent to your BlueFox Email project with the MCP server. Create campaigns, manage contacts and subscriber lists, and inspect your sending setup from Claude, Cursor, Windsurf, or Cline.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/integrations/mcp-server
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: MCP Server | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Connect an AI agent to your BlueFox Email project with the MCP server. Create campaigns, manage contacts and subscriber lists, and inspect your sending setup from Claude, Cursor, Windsurf, or Cline.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# MCP Server Integration with BlueFox Email

The **BlueFox Email MCP server** lets an AI agent work inside one of your projects: draft and schedule campaigns, manage contacts and subscriber lists, inspect your sending setup, and check deliverability, all through natural conversation in your AI client.

It is a [Model Context Protocol](https://modelcontextprotocol.io) server that runs locally as a small Node.js process on your own machine. It is not a hosted service. The server is the only thing that ever talks to the BlueFox Email API on your behalf, using the API key you give it. The agent itself only sees the results of the tool calls the server made.

:::info Quick Note
Every action an agent takes is a discrete tool call with visible arguments and a visible result, and the agent can only do what the tools below allow. There is no generic "call the API" escape hatch, and no hidden state.
:::

## Requirements

Three environment variables must be set before the server will start. All three come from you, never from the agent.

| Variable | What it is | Where to find it |
| --- | --- | --- |
| `BLUEFOX_PROJECT_ID` | The project this server operates on | Already filled in for you in **Project Settings > Integrations > MCP Server** |
| `BLUEFOX_API_KEY` | The credential the server authenticates with | **Project Settings > [API Keys & Domain Whitelist](/docs/projects/settings#api-keys-and-domain-whitelist)** |
| `BLUEFOX_BASE_URL` | The API endpoint | `https://api.bluefox.email` |

If any of them is missing, the server exits immediately with a clear error rather than connecting in a partially authenticated state.

You also need **Node.js 20 or newer**.

## Finding the setup in the app

The app generates both setup snippets for you, with your project ID already filled in, so you do not have to assemble them by hand.

1. Open your project and go to **Project Settings**.

2. Choose **Integrations** in the settings sub-menu.

   ![A screenshot of the project settings side menu with the integrations section highlighted.](./mcp-server-integrations-menu.webp)

3. Scroll to the **MCP Server** section, below **AI Agents**.

   ![A screenshot of the project settings integrations section MCP server setup.](./mcp-server-setup-section.webp)

4. Pick the tab for your client: **Claude Desktop / Cursor / Windsurf** for clients configured with a JSON file, or **Claude Code (CLI)** for the terminal command.

The tab gives you two copyable blocks, one for each of the next two sections: a one-time [install command](#installation), and a [connection snippet](#connecting-your-ai-client) for your client. Both already contain your project ID. Replace `YOUR_API_KEY` in the connection snippet with a real key from the **API Keys & Domain Whitelist** tab, creating one there first if the project has none.

:::info Quick Note
The **AI Agents** section directly above **MCP Server** is a different thing: it hands you a setup prompt that points an agent at the public API and its OpenAPI spec, with no local server involved. Use it for clients that cannot launch a local MCP server, such as ChatGPT.
:::

## Installation

Clone the server, install its dependencies, and link it so your MCP client can launch it by name:

```bash
git clone https://github.com/gyulanemeth/bluefox.email-mcp.git
cd bluefox.email-mcp
npm install
npm link
```

The app's **MCP Server** section gives you the same thing as a single copyable line. `npm link` puts a `bluefox.email-mcp` executable on your `PATH`, and that is the command every client configuration below refers to.

## Connecting your AI client

Register the server with your client and pass it the three environment variables. The snippets below are what the app's **Project Settings > Integrations > MCP Server** section generates, with the project ID and API key filled in. Restart or reload the client afterwards; the tools then appear in every new conversation, with nothing further to do per session.

### Claude Desktop

Open **Settings > Developer > Edit Config** and add the server to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "bluefox-email": {
      "command": "bluefox.email-mcp",
      "env": {
        "BLUEFOX_BASE_URL": "https://api.bluefox.email",
        "BLUEFOX_PROJECT_ID": "your-project-id",
        "BLUEFOX_API_KEY": "YOUR_API_KEY"
      }
    }
  }
}
```

Restart Claude Desktop.

### Claude Code

No config file to edit. Register the server from your terminal. The **Claude Code (CLI)** tab in the app shows this command with your project ID already in it:

```bash
claude mcp add bluefox-email \
  --env BLUEFOX_PROJECT_ID=your-project-id \
  --env BLUEFOX_API_KEY=your-api-key \
  --env BLUEFOX_BASE_URL=https://api.bluefox.email \
  -- bluefox.email-mcp
```

### Cursor

Add the same `mcpServers` block as Claude Desktop to `.cursor/mcp.json` for a single project, or `~/.cursor/mcp.json` to make it available everywhere.

### Windsurf

Add the same block to `~/.codeium/windsurf/mcp_config.json`.

### Cline

Add the server through Cline's **MCP Servers** panel in VS Code, using the same command and environment variables.

### ChatGPT

Not supported. ChatGPT's connector model expects a server reachable at a URL, and this is a local stdio process. Use the [BlueFox Email API](/docs/api/) directly instead: the live OpenAPI 3.0 spec lets an agent discover every endpoint and schema without this server. **Project Settings > Integrations > AI Agents** gives you a ready-made setup prompt for exactly this, with your project ID already in it.

## How the agent behaves

Some behaviour is built into the server itself, not left to the agent's discretion:

- **Names, not IDs.** Almost every tool accepts either an id (`subscriberListId`) or a human name (`subscriberListName`), and the server resolves the name for you. You can say "the newsletter list" instead of pasting an object id.
- **Drafts are the default.** `create_campaign` and `create_triggered_email` save a draft unless you give an explicit `scheduledFor`. Sending or scheduling is always a separate step.
- **Details get asked for, not invented.** Subject lines, [preview text](/docs/projects/campaigns), and sender identity affect deliverability and open rates, so the tools instruct the agent to ask rather than guess.
- **Absolute dates only.** "Tomorrow at 8am" is converted to an ISO 8601 datetime by the agent before the call. The tools do not parse natural language dates.
- **Bulk operations tolerate partial failure.** `import_contacts` and `bulk_update_contacts` process rows one at a time, so one bad row does not abort the batch. You get a report of what succeeded and what did not.
- **Bodies are HTML or text.** Every email body is a plain HTML or plain-text Handlebars template string, written by the agent. See [Email Personalization](/docs/email-personalization) for the available merge tags: `&#123;&#123;contact.name&#125;&#125;`, `&#123;&#123;contact.<customField>&#125;&#125;`, `&#123;&#123;unsubscribeLink&#125;&#125;` and `&#123;&#123;pauseSubscriptionLink&#125;&#125;` (campaigns and triggered emails only), and `&#123;&#123;verifyLink&#125;&#125;` (required in any transactional email used for double opt-in confirmation). Values passed as `data` at send time render at the top level, so `data: { orderId: 123 }` is `&#123;&#123;orderId&#125;&#125;`, not `&#123;&#123;data.orderId&#125;&#125;`.

## Tool reference

52 tools, grouped by area. Where a tool takes both an id and a name parameter, only one of the pair is required.

### Emails

Covers [campaigns](/docs/projects/campaigns), [transactional emails](/docs/projects/transactional-emails), and [triggered emails](/docs/projects/triggered-emails).

| Tool | What it does |
| --- | --- |
| `create_campaign` | Creates a campaign for a subscriber list, optionally narrowed by a [segment](/docs/projects/segments). Takes `name`, `subject`, `body`, `bodyType`, `previewText`, sender identity, `replyTo`, `excludeUnengaged`, and [`feeds`](/docs/projects/data-feeds). Saves as a draft unless `scheduledFor` (with an optional IANA `timeZone`) is given. |
| `create_transactional_email` | Creates a reusable single-recipient template, sent later. No unsubscribe or pause merge tags, as it is not tied to a list. |
| `send_transactional_email` | Sends one transactional email now to one address, with `data` for template variables and optional base64 `attachments`. |
| `create_triggered_email` | Creates an email tied to a subscriber list, such as a welcome email. Same shape as a campaign, without scheduling. |
| `send_triggered_email` | Sends an existing triggered email now, to specific `recipients` or to every active subscriber on its list. |
| `update_email` | Updates a campaign, transactional, or triggered email. Also the only way to cancel or reschedule a scheduled campaign, via `status` and `scheduledFor`. A campaign cannot be updated within 6 minutes of its send time. |
| `get_email` | Looks up one email by name with its stats, or lists every email of a type. |
| `get_email_recipients` | Per-recipient results for one send: received, opened, clicked, bounced, complained, unsubscribed, paused, subscribed, resubscribed. Filterable and paginated. |
| `delete_email` | Deletes a campaign, transactional, or triggered email. |
| `list_email_error_log` | Send and delivery errors for one email over the last 30 days, newest first. |
| `send_test_email` | A [test send](/docs/projects/send-test-email) that does not affect real stats. Goes to one address or to a private subscriber list, not both. |

### Contacts

See [Contacts](/docs/projects/contacts) for the same operations in the app.

| Tool | What it does |
| --- | --- |
| `create_contact` | Creates a contact from `email`, plus optional `name`, `tags`, and `customFields`. New tags are created automatically. |
| `get_contact` | Reads one contact by email, with its list memberships and custom field values. |
| `update_contact` | Updates a contact, including changing its address via `newEmail`. Supplying `tags` replaces the whole set. |
| `delete_contact` | Deletes a contact and removes it from every list. |
| `import_contacts` | Bulk creates contacts, optionally subscribing them to a list as `active` or `unverified`. Rows are processed individually. |
| `bulk_update_contacts` | Applies one action to many contacts: delete, add or remove tags, add to the suppression list, or subscribe to or unsubscribe from a list. |
| `clean_contacts` | Finds contacts already suppressed for a bounce or a complaint. Reports only, unless told to delete them. |
| `export_contacts` | Exports every contact to a local CSV and reports the file path. |
| `resend_verification_email` | Resends the double opt-in confirmation to a contact still unverified on a list. |
| `manage_contact_fields_and_tags` | Manages the project's custom field and tag *definitions*. Fields can only be added or removed, never renamed, and removing one loses existing values. Removing a tag untags every contact that had it. |

### Subscriber lists

| Tool | What it does |
| --- | --- |
| `create_subscriber_list` | Creates a list, with optional `private` flag, double opt-in settings, confirmation copy, and embedded signup form styling. A double opt-in email's body must contain `&#123;&#123;verifyLink&#125;&#125;` or the API rejects it. |
| `update_subscriber_list` | Updates a list. An empty string clears the redirect link, confirmation title, or confirmation message. |
| `get_subscriber_list` | Reads one list, or lists all of them with stats. |
| `delete_subscriber_list` | Deletes a list. Fails if a triggered email, campaign, or automation still depends on it. |
| `list_list_subscribers` | Lists contacts on one list with their per-list status: active, unsubscribed, paused, or unverified. |
| `get_list_subscriber` | Reads one contact's status on one list. |
| `add_list_subscriber` | Subscribes a contact to a list, creating the contact if needed. Stays unverified on double opt-in lists unless `status: "active"` is passed. |
| `update_list_subscriber` | Changes a contact's status on one list only. Pausing requires a future `pausedUntil` date. |

### Signup forms

See [Forms & Pages](/docs/projects/forms-and-pages).

| Tool | What it does |
| --- | --- |
| `create_signup_form` | Creates a form for one or more lists, with per-field visibility, required flags and ordering, styling, double opt-in settings, and an optional built-in or Cloudflare Turnstile captcha. |
| `update_signup_form` | Updates an existing form, including renaming it. |
| `get_signup_form` | Reads one form, or lists all of them. |
| `delete_signup_form` | Deletes a form. Subscriptions already collected through it are kept. |
| `get_signup_form_embed_html` | Generates the self-contained embeddable HTML, saves it to a local file, and reports the path. |

### Project settings and infrastructure

| Tool | What it does |
| --- | --- |
| `manage_segment` | Lists, reads, creates, updates, or deletes [segments](/docs/projects/segments). A segment still used by a campaign or automation cannot be deleted. |
| `manage_project_settings` | Reads or updates the project name, logo, unengaged contact segment, auto-remove-on-bounce and on-complaint behaviour, and the domain whitelist. **Cannot read or change API keys.** |
| `manage_design_system` | Reads or overrides parts of the project's [Email Theme](/docs/projects/email-theme-settings): colours, fonts, images, links, text, button, and divider styles. Override only; it cannot switch or create a theme. |
| `manage_sending_setup` | Manages domains, sender identities, and available AWS regions. A sender identity's domain must already be added and DKIM verified. There is no separate default flag: the first identity is the default, and `set_default` reorders. Domain create, DNS check, and delete are unavailable on BYO AWS projects. |
| `manage_webhook` | Reads, sets, or deletes the project's single [webhook](/docs/integrations/webhooks). Setting it replaces the whole config, so every wanted event flag must be included each time. The `secretKey` must match one of your existing API keys, which you supply yourself. |
| `test_webhook` | Fires a synthetic event at the configured webhook URL to confirm reachability and signing. |
| `manage_suppression_list` | Lists, adds to, or removes from this project's manual [suppression list](/docs/projects/suppression-list). Separate from the platform-wide automatic bounce and complaint suppression list. |
| `manage_templates` | Lists, inspects, duplicates, renames, or deletes visual editor [templates](/docs/projects/predesigned-templates). Creating means duplicating an existing template under new metadata. |

### Production access and sending limits

See [Delivery Modes](/docs/projects/delivery-modes).

| Tool | What it does |
| --- | --- |
| `apply_for_production_access` | Applies to leave sandbox limits while staying on BlueFox Email's shared infrastructure. Requires at least one domain with SPF, MX, and DKIM verified. |
| `get_production_access_status` | Reports request status, domain verification, current limits and rates per region, and limit increase history. |
| `request_limit_increase` | Requests a higher monthly limit. Production access projects only. |
| `get_sandbox_deliverability` | Today's sandbox send count, plus bounce and complaint rates against the platform maximum. |
| `get_production_deliverability` | Worst bounce and complaint rates over 7, 30, and 90 days, per-domain breakdown, and this month's sends against your limit. |
| `export_domain_dns` | Writes a domain's DKIM, SPF, DMARC, and MX records to a local CSV for whoever manages your DNS. |

### Bring your own AWS SES

For projects sending through their own AWS account rather than BlueFox Email's shared infrastructure.

| Tool | What it does |
| --- | --- |
| `set_byo_aws_config` | Sets the STS `roleArn` **or** an access key pair, never both, along with region, send rate limit, and sender identities. Also activates the BYO AWS send path. |
| `get_aws_config` | Reads back region, limit, sender identities, and credential hints. Real secrets are never returned. |
| `check_aws_credentials` | Validates directly against SES: credentials work, sender identities are verified, and the requested limit is within your account maximum. |
| `get_cloudformation_link` | Returns the CloudFormation quick-create link for the STS role BlueFox Email needs. |

## Limitations

- **No visual editor content.** Emails are created as plain HTML or plain text only. The agent cannot author, read, or edit drag-and-drop editor documents, and cannot create a campaign or transactional or triggered email directly from a saved template.
- **No access to API keys.** No tool can read, create, or rotate them. Anything that needs a key, such as a webhook secret, has to be pasted in by you.
- **No date range filters.** List endpoints support exact-match filters only, so "campaigns from this month" means fetching all of them and filtering afterwards.
- **One project per server.** `BLUEFOX_PROJECT_ID` is fixed at launch. Connecting to a second project means registering a second server.
- **No ChatGPT support.** Use the [API](/docs/api/) and its OpenAPI spec instead.

## Example workflow

A typical first campaign, entirely through the agent:

1. `manage_sending_setup` lists sender identities to find a verified sender.
2. `get_subscriber_list`, with no name given, lists every list so the audience can be picked.
3. You agree on a subject line and preview text with the agent, and `create_campaign` saves the campaign **as a draft**, with no `scheduledFor`.
4. The agent hand-writes the HTML body, and `update_email` replaces the draft's body with it.
5. `send_test_email` sends a test that does not affect stats.
6. Only when you explicitly ask does `update_email` set `scheduledFor` and move the campaign to `scheduled`.

Nothing reaches a real recipient until that last step.

## Additional Resources

- [BlueFox Email API Documentation](/docs/api/)
- [Email Personalization (Merge Tags)](/docs/email-personalization)
- [Model Context Protocol documentation](https://modelcontextprotocol.io)
