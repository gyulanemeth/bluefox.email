---
title: DKIM (DomainKeys Identified Mail) | BlueFox Email
description: DKIM is an email authentication method that allows senders to digitally sign emails using a private key. Learn how it works, see examples, and understand its importance for email security.
thumbnail: /assets/glossary/dkim-share.webp

layout: post
category: glossary

head:
  - - meta
    - name: description
      content: DKIM is an email authentication method that allows senders to digitally sign emails using a private key. Learn how it works, see examples, and understand its importance for email security.
  - - meta
    - property: og:title
      content: DKIM (DomainKeys Identified Mail) | BlueFox Email
  - - meta
    - property: og:description
      content: DKIM is an email authentication method that allows senders to digitally sign emails using a private key. Learn how it works, see examples, and understand its importance for email security.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/dkim-share.webp
  - - meta
    - property: og:url
      content: https://bluefox.email/email-sending-concepts/dkim
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: DKIM (DomainKeys Identified Mail) | BlueFox Email
  - - meta
    - name: twitter:description
      content: DKIM is an email authentication method that allows senders to digitally sign emails using a private key. Learn how it works, see examples, and understand its importance for email security.

lastUpdated: true
published: 2025-05-19
sidebar: false
---

# What is DKIM?

DomainKeys Identified Mail (DKIM) is an email authentication protocol designed to detect email spoofing by validating that an email message was indeed sent and authorized by the owner of the domain it claims to be from. DKIM allows an organization to take responsibility for a message by "signing" it in a way that can be verified by recipients.

Introduced in 2004 and formalized as an Internet standard in 2007, DKIM has become one of the fundamental pillars of modern email security, working alongside SPF and DMARC to protect the email ecosystem from fraud and abuse.

## Quick Facts

| DKIM stands for       | DomainKeys Identified Mail                          |
|----------------------|-----------------------------------------------------|
| What it does         | Signs outgoing emails to prove they are genuine      |
| DNS record type      | TXT at `selector._domainkey.yourdomain.com`         |
| Helps prevent        | Email tampering and impersonation                   |
| Works with           | DMARC, SPF, DNS, SMTP                               |

## Why is DKIM Essential for Email Security?

Email was originally designed without built-in authentication mechanisms, making it inherently vulnerable to spoofing and tampering. DKIM addresses these fundamental security gaps by providing a way to verify both the sender's identity and the integrity of the message content.

### Protection Against Email Spoofing

Email spoofing occurs when attackers forge email headers to make it appear as if the message came from a trusted source. Without authentication mechanisms like DKIM, phishing campaigns can successfully impersonate banks, government agencies, or colleagues. Malicious actors can damage your brand reputation by sending spam appearing to be from your domain. Business email compromise (BEC) attacks may target financial departments by impersonating executives, often leading to significant financial losses.

DKIM helps prevent these attacks by providing cryptographic proof that an email truly came from your domain and wasn't altered in transit. This makes it much harder for attackers to successfully impersonate your brand or your employees.

### Content Integrity Verification

Unlike SPF, which only verifies the sending server, DKIM ensures the message content hasn't been altered in transit. The signature covers selected headers and the message body, creating a tamper-evident seal. Any changes to the signed content will cause the signature validation to fail, ensuring the message arrives exactly as it was sent. This prevents man-in-the-middle attacks where legitimate emails are intercepted and modified before reaching their destination.

### Improved Deliverability

Email providers increasingly rely on authentication to determine which messages to deliver to inboxes versus spam folders. Major providers like Gmail, Yahoo, and Microsoft give preference to authenticated email, and DKIM-signed emails build sender reputation over time. Consistent signing practices contribute to better delivery rates across the internet, ensuring your important messages reach their intended recipients.

When your domain consistently sends properly authenticated emails, receiving systems learn to trust messages from your domain. This improves the chances that future emails will be delivered directly to the inbox rather than being filtered or blocked.

## The Technical Foundation of DKIM

DKIM operates on the principle of asymmetric cryptography, also known as public-key cryptography. This approach uses two mathematically related keys: a private key known only to the sender, which is used to create digital signatures, and a public key published openly in DNS, which recipients use to verify those signatures.

### Asymmetric Cryptography in DKIM

The public-private key pair works through a mathematical relationship that makes it virtually impossible to derive the private key from the public key. The private key can encrypt data that only the corresponding public key can decrypt. Conversely, the public key can verify that content was signed by the matching private key. This relationship is computationally secure, meaning it's practically impossible to forge without possessing the private key.

Because the public key can be freely distributed without compromising security, this approach scales well across the internet. Domain owners can publish their public DKIM keys in DNS where anyone can access them, while keeping their private keys securely stored on their sending mail servers.

## How DKIM Works: A Detailed Explanation

The DKIM process involves several technical steps that happen automatically during email transmission, making it transparent to end users while providing powerful security benefits.

### 1. Key Generation and DNS Publication

Before any emails can be signed, the domain owner must generate a DKIM key pair and publish the public portion. The domain administrator creates a public-private key pair, typically using RSA encryption with a key length of 1024 or 2048 bits (with 2048 being the current recommendation for security). The private key is stored securely on the sending mail servers, while the public key is published as a TXT record in the domain's DNS.

The DNS record follows a specific naming convention: `selector._domainkey.example.com`. The "selector" portion is a name chosen by the administrator, such as "mail" or "2023," allowing a domain to use multiple DKIM keys for different purposes or services. The `_domainkey` namespace is a standardized location for DKIM keys, and "example.com" represents the sending domain.

### 2. Email Signing Process

When a DKIM-enabled mail server prepares to send an email, it performs a series of operations to create and attach the signature. First, the server selects which headers to include in the signature, typically including critical headers like From, To, Subject, and Date that should not change during transmission.

Next, the server applies a standardized format called canonicalization to the selected headers and body. This process ensures consistent processing across different mail systems that might handle whitespace or line wrapping differently. Two canonicalization methods are available: "simple," which preserves most formatting, and "relaxed," which is more tolerant of minor formatting changes.

After canonicalization, the server creates a cryptographic hash of the prepared headers and body. This hash is then encrypted using the domain's private key to create the digital signature. Finally, the server adds a new `DKIM-Signature` header containing all the information needed to verify the signature, including the selector name, which headers were signed, the hashing algorithm used, the canonicalization method, the signature itself, and optional timestamp information.

### 3. Signature Verification

When a receiving mail server gets a DKIM-signed email, it begins the verification process by extracting the selector and signing domain from the DKIM-Signature header. The server then queries DNS for the public key at the address built from this information: `selector._domainkey.signingdomain.com`.

After retrieving the public key, the server applies the same canonicalization method that was used by the sender to prepare the message for verification. Using the public key, the server then verifies that the signature was created with the matching private key and that the signed headers and body hash match the actual message content.

Based on this verification process, the server determines whether the message passes DKIM authentication. This result is typically recorded in the Authentication-Results header added to the message before delivery to the recipient's inbox.

## Example of a DKIM Signature Header

Here's what an actual DKIM-Signature header looks like in an email:

```
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=example.com; s=2021;
 t=1632735932; bh=2jUSOH9NhtVGCQWNr9BrIAPreKQjO6Sn7XIkfJVOzv8=;
 h=From:To:Subject:Date;
 b=AuUoFEfDxTDkHlLXSZEpZj79LICEps6eda7W3deTVFOk4yAUoqOB4nujc3jUZipdMes0pOT8QTr
 TlaPuauPvCTvXoPnXOEJ+YbEgEgy4pkCqCsY/+IrbG7i3gQsKQhcS7Ls8H5jQx7xQmyfeKdE9pm8O
 1v5a8JxG8In4qFwreJA=
```

Breaking down this example:

- `v=1`: DKIM version
- `a=rsa-sha256`: The algorithm used (RSA signing with SHA-256 hashing)
- `c=relaxed/relaxed`: Canonicalization method for headers/body
- `d=example.com`: The signing domain
- `s=2021`: The selector name
- `t=1632735932`: Signature timestamp (in Unix format)
- `bh=2jUSOH9...`: The body hash (base64 encoded)
- `h=From:To:Subject:Date`: List of headers that were signed
- `b=AuUoFEfD...`: The actual signature (base64 encoded)

## What Does a DKIM DNS Record Look Like?

The DNS TXT record that holds your public key follows this structure:

```txt
selector._domainkey.example.com. IN TXT "v=DKIM1; k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDmzRmJRQxLEuyYiyMg4suA2Sy9k9Ld1qM2RCfStVUhiXvqw9wBYIV5qHz1DRqKv59T49xFC4erpB5fZUNPCGiqw=="
```

Key elements in this record:
- `v=DKIM1`: Version of DKIM being used
- `k=rsa`: Key type (RSA is standard)
- `p=MIGfMA0G...`: The public key in base64 format

Optional elements that may appear in some DKIM records:
- `t=y`: Testing flag (receivers should not reject email if signature fails)
- `s=email`: Service type (rarely used)
- `n=notes`: Human-readable notes about this key (rarely used)

## Comprehensive Guide to Setting Up DKIM

Implementing DKIM involves several important steps:

### 1. Generating DKIM Keys

You have two options for key generation:

**Option A: Using OpenSSL (for self-managed servers)**
```bash
# Create a 2048-bit private key
openssl genrsa -out dkim_private.key 2048

# Extract the public key in the correct format
openssl rsa -in dkim_private.key -pubout -outform PEM -out dkim_public.key
```

**Option B: Using Your Email Service Provider**
Many email service providers generate keys automatically:
- AWS SES: Navigate to "Verified Identities" > your domain > "DKIM" section
- Google Workspace: Go to Admin Console > Apps > Google Workspace > Gmail > Authenticate email
- Microsoft 365: Use the Exchange Admin Center > Mail Flow > DKIM

### 2. DNS Record Creation

Format your public key into the proper DNS TXT record:

1. Extract the base64 portion of your public key (ignoring headers and footers)
2. Create a TXT record at `selector._domainkey.yourdomain.com` with content:
   ```
   v=DKIM1; k=rsa; p=YOUR_BASE64_PUBLIC_KEY
   ```
3. If your key is very long (over 255 characters), you may need to split it into chunks with quotes

### 3. Email Server Configuration

Configure your outgoing mail server to sign emails:

**For Postfix:**
Add to `/etc/postfix/main.cf`:
```
smtpd_milters = inet:localhost:8891
non_smtpd_milters = $smtpd_milters
milter_default_action = accept
```

And set up OpenDKIM with your private key.

**For Managed Services:**
Enable DKIM in your provider's dashboard after DNS verification:
- AWS SES: Just enable after DNS verification
- SendGrid: Navigate to Sender Authentication > DKIM
- Mailgun: Go to Sending > Domain Settings > DKIM Authority

### 4. Testing Your DKIM Setup

Verify your implementation with these tools:
- Send a test email to a Gmail account and view the headers
- Use online validators like [DKIM Validator](https://dkimvalidator.com/) or [Mail-Tester](https://www.mail-tester.com/)
- Check DNS propagation with `dig TXT selector._domainkey.yourdomain.com`

## DKIM Best Practices

To maximize the security benefits and minimize issues, follow these expert recommendations:

### Key Management

- **Use 2048-bit keys**: Older 1024-bit keys are now considered potentially vulnerable
- **Create unique selectors**: Use descriptive names like `2023a` or `main-july`
- **Implement key rotation**: Change keys annually or after staff changes
- **Consider multiple selectors**: Use different selectors for different email streams (marketing, transactional, etc.)

### Signing Configuration

- **Sign all outgoing mail**: Inconsistent signing confuses recipients and damages reputation
- **Include critical headers**: Always sign From, To, Subject, Date headers
- **Use relaxed/relaxed canonicalization**: This provides better compatibility with various email systems
- **Avoid testing mode** (`t=y`) in production: Only use during initial setup

## DKIM, SPF, and DMARC: How They Work Together

DKIM is most effective when implemented as part of a complete email authentication strategy that includes both SPF and DMARC. Each protocol addresses different aspects of email security, and together they form a comprehensive defense against email-based threats.

SPF serves as the first line of defense by verifying that the sending server's IP address is authorized to send email for the domain. It's relatively simple to implement but focuses only on the sending infrastructure rather than the message content. SPF can also encounter difficulties with email forwarding or certain complex email routing scenarios.

DKIM complements SPF by verifying the email content hasn't been tampered with and providing cryptographic proof of the sending domain's identity. Because it's based on cryptographic signatures rather than IP addresses, DKIM is more resistant to forwarding issues than SPF. The digital signature travels with the email, maintaining its validity even when the message is forwarded through multiple servers.

DMARC brings these technologies together by requiring alignment between the visible From address and either the SPF or DKIM authenticated domain. It provides a framework for domain owners to specify clear policies for handling authentication failures and offers reporting capabilities that give visibility into email authentication results. Through these reports, domain owners can identify both legitimate and illegitimate senders using their domain.

The combination of these three protocols creates a layered security approach: SPF validates the sending server, DKIM validates the message content, and DMARC provides policy enforcement and visibility. This multi-layered approach makes it significantly more difficult for attackers to successfully spoof your domain or tamper with your email messages.

## Common DKIM Implementation Challenges

While DKIM is a powerful tool for email security, organizations often face several challenges when implementing it in real-world environments.

### Email Forwarding and Mailing Lists

When emails are forwarded or distributed through mailing lists, the original DKIM signature may break. This happens because headers might be modified during forwarding, the body might be reformatted with additional content, or new headers might be added while the original signature remains unchanged. 

These modifications cause the signature validation to fail, even though the forwarding was legitimate. Using the "relaxed" canonicalization method can help minimize this problem by making the signature more tolerant of minor formatting changes. Additionally, many modern mailing list systems are now DKIM-aware and either preserve signatures or add their own signatures to maintain authentication through the forwarding process.

### Email Modification by Intermediaries

Various systems in the email delivery path might modify messages in ways that break DKIM signatures. Security gateways often add disclaimer text or virus scan results. Corporate mail systems frequently add footers with legal information or confidentiality notices. Even simple formatting changes like line wrapping or whitespace normalization can potentially invalidate a DKIM signature.

Organizations should configure their DKIM implementation to account for these modifications when possible. This might involve excluding certain headers from the signature, using relaxed canonicalization, or ensuring that modifications happen before the signing process rather than after.

### Third-Party Sender Management

Many organizations use third-party services to send email on their behalf, including marketing platforms, CRM systems, support ticketing systems, and transactional email services. Ensuring proper DKIM authentication across all these services requires careful coordination.

There are two main approaches to handling third-party senders. The first option is to provide the third party with a dedicated DKIM selector and private key, allowing them to sign messages directly as your domain. This approach ensures perfect alignment for DMARC but requires careful key management and trust in the third party's security practices.

The second approach allows third parties to use their own DKIM signatures while aligning with your domain through proper configuration of DMARC and monitoring reports to ensure legitimate traffic isn't blocked. This approach is often more practical for organizations with multiple external senders.

### Enterprise-Scale Deployment Complexity

Large organizations face additional challenges when deploying DKIM across complex email environments. Different departments might use different email services, international offices may maintain separate email infrastructure, and corporate acquisitions often bring legacy email systems into the mix.

In these environments, using multiple selectors with clear naming conventions helps manage the complexity. Maintaining an inventory of all legitimate senders and their authentication status is essential for preventing disruption while improving security. A phased rollout approach, starting with monitoring before enforcement, allows large organizations to identify and address issues before they affect email delivery.

## The Future of DKIM

Email authentication continues to evolve, with several developments on the horizon:

### BIMI (Brand Indicators for Message Identification)
BIMI allows organizations to display their logo in supported email clients when:
- The email passes DKIM authentication
- The email passes DMARC with an enforcement policy
- A valid BIMI record exists in DNS
- (In some cases) a Verified Mark Certificate is obtained

### Ed25519-based DKIM
RSA has been the standard for DKIM signatures, but:
- Newer Ed25519 signatures are shorter and faster
- They provide equivalent security with smaller keys
- Support is gradually being added to email systems

### Post-Quantum Cryptography
As quantum computers advance:
- Current RSA signatures may become vulnerable
- New quantum-resistant algorithms are being developed
- Email standards will eventually need to adapt

## Analyzing DKIM Failures

When debugging DKIM issues, check these common failure points:

### 1. DNS Configuration Problems
- Missing or incorrect TXT record
- Syntax errors in the record format
- DNS propagation delays after changes
- Record exceeded maximum size limit

### 2. Signature Generation Issues
- Private key doesn't match published public key
- Wrong selector being used
- Issues with canonicalization
- Email size exceeds signature capabilities

### 3. Third-Party Handling
- Intermediate systems modifying signed content
- Mailing lists reformatting messages
- Security gateways adding content

## DKIM Tags and Parameters Reference

| Tag | What it means           | Example                | Required? |
|-----|-------------------------|------------------------|-----------|
| v   | DKIM version            | v=DKIM1                | Yes       |
| k   | Key type                | k=rsa                  | No (default: rsa) |
| p   | Public key              | p=MIGfMA0G...          | Yes       |
| s   | Service type            | s=email                | No        |
| t   | Flags                   | t=y                    | No        |
| n   | Notes                   | n="Human readable"     | No        |
| h   | Signed headers          | h=From:Subject:To:Date | Yes (in signature) |
| d   | Signing domain          | d=example.com          | Yes (in signature) |
| i   | Identity                | i=@example.com         | No (in signature)  |
| a   | Algorithm               | a=rsa-sha256           | Yes (in signature) |
| c   | Canonicalization        | c=relaxed/relaxed      | No (in signature)  |
| l   | Body length count       | l=1741                 | No (in signature)  |
| q   | Query method            | q=dns/txt              | No (in signature)  |
| t   | Signature timestamp     | t=1617235678           | No (in signature)  |
| x   | Expiration timestamp    | x=1617322078           | No (in signature)  |
| b   | Signature               | b=dzdVyOfA...          | Yes (in signature) |
| bh  | Body hash               | bh=2jUSOH9...          | Yes (in signature) |

## Common Questions About DKIM

<div class="dkim-faq">

<div class="faq-item">
<h3 class="question">1. Do I need DKIM if I already use SPF?</h3>
<div class="answer">
Yes. SPF and DKIM serve complementary purposes. SPF verifies the sending server's IP address is authorized, while DKIM verifies the message content hasn't been altered and proves the message was signed by the domain owner. Together with DMARC, they provide comprehensive email authentication that protects against different types of threats.
</div>
</div>

<div class="faq-item">
<h3 class="question">2. What if I use a third-party sender for some of my emails?</h3>
<div class="answer">
You have several options:
<ol>
<li>The third party can implement DKIM signing using their own domain</li>
<li>You can provide the third party with a dedicated DKIM selector and private key</li>
<li>You can use a relaxed DMARC policy while monitoring reports for legitimate third-party senders</li>
</ol>
</div>
</div>

<div class="faq-item">
<h3 class="question">3. How often should I update my DKIM keys?</h3>
<div class="answer">
Best practice is to rotate DKIM keys annually or after significant personnel changes. When rotating keys, create a new selector rather than overwriting the existing one. Keep the old selector active until all emails signed with it have been delivered. This is also a good opportunity to upgrade to stronger cryptographic standards if needed. Many organizations benefit from automating the rotation process for consistency.
</div>
</div>

<div class="faq-item">
<h3 class="question">4. Will DKIM work with my mailing list or forwarded emails?</h3>
<div class="answer">
DKIM signatures may break when emails are forwarded or processed by mailing lists. This happens because headers might be modified during forwarding, or the message body might be reformatted with additional content. Using the "relaxed" canonicalization method helps with minor changes. Fortunately, many modern mailing list systems are now DKIM-aware and either preserve signatures or add their own signatures to maintain authentication.
</div>
</div>

<div class="faq-item">
<h3 class="question">5. Does DKIM encrypt my email content?</h3>
<div class="answer">
No. DKIM signs your email but doesn't encrypt the content. It's designed to verify authenticity and integrity, not provide confidentiality. For transport encryption, you should use TLS. For end-to-end encryption, solutions like S/MIME or PGP are appropriate. DKIM works alongside these encryption methods rather than replacing them, addressing the separate but equally important issue of sender authentication.
</div>
</div>

</div>

<style>
.dkim-faq {
  margin: 25px 0;
}

.faq-item {
  margin-bottom: 20px;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 15px;
}

.dark .faq-item {
  border-bottom: 1px solid #2d3748;
}

.faq-item:last-child {
  border-bottom: none;
}

.question {
  font-size: 1.1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
}

.dark .question {
  color: #e4e4e4;
}

.answer {
  font-size: 1rem;
  line-height: 1.6;
  color: #444;
}

.dark .answer {
  color: #bbb;
}

.answer ul, .answer ol {
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 20px;
}

.answer li {
  margin-bottom: 5px;
}
</style>

## Summary

DKIM provides a powerful way to authenticate your email and protect your domain reputation. By digitally signing your messages, you:

- Create cryptographic proof that your emails are genuine
- Ensure message integrity during transmission
- Build trust with email providers and recipients
- Improve deliverability to the inbox
- Help combat phishing and other email-based attacks

When combined with SPF and DMARC, DKIM forms an essential part of modern email security practices that every organization should implement.

## Related Concepts

- [SPF (Sender Policy Framework)](/email-sending-concepts/spf-new)  
  Learn how SPF specifies which mail servers are authorized to send email for your domain.

- [DMARC (Domain-based Message Authentication, Reporting, and Conformance)](/email-sending-concepts/dmarc-new)  
  Understand how DMARC builds on SPF and DKIM to provide complete email authentication.

- [Email Authentication](/email-sending-concepts/email-authentication-new)  
  Explore the full suite of protocols that help verify email sender identity.

- [Email Spoofing](/email-sending-concepts/email-spoofing-new)  
  Learn about the threat that DKIM helps prevent.

- [SMTP (Simple Mail Transfer Protocol)](/email-sending-concepts/smtp-new)  
  Discover the protocol used to transmit emails across the internet.

- [Return Path](/email-sending-concepts/return-path-new)  
  Understand how bounce addresses work in email delivery.
