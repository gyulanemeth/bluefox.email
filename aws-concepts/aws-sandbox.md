---
title: Amazon SES Sandbox | BlueFox Email
description: Learn about the AWS SES sandbox environment, its purpose, limitations, and how to request production access for your email sending needs.
thumbnail: /assets/glossary/aws-concepts-glossary.png
sidebar: false
layout: post
category: glossary

head:
  - - meta
    - name: description
      content: Learn about the AWS SES sandbox environment, its purpose, limitations, and how to request production access for your email sending needs.
  - - meta
    - property: og:title
      content: Amazon SES Sandbox | BlueFox Email
  - - meta
    - property: og:description
      content: Learn about the AWS SES sandbox environment, its purpose, limitations, and how to request production access for your email sending needs.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/aws-concepts-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/aws-concepts/aws-sandbox
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Amazon SES Sandbox | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn about the AWS SES sandbox environment, its purpose, limitations, and how to request production access for your email sending needs.
---

# Amazon SES Sandbox

The **AWS SES sandbox** is a restricted environment where all new [Amazon SES](/aws-concepts/aws-ses) accounts are placed initially. This controlled environment allows AWS to protect its email sending infrastructure while giving new users the opportunity to familiarize themselves with the service under specific limitations.

## Key Features of the Amazon SES Sandbox

- **Verified Recipients Only**: Can only send emails to verified email addresses or domains
- **Sending Limits**: Restricted to [200 emails per 24 hours](/aws-concepts/aws-sending-quota)
- **Sending Rate**: Limited to [1 email per second](/aws-concepts/aws-sending-rate)
- **SMTP Access**: Full access to SMTP interface despite restrictions
- **Production Request**: Requires manual approval to exit sandbox status

## How the Amazon SES Sandbox Works

New AWS accounts start with their SES service in sandbox mode. In this state, you can only send emails to addresses you've verified through the SES console or API. This verification process involves sending a confirmation link to each recipient email address or proving ownership of a domain through [DNS](/email-sending-concepts/dns) verification.

While in the sandbox, you face two significant restrictions: a daily [sending quota](/aws-concepts/aws-sending-quota) of [200 emails per 24-hour period](https://docs.aws.amazon.com/ses/latest/dg/request-production-access.html) and a [sending rate](/aws-concepts/aws-sending-rate) limit of [1 email per second](https://docs.aws.amazon.com/ses/latest/dg/manage-sending-quotas.html). These constraints make the sandbox suitable for development and testing but inadequate for production use cases with larger sending needs.

The sandbox allows you to test all SES features, including [bounce](/email-sending-concepts/bounce) and [complaint](/email-sending-concepts/email-complaints) handling, event tracking, and integration with other AWS services. However, your sending metrics are closely monitored, as maintaining good sending practices is a prerequisite for graduating to production status.

## Why Amazon Implements the SES Sandbox

The sandbox environment serves as a **protective mechanism** for both AWS and its users. By restricting initial sending capabilities, AWS can prevent new accounts from being used for sending **unwanted bulk emails**. This approach **maintains the reputation of AWS IP addresses** and ensures **high deliverability rates** for all SES users.

The sandbox period provides new users time to become familiar with **email sending best practices** and helps them establish proper sending patterns. It also enables AWS to **evaluate the sending behavior** of new accounts before granting increased capabilities. This gradual approach to granting sending privileges aligns with email industry practices, where **sender reputation must be earned** through consistent, responsible behavior.

## Understanding AWS SES Sandbox Exit Requirements

Moving from sandbox to production status requires demonstrating to AWS that you have legitimate email sending needs and will follow responsible sending practices. AWS evaluates several factors when reviewing production access requests.

Your request should include detailed information about your sending use case, including the types of emails you plan to send (transactional, marketing, notifications) and how recipients have opted to receive your messages. AWS looks for evidence that you're following [email authentication](/email-sending-concepts/email-authentication) best practices and have mechanisms in place to process [bounces](/email-sending-concepts/bounce) and [complaints](/email-sending-concepts/email-complaints).

The quality of your content also factors into the evaluation. AWS examines whether your emails provide value to recipients and adhere to professional standards. This includes having proper unsubscribe mechanisms and clear sender identification. Demonstrating that you understand and can maintain **low bounce and complaint rates** ([below 5% and 0.1% respectively](https://docs.aws.amazon.com/ses/latest/dg/faqs-enforcement.html)) significantly improves your chances of approval.

## Frequently Asked Questions About AWS SES Sandbox

### How long does my account have to stay in the sandbox?

There is no predetermined time period for an account to remain in the sandbox. You can request production access as soon as your account is created, although demonstrating a history of good sending practices may improve your chances of approval. AWS typically reviews production access requests within 24-48 hours.

### Can I still use SES effectively while in the sandbox?

Yes, the sandbox environment is fully functional for development and testing purposes. You can implement and test all SES features including bounce handling, event tracking, templates, and integration with other AWS services. The only limitations are the sending restrictions and the requirement to verify recipient addresses.

### How do I verify a recipient email address?

To verify an individual email address, navigate to the "Email Addresses" section of the AWS SES console and select "Verify a New Email Address." Enter the email address and AWS will send a verification link to that address. The owner must click the link to complete verification. This process must be repeated for each recipient address while in the sandbox.

### What happens if my production access request is denied?

If AWS denies your production access request, they will provide specific reasons for the denial. Common reasons include incomplete information about your use case, signs of potentially problematic sending patterns, or concerns about recipient consent. You can address these issues and submit a new request. Working with AWS Support can help clarify the specific improvements needed.

## Related Content

- [AWS SES (Simple Email Service)](/aws-concepts/aws-ses)
- [AWS SES Sending Quotas](/aws-concepts/aws-sending-quota)
- [AWS SES Sending Rates](/aws-concepts/aws-sending-rate)
- [AWS SNS (Simple Notification Service)](/aws-concepts/aws-sns)
- [Email Bounces](/email-sending-concepts/bounce)
- [Email Complaints](/email-sending-concepts/email-complaints)
- [Email Authentication](/email-sending-concepts/email-authentication)
- [DNS Records](/email-sending-concepts/dns)

<GlossaryCTA />
