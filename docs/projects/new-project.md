---
title: Creating a New Project | bluefox.email documentation
description: Learn how to create a new project in bluefox.email, select and customize design systems, and configure settings like AWS credentials and API keys.
faqs:
  - question: "Can I change the email theme after creating a project?"
    answer: "You can switch the email theme of an existing project in project settings, but any overridden theme variables (such as colors or images) will be permanently lost when you switch. Templates and blocks tied to the original theme will not be accessible while on a different theme, but will become available again if you switch back."
  - question: "What happens automatically when I create a new project?"
    answer: "When a project is created, it is automatically populated with email templates from the selected email theme so you do not have to start from scratch. The project also starts in Sandbox mode by default, restricting sends to verified email addresses until you request production access."
  - question: "Do I need to set up AWS before I can send any emails?"
    answer: "No. New projects start in Sandbox mode using BlueFox Email managed infrastructure. You do not need any AWS setup to test and send your first emails. AWS credentials are only required if you want to use BYO SES or configure production sending with your own domain."
  - question: "What should I configure after creating a new project?"
    answer: "After creation, the key setup steps are: configuring your delivery mode, creating an API key if you plan to send transactional or triggered emails via the API, adding your domain to the whitelist if your frontend makes subscription requests, and setting up bounce and complaint webhooks for production deliverability monitoring."
head:
  - - meta
    - name: description
      content: Learn how to create a new project in bluefox.email, select and customize design systems, and configure settings like AWS credentials and API keys.
  - - meta
    - property: og:title
      content: Creating a New Project | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to create a new project in bluefox.email, select and customize design systems, and configure settings like AWS credentials and API keys.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/new-project
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Creating a New Project | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn how to create a new project in bluefox.email, select and customize design systems, and configure settings like AWS credentials and API keys.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Creating a New Project

You can create a new project by clicking the drop-down in the top-left corner and then `Create` button.

![A screenshot of the projects view.](./project-create.webp)

You can also click on the `Create` button in projects section to create new project.

![A screenshot of the projects view.](./project-create-2.webp)

:::info Note 
A new project is always created in a [Sandbox mode](/docs/projects/delivery-modes#sandbox-mode). You can send emails only to verified email addresses and domains. To lift this restriction, you need to [request production access](/docs/projects/delivery-modes#production-mode).
:::

## Select a Email Theme

After entering your project's name, select an email theme. We offer multiple built-in email themes, or you can [create your own](/docs/email-themes/).


![A screenshot of the project creation wizard's email theme selection step.](./project-create-select-email-theme.webp)

::: warning
If you don't like the email theme you selected, you can come back to this step later.
However, once a project is created with an email theme, it will remain as it is **forever**. If you need a different email theme, create a new project with the desired email theme.
:::

## Set the Email Theme Basics

::: tip Optional Step
You can skip this step and do it later if you prefer.
:::

Each email theme has variables that you can customize, like colors, images, fonts, links, and texts.

You can override the default values for these variables in each project.

![A screenshot of the project creation wizard's email theme variables settings step.](./project-create-edit-email-theme-basics.webp)

### Required and Optional Variables

- **Required variables** (e.g., logo, primary and secondary colors) must be set during project creation.
- **Optional variables** (e.g., neutral colors like dark or light grey) can be set later.

To see examples of how a variable is used, click the eye icon:

![A screenshot of the project creation wizard's email theme basics settings step - preview variable icon.](./project-create-preview-email-theme-basics.webp)
You will see where the selected variables appear in blocks and templates on the right-hand side:

![A screenshot of the project creation wizard's email theme basics settings step - preview blocks and templates.](./project-create-block-template-preview.webp)

## Finalizing Your Project

After clicking the create button, your project will be populated with templates from the email theme, so you don't have to start from scratch. You can add or remove templates anytime.

After you created your project, you need to go to the project's settings page and do the following steps:
- [connect with your AWS account](/docs/projects/settings.html#aws-credentials) (always required)
- [create an API key](/docs/projects/settings.html#api-keys) (optional, only needed if you want to send transactional or triggered emails)
- [add domains to the whitelist](/docs/projects/settings.html#domain-whitelists) (optional, only needed if you want to add or remove subscribers from your frontend)
- [set up bounce and complaint webhooks](/docs/projects/settings.html#bounce-complaint-webhooks) (optional BUT highly recommended)

