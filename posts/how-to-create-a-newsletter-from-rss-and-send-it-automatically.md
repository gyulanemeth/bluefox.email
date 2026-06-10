---
title: How to Create a Newsletter from an RSS Feed and Send It Automatically
description: Learn how to build and automate a weekly newsletter in BlueFox Email using an RSS feed. Step-by-step guide covering campaign setup, loop elements, merge tags, and time-based automations.
thumbnail: /assets/articles/how-to-create-a-newsletter-from-rss-and-send-it-automatically.webp

layout: post
category: tutorials

head:
  - - meta
    - name: description
      content: Learn how to build and automate a weekly newsletter in BlueFox Email using an RSS feed. Step-by-step guide covering campaign setup, loop elements, merge tags, and time-based automations.
  - - meta
    - property: og:title
      content: How to Create a Newsletter from an RSS Feed and Send It Automatically
  - - meta
    - property: og:description
      content: Learn how to build and automate a weekly newsletter in BlueFox Email using an RSS feed. Step-by-step guide covering campaign setup, loop elements, merge tags, and time-based automations.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/articles/how-to-create-a-newsletter-from-rss-and-send-it-automatically.png
  - - meta
    - property: og:url
      content: https://bluefox.email/posts/how-to-create-a-newsletter-from-rss-and-send-it-automatically
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: How to Create a Newsletter from an RSS Feed and Send It Automatically
  - - meta
    - name: twitter:description
      content: Learn how to build and automate a weekly newsletter in BlueFox Email using an RSS feed. Step-by-step guide covering campaign setup, loop elements, merge tags, and time-based automations.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/articles/how-to-create-a-newsletter-from-rss-and-send-it-automatically.png

lastUpdated: true
published: 2026-06-10
sidebar: false
---

# How to create a newsletter from RSS and send it automatically

You might write a blog, or follow a few great blogs. Which is great content, and you might wanna send it out automatically to your subscribers. Yeah, that's a good idea.

Most newsletters are written by hand. Someone sits down every week, picks the articles, copies the links, writes the intro, and hits send. That works, but it takes time and it relies on someone remembering to do it. If the content already exists in an RSS feed, there's no reason to do any of that manually.

With BlueFox Email, you can build a newsletter template once, connect it to an RSS feed, and then set up a time-based automation to send it on a schedule. Every week, the latest articles get pulled in automatically and sent to your subscribers, no manual work involved.

This approach works for your own blog, but also for any RSS feed you want to curate for your audience. Maybe you run a developer newsletter and want to surface the latest posts from a few trusted sources. Maybe you want to keep your customers updated with industry news. As long as there is an RSS feed, you can turn it into a newsletter.

In this article I'll show you how to do exactly that. We are going to use the ["WIRED" magazine's RSS feed related to AI](https://www.wired.com/feed/tag/ai/latest/rss) as our example, because who wouldn't be interested in AI these days!

```
https://www.wired.com/feed/tag/ai/latest/rss
```

The raw RSS feed has all the data we need, but it's not something you'd want to send to subscribers as-is.

![WIRED - AI RSS](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/01-wired-ai-rss.png)

We'll turn it into a nicely formatted, on-brand email that goes out every Monday morning at 9am, without anyone lifting a finger.

Let's get started. I'll begin by duplicating an existing campaign to use as the base.

## Creating the campaign

Copy an existing campaign...

![Copy a campaign](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/02-copy-a-campaign.png)

...and paste it.

![Paste the campaign](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/03-paste-the-campaign.png)

Give it a name, pick your subscriber list, and fill in the subject line. Don't overthink it, you can change all of this later.

![Fill in details](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/04-fill-in-details.png)

Your new campaign is ready.

![Editor opened](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/05-editor-opened.png)

### Connecting the RSS feed

Before we touch the editor, we need to wire up the data. Find the **Feeds** section on the campaign card and click **Add Feed**.

You can read more about [data feeds in our docs](/docs/projects/data-feeds).

![Add feed highlighted](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/06-add-feed-highlighted.png)

A form slides open.

![Add feed opened](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/07-add-feed-opened.png)

Paste in the RSS feed URL, set the type to **RSS / Atom XML**, and give it a variable name, for example `news`. That's the name you'll reference inside the email template.

![Fill in feed details](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/08-fill-in-feed-details.png)

Click **Preview** to confirm the feed is reachable and to see what fields are available on each item. You'll see things like `this.title`, `this.description`, `this.link`, and `this.enclosure.url` for the thumbnail image. Based on the pulled data, proper merge tags will be automatically shown in the editor.

![Preview feed](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/09-preview-feed.png)

Save the feed, then open the email editor.

![Open editor highlighted](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/10-open-editor-highlighted.png)

### Building the template

The email has some placeholder content from the original campaign. Let's start by editing the title block at the top. Click into it, then use the merge tag button to insert a dynamic value, for example the feed title (`news.title`). You can also use the description, date, or anything else available in the feed.

![Edit title](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/11-edit-title.png)

Just click the `{}` icon to open the merge tag dialog.

![Select merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/12-select-merge-tag.png)

The merge tag dialog shows all available merge tags, and a nice thing about it: it only shows the ones that are relevant in the current context.

Right now, just select the `news.title` merge tag.

![Merge tags are used](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/13-merge-tags-are-used.png)

Now delete the placeholder content blocks that we don't need, so we have a clean area to work with below the header.

![Other elements deleted](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/14-other-elements-deleted.png)

### Adding the loop

This is where the magic happens. Drag a **Loop** element from the left panel into the email body.

![Drag a loop element](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/15-drag-a-loop-element.png)

Put it right after the main section with the title and description and whatever else you added there.

![Loop element being dragged](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/16-loop-element-being-dragged.png)

Once it's placed, you'll see the loop settings in the right panel. Click on the **Select Your Expression** button.

![Loop element expression](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/17-loop-element-expression.png)

Now you can see what I mentioned earlier. The system only shows expressions that make sense in the current context. Since we are in a loop, it only shows arrays you can iterate over. In our example, that's the `news.item` array.

![Loop element select expression](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/18-loop-element-select-expression.png)

Set a **Limit** so the newsletter doesn't go on forever. Five or six articles is usually a good number for a weekly digest.

![Loop element set limit](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/19-loop-element-set-limit.png)

The loop is now bound to the feed.

![Loop element expression filled in](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/20-loop-element-expression-filled-in.png)

### Filling the loop with content

Now drop elements inside the loop and use merge tags to pull in the feed data.

Start with an **H2** heading. This will become the article title.

![Drop a h2 into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/21-drop-a-h2-into-loop.png)

Click the merge tag (`{}`) button in the toolbar...

![Click merge tag button](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/22-click-merge-tag-button.png)

...and select `this.title`. Here, the keyword `this` refers to the actual item in the array.

![Select title merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/23-select-title-merge-tag.png)

Next, add a **Paragraph** for the article description.

![Drop paragraph into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/24-drop-paragraph-into-loop.png)

Use the merge tag picker again and select `this.description`.

![Use description merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/25-use-description-merge-tag.png)

Now drag in a **Dynamic Image**, not a regular image element. We need a dynamic one because the image URL comes from the feed at send time. Regular image elements can only handle static URLs.

![Drop dynamic image into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/26-drop-dynamic-image-into-loop.png)

Set a sensible width so it fits nicely in the layout. As you can see, at 'edit time', it's just a placeholder image, since the real image will be used at send time as explained earlier.

![Set dynamic images width](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/27-set-dynamic-images-width.png)

Add some padding so it doesn't feel cramped.

![Add padding to dynamic image](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/28-add-padding-to-dynamic-image.png)

Now we need to handle the separation between articles. Drag a **Divider** element...

![Drag divider](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/29-drag-divider.png)

...and drop it **outside the loop**, right below it. This puts the divider before all the repeated items, not after each one.

![Drop outside the loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/30-drop-outside-the-loop.png)

It basically divides the header section from the articles.

![Divider added](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/31-divider-added.png)

Next, let's wire up the dynamic image's source. Click on the image, open the link settings, and add a link using a merge tag.

![Add link with merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/32-add-link-with-merge-tag.png)

Select the thumbnail merge tag. This is the feed's image URL field (typically `this.media:thumbnail.url` or similar, depending on the feed).

![Select thumbnail merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/33-select-thumbnail-merge-tag.png)

The merge tag is applied. Press **Save**.

![Thumbnail merge tag applied press save](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/34-thumbnail-merge-tag-applied-press-save.png)

### Previewing the result

Let's see how it looks. Press the **Preview** button.

![Press preview](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/35-press-preview.png)

In the plain preview you'll see the merge tags as placeholders. That's fine, it just means the template is set up correctly.

![Preview with merge tags](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/36-preview-with-merge-tags.png)

Now switch to **Preview with data** to see what the email will actually look like when it sends.

![Press preview with data](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/37-press-preview-with-data.png)

Real articles from the Wired AI feed are rendered in the loop. Title, description, and image. All pulled in live.

![Data is merged 01](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/38-data-is-merged-01.png)

Scroll...

![Data is merged 02](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/39-data-is-merged-02.png)

Scroll...

![Data is merged 03](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/40-data-is-merged-03.png)

Looking good! But a reader has no way to click through to the full article yet. Let's add a button.

### Adding a "Read more" button

Drop a **Button** element inside the loop.

![Add button to loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/41-add-button-to-loop.png)

In the button's link settings, set the protocol to **Other**. This lets us use a merge tag as the URL instead of picking a fixed protocol from the dropdown.

![Set link protocol to other](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/42-set-link-protocol-to-other.png)

Click the merge tag icon next to the link field...

![Click link merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/43-click-link-merge-tag.png)

...and select `this.link`. That's the article URL from the feed.

![Select link merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/44-select-link-merge-tag.png)

Save it.

![Save link merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/45-save-link-merge-tag.png)

And add a **Divider** inside the loop too. This one goes between articles, so each item is visually separated.

![Add divider into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/46-add-divider-into-loop.png)

Preview with data one more time. Now each article has a "Read more" button and clean dividers between them.

![Preview with data with button and dividers](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/47-preview-with-data-with-button-and-dividers.png)

The template is done. Save and close the editor.

![Save and close the editor](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/48-save-and-close-the-editor.png)

## Testing it out

Before we send to anyone, let's make sure it works. Click **Send Test Email** on the campaign card.

![Click send test email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/49-click-send-test-email.png)

Enter your email address and send it.

![Fill in your email address and send](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/50-fill-in-your-email-address-and-send.png)

Check your inbox. The newsletter should arrive with real articles from the RSS feed. Title, description, image, and working "Read more" links.

![Check it in your inbox](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/51-check-it-in-your-inbox.png)

One more thing! The subject line can use merge tags too. Go back to the campaign card and update the subject with something dynamic, like the current date or the feed title. In our example, we use the title of the first item: `this.item.0.title`. I think that makes it perfect, because the subject line will always change with new stories coming in.

![Use merge tag in subject line](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/52-use-merge-tag-in-subject-line.png)

Send the test again and confirm it shows up correctly in your inbox.

![Check it again in inbox](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/53-check-it-again-in-inbox.png)

The email looks great. Now let's automate the whole thing.

## Creating the weekly automation

We're going to set up an [automation](/docs/projects/automations) that fires every Monday at 9am and sends this newsletter automatically.

First, copy the campaign. We'll paste it into the automation in a moment.

![Copy the campaign](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/54-copy-the-campaign.png)

Head over to the **Automations** tab.

![Open automations](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/55-open-automations.png)

Create a new automation.

![Create a new automation](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/56-create-a-new-automation.png)

Choose to start from scratch.

![Create automation from scratch](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/57-create-automation-from-scratch.png)

For the trigger, select **Time-based**.

![Create automation with time based trigger](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/58-create-automation-with-time-based-trigger.png)

Set the frequency to **Weekly**.

![Create automation with time based trigger weekly](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/59-create-automation-with-time-based-trigger-weekly.png)

Choose **Monday** as the day.

![Create automation with time based trigger weekly on mondays](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/60-create-automation-with-time-based-trigger-weekly-on-mondays.png)

Set the time to **9:00**.

![Create automation with time based trigger weekly on mondays at nine](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/61-create-automation-with-time-based-trigger-weekly-on-mondays-at-nine.png)

The automation editor opens with just the trigger node in place.

![Automation editor](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/62-automation-editor.png)

### Adding the send email node

Click the **+** button below the trigger node to add the next step.

![Automation editor click plus](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/63-automation-editor-click-plus.png)

Select **Send Email**.

![Automation editor select send email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/64-automation-editor-select-send-email.png)

Click on the Send Email node to expand it.

![Automation editor click on send email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/65-automation-editor-click-on-send-email.png)

Click **Create Email**.

![Automation editor click on create email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/66-automation-editor-click-on-create-email.png)

Choose **Copy and Paste**. This is where we paste the campaign we copied earlier.

![Automation editor click on copy and paste](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/67-automation-editor-click-on-copy-and-paste.png)

The email is created. Click **Open Editor** to confirm everything looks right.

![Automation editor click on open editor](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/68-automation-editor-click-on-open-editor.png)

The template is there exactly as we built it. Save and close.

![Email editor save and close](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/69-email-editor-save-and-close.png)

The feed was copied over as well! The automation already knows which RSS feed to use when it runs.

![Automation editor feed is copied](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/70-automation-editor-feed-is-copied.png)

### Finishing the automation

Click **+** one more time to add the final node.

![Automation editor press plus again](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/71-automation-editor-press-plus-again.png)

Select **Complete**. This marks the end of the automation flow. Without it, contacts would queue up at the last node and never exit.

![Automation editor select complete node](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/72-automation-editor-select-complete-node.png)

The automation is ready to go.

![Automation is ready](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/73-automation-is-ready.png)

Hit **Start**. Every Monday at 9am, BlueFox Email will fetch the latest articles from the Wired AI RSS feed, render them into your template, and send the newsletter to your subscriber list automatically.

![Start the automation](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/74-start-the-automation.png)

No manual work. No forgetting. Just a fresh newsletter in your subscribers' inboxes every week.
