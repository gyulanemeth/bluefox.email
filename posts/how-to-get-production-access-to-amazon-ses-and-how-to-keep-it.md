---
title: How to Get Production Access to Amazon SES And How to Keep It
description: Tips to get production access to AWS SES and maintain it.

layout: post
category: tutorials

head:
  - - meta
    - name: description
      content: Tips to get production access to AWS SES and maintain it.
  - - meta
    - property: og:title
      content: How to Get Production Access to Amazon SES And How to Keep It
  - - meta
    - property: og:description
      content: Learn how to get production access to AWS SES and maintain it for excellent email deliverability.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/articles/how-to-get-production-access-to-aws-ses-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/posts/how-to-get-production-access-to-aws-ses
  - - meta
    - property: twitter:card
      content: summary_large_image
  - - meta
    - property: twitter:title
      content: How to Get Production Access to Amazon SES And How to Keep It
  - - meta
    - property: twitter:description
      content: Learn how to get production access to AWS SES and maintain it for excellent email deliverability.
  - - meta
    - property: twitter:image
      content: https://bluefox.email/assets/articles/how-to-get-production-access-to-aws-ses-share.png

lastUpdated: true
published: true
sidebar: false
---

# How to Get Production Access to Amazon SES And How to Keep It

::: warning WORK IN PROGRESS DOCUMENT
This is a draft document aiming getting feedback from experts.

Our goal is to provide a checklist for our customers & prospects about what they need to do in order to be good senders.

It's not a secret that later on, besides being a guide, this document shall serve marketing purposes as well.
:::

Amazon SES provides great deliverability for a great price. They understandably don't tolerate spammers, so it can be a pain to get production access for someone who haven't done it prevously. (In some cases, it's even a pain for people who got it several times.)

The obvious thing to say is: DO NOT SEND SPAM. Don't even send too many emails. You probably hate it, so do others.

AWS wants to make sure that you do everything possible from a technical point of view to decrease the likelihood of affecting their sender reputation negatively. These are the following things:
 - Verify your domain
 - Set up DKIM & DMARC
 - Set up a MAIL FROM domain
 - Set up a mechanism to handle bounces and complaints
   - Remove those addresses from your list
   - Create an internal suppression list
 - Use double opt-in when users sign up (you need to verify their email addresses)
 - Implement a subscription preferences page, on which they can unsubscribe from intividual lists, and from all at once
 - Include a clearly visible unsubscribe link in your emails (except for transactional emails that you must send in order to fulfill a functionality - eg.: forgot password email)
 - Implement "One-click unsubscribe" (RFC 8089)
 - Use captchas in your signup forms to decrease the likelyhood of bots signing up random people
 - Maintain a send queue (for example with Amazon SQS, RabbitMQ, or any other message queue)

It sounds a lot, but you should do these anyways to make sure that you maintain a healthy email list.

## What bluefox.email does for you

We built bluefox.email for genuine senders. Honestly, we don't want spammers to use our platform. That is why we decided to build bluefox as a "bring your own Amazon SES" platform.

From the quite extensive list above, we implemented the following things:
 - We provide webhooks for bounce & complaint notifications
   - We automatically put all bounced addresses to an internal suppression list
   - We also send notification emails about bounces and complaints
   - You can remove the affected email addresses from all list with a click of a button
 - We provide a subscription preferences page
   - Recipients can unsubscribe, pause their subscription, and resubscribe to individual lists
   - They can also pause all subscriptions or even unsubscribe from all lists
 - We provide sign-up forms with optional capchas
 - We provide a double opt-in mechanism
 - We automatically include List-Unsubscribe headers for "One-click unsubscribe"
 - For other than transactional emails, we include unsubscribe link to all email
 - And we maintain send queues. If for some reason, you would send more than your quota, your sends will be delayed.

It means, that if you use bluefox.email, these are automatically solved for you.

## What you need to do in your AWS account

Assuming you will use bluefox email, you will need to do the following things at your AWS account:
 - [Set up your sandbox at Amazon SES](./how-to-set-up-aws-ses)
   - Verify your sending domain - DKIM
   - Set up your MAIL FROM subdomain - MX record
   - Set up DMARC to reject all
 - [Set up bounce & complaint webhooks with Amazon SES & SNS](./how-to-handle-bounces-and-complaints-with-aws-ses-and-sns)
   - Create topics for bounces & complaints
   - Set up subscriptions that send notifications to our webhooks
   - Set up the created topics in your Sender Identity's Notifications.
 - Request production access. You might need to explain how you will be a good sender. Hopefully, this document helps with that.
   - In some cases, your request might be rejected, even though you check all the boxes. In that case, try to be persistent and explain again how you will be a good sender and what measures you take to maintain AWS' good sender reputation.

## How to be a responsible sender (How to keep your production access)

After you get prouduction access, you still need to make sure that you are a good sender.
 - Keep your bounce & complaint rates low.
   - AWS is very strict about it. For example, if your bounce rate hits a certain threshold, AWS will send you a "gentle" reminder that you need to decrease it quickly, otherwise you will loose your production access.
   - This is why handling bounces & complaints is very important
   - This is why you need to implement an internal supression list
   - And this is why it's best to implement "One-click" unsubscribe - it's better if your recipients can easily unsubscribe than hitting the spam button.
 - Do not oversend... DO NO BLAST!
   - try to send the right email to the right people at the right time. We are currently working on an automation builder that will help you with this.
 - Avoid buying lists, build your own lists.
   - There might be lot of non-existent emails on those lists (especiall if they are business email addresses, since there is always a fluctuation at companies -> when people leave, their email address is deleted.)

