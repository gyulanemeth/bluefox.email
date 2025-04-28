# Email Security

DKIM, SPF, DMARC

TLA?

You probably heard about these TLAs (Three Letter Abbreviations), but what do they mean? How do they work?

If you are advanced in email security/authentication, you probably also heard that:

DKIM - is for checking the validity of your email
SPF - is for checking if an email is sent from a legit IP address
and DMARC is for enforcing those above, quarantening or rejecting emails. (And also getting reports maybe.)

But how do these actually work? Let's get into it, shall we?

## SMTP (Simple Mail Transfer Protocol)

This is the standard protocol for sending emails through the internet. (Client -> server and server -> server. Not for receiving.)

Before we go into the details, let's quickly recap how SMTP works

...

let's get back to how smtp works. So:
 - I write an email in my email client
 - that connects to an SMTP server to send the email
 - the smtp server looks up the MX record (Mail Exchange record) of the receiving server, so it knows where to send the email (which is also an SMTP server)
 - the "SMTP sender" servers connects to the SMTP reveiver server, opens an SMTP session. Sends the message, if everything is accepted, the message is delivered.
 - it is stored on the mail server
 - it is downloaded with IMAP (or POP3)

```
HELO client.example.com
MAIL FROM:<you@example.com>
RCPT TO:<friend@example.net>
DATA
Subject: Test
Hello World.
.
QUIT
```


## DKIM

## SPF

## DMARC

