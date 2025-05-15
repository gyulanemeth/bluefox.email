# SMTP

**SMTP** stands for **Simple Mail Transfer Protocol**.

It is the standard protocol used to **send emails** between mail servers or from a mail client to a server. SMTP defines how email messages are **formatted**, **transferred**, and **relayed** across networks.

---

## 🔌 What SMTP Does (and Doesn’t Do)

| SMTP **does**                     | SMTP **does not**                  |
|----------------------------------|------------------------------------|
| Send email from client to server | Retrieve emails from mailbox       |
| Send email server to server      | Store emails long-term             |
| Relay or forward email           | Download messages to your device   |

---

## 🔧 Common SMTP Ports

| Port | Usage                                |
|------|----------------------------------------|
| 25   | Server-to-server mail (original SMTP)  |
| 587  | **Client-to-server** (modern standard) ✅ |
| 465  | SMTP over SSL (deprecated, still used) |

---

## 🤔 Bonus: What a Typical SMTP Exchange Looks Like

```text
HELO client.example.com
MAIL FROM:<you@example.com>
RCPT TO:<friend@example.net>
DATA
Subject: Test
Hello World.
.
QUIT
```

This is the raw SMTP conversation between mail servers or clients.

---

## ✅ TL;DR

| SMTP stands for       | **Simple Mail Transfer Protocol**        |
|------------------------|-------------------------------------------|
| Used for               | Sending email from client to server or between servers |
| Defined by             | RFC 5321 and related standards             |
| Works with             | DNS (MX records), optional with TLS, SPF, DKIM, DMARC  |

