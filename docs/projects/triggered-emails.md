# Triggered Emails

Triggered emails are similar to transactional emails because they are also triggered from your backend (or a cron job). However, they are different because they are tied to a subscriber list. You can send triggered emails to the entire list or to specific email addresses. The emails will only be sent to the `active` subscribers on that list. If someone has unsubscribed, paused their subscription, or is not on the list, the email won't be sent.

For example, event notifications or weekly digest emails should be implemented using triggered emails. Users can `unsubscribe` from these emails or `pause their subscription`, which might significantly reduce unsubscribe rates. This is why an unsubscribe link is required in these emails. A pause subscription link is not required but is recommended.

If you want to create email automations, use triggered emails. For instance, you can implement onboarding sequences: a user signs up, you send a welcome email, a day later, a link to a tutorial, and three days later, another one. You can also send emails based on user behavior, such as sending a targeted email if a user hasn't completed an important action in your app.

You can find the triggered emails of a project under the `Triggered Emails` tab.

![A screenshot of a project's triggered emails.](./project-triggered-emails.png)

## Creating a Triggered Email

To create a new triggered email, press the `Create` button.

![A screenshot of a project's triggered emails - new button highlighted.](./project-triggered-emails-create-button.png)

Next, select a template category defined in your project's design system:

![A screenshot of a project's triggered emails - create: template category selection.](./project-triggered-emails-create-select-category.png)

Then, choose a template to start with:

![A screenshot of a project's triggered emails - create: template selection.](./project-triggered-emails-create-select-template.png)

Enter its name, subject line, and preview text:

![A screenshot of a project's triggered emails - create: enter data.](./project-triggered-emails-create-subject.png)

The next step is to select a subscriber list:

![A screenshot of a project's triggered emails - create: select subscriber list.](./project-triggered-emails-create-select-subscriber-list.png)

After that, you will see a summary page. Click "Launch Editor".

![A screenshot of a project's triggered emails - create: summary.](./project-triggered-emails-create-summary.png)

Finally, make changes in the drag-and-drop email editor:

![A screenshot of a project's triggered emails - create: edit.](./project-triggered-emails-create-editor.png)

When you're done, click "Save & Close". You can make changes later as well.

## Triggered Email Integration

Every triggered email in bluefox.email has a unique URL for sending the email. Send an HTTP request to this endpoint. You can generate sample code in multiple programming languages by clicking this icon:

![A screenshot of a triggered email card, with the code button highlighted.](./project-triggered-emails-code-button.png)

Copy the generated code to use it in your project:

![A screenshot of a triggered email's generated code, copy button highlighted.](./project-triggered-emails-code-dialog.png)

::: tip Keep in Mind!
1) You can send a triggered email to multiple recipients by sending an array of email addresses in the `emails` field of the data property in the request body.
2) Recipients can unsubscribe from triggered emails or pause their subscriptions. Providing an unsubscribe link is mandatory, so ensure you include an `unsubscribeLink` in your email.
:::

::: danger Security Warning
Your bluefox.email API key is included in the request `Authorization` header. Never send these requests from your frontend!
:::

Please see our [API docs](/docs/api/) for more details.

## Triggered Email Personalization

You can personalize triggered emails with [handlebars](https://handlebarsjs.com/). The data you send to the triggered email's endpoint determines the available variables. For example, you can send the hero unit's title and description:


```javascript
await fetch(yourEndpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
        emails: ['joe@doe.com', 'jane@doe.com'],
        data: {
            hero: {
              title: "Bluefox is GREAT",
              description: "You can send transactional emails, triggered emails, newsletters and promotional emails with the same software!!!"
            }
        }
    })
})
```

Since triggered emails are sent to a subscriber list, subscriber data, an unsubscribe link, and a pause subscription link are also included. You can use the following merge tags:
```
{{subscriber.name}}
{{subscriber.email}}
{{ubsubscribeLink}}
{{pauseSubscriptionLink}}
```

You can use any Handlebars variables in your email while editing. To do this, click on the edit icon on the card:

![A screenshot of a triggered email card, edit button highlighted.](./project-triggered-emails-edit-button.png)

Enter your variables using Handlebars syntax:

![A screenshot of a triggered email being edited, a merge tag is being added.](./project-triggered-emails-edit-merge-tag.png)

You can also use merge tags in the email's `subject line` and `preview text`!

![A screenshot of a triggered email, with a merge tag being used in the subject and the preview text.](./project-triggered-emails-edit-subject-merge-tag.png)

For more details on how to personalize your emails with merge tags and Handlebars, check out our [personalization guide](/docs/personalization).

