# Triggered emails

Triggered emails are similar to transactional emails in the sense, that they are also triggered from your backend (or your cron job), but it's very different, because it is tied to a subscriber list. You can send triggered emails to the whole list, or only to certain email addresses. The emails will only sent to the `active` subscribers on that list. (So if someone unsubscribed or paused their subscription, or not on the list, the email won't be sent.)

For example, an event notification email or a weekly digest email should be implemented by triggered emails. The point is that users can `ubsubscribe` from these emails or they can even `pause their subscription` for a while, which might decrease unsubscribe rate radically. This is why an unsubscribe link is required in these emails. A pause subscription link is not required, but advised.

You can find the triggered emails of a project under the `Triggered emails` tab.

![A screenshot of a project's triggered emails.](https://placehold.co/800x600/EEE/31343C)

## Creating a triggered email

In order to create a new triggered email, press the `Create` button.
![A screenshot of a project's triggered emails - new button highlighted.](https://placehold.co/800x600/EEE/31343C)

After that, you will have to select a template to start from:

![A screenshot of a project's triggered emails - create: template selection.](https://placehold.co/800x600/EEE/31343C)

Enter it's name, subject line, and preview text:
![A screenshot of a project's triggered emails - create: enter data.](https://placehold.co/800x600/EEE/31343C)

The next step is to select a subscriber list:
![A screenshot of a project's triggered emails - create: select subscriber list.](https://placehold.co/800x600/EEE/31343C)

Finally, make changes in the drag 'n' drop email editor:
![A screenshot of a project's triggered emails - create: edit.](https://placehold.co/800x600/EEE/31343C)

## Integration

Every triggered email in bluefox.email has a unique URL, with which you can send that email. You just have to send an HTTP request to that endpoint. A sample code is generated if you click on the following icon:

![A screenshot of a triggered email card, with the code button highlighted.](https://placehold.co/300x300/EEE/31343C)

And then you can copy the code to use it in your project:
![A screenshot of a triggered email's generated code, copy button highlighted.](https://placehold.co/800x600/EEE/31343C)

::: danger Security warning
Keep in mind that one of your bluefox.email API keys is included in the request `authorization` header. That is why you should never send these requests from your frontend!
:::

Please, see our [API docs](/docs/api) for more details.

## Personalization

You can personalize your triggered emails with [handlebars](https://handlebarsjs.com/). The data available is dependent on what you send to the triggered email's endpoint. You can include any custom data on the data field of the request body. For example, you can send your user's name to our endpoint:

```javascript
await fetch(yourEndpoint, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
        email: 'joe@doe.com',
        data: {
            name: 'Joe Doe'
        }
    })
})
```

Since triggered emails are sent to a subscriber list, subscriber data, unsubscribe link, and pause subscription link are also included. You can use the following merge tags:
```
{{subscriber.name}}
{{subscriber.email}}
{{ubsubscribeLink}}
{{pauseSubscriptionLink}}
```

You can use any handlebars variables in your email, while editing:
![A screenshot of a triggered email being edited, a merge tag is being added.](https://placehold.co/800x600/EEE/31343C)

And you can use merge tags in the email's `subject line` and `preview text` as well!

![A screenshot of a triggered email, with a merge tag being used in the subject and the preview text.](https://placehold.co/800x600/EEE/31343C)


 - description + best practices
 - triggered by your backend, but users can unsubscribe
 - sent to one or multiple users (even all of them), only if they are active subscribers to the associated email list
 - data comes from your backend, merged into the template (handlebars)
 - examples: event notification
 - unsubscribe is a must-have
 - pause subscription is optional
 - how to integrate
 - merge tags
