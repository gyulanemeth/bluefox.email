---
title: Statistics | bluefox.email documentation
description: Gain deep insights into your email and subscription performance with bluefox.email's advanced analytics tools. Track metrics, analyze trends, and optimize engagement.
head:
  - - meta
    - name: description
      content: Gain deep insights into your email and subscription performance with bluefox.email's advanced analytics tools. Track metrics, analyze trends, and optimize engagement.
  - - meta
    - property: og:title
      content: Statistics | bluefox.email documentation
  - - meta
    - property: og:description
      content: Gain deep insights into your email and subscription performance with bluefox.email's advanced analytics tools. Track metrics, analyze trends, and optimize engagement.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/analytics
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
      content: Gain deep insights into your email and subscription performance with bluefox.email's advanced analytics tools. Track metrics, analyze trends, and optimize engagement.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Statistics

The Statistics page in your application provides a comprehensive analysis of email performance, subscription trends, and user engagement metrics. It is designed to cater to multiple scopes, such as [**account**](/docs/dashboard#key-metrics-in-the-account-dashboard), [**project**](/docs/projects/dashboard), [**transactional emails**](/docs/projects/transactional-emails#transactional-email-statistics), [**triggered emails**](/docs/projects/triggered-emails#triggered-email-statistics), [**campaigns**](/docs/projects/campaigns#campaign-email-statistics) and [**subscriber lists**](/docs/projects/contacts#list-statistics). Each type of statistic is presented with clear visuals, detailed filters, and actionable insights.

## Email Card Statistics

We provide the following analytics for all of our email types (transactional emails, triggered emails, and campaigns): sends, opens, clicks, [bounces](/email-sending-concepts/bounces), and [complaints](/email-sending-concepts/complaints).

You can view these analytics on the email cards, located right above the action buttons for each email type:

![Analytics section on email cards](./analytics-card.webp)

By default, these numbers reflect stats from the current week. If you want to change the time period, select from the options highlighted in the screenshot below: current week, previous week, current month, previous month, last 3 months, or overall.

![Analytics time filter.](./analytics-time.webp)

## Overall Banners

At the top of statistics page, you will see two sections, **Email Sending Trends** and **Subscription Trends**, which display key metrics, by default you see **sends** metric for Email Sending Trends and **unsubscribed** metric for Subscription Trends.

Here at the top of the statistics page, you can choose which particular email actions you want to see statistics for, by clicking on the dropdown menu.

![Email Sending Trends Dropdown](./statistics-email-sending-trends-dropdown.webp)

Now, whichever property you select here like Subscriber list,  Campaign, Automation, etc. you can select the particular email or subscriber list you want to see statistics for, by clicking on the dropdown menu next to it. For example, if you select Campaigns in the first dropdown, you can select a particular campaign in the second dropdown.

![Campaign Dropdown](./statistics-campaign-dropdown.webp)



**Email Sending Trends** has some overview stats such as **sent**, **failed**, **opens**, **unique opens**, **clicks**, **unique clicks**, **bounced**, and **complaints**.

![Email Sending Trends Metrics](./statistics-email-sending-trends.webp)

**Subscription Trends** has some overview stats such as **new contacts**, **subscriptions**, **paused**, and **unsubscribed**.

![Subscription Trends Metrics](./statistics-subscription-trends.webp)



### Overall Subscription Statistics Banner

The Subscription Overall Banner provides an overview of your total subscribers and their current status. It displays metrics such as **contacts**, **subscriptions**, **active**, **paused**, and **unsubscribed**. This summary is key to understanding the distribution of your audience and tracking changes in subscriber engagement and retention.

![Subscription Summary Banner](./statistics-subscription-overall-banner.webp)

## Email and Subscription Charts

### Email Metrics

Email-related charts track key performance indicators for emails, including: **sent**, **open**, **unique opens**, **click**, **unique click**, and **failed**.

These metrics are displayed using either bar or line charts, depending on the user's preference for visualizing comparative data or tracking continuous trends.

![Email Charts Example](./statistics-email-bar-chart.webp)

### Subscription Metrics

Subscription charts track key behaviors, including: **subscribed**, **resubscribed**, **unsubscribed**, **paused subscription**, and **unpaused subscription**.

In the **subscription metrics** section, users can monitor activities like new subscriptions, unsubscribes, paused, and resumed subscriptions. These metrics can be displayed as bar or line charts, offering flexible analysis of subscription trends.

![Subscription Charts Example](./statistics-subscription-bar-chart.webp)

## Charts and Graphs

The statistics page's main section features **interactive charts** that allow users to monitor and analyze the performance of their **email** and **subscription** metrics. These charts provide both **comparative data points** and **continuous trends** over time, enabling users to choose the most relevant view for their analysis.

### Chart Types

#### Bar Charts

Bar charts visualize **comparative data points**, highlighting how data points differ over time. They are ideal for comparing performance across specific periods, such as the number of emails sent or new subscriptions within a given timeframe.

![Bar Chart Example](./statistics-bar-chart-example.webp)

#### Line Charts

Line charts showcase **continuous data trends** over time, making it easier to track data changes and trends.

These charts are especially useful for monitoring long-term patterns, such as tracking email or subscription growth over weeks or months.

![Line Chart Example](./statistics-line-chart-example.webp)

## Chart Controls

### Chart Type Switcher

Users can easily switch between **bar** and **line** charts using the **chart type toggle button**. This allows users to visualize the same data either as discrete, comparative data points or as continuous trends.

![Chart Type Switcher](./statistics-chart-type-toggle-btn.webp)

### Time Interval Switcher

Users can select from various **time intervals** to refine the displayed data, allowing them to analyze performance with different levels of granularity.

![Time Interval Switcher](./statistics-chart-time-view-toggle-btn.webp)

## Filters

Filters allow users to refine data by selecting custom start and end dates, helping isolate trends and identify patterns within specific timeframes.

![Filters Example](./statistics-chart-filter.webp)

::: warning
- For **daily**, **weekly**, and **monthly** views, the maximum filter interval is 1 year.
- For **hourly view**, the maximum interval is 7 days.
:::

## Accumulated vs Regular Views

This feature allows users to toggle between accumulated and regular data presentations.

![Toggle View Example](./statistics-accumulated-data-chart.webp)

## Data Table

Beneath the charts, **detailed data tables** provide raw, event-level information, allowing users to drill down into specific emails or subscribers.

![Email Data Table](./statistics-data-table.webp)

### Filtering the Data Table

Users can filter the data in the table by selecting one or more filter options.

![Email Data Table](./statistics-data-table-filter.webp)

### Download as CSV

To facilitate data extraction, users can download the filtered data table as a **CSV file**.

![Email Data Table](./statistics-data-table-download.webp)
