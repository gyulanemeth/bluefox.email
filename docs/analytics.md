# Analytics

The Analytics section in your application provides a comprehensive analysis of email performance, subscription trends, and user engagement metrics. It is designed to cater to multiple scopes, such as [**account**](/docs/dashboard#key-metrics-in-the-account-dashboard), [**project**](/docs/projects/analytics#project-dashboard), [**transactional emails**](/docs/projects/transactional-emails#transactional-email-statistics), [**triggered emails**](/docs/projects/triggered-emails#triggered-email-statistics), [**campaigns**](/docs/projects/campaigns#campaign-email-statistics) and [**subscriber Lists**](/docs/projects/subscriber-lists#subscriber-list-statistics). Each type of statistic is presented with clear visuals, detailed filters and actionable insights.


## Overall Banners

At the top of every statistics page, a overall banner displays key metrics in separate boxes. Each box has a title and a numeric value that provides a quick overview of email performance or subscriber activity.

### **Overall Email Statistics Banner**

The Email Summary Banner provides key email performance metrics, such as **Sent Emails**, **Failed**, **Openes**, **Unique Openes**, **Clicks**, **Unique Clicks**, **Bounced** and **Complaints**. This banner is essential for tracking email performance at a glance, enabling users to monitor engagement and delivery quality effectively.

![Email Summary Banner](./statistics-email-overall-banner.webp)

### **Overall Subscription Statistics Banner**

The Subscription Overall Banner provides an overview of your total subscribers and their current status. It displays metrics such as **Subscribers**, **Active**, **Paused** and **Unsubscribed**. This summary is key to understanding the distribution of your audience and tracking changes in subscriber engagement and retention.


![Subscription Summary Banner](./statistics-subscription-overall-banner.webp)


## Email and Subscription Charts

### Email Metrics:
Email-related charts track key performance indicators for emails, including: **Sent**, **Open**, **Unique Opens**, **Click**, **Unique Click** and **Failed**
These metrics are displayed using either bar or line charts, depending on the user's preference for visualizing comparative data or tracking continuous trends.

![Email Charts Example](./statistics-email-bar-chart.webp)

### Subscription Metrics:
Subscription charts track key behaviors, including: **Subscribed**, **Resubscribed**, **Unsubscribed**, **Paused Subscription**, **Unpaused Subscription**.  
In the **Subscription Metrics** section, users can monitor activities like new subscriptions, unsubscribes, paused, and resumed subscriptions. These metrics can be displayed as bar or line charts, offering flexible analysis of subscription trends.


![Subscription Charts Example](./statistics-subscription-bar-chart.webp)


# Charts and Graphs

The statistics page's main section features **interactive charts** that allow users to monitor and analyze the performance of their **Email** and **Subscription** metrics. These charts provide both **comparative data points**  and **continuous trends** over time, enabling users to choose the most relevant view for their analysis. The **Time Interval Switcher** enhances this by offering detailed data exploration, helping users make more informed decisions.


## Chart Types

### 1. Bar Charts
Bar charts visualize **comparative data points**, highlighting how data points differ over time.  
They are ideal for comparing performance across specific periods, such as the number of emails sent or new subscriptions within a given timeframe.

![Bar Chart Example](./statistics-bar-chart-example.webp)

### 2. Line Charts
Line charts showcase **continuous data trends** over time, making it easier to track data changes and trends.  
These charts are especially useful for monitoring long-term patterns, such as tracking email or subscription growth over weeks or months.

![Line Chart Example](./statistics-line-chart-example.webp)

Both **Email** and **Subscription** metrics are available in **Bar** and **Line** formats, giving users the flexibility to select the chart type that best suits their needs for performance comparisons or trend analysis.


## Chart Type Switcher

Users can easily switch between **Bar** and **Line** charts using the **chart type toggle button**. This allows users to visualize the same data either as discrete, comparative data points or as continuous trends, depending on what they find most useful.


![Chart Type Switcher](./statistics-chart-type-toggle-btn.webp)


## Time Interval Switcher

Users can select from various **time intervals** to refine the displayed data, allowing them to analyze performance with different levels of granularity. This functionality makes it easier to track trends over different periods such as **Hourly**, **Daily**, **Weekly**, or **Monthly**, and monitor activity. The **time interval buttons** provide an intuitive way to switch between these intervals.

![Time Interval Switcher](./statistics-chart-time-view-toggle-btn.webp)



::: tip Chart Controls
**Switch between Line/Bar charts and adjust time intervals for both **Email** and **Subscription** metrics.
:::

## Filters

Filters allow users to refine data by selecting custom start and end dates, helping isolate trends and identify patterns within specific timeframes.

Filtering by **time interval** is crucial for monitoring performance at varying granularities. Adjusting the interval—whether for short-term fluctuations or long-term trends—enhances data analysis and provides clearer insights.

![Filters Example](./statistics-chart-filter.webp)


::: warning
- For **Daily**, **Weekly**, and **Monthly** views, the maximum filter interval is 1 year.
- For **Hourly View**, the maximum interval is 7 days.
:::


## Accumulated vs Regular Views

This feature allows users to toggle between accumulated and regular data presentations:

- **Regular View:** Displays individual data points for each time frame (e.g., daily sends or clicks). Useful for spotting immediate changes or fluctuations.
    ![Toggle View Example](./statistics-regular-data-chart.webp)

- **Accumulated View:** Shows cumulative values over time, offering a better understanding of overall growth or success.
    ![Toggle View Example](./statistics-accumulated-data-chart.webp)

Example: In an email campaign, users can see how many total opens and clicks occurred from the beginning of the campaign to the current date.

![Toggle View Example](./statistics-chart-accumulated-toggle-btn.webp)


::: tip Chart Data Options
**Both accumulated and regular data are available for the **Email** and **Subscription** matrices, and can be visualized using both line and bar chart types.**
:::


## Data Table

Beneath the charts, **detailed data tables** provide raw, event-level information, allowing users to drill down into specific emails or subscribers to understand what actions have taken place. These tables help users to gain deeper insights into their data by offering granular details of each event.

- Lists each sent email along with its **Status**, **Time Sent** and **Events** sunch as Opened, Clicked, Unsubscribed, Complained Bounced and any associated errors.

**Note:** The data table for emails is available only within the **Email And Subscriber List Scope**.

![Email Data Table](./statistics-data-table.webp)


### **Filtering the Data Table**

Users can filter the data in the table by selecting one or more filter options. The filter buttons allow users to refine the table’s displayed data based on specific events or actions. Multiple filter buttons can be activated simultaneously, enabling flexible data analysis.

**Filter Options Include:** **Opened** / **Not Opened**, **Clicked** / **Not Clicked**,  **Bounced** / **Not Bounced**, **Complained** / **Not Complained** and **Unsubscribed** / **Not Unsubscribed**

Users can click on the filter buttons to toggle between viewing records that match specific criteria. This functionality allows for more precise analysis, making it easier to identify patterns or issues related to email performance or subscriber behavior.


![Email Data Table](./statistics-data-table-filter.webp)

### **Download as CSV**

To facilitate data extraction, users can download the filtered data table as a **CSV file**. This feature allows users to save the displayed data for offline analysis, reporting, or sharing with others.


![Email Data Table](./statistics-data-table-dawnload.webp)