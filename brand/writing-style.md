# BlueFox Email writing style

How BlueFox Email sounds, based on the copy on bluefox.email (homepage,
pricing, BYO SES pricing, `/why`, `/for/*` persona pages and the blog posts).
Use it for newsletters, announcements, landing pages and in-app copy. It is a
reference document only. It is excluded from the VitePress build via
`srcExclude` in `.vitepress/config.js`.

## 1. Voice in one line

A practical, honest email specialist talking to a busy peer: plain words,
concrete numbers, no hype.

## 2. Core traits

| Trait | What it looks like | Site example |
|---|---|---|
| **Direct** | Lead with the outcome, short sentences, active voice | "Pay only for what you send" |
| **Concrete** | Real numbers, real limits, real prices | "3,000 free sends, no credit card required" |
| **Honest** | States limits and trade-offs openly | "No platform, including BlueFox, can guarantee inbox placement." |
| **Reader-first** | Second person, the reader's problem before our feature | "If you run email for multiple clients, you've seen these problems" |
| **Slightly contrarian** | Names the industry habit it rejects | "Stop paying for contacts you don't email" |
| **Calm** | Confident without exclamation marks or superlatives | "Configure once, let them run, and adjust when the data tells you to." |

## 3. Naming and terminology

- Product name: **BlueFox Email** (capital B, F, E). Use "BlueFox" alone only
  after the full name has appeared. The domain `bluefox.email` is only for
  URLs and the logo wordmark context.
- Say **sends**, not "credits" or "emails", when talking about what people pay
  for: "50,000 sends", "sends / month", "pay per send".
- **One-time packs** (Essential, Premium) and **monthly plans** (Starter,
  Basic, Growth, Pro, Business, Scale, Elite). "Credit packs" is internal
  shorthand; customer-facing copy says "one-time packs" or "send packs".
- **Contacts**, not "subscribers", when talking about billing ("no contact
  limits", "never for contacts").
- **Workspaces / projects** for client separation, **automations**,
  **segments**, **templates**, **design system**.
- **Bring your own SES** / **BYO SES** for the Amazon SES option.
- Prices always show "+VAT" and note that VAT is applied at checkout.

## 4. Sentence and paragraph style

- Short sentences. Most are under 20 words. One idea per sentence.
- Paragraphs of 1 to 3 sentences. Single-sentence paragraphs are fine for
  emphasis.
- Lists of three are common: "Automations, segmentation, analytics".
- Bold the single most important fact in a sentence, not whole sentences:
  "Every plan includes **full access to the platform**."
- Numbers use digits and thousands separators: 3,000, 50,000, $1 per 1,000
  sends.
- US spelling (behavior, color). Oxford comma is used.
- **No em dashes.** Use commas, periods, colons or parentheses instead.
- No exclamation marks in body copy. At most one in a whole email, ideally none.

## 5. Structure patterns

1. **Problem, then fix.** Name the pain in the reader's words, then show the
   BlueFox answer. ("Contact-based billing gets expensive fast... BlueFox Email
   flips the model: only pay for sends.")
2. **Headline + one-line subhead.** Headline is a claim or instruction
   (4 to 8 words). Subhead explains it in one or two plain sentences.
3. **Fact blocks.** Pricing and features are presented as scannable facts
   (card, table, check-mark list), not prose.
4. **Choice guidance.** When there are options, say who each one is for
   ("Choose a monthly plan if you send regularly... Choose a one-time pack if
   your volume is occasional or unpredictable").
5. **Clear next step.** End with one primary CTA and at most one secondary.

## 6. Headlines and CTAs

- Sentence case, no trailing period.
- Headlines favor imperatives and outcomes: "Pay only for what you send",
  "Send the right message to the right people", "Automate the sequences that
  matter".
- CTA labels are verbs, 2 to 4 words: "Get started for free", "Subscribe",
  "See BYO SES pricing", "Contact sales", "Buy 50K sends".
- Mention the risk reducer right next to the CTA when relevant:
  "no credit card required", "cancel any time".

## 7. Words to use and avoid

**Use:** pay per send, no contact limits, full platform access, no hidden
limits, fresh allowance, top up, real inboxes, on-brand, set up, switch.

**Avoid:**
- Hype and filler: revolutionary, game-changer, seamless, cutting-edge,
  supercharge, unlock, unleash, elevate, leverage, robust, "in today's
  fast-paced world", "we're thrilled/excited to announce".
- Vague promises: "boost your results", "take it to the next level".
- Guarantees we cannot keep (inbox placement, open rates).
- Stacked adjectives and marketing triplets that add no information.
- Emoji in headlines or body copy.

## 8. Tone by context

| Context | Adjustment |
|---|---|
| Product / pricing announcement | Lead with what changed and who it helps, then exact numbers, then how to act. Keep existing customers reassured about what stays the same. |
| Educational post | Slightly longer, explains "why", uses TL;DR tables and tips. |
| Persona landing page | Mirrors the persona's pains in their words, then maps each to a feature. |
| Transactional / in-app | Minimal, factual, no selling. |

## 9. Newsletter checklist

- Subject line: under 50 characters, states the news plainly.
- Preheader: adds the key number or benefit the subject left out.
- First line after the headline answers "what changed for me?".
- Every price has "+VAT" and a note that VAT is applied at checkout.
- One primary CTA repeated at most twice (top area and end).
- Sign-off from a real person on the team.
- Every bluefox.email and app.bluefox.email link is tagged as described in `brand/utm-tagging.md`.
- Read it once looking only for em dashes, exclamation marks and banned words.
