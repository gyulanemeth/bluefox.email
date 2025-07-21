---
title: Amazon SES Raw Email Sending | BlueFox Email
description: Learn about AWS SES Raw Email Sending - a powerful method for sending customized emails with complete control over email format and content.
thumbnail: /assets/glossary/aws-concepts-glossary.png
sidebar: false
layout: post
category: glossary

head:
  - - meta
    - name: description
      content: Learn about AWS SES Raw Email Sending - a powerful method for sending customized emails with complete control over email format and content.
  - - meta
    - property: og:title
      content: Amazon SES Raw Email Sending | BlueFox Email
  - - meta
    - property: og:description
      content: Learn about AWS SES Raw Email Sending - a powerful method for sending customized emails with complete control over email format and content.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/aws-concepts-glossary.png
  - - meta
    - property: og:url
      content: https://bluefox.email/aws-concepts/aws-raw-email-sending
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Amazon SES Raw Email Sending | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn about AWS SES Raw Email Sending - a powerful method for sending customized emails with complete control over email format and content.
---

# Amazon SES Raw Email Sending

**AWS SES Raw Email Sending** refers to the advanced capability in [Amazon Simple Email Service](/aws-concepts/ses) that allows developers to craft and send fully customized email messages with complete control over every aspect of the email structure, format, and content.

## What is Raw Email Sending?

Raw email sending in Amazon SES provides developers with direct control over the entire [MIME](/email-sending-concepts/email-headers) structure, including headers, body parts, attachments, and encoding. Unlike the simplified sending methods that abstract away email complexity, raw email sending exposes the underlying email protocols and standards, allowing for maximum customization and flexibility.

This approach enables precise control over essential email components that affect deliverability, rendering, and recipient experience. According to the [AWS documentation](https://docs.aws.amazon.com/ses/latest/dg/send-email-raw.html), raw email sending is particularly valuable for applications requiring **sophisticated formatting, attachments, or custom headers** that aren't available through simpler API methods.

## How Raw Email Sending Works

The raw email sending process in SES follows a streamlined workflow where you first construct a complete MIME message with all required headers and body content, then transmit this message to AWS using either the `SendRawEmail` API operation or [SMTP](/email-sending-concepts/smtp.md) interface with proper encoding, after which AWS SES performs essential verification checks while minimizing alterations to your carefully crafted message, and finally manages the entire delivery process including retries, [bounce](/email-sending-concepts/bounces) handling, [complaint](/email-sending-concepts/complaints) processing, and [delivery notification](/aws-concepts/ses-delivery-notifications) distribution according to the [verified identity's](/aws-concepts/aws-verified-identities) configuration settings.

## Common Use Cases

Raw email sending is particularly valuable in several scenarios:

| Use Case | Why Raw Sending Helps |
|----------|------------------------|
| **Transactional Emails with Attachments** | Send order confirmations, invoices, or receipts with PDF attachments while maintaining precise branding and format control |
| **Calendar Invitations** | Include properly formatted iCalendar (ICS) components that work reliably across email clients |
| **Digitally Signed Messages** | Implement S/MIME signatures for enhanced security and authentication in regulated industries |
| **[Custom Email Headers](/email-sending-concepts/email-headers)** | Add specialized headers for tracking, categorization, authentication, or internal routing purposes |

## Implementation Approaches

Raw email sending can be implemented through two primary interfaces:

**SendRawEmail API**: This programmatic approach allows sending raw messages through AWS SDK calls. It requires properly formatting the entire message according to MIME standards and encoding it as required by the API specification.

**SMTP Interface**: AWS SES provides an SMTP endpoint that can accept raw email messages. This approach is particularly useful for integrating with existing applications that already support SMTP as a sending method.

For both approaches, AWS recommends using established email libraries that handle the complexities of MIME formatting and encoding rather than attempting to construct raw messages manually. Libraries like [Nodemailer](https://nodemailer.com/) for Node.js, [JavaMail](https://javaee.github.io/javamail/) for Java, and [email](https://docs.python.org/3/library/email.html) for Python provide robust capabilities for constructing standards-compliant raw messages.

## Important Considerations

When implementing raw email sending, several factors require careful attention:

- **Standards Compliance**: Raw emails must adhere strictly to email standards like [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322) and MIME specifications. Non-compliant messages may be rejected by AWS SES or recipient mail servers.
- **Authentication Headers**: Properly implementing authentication mechanisms like [SPF](/email-sending-concepts/spf), [DKIM](/email-sending-concepts/dkim), and [DMARC](/email-sending-concepts/dmarc) is especially important when sending raw emails.
- **Message Size Limits**: AWS SES imposes a maximum size limit (currently 10MB) on raw messages, including all parts, headers, and attachments after base64 encoding.
- **Error Handling**: Because raw emails offer more opportunities for formatting errors, robust error handling and testing are essential to ensure reliable delivery.

## Frequently Asked Questions

### When should I use raw email sending versus the simple API methods?

Use raw email sending when you need precise control over email structure, require advanced features like attachments or calendar invites, need to implement custom headers, or are integrating with systems that already generate properly formatted email messages. For simpler use cases where basic content and formatting are sufficient, the standard SES API methods are more straightforward.

### Does raw email sending affect deliverability?

While raw email sending gives you more control, it also places more responsibility on your implementation to follow email best practices. Poorly constructed raw emails may negatively impact [deliverability](/email-sending-concepts/deliverability.md). However, when properly implemented, raw emails can achieve the same or better deliverability as those sent through simplified APIs.

### Can I use templates with raw email sending?

AWS SES templates aren't directly compatible with raw email sending. However, you can implement your own templating system that generates complete raw email messages, giving you both the benefits of templates and the control of raw sending.

### How do I track opens and clicks with raw email sending?

You'll need to implement tracking mechanisms manually when using raw email sending. This typically involves adding tracking pixels for opens and rewriting links for click tracking. Many email marketing libraries offer these capabilities for raw emails, or you can use third-party services like BlueFox Email that provide comprehensive tracking while still allowing raw message customization.

## Related Content

- [Amazon SES (Simple Email Service)](/aws-concepts/ses)
- [AWS SES Verified Identities](/aws-concepts/aws-verified-identities)
- [Email Authentication](/email-sending-concepts/email-authentication)
- [DKIM (DomainKeys Identified Mail)](/email-sending-concepts/dkim)
- [Email Headers](/email-sending-concepts/email-headers)

<GlossaryCTA />
