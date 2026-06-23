---
title: Visual Email Builder | bluefox.email documentation
description: Learn how to use the visual drag-and-drop email builder in bluefox.email. Build emails with text, images, buttons, dynamic content, and advanced elements.
faqs:
  - question: "Do I need to write HTML to build emails in BlueFox Email?"
    answer: "No. The visual email builder is a fully drag-and-drop editor. You can build branded emails with text, images, buttons, dynamic content, and advanced elements without writing any HTML. A Custom Code element is available if you ever need to insert raw HTML for specific content."
  - question: "How is the structure of an email organized in the builder?"
    answer: "Every email is built from a hierarchy: Body → Block → Box → Row → Column → Element. The Body is the outermost container and controls the email background and width. Blocks are reusable full-width sections. Boxes sit inside blocks and hold the actual content. Boxes are divided into rows and columns, and each column holds individual content elements such as text, images, or buttons."
  - question: "What are blocks in the email builder?"
    answer: "Blocks are reusable full-width sections such as headers, footers, hero sections, and CTA rows that you save once and drop into any template. You can lock a block so only admins can edit it, which is useful for protecting footers with legal text or brand-critical header designs."
  - question: "Can I personalize emails with dynamic content in the builder?"
    answer: "Yes. The editor supports merge tags via Handlebars for text, buttons, image alt text, and link URLs. Dynamic Image elements let you set a per-recipient image src using a merge tag. Loop and Conditional elements let you repeat or conditionally show content sections based on contact data or API request data."
  - question: "What is the difference between a Dynamic Image and a regular Image element?"
    answer: "A regular Image element requires a static URL set at design time. A Dynamic Image element is a placeholder whose src is replaced at send time by a merge tag, allowing each recipient to see a different image such as their profile picture or a personalized product image."
head:
  - - meta
    - name: description
      content: Learn how to use the visual drag-and-drop email builder in bluefox.email. Build responsive emails with text, images, buttons, dynamic content, advanced elements, and full mobile control.
  - - meta
    - property: og:title
      content: Visual Email Builder | bluefox.email documentation
  - - meta
    - property: og:description
      content: Build responsive, personalized emails with the bluefox.email drag-and-drop editor. Text, images, buttons, dynamic content, advanced elements, mobile control, and more.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/docs-share.png
  - - meta
    - property: og:url
      content: https://bluefox.email/docs/projects/email-builder
  - - meta
    - property: og:type
      content: website
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Visual Email Builder | bluefox.email documentation
  - - meta
    - name: twitter:description
      content: Build responsive, personalized emails with the bluefox.email drag-and-drop editor. Text, images, buttons, dynamic content, advanced elements, mobile control, and more.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/docs-share.png
---

# Visual Email Builder

bluefox.email includes a powerful drag-and-drop email editor for building responsive, branded emails. It supports a full library of content and advanced elements, complete mobile control, and deep personalization, all without writing HTML.

For the complete editor reference, see the [full email editor documentation](https://help.chamaileon.io/en/collections/1340338-email-editor-documentation).


## Editor Overview

The interface consists of:
- **Canvas**: the central editing area where you build the email
- **Left panel**: element library and block library for dragging in new content
- **Right panel**: settings for the currently selected element, box, row, or block
- **Top bar**: email-level settings, preview, and save controls

The editor renders a pixel-accurate preview of how your email will look across email clients.

**Related guides:**
- [A tour of the editor interface](https://help.chamaileon.io/en/articles/11884906-a-tour-of-chamaileon-s-email-editor-interface-full-ui-overview): full walkthrough of every panel, menu, and control in the UI.
- [Chamaileon's email editor](https://help.chamaileon.io/en/articles/3916667-chamaileons-email-editor): overview of the editor and its core concepts.


## Core Structure: Body, Boxes, Rows & Columns

Every email is built from a hierarchy of structural elements:

- **Body**: the outermost container. Controls the email background color, global font defaults, and overall email width.
- **Blocks**: full-width horizontal sections of an email. Each block contains one or more boxes. Blocks can be reused across templates and locked to prevent edits.
- **Boxes**: containers inside a block that hold content elements. Boxes control padding, background color, background images, and border styling.
- **Rows & Columns**: boxes are divided into rows, and rows into columns. Each column holds content elements. You can add, remove, and reorder columns, and change their relative widths.

Understanding this hierarchy (Body → Block → Box → Row → Column → Element) is the foundation for building any layout.

**Related guides:**
- [What is the email body?](https://help.chamaileon.io/en/articles/2318365-what-is-the-email-body): the outermost container and what it controls.
- [What is a box?](https://help.chamaileon.io/en/articles/2318381-what-is-a-box): how boxes work as content containers.
- [What are rows and columns?](https://help.chamaileon.io/en/articles/2318369-what-are-rows-and-columns): structural basics of email layouts.
- [Change a column's width](https://help.chamaileon.io/en/articles/2318311-how-do-i-change-a-column-s-width): resize columns by percentage or drag.
- [Add or delete a column in a box](https://help.chamaileon.io/en/articles/2318288-how-do-i-delete-or-add-a-column-in-a-box): modify column count in an existing box.


## Basic Content Elements

Drag these elements from the left panel onto any column:

- **Text**: rich text with full formatting controls. Adjust font family, size, weight, color, alignment, line height, letter spacing, and padding. Add links, special characters, or non-breaking spaces.
- **Image**: insert images from the shared library, upload new ones, or use a URL. Control width, alignment, alt text, link, and padding. Resize images directly on the canvas using the photo editor.
- **Button**: styled call-to-action link. Set the URL, label, font, colors, padding, border radius, and hover styling. Link to a URL, email address, or phone number.
- **Divider**: horizontal separator. Control thickness, color, padding, and make it transparent for invisible spacing.
- **Social Media Icons**: pre-built social icon bar. Add links to your social profiles with icon style options.
- **Icons**: standalone icon elements for use anywhere in your layout.

**Related guides:**
- [Use basic content elements: text, image, button](https://help.chamaileon.io/en/articles/2318388-how-to-use-basic-content-elements-text-image-button): the three foundational elements.
- [Add a hyperlink in text](https://help.chamaileon.io/en/articles/2318215-how-do-i-insert-a-link-in-text): turn text into a clickable link.
- [Add hover styling to a button](https://help.chamaileon.io/en/articles/5612224-how-to-add-hover-styling-to-a-button): set hover background and text colors.
- [Add a phone number to a link](https://help.chamaileon.io/en/articles/5299085-how-to-add-a-phone-number-to-a-link-button-text-image): use `tel:` links on buttons, text, and images.
- [Add special characters](https://help.chamaileon.io/en/articles/5966683-how-to-add-special-characters-in-chamaileon): insert symbols and accented characters.
- [Create a transparent divider](https://help.chamaileon.io/en/articles/3194677-how-do-i-create-a-transparent-divider): invisible spacing dividers.
- [Use the social media icons element](https://help.chamaileon.io/en/articles/3036607-how-to-use-the-social-media-icons-element): add a row of linked social icons.
- [Use the icons element](https://help.chamaileon.io/en/articles/12699714-icons-element): add standalone icons anywhere.


## Advanced Elements

Advanced elements add dynamic and interactive content to your emails:

- **Dynamic Image**: a placeholder image whose `src` is replaced at send time by a merge tag. Use for personalized profile photos, product images, or any per-recipient image. See [personalization docs](/docs/email-personalization#image-personalization) for merge tag usage.
- **Video**: embed a video thumbnail with a play button link. Clicking opens the video URL in the browser (most email clients do not support native video playback).
- **Countdown Timer**: generates a live countdown image that updates until a deadline. Ideal for limited-time offers.
- **Custom Code**: insert raw HTML for any content the editor does not natively support.
- **Data Table**: add a simple structured table with rows and columns of text data.
- **Survey**: embed a one-click survey or rating element directly in the email body.
- **Social Media Post Embed**: embed a visual representation of a social post.
- **Animated GIF**: add animated GIFs the same way as static images. GIFs play in most email clients.

**Related guides:**
- [How advanced elements work](https://help.chamaileon.io/en/articles/4348707-how-do-advanced-elements-work): overview of the advanced element family.
- [Dynamic image element](https://help.chamaileon.io/en/articles/5972263-what-is-a-dynamic-image-element): per-recipient image personalization via merge tag.
- [Video element](https://help.chamaileon.io/en/articles/5522459-how-to-use-the-video-element): embed a video thumbnail with a play button.
- [Countdown timer](https://help.chamaileon.io/en/articles/2318251-how-do-i-add-a-countdown-timer): add a live countdown for limited-time campaigns.
- [Custom code element](https://help.chamaileon.io/en/articles/3030165-how-to-use-custom-code-element-in-the-editor): drop in raw HTML for unsupported content.
- [Data table](https://help.chamaileon.io/en/articles/2328942-how-do-i-add-a-simple-data-table-to-an-email): add structured tabular data.
- [Survey element](https://help.chamaileon.io/en/articles/2518799-how-to-add-a-survey-to-an-email): embed one-click rating or feedback widgets.
- [Social media post embed](https://help.chamaileon.io/en/articles/12942169-social-media-post-embed): embed a visual representation of a social post.
- [Animated GIFs](https://help.chamaileon.io/en/articles/2328950-how-do-i-add-an-animated-gif-to-an-email): use GIFs like static images.


## Layout & Columns

Control your email layout with flexible column options:

- **Add or remove columns** inside any box to create single, two-, three-, or four-column layouts.
- **Change column width**: drag column dividers or set exact percentage widths.
- **Column spacing**: control padding and margins between and around columns.
- **Reorder columns on mobile**: set a different column order for mobile without changing the desktop layout.
- **Column stacking**: control how multi-column layouts collapse on small screens. Stack top-to-bottom or disable stacking entirely.
- **Fluid on mobile**: make a column stretch full-width on mobile regardless of desktop width settings.
- **Lock width**: prevent a column or element from scaling down on smaller screens.
- **4-column to 2×2 on mobile**: configure a 4-column desktop layout to display as two rows of 2 on mobile.
- **Different content order on mobile vs desktop**: show elements in a different sequence on mobile using display-order controls.

**Related guides:**
- [Add or delete columns in a box](https://help.chamaileon.io/en/articles/2318288-how-do-i-delete-or-add-a-column-in-a-box): change column count.
- [Change a column's width](https://help.chamaileon.io/en/articles/2318311-how-do-i-change-a-column-s-width): set exact percentage widths.
- [Adjust column spacing (padding/margin)](https://help.chamaileon.io/en/articles/5032874-how-can-i-adjust-column-spacings-paddings-margins): control gaps between columns.
- [Change multicolumn spacing](https://help.chamaileon.io/en/articles/4598988-how-to-change-multicolumn-spacing): overall multi-column spacing controls.
- [Bring multicolumn elements closer together](https://help.chamaileon.io/en/articles/4410474-how-to-bring-multicolumn-elements-closer-to-each-other): tighten gaps for compact layouts.
- [Reorder columns on mobile](https://help.chamaileon.io/en/articles/4842345-how-do-i-reorder-columns-on-mobile): different column order on small screens.
- [Change column stacking](https://help.chamaileon.io/en/articles/4598961-how-to-change-column-stacking): control how columns collapse on mobile.
- [Fluid on mobile](https://help.chamaileon.io/en/articles/2828346-what-does-fluid-on-mobile-feature-do): full-width expansion on small screens.
- [Lock width](https://help.chamaileon.io/en/articles/2828335-what-does-lock-width-feature-do): prevent elements from scaling down.
- [Turn 4 columns into 2×2 on mobile](https://help.chamaileon.io/en/articles/2318397-how-to-turn-4-columns-on-desktop-to-2-2-columns-on-mobile): reflow 4-col desktop layouts.
- [Different content order on mobile vs desktop](https://help.chamaileon.io/en/articles/2735046-different-email-content-order-on-mobile-and-desktop): sequence elements differently per device.


## Styling & Design

Fine-tune the visual appearance of every element:

- **Backgrounds**: set solid color, gradient, or image backgrounds on the email body, blocks, or individual boxes. Control image fit, position, and repeat.
- **Padding & margin**: set top, bottom, left, and right padding individually on any element, box, or column.
- **Borders & corners**: add border color and width to any box. Set border radius for rounded corners on all four corners or just top or bottom corners independently.
- **Fonts**: choose from system font stacks or add custom web fonts (Google Fonts and custom font URLs supported).
- **Text spacing**: control line height, letter spacing, and paragraph spacing on any text element.
- **Bullet color**: change the color of list bullet points independently from the text color.
- **Email width**: set the overall max-width of the email (default 600px).
- **Left-align template**: override centered layout for left-aligned full-width designs.

**Related guides:**
- [Change the email background](https://help.chamaileon.io/en/articles/2318298-how-do-i-change-the-background-of-the-email): body-level background color or image.
- [Change a block's background](https://help.chamaileon.io/en/articles/3774615-how-to-change-the-background-of-the-block): block-level background styling.
- [Set a background image on a box](https://help.chamaileon.io/en/articles/4338192-how-to-set-a-background-image-of-a-box-in-chamaileon): image backgrounds at the box level.
- [Adjust padding and margin](https://help.chamaileon.io/en/articles/2893358-how-to-adjust-the-top-bottom-left-right-padding-and-margin): top/bottom/left/right spacing controls.
- [Add border color to a text box](https://help.chamaileon.io/en/articles/2710579-how-to-add-border-color-to-a-text-box): borders on boxes and text containers.
- [Round all four corners on a box](https://help.chamaileon.io/en/articles/2710571-how-do-i-make-round-corners-on-the-box): uniform corner radius.
- [Round only top or bottom corners](https://help.chamaileon.io/en/articles/6248038-how-to-create-only-top-or-bottom-rounded-corners): asymmetric corner radius.
- [Add custom fonts](https://help.chamaileon.io/en/articles/3074210-how-to-change-add-custom-fonts-in-chamaileon): Google Fonts and custom web font support.
- [Adjust text spacing](https://help.chamaileon.io/en/articles/4592006-how-to-adjust-text-spacing): line height, letter spacing, paragraph spacing.
- [Change bullet color](https://help.chamaileon.io/en/articles/5435141-how-do-i-change-the-bulletin-color): list bullet styling.
- [Change the email's width](https://help.chamaileon.io/en/articles/4287819-how-to-change-the-email-s-width): adjust the 600px default.
- [Left-align a template](https://help.chamaileon.io/en/articles/3061609-how-to-left-align-my-template): override centered layout.


## Images & Media

- **Photo editor**: crop, resize, flip, rotate, and apply basic adjustments to images directly inside the editor without leaving the browser.
- **Shared image library**: upload and organize images in a centralized library shared across your templates.
- **Stock photos**: access a built-in stock photo gallery for royalty-free images.
- **Resize images**: drag image handles on the canvas to resize, or enter exact dimensions in the settings panel.
- **Linked images**: wrap any image in a URL, email address, or phone link.
- **Text over image**: layer text on top of a background image using box-level background image settings.
- **Background image Outlook fix**: use the built-in VML fallback option to ensure background images render in Outlook.
- **Prevent Gmail download icon**: enable the option to suppress the image download icon that Gmail shows on hover.

**Related guides:**
- [Use the photo editor](https://help.chamaileon.io/en/articles/2628295-how-to-use-the-photo-editor): crop, rotate, and adjust images in-browser.
- [Use the shared image library](https://help.chamaileon.io/en/articles/3508881-how-to-use-the-shared-image-library): centralized brand asset storage.
- [Stock photos in the gallery](https://help.chamaileon.io/en/articles/4592214-do-you-have-stock-photos-available-in-the-gallery): built-in royalty-free image library.
- [Add an image](https://help.chamaileon.io/en/articles/2318226-how-do-i-add-an-image): upload, drag, or use a URL.
- [Resize images](https://help.chamaileon.io/en/articles/2367097-how-can-i-resize-images): drag handles or set exact dimensions.
- [Add a URL link to an image](https://help.chamaileon.io/en/articles/2318348-how-do-i-add-a-url-link-to-an-image): make any image clickable.
- [Text over an image](https://help.chamaileon.io/en/articles/2622809-how-do-i-add-a-text-over-an-image-image-under-text): layer text on a background image.
- [Wrap text around an image](https://help.chamaileon.io/en/articles/4410449-how-can-i-wrap-text-around-an-image): magazine-style flow layout.
- [Fit background images to the box](https://help.chamaileon.io/en/articles/3180415-how-do-i-make-my-background-images-to-fit-the-box): control sizing and positioning.
- [Fix background images in Outlook](https://help.chamaileon.io/en/articles/2621914-what-should-i-do-if-background-images-in-my-email-template-are-not-showing-up-in-outlook): VML fallback for Outlook rendering.
- [Suppress Gmail's image download icon](https://help.chamaileon.io/en/articles/4338151-how-to-prevent-gmail-to-display-a-download-icon-on-the-images): cleaner image hover behavior in Gmail.


## Links & Navigation

Add links anywhere in your email:

- **Button links**: link to a URL, email address (`mailto:`), or phone number (`tel:`) from any button element.
- **Text links**: select any text and add a hyperlink. Supports URL, email, and phone links.
- **Image links**: wrap an image in a URL, email, or phone link.
- **Unsubscribe link**: insert the `{{unsubscribeLink}}` merge tag in any text element. See [personalization docs](/docs/email-personalization#built-in-merge-tags) for details.
- **View in browser link**: add a "view this email in your browser" link using the browser view URL variable.
- **Hover styling on buttons**: set a distinct background and text color that appears when a recipient hovers over a button (supported in most desktop email clients).

**Related guides:**
- [Add a link to a button](https://help.chamaileon.io/en/articles/2318342-how-do-i-add-a-link-to-a-button): URL, email, or phone target.
- [Insert a link in text](https://help.chamaileon.io/en/articles/2318215-how-do-i-insert-a-link-in-text): hyperlink any text selection.
- [Add a URL link to an image](https://help.chamaileon.io/en/articles/2318348-how-do-i-add-a-url-link-to-an-image): clickable images.
- [Link to an email address](https://help.chamaileon.io/en/articles/2367972-how-do-i-link-to-an-email-address): `mailto:` links in text.
- [Use an email address as a button link](https://help.chamaileon.io/en/articles/2367963-how-do-i-add-an-email-address-as-a-link-to-a-button): `mailto:` on buttons.
- [Add a phone number link](https://help.chamaileon.io/en/articles/5299085-how-to-add-a-phone-number-to-a-link-button-text-image): `tel:` links on any clickable element.
- [Add an unsubscribe link in text](https://help.chamaileon.io/en/articles/2446447-how-do-i-create-an-unsubscribe-link-in-the-text): use the `{{unsubscribeLink}}` merge tag.
- [Add a "view in browser" link](https://help.chamaileon.io/en/articles/3132258-how-to-add-view-this-email-in-the-browser-link): fallback for emails that don't render well in-client.
- [Hover styling on buttons](https://help.chamaileon.io/en/articles/5612224-how-to-add-hover-styling-to-a-button): set hover background and text colors.


## Mobile & Responsive Design

The editor provides granular control over mobile rendering:

- **Show on mobile / hide on mobile**: set any element or box to only appear on mobile or only appear on desktop.
- **Reorder columns on mobile**: drag to set a different column order for narrow screens.
- **Column stacking**: choose whether multi-column layouts stack vertically on mobile and in which order.
- **Fluid on mobile**: allow a fixed-width element to expand to full screen width on mobile.
- **4-to-2×2 column layout**: a 4-column desktop layout automatically reflows to 2 columns per row on mobile.

**Related guides:**
- [Show or hide elements on mobile/desktop](https://help.chamaileon.io/en/articles/2710569-how-do-i-use-show-on-mobile-desktop-feature): device-specific visibility.
- [Reorder columns on mobile](https://help.chamaileon.io/en/articles/4842345-how-do-i-reorder-columns-on-mobile): different column order on narrow screens.
- [Column stacking on mobile](https://help.chamaileon.io/en/articles/4598961-how-to-change-column-stacking): vertical reflow behavior.
- [Fluid on mobile](https://help.chamaileon.io/en/articles/2828346-what-does-fluid-on-mobile-feature-do): full-width expansion on small screens.
- [4-column to 2×2 on mobile](https://help.chamaileon.io/en/articles/2318397-how-to-turn-4-columns-on-desktop-to-2-2-columns-on-mobile): reflow 4-column layouts.
- [Different content order per device](https://help.chamaileon.io/en/articles/2735046-different-email-content-order-on-mobile-and-desktop): sequence elements differently on mobile.


## Dark Mode Preview

The editor includes a dark mode preview that shows how your email renders in dark mode email clients (Apple Mail, iOS Mail, Outlook on macOS). Use it to check color contrast, background inversions, and image visibility before sending.

**Related guides:**
- [Dark mode and how to use the dark mode preview](https://help.chamaileon.io/en/articles/5962808-what-is-dark-mode-and-how-to-use-dark-mode-preview): preview your email as dark mode clients will render it.


## Brand Variables

Brand variables let you define reusable design tokens (colors, fonts, logos, URLs) at the account or project level and reference them across all your templates. Changing a brand variable updates every template that uses it, without manually editing each one.

In bluefox.email, project-level overrides work alongside brand variables. See [email theme settings](/docs/projects/email-theme-settings) for how per-project overrides interact with your master theme.

**Related guides:**
- [Use the brand variable modal](https://help.chamaileon.io/en/articles/5859909-how-to-use-brand-variable-modal): create and reference design tokens across templates.


## Blocks Library

Blocks are reusable full-width sections you save once and drop into any template. They contain your pre-styled layouts: headers, footers, hero sections, product cards, CTA rows, and more.

- **Add a new block**: drag any block from the block library panel onto the canvas.
- **Save a block**: select a block on the canvas and save it to your library with a name.
- **Block locking**: lock a block so that only admins can edit it. Useful for protecting footers with legal text or brand-critical headers.

**Related guides:**
- [How to use blocks](https://help.chamaileon.io/en/articles/2802473-how-to-use-blocks): core block concepts and workflow.
- [Add a new block](https://help.chamaileon.io/en/articles/4783090-how-to-add-a-new-block): drag a block from the library onto the canvas.
- [How block locking works](https://help.chamaileon.io/en/articles/4192177-how-does-block-locking-work): protect blocks from edits.
- [Change a block's background](https://help.chamaileon.io/en/articles/3774615-how-to-change-the-background-of-the-block): block-level background styling.


## Full Editor Reference

This page covers the feature set available in the bluefox.email editor. For detailed step-by-step guides on every topic above, visit the complete editor documentation:

[View full email editor documentation →](https://help.chamaileon.io/en/collections/1340338-email-editor-documentation)
