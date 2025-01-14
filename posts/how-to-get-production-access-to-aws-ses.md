---
title: How to Get Production Access to AWS SES
description: Read a few tips about what you should do to convince AWS support to give you production access to SES.

layout: post
category: tutorials
lastUpdated: true
published: false
sidebar: false
---

# How to Get Production Access to AWS SES

Many people are having problems with getting production access to AWS SES. We have done it several times, so we try to summarize to you what you should do.

::: tip TLDR

Make sure you:
 1) Do not send spammy emails.
 2) Handle bounces and complaints. (Best if you automatically remove them from your list.)
 3) Include an unsubscribe link in your emails. (Except for transactional emails, and in cases when it's required by law to send an email to your user.)

Explain AWS support how you comply with these. It's that simple!

Not enough explanation? Read the full version below!

:::

::: warning Do you have more tips?

Please write an email to info [at] bluefox.email with your ideas, and we are going to include it in this article. (Please use the following subject line: "Production access to AWS SES Ideas")

:::

## AWS SES in Sandbox

If you’re new to SES, you’re initially put in what they call the "Sandbox". In this mode, **you can only send emails to addresses you verify in advance.**



1) So your very first step is to verify a few email addresses you will use for testing. You just need to prove that you have access to that email address by clicking on a link. By doing so, you will be able to **send to** these email addresses, and **send from** these email addresses with your SES.
2) Your next step should be to **verify your domain** in SES. Verifying a domain is more versatile because it lets you send from any email address under that domain. It’s straightforward: just follow SES’s instructions for adding a TXT record to your DNS settings.
3) You’ll need the **right permissions for your IAM user** or role to manage SES. Make sure it has at least permissions to send emails and manage your account settings. (Or you can give it full access to SES if you are lazy.)

With all of these, you can play around with SES. You can generate an `Access Key Id` and a `Secret Access Key` and you can send your first email via AWS SES. Alternatively, you can set up your credentials in your [bluefox.emial project](/docs/projects/settings.html#aws-credentials), and send your first email from there!

## Requesting Production Access to AWS SES

Here’s where you make the big move. AWS has you submit a request to get out of the sandbox and start sending emails without restrictions.

1. **Go to the AWS SES Console**  
   Log in, head to SES, and in the left sidebar, look for **Sending Statistics**. There, you’ll see an option to **Request Production Access**.

2. **Fill Out the Request Form**  
   AWS is going to ask you a few things. They’re trying to make sure you’re legit and not going to send spam or shady emails. Here’s what you’ll need to cover:
   
   - **Region**: Choose the AWS region where you want production access. (Pro tip: Once you get access in one region, it doesn’t apply to others—you’d need to repeat the process if you need access elsewhere).
   - **Mail Type**: Be clear about what kind of emails you’ll be sending. Examples include “Transactional” or “Marketing.” For example, if you're using SES with a SaaS platform, just explain that you're sending legitimate transactional or promotional emails to subscribers.
   - **Use Case**: AWS wants to know why you need SES, so they understand your purpose. Here, be straightforward — describe how your app or business sends emails, like notifications, newsletters, etc.
   - **Daily Email Volume**: Estimate how many emails you plan to send daily. Start with a realistic number. You can always request an increase later if you grow.
   - **Website URL**: AWS likes to see your website to ensure you’re a real, established business. If you’re a SaaS product or app, link to the main site and make sure it’s functional!
   - **Additional Details**: Here’s your chance to show AWS you’re legit. Explain that you’ve put in place all necessary measures for email compliance — like unsubscribe links, clear sender information, and content that’s in line with their policies.
 3. **Submit the Request**  
   Now it’s a waiting game. Usually, AWS gets back to you within a day or two, but it can sometimes take longer, depending on the specifics of your application and your account history.

I believe that the most important part of the request form is the "Additional Details" section. In the "Use-Case" and the "Mail Type" sections, you should have already explained how you want to use SES and your emails won't be spammy. In the "Additional Details" part, you can explain the technicalities about bounces, complaints, and unsubscribe links with subscription management.

Explain them that you are going to handle bounces and complaints by using SNS (Simple Notification Service) to send notifications to your webhooks. The webooks will flag the email addresses that complained or bounced, and you won't send any more emails to those email addresses. (You really should do this.)

Also explain, that any emails that are not transactional emails will contain an unsubscribe link that will lead the user to your email preferences page, where they can unsubscribe from your lists. (You really should do this.)

You can also explain that your users only can't unsubscribe from transactional emails or from messages that you required to send by law.

Finally, explain that your users will need to double opt-in to your emails (eg. newsletters) and when they register to your app and you sign them up to different lists, they accepted it by explicitly accepting the terms and conditions in which you explained it. (You really should do this.)

::: tip An "Additional Details" example, assuming you use bluefox.email



:::

## Handle the Response to Your "Production Access Request" from AWS Support

Once AWS reviews your application, you’ll get an email with their decision. There are two possible outcomes:

- **Approved**: Woohoo! You’re now in production mode. This means you can send emails to anyone (not just verified addresses).
- **Denied**: It happens! AWS might decline if they think your use case isn't clear, or if they have concerns. If that’s the case, check their feedback, make any suggested changes, and try again. You can also contact AWS Support for clarification if it’s not obvious why they said no.

Once, my production access request was declined, and I did not understand why, because I was confident that I should get prod access! Then I explained to them again that I satisfy their policies, and explained again (in more detail) why I comply with their policies. I wrote down all the email types we send and why we comply with their policies.

And then without any explanation, I got production access. So, sometimes, you just have to highlight again why you comply with their policies.

## Get Sending – Carefully, & Responsibly!

Now that you’re in production mode, you’re ready to send emails without limits. Just keep a few things in mind:

- **Respect the guidelines**: SES has a no-spam rule. Make sure your recipients actually want to receive your emails.
- **Monitor Your Stats**: SES gives you data on bounces, complaints, and more. Keeping these rates low keeps your SES reputation solid.
- **Request Quota Increases if Needed**: Once you’re in production mode, you can request a higher daily send limit. Just go to the SES console, and you’ll see an option to request more.

---

And that’s it! I hope it helps, but if you have any questions, please reach out to us at hello [at] bluefox.email! We will try to help!
