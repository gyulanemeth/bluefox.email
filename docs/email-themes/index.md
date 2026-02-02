---
title: Email Themes | bluefox.email documentation
description: Discover how the bluefox.email email themes help you build consistent, reusable email theme components with email theme parameters, components, blocks, and templates. Ensure uniformity across projects while enabling customization at the project level.
head:
  - - meta
    - name: description
      content: Discover how the bluefox.email email themes help you build consistent, reusable email theme components with email theme parameters, components, blocks, and templates. Ensure uniformity across projects while enabling customization at the project level.
  - - meta
    - property: og:title
      content: Email Themes | bluefox.email documentation
  - - meta
    - property: og:description
      content: Discover how the bluefox.email email themes help you build consistent, reusable email theme components with email theme parameters, components, blocks, and templates. Ensure uniformity across projects while enabling customization at the project level.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Email Themes | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Discover how the bluefox.email email themes help you build consistent, reusable email theme components with email theme parameters, components, blocks, and templates. Ensure uniformity across projects while enabling customization at the project level.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Email Themes

Email Themes in our email product is a comprehensive framework that helps users build, customize, and manage email designs efficiently. It allows for the creation of reusable email components, ensuring consistency across all email communications. With this system, you can design emails from start to finish without needing to write any code, using our drag-and-drop editor.

It provides a streamlined approach to email design. Users can create reusable blocks and templates, define email theme parameters for global customization, and associate email theme settings with specific projects. This makes the process of managing email styles and content consistent and efficient across all campaigns.

## Email Theme Principles
Our email themes follow the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design) principles, breaking emails into reusable components for consistency and scalability.

- Atoms – Basic parameters, like colors and text styles.
- Molecules – Functional groups, such as buttons with icons.
- Organisms – Larger sections like headers or footers.
- Templates – Define email layouts.

This modular approach keeps email designs structured, flexible, and easy to manage.

## Email Theme Components
Every email theme in BlueFox Email includes:

- [Email theme basics](./email-theme-basics)
- [Blocks](./blocks)
- [Templates](./templates)

Everything in an email theme is built to be reusable and scalable, ensuring that all emails within a project maintain a consistent style and structure

## Navigating to Email Themes

You can find the email theme section in sidebar on left-hand side.
![A screenshot of the email theme section.](./email-theme-icon.webp)

## Creating a New Email Theme
To create a new email theme, navigate to the email theme section and click on "Create", you can find this button in drop-down menu.

![A screenshot of the email theme create dialog.](./email-theme-create-button.webp)

You can choose to start from scratch or use a default email theme as your base. Once created, you can add email theme basics, blocks, and templates to build your system.

![A screenshot of the email theme create dialog.](./email-theme-create-dialog.webp)

## Associating an Email Theme with a Project
Every project must be linked to an email theme to ensure consistency in design and functionality. When you create a new project, you will have the option to associate it with an existing email theme. This association allows the project to inherit templates, blocks, and email theme basics from the email theme, making the design process more efficient.

::: info Note
A project can only be associated with one email theme at a time. You currently can't change that.
:::


### Overriding Theme Parameters and Components at the Project Level
While the email theme provides a consistent foundation, you might need to customize certain elements for specific projects. You can override theme parameters at the project level without affecting the main email theme. For instance, if the default color email theme basic "primary" is set to red in the email theme, you can override it to blue in a specific project. Similarly, if the email theme includes a default logo, you can replace it with a project-specific logo without altering the original. These changes will only apply to the project, leaving the original email theme unchanged.

Another example is, that you can override components, for example, the primary button in a project. Let's say, that the design system has rounded buttons by default, but you want to have square buttons instead. You can do these kinf of overrides as well in a project.

::: info Note
 Overriding **Email Theme parameters and components** at the project level allows for customization without altering the global email theme, ensuring that other projects remain unaffected.
:::

##  Best Practices

### Maintaining Consistency

Consistency is key to effective email design. Using email theme parameters instead of hardcoded values ensures that changes can be made quickly and uniformly across all templates and blocks. Organizing templates and blocks into categories helps keep your design assets structured and easy to manage. Reusing predefined blocks not only saves time but also ensures that your brand identity remains consistent across all emails.

### Efficient Use of Theme Parameters & Components
Defining a primary color scheme through color email theme parameters allows you to update the design across all templates with minimal effort. Storing frequently used text snippets in text email theme basics ensures that important content remains consistent and easy to update. Managing important URLs through link email theme parameters reduces the risk of errors and simplifies the process of updating links across multiple emails.

::: info Note
 Efficient use of email theme parameters and components can significantly reduce the time and effort required to maintain and update your email designs, especially when managing multiple projects.
:::
