# DMARC

**DMARC** stands for **Domain-based Message Authentication, Reporting and Conformance**.

It is an email authentication protocol that builds on SPF and DKIM. DMARC allows domain owners to:

- Tell receiving mail servers how to handle unauthenticated mail claiming to be from their domain
- Receive reports about who is sending emails using their domain (legitimately or not)

---

## 🔍 How DMARC Works

1. A mail server receives an email claiming to be from `example.com`
2. It checks whether the email passes SPF **or** DKIM
3. It verifies that the domain in SPF/DKIM **aligns** with the `From:` address
4. It consults the DMARC record (in DNS) to decide what to do:
   - Accept the email
   - Mark it as spam (quarantine)
   - Reject it entirely

---

## 🧾 Example DMARC Record

```
_dmarc.example.com. IN TXT "v=DMARC1; p=reject; rua=mailto:dmarc@example.com"
```

- `v=DMARC1` → Version
- `p=reject` → Reject emails that fail DMARC
- `rua=...` → Send aggregate reports here

---

## ✅ TL;DR

| DMARC stands for       | **Domain-based Message Authentication, Reporting and Conformance** |
|------------------------|--------------------------------------------------------------------|
| Used for               | Controlling what happens to emails that fail SPF/DKIM              |
| Type of DNS record     | `TXT` at `_dmarc.yourdomain.com`                                   |
| Helps protect against  | Spoofing, phishing, brand abuse                                     |
| Works with             | SPF, DKIM, DNS                                                      |

