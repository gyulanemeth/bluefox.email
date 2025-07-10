---
title: Suppression Lists | bluefox.email documentation
description: Learn how to manage suppression lists in bluefox.email to maintain email deliverability, prevent sending to problematic addresses, and comply with email best practices.
head:
  - - meta
    - name: description
      content: Learn how to manage suppression lists in bluefox.email to maintain email deliverability, prevent sending to problematic addresses, and comply with email best practices.
  - - meta
    - property: og:title
      content: Suppression Lists | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to manage suppression lists in bluefox.email to maintain email deliverability, prevent sending to problematic addresses, and comply with email best practices.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/suppression-list
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Suppression Lists | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn how to manage suppression lists in bluefox.email to maintain email deliverability, prevent sending to problematic addresses, and comply with email best practices.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Suppression Lists


Suppression Lists help you maintain high deliverability and a strong sender reputation by preventing emails from being sent to problematic addresses. This protects your project from high bounce rates, spam complaints, and wasted sending quota.

You can find the Suppression List for your project under the **Suppression Lists** tab:

![Screenshot of the suppression list tab](./project-suppression-list.webp)

## Add Email to Suppression List

You can add an email by clicking on the `Create` button at top-left corner.

![Screenshot of the suppression list create button](./project-suppression-list-create-button.webp)

Type in the email address with a reason for adding it to the suppression list for future reference. 

![Screenshot of the suppression list create menu](./project-suppression-list-create-menu.webp)

## Importing Contacts

Importing contacts to your suppression list is essential when you have multiple known problematic email addresses or need to migrate suppression data from another email service. This helps prevent bounces and complaints that could harm your sender reputation.

To import a list of contacts:

1. Click on the `Import Emails` button at the top of the suppression list page
   ![Screenshot of the suppression list import button](./project-suppression-list-import-button.webp)

2. Upload a CSV file containing the email addresses you want to suppress
   - The CSV file should have an "email" column containing the addresses
   - You can optionally include a "reason" column to document why each address is being suppressed
   
3. Review the import preview to confirm the data is correctly formatted
   
4. Click `Import` to add all the addresses to your suppression list

## Sorting the List

To organize your suppression list, simply click on the `Sort By` option. This helps you quickly find specific entries.

![Screenshot of the suppression list sort button](./project-suppression-list-sort-button.webp)

Sorting your list makes it easier to locate addresses or identify when contacts were added to the suppression list.

## Exporting Contacts

Exporting your suppression list creates a backup of your data, lets you analyze addresses in external tools, helps share lists across projects, and supports compliance documentation requirements.

To export your suppression list:

1. Click the `Download .csv File` button at the top of the page

   ![Screenshot of the suppression list download button](./project-suppression-list-download-button.webp)

2. The system will generate and download a CSV file containing all suppressed email addresses and their associated information.

3. You can open this file in any spreadsheet application for further analysis or use it to import the suppression data into other systems.