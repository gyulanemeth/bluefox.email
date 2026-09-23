---
title: How to Set Up Email for a New SaaS Product with an AI Agent
description: A step-by-step guide to setting up transactional emails, a welcome flow, a usage digest, and your first campaign for a new SaaS product, using an AI agent connected to BlueFox Email through MCP.
thumbnail: /assets/articles/how-to-set-up-email-for-a-new-saas-product-with-an-ai-agent.png

layout: post
category: articles
tags: ['AI', 'SaaS', 'Transactional Email', 'Triggered Email', 'MCP']
author: "Parth Tiwari"

faqs:
  - question: "Can the AI agent send emails without me approving them?"
    answer: "No. Creating a campaign, a transactional email, or a triggered email always produces a draft. Sending or scheduling is a separate, explicit step you have to ask for, and you see every action the agent takes along with its result."
  - question: "Do I need to know how to code to set up email this way?"
    answer: "No. Connecting your AI client to BlueFox Email takes a short setup step, usually done once by whoever manages your accounts. After that, everything is a conversation: you describe what you want, and the agent creates it."
  - question: "Can the agent build a multi-day welcome series that runs on its own?"
    answer: "It can write every email in the series. It can't chain them into a timed sequence on its own yet, since BlueFox Email doesn't have a built-in automation engine at the time of writing. Each email it creates is a single triggered send; your own app decides when to fire the day-three or day-seven email."
  - question: "What if I already use another email service provider?"
    answer: "This workflow is specific to BlueFox Email, since it's the agent's connection to your project. If you're evaluating a move, the same agent can also set up your new BlueFox Email account while you migrate."
  - question: "Is this free to use?"
    answer: "The AI agent connection itself is free. It works through your existing BlueFox Email account, so normal sending costs apply exactly as if you'd used the dashboard or API directly."

sidebar: false
published: true
lastUpdated: 2026-09-23

head:
  - - meta
    - name: description
      content: A step-by-step guide to setting up transactional emails, a welcome flow, a usage digest, and your first campaign for a new SaaS product, using an AI agent connected to BlueFox Email through MCP.
  - - meta
    - property: og:title
      content: How to Set Up Email for a New SaaS Product with an AI Agent
  - - meta
    - property: og:description
      content: A step-by-step guide to setting up transactional emails, a welcome flow, a usage digest, and your first campaign for a new SaaS product, using an AI agent connected to BlueFox Email through MCP.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/articles/how-to-set-up-email-for-a-new-saas-product-with-an-ai-agent.png
  - - meta
    - property: og:url
      content: https://bluefox.email/posts/how-to-set-up-email-for-a-new-saas-product-with-an-ai-agent
  - - meta
    - property: og:type
      content: article
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: How to Set Up Email for a New SaaS Product with an AI Agent
  - - meta
    - name: twitter:description
      content: A step-by-step guide to setting up transactional emails, a welcome flow, a usage digest, and your first campaign for a new SaaS product, using an AI agent connected to BlueFox Email through MCP.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/articles/how-to-set-up-email-for-a-new-saas-product-with-an-ai-agent.png
---

# How to Set Up Email for a New SaaS Product with an AI Agent

Every new SaaS product needs the same small set of emails before it can take its first real signup. Something to confirm the account. Something to say hello. Something for when someone forgets their password, because someone always forgets their password. And down the line, something to tell people what's new.

None of that is hard. It's just boring enough that it keeps getting pushed to "next week," which is how so many products end up live with no password reset email and a welcome message that still says "TODO: write something nice here."

So let's actually build it, start to finish: the whole email starting kit for a brand-new SaaS product, using an AI agent connected to BlueFox Email. No dashboard-clicking, no blank editor staring back at you. Just tell the agent what you want in plain English and let it write the first draft.

:::tip TL;DR
1. Connect an AI agent to your BlueFox Email project (Claude, Cursor, or any MCP-compatible client).
2. Create your transactional emails first: signup verification and password reset.
3. Build a short welcome flow using a few separate triggered emails, fired by your own app on a delay.
4. Add a recurring usage digest so active users hear from you on their own schedule.
5. Draft and schedule your first campaign or announcement.
6. Optionally, brand the subscription preferences page your unsubscribe and pause links point to.
7. Review and send everything yourself. The agent never sends without you asking.
:::

## Before You Start

You need two things before any of this works: a BlueFox Email account with at least one project, and an AI client that speaks MCP. Claude Desktop, Claude Code, Cursor, Windsurf, Cline, and the Codex CLI all do the job, and they all work the same way once you've hooked them up.

### Connecting Your Agent to BlueFox Email

Hooking the two together is a one-time job, and BlueFox Email does most of the annoying parts for you. Go to **Project Settings > Integrations > MCP Server** and you'll find a config file with your project ID already dropped in, so you're not stuck hunting for it and pasting it in the right spot yourself.

For Claude Desktop, that config looks like this:

```json
{
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
}
```

<!-- TODO(screenshot): Claude Desktop / Claude Code showing "bluefox-email" connected, tool list expanded -->

Save that, restart your client, and you're done. No need to reconnect every time you open a new chat, it just stays there. If you want the full walkthrough for your specific client, including Claude Code's one-line terminal command and the Windows version of the config, that's all in the [MCP server documentation](/docs/integrations/mcp-server).

### Why Bother With an Agent Instead of Just Using the Dashboard

Fair question. Nothing here is impossible to do by hand. BlueFox Email's dashboard has a perfectly good editor, and if you already enjoy writing email HTML for fun (no judgment), you don't really need any of this. What changes is everything in between: normally you open the app, pick an editor, write a subject line, write the body, go hunting for the right merge tag, and then do that whole dance four or five more times, because a new product needs a handful of emails, not just one. With an agent, you say what you want once per email, and you get a finished draft back to react to instead of a blank page staring at you.

It also makes the "good" version cost the same as the "lazy" version. A password reset email with zero styling and a naked link still technically works, but asking the agent for a well-written one takes about the same effort as asking for a boring one. So you might as well get the nicer version, since it costs about the same to ask for.

Connection's live, so let's build your emails in the order that actually makes sense. Starting with the stuff the product literally cannot run without.

## Step 1: Transactional Emails First

Transactional emails are the ones a product can't function without: signup verification, password reset, that sort of thing. They go to one specific person, not a list, and they skip the unsubscribe link, because nobody should be able to "opt out" of getting their password reset.

Build these first. Your welcome flow and your double opt-in, if you use one, both need a working verification email to point to, so there's no shortcut around this one.

### Signup Verification

Here's what asking for one actually looks like, tool call and all:

```
You: Create a transactional email for verifying a new signup.
     Subject should be short and reassuring, and it needs a verify button.

Agent: I'll create that now.

  → create_transactional_email({
      name: "Signup Verification",
      subject: "Confirm your account",
      previewText: "One click and you're in.",
      bodyType: "html",
      body: "<p>Hi {{contact.name}},</p>
             <p>Thanks for signing up. Confirm your email address
             to activate your account:</p>
             <p><a href=\"{{verifyLink}}\">Confirm my email</a></p>"
    })

  ✓ Created transactional email "Signup Verification"
    Subject: "Confirm your account"
    Content type: html
```

Notice the agent already knows the verify button has to use the <code>&#123;&#123;verifyLink&#125;&#125;</code> tag. Skip that, and the email looks fine but does nothing, since that tag is the only thing that actually confirms anyone. Get it wrong and BlueFox Email will simply refuse to use the email for double opt-in at all, which is its polite way of saying "try again." The agent writes the HTML, saves it as a draft, and from there you can send yourself a test, tweak the wording, or ask for a few subject lines to pick from.

### Password Reset

Same deal for a password reset:

```
You: Now a password reset email. Make it clear the link expires soon.

Agent: → create_transactional_email({
      name: "Password Reset",
      subject: "Reset your password",
      previewText: "This link expires in 30 minutes.",
      bodyType: "html",
      body: "..."
    })

  ✓ Created transactional email "Password Reset"
```

<!-- TODO(screenshot): Transactional emails list in the BlueFox dashboard, showing "Signup Verification" and "Password Reset" as drafts -->

Both of these take a couple of minutes this way, and both are usually the very first email a new customer ever opens, so it's worth spending an extra minute on the subject line. Ask the agent for three options and pick whichever one sounds the least like it was written by a robot. (It was, technically. But it doesn't have to sound like it.)

::: info What about billing emails?
Receipts and payment confirmations are transactional emails too, and the agent writes them the same way. The actual work is getting the numbers into them, an order ID, a total, whatever your payment provider hands you. That's its own integration, so it's out of scope here, but once the data's flowing in, the email itself is no fancier than the two above.
:::

Essentials are done. Your product can now actually run. Next up: making sure people stick around long enough to use it.

## Step 2: A Short Welcome Flow

One welcome email is fine. A short welcome flow, a few emails spread a few days apart, does a much better job of getting a new customer to actually start using the product instead of quietly forgetting the app exists. This part is easy to ask for, but it's worth knowing exactly what you're getting before you build it.

```
You: Create three triggered emails for new signups on our main list:
     a welcome message for day one, a quick-tips email for day three,
     and a highlight of one feature people usually miss, for day seven.

Agent: I'll set up all three as separate triggered emails.

  → create_triggered_email({ name: "Welcome - Day 1", ... })
  ✓ Created "Welcome - Day 1"

  → create_triggered_email({ name: "Welcome - Day 3 Tips", ... })
  ✓ Created "Welcome - Day 3 Tips"

  → create_triggered_email({ name: "Welcome - Day 7 Feature Highlight", ... })
  ✓ Created "Welcome - Day 7 Feature Highlight"

  Three triggered emails are ready as drafts. Note: BlueFox Email
  doesn't chain triggered emails into a timed sequence, so your app
  will need to call each one on its own schedule (day 1, day 3, day 7
  after signup).
```

<!-- TODO(screenshot): Triggered emails list showing the three welcome emails as drafts -->

Read that last bit from the agent again, it matters. It writes three separate [triggered emails](/docs/projects/triggered-emails), each a good, one-off send with its own subject and its own content. What it doesn't do is stitch them together into a drip you set up once and forget about, because BlueFox Email doesn't have that kind of built-in timer yet. Deciding when day three and day seven actually go out is on your own backend, the same place that already knows when someone signed up.

That's a small extra step for you. It's also the honest version of a "welcome series": three good emails you're fully in control of, not a black box quietly doing its own thing in the background.

## Step 3: A Usage Digest People Actually Want

Once new customers have settled in, it helps to give your more active ones a reason to open your emails on their own, not just when you send something at them. Plenty of SaaS products do this with a recurring email showing what a user's been up to. Duolingo's progress emails are the classic example, and they work because people genuinely want to see that content, it's not just an excuse to land in someone's inbox.

If your product already tracks any kind of user activity, a weekly digest is basically free, the data's already sitting there. This is exactly what a triggered email with a data feed is for:

```
You: Create a weekly triggered email that pulls a subscriber's recent
     activity from a JSON feed and lists it out.

Agent: → create_triggered_email({
      name: "Weekly Activity Digest",
      subject: "Your week in review",
      bodyType: "html",
      body: "<p>Hi {{contact.name}}, here's your week:</p>
             <ul>{{#each activity.items limit=5}}
               <li>{{this.title}}</li>
             {{/each}}</ul>",
      feeds: [{
        url: "https://your-api.example.com/weekly-activity",
        feedType: "json",
        variableName: "activity"
      }]
    })

  ✓ Created "Weekly Activity Digest" with one feed configured
```

<!-- TODO(screenshot): The triggered email's Feeds section in the dashboard, showing the configured JSON feed -->

The agent sets up both the triggered email and the feed in one go. All you do is point that feed at an endpoint in your own app that hands back each subscriber's data as JSON. BlueFox Email already leans on this same trick internally for its own bounce and complaint emails, and it works just as well for usage summaries, campaign stats, or pretty much any small chunk of JSON you can produce on a schedule.

## Step 4: Your First Campaign

Once the basics are running, a campaign is the easy part, and it's a nice note to end on since it doesn't depend on anything else being built first. This is a one-off email to your whole list, or a slice of it, so it's the right tool for a launch announcement or a "hey, we shipped something" update.

```
You: Create a campaign announcing our new recurring-scheduling feature.
     Write a subject line and preview text, and draft the body around
     the update.

Agent: → create_campaign({
      name: "New Feature Announcement",
      subject: "New: schedule things in one tap",
      previewText: "Set it once, we'll handle the rest.",
      bodyType: "html",
      body: "..."
    })

  ✓ Created campaign "New Feature Announcement" (status: draft)
```

<!-- TODO(screenshot): Campaign draft open in the dashboard, subject/preview text visible -->

Like everything else so far, it lands as a draft, not a sent email. You give it a read, maybe tighten the subject line, send yourself a test, and only then tell the agent to schedule or send it. It only gets scheduled if you hand it an exact send time. Otherwise it just waits there as a draft, patiently, for as long as you need.

## Step 5: Branding the Page Your Unsubscribe Links Point To

Here's a nice detail worth knowing about, especially once the emails above are actually going out. Every triggered email and campaign you send includes an unsubscribe link and, if you want, a "pause" link too. By default, both point to a subscription preferences page BlueFox Email hosts for you. It works fine, but it's generic, it doesn't look like your product at all, and it's the last thing an unhappy customer sees on their way out the door.

Your agent can point that link somewhere better instead, a page you host yourself, and it can even help you build it. The mechanism behind it is a signed token: the unsubscribe or pause link carries a token that identifies the subscriber and the project, your page reads that to know who's asking, and from there it can unsubscribe them, pause them, or resubscribe them through something that actually looks like the rest of your app instead of a plain form nobody designed on purpose.

```
You: We built our own subscription preferences page at
     app.example.com/preferences. Point our unsubscribe and
     pause links there instead of the default page.

Agent: → manage_project_settings({
      action: "update",
      customSubscriptionPreferencesUrl: "https://app.example.com/preferences"
    })

  ✓ Updated project settings. Unsubscribe and pause links will now
    point to your custom page.
```

Building the page itself is a small job on your end, reading that token and calling a couple of BlueFox Email endpoints, but the agent can help write that page too if you ask it to, since the token format and the endpoints are both well documented. It's less of a day-one task and more of a "come back to this once real people are using the product" task. But it's a nice one to have on the list.

## What Stays a Human Decision

Worth saying plainly, since it's usually the first thing people ask. Nothing above skips a step you'd actually want to keep. Every single email lands as a draft, no exceptions. Sending or scheduling always takes a separate, deliberate ask, it never happens as some side effect of creating content. Subject lines, preview text, who it's sent from, the agent will suggest these, but it won't quietly decide them for you, since they're the kind of thing that affects how your product comes across. And it can't touch the visual drag-and-drop editor either, everything it makes is HTML or plain text, so if your team is used to designing emails visually, that's worth knowing up front.

::: tip A note on writing the HTML
Want cleaner, more reliable markup without hand-writing table-based email HTML yourself? Try asking the agent to write the email in [MJML](https://mjml.io/) first, then compile it before it goes into the tool call. MJML is just an easier target for a model to get right than raw email HTML, since the markup is simpler and it compiles down into something that behaves itself across different email clients. This is just a workflow trick on your end, not something built into the MCP server, so try it on a low-stakes email first and see if you like what comes out.
:::

## Conclusion

By the end of all this, your product has a verification email, a password reset email, a three-part welcome flow, a usage digest, and a first campaign sitting ready to go, all built by describing what you wanted instead of starting from a blank page five separate times. That covers most of what a new [SaaS product](/for/saas-companies) needs before its first real batch of users shows up. A few things worth remembering as you set this up for your own product:

- **Build things in the order they depend on each other:** transactional emails first, since your welcome flow and double opt-in both need a working verification email to point to.
- **A welcome flow still needs you for the timing:** the agent writes every email in it, but your own backend decides when day three and day seven actually go out.
- **Everything sits as a draft until you say otherwise:** nothing sends or schedules itself without you asking for it directly.
- **Reuse the data you're already sitting on:** a usage digest or a branded preferences page cost very little once the basics are in place.

There's more to say about each of these on their own, transactional emails and deliverability, campaign strategy, and what changes once BlueFox Email ships real automations, and those are natural next stops in this series. For now, if you've got an MCP-compatible AI client and a BlueFox Email project, you already have everything you need to run this exact setup for your own product today.
