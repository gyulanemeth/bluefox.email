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

- Acknowledges that many users migrate from another ESP.
- Introduces CSV import as the primary method for:
  - Initial database setup
  - Migrating existing contacts
- Emphasizes that imported contacts should:
  - Have prior consent
  - Align with explicit subscription intent
- Positions CSV import as a starting step, not ongoing collection.
- Leaves detailed migration guides (e.g. Mailchimp → BlueFox Email) for separate articles.


## Collecting Contacts via API

- Introduces APIs as an advanced option for technical users.
- Positions APIs for applications, CRMs, and backend systems.
- Acknowledges multi-source integrations, such as:
  - Webshop
  - CRM (e.g. HubSpot)
  - Popup providers (e.g. OptinMonster)
- Reinforces that permission requirements still apply.
- Explicitly refers back to:
  - Clear subscription intent
  - Consent per list or via terms and conditions
- Avoids duplicating technical API documentation.
- Links to:
  - Contacts Management API
  - List Management API documentation


## Advanced API Use Cases & Synchronization

- Covers bulk contact creation and updates.
- Mentions CRM and internal system synchronization.
- Emphasizes two-way sync scenarios:
  - If a user unsubscribes in a CRM, it must be reflected in BlueFox Email
  - If a user unsubscribes in BlueFox Email, it should sync back to external systems
- Explains custom double opt-in confirmation and redirect flows.
- Mentions custom subscription preferences pages.
- Clearly positions these as advanced topics with separate, dedicated articles.
- Demonstrates how APIs enable scalable, compliant automation.


## Choosing the Right Method

- Signup forms for websites and landing pages.
- Forms with explicit consent, double opt-in, and captcha for public traffic.
- CSV import for initial database migration.
- APIs for applications, CRMs, and multi-system integrations.
- Helps users self-select the appropriate approach based on maturity and scale.

## Closing Message

- Reinforces that contact quality matters more than quantity.
- Reiterates the importance of explicit consent and list clarity.
- Aligns all collection methods with permission-based marketing.
- Positions BlueFox Email as flexible, scalable, and responsible.
