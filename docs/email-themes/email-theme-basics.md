---
title: Email Theme Basics | bluefox.email documentation
description: Discover how email theme basics in the bluefox.email email theme settings enable dynamic customization of email theme components. Define reusable settings for colors, text, images, and more to maintain consistency while allowing flexibility at the project level.
head:
  - - meta
    - name: description
      content: Discover how email theme basics in the bluefox.email email theme settings enable dynamic customization of email theme components. Define reusable settings for colors, text, images, and more to maintain consistency while allowing flexibility at the project level.
  - - meta
    - property: og:title
      content: Email Theme Basics | bluefox.email documentation
  - - meta
    - property: og:description
      content: Discover how email theme basics in the bluefox.email email theme settings enable dynamic customization of email theme components. Define reusable settings for colors, text, images, and more to maintain consistency while allowing flexibility at the project level.
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
      content: Email Theme Basics | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Discover how email theme basics in the bluefox.email email theme settings enable dynamic customization of email theme components. Define reusable settings for colors, text, images, and more to maintain consistency while allowing flexibility at the project level.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Email Theme Basics

Email theme basics in the email theme settings allow you to define reusable values that can be applied across templates and blocks. They ensure consistency and make it easy to update design elements across multiple emails without manually modifying each template or block.

When an email theme basic is updated, all templates and blocks using that email theme basic will automatically reflect the changes. This allows for efficient design management and helps maintain a unified brand identity across projects.

## Email Theme Basics Page
The **email theme basics page** is divided into two main sections:

- **Left panel (email theme basics list)**: Displays different types of email theme basics (colors, fonts, images, text, links). Users can create, edit, delete, and manage email theme basics.
- **Right panel (preview section)**: Shows how the selected email theme basic is applied in templates or blocks by displaying a live example, providing immediate feedback on its effect on designs.

![A screenshot of the design system variables section.](./email-theme-variables.webp)


## Types of Email Theme Basics

### 1. Color Email Theme Basics
Color email theme basics store reusable colors, such as primary colors, neutrals, and accent colors. Each email theme basic includes:

- **Color name** (e.g., `color-primary`)
- **Hex value** (e.g., `#1B1E1F`)
- **Main email theme basic** (true/false) determines if it appears in the project creation dialog. Non-main email theme basics can be changed later in project settings

**Managing color email theme basics**
- **Create**: Click "Create" to add a new color. Select either "From Scratch" or "Copy & Paste". 
- **Edit**: Click the pencil icon to change the color name or value.
- **Delete**: Click the trash icon to remove a color.
- **Preview**: Click the eye icon to see where the color is used in templates/blocks.

---

### 2. Font Email Theme Basics
Font email theme basics define typography styles applied across templates. Each email theme basic includes:

- **Font name** (e.g., `font-primary`)
- **Font stack** (e.g., `Arial, Helvetica, sans-serif`)
- **Main email theme basic** (true/false) determines if it appears in the project creation dialog. Non-main email theme basics can be changed later in project settings

**Managing font email theme basics**
- **Create**: Click "Create" to add a new font. Select either "From Scratch" or "Copy & Paste".
- **Edit**: Modify font styles by clicking the pencil icon.
- **Delete**: Remove fonts by clicking the trash icon.
- **Preview**: See where the font is used by clicking the eye icon.

---

### 3. Image Email Theme Basics
Image email theme basics store reusable images (e.g., brand logos, background images).

- **Image**
- **Variable Name** (e.g., `image-logo`)
- **Main Email Theme Basic** (true/false) determines if it appears in the project creation dialog. Non-main email theme basics can be changed later in project settings

**Managing image email theme basics**
- **Copy**: Copy the image link by clicking the link icon.
- **Create**: Click "Create" to add a new image. Select either "From Scratch" or "Copy & Paste".
- **Edit**: Modify the image by clicking the pencil icon.
- **Delete**: Remove image by clicking the trash icon.
- **Preview**: See where the image is used by clicking the eye icon.

---

### 4. Text Email Theme Basics
Text email theme basics store reusable text elements, such as company slogans, default headings, dynamic text values, or legal copy in the footer. For example, a legal disclaimer or copyright notice in the footer can be managed as a text email theme basic, ensuring consistency across all emails while allowing easy updates.

- **Variable name** (e.g., `alt-text-website`)
- **Variable text** (e.g., `Visit our website at https://bluefox.email`)
- **Main email theme basic** (true/false) determines if it appears in the project creation dialog. Non-main email theme basics can be changed later in project settings

**Managing text email theme basics**
- **Create**: Click "Create" to add a new text. Select either "From Scratch" or "Copy & Paste".
- **Edit**: Modify text by clicking the pencil icon.
- **Delete**: Remove text by clicking the trash icon.
- **Preview**: See where the text is used by clicking the eye icon.

---

### 5. Links Email Theme Basics
Link email theme basics store reusable URLs, such as website links, social media profiles, or call-to-action buttons.

- **Variable Name** (e.g., `link-website`)
- **Variable URL** (e.g., `https://bluefox.email`)
- **Main Email Theme Basic** (true/false) determines if it appears in the project creation dialog. Non-main email theme basics can be changed later in project settings

**Managing link email theme basics**
- **Create**: Click "Create" to add a new link. Select either "From Scratch" or "Copy & Paste".
- **Edit**: Modify link by clicking the pencil icon.
- **Delete**: Remove link by clicking the trash icon.
- **Preview**: See where the link is used by clicking the eye icon.

## Conclusion

Email theme basics make it easy to manage design consistency across blocks and templates. The **eye icon** provides a quick preview of where each email theme basic is used, ensuring smooth editing. **Main email theme basics** appear in the email theme settings preview, while **non-main email theme basics** remain available inside projects for flexible use.
