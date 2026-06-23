---
title: How to Create a Newsletter from an RSS Feed and Send It Automatically
description: Learn how to build and automate a weekly newsletter in BlueFox Email using an RSS feed. Step-by-step guide covering campaign setup, loop elements, merge tags, and time-based automations.
thumbnail: /assets/articles/how-to-create-a-newsletter-from-rss-and-send-it-automatically.webp

layout: post
category: tutorials
tags: ['RSS Feed', 'Newsletters', 'Email Automation', 'Tutorials']
keywords: ['newsletter from RSS feed', 'RSS newsletter', 'automated newsletter', 'RSS email newsletter', 'email marketing automation']

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

![WIRED - AI RSS](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/01-wired-ai-rss.webp)

We'll turn it into a nicely formatted, on-brand email that goes out every Monday morning at 9am, without anyone lifting a finger.

Let's get started. I'll begin by duplicating an existing campaign to use as the base.

## Creating the campaign

Copy an existing campaign...

![Copy a campaign](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/02-copy-a-campaign.webp)

...and paste it.

![Paste the campaign](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/03-paste-the-campaign.webp)

Give it a name, pick your subscriber list, and fill in the subject line. Don't overthink it, you can change all of this later.

![Fill in details](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/04-fill-in-details.webp)

Your new campaign is ready.

![Editor opened](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/05-editor-opened.webp)

### Connecting the RSS feed

Before we touch the editor, we need to wire up the data. Find the **Feeds** section on the campaign card and click **Add Feed**.

You can read more about [data feeds in our docs](/docs/projects/data-feeds).

![Add feed highlighted](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/06-add-feed-highlighted.webp)

A form slides open.

![Add feed opened](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/07-add-feed-opened.webp)

Paste in the RSS feed URL, set the type to **RSS / Atom XML**, and give it a variable name, for example `news`. That's the name you'll reference inside the email template.

![Fill in feed details](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/08-fill-in-feed-details.webp)

Click **Preview** to confirm the feed is reachable and to see what fields are available on each item. You'll see things like `this.title`, `this.description`, `this.link`, and `this.enclosure.url` for the thumbnail image. Based on the pulled data, proper merge tags will be automatically shown in the editor.

![Preview feed](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/09-preview-feed.webp)

Save the feed, then open the email editor.

![Open editor highlighted](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/10-open-editor-highlighted.webp)

### Building the template

The email has some placeholder content from the original campaign. Let's start by editing the title block at the top. Click into it, then use the merge tag button to insert a dynamic value, for example the feed title (`news.title`). You can also use the description, date, or anything else available in the feed.

![Edit title](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/11-edit-title.webp)

Just click the `{}` icon to open the merge tag dialog.

![Select merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/12-select-merge-tag.webp)

The merge tag dialog shows all available merge tags, and a nice thing about it: it only shows the ones that are relevant in the current context.

Right now, just select the `news.title` merge tag.

![Merge tags are used](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/13-merge-tags-are-used.webp)

Now delete the placeholder content blocks that we don't need, so we have a clean area to work with below the header.

![Other elements deleted](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/14-other-elements-deleted.webp)

### Adding the loop

This is where the magic happens. Drag a **Loop** element from the left panel into the email body.

![Drag a loop element](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/15-drag-a-loop-element.webp)

Put it right after the main section with the title and description and whatever else you added there.

![Loop element being dragged](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/16-loop-element-being-dragged.webp)

Once it's placed, you'll see the loop settings in the right panel. Click on the **Select Your Expression** button.

![Loop element expression](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/17-loop-element-expression.webp)

Now you can see what I mentioned earlier. The system only shows expressions that make sense in the current context. Since we are in a loop, it only shows arrays you can iterate over. In our example, that's the `news.item` array.

![Loop element select expression](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/18-loop-element-select-expression.webp)

Set a **Limit** so the newsletter doesn't go on forever. Five or six articles is usually a good number for a weekly digest.

![Loop element set limit](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/19-loop-element-set-limit.webp)

The loop is now bound to the feed.

![Loop element expression filled in](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/20-loop-element-expression-filled-in.webp)

### Filling the loop with content

Now drop elements inside the loop and use merge tags to pull in the feed data.

Start with an **H2** heading. This will become the article title.

![Drop a h2 into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/21-drop-a-h2-into-loop.webp)

Click the merge tag (`{}`) button in the toolbar...

![Click merge tag button](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/22-click-merge-tag-button.webp)

...and select `this.title`. Here, the keyword `this` refers to the actual item in the array.

![Select title merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/23-select-title-merge-tag.webp)

Next, add a **Paragraph** for the article description.

![Drop paragraph into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/24-drop-paragraph-into-loop.webp)

Use the merge tag picker again and select `this.description`.

![Use description merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/25-use-description-merge-tag.webp)

Now drag in a **Dynamic Image**, not a regular image element. We need a dynamic one because the image URL comes from the feed at send time. Regular image elements can only handle static URLs.

![Drop dynamic image into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/26-drop-dynamic-image-into-loop.webp)

Set a sensible width so it fits nicely in the layout. As you can see, at 'edit time', it's just a placeholder image, since the real image will be used at send time as explained earlier.

![Set dynamic images width](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/27-set-dynamic-images-width.webp)

Add some padding so it doesn't feel cramped.

![Add padding to dynamic image](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/28-add-padding-to-dynamic-image.webp)

Now we need to handle the separation between articles. Drag a **Divider** element...

![Drag divider](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/29-drag-divider.webp)

...and drop it **outside the loop**, right below it. This puts the divider before all the repeated items, not after each one.

![Drop outside the loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/30-drop-outside-the-loop.webp)

It basically divides the header section from the articles.

![Divider added](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/31-divider-added.webp)

Next, let's wire up the dynamic image's source. Click on the image, open the link settings, and add a link using a merge tag.

![Add link with merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/32-add-link-with-merge-tag.webp)

Select the thumbnail merge tag. This is the feed's image URL field (typically `this.media:thumbnail.url` or similar, depending on the feed).

![Select thumbnail merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/33-select-thumbnail-merge-tag.webp)

The merge tag is applied. Press **Save**.

![Thumbnail merge tag applied press save](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/34-thumbnail-merge-tag-applied-press-save.webp)

### Previewing the result

Let's see how it looks. Press the **Preview** button.

![Press preview](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/35-press-preview.webp)

In the plain preview you'll see the merge tags as placeholders. That's fine, it just means the template is set up correctly.

![Preview with merge tags](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/36-preview-with-merge-tags.webp)

Now switch to **Preview with data** to see what the email will actually look like when it sends.

![Press preview with data](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/37-press-preview-with-data.webp)

Real articles from the Wired AI feed are rendered in the loop. Title, description, and image. All pulled in live.

![Data is merged 01](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/38-data-is-merged-01.webp)

Scroll...

![Data is merged 02](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/39-data-is-merged-02.webp)

Scroll...

![Data is merged 03](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/40-data-is-merged-03.webp)

Looking good! But a reader has no way to click through to the full article yet. Let's add a button.

### Adding a "Read more" button

Drop a **Button** element inside the loop.

![Add button to loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/41-add-button-to-loop.webp)

In the button's link settings, set the protocol to **Other**. This lets us use a merge tag as the URL instead of picking a fixed protocol from the dropdown.

![Set link protocol to other](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/42-set-link-protocol-to-other.webp)

Click the merge tag icon next to the link field...

![Click link merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/43-click-link-merge-tag.webp)

...and select `this.link`. That's the article URL from the feed.

![Select link merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/44-select-link-merge-tag.webp)

Save it.

![Save link merge tag](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/45-save-link-merge-tag.webp)

And add a **Divider** inside the loop too. This one goes between articles, so each item is visually separated.

![Add divider into loop](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/46-add-divider-into-loop.webp)

Preview with data one more time. Now each article has a "Read more" button and clean dividers between them.

![Preview with data with button and dividers](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/47-preview-with-data-with-button-and-dividers.webp)

The template is done. Save and close the editor.

![Save and close the editor](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/48-save-and-close-the-editor.webp)

## Testing it out

Before we send to anyone, let's make sure it works. Click **Send Test Email** on the campaign card.

![Click send test email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/49-click-send-test-email.webp)

Enter your email address and send it.

![Fill in your email address and send](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/50-fill-in-your-email-address-and-send.webp)

Check your inbox. The newsletter should arrive with real articles from the RSS feed. Title, description, image, and working "Read more" links.

![Check it in your inbox](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/51-check-it-in-your-inbox.webp)

One more thing! The subject line can use merge tags too. Go back to the campaign card and update the subject with something dynamic, like the current date or the feed title. In our example, we use the title of the first item: `this.item.0.title`. I think that makes it perfect, because the subject line will always change with new stories coming in.

![Use merge tag in subject line](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/52-use-merge-tag-in-subject-line.webp)

Send the test again and confirm it shows up correctly in your inbox.

![Check it again in inbox](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/53-check-it-again-in-inbox.webp)

The email looks great. Now let's automate the whole thing.

## Creating the weekly automation

We're going to set up an [automation](/docs/projects/automations) that fires every Monday at 9am and sends this newsletter automatically.

First, copy the campaign. We'll paste it into the automation in a moment.

![Copy the campaign](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/54-copy-the-campaign.webp)

Head over to the **Automations** tab.

![Open automations](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/55-open-automations.webp)

Create a new automation.

![Create a new automation](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/56-create-a-new-automation.webp)

Choose to start from scratch.

![Create automation from scratch](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/57-create-automation-from-scratch.webp)

For the trigger, select **Time-based**.

![Create automation with time based trigger](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/58-create-automation-with-time-based-trigger.webp)

Set the frequency to **Weekly**.

![Create automation with time based trigger weekly](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/59-create-automation-with-time-based-trigger-weekly.webp)

Choose **Monday** as the day.

![Create automation with time based trigger weekly on mondays](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/60-create-automation-with-time-based-trigger-weekly-on-mondays.webp)

Set the time to **9:00**.

![Create automation with time based trigger weekly on mondays at nine](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/61-create-automation-with-time-based-trigger-weekly-on-mondays-at-nine.webp)

The automation editor opens with just the trigger node in place.

![Automation editor](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/62-automation-editor.webp)

### Adding the send email node

Click the **+** button below the trigger node to add the next step.

![Automation editor click plus](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/63-automation-editor-click-plus.webp)

Select **Send Email**.

![Automation editor select send email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/64-automation-editor-select-send-email.webp)

Click on the Send Email node to expand it.

![Automation editor click on send email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/65-automation-editor-click-on-send-email.webp)

Click **Create Email**.

![Automation editor click on create email](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/66-automation-editor-click-on-create-email.webp)

Choose **Copy and Paste**. This is where we paste the campaign we copied earlier.

![Automation editor click on copy and paste](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/67-automation-editor-click-on-copy-and-paste.webp)

The email is created. Click **Open Editor** to confirm everything looks right.

![Automation editor click on open editor](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/68-automation-editor-click-on-open-editor.webp)

The template is there exactly as we built it. Save and close.

![Email editor save and close](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/69-email-editor-save-and-close.webp)

The feed was copied over as well! The automation already knows which RSS feed to use when it runs.

![Automation editor feed is copied](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/70-automation-editor-feed-is-copied.webp)

### Finishing the automation

Click **+** one more time to add the final node.

![Automation editor press plus again](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/71-automation-editor-press-plus-again.webp)

Select **Complete**. This marks the end of the automation flow. Without it, contacts would queue up at the last node and never exit.

![Automation editor select complete node](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/72-automation-editor-select-complete-node.webp)

The automation is ready to go.

![Automation is ready](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/73-automation-is-ready.webp)

Hit **Start**. Every Monday at 9am, BlueFox Email will fetch the latest articles from the Wired AI RSS feed, render them into your template, and send the newsletter to your subscriber list automatically.

![Start the automation](./how-to-create-a-newsletter-from-rss-and-send-it-automatically/74-start-the-automation.webp)

No manual work. No forgetting. Just a fresh newsletter in your subscribers' inboxes every week.

## Frequently asked questions

### What is an RSS newsletter?

An RSS newsletter is an email that's automatically populated with content from an RSS feed. Instead of writing each edition by hand, you build the template once and the tool pulls in the latest articles each time it sends. The result lands in subscribers' inboxes just like a regular newsletter, but you didn't have to lift a finger after the initial setup.

### Can I use any RSS feed, or does it have to be my own blog?

Any publicly accessible RSS or Atom feed works. You can use your own blog feed, a third-party publication's feed, a podcast feed, or even aggregate several feeds into one newsletter. As long as the URL returns valid XML, BlueFox Email can connect to it.

### How often can I schedule the newsletter?

BlueFox Email's time-based automations support daily, weekly, and monthly schedules. You pick the day and time, and the automation fires on that cadence automatically.

### What happens if the RSS feed has no new items since the last send?

The newsletter still sends. It will show whatever items are currently at the top of the feed, even if they appeared in a previous edition. If you want to avoid repeats, limit the feed to the most recent item and check your feed's update frequency before choosing a send schedule.

### Do I need to know how to code to set this up?

No. The entire workflow covered here, connecting the feed, building the loop template, and scheduling the automation, is done through BlueFox Email's visual interface. No HTML, no code, no configuration files.
