# SPF

**SPF** stands for **Sender Policy Framework**.

It is an email authentication method that allows domain owners to **specify which mail servers are authorized to send emails** on behalf of their domain.

SPF helps prevent **email spoofing** by giving receiving mail servers a way to check whether a message claiming to come from a domain actually comes from an allowed IP address.

---

## 🔍 How SPF Works

1. A mail server receives an email claiming to be from `example.com`
2. It looks up the **SPF record** (a TXT record) in DNS for `example.com`
3. The SPF record lists authorized sending IP addresses or domains
4. The receiving server checks whether the sender's IP is in that list
5. Based on the result, it marks the email as `pass`, `fail`, `softfail`, `neutral`, etc.

---

## 📁 Example SPF Record

```dns
example.com. IN TXT "v=spf1 ip4:192.0.2.0/24 include:mailprovider.com -all"
```

- `ip4:192.0.2.0/24` → allow this IP range to send mail
- `include:mailprovider.com` → include another domain's SPF records
- `-all` → **fail everything else** (reject unauthorized senders)

---

## 🔧 Common SPF Qualifiers

| Qualifier | Meaning                          |
|-----------|-----------------------------------|
| `+`       | Pass (default if no symbol given) |
| `-`       | Fail (unauthorized)               |
| `~`       | Softfail (accept but flag)        |
| `?`       | Neutral (no policy)               |

---

## ✅ TL;DR

| SPF stands for       | **Sender Policy Framework**                             |
|----------------------|----------------------------------------------------------|
| Used for             | Declaring who can send mail on behalf of your domain     |
| Type of DNS record   | `TXT`                                                    |
| Helps protect against| Spoofing and phishing                                    |
| Works with           | SMTP, DMARC, DNS                                         |
