---
title: Statistics | bluefox.email documentation
description: Gain deep insights into your email and subscription performance with bluefox.email's Statistics page. Track sends, opens, clicks, and subscription trends across your project, campaigns, automations, and more.
faqs:
  - question: "What email metrics does the BlueFox Email Statistics page track?"
    answer: "The Email Sending Trends tab tracks sends, send rate, failure, failure rate, opens, open rate, unique opens, unique open rate, clicks, click rate, unique clicks, unique click rate, clicks/unique opens, unique clicks/unique opens, unsubscribes/unique opens, bounces, bounce rate, complaints, and complaint rate. These are available at the account level, project level, and for individual transactional emails, triggered emails, campaigns, and automation emails."
  - question: "What time intervals can I view Statistics charts by?"
    answer: "Charts default to a daily time interval, and you can switch to hourly, weekly, or monthly using the time interval switcher. Daily, weekly, and monthly views support up to a 1 year range, while the hourly view supports up to 7 days."
  - question: "What subscription metrics does the BlueFox Email Statistics page show?"
    answer: "The Subscription Trends tab's overview banner shows new contacts, subscriptions, unique subscriptions, unsubscribes, unique unsubscribes, paused, and unique paused. Its chart tracks subscribe, unsubscribe, pause subscription, unpause subscription, and resubscribe events over time."
  - question: "Can I export statistics data from BlueFox Email?"
    answer: "Yes. Each email or automation's statistics page includes a data table below the chart that shows raw event-level data. You can filter the table by opened, clicked, bounced, complained, or unsubscribed status, then download the filtered results as a CSV file."
head:
  - - meta
    - name: description
      content: Gain deep insights into your email and subscription performance with bluefox.email's Statistics page. Track sends, opens, clicks, and subscription trends across your project, campaigns, automations, and more.
  - - meta
    - property: og:title
      content: Statistics | bluefox.email documentation
  - - meta
    - property: og:description
      content: Gain deep insights into your email and subscription performance with bluefox.email's Statistics page. Track sends, opens, clicks, and subscription trends across your project, campaigns, automations, and more.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/statistics
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Statistics | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Gain deep insights into your email and subscription performance with bluefox.email's Statistics page. Track sends, opens, clicks, and subscription trends across your project, campaigns, automations, and more.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Statistics

The Statistics section in your application provides a comprehensive analysis of email performance, subscription trends, and user engagement metrics. It is designed to cater to multiple scopes, such as [**account**](/docs/dashboard#key-metrics-in-the-account-dashboard), [**project**](/docs/projects/dashboard), [**transactional emails**](/docs/projects/transactional-emails#transactional-email-statistics), [**triggered emails**](/docs/projects/triggered-emails#triggered-email-statistics), [**automations**](/docs/projects/automations#automation-stats), [**campaigns**](/docs/projects/campaigns#campaign-email-statistics) and [**subscriber lists**](/docs/projects/contacts#list-statistics). Each type of statistic is presented with clear visuals, detailed filters, and actionable insights.

## Overview

The Statistics page has two tabs: **Email Sending Trends** and **Subscription Trends**.

![Statistics page overview](./statistics-overview-tabs.webp)

Both tabs default to a **daily** time interval. You can switch to **hourly**, **weekly**, or **monthly** using the time interval switcher above the chart.

![Time interval switcher](./statistics-overview-time-interval.webp)

You can also switch the chart view between **line chart** and **bar chart** using the chart type toggle button.

![Chart type toggle](./statistics-overview-chart-type.webp)

## Email Sending Trends

By default, the Statistics page shows this tab, displaying overall project metrics for the past month.

At the top of the tab, an overview banner shows **sent**, **failed**, **opens**, **unique opens**, **clicks**, **unique clicks**, **bounced**, and **complaints**, along with derived rates: **unique open rate**, **clicks/unique opens**, **unique clicks/unique opens**, and **unique unsubscribes/unique opens**.

![Email Sending Trends overview banner](./statistics-email-trends-banner.webp)

By default, the chart shows the **Sends** metric, along with a **How it's calculated** note explaining what the metric means.

You can change the metric using the dropdown next to the chart title.

![Email Sending Trends metric dropdown](./statistics-email-trends-metric-dropdown.webp)

Available metrics are:

- **Sends**: total number of emails sent.
- **Send rate**: percentage of attempted sends that were successfully sent.
- **Failure**: total number of emails that failed to send.
- **Failure rate**: percentage of attempted sends that failed.
- **Opens**: total number of times emails were opened, including repeat opens.
- **Open rate**: opens as a percentage of sends.
- **Unique opens**: number of distinct recipients who opened the email.
- **Unique open rate**: unique opens as a percentage of sends.
- **Clicks**: total number of link clicks, including repeat clicks.
- **Click rate**: clicks as a percentage of sends.
- **Unique clicks**: number of distinct recipients who clicked a link.
- **Unique click rate**: unique clicks as a percentage of sends.
- **Clicks per unique opens**: total clicks as a percentage of unique opens.
- **Unique clicks per unique opens**: unique clicks as a percentage of unique opens.
- **Unsubscribes per unique opens**: unsubscribes as a percentage of unique opens.
- **Bounces**: total number of emails that bounced.
- **Bounce rate**: bounces as a percentage of sends.
- **Complaints**: total number of recipients who marked the email as spam.
- **Complaint rate**: complaints as a percentage of sends.

## Subscription Trends

To switch to subscription trends, click the **Subscription Trends** tab.

![Subscription Trends tab](./statistics-subscription-trends-tab.webp)

By default, you see the **unsubscribe** numbers for the current project over the past month.

At the top of the tab, an overview banner shows **new contacts**, **subscriptions**, **unique subscriptions**, **unsubscribes**, **unique unsubscribes**, **paused**, and **unique paused**.

![Subscription Trends overview banner](./statistics-subscription-trends-banner.webp)

You can change the metric using the dropdown next to the chart title.

![Subscription Trends metric dropdown](./statistics-subscription-trends-metric-dropdown.webp)

Available metrics are:

- **Subscribe**: number of new subscriptions.
- **Unsubscribe**: number of unsubscribes.
- **Pause Subscription**: number of subscriptions paused.
- **Unpause Subscription**: number of subscriptions unpaused.
- **Resubscribe**: number of contacts who resubscribed.

## Select Email

By default, the **Select Email** dropdown is set to **Current Project**, showing stats for the whole project. Opening it reveals a **Select Type** dropdown where you can narrow the scope to a specific **Subscriber Lists**, **Transactional Email**, **Triggered Email**, **Campaign**, or **Automation**. Once you pick a type, a second **Select** dropdown lets you choose the specific item; click **Apply** to load its stats.

![Select Email dropdown](./statistics-overview-select-email.webp)

## Email Card Statistics

Each email card also shows a quick snapshot under **Overall stats**: sent, opens, clicks, [bounces](/email-sending-concepts/bounces), and [complaints](/email-sending-concepts/complaints), a subset of the full Email Sending Trends metrics covered above. These numbers reflect the email's overall stats, not a specific time period.

![Statistics section on email cards](./statistics-email-card.webp)

To view detailed statistics or check stats for a specific time period, click the arrow icon on the card to open the full statistics page for that email.

![Arrow icon to open the full statistics page](./statistics-email-card-stats-arrow.webp)

Here you'll see the same overview banner and chart as on the main Statistics page, but filtered to show data for that specific email only. You can change the time period and chart type as described above, and check different metrics using the dropdown next to the chart title.

![Statistics page for a specific email](./statistics-email-card-stats-page.webp)

As you scroll down the page, you'll find a data table listing every contact who received the email. You can filter it by **opened**, **not opened**, **clicked**, **not clicked**, **bounced**, **not bounced**, **complained**, **not complained**, **unsubscribed**, and **not unsubscribed**.

![Data table for a specific email](./statistics-email-card-stats-data-table.webp)

Next to these filters, you'll find a **Download .CSV File** button, along with a **Clean Contacts** option to clean the list based on bounces and complaints. To learn more about list cleaning, check our [List Cleaning](/docs/projects/contacts) documentation.

![Download and list cleaning options](./statistics-email-card-stats-data-table-download.webp)

The table shows each contact's email, status, and the date the email was sent. You can also see the number of opens and clicks for each contact, as well as any errors.

![Data table with contact events](./statistics-email-card-stats-data-table-events.webp)

If you scroll down further, you'll see a list of all the links clicked in that email, along with the number of clicks for each link.

![List of clicked links](./statistics-email-card-stats-data-table-links.webp)

## Automation Card Statistics

Each automation card also shows quick stats: **runs**, **active**, **sends**, **opens**, and **clicks**.

![Statistics section on automation cards](./statistics-automation-card.webp)

To view detailed statistics, go into that particular automation and click the arrow icon on the send email node card to open the full statistics page for that automation.

![Arrow icon to open the full statistics page](./statistics-automation-card-arrow.webp)

The detailed statistics page follows the same layout described in [Email Card Statistics](#email-card-statistics) above, overview banner, chart with metric dropdown, and data table, filtered to show data for that specific automation email.

![Statistics page for a specific automation](./statistics-automation-card-stats-page.webp)

Here also if you scroll down, you'll find a data table listing every contact who received the automation email. You can filter it by **opened**, **not opened**, **clicked**, **not clicked**, **bounced**, **not bounced**, **complained**, **not complained**, **unsubscribed**, and **not unsubscribed**.

![Data table for a specific automation](./statistics-automation-card-stats-data-table.webp)

Beside these filters, you'll find a **Download .CSV File** button, along with a **Clean Contacts** option to clean the list based on bounces and complaints. To learn more about list cleaning, check our [List Cleaning](/docs/projects/contacts) documentation.

![Download and list cleaning options](./statistics-automation-card-stats-data-table-download.webp)

Below the filters, the table shows each contact's email, status, and the date the email was sent. You can also see the number of opens and clicks for each contact, as well as any errors.

![Data table with contact events](./statistics-automation-card-stats-data-table-events.webp)

Scroll down further to see a list of all the links clicked in that automation email, along with the number of clicks for each link.

![List of clicked links](./statistics-automation-card-stats-data-table-links.webp)

If you want to change the automation email, use the **Select Email** dropdown at the top of the page: set **Select Type** to **Automation**, then pick the automation email from the **Select** dropdown and click **Apply**. The statistics page will update to show data for that selected automation email.

![Select Email dropdown set to Automation](./statistics-automation-card-stats-select-automation.webp)

## Subscriber list statistics

To check stats for a specific subscriber list, go to the **Contacts** section and select the list you want to analyze.
There click on the **Manage List** button and then select **More Stats** from the dropdown menu.

![Manage List dropdown](./statistics-subscriber-list-manage-list-dropdown.webp)

When you do, you will see similar statistics as described above, but filtered to show data for that specific subscriber list.

![Statistics page for a specific subscriber list](./statistics-subscriber-list-stats-page.webp)

If you want to change the subscriber list, use the **Select Email** dropdown at the top of the page: set **Select Type** to **Subscriber Lists**, then pick a different list from the **Select** dropdown and click **Apply**. The statistics page will update to show data for that selected list.

![Select Email dropdown set to Subscriber Lists](./statistics-subscriber-list-stats-select-list.webp)