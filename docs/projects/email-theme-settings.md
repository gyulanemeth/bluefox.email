---
title: Email Theme Settings | bluefox.email documentation
description: Learn how to customize your project's email theme settings in bluefox.email by adjusting colors, fonts, images, texts, and links to match your brand.
head:
  - - meta
    - name: description
      content: Learn how to customize your project's email theme settings in bluefox.email by adjusting colors, fonts, images, texts, and links to match your brand.
  - - meta
    - property: og:title
      content: Email Theme Settings | bluefox.email documentation
  - - meta
    - property: og:description
      content: Learn how to customize your project's email theme settings in bluefox.email by adjusting colors, fonts, images, texts, and links to match your brand.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/email-theme-settings
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Email Theme Settings | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Learn how to customize your project's email theme settings in bluefox.email by adjusting colors, fonts, images, texts, and links to match your brand.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Email Theme Settings

You can customize the settings for the email theme you selected when creating your project. Setting types include colors, font stacks, images, texts, and links. To access these settings, navigate to your project and select the **Email Theme Settings** tab.

![A screenshot of a project's email theme settings section.](./project-design-email-theme-settings.webp)

These settings are used throughout blocks and templates defined in the email theme. When you change a setting here, it updates everywhere in your project except for campaigns that have already been sent.

There are two main sections in the email theme settings:
- **Basics** : These are general settings that apply to the entire email theme, such as colors, font family, logos , links,etc.

- **Components** : These are specific blocks that you can use in your emails like buttons, dividers, texts, images,etc.

![A screenshot of a project's email theme settings section - basics and components highlighted.](./project-design-variables-sections.webp)

## Managing Theme settings

Everything you see in the email theme settings is customizable. You can change colors, fonts, images, texts, and links to match your brand. There two main sections in this page, One where you manage settings and another where you preview the changes.

**To manage settings:**
- **Edit:** Click the pencil icon next to a setting to update its value.

  ![A screenshot of a project's email theme settings section - edit icon highlighted.](./project-design-variables-edit-button.webp)

- **Preview:** Click the preview icon to see where the setting is used in blocks and templates.

  ![A screenshot of a project's email theme settings section - preview icon highlighted.](./project-design-variables-preview-button.webp)

- **Copy:** Click the copy icon to copy a setting's value.

  ![A screenshot of a project's email theme settings section - copy icon highlighted.](./project-design-variables-copy-button.webp)

- **Preview Panel:** The right-hand side shows live previews of blocks and templates affected by your changes.

  ![A screenshot of a project's email theme settings section - preview highlighted.](./project-design-variables-preview.webp)

- **Reset:** If you have overridden values, you can reset any setting to its original email theme value.

  ![A screenshot of a project's email theme settings section - reset highlighted.](./project-design-variables-reset-button.webp)

::: warning
The email theme linked to a project cannot be changed. If you need to use a different email theme, create a new project and choose the desired email theme during setup.
:::

## Components

Components are the building blocks of your emails, such as buttons, texts, images, and dividers. You can customize these components to match your brand and design preferences.

![A screenshot of a project's design system components section.](./project-design-components.webp)

These components are used throughout blocks and templates defined in your email theme. When you update a component here, the change is reflected everywhere it's used in the current project, except for campaigns that have already been sent.

How a component appears and behaves depends on the chosen email theme. For example, a **`primary-button`** component could define the look and action of your main call‑to‑action, while a **`divider-primary`** component could style section separators in emails.

If you override a component, the change applies **only to this project**. Other projects linked to the same email theme remain unaffected.

### Managing Components

- **Edit:** Click the pencil icon next to a component to modify its properties.  
  ![A screenshot of a project's design system components section - edit icon highlighted.](./project-design-components-edit-button.webp)

  When editing, the right panel switches from showing a static preview to showing editable fields such as size, alignment, text content, paddings, borders, or backgrounds, depending on the component type.
  
  ![A screenshot of a project's design system components section - edit mode highlighted.](./project-design-components-edit-mode.webp)

- **Preview:** Click the preview icon (eye) to see how the component will appear in blocks and templates. The preview is displayed on the right panel.

  ![A screenshot of a project's design system components section - preview icon highlighted.](./project-design-components-preview-button.webp)

- **Copy:** Click the copy icon to copy a component's styles or properties.

  ![A screenshot of a project's design system components section - copy icon highlighted.](./project-design-components-copy-button.webp)

- **Reset:** If you've overridden a component, click the reset icon to restore it to its original email theme configuration.

  ![A screenshot of a project's design system components section - reset icon highlighted.](./project-design-components-reset-button.webp)

### Component Types

The exact editable properties vary by component type:

- **Button Components:** Size, alignment, button text settings, margins, paddings, border, background.
- **Text Components:** Content, text alignment, link formatting, paddings, background.
- **Divider Components:** Paddings, line style, background.
- **Image Components:** Size, alignment, margins, paddings, border, background.

### Note on Scope

Changes to an email theme component from this page update every instance of that component used in blocks and templates in the current project. Previously sent campaigns are not affected.
