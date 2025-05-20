---
title: DMARC (Domain-based Message Authentication, Reporting, and Conformance) | BlueFox Email
description: DMARC is an email authentication protocol that unifies SPF and DKIM with policy enforcement and reporting. Learn what DMARC is, how it works, and why it matters for email security.
thumbnail: /assets/glossary/dmarc-share.webp

layout: post
category: glossary
lastUpdated: true
published: 2025-05-19
sidebar: false

head:
  - - meta
    - name: description
      content: "DMARC is an email authentication protocol that unifies SPF and DKIM with policy enforcement and reporting. Learn what DMARC is, how it works, and why it matters for email security."
  - - meta
    - property: og:title
      content: "DMARC (Domain-based Message Authentication, Reporting, and Conformance) | BlueFox Email"
  - - meta
    - property: og:description
      content: "Learn what DMARC is, how it works, and why it matters for email security."
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/glossary/dmarc-share.webp
  - - meta
    - property: og:url
      content: "https://bluefox.email/email-sending-concepts/dmarc"
  - - meta
    - name: twitter:card
      content: "summary_large_image"
  - - meta
    - name: twitter:title
      content: "DMARC (Domain-based Message Authentication, Reporting, and Conformance) | BlueFox Email"
  - - meta
    - name: twitter:description
      content: "DMARC is an email authentication protocol that unifies SPF and DKIM with policy enforcement and reporting."
---

# What is DMARC?

<div class="page-nav">
  <div class="page-nav-title">On This Page</div>
  <div class="page-nav-items">
    <a href="#quick-facts">Quick Facts</a>
    <a href="#why-is-dmarc-important">Why is DMARC Important?</a>
    <a href="#how-does-dmarc-work">How Does DMARC Work?</a>
    <a href="#what-does-a-dmarc-record-look-like">DMARC Record</a>
    <a href="#setting-up-dmarc">Setting Up DMARC</a>
    <a href="#dmarc-tags-and-what-they-mean">DMARC Tags</a>
    <a href="#common-questions-about-dmarc">Common Questions</a>
    <a href="#common-dmarc-challenges">Challenges</a>
    <a href="#related-concepts">Related Concepts</a>
  </div>
</div>

<style>
.page-nav {
  position: fixed;
  right: 1.5rem;
  top: 9rem;
  width: 12rem;
  border-left: 1px solid #e2e8f0;
  padding-left: 12px;
  font-size: 0.875rem;
  z-index: 10;
}

.dark .page-nav {
  border-left: 1px solid #2d3748;
}

.page-nav-title {
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 0.75rem;
}

.page-nav-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.page-nav-items a {
  color: #64748b;
  text-decoration: none;
  padding: 3px 0;
  position: relative;
  transition: color 0.2s, transform 0.2s;
}

.page-nav-items a:hover {
  color: #13B0EE;
  transform: translateX(3px);
}

.page-nav-items a.active {
  color: #13B0EE;
  font-weight: 500;
  transform: translateX(3px);
}

.page-nav-items a:before {
  content: "";
  position: absolute;
  top: 0;
  left: -13px;
  width: 1px;
  height: 100%;
  background: transparent;
  transition: background-color 0.2s;
}

.page-nav-items a:hover:before {
  background-color: #13B0EE;
}

.page-nav-items a.active:before {
  background-color: #13B0EE;
  width: 2px;
}

/* Responsive adjustments */
@media (max-width: 1280px) {
  .page-nav {
    right: 0.5rem;
  }
}

/* Hide on small screens */
@media (max-width: 1024px) {
  .page-nav {
    display: none;
  }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Get all section headings
  const headings = document.querySelectorAll('h2[id]');
  const navLinks = document.querySelectorAll('.page-nav-items a');
  
  // Handle smooth scrolling for nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
        
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Highlight the active section during scroll
  window.addEventListener('scroll', function() {
    let current = '';
    const scrollPosition = window.scrollY + 100;
    
    headings.forEach(heading => {
      if (heading.offsetTop <= scrollPosition) {
        current = '#' + heading.id;
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  });
  
  // Trigger scroll event once on load
  window.dispatchEvent(new Event('scroll'));
});
</script>

DMARC stands for Domain-based Message Authentication, Reporting, and Conformance. It is a standard that helps protect email senders and recipients from spam, phishing, and email spoofing. DMARC works by allowing domain owners to tell email receivers how to handle messages that fail authentication checks, and it provides a way to get reports about these messages.

## <a id="quick-facts"></a>Quick Facts

| DMARC stands for       | Domain-based Message Authentication, Reporting, and Conformance |
|------------------------|----------------------------------------------------------------|
| What it does           | Protects domains from spoofing and phishing                    |
| DNS record type        | TXT at `_dmarc.yourdomain.com`                                 |
| Helps prevent          | Spoofing, phishing, brand abuse                                |
| Works with             | SPF, DKIM, DNS, SMTP                                           |

## Why is DMARC Important?

Email is a common target for attackers who want to trick people into thinking a message is from someone they trust. DMARC helps stop this by making it much harder for attackers to send fake emails from your domain. It also gives you visibility into who is sending email on your behalf, so you can spot problems quickly.

DMARC helps you:

- Protect your brand and customers from phishing
- Improve the chances your real emails reach inboxes
- Get reports about email sent using your domain

## How Does DMARC Work?

Here’s a step-by-step example of what happens when DMARC is used:

1. You publish a DMARC policy in your DNS records. This policy tells email receivers what to do if a message fails authentication.
2. When someone receives an email from your domain, their mail server checks if the message passes SPF and DKIM.
3. DMARC checks if the domain in the "From" address matches (aligns with) the domains used by SPF and DKIM.
4. If the message fails these checks, the receiver follows your policy (for example, mark as spam or reject the message).
5. The receiver sends you a report about what happened, so you can monitor and improve your email security.

**Example:**  
If you set your DMARC policy to `p=reject`, any email that claims to be from your domain but fails authentication will be blocked.

## What Does a DMARC Record Look Like?

A DMARC record is a TXT record you add to your DNS. Here’s an example:

```txt
_dmarc.example.com. IN TXT "v=DMARC1; p=quarantine; rua=mailto:dmarc-reports@example.com; pct=100"
```

- `_dmarc` is required for DMARC records
- `v=DMARC1` means this is a DMARC record
- `p=quarantine` tells receivers to treat failing messages as suspicious
- `rua=mailto:...` is where reports are sent
- `pct=100` means the policy applies to all messages

## Setting Up DMARC

1. Make sure you have SPF and DKIM set up for your domain.
2. Add a DMARC TXT record to your DNS. Start with a policy of `p=none` to collect reports without affecting delivery.
3. Review the reports you receive to see if any legitimate emails are failing.
4. Gradually change your policy to `quarantine` or `reject` as you gain confidence.

**Example DMARC Setup Process:**  
- Add this record to your DNS to start monitoring:
  ```txt
  _dmarc.yourdomain.com. IN TXT "v=DMARC1; p=none; rua=mailto:you@yourdomain.com"
  ```
- After reviewing reports, update to:
  ```txt
  _dmarc.yourdomain.com. IN TXT "v=DMARC1; p=quarantine; rua=mailto:you@yourdomain.com"
  ```

## DMARC Tags and What They Mean

| Tag   | What it means                              | Example                        |
|-------|--------------------------------------------|--------------------------------|
| v     | Protocol version                           | v=DMARC1                       |
| p     | Policy for failed messages                 | p=reject                       |
| rua   | Aggregate report address                   | rua=mailto:reports@example.com |
| ruf   | Forensic report address                    | ruf=mailto:forensics@ex.com    |
| pct   | Percent of messages to apply policy        | pct=100                        |
| sp    | Policy for subdomains                      | sp=quarantine                  |
| aspf  | SPF alignment mode (relaxed or strict)     | aspf=r                         |
| adkim | DKIM alignment mode (relaxed or strict)    | adkim=s                        |
| fo    | Failure reporting options                  | fo=1                           |
| rf    | Report format                              | rf=afrf                        |
| ri    | Report interval (in seconds)               | ri=86400                       |

## Common Questions About DMARC

**Do I need DMARC if I already use SPF and DKIM?**  
Yes. DMARC ties SPF and DKIM together and adds reporting and enforcement, making your email security much stronger.

**What if I use a third-party sender (like a marketing platform)?**  
You need to make sure they are set up to use SPF and DKIM for your domain, and that their emails pass DMARC alignment.

**How do I read DMARC reports?**  
DMARC reports are sent in XML format and show which emails passed or failed authentication. There are free tools online to help you read and understand these reports.

## Common DMARC Challenges

- Making sure all legitimate senders are properly authenticated
- Understanding and acting on DMARC reports
- Gradually moving from monitoring (`p=none`) to enforcement (`p=quarantine` or `p=reject`)

## Summary

DMARC is a powerful tool for protecting your domain and your users from email-based attacks. By publishing a DMARC policy and monitoring reports, you can take control of your email reputation and make it much harder for attackers to misuse your domain. When combined with SPF and DKIM, DMARC is an essential part of modern email security.

## Related Concepts

- [SPF (Sender Policy Framework)](/email-sending-concepts/spf-new)  
  Learn how SPF helps specify which mail servers are allowed to send email for your domain.

- [DKIM (DomainKeys Identified Mail)](/email-sending-concepts/dkim-new)  
  Understand how DKIM adds a digital signature to your emails for added authenticity.

- [Return Path](/email-sending-concepts/return-path-new)  
  Discover how the return path address is used for bounce handling and sender reputation.

- [SMTP (Simple Mail Transfer Protocol)](/email-sending-concepts/smtp-new)  
  Explore the protocol that handles the sending and relaying of email messages.

- [TLS (Transport Layer Security)](/email-sending-concepts/tls-new)  
  See how TLS encrypts email in transit to keep your messages private.

- [MX Record](/email-sending-concepts/mx-record-new)  
  Find out how MX records direct incoming email to the right mail servers.
