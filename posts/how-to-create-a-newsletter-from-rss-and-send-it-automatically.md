---
title: How SPF, DKIM, and DMARC Actually Work (With Real Examples)
description: Learn how SPF, DKIM, and DMARC work together to authenticate email and prevent spoofing, using real examples from BlueFox Email.
thumbnail: /assets/articles/how-spf-dkim-and-dmarc-actually-work-with-real-examples-share.webp

layout: post
category: articles

head:
  - - meta
    - name: description
      content: Learn how SPF, DKIM, and DMARC work together to authenticate email and prevent spoofing, using real examples from BlueFox Email.
  - - meta
    - property: og:title
      content: How SPF, DKIM, and DMARC Actually Work (With Real Examples)
  - - meta
    - property: og:description
      content: Understand how SPF, DKIM, and DMARC protect your domain and emails with this in-depth tutorial and real-life examples.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/articles/how-spf-dkim-and-dmarc-actually-work-with-real-examples-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/posts/how-spf-dkim-and-dmarc-actually-work-with-real-examples
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: How SPF, DKIM, and DMARC Actually Work (With Real Examples)
  - - meta
    - name: twitter:description
      content: Understand how SPF, DKIM, and DMARC protect your domain and emails with this in-depth tutorial and real-life examples.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/articles/how-spf-dkim-and-dmarc-actually-work-with-real-examples-share.png

lastUpdated: true
published: 2025-06-10
sidebar: false
---

# How to create a newsletter from RSS and send it automatically

You might write a blog. Which is great content, and you might wanna send it out automatically to your subscribers. Yeah, that's a good idea.

Let me show you how to do it. In this article, I will show you how you can create a weekly newsletter based on an RSS feed and send it automatically.

We are going to use the ["WIRED" magazine's RSS feed related to AI](https://www.wired.com/feed/tag/ai/latest/rss), because who wouldn't be interested in AI these days!

```
https://www.wired.com/feed/tag/ai/latest/rss
```

The RSS feed is pretty well formatted, but still, it would be nicer to see a well-formatted newsletter.

![WIRED - AI RSS](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/01-wired-ai-rss.png)

First of all, we will need to create an email template that pulls in that data.

Let's just duplicate a campaign and get started from there.

![Copy a campaign](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/02-copy-a-campaign.png)

![Paste the campaign](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/03-paste-the-campaign.png)

![Fill in details](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/04-fill-in-details.png)

![Editor opened](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/05-editor-opened.png)

![Add feed highlighted](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/06-add-feed-highlighted.png)

![Add feed opened](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/07-add-feed-opened.png)

![Fill in feed details](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/08-fill-in-feed-details.png)

![Preview feed](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/09-preview-feed.png)

![Open editor highlighted](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/10-open-editor-highlighted.png)

![Edit title](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/11-edit-title.png)

![Select merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/12-select-merge-tag.png)

![Merge tags are used](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/13-merge-tags-are-used.png)

![Other elements deleted](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/14-other-elements-deleted.png)

![Drag a loop element](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/15-drag-a-loop-element.png)

![Loop element being dragged](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/16-loop-element-being-dragged.png)

![Loop element expression](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/17-loop-element-expression.png)

![Loop element select expression](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/18-loop-element-select-expression.png)

![Loop element set limit](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/19-loop-element-set-limit.png)

![Loop element expression filled in](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/20-loop-element-expression-filled-in.png)

![Drop a h2 into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/21-drop-a-h2-into-loop.png)

![Click merge tag button](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/22-click-merge-tag-button.png)

![Select title merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/23-select-title-merge-tag.png)

![Drop paragraph into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/24-drop-paragraph-into-loop.png)

![Use description merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/25-use-description-merge-tag.png)

![Drop dynamic image into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/26-drop-dynamic-image-into-loop.png)

![Set dynamic images width](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/27-set-dynamic-images-width.png)

![Add padding to dynamic image](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/28-add-padding-to-dynamic-image.png)

![Drag divider](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/29-drag-divider.png)

![Drop outside the loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/30-drop-outside-the-loop.png)

![Divider added](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/31-divider-added.png)

![Add link with merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/32-add-link-with-merge-tag.png)

![Select thumbnail merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/33-select-thumbnail-merge-tag.png)

![Thumbnail merge tag applied press save](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/34-thumbnail-merge-tag-applied-press-save.png)

![Press preview](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/35-press-preview.png)

![Preview with merge tags](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/36-preview-with-merge-tags.png)

![Press preview with data](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/37-press-preview-with-data.png)

![Data is merged 01](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/38-data-is-merged-01.png)

![Data is merged 02](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/39-data-is-merged-02.png)

![Data is merged 03](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/40-data-is-merged-03.png)

![Add button to loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/41-add-button-to-loop.png)

![Set link protocol to other](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/42-set-link-protocol-to-other.png)

![Click link merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/43-click-link-merge-tag.png)

![Select link merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/44-select-link-merge-tag.png)

![Save link merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/45-save-link-merge-tag.png)

![Add divider into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/46-add-divider-into-loop.png)

![Preview with data with button and dividers](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/47-preview-with-data-with-button-and-dividers.png)

![Save and close the editor](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/48-save-and-close-the-editor.png)

![Click send test email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/49-click-send-test-email.png)

![Fill in your email address and send](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/50-fill-in-your-email-address-and-send.png)

![Check it in your inbox](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/51-check-it-in-your-inbox.png)

![Use merge tag in subject line](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/52-use-merge-tag-in-subject-line.png)

![Check it again in inbox](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/53-check-it-again-in-inbox.png)

![Copy the campaign](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/54-copy-the-campaign.png)

![Open automations](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/55-open-automations.png)

![Create a new automation](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/56-create-a-new-automation.png)

![Create automation from scratch](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/57-create-automation-from-scratch.png)

![Create automation with time based trigger](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/58-create-automation-with-time-based-trigger.png)

![Create automation with time based trigger weekly](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/59-create-automation-with-time-based-trigger-weekly.png)

![Create automation with time based trigger weekly on mondays](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/60-create-automation-with-time-based-trigger-weekly-on-mondays.png)

![Create automation with time based trigger weekly on mondays at nine](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/61-create-automation-with-time-based-trigger-weekly-on-mondays-at-nine.png)

![Automation editor](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/62-automation-editor.png)

![Automation editor click plus](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/63-automation-editor-click-plus.png)

![Automation editor select send email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/64-automation-editor-select-send-email.png)

![Automation editor click on send email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/65-automation-editor-click-on-send-email.png)

![Automation editor click on create email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/66-automation-editor-click-on-create-email.png)

![Automation editor click on copy and paste](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/67-automation-editor-click-on-copy-and-paste.png)

![Automation editor click on open editor](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/68-automation-editor-click-on-open-editor.png)

![Email editor save and close](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/69-email-editor-save-and-close.png)

![Automation editor feed is copied](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/70-automation-editor-feed-is-copied.png)

![Automation editor press plus again](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/71-automation-editor-press-plus-again.png)

![Automation editor select complete node](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/72-automation-editor-select-complete-node.png)

![Automation is ready](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/73-automation-is-ready.png)

![Start the automation](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/74-start-the-automation.png)
