# Subscriber lists (contacts)

In bluefox.email, you can have multiple subscriber lists (or email lists) associated to your project. Each project have separate lists. You can create as many lists as you want. Users will be able to subscribe, unsubscribe, or pause their subscription for every list separately.

You can find your project's subscribriber lists under the subscriber lists tab:
![Screenshot about the subscriber lists page](./project-subscriber-lists.png)

It's a good idea to create separate lists for separate topics, for example product updates, promotions, tips & tricks, etc.

If your list is public, then it will show up on the [subscriptions preferences](./subscription-preferences-page) page of your users. The subscription preferences page uses the title and the description of your lists. The public lists are denoted with the following icon:

![Screenshot about the subscriber lists page - private icon highlighted](./project-subscriber-lists-public-icon-highlighted.png)


Pausing subscription is a great thing, because it can radically decrease the unsubscribe rate.

When you use the `unsubscribeLink` and the `pauseSubscriptionLink` in your emails, those will lead you to the subscription preferences page, but if the user clicked on the second one, unsubscribe won't show up as an option.

Previously, I mentioned that you can have public list. As you might have thought, you can have private lists as well. They will not show up on the subscription preferences page. You can use them for testing purposes.

![Screenshot about the subscriber lists page - private icon highlighted](./project-subscriber-lists-private-icon-highlighted.png)

To see a preview of the subsctiption preferences page and upload you logo, click on the following button:
![Screenshot about the subscriber lists page - public icon highlighted](./project-subscriber-lists-subscription-preferences-page-button.png)

## Creating a Subscriber List

To create a new subscriber list, clieck on the create button:
![Screenshot about the subscriber lists page - create button highlighted](./project-subscriber-lists-create-button-highlighted.png)

In the dialog, you have to enter the name and the description of the list. These will appear in the subscriber preferences page, if the list is public.
![Screenshot about the subscriber lists page - create dialog](./project-subscriber-lists-create-dialog.png)
You have the option to upload a CSV file, read more about it in the next section.


## Import CSV, Export CSV

In the previous section, you saw that you can import a CSV while creating your email list. You can add subscribers to an existing list as well. Just open a list, and click on the "manage subscriber list" button:
![Screenshot about the subscriber lists page - manage subscriber list button highlighted.](./project-subscriber-lists-manage-subscriber-list-button-highlighted.png)

In the dialog, select the second tab, and you can import new contacts, or you can export the whole list as a CSV file:
![Screenshot about the subscriber lists page - import or export csv.](./project-subscriber-lists-import-export-csv.png)

The CSV file you import must contain a `name` and an `email` column.

## Subscriber statuses

**unverified** You can create your subscribers via an API call with an `unverified` status. It is useful if you implement (and you should) [double opt-in](#implement-double-opt-in). You can flip the `unverified` status to `active` when your user verifies their email address.

**active** Only active users will receive your triggered emails or campaigns. If you add a user on the UI (one-by-one or importing a CSV), they will have an `active` status.

**paused** Users can pause their subscription for a certain amount of time. Until they are paused, they won't receive emails sent to that email they paused.

**unsubscribed** When users unsubscribed from a list, they won't receive emails through that list anymore.

## Subscriber list integration

You can programmatically manage subscribers on your list. We provide you code snippets in various programming languages that you can use. Click on the list's "Code guide" button:
![Screenshot about the subscriber lists page - manage code guide button highlighted.](./project-subscriber-lists-manage-code-guide-button-highlighted.png)

Just copy and modify the code in your preferred programming language:
![Screenshot about the subscriber lists page - code guide dialog.](./project-subscriber-lists-code-guide-dialog.png)


## Implement double opt-in

Keep in mind, that you should always implement [double opt-in](/best-practices/double-opt-in), meaning, that you only add your users to subscriber lists as an active subscriber, when they verified their email address!

If you add your users to multiple lists when they sing up to your service:
 - send them a verification email (transactional email) with a unique link
 - if they click on the link (and accepted your terms and conditions), you can add them to the subsciber lists as `active` subscribers

If you just create a newsletter sign up, then
 - you can add them to your list as an `unverified` subscriber
 - send them a verification email (transactional email) with a unique link
 - when they click on it, you can flip their status to `active`
