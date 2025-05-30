# MX record (Mail eXchange record)

**MX** stands for **Mail Exchange**.

---

### What Is an MX Record?

An **MX record** is a type of **DNS (Domain Name System)** record that tells the world:

> “Here’s the mail server responsible for accepting **incoming email** for this domain.”

So when someone sends an email to `you@bluefox.email`, their mail server asks DNS:

```
Hey, who handles mail for bluefox.email?
```

And the MX record answers:

```
Send it to smtp.google.com (priority 10)
```

---

### 🧠 MX = Mail Exchange

| Term         | Stands For       | Purpose                          |
|--------------|------------------|----------------------------------|
| **MX record**| Mail Exchange    | Points to the mail server(s) for a domain |

---

### 🔍 What an MX Record Looks Like

To look it up from the command line:

```bash
dig MX bluefox.email
```

Example output:

```
bluefox.email.  3600  IN  MX  10  smtp.google.com.
```

Breakdown:
- `10` → **Priority** (lower = higher priority)
- `smtp.google.com.` → the mail server to receive email

---

### 📢 Multiple MX Records (For Redundancy)

```
MX 10 smtp1.mailserver.com.
MX 20 smtp2.mailserver.com.
```

Email servers will try `smtp1` first. If it's down, they fall back to `smtp2`.

---

### ✅ TL;DR

| MX stands for       | **Mail Exchange**                       |
|---------------------|------------------------------------------|
| Used for            | Incoming email routing                   |
| Found in            | DNS records                              |
| Controls            | Where email should be delivered for a domain |
