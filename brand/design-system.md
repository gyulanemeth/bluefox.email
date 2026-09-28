# BlueFox Email design system (for emails)

This descriptor translates the visual language of bluefox.email into rules for
email templates (newsletters, announcements, lifecycle emails). It is a
reference document only. It is excluded from the VitePress build via
`srcExclude` in `.vitepress/config.js`.

Sources: `.vitepress/theme/style.css`, the Vuetify theme in
`.vitepress/theme/index.js`, and the component styles on `pricing.md`,
`byo-amazon-ses-pricing.md` and `index.md`.

## 1. Principles

- **Clean and flat.** White cards on a very light slate background, thin 1px
  borders, 4px corner radius. No drop shadows, no heavy gradients in content.
- **One accent color.** Brand sky blue (`#13B0EE`) carries every interactive or
  highlighted element: primary buttons, links, check marks, the "featured"
  card border, small flags/chips.
- **Numbers are the hero.** Prices and send volumes are set large and bold;
  supporting text is small and muted slate.
- **Sentence case everywhere.** Buttons and headings are never uppercase.
- **Light theme first.** Emails are designed in the light theme. Dark mode
  clients may invert; keep contrast safe (see section 8).

## 2. Color tokens

### Brand

| Token | Value | Use |
|---|---|---|
| `brand` | `#13B0EE` (hsl 197 87% 50%) | Primary buttons, links, check marks, featured borders, flags |
| `brand-light` | `#40BFF1` (hsl 197 87% 60%) | Button hover (web only) |
| `brand-dark` | `#107FAB` (hsl 197 87% 40%) | Link text on white when small text needs more contrast |
| `brand-accessible` | `#0C7AA6` (hsl 197 87% 35%) | Small body links |
| `brand-tint` | `#E0F2FE` | Tip / callout background |
| `brand-tint-text` | `#164E63` | Text on `brand-tint` |
| `secondary` | `#392C91` (deep indigo) | Gradient start, rare secondary accent |

### Signature gradient

`linear-gradient(120deg, #392C91 5%, #13B0EE)`. Used on the homepage hero
name. In email, use it at most once (e.g. a thin header bar or hero band) and
always provide a solid `#13B0EE` fallback background color, because many clients
(Outlook desktop, some Gmail variants) drop CSS gradients.

### Neutrals (Tailwind slate scale)

| Token | Value | Use |
|---|---|---|
| `text-strong` | `#0F172A` | Headings |
| `text-body` | `#334155` | Body copy, list items |
| `text-muted` | `#64748B` | Subtitles, "/ month" period labels, footnotes |
| `text-faint` | `#94A3B8` | "+VAT" labels, legal fine print |
| `border` | `#E2E8F0` | Card borders, dividers |
| `surface` | `#FFFFFF` | Cards, main content column |
| `surface-alt` | `#F8FAFC` | Page background, "need more" banners |
| `button-neutral` | `#EBEBEF` | Neutral secondary button background |

### Dark theme reference (web only)

Card `#1B1B1F`, banner `#1E1E22`, border `#334155`, body text `#CBD5E1`,
muted `#94A3B8`. Not used for email builds; listed so email dark-mode tweaks
stay in the family.

## 3. Typography

The site uses the VitePress default stack (Inter, falling back to system UI).
Web fonts are unreliable in email, so use:

```
font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

| Role | Size / line-height | Weight | Color |
|---|---|---|---|
| H1 (hero headline) | 32px / 1.15 (mobile 28px) | 800 | `text-strong` |
| H2 (section title) | 24px / 1.25 | 700 | `text-strong` |
| H3 (card title, plan name) | 20px / 1.3 | 600 | `text-strong` |
| Big number (price) | 36 to 48px / 1 | 700 | `text-strong` |
| Lead paragraph | 17px / 1.6 | 400 | `text-muted` |
| Body | 16px / 1.6 | 400 | `text-body` |
| Small body (lists, card copy) | 14px / 1.6 | 400 | `text-body` |
| Label ("/ month", "+VAT") | 14px | 500 | `text-muted` / `text-faint` |
| Fine print | 12px / 1.6 | 400 | `text-muted` |
| Flag / chip | 11px / 16px | 600 | white on `brand` |

Use `<strong>` (weight 600 to 700) to highlight the key fact in a sentence,
exactly like the site does ("**3,000 free sends**", "**50,000 sends** included").

## 4. Spacing and layout

- Content width: **600px** (email standard). Site sections max out at 1200px
  with 24px gutters; in email use 24px horizontal padding inside the column
  (16px on mobile).
- Section rhythm: 32 to 40px between sections, 16px between a heading and its
  paragraph, 8px between a card title and its price.
- Cards: padding 24px (site uses 32px on desktop), `1px solid #E2E8F0`,
  radius 4px, background white.
- Plan rows (list layout used for monthly plans): padding 16 to 20px, 12px gap
  between rows.

## 5. Components

### Primary button
- Background `#13B0EE`, text white, weight 600, 16px.
- Padding 12px 24px, radius 4px, no border, sentence case.
- Example labels: "Get started for free", "Subscribe", "See pricing".

### Secondary (outline) button
- Transparent/white background, `1px solid #13B0EE`, text `#13B0EE`,
  weight 600, radius 4px.

### Neutral button
- Background `#EBEBEF`, text `#0F172A`. Used for "Contact sales".

### Card
- White, `1px solid #E2E8F0`, radius 4px, 24px padding.
- **Featured** variant: border color `#13B0EE` (optionally 2px in email so it
  is visible after client rendering).

### Flag ("Most popular")
- Small pill: background `#13B0EE`, white 11px weight 600 text, padding
  2px 8px, radius 4px. On the site it overlaps the top border of the featured
  row; in email place it just above the row title.

### Chip ("2x sends")
- Same as the flag, used inline next to a figure.

### Feature list
- Each item prefixed with a brand-colored bold check mark `✓`, 8px gap,
  14px `text-body`.

### Price block
- Big number (bold, `text-strong`) + small `+VAT` label (`text-faint`, 14px,
  weight 500) + period (`/ month`, `/ pack`, `text-muted`, 16px), all on one
  baseline.

### Banner / callout
- Background `#F8FAFC`, border `1px solid #E2E8F0`, radius 4px, 15px text in
  `text-body`, links in brand color weight 600.
- Tip variant: background `#E0F2FE`, text `#164E63`.

### Links
- Brand color, weight 600 in banners, no underline on the site. In email body
  copy keep an underline for accessibility; buttons have none.

## 6. Logo and imagery

- Logo: fox mark, hosted at
  `https://bluefox.email/assets/bluefoxemail-logo-200x200.png`
  (also `bluefoxemail-logo.png`, 1024px version). Display at 40 to 48px
  square, next to the wordmark "BlueFox Email" in 18px weight 700.
- Product imagery: real template previews and UI screenshots, never stock
  photos.
- Always set `alt` text; emails must read correctly with images off.

## 7. Email header and footer

- **Header:** white or `surface-alt` background, logo + wordmark left or
  centered, optional 4px brand/gradient bar across the top.
- **Footer:** `surface-alt` background, 12px `text-muted`, contains company
  line ("Innovaris Group LLC"), a link to bluefox.email, and the unsubscribe /
  preferences link (merge tag from the sending platform).

## 8. Accessibility and client-safety rules

- Minimum body size 14px, fine print never below 12px.
- White text on `#13B0EE` is fine for bold 16px button labels; for small text
  links on white prefer `#0C7AA6`.
- Solid background fallback for any gradient.
- No text baked into images.
- Buttons built as bulletproof (table/MJML `mj-button`), not images.
- Single column on mobile; multi-column sections must stack.
