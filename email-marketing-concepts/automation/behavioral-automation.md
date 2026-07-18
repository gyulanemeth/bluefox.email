---
title: Behavioral Automation
description: Behavioral automation sends emails based on what a subscriber does or doesn't do over time, using waiting periods and branching logic rather than a single trigger-and-send.
---

# Behavioral Automation

**Behavioral automation** is email automation driven by what a subscriber does (or fails to do) rather than a fixed date or a single event. It covers flows like cart and browse abandonment recovery, re-engagement campaigns for subscribers who've gone quiet, and upsell sequences triggered by product usage. Behavioral automation builds on the same underlying event system as [triggered emails](/email-marketing-concepts/automation/triggered-emails), but adds waiting periods and branching logic that respond to what happens *after* the first email is sent. It's typically configured through an [automation builder](/docs/projects/automations) that supports conditional steps, not just a single send.

## How It Differs from a Simple Triggered Email

A [triggered email](/email-marketing-concepts/automation/triggered-emails) reacts to one event and sends one email (or a short fixed follow-up). Behavioral automation goes a step further: it watches for a **sequence of behaviors**, and the path a subscriber takes through the automation can change based on what they do next.

| | Triggered Email | Behavioral Automation |
|---|---|---|
| **Structure** | Event happens → one email sends | Event happens → wait → check condition → branch |
| **Responsiveness** | Fixed response to a single event | Adjusts based on subsequent subscriber actions |
| **Example** | Cart abandoned → reminder email sent | Cart abandoned → wait 24h → if still not purchased, send discount → if purchased, stop and send thank-you instead |
| **Complexity** | Low: usually one or two steps | Higher: involves conditional logic and multiple possible paths |

In other words, a triggered email answers "what happened?" while behavioral automation keeps asking "what happened *since then*?" and adjusts course accordingly.

## Cart and Browse Abandonment Recovery

Abandonment flows are the most common form of behavioral automation in ecommerce. A cart abandonment flow typically:

1. Detects that items were added to a cart but checkout wasn't completed.
2. Waits a set period (commonly a few hours) to give the subscriber a chance to return on their own.
3. Sends a reminder email, often with the abandoned items shown directly.
4. Checks whether a purchase happened in the meantime; if not, may send a second reminder, sometimes with an incentive, after a longer delay.
5. Stops the sequence entirely the moment a purchase is detected.

Browse abandonment works the same way but triggers off product views instead of cart additions, which usually means a lighter-touch message since the intent signal is weaker than an actual cart add.

## Re-engagement Flows for Inactive Subscribers

Re-engagement automation targets subscribers whose activity has dropped off: no opens or clicks over some defined window. Rather than a single "we miss you" email, a well-built re-engagement flow branches based on the response:

- If the subscriber opens or clicks, they exit the flow and return to normal sending.
- If they remain inactive after one or two attempts, they may be moved to a reduced-frequency segment or, eventually, suppressed from regular sends to protect sender reputation and deliverability.

This is a good example of why behavioral automation needs branching rather than a fixed schedule: the correct next step genuinely depends on whether the re-engagement attempt worked, not on how many days have passed.

## Upsell Flows Triggered by Usage Milestones

For SaaS and subscription products, behavioral automation can watch product usage rather than email engagement. A subscriber who hits a usage milestone (nearing a plan limit, using an advanced feature repeatedly, or reaching a certain tenure) can automatically enter a flow that introduces an upgrade path. Because the trigger is tied to actual usage, the message arrives when the upgrade is genuinely relevant, which tends to make it feel like helpful guidance rather than an unprompted sales pitch. These flows often branch too: a subscriber who upgrades exits the sequence, while one who doesn't may receive a follow-up addressing common objections.

## Why the Waiting and Branching Matters

The value of behavioral automation over a single triggered email comes from not assuming the first message will always work. A cart reminder that assumes the recipient never returns will keep pushing a discount to someone who already bought the item at full price. That's an easy way to erode trust and margin at once. By checking subsequent behavior before deciding on the next step, behavioral automation avoids sending messages that no longer make sense given what the subscriber has already done. This same logic connects behavioral automation closely to [personalization](/email-marketing-concepts/personalization/): both are about tailoring what gets sent based on individual subscriber data rather than treating the whole list identically.

## Related Content

- [Email Automation](/email-marketing-concepts/automation/)
- [Triggered Emails](/email-marketing-concepts/automation/triggered-emails)
- [Drip Campaigns](/email-marketing-concepts/automation/drip-campaigns)
- [Personalization](/email-marketing-concepts/personalization/)
