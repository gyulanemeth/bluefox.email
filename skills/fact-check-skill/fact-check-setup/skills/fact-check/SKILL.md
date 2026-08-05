---
name: fact-check
description: Deep fact-checks BlueFox Email articles, tutorials, comparison pieces, and docs before publish by cross-referencing claims against the codebase/docs AND the live web. Use whenever asked to fact-check, verify, review, or sanity-check a draft, or when a comparison article mentions competitors (Mailchimp, SendGrid, Brevo, MailerLite, Constant Contact, Loops, Resend, MailerSend) or technical/protocol claims (DMARC, SPF, DKIM, RFCs, deliverability). Trigger even on casual asks like "can you check this piece before I send it to Gyula" or "does this comparison table still hold up."
---

# Fact-check

Catches wrong, stale, or unverifiable claims in a draft before it goes out. The core idea: never trust a number or feature claim just because it's written down, including in our own docs, because things change. Every claim gets re-derived from a current source.

## Step 1: Extract the claims

Read the draft and pull out every checkable factual statement — not opinions, not style choices. Examples of what counts:
- Pricing figures, send limits, plan tiers
- "X supports/doesn't support Y" feature claims
- Comparison table cells
- Protocol/spec behavior (DMARC, SPF, DKIM, RFC references)
- Dates, statistics, "only provider that..." superlatives

Tag each one by type as you go — you'll verify each type differently in Step 2. Skip subjective claims ("Mailchimp feels bloated") — those aren't fact-check targets.

While extracting, also watch for **internal contradictions**: the same fact stated more than once in the draft with different values (e.g. a feature listed as gated to one plan in the body text but a different plan in the pricing table, or in one bullet but not another). These don't show up by checking each sentence against an external source in isolation — you only catch them by comparing the draft against itself. A claim repeated 4-5 times where only one repetition is wrong will pass a naive per-sentence check.

## Step 2: Verify by claim type

### A. Claims about BlueFox itself
Don't take the draft's word for it, even if it sounds right. Use Grep/Glob to search the actual codebase, docs site (VitePress), pricing config, and changelog for the current source of truth. Docs drift from reality faster than people expect — a pricing page or feature flag changed last month is a common miss.

Concretely, "the codebase" for BlueFox claims means (start here, but don't stop here — Glob broadly, this list isn't exhaustive):
- `pricing.md`, `docs/pricing.md`, `byo-amazon-ses-pricing.md` — pricing/tier source of truth
- `components/PricingCalculator.vue` and other `components/*.vue` — pricing *logic*, not just prose. A tier or price ceiling can be missing from the written docs but still be checkable (or disprovable) from the calculator's own branching, e.g. what happens above the top published tier.
- `docs/projects/*.md` (delivery-modes, automations, segments, data-feeds, email-builder, suppression-list, contacts, etc.) and `docs/integrations/*.md`, `docs/api/`, `docs/statistics.md`, `docs/account-users.md`
- `email-sending-concepts/*.md` for protocol/compliance features (one-click unsubscribe, etc.)

There is no dedicated changelog file in this repo. If you need to know when a doc last changed, use `git log -p -- <file>` on the specific source file instead of looking for a changelog artifact.

Some of BlueFox's own docs are themselves stale (e.g. a pricing doc can lag behind AWS's actual published free-tier numbers). If a BlueFox-claim check disagrees with a BlueFox doc, cross-check against the third party the number ultimately depends on (AWS pricing page, RFC text, etc.) before assuming the draft is wrong — the draft can be right while BlueFox's own doc is the stale one. Note the doc discrepancy separately; it's a real bug worth surfacing even though it's not the draft's fault.

### B. Claims about competitors
Competitor pricing and features move constantly, so re-verify every one against a primary source — WebFetch the competitor's own pricing/docs page directly. Do not rely on aggregator sites, comparison-blog roundups, or the numbers already sitting in the draft.

Known set to watch for: Mailchimp, SendGrid, Brevo, MailerLite, Constant Contact, Loops, Resend, MailerSend — plus anything else the draft names.

If a claim attributes a stat to a specific named third party (e.g. "EmailToolTester measured 89.1% inbox placement"), that tracker's own site *is* the primary source for the claim, even though it's itself an aggregator of deliverability data in general — verify it against EmailToolTester directly, not against Mailchimp/Brevo/etc.

Some competitor pricing/help pages are client-rendered (JS-only) and return empty or near-empty content to a fetch. If the competitor's own primary page is genuinely unreachable after a retry, you may fall back to a secondary source (review site, aggregator) rather than skip the claim — but mark the verdict's Source column with a leading "Secondary (primary unreachable):" so the report is honest about the downgrade, and prefer marking the claim Unverifiable over asserting a number that only secondary sources agree on, especially if secondary sources disagree with each other.

If a draft touches several competitors at once, launch one subagent per competitor via the Task tool instead of checking them serially in the main thread. Give each subagent the specific claim(s) to verify and have it report back a verdict plus the source URL. This keeps the main context clean and makes multi-competitor pieces fast instead of tedious.

### C. General / technical / educational claims
For protocol or spec claims, verify against the primary source — the actual RFC text or the standards body's own documentation, not a summary blog post. Specifically watch for content that still cites the superseded RFC 7489 instead of the current DMARCbis (RFC 9989-9991) — this is a known gap in older BlueFox docs.

## Step 3: Style and voice check

Run the mechanical style check before doing anything by hand — it's fast and deterministic, so don't spend reasoning tokens on things a script can catch:

```
python3 scripts/style_check.py <path-to-draft>
```

It flags em dashes, title-case headers (should be sentence case), "solo founder" phrasing (should be "small team"), and a list of defensive or overreaching phrases worth a second look. See `references/editorial-standards.md` for the reasoning behind each rule — read it once if you're unsure why something's flagged.

## Step 4: Report

Output one table, one row per claim:

| Claim | Verdict | Source | Fix if needed |
|---|---|---|---|

Verdict is one of:
- **Confirmed** — matches the current source
- **Outdated** — was true when written, but the underlying thing changed (say what changed)
- **Incorrect** — was never accurate, or misreads the source
- **Unverifiable** — couldn't find a primary source; say so honestly rather than letting it slide

A claim is sometimes half-right: the number is correct but a qualifier is wrong ("$50/month, self-serve" when the price is right but it's actually sales-assisted), or the structure is confirmed but the exact figure isn't reachable, or the draft is correct while BlueFox's own doc disagrees. Don't force these into a clean bucket you can't honestly back. Pick the verdict that reflects whether the *reader would be misled* (a wrong qualifier that changes what the reader should expect is Incorrect, not Confirmed), and use the Fix column to spell out exactly which part is right and which part isn't.

Follow the table with a short "style notes" section summarizing the Step 3 output.

## Ground rules

- Re-derive every number from a current source. Don't reuse a figure just because it appeared correct in an earlier fact-check pass.
- Primary sources beat secondary write-ups every time — official docs, RFC text, and pricing pages over blog summaries.
- "Unverifiable" is a legitimate, useful verdict. Don't force a Confirmed/Incorrect call you can't back up.
