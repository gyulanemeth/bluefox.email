---
title: Subscription Preferences Page | bluefox.email documentation
description: Learn how to configure and use the subscription preferences page in bluefox.email, allowing users to manage their subscriptions, including pausing or unsubscribing.
head:
  - - meta
    - name: description
      content: Learn how to configure and use the subscription preferences page in bluefox.email, allowing users to manage their subscriptions, including pausing or unsubscribing.
  - - meta
    - property: og:title
      content: Subscription Preferences Page | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to configure and use the subscription preferences page in bluefox.email, allowing users to manage their subscriptions, including pausing or unsubscribing.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/subscription-preferences-page
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Subscription Preferences Page | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn how to configure and use the subscription preferences page in bluefox.email, allowing users to manage their subscriptions, including pausing or unsubscribing.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Subscription Preferences Page

We provide a subscription preferences page where users can manage their subscriptions. On this page, users have the ability to unsubscribe, resubscribe, or pause their subscriptions. In triggered emails and campaigns, we provide two merge tags: `unsubscribeLink` and `pauseSubscriptionLink`. Both links direct users to the manage subscription page, but when using the `pauseSubscriptionLink`, the unsubscribe options are removed from the page.

::: tip
The "pause subscription" feature is an effective way to reduce churn.
:::

You can access the subscription preferences page configuration by clicking the button on the subscriber lists tab:

![Subscriber lists - subscription preferences button.](./project-subscriber-lists-subscription-preferences-page-button.webp)

Each project has one subscription preferences page. On this page, you can set your logo, and all public subscriber lists will be visible to the user. The items listed are subscriber lists, with the title displaying the name of the list. Additionally, the description of each subscriber list is shown, allowing you to provide more context to your users.

![Subscriber lists - subscription preferences dialog.](./project-subscriber-lists-subscription-preferences-page-dialog.webp)

As shown above, there are different states in the user-subscriber list relationship: unsubscribed, paused, and subscribed. Based on these states, different actions are available to the user.

Below is an example of a real subscription preferences page after clicking on the `unsubscribeLink`:

![Subscription preferences page](./subscription-preferences-page.webp)

Here is the same page after clicking the `pauseSubscriptionLink`:

![Subscription preferences page - pause only.](./subscription-preferences-page-pause-only.webp)
