# Campaigns

Unlike transactional and triggered emails, campaigns are not sent by your backend. Campaigns can be scheduled to a specific time or you can send it immediately. All the content is edited within bluefox email. Typical examples are newsletters, promotional emails, or occasional announcements.

Campaigns are sent to the `active` subscribers on a list. Since campaigns are tied to a subscriber list, they must contain an unsubscribe link and optionally a pause subscription link.

You can find the campaigns of a project under the `Campaigns` tab.

![A screenshot of a project's campaigns.](./project-campaigns.png)

## Creating a campaign

In order to create a new campaign, press the `Create` button.
![A screenshot of a project's campaigns - new button highlighted.](./project-campaigns-create-button.png)

After that, you will have to select a template to start from:

![A screenshot of a project's campaigns - create: template selection.](https://placehold.co/800x600/EEE/31343C)

Enter it's name, subject line, and preview text:
![A screenshot of a project's campaigns - create: enter data.](https://placehold.co/800x600/EEE/31343C)

The next step is to select a subscriber list:
![A screenshot of a project's campaigns - create: select subscriber list.](https://placehold.co/800x600/EEE/31343C)

After that, you can schedule your campaign:
![A screenshot of a project's campaigns - create: schedule.](https://placehold.co/800x600/EEE/31343C)

Finally, make changes in the drag 'n' drop email editor:
![A screenshot of a project's campaigns - create: edit.](https://placehold.co/800x600/EEE/31343C)

## Personalization

Since a campaigns is sent to a subscriber list, subscriber data, unsubscribe link, and pause subscription link are also included. You can use the following merge tags:
```
{{subscriber.name}}
{{subscriber.email}}
{{ubsubscribeLink}}
{{pauseSubscriptionLink}}
```

You can use these handlebars variables in your email, while editing:
![A screenshot of a campaign being edited, a merge tag is being added.](https://placehold.co/800x600/EEE/31343C)

And you can use merge tags in the email's `subject line` and `preview text` as well!

![A screenshot of a campaign, with a merge tag being used in the subject and the preview text.](https://placehold.co/800x600/EEE/31343C)

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
