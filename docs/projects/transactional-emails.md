# Transactional emails

Transactional emails are emails that are needed to be sent in order for some basic functionality to work. For example, registration or forgot password emails. If a user want's to register with their email address or they forgot their password, and want to reset it, then sending an email to that person is a must.

That is why users **can't unsubscribe** from transactional emails. Another consequence is, that **transactional emails are not associated with any subscriber lists**. They are directly sent to a specific email address, not to a list nor a subset of a list.

You can find the transactional emails of a project under the `Transactional Emails` tab.

![A screenshot of a project's transactional emails.](./project-transactionals.png)

## Creating a transactional email

In order to create a new transactional email, press the `Create` button.
![A screenshot of a project's transactional emails - new button highlighted.](./project-transactionals-create-button.png)

Then, select a template category. These template categories are defined in your project's design system.
![A screenshot of a project's transactional emails - create: select template category.](./project-transactionals-create-select-category.png)

After that, you will have to select a template to start from. These templates are also defined in your project's design system.

![A screenshot of a project's transactional emails - create: template selection.](./project-transactionals-create-select-template.png)

Enter it's name, subject line, and preview text. Note that you can [personalize](/docs/personalization) your subject line and preview text with [merge tags](/docs/personalization)!
![A screenshot of a project's transactional emails - create: enter data.](./project-transactionals-create-subject.png)

After that, you will see a summary page, press "Launch Editor".
![A screenshot of a project's transactional emails - create: summary.](./project-transactionals-create-summary.png)


Finally, make changes in the drag 'n' drop email editor:
![A screenshot of a project's transactional emails - create: edit.](./project-transactionals-create-editor.png)
And press "Save & Close" when you are done. You can make changes later as well.

## Transactional email integration

Every transactional email in bluefox.email has a unique URL, with which you can send that email. You just have to send an HTTP request to that endpoint. A sample code is generated in multiple programming languages if you click on the following icon:

![A screenshot of a transactional email card, with the code button highlighted.](./project-transactionals-code-button.png)

And then you can copy the code to use it in your project:
![A screenshot of a transactional email's generated code, copy button highlighted.](./project-transactionals-code-dialog.png)

::: danger Security warning
Keep in mind that one of your bluefox.email API keys is included in the request `Authorization` header. That is why you should never send these requests from your frontend!
:::

Please, see our [API docs](/docs/api/) for more details.

## Transactional email personalization

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

You can use any handlebars variables in your email, while editing. Click on the edit icon on the card:
![A screenshot of a transactional email card, edit button highlighted.](./project-transactionals-edit-button.png)

And enter your variables with Handlebars syntax:
![A screenshot of a transactional email being edited, a merge tag is being added.](./project-transactionals-edit-merge-tag.png)


And you can use merge tags in the email's `subject line` and `preview text` as well!

![A screenshot of a transactional email, with a merge tag being used in the subject and the preview text.](./project-transactionals-edit-subject-merge-tag.png)

For more, read our full-fledged guide about [personalization with merge tags](/docs/personalization) and Handlebars.
