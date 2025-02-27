---
title: Design System Variables | bluefox.email documentation
description: Discover how variables in the bluefox.email design system enable dynamic customization of email components. Define reusable settings for colors, text, images, and more to maintain consistency while allowing flexibility at the project level.
head:
  - - meta
    - name: description
      content: Discover how variables in the bluefox.email design system enable dynamic customization of email components. Define reusable settings for colors, text, images, and more to maintain consistency while allowing flexibility at the project level.
  - - meta
    - property: og:title
      content: Design System Variables | bluefox.email documentation
  - - meta
    - property: og:description
      content: Discover how variables in the bluefox.email design system enable dynamic customization of email components. Define reusable settings for colors, text, images, and more to maintain consistency while allowing flexibility at the project level.
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
    - property: twitter:card
      content: summary_large_image
  - - meta
    - property: twitter:title
      content: Design System Variables | bluefox.email documentation
  - - meta
    - property: twitter:description
      content: Discover how variables in the bluefox.email design system enable dynamic customization of email components. Define reusable settings for colors, text, images, and more to maintain consistency while allowing flexibility at the project level.
  - - meta
    - property: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Design system variables

Variables in the design system allow you to define reusable values that can be applied across templates and blocks. They ensure consistency and make it easy to update design elements across multiple emails without manually modifying each template or block.

When a variable is updated, all templates and blocks using that variable will automatically reflect the changes. This allows for efficient design management and helps maintain a unified brand identity across projects.

## Variables page
The **variables page** is divided into two main sections:

- **Left panel (variable list)**: Displays different types of variables (colors, fonts, images, text, links). Users can create, edit, delete, and manage variables.
- **Right panel (preview section)**: Shows how the selected variable is applied in templates or blocks by displaying a live example, providing immediate feedback on its effect on designs.

![A screenshot of the design system variables section.](./design-system-variables.webp)


## Types of variables

### 1. Color variables
Color variables store reusable colors, such as primary colors, neutrals, and accent colors. Each variable includes:

- **Color name** (e.g., `color-primary`)
- **Hex value** (e.g., `#1B1E1F`)
- **Main variable** (true/false) determines if it appears in the project creation dialog. Non-main variables can be changed later in project settings

**Managing color variables**
- **Create**: Click "Create" to add a new color.
- **Edit**: Click the pencil icon to change the color name or value.
- **Delete**: Click the trash icon to remove a color.
- **Preview**: Click the eye icon to see where the color is used in templates/blocks.

---

### 2. Font variables
Font variables define typography styles applied across templates. Each variable includes:

- **Font name** (e.g., `font-primary`)
- **Font stack** (e.g., `Arial, Helvetica, sans-serif`)
- **Main variable** (true/false) determines if it appears in the project creation dialog. Non-main variables can be changed later in project settings

**Managing font variables**
- **Create**: Click "Create" to add a new font.
- **Edit**: Modify font styles by clicking the pencil icon.
- **Delete**: Remove fonts by clicking the trash icon.
- **Preview**: See where the font is used by clicking the eye icon.

---

### 3. Image variables
Image variables store reusable images (e.g., brand logos, background images).

- **Image**
- **Variable Name** (e.g., `image-logo`)
- **Main Variable** (true/false) determines if it appears in the project creation dialog. Non-main variables can be changed later in project settings

**Managing image variables**
- **Copy**: Copy the image link by clicking the link icon.
- **Create**: Click "Create" to add a new image.
- **Edit**: Modify the image by clicking the pencil icon.
- **Delete**: Remove image by clicking the trash icon.
- **Preview**: See where the image is used by clicking the eye icon.

---

### 4. Text variables
Text variables store reusable text elements, such as company slogans, default headings, dynamic text values, or legal copy in the footer. For example, a legal disclaimer or copyright notice in the footer can be managed as a text variable, ensuring consistency across all emails while allowing easy updates.

- **Variable name** (e.g., `alt-text-website`)
- **Variable text** (e.g., `Visit our website at https://bluefox.email`)
- **Main variable** (true/false) determines if it appears in the project creation dialog. Non-main variables can be changed later in project settings

**Managing text variables**
- **Create**: Click "Create" to add a new text.
- **Edit**: Modify text by clicking the pencil icon.
- **Delete**: Remove text by clicking the trash icon.
- **Preview**: See where the text is used by clicking the eye icon.

---

### 5. Links variables
Link variables store reusable URLs, such as website links, social media profiles, or call-to-action buttons.

- **Variable Name** (e.g., `link-website`)
- **Variable URL** (e.g., `https://bluefox.email`)
- **Main Variable** (true/false) determines if it appears in the project creation dialog. Non-main variables can be changed later in project settings

**Managing text variables**
- **Create**: Click "Create" to add a new link.
- **Edit**: Modify link by clicking the pencil icon.
- **Delete**: Remove link by clicking the trash icon.
- **Preview**: See where the link is used by clicking the eye icon.

## Conclusion

Variables make it easy to manage design consistency across blocks and templates. The **eye icon** provides a quick preview of where each variable is used, ensuring smooth editing. **main variables** appear in the design system Preview, while **non-main variables** remain available inside projects for flexible use.