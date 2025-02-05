---
title: Welcome to the bluefox.email documentation
description: Learn how to manage transactional emails, triggered emails, and marketing campaigns for your SaaS application using AWS SES and bluefox.email's advanced tools.
head:
  - - meta
    - name: description
      content: Learn how to manage transactional emails, triggered emails, and marketing campaigns for your SaaS application using AWS SES and bluefox.email's advanced tools.
  - - meta
    - property: og:title
      content: Welcome to the bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to manage transactional emails, triggered emails, and marketing campaigns for your SaaS application using AWS SES and bluefox.email's advanced tools.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/
  - - meta
    - property: og:type
      content: website
  - - meta
    - property: twitter:card
      content: summary_large_image
  - - meta
    - property: twitter:title
      content: Welcome to the bluefox.email documentation
  - - meta
    - property: twitter:description
      content: Learn how to manage transactional emails, triggered emails, and marketing campaigns for your SaaS application using AWS SES and bluefox.email's advanced tools.
  - - meta
    - property: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---


# Welcome to the bluefox.email documentation

Welcome to the official documentation for **bluefox.email**! This guide is your go-to resource for understanding and using bluefox.email to manage all types of email communications for your SaaS application, from transactional emails, through automations via triggered emails to marketing campaigns.

## What is bluefox.email and how it works

Bluefox.email makes it easy to handle all your email communications, from transactional emails and triggered notifications to marketing campaigns, in one place. With our design systems, your emails will look great and function properly across all email clients, including challenging ones like Outlook. You can also rely on bluefox.email to manage your sending queues, ensuring your emails are sent smoothly and efficiently. Plus, with AWS SES integration using your account, you get a reliable and scalable infrastructure for all your email needs.

## Projects

In bluefox.email, [projects](./projects/) enable you to manage transactional emails, triggered emails, and campaigns (such as newsletters and promotions) of your SaaS application. Each project requires setting up a sending email address and AWS credentials to send emails via AWS SES. Projects are linked to a design system and include features like a subscription preferences page and subscriber lists, helping you organize and customize your email strategies effectively.

## Transactional vs. triggered vs. campaign Emails

- **[Transactional Emails](./projects/transactional-emails)**: These are automated emails sent in response to user actions, such as account creation, password resets, or purchase confirmations. They are critical for providing a seamless user experience.

- **[Triggered Emails](./projects/triggered-emails)**: Similar to transactional emails but more focused on user engagement, triggered emails are sent based on user behavior or predefined conditions. Examples include onboarding sequences, reminders, and re-engagement emails.

- **[Campaign Emails](./projects/campaigns)**: These are typically marketing emails sent to a broader audience at scheduled intervals. Campaigns can include newsletters, promotional offers, and product announcements.



## Design Systems

Our [design systems](./design-systems/) feature enables you to create beautiful, responsive emails that are consistent with your brand. With pre-built templates and customizable components, you can easily craft emails that look professional across all devices and email clients. Whether you're designing transactional emails or marketing campaigns, our design tools provide the flexibility and ease of use you need.

## Works with AWS SES

Our platform, bluefox.email, uses your AWS SES (Amazon Simple Email Service) for reliable and scalable email delivery. You’ll need to [configure your AWS credentials](/docs/projects/settings.html#aws-credentials) within each project, allowing you to leverage Amazon’s infrastructure while using bluefox.email’s advanced features to manage and customize your email communications.

::: tip Note:
We plan to release a detailed article on how to optimize your setup with AWS SES soon.
:::

## Sending emails via API

With bluefox.email, you can send transactional or triggered emails directly via our [API](./api/). Our well-documented API endpoints make it simple to automate your email workflows, whether you're sending a password reset email, a notification, or a tailored onboarding sequence. Integration is straightforward, allowing you to quickly implement email functionality within your SaaS application.

## Personalization with Handlebars
Our platform's [personalization](./personalization) features, powered by [Handlebars templating](https://handlebarsjs.com/), allow you to dynamically insert user-specific data into your emails and utilize powerful tools like loops and conditionals. This enables you to create highly customized content based on each recipient's attributes or behavior.

For example, you can use loops to list multiple items, such as recent purchases or recommended products, within an email. Conditionals allow you to tailor the message based on specific user criteria, such as displaying a different message for first-time users versus returning customers. These features make it easy to create engaging, relevant emails that resonate with your audience and drive better interaction.

## Analytics and reporting

Understanding the performance of your emails is crucial, and bluefox.email provides comprehensive [analytics](/docs/analytics) to help you do just that. Track key metrics such as open rates, click rates, bounce rates, and complaints. We also handle bounces and complaints automatically, ensuring that your email list remains healthy and that your emails reach the intended recipients.
