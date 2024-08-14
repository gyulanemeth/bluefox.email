# Campaigns

Unlike transactional and triggered emails, campaigns are not sent by your backend. Campaigns can be scheduled to a specific time or you can send it immediately. All the content is edited within bluefox email. Typical examples are newsletters, promotional emails, or occasional announcements.

Campaigns are sent to the `active` subscribers on a list. Since campaigns are tied to a subscriber list, they must contain an unsubscribe link and optionally a pause subscription link.

You can find the campaigns of a project under the `Campaigns` tab.

![A screenshot of a project's campaigns.](./project-campaigns.png)

## Creating a campaign

In order to create a new campaign, press the `Create` button.
![A screenshot of a project's campaigns - new button highlighted.](./project-campaigns-create-button.png)

After that, you will have to select a template to start from:

![A screenshot of a project's campaigns - create: template selection.](./project-campaign-create-select-category.png)

Enter it's name, subject line, and preview text:
![A screenshot of a project's campaigns - create: enter data.](./project-campaign-create-select-template.png)

Enter its name, subject line, preview text, and select a subscriber list:
![A screenshot of a project's campaigns - create: select subscriber list.](./project-campaign-create-subject.png)

After that, you will see a summary page. Click "Launch Editor".

![A screenshot of a project's triggered emails - create: summary.](./project-campaign-create-summary.png)

Finally, make changes in the drag 'n' drop email editor:
![A screenshot of a project's campaigns - create: edit.](./project-campaign-create-editor.png)

When you are done, you can schedule your campaign, or you can send it immediately:
![A screenshot of a campaign - schedule and send button highlighted.](./project-campaign-schedule.png)

## Personalization

Since a campaigns is sent to a subscriber list, subscriber data, unsubscribe link, and pause subscription link are also included. You can use the following merge tags:
```
{{subscriber.name}}
{{subscriber.email}}
{{ubsubscribeLink}}
{{pauseSubscriptionLink}}
```

You can use any handlebars variables in your email while editing. Click on the edit icon on the card:
![A screenshot of a campaign card, edit button highlighted.](./project-campaign-edit-button.png)

You can use these handlebars variables in your email, while editing:
![A screenshot of a campaign being edited, a merge tag is being added.](./project-campaign-edit-merge-tag.png)

And you can use merge tags in the email's `subject line` and `preview text` as well!

![A screenshot of a campaign, with a merge tag being used in the subject and the preview text.](./project-campaign-edit-subject-merge-tag.png)

For more details, read our guide on [personalization with merge tags](/docs/personalization) and Handlebars.

## Campaign states

There are five states of a campaign: draft, scheduled, being sent (or the scheduled time is only a few minutes away), sent, and archived.

In each state, different actions are available, and some of them are disabled.

Draft campaigns can be edited, scheduled, and sent:
![Campaign - draft.](./project-campaign-draft.png)

Scheduled campaigns have the following actions: re-schedule, cancel send, send now. Scheduled campaigns cannot be edited nor deleted!
![Campaign - scheduled.](./project-campaign-scheduled.png)

Campaigns that are being sent currently (or the send time is a few minutes away) should not be modified, so all of their actions are disabled.
![Campaign - being sent.](./project-campaign-being-sent.png)

Sent campaigns can be archived, and stats should show up:
![Campaign - sent.](./project-campaign-sent.png)

Archived campaigns can be restored. It means that they become draft again.s
![Campaign - archived.](./project-campaign-archived.png)
