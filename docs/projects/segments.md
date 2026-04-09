---
title: Segments | bluefox.email documentation
description: Learn how to create and manage segments in bluefox.email. Use condition-based filters with AND/OR logic to target specific groups of contacts for campaigns and automations.
head:
  - - meta
    - name: description
      content: Learn how to create and manage segments in bluefox.email. Use condition-based filters with AND/OR logic to target specific groups of contacts for campaigns and automations.
  - - meta
    - property: og:title
      content: Segments | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to create and manage segments in bluefox.email. Use condition-based filters with AND/OR logic to target specific groups of contacts for campaigns and automations.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/segments
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Segments | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn how to create and manage segments in bluefox.email. Use condition-based filters with AND/OR logic to target specific groups of contacts for campaigns and automations.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Segments

Segments allow you to create targeted groups of contacts based on specific conditions and criteria. Instead of sending emails to your entire list, segments help you deliver more relevant and personalized content by filtering contacts based on their properties, behaviors, or characteristics. This precision targeting leads to better engagement rates and more effective email campaigns.

With bluefox.email's segment feature, you can build complex filtering logic using AND/OR conditions, apply segments to any subscription list or all contacts, and seamlessly integrate them into your campaigns and automations for highly targeted messaging.

You can find your project's segments under the **Segments** drop-down menu in [**Contacts**](./contacts.md) section:

![Screenshot of the segments tab](./project-segments.webp)

## Creating a Segment

To create a new segment, click the **Create** button and then **Create Segment** in the drop-down menu.

![Screenshot of the segments page - create button highlighted](./project-segments-create.webp)

When creating a segment, you'll need to:
- **Name**: Give your segment a descriptive name (e.g., "Premium Users", "Recent Signups", "Inactive Subscribers")
- **Conditions**: Define the filtering criteria that contacts must meet to be included in the segment. You can add multiple conditions and group them using AND/OR logic.

![Screenshot of the segment creation form](./project-segments-create-form.webp)

## Segment Filtering Logic

Segments use a powerful condition-based filtering system that supports both **AND** and **OR** logic operations. This allows you to create simple or complex targeting rules to precisely identify the contacts you want to reach.

### AND Logic
When conditions are joined with **AND** logic, contacts must meet **all** specified conditions to be included in the segment.

**Example**: Premium users who signed up in the last 30 days
- Condition 1: `hasAPIKey` is true
- **AND**
- Condition 2: `awsSetup` is true

### OR Logic
When conditions are joined with **OR** logic, contacts need to meet **at least one** of the specified conditions to be included in the segment.

**Example**: Contacts who are either premium users or have made a recent purchase
- Condition 1: `name` equals `BlueFox Email`
- **OR**
- Condition 2: `SentACampaign` is true

## Available Filter Conditions and Operators

### Contact Properties

All contact properties and tags will be listed in this drop-down menu, allowing you to choose the property that defines the condition for your segment.

![Screenshot of contact properties](./project-segments-condition-properties.webp)

### Operators

Segments can filter contacts based on various operators applied to contact properties. Here are the available operator types:

- **Equals**
- **Does Not Equal**
- **Contains**
- **Does Not Contain**
- **Is Empty**
- **Is Not Empty**
- **Greater Than**
- **Less Than**
- **Greater Than or Equal**
- **Less Than or Equal**

![Screenshot of segment condition operators](./project-segments-condition-operators.webp)

To see your contacts that match the segment conditions, click the **Segments** tab and then choose your segment by its name. 

![Screenshot of segment selection view](./project-segments-selection-view.webp)

This will show you how many contacts currently fit the criteria you've set.

![Screenshot of segment contacts view](./project-segments-contacts-view.webp)

## Engagment based Segments

You can also create segments based on contact engagement with your campaigns. This allows you to target contacts who have interacted with your emails in specific ways, such as:

- recevied
- not received
- opened
- not opened
- clicked
- not clicked

To create an engagement-based segment, click on the **engagement** tab in the segment creation section. 

![Screenshot of engagement-based segment tab](./project-segments-engagement-tab.webp)

Then, choose the engagement condition you want to apply to your segment.

![Screenshot of engagement-based segment conditions](./project-segments-engagement-conditions.webp)

## Segment Application Scope

Segments can be applied to different contact scopes depending on your needs:

### All Contacts
Apply the segment filter to your entire contact database, regardless of list subscriptions. This is useful for:
- Broad behavioral targeting
- Cross-list segmentation
- General contact characteristics

### Specific Subscriber List
Apply the segment only to contacts within a particular subscriber list. This is ideal for:
- List-specific targeting
- Topic-based segmentation
- Maintaining list context while adding precision

## Managing Segments

### Editing Segments
You can modify segment conditions at any time by clicking on the segment name and then editing properties. Changes will automatically update which contacts are included in the segment.

![Screenshot of segment edit view](./project-segments-edit-view.webp)

### Deleting Segments
To delete a segment, click the trash icon next to the segment name. Confirm the deletion when prompted.

![Screenshot of segment delete option](./project-segments-delete.webp)

:::warning Note: Deleting a segment does not delete the contacts within it; it only removes the segment definition.
:::