# Transactional emails

Transactional emails are emails that are needed to be sent in order for some basic functionality to work. For example, registration or forgot password emails. If a user want's to register with their email address or they forgot their password, and want to reset it, then sending an email to that person is a must.

That is why users **can't unsubscribe** from transactional emails. Another consequence is, that **transactional emails are not associated with any subscriber lists**. They are directly sent to a specific email address, not to a list nor a subset of a list.

You can find the transactional emails of a project under the `Transactionals` tab.

![A screenshot of a project's transactional emails.](https://placehold.co/800x600/EEE/31343C)

## Creating a transactional email

In order to create a new transactional email, press the `Create` button.
![A screenshot of a project's transactional emails - new button highlighted.](https://placehold.co/800x600/EEE/31343C)

After that, you will have to select a template to start from:

![A screenshot of a project's transactional emails - create: template selection.](https://placehold.co/800x600/EEE/31343C)

Enter it's name, subject line, and preview text:
![A screenshot of a project's transactional emails - create: enter data.](https://placehold.co/800x600/EEE/31343C)

Finally, make changes in the drag 'n' drop email editor:
![A screenshot of a project's transactional emails - create: edit.](https://placehold.co/800x600/EEE/31343C)

## Integration

Every transactional email in bluefox.email has a unique URL, with which you can send that email. You just have to send an HTTP request to that endpoint. A sample code is generated if you click on the following icon:

![A screenshot of a transactional email card, with the code button highlighted.](https://placehold.co/300x300/EEE/31343C)

And then you can copy the code to use it in your project:
![A screenshot of a transactional email card, with the code button highlighted.](https://placehold.co/800x600/EEE/31343C)

::: danger Security warning
Keep in mind that one of your bluefox.email API keys is included in the request `authorization` header. That is why you should never send these requests from your frontend!
:::

Please, see our [API docs](/docs/api) for more details.

## Personalization

You can personalize your transactional emails with [handlebars](https://handlebarsjs.com/). The data available is dependent on what you send to the transactional email's endpoint. You can include any custom data on the data field of the request body. For example, you can send your user's name to our endpoint:

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

You can use any handlebars variables in your email, while editing:
![A screenshot of a transactional email being edited, a merge tag is being added.](https://placehold.co/800x600/EEE/31343C)

And you can use merge tags in the email's `subject line` and `preview text` as well!

![A screenshot of a transactional email, with a merge tag being used in the subject and the preview text.](https://placehold.co/800x600/EEE/31343C)
