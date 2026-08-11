---
title: Unengaged Segment | bluefox.email documentation
description: Learn how to define the unengaged segment in your bluefox.email project settings, and how the exclude unengaged toggle keeps those contacts out of campaigns and triggered emails.
faqs:
  - question: "What is the unengaged segment in BlueFox Email?"
    answer: "The unengaged segment is a project-wide definition of which contacts count as unengaged. It is set in project settings under the Unengaged Segment section and uses the same condition builder as regular segments, with contact property and engagement conditions combined using AND and OR logic."
  - question: "How do I exclude unengaged contacts from a send?"
    answer: "Turn on the Exclude unengaged toggle in the header of the campaign or triggered email. Every contact matching your project's unengaged segment definition is then skipped for that send. The toggle is per send, so it never affects other campaigns or triggered emails."
  - question: "What is the default unengaged definition?"
    answer: "By default a contact is unengaged if it was created more than 365 days ago and either received an email in the last 90 days without opening any of them, or did not receive any email in the last 90 days. The two cases are joined with OR logic, and the conditions inside each case are joined with AND logic."
  - question: "Can I change the unengaged segment definition?"
    answer: "Yes. The unengaged segment is fully editable in project settings. You can add, remove, or change conditions the same way you would in any segment, then click Save to apply them. Reset discards your unsaved edits. No developer involvement is needed."
  - question: "How is the unengaged segment different from a regular segment?"
    answer: "A regular segment is one of many named groups you create under Contacts and apply to a specific campaign or automation. The unengaged segment is a single unnamed definition per project, and it is used only by the Exclude unengaged toggle on campaigns and triggered emails."
head:
  - - meta
    - name: description
      content: Learn how to define the unengaged segment in your bluefox.email project settings, and how the exclude unengaged toggle keeps those contacts out of campaigns and triggered emails.
  - - meta
    - property: og:title
      content: Unengaged Segment | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to define the unengaged segment in your bluefox.email project settings, and how the exclude unengaged toggle keeps those contacts out of campaigns and triggered emails.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/unengaged-segment
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Unengaged Segment | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn how to define the unengaged segment in your bluefox.email project settings, and how the exclude unengaged toggle keeps those contacts out of campaigns and triggered emails.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Unengaged Segment

The unengaged segment defines, for the whole project, which contacts count as **unengaged**. It is a single set of conditions stored in your [project settings](./settings.md), built with the same condition builder used by regular [segments](./segments.md).

The definition on its own does not change who receives your emails. It takes effect when you turn on **Exclude unengaged** on a [campaign](./campaigns.md) or a [triggered email](./triggered-emails.md): every contact matching the definition is skipped for that send.

## Where to Find It

Click the **Settings** tab of your project, then choose **Unengaged Segment** in the sub-menu. It sits at the end of the settings sub-menu, after **Integrations**. The section itself is titled **Unengaged Contact Segment**.

![A screenshot of the project settings side menu with the unengaged segment section highlighted.](./project-unengaged-segment-menu.webp)

## How the Definition Is Used

Every campaign and triggered email has an **Exclude unengaged** toggle in its header, next to the subscriber list and segment selection. With the toggle on, BlueFox Email compares each contact in the selected list against the project's unengaged segment definition and skips the ones that match.

![A screenshot of a campaign with the exclude unengaged toggle highlighted.](./project-unengaged-segment-exclude-option.webp)

This means:

- You do not have to build or maintain an exclusion list at send time.
- The definition is shared, so every send that opts in uses the same criteria.
- The toggle is per send. Leaving it off sends to the full list regardless of the definition.

## Default Definition

Every project starts with a default definition made of two condition groups joined with **OR** logic. Conditions inside each group are joined with **AND** logic, so a contact only needs to match one complete group to be treated as unengaged.

![A screenshot of the unengaged contact segment section with the default definition.](./project-unengaged-segment-default.webp)

**Group 1**: contacts that are emailed but never open

- Condition 1: `Created At` **More than** `365` days ago
- **AND**
- Condition 2: Email `received` in the last `90` days
- **AND**
- Condition 3: Email `not-opened` in the last `90` days

**OR**

**Group 2**: contacts that are no longer emailed at all

- Condition 1: `Created At` **More than** `365` days ago
- **AND**
- Condition 2: Email `not-received` in the last `90` days

In plain language: a contact is unengaged by default if it has existed for over a year, and either it has been emailed recently without opening anything, or it has not been sent anything in the last 90 days.

## Editing the Definition

The unengaged segment is a normal settings page, so you can adjust it to your project's own criteria without any developer involvement.

- **Add a condition**: click **AND** at the bottom of a group. Each condition row has its own **CONTACT PROPERTY** and **ENGAGEMENT** tabs, so you choose the condition type per row, then pick the property or engagement operator and the value or number of days.
- **Add a group**: click **OR** at the bottom of the section. Groups are joined with OR logic, so a contact matching any complete group counts as unengaged.
- **Remove a condition**: click the delete icon at the end of the condition row.
- **Save**: click **SAVE** to apply the new definition. It takes effect on the next send that has **Exclude unengaged** turned on.
- **Reset**: click **RESET** to discard your edits and return to the saved definition.

![A screenshot of the unengaged contact segment section with the add condition, add group, reset and save buttons highlighted.](./project-unengaged-segment-edit.webp)

The available conditions and operators are the same ones documented on the [Segments](./segments.md) page.

::: tip Note:
Changing the definition changes who is skipped on every campaign and triggered email that uses **Exclude unengaged**, not just the one you are editing next.
:::

## Relationship to Segments

The unengaged segment reuses the [segment](./segments.md) condition builder, but it is not a regular segment:

- Regular segments are named, created under **Contacts**, and selected individually per campaign or automation.
- The unengaged segment is a single unnamed definition per project, edited in project settings, and used only by the **Exclude unengaged** toggle.

If you are new to the condition builder, read [Segments](./segments.md) first. The AND/OR logic, the contact property operators, and the engagement conditions all behave the same way here.