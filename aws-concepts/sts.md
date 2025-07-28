---
title: Amazon STS (Security Token Service) | BlueFox Email
description: AWS STS is a web service that enables you to request temporary, limited-privilege credentials for AWS Identity and Access Management (IAM) users or federated users.
thumbnail: /assets/glossary/aws-concepts-glossary.png
sidebar: false
layout: post
category: glossary

datePublished: "2025-07-25"
dateModified: "2025-07-28"

faqs:
  - question: "How long can temporary credentials remain valid?"
    answer: "Temporary credentials can be valid for as little as 15 minutes up to a maximum of 36 hours, depending on the method used to request them and the parameters specified. The default is typically 1 hour."
  - question: "Is there an additional cost for using STS?"
    answer: "No, AWS STS is available at no additional charge. You pay only for the AWS resources accessed using the temporary credentials."
  - question: "How does STS handle credential revocation?"
    answer: "While STS credentials cannot be directly revoked before their expiration time, you can effectively revoke them by modifying the associated IAM policies to deny access. This change takes effect almost immediately."
  - question: "Can STS be used across all AWS regions?"
    answer: "Yes, STS can be used in all AWS regions. It can be configured to use either regional endpoints for lower latency or a single global endpoint for simplicity."

relatedContent:
  - title: AWS IAM (Identity and Access Management)
    url: /aws-concepts/iam
  - title: AWS IAM Role
    url: /aws-concepts/iam-role
  - title: AWS IAM Permissions
    url: /aws-concepts/iam-permissions
  - title: AWS SES (Simple Email Service)
    url: /aws-concepts/ses
  - title: AWS SNS (Simple Notification Service)
    url: /aws-concepts/sns

head:
  - - meta
    - name: description
      content: AWS STS is a web service that enables you to request temporary, limited-privilege credentials for AWS Identity and Access Management (IAM) users or federated users.
  - - meta
    - property: og:title
      content: Amazon STS (Security Token Service) | BlueFox Email
  - - meta
    - property: og:description
      content: AWS STS is a web service that enables you to request temporary, limited-privilege credentials for AWS Identity and Access Management (IAM) users or federated users.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/aws-concepts-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/aws-concepts/sts
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Amazon STS (Security Token Service) | BlueFox Email
  - - meta
    - name: twitter:description
      content: AWS STS is a web service that enables you to request temporary, limited-privilege credentials for AWS Identity and Access Management (IAM) users or federated users.
---
<GlossaryNavigation />

# Amazon STS (Security Token Service)

**AWS Security Token Service (STS)** is a web service that enables you to request temporary, limited-privilege credentials for AWS [Identity and Access Management (IAM)](/aws-concepts/iam) users or federated users. These temporary credentials work almost identically to the long-term access key credentials that IAM users can use, with key differences in their temporary nature and enhanced security profile.

## What is Amazon STS?

Amazon Security Token Service provides a mechanism to create and distribute **time-limited security credentials** that applications can use to access AWS resources. Instead of creating an IAM user with long-term credentials, STS enables you to issue short-lived tokens that expire after a defined period, typically between 15 minutes and 36 hours.

These temporary credentials consist of:

- **Access key ID**: Identifies the temporary security credentials
- **Secret access key**: Used to sign programmatic AWS requests
- **Security token**: A value that must be included in requests to AWS services
- **Expiration**: The date and time when the credentials expire

By using temporary credentials, organizations can implement the **principle of least privilege** more effectively and reduce the risk associated with compromised long-term credentials.

## How Amazon STS Works

When you request **temporary credentials from STS**, the service validates your identity and the requested permissions, then generates a set of temporary security **credentials that include** an **access key ID**, **secret access key**, and **security token**. These credentials are returned to your application along with an expiration timestamp, after which the credentials become invalid and cannot be used to access AWS resources.

STS provides several APIs to acquire temporary credentials:

- **AssumeRole**: Temporarily adopts permissions of an [IAM role](/aws-concepts/iam-role), enabling cross-account access or privilege escalation within policy boundaries
- **AssumeRoleWithWebIdentity**: Enables authentication via third-party identity providers like Google or Facebook
- **AssumeRoleWithSAML**: Integrates with SAML 2.0-compatible identity providers like Active Directory or Okta, enabling Single Sign-On (SSO)
- **GetSessionToken**: Generates MFA-protected credentials for sensitive operations
- **GetFederationToken**: Creates longer-lasting credentials (up to 36 hours) for federated users

All these methods return temporary security credentials (access key ID, secret access key, and security token) that can be used to access AWS services based on the permissions defined in the associated [IAM policies](/aws-concepts/iam-permissions).

:::tip BlueFox Recommendation
**STS is our recommended way to connect your AWS SES to BlueFox Email.** Using Security Token Service instead of long-lived access keys provides enhanced security through temporary credentials that automatically expire. This approach eliminates the need to store permanent AWS credentials and follows security best practices by limiting permissions to only what's needed when it's needed. BlueFox Email supports STS integration through a simple Role ARN configuration in project settings.
:::

## STS in Email Systems

In email infrastructure using AWS services like [SES](/aws-concepts/ses) and [SNS](/aws-concepts/sns), STS plays several important security roles: enabling secure cross-account interactions in multi-account email architectures (allowing SES to publish events to SNS topics in separate accounts), providing temporary access credentials for applications processing email events from [SNS topics](/aws-concepts/sns-topics) with minimal required permissions supporting federated identity for email operations staff to access AWS resources using their existing corporate credentials and securing email automation where Lambda functions can use temporary credentials that expire after task completion. These temporary credentials align perfectly with the transient nature of email processing workloads, enhancing security without sacrificing functionality.

## Key Benefits of Using STS

AWS STS provides several critical security advantages for modern cloud architectures:

**Enhanced Security**: By using short-lived credentials, STS significantly reduces the risk associated with credential exposure. Even if temporary credentials are compromised, they will soon expire, limiting the potential damage.

**Fine-Grained Access Control**: STS allows for very precise permissions through IAM policies, ensuring identities have exactly the access they need for specific tasks and nothing more.

**Identity Federation**: Organizations can leverage their existing identity management systems rather than creating and managing separate AWS credentials for each user.

**Simplified Credential Management**: With STS, applications don't need to store long-term AWS credentials, eliminating the need for complex credential rotation mechanisms.

**Audit Trail**: Each temporary credential request creates log entries in AWS CloudTrail, providing comprehensive visibility into who is accessing what resources and when.

## Frequently Asked Questions About STS

### How long can temporary credentials remain valid?

Temporary credentials can be valid for as little as 15 minutes up to a maximum of 36 hours, depending on the method used to request them and the parameters specified. The default is typically 1 hour.

### Is there an additional cost for using STS?

No, AWS STS is available at no additional charge. You pay only for the AWS resources accessed using the temporary credentials.

### How does STS handle credential revocation?

While STS credentials cannot be directly revoked before their expiration time, you can effectively revoke them by modifying the associated IAM policies to deny access. This change takes effect almost immediately.

### Can STS be used across all AWS regions?

Yes, STS can be used in all AWS regions. It can be configured to use either regional endpoints for lower latency or a single global endpoint for simplicity.

## Related Content

- [AWS IAM (Identity and Access Management)](/aws-concepts/iam)
- [AWS IAM Role](/aws-concepts/iam-role)
- [AWS IAM Permissions](/aws-concepts/iam-permissions)
- [AWS SES (Simple Email Service)](/aws-concepts/ses)
- [AWS SNS (Simple Notification Service)](/aws-concepts/sns)

<GlossaryCTA />
