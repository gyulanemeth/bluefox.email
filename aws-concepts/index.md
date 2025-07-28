---
title: AWS Concepts | BlueFox Email
description: Learn about AWS concepts (A-Z) focusing on technologies related to email sending.
thumbnail: /assets/glossary/aws-concepts-glossary.png

sidebar: false
prev: false
next: false

datePublished: "2025-06-30"
dateModified: "2025-07-28"

head:
  - - meta
    - name: description
      content: Learn about AWS concepts (A-Z) focusing on technologies related to email sending.
    - property: og:title
      content: AWS Concepts | BlueFox Email
  - - meta
    - property: og:description
      content: Learn about AWS concepts (A-Z) focusing on technologies related to email sending.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/aws-concepts-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/aws-concepts/
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: AWS Concepts | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn about AWS concepts (A-Z) focusing on technologies related to email sending.
---

# AWS Concepts

Welcome to the BlueFox Email AWS glossary! Here you'll find explanations for AWS services and concepts related to email sending and management.


## IAM (Identity and Access Management)

### IAM (Identity and Access Management)

**AWS IAM** (Identity and Access Management) is a web service that provides centralized control over authentication and authorization for AWS resources, 
enabling secure access management.

[Read more](/aws-concepts/iam)

### IAM Permissions

**AWS IAM Permissions** define the specific actions entities can perform on AWS resources, controlling access to services and resources through policy documents.

[Read more](/aws-concepts/iam-permissions)

### IAM Role

**AWS IAM Role** is an identity that defines permissions for AWS services or users to access resources in a secure, temporary way without sharing long-term credentials.

[Read more](/aws-concepts/iam-role)

## SES (Simple Email Service)

### SES (Simple Email Service)

**Amazon SES** is a cloud-based email sending service designed to help digital marketers and application developers send marketing, notification, and transactional emails.

[Read more](/aws-concepts/ses)

### SES Raw Email Sending

**Amazon SES Raw Email Sending** is an advanced method that lets you send fully customized emails, including complex MIME content, attachments, and custom headers, giving you complete control over the email format.

[Read more](/aws-concepts/ses-raw-email-sending)

### SES Verified Identities

**AWS SES Verified Identities** are domains or email addresses that you've proven ownership of and are authorized to send emails from using Amazon SES. Verification is essential for sender authenticity and preventing spoofing or abuse.

[Read more](/aws-concepts/ses-verified-identity.md)


### SES Production Access

**Amazon SES Production Access** is the unrestricted operational state for AWS SES accounts that removes sandbox limitations and enables sending to any recipient with higher volume capabilities.

[Read more](/aws-concepts/ses-production-access)

### SES Sandbox

The **Amazon SES sandbox** is a restricted environment where all new SES accounts begin, allowing exploration of SES capabilities while limiting sending to verified email addresses only.

[Read more](/aws-concepts/ses-sandbox)

### SES Sending Quotas

**Amazon SES sending quotas** define the number of emails an account can send in a 24-hour period and the rate per second, ensuring service integrity and deliverability.

[Read more](/aws-concepts/ses-sending-quota)

### SES Sending Rates

**AWS SES sending rates** refer to the maximum number of emails you can send per second using Amazon SES, controlling throughput for optimal delivery performance.

[Read more](/aws-concepts/ses-sending-rate)

### SES Delivery Notifications

**Delivery Notifications** provide real-time feedback when emails sent through Amazon SES are successfully delivered to recipients' mail servers, enabling comprehensive tracking and analytics.

[Read more](/aws-concepts/ses-delivery-notifications)

## SNS (Simple Notification Service)

### SNS (Simple Notification Service)

**Amazon SNS** is a fully managed messaging service that enables publishers to send messages to subscribers, serving as a key component in email notification systems.

[Read more](/aws-concepts/sns)

### SNS Topics

**SNS Topics** are communication channels in Amazon SNS that organize and categorize messages, allowing multiple subscribers to receive targeted notifications.

[Read more](/aws-concepts/sns-topics)

### SNS Subscription

An **SNS Subscription** is an endpoint registered to receive notifications from an Amazon SNS topic, supporting multiple protocols for message delivery.

[Read more](/aws-concepts/sns-subscription)

### SNS Delivery Policy

**SNS Delivery Policy** is a configuration mechanism in Amazon SNS that defines how the service handles message delivery retries when temporary failures occur, ensuring important notifications reach their destinations.

[Read more](/aws-concepts/sns-delivery-policy)

<style>
a[href^="/aws-concepts/"] {
  color: #13B0EE;
  text-decoration: none;
}

a[href^="/aws-concepts/"]:hover {
  text-decoration: underline;
  opacity: 0.9;
}
</style>
