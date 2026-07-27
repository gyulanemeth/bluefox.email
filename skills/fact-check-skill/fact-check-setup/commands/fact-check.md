---
description: Deep fact-check a BlueFox draft against the codebase and the live web before it ships
argument-hint: [path-to-draft]
---

Use the `fact-check` skill to deep fact-check $ARGUMENTS before it goes out.

Context: this is a BlueFox Email article (comparison piece, tutorial, or docs page) that Gyula will review before publish. Nothing should ship with a claim that hasn't been personally re-verified against a current source — don't reuse a number just because it's already in the draft or was correct in a past pass.

Do this:
1. Extract every checkable claim in the draft: pricing, feature availability, send/plan limits, comparison table cells, protocol/RFC details, "only provider that" superlatives. Skip subjective/opinion lines.
2. For claims about BlueFox itself: don't trust the draft's wording. Grep the actual codebase, docs site, and pricing config for the current source of truth.
3. For claims about competitors (Mailchimp, SendGrid, Brevo, MailerLite, Constant Contact, Loops, Resend, MailerSend, or anyone else named): fetch their live pricing/docs pages directly, not aggregator sites or old summaries. If more than one or two competitors are involved, split the verification across subagents so this doesn't run serially.
4. For technical/protocol claims (DMARC, SPF, DKIM, RFCs): verify against the primary spec. Flag anything still citing the superseded RFC 7489 instead of the current DMARCbis (RFC 9989-9991).
5. Run `scripts/style_check.py` from the skill folder against the draft and fold the flags into the report.

Output one table: claim, verdict (Confirmed / Outdated / Incorrect / Unverifiable), source, and a fix if one's needed. If you can't find a primary source for something, mark it Unverifiable rather than guessing — don't round an uncertain claim up to Confirmed just to make the table look cleaner. Close with a short style-notes section from step 5.
