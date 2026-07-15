---
title: Merge Tags in Email Marketing
description: Merge tags are placeholders like {{first_name}} that pull in per-recipient data when an email sends, and they need fallback values to avoid showing broken text to subscribers.
---

# Merge Tags in Email Marketing

**Merge tags** (also called merge fields or personalization tags) are placeholders inside an email's subject line or body (written in a form like `{{first_name}}` or `*|FNAME|*` depending on the platform) that get replaced with real, per-recipient data at send time. They're the simplest and most widely used form of [personalization](/email-marketing-concepts/personalization/), sitting one level below [dynamic content](/email-marketing-concepts/personalization/dynamic-content), which changes entire blocks rather than filling in a value inside fixed copy. BlueFox Email's own implementation is documented in [Email Personalization (Merge Tags)](/docs/email-personalization).

## What Merge Tags Pull In

A merge tag can reference any field stored against a subscriber, not just their name. Common examples include:

- **Identity fields**: first name, last name, company name
- **Account or order data**: plan tier, renewal date, order number, last purchase amount
- **Custom fields**: anything collected on a signup form, such as job title, industry, or referral source
- **List or segment context**: the specific list or tag that triggered the send, useful in shared templates

Because merge tags pull from stored subscriber data rather than computed logic, they're only as reliable as the data behind them: a field that's rarely filled in will produce a lot of blank or fallback output.

## Where Merge Tags Show Up

Merge tags aren't limited to the greeting line. They typically appear in three places:

1. **Subject line**: e.g. "{{first_name}}, your {{plan_name}} renews soon," often the highest-impact placement, since it's the first thing a recipient sees before deciding to open.
2. **Greeting**: the classic "Hi {{first_name}}," opening line.
3. **Body copy**: referencing an order number, a renewal date, or a company name inline, which reads as more relevant than generic phrasing.

Using a merge tag in the subject line tends to have an outsized effect on perceived relevance compared to using one only in the greeting, since it shapes the open decision itself.

## Fallback and Default Values

The single most important detail in using merge tags well is handling missing data. If a subscriber's first name was never collected and the email sends `Hi {{first_name}},` with no fallback, the recipient sees literally **"Hi ,"** or, worse, the raw unresolved tag text, both of which look broken and read as far less trustworthy than an email with no personalization at all.

The fix is a default value, supported by most sending platforms:

- `Hi {{first_name | "there"}},` renders as "Hi there," when no name is stored.
- A missing company field can fall back to a generic phrase like "your team" instead of leaving a gap.
- A missing plan or product field can fall back to a neutral term like "your account" rather than nothing.

Before any campaign using merge tags goes out, it's worth checking what percentage of the send list is actually missing the field being merged: if a meaningful share of the list lacks the data, either the fallback needs to be solid or the tag shouldn't be relied on for that send.

## Merge Tags vs. Dynamic Content

Merge tags and [dynamic content](/email-marketing-concepts/personalization/dynamic-content) are often used together but serve different jobs. A merge tag fills a gap in text that otherwise stays fixed for every recipient. Dynamic content changes which block of content appears at all. A welcome email might use a merge tag for the greeting ("Hi {{first_name}}") while also using dynamic content to show a different product row depending on the subscriber's declared interests. The two techniques stack rather than compete.

## Testing Merge Tags Before Sending

Because a broken merge tag is highly visible and undermines trust in the whole email, testing matters more here than for most other personalization techniques:

- Send a test to an account with the field populated and one with it deliberately blank, to confirm the fallback renders correctly.
- Check merge tags in the subject line specifically, since some inbox previews truncate or render tags differently than the body.
- Confirm capitalization and formatting: a raw database value like "JOHN" or "john" merged into a sentence can look inconsistent next to the rest of the copy.

## Related Content

- [Personalization in Email Marketing](/email-marketing-concepts/personalization/)
- [Dynamic Content](/email-marketing-concepts/personalization/dynamic-content)
- [Email Personalization (Merge Tags) in Product Docs](/docs/email-personalization)
- [List Management](/email-marketing-concepts/list-management/)
