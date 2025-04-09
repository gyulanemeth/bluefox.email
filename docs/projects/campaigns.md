---
title: Campaigns | bluefox.email documentation
description: Learn how to create and manage campaigns in bluefox.email. Send newsletters, promotions, or announcements with customizable templates and advanced personalization.
head:
  - - meta
    - name: description
      content: Learn how to create and manage campaigns in bluefox.email. Send newsletters, promotions, or announcements with customizable templates and advanced personalization.
  - - meta
    - property: og:title
      content: Campaigns | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to create and manage campaigns in bluefox.email. Send newsletters, promotions, or announcements with customizable templates and advanced personalization.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/campaigns
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Campaigns | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn how to create and manage campaigns in bluefox.email. Send newsletters, promotions, or announcements with customizable templates and advanced personalization.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Campaigns

Unlike transactional and triggered emails, campaigns are not sent by your backend. Campaigns can be scheduled to a specific time or you can send it immediately. All the content is edited within bluefox email. Typical examples are newsletters, promotional emails, or occasional announcements.

Campaigns are sent to the `active` subscribers on a list. Since campaigns are tied to a subscriber list, they must contain an unsubscribe link and optionally a pause subscription link.

You can find the campaigns of a project under the `Campaigns` tab.

![A screenshot of a project's campaigns.](./project-campaigns.webp)

## Creating a campaign

In order to create a new campaign, press the `Create` button.
![A screenshot of a project's campaigns - new button highlighted.](./project-campaigns-create-button.webp)

After that, you will have to select a template to start from:

![A screenshot of a project's campaigns - create: template selection.](./project-campaign-create-select-category.webp)

Enter it's name, subject line, and preview text:
![A screenshot of a project's campaigns - create: enter data.](./project-campaign-create-select-template.webp)

Enter its name, subject line, preview text, and select a subscriber list:
![A screenshot of a project's campaigns - create: select subscriber list.](./project-campaign-create-subject.webp)

After that, you will see a summary page. Click "Launch Editor".

![A screenshot of a project's triggered emails - create: summary.](./project-campaign-create-summary.webp)

Finally, make changes in the drag 'n' drop email editor:
![A screenshot of a project's campaigns - create: edit.](./project-campaign-create-editor.webp)

When you are done, you can schedule your campaign, or you can send it immediately:
![A screenshot of a campaign - schedule and send button highlighted.](./project-campaign-schedule.webp)

## Personalization

Since a campaigns is sent to a subscriber list, subscriber data, unsubscribe link, and pause subscription link are also included. You can use the following merge tags:
```
{{subscriber.name}}
{{subscriber.email}}
{{unsubscribeLink}}
{{pauseSubscriptionLink}}
```

You can use any handlebars variables in your email while editing. Click on the edit icon on the card:
![A screenshot of a campaign card, edit button highlighted.](./project-campaign-edit-button.webp)

You can use these handlebars variables in your email, while editing:
![A screenshot of a campaign being edited, a merge tag is being added.](./project-campaign-edit-merge-tag.webp)

And you can use merge tags in the email's `subject line` and `preview text` as well!

![A screenshot of a campaign, with a merge tag being used in the subject and the preview text.](./project-campaign-edit-subject-merge-tag.webp)

For more details, read our guide on [personalization with merge tags](/docs/email-personalization) and Handlebars.

## Campaign states

There are five states of a campaign: draft, scheduled, being sent (or the scheduled time is only a few minutes away), sent, and archived.

In each state, different actions are available, and some of them are disabled.

Draft campaigns can be edited, scheduled, and sent:
![Campaign - draft.](./project-campaign-draft.webp)

Scheduled campaigns have the following actions: re-schedule, cancel send, send now. Scheduled campaigns cannot be edited nor deleted!
![Campaign - scheduled.](./project-campaign-scheduled.webp)

Campaigns that are being sent currently (or the send time is a few minutes away) should not be modified, so all of their actions are disabled.
![Campaign - being sent.](./project-campaign-being-sent.webp)

Sent campaigns can be archived, and stats should show up:
![Campaign - sent.](./project-campaign-sent.webp)

Archived campaigns can be restored. It means that they become draft again.s
![Campaign - archived.](./project-campaign-archived.webp)

## Campaign Email Statistics

Campaign emails are designed to reach a targeted group of recipients, often based on specific user segments or marketing campaigns. These emails are sent to the subscribers on a list, and unlike triggered emails, they are typically part of larger, planned marketing efforts rather than automated, one-to-one communications.

### Why Campaign Email Statistics Matter

Understanding how your campaign emails perform is essential for refining your marketing strategies and improving your engagement with subscribers. Tracking performance helps you:

- **Monitor Campaign Effectiveness**: Measure the success of your campaign emails by tracking key metrics such as open rates, click-through rates, and bounce rates.
- **Optimize Engagement**: Analyze the success of your subject lines, content, and timing to improve how subscribers interact with your emails.
- **Refine Segmentation**: Use insights into open rates, clicks, and other actions to adjust your subscriber segments for more targeted future campaigns.
- **Detect Issues**: High bounce rates, low open rates, or high unsubscribe rates can indicate potential issues, allowing you to fix problems early.
- **Enhance Subscriber Retention**: Track metrics like unsubscribes, resubscriptions, and paused subscriptions to better manage your subscriber base and improve long-term engagement.

### What Campaign Email Statistics Include

The campaign email statistics section includes the following key metrics:

- **Sent Emails**: Total number of campaign emails sent to recipients.
- **Opens**: Number of times recipients opened your campaign emails.
- **Unique Opens**: Number of individual recipients who opened your campaign emails (counts only one open per recipient).
- **Clicks**: Total number of clicks on links within your campaign emails.
- **Unique Clicks**: Number of individual recipients who clicked on links within your campaign emails (counts only one click per recipient).
- **Bounces**: Number of campaign emails that failed to be delivered.
- **Complaints**: Number of complaints (e.g., emails marked as spam).
- **Unsubscribes**: Number of recipients who unsubscribed after receiving the campaign email.
- **Resubscriptions**: Number of recipients who resubscribed after previously unsubscribing.
- **Paused Subscriptions**: Number of recipients who have paused their subscriptions to your campaign emails.

These metrics provide a comprehensive view of your campaign's performance and help identify areas for optimization, allowing you to adjust strategies and improve future campaigns.

### How to Access Campaign Email Stats

You can access the **Campaign Email Statistics** by clicking the arrow icon:

![Advanced Settings Icon](./project-campaigns-stats-btn.webp)

For more information on how to use the **Campaign Email Statistics**, refer to the [Analytics Documentation](/docs/analytics).


## Advanced Settings

The **Advanced Settings** feature allows you to customize key email-sending options, such as configuring sender identities and reply-to addresses. 

You can access the **Advanced Settings** by clicking the gear icon:

![Advanced Settings Icon](./project-campaign-advanced-settings-btn.webp)

For a detailed guide on using the **Advanced Settings**, refer to the [Advanced Settings Documentation](/docs/projects/settings.html#advanced-settings).


