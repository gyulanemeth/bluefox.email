---
title: SMTP
description: Learn what SMTP is and how it works as the foundation of email delivery.
thumbnail: /assets/articles/smtp-thumbnail.webp

layout: post
category: glossary

head:
  - - meta
    - name: description
      content: Learn what SMTP is and how it works as the foundation of email delivery.
  - - meta
    - property: og:title
      content: SMTP | Email Glossary | BlueFox Email
  - - meta
    - property: og:description
      content: Learn what SMTP is and how it works as the foundation of email delivery.
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: SMTP | Email Glossary | BlueFox Email
  - - meta
    - name: twitter:description
      content: Learn what SMTP is and how it works as the foundation of email delivery.

lastUpdated: true
published: 2025-05-16
sidebar: false
---

# SMTP (Simple Mail Transfer Protocol)

**SMTP** stands for **Simple Mail Transfer Protocol**.

It is the standard protocol used for sending email messages between servers across the internet. SMTP defines how email messages are formatted, transmitted, and delivered from sender to recipient.

## How SMTP Works

SMTP follows a client-server architecture where an email client communicates with an SMTP server to send messages:

1. The sender composes an email and clicks "Send"
2. The sender's email client connects to an SMTP server
3. The SMTP server looks up the MX (Mail Exchange) record of the recipient's domain
4. The sender's SMTP server establishes a connection with the recipient's SMTP server
5. The email is transferred from the sending server to the receiving server
6. The recipient's server delivers the message to the recipient's inbox

## SMTP Commands

SMTP uses a series of text commands to facilitate communication between servers:

| Command | Description |
|---------|-------------|
| HELO/EHLO | Identifies the client to the server |
| MAIL FROM | Specifies the sender's email address |
| RCPT TO | Specifies the recipient's email address |
| DATA | Begins the transfer of the message contents |
| QUIT | Closes the connection |

## SMTP Ports

SMTP typically uses the following ports:

| Port | Description |
|------|-------------|
| 25 | Standard SMTP port (often blocked by ISPs) |
| 587 | Modern secure submission port with TLS (recommended) |
| 465 | Secured SMTP port using implicit SSL (less common) |

## SMTP vs. POP3 and IMAP

It's important to understand that SMTP is only used for sending emails:

- **SMTP** - Sending emails from sender to recipient servers
- **POP3** - Downloading emails from server to client (and typically deleting them from server)
- **IMAP** - Synchronizing emails between server and client (emails remain on server)

## Summary

| SMTP stands for | **Simple Mail Transfer Protocol** |
|-----------------|----------------------------------|
| Used for | Sending emails from sender to recipient |
| Standard ports | 25 (standard), 587 (submission), 465 (SSL) |
| Related protocols | MX, POP3, IMAP, MIME |
| Key features | Text-based commands, mail routing, server-to-server communication |
