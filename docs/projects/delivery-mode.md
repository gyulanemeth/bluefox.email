---
title: Delivery Modes | bluefox.email documentation
description: Learn about delivery modes in bluefox.email. Start sending emails instantly in sandbox mode without AWS setup, verify your domain for expanded testing, and scale to unrestricted production delivery.
head:
  - - meta
    - name: description
      content: Learn about delivery modes in bluefox.email. Start sending emails instantly in sandbox mode without AWS setup, verify your domain for expanded testing, and scale to unrestricted production delivery.
  - - meta
    - property: og:title
      content: Delivery Modes | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn about delivery modes in bluefox.email. Start sending emails instantly in sandbox mode without AWS setup, verify your domain for expanded testing, and scale to unrestricted production delivery.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/delivery-mode
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Delivery Modes | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn about delivery modes in bluefox.email. Start sending emails instantly in sandbox mode without AWS setup, verify your domain for expanded testing, and scale to unrestricted production delivery.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Delivery Modes

BlueFox Email offers flexible delivery modes that let you start sending emails immediately and scale when ready. Every new project begins in **sandbox mode**, allowing you to send your first email within minutes with some restrictions. When you're ready for unrestricted sending, you can transition to **production mode**. Of course, if you still prefer to use AWS SES directly, you can do that too without any delay or restrictions.

## Sandbox Mode

Whenever you create a new project in BlueFox Email, it starts in **sandbox mode**. 

![A screenshot of the project delivery mode settings.](./project-delivery-mode-sandbox.webp)

This mode is designed to help you get started quickly without needing to set up anything. You can send emails right away, but there are a few limitations to be aware of:

- You can only send emails up to 5 verified email addresses. These emails will be sent through `no-reply@bluefoxemailsandbox.com`. You can verify your domain within BlueFox Email project settings to send to your domain.
  ![A screenshot of the project sandbox settings.](./project-delivery-mode-verify-domain.webp)

- You can send 100 emails per day.
- Lower throughput (1 email/sec).

Sandbox mode is perfect for testing and development. It allows you to explore BlueFox Email's features without any initial setup. You can verify your email addresses and domains directly within BlueFox Email, making it easy to get started.

## Production Mode

When you're ready to send emails without restrictions, you can request to move your project to **production mode**. This mode lifts the limitations of sandbox mode, allowing you to send emails to any address and at higher volumes. To transition to production mode, you need to verify your domain and request production access. For application instructions, click the button below here in your project settings.
![A screenshot of the project delivery mode settings with the request production access button highlighted.](./project-delivery-mode-request-production-access.webp)

When you request production access, you'll be asked a few questions about your use case and sending practices.

![A screenshot of the project delivery mode settings with production mode selected.](./project-delivery-mode-production-form.webp)

Answer the questions honestly, and we will review your request as soon as possible.

Once your project is approved for production mode, you can confirm that with this badge here at the top of your project.

![A screenshot of the project delivery mode settings with production mode badge.](./project-delivery-mode-production-badge.webp)

Here is what you can do in production mode:

- Send emails to any address.
- No sending limits.
- Higher throughput
- Use your own domain.
- Add identities (domains and emails) directly in your project settings.

## Maintaining Production Access

But make sure that you maintain good sending practices. 

You should maintain:
- A low bounce rate (below 2.5%).
- A low complaint rate (below 0.05%).

If your bounce or complaint rates exceed these thresholds, BlueFox Email may suspend your project. Now of course, we will notify you in advance when you are about to reach these limits.

You can always check your bounce and complaint rates in the [project dashboard](/docs/projects/dashboard.md).

![A screenshot of the project dashboard showing bounce and complaint rates.](./project-delivery-mode-bounce-complaint-rates.webp)

## Using AWS SES Directly

If you prefer to use AWS SES directly without any restrictions, you can do so by configuring your AWS credentials in your project settings. This allows you to send emails through your own AWS SES account, giving you full control over your sending limits and practices.

![A screenshot of the project AWS settings.](./project-delivery-mode-aws-settings.webp)

This option is ideal for users who already have an established AWS SES setup and want to leverage BlueFox Email's features while using their own SES account. You can follow the steps in the [project settings documentation](/docs/projects/settings.md) to configure your AWS credentials.

### AWS Credentials

Our platform sends emails using your AWS SES, ensuring high deliverability and preventing spammers from using our platform.

:::info Note
For AWS SES to work smoothly with **bluefox.email**, you’ll need at least these permissions: 

`ses:SendEmail`, `ses:SendRawEmail`, `ses:ListIdentities`, `ses:GetSendQuota`

This is the minimum set needed to send emails, verify identities, and keep an eye on your send limits.
:::

First, set up your AWS `Access Key ID`, `Secret Access Key`, `Sender Identities`, `AWS region`, and `sending limit`.

![A screenshot of a project settings AWS credentials section.](./project-settings-aws.webp)

The access key must be able to send emails via SES from the region and the sending email you set up. The sending limit should be lower or equal to the actual AWS SES sending limit. Keep in mind, that your sending limit in "sandbox" is only 1 per second!


::: tip Your AWS Credentials Are Secure
We store your credentials encrypted, so even in the very unlikely event of data leakage, attackers won't be able to use your credentials.
:::