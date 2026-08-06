# Google Postmaster Tools feedback identifiers

BlueFox Email automatically adds identifiers to outgoing emails that can help you investigate Gmail spam complaints using the Google Postmaster Tools Feedback Loop.

These identifiers make it possible to associate an unusual Gmail spam rate with a particular BlueFox project, campaign, automation email, triggered email or transactional email.

No additional configuration is required in BlueFox Email.

## What is the Gmail Feedback Loop?

When a Gmail recipient marks an email as spam, Gmail does not normally provide the sender with the recipient's email address.

Instead, Google Postmaster Tools provides aggregate Feedback Loop data for email traffic containing a valid `Feedback-ID` header.

The Feedback Loop can help identify email campaigns or sending streams that receive an unusually high number of spam complaints from Gmail users. It does not identify the individual recipients who submitted those complaints.

A `Feedback-ID` header generated through Amazon SES has the following general structure:

```text
Feedback-ID: <identifier-a>:<identifier-b>:<ses-internal-id>:AmazonSES
```

BlueFox controls the first two identifiers. Amazon SES adds its own internal identifier and the `AmazonSES` sender identifier.

## How BlueFox structures feedback identifiers

BlueFox uses the first identifier to describe the account and project responsible for the email:

```text
acc_<account-id>_prj_<project-id>
```

BlueFox uses 24-character MongoDB ObjectIds as internal identifiers.

For example:

```text
acc_6894612a8c43b72e4f31a920_prj_68946219a97d4187b1842ca1
```

The second identifier describes the specific email source.

### Transactional emails

```text
txn_<transactional-email-id>
```

Example:

```text
Feedback-ID: acc_6894612a8c43b72e4f31a920_prj_68946219a97d4187b1842ca1:txn_68946305ec721c93157cd3b2:<ses-internal-id>:AmazonSES
```

The transactional email ID identifies the saved transactional email template in BlueFox.

Users can search for the transactional email's ID directly in the Transactional Emails listing page to locate the exact template responsible for the traffic.

### Triggered emails

```text
trg_<triggered-email-id>
```

Example:

```text
Feedback-ID: acc_6894612a8c43b72e4f31a920_prj_68946219a97d4187b1842ca1:trg_68946351b83fd0e4172ac6d4:<ses-internal-id>:AmazonSES
```

The triggered email ID identifies the triggered email definition configured in the project.

Users can search for the triggered email's ID directly in the Triggered Emails listing page to locate the exact definition responsible for the traffic.

### Campaigns

```text
cmp_<campaign-id>
```

Example:

```text
Feedback-ID: acc_6894612a8c43b72e4f31a920_prj_68946219a97d4187b1842ca1:cmp_689463a5d6e1840f2bc73951:<ses-internal-id>:AmazonSES
```

Every message sent as part of the same campaign uses the same campaign identifier.

Users can search for this campaign ID directly in the Campaigns listing page to locate the campaign responsible for the traffic.

### Automation emails

```text
aut_<automation-id>_mail_<email-id>
```

Example:

```text
Feedback-ID: acc_6894612a8c43b72e4f31a920_prj_68946219a97d4187b1842ca1:aut_689464182f63c7a095de421b_mail_689464859d4e2a71b30fc962:<ses-internal-id>:AmazonSES
```

An automation can contain multiple email steps. The identifier therefore contains both:

* the ID of the automation;
* the ID of the individual email inside the automation.

This makes it possible to identify the specific automation email associated with an unusual Gmail spam rate.

Users can search for the automation ID in the Automations listing page, and then search within that automation for the specific email ID to locate the exact step responsible.

## Identifier reference

| Email type       | Identifier                            |
| ---------------- | ------------------------------------- |
| Transactional    | `txn_<transactional-email-id>`        |
| Triggered        | `trg_<triggered-email-id>`            |
| Campaign         | `cmp_<campaign-id>`                   |
| Automation email | `aut_<automation-id>_mail_<email-id>` |

The account and project identifier is always:

```text
acc_<account-id>_prj_<project-id>
```

The same identifier structure is used with BlueFox-managed sending and when you connect your own Amazon SES account.

## Verified sending domains

When you send from a verified domain, you can add that domain to Google Postmaster Tools.

If Google detects an unusual spam rate and there is enough traffic to produce Feedback Loop data, the identifiers may appear in the Feedback Loop dashboard.

You can then use the identifier to locate the corresponding entity in BlueFox.

For example:

```text
cmp_689463a5d6e1840f2bc73951
```

identifies the BlueFox campaign with the ID:

```text
689463a5d6e1840f2bc73951
```

An automation identifier such as:

```text
aut_689464182f63c7a095de421b_mail_689464859d4e2a71b30fc962
```

identifies both the automation and the exact email step inside it. Users can search the automation ID first, then drill down to the email step using the second part of the identifier.

## BlueFox sandbox domain

Before you verify your own sending domain, BlueFox may send certain emails using the shared `bluefoxemailsandbox.com` domain.

Because this domain is owned and managed by BlueFox, it cannot be added to your own Google Postmaster Tools account.

BlueFox monitors the shared domain. The account and project identifier helps us determine which BlueFox account and project generated the traffic associated with a Feedback Loop warning.

For example:

```text
acc_6894612a8c43b72e4f31a920_prj_68946219a97d4187b1842ca1
```

identifies the responsible BlueFox account and project, while:

```text
cmp_689463a5d6e1840f2bc73951
```

identifies the specific campaign.

This is particularly important on shared sending infrastructure, where messages from multiple BlueFox accounts can use the same authenticated sending domain.

## What appears in BlueFox analytics?

The Gmail Feedback Loop does not create a recipient-level complaint event in BlueFox Email.

Even when the Feedback-ID is implemented correctly, Gmail does not disclose which recipient marked the message as spam.

As a result:

* the Gmail recipient is not automatically added to the BlueFox suppression list based on Feedback Loop data;
* the complaint does not appear as an individual complaint event in BlueFox analytics;
* the recipient's email address is not shown in Google Postmaster Tools;
* the Feedback Loop dashboard only provides aggregate information.

The Feedback-ID helps identify the sending source associated with an unusual Gmail spam rate. It does not provide recipient-level complaint reporting.

## Why might the Feedback Loop dashboard be empty?

An empty Feedback Loop dashboard does not necessarily mean the header is missing or incorrectly configured.

Google only generates Feedback Loop reports when an identifier appears in a sufficient volume of messages and is associated with spam reports from enough distinct Gmail users.

Small campaigns, low-volume transactional emails and individual automation steps may therefore never appear in the dashboard. Google also evaluates each identifier independently.

Feedback Loop data only covers messages sent to personal Gmail addresses. It does not provide information about recipients at Outlook, Yahoo or other mailbox providers.

## Identifiers are not unique per recipient

BlueFox uses persistent IDs for campaigns, templates and automation email steps.

It does not include values such as:

* recipient email addresses;
* subscriber IDs;
* dispatched message IDs;
* automation execution IDs;
* queue job IDs;
* individual Amazon SES message IDs.

A value that changes for every recipient cannot accumulate enough traffic for useful aggregate Feedback Loop reporting.

## Character and length restrictions

Feedback identifiers are sent to Amazon SES as message tags.

Amazon SES message-tag values can contain:

* ASCII letters;
* numbers;
* underscores;
* hyphens.

Each value can contain no more than 256 characters.

BlueFox generates the identifiers automatically and ensures they use the required format.

## Viewing the header in Gmail

You can inspect the Feedback-ID header of a delivered email in Gmail:

1. Open the email.
2. Select the three-dot menu next to the reply button.
3. Select **Show original**.
4. Search for `Feedback-ID`.

A BlueFox email may contain a header similar to:

```text
Feedback-ID: acc_6894612a8c43b72e4f31a920_prj_68946219a97d4187b1842ca1:cmp_689463a5d6e1840f2bc73951:1.eu-central-1.example:AmazonSES
```

The header normally appears on a single line.

## Using an identifier to identify the source of a Feedback Loop issue

When investigating a Google Postmaster Tools Feedback Loop result, you can use the identifier shown in the report to determine exactly which email caused the issue.

Start by copying the full identifier displayed by Google. Then search for it in BlueFox Email. You can do this in several places depending on the type of sending:

* search campaigns using the campaign ID (`<campaign-id>`);
* search automations using the automation ID (`<automation-id>_mail_<email-id>`);
* search triggered emails using the triggered email ID (`<triggered-email-id>`);
* search transactional emails using the transactional email ID (`<transactional-email-id>`).

For example:

```text
Identifier: aut_689464182f63c7a095de421b_mail_689464859d4e2a71b30fc962
```

In this case, you can immediately identify:

* the automation: `689464182f63c7a095de421b`
* the specific email step inside that automation: `689464859d4e2a71b30fc962`

Once located in BlueFox, you can review the email content, sending time, audience segment, and recent changes to understand what may have triggered the increased spam complaints.

This approach allows you to trace Feedback Loop signals back to the exact email source without needing recipient-level data.
