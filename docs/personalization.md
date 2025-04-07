# Email personalization (merge tags)

Email personalization is essential for modern companies. You need to grab your customers' attention, otherwise they won't click and won't open your next email. If you send nice, personalized emails to your users, that increases the likelyhood that they will love your emails!

In bluefox.email, we use [handlebars](https://handlebarsjs.com/) for personalization. It means, that you will be able to put merge tags into your emails with the **&#123;&#123;mustageSyntax&#125;&#125;**.

There are two primary ways to refer to data from your emails:
 - send the data with your request
 - use data from bluefox.email

A straightforward was of personalizing an emails is that you send data with your API call. You can only do it with transactional and triggered emails. For example, if you want to send your users favorite animal with your request, you put a `favoriteAnimal` property to your request:

```
...
"data": {
  "favoriteAnimal": "fox"
},
...
```

Within your email, you can use the **&#123;&#123;favoriteAnimal&#125;&#125;** merge tag:
![Simple merge tag example in the editor.](./personalization-01.png)

And as you could have guessed it, the sent out email will look like this:
![Simple merge tag example in the inbox.](./personalization-02.png)

You can also personalize your emails with data stored in bluefox.email. You can read about it in the two upcoming sections: "Built-in merge-tags" and "Contact properties".

## Built-in merge-tags

There are a few built-in variables that you can use in your emails without sending them in your request. It means that these variables can also be used in campaigns.

### Contact's email address
The first example is the contact's email address:

```
{{contact.email}}
```
This variable is always available in all emails.

### Unsubscribe link
Every non-transactional email must have an unsubscribe link. You can use the following merge tag to put an unsubscribe link into your email:
```
{{unsubscribeLink}}
```
This variable is not available in transactional emails.

### Pause subscription link
Similarly, you can put a [pause subscription](/email-best-practices-for-saas/unsubscribe-and-pause-subscription) link into the emial. When users click on this one, the unsubscribe option will be hidden on the subscription preferences page.
```
{{pauseSubscriptionLink}}
```
This variable is not available in transactional emails.


## Contact properties
Contact properties will also always be available without sending them in your request.

As you previously could see, there is a built-in contact property, and it's the contact's email address:
```
{{contact.email}}
```
Besides this, all of the contact properties are optional. You can [add or remove](/docs/projects/settings#contact-properties) as many as you want, and you can update the property values via [API calls](/docs/api/subscriber-list-management#update-subscriber) or you can edit them on the UI. // TODO INSERT LINK

You can reach the contact properties via the `contact` object, as you could previously see. So for example, if you defined a `firstName` property for your contacts, you will be able to refer it with the following merge tag:

```
{{firstName}}
```

## Text personalization

## Button personalization

## Image personalization

Dynamic image as well!

## Conditionals

## Loops

## Handlebars extensions
