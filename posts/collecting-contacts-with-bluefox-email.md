---
title: Collecting Contacts in BlueFox Email — Structure & Rationale
description: Internal walkthrough explaining how the contact collection tutorial is structured and why each section exists.
layout: post
category: internal-docs
---

## Purpose of This Page

- Explain how users should collect contacts before sending campaigns.
- Set expectations around explicit consent, list quality, and deliverability.
- Cover UI-based, import-based, and API-based collection methods.
- Reduce misuse that leads to bounces, complaints, and poor inbox placement.
- Serve as an educational foundation before deeper, advanced articles.

## Permission-Based Marketing & Explicit Consent

- Establishes that contacts must explicitly consent to receiving emails.
- Encourages clear consent mechanisms:
  - Checkbox confirmation during signup
  - Clear mention in terms and conditions
  - Explicit selection of which lists a user is subscribing to
- Emphasizes that users should understand:
  - What kind of content they will receive
  - Which lists they are being subscribed to
- Frames consent as critical for engagement, compliance, and deliverability.
- Sets a baseline expectation across all collection methods.
- Positions BlueFox Email as deliverability-first, not volume-driven.


## Collecting Contacts Using Signup Forms

- Presents signup forms as the primary method for non-technical users.
- Uses `sparksprocleaning.com` as a concrete, real-world example.
- Covers common use cases:
  - Newsletter signup
  - Quote or service request follow-ups
- Reinforces that signup forms should:
  - Clearly communicate what users are subscribing to
  - Reference consent and subscription intent
- Mentions support for custom fields without going into implementation.
- Links to Forms & Pages documentation for detailed setup steps.
- Refers back to explicit consent and list clarity from the previous section.


## Domain Whitelisting (Security Context)

- Explains domain whitelisting as an origin-control mechanism.
- Clarifies that it limits where forms and APIs can be used from.
- Emphasizes protection against unauthorized or abusive submissions.
- Avoids framing it as a mandatory requirement to create forms.
- Applies to embedded forms and public API usage.
- Points users to Project Settings → API Keys & Domain Whitelist.


## Double Opt-In

- Explains the confirmation-based signup flow.
- Shows how it ensures valid and intentional subscribers.
- Reinforces that double opt-in strengthens explicit consent.
- Connects double opt-in to lower bounce rates and fewer complaints.
- Strongly recommended for public and long-term lists.
- Educates without presenting it as mandatory.


## Captcha Protection

- Explains captcha as bot and abuse prevention.
- Positions it as complementary to double opt-in.
- Focuses on protecting list quality rather than adding friction.
- Especially relevant for public-facing signup forms.


## Initial Contact Import & Migration (CSV)

- Acknowledges that many users migrate from another email platform.
- Introduces CSV import as the primary method for:
  - Initial database setup
  - One-time migration of existing contacts
- Emphasizes that imported contacts should:
  - Already have valid consent
  - Match clear subscription intent
- Positions CSV import as a starting step, not an ongoing collection method.
- Leaves detailed migration walkthroughs for separate, dedicated articles.

## Synchronizing Contacts via API

- Introduces APIs as an advanced option for technical users.
- Positions APIs for synchronizing contacts across multiple systems.
- Covers common integration scenarios:
  - Web applications
  - CRMs
  - Other customer data sources
- Emphasizes that APIs are primarily for **synchronization**, not blind collection.
- Explicitly refers back to:
  - Clear subscription intent
  - Consent per list or via terms and conditions
- Avoids duplicating technical API documentation.
- Links to:
  - Contacts Management API
  - List Management API documentation


## Advanced Synchronization Scenarios

- Covers bulk contact updates and field synchronization.
- Explains multi-system consistency requirements.
- Emphasizes bidirectional synchronization:
  - Unsubscribes in external systems must reflect in BlueFox Email.
  - Unsubscribes in BlueFox Email should sync back to external systems.
- Mentions advanced flows such as:
  - Custom double opt-in confirmation handling
  - Custom redirect behavior
- Mentions custom subscription preferences pages.
- Clearly positions these as advanced topics with separate, focused articles.


## Choosing the Right Method

- Signup forms for websites and landing pages.
- Forms with explicit consent, double opt-in, and captcha for public traffic.
- CSV import for initial database migration.
- API-based synchronization for applications and multi-system setups.
- Helps users choose based on maturity, scale, and technical needs.

## Closing Message

- Reinforces that contact quality matters more than quantity.
- Reiterates the importance of explicit consent and list clarity.
- Aligns all methods with permission-based marketing.
- Positions BlueFox Email as flexible, scalable, and responsible.
