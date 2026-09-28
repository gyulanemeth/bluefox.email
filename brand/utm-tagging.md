# UTM tagging convention

One UTM structure for every email BlueFox Email sends about itself
(newsletters, announcements, automations). Following it means every email can
be compared in analytics without cleanup. This is a reference document only.
It is excluded from the VitePress build via `srcExclude` in
`.vitepress/config.js`.

## 1. The five parameters

| Parameter | Meaning | Format | Example |
|---|---|---|---|
| `utm_source` | The list or flow that delivered the email | list or flow slug | `whats-new` |
| `utm_medium` | The channel | always `email` | `email` |
| `utm_campaign` | The specific email or send | `YYYY-MM-DD-topic` | `2026-09-29-monthly-plans` |
| `utm_term` | The audience variant of that send | audience slug | `paying-customers` |
| `utm_content` | Which link was clicked | `section-element` | `hero-cta` |

Always write them in this order: source, medium, campaign, term, content.

```
https://bluefox.email/pricing?utm_source=whats-new&utm_medium=email&utm_campaign=2026-09-29-monthly-plans&utm_term=free-users&utm_content=hero-cta
```

## 2. Formatting rules

- Lowercase only, words joined by hyphens, ASCII only. No spaces, underscores
  or camelCase. (`monthly-plans`, not `Monthly_Plans`.)
- `utm_campaign` starts with the **send date**, matching the folder name in
  `newsletters/` (for example `newsletters/2026-09-29/` becomes
  `2026-09-29-...`). The topic is 1 to 3 words.
- All audience variants of one send share the same `utm_campaign`. They
  differ only in `utm_term`, so the campaign can be viewed as a whole or split
  by audience.
- Never put personal data (email addresses, names, contact IDs) or merge tags
  in UTM values.
- Never reuse a `utm_campaign` value for a different send.

## 3. Controlled values

Add new values here before using them.

### `utm_source`: lists and flows

| Value | Subscriber list / flow |
|---|---|
| `whats-new` | What's new with bluefox.email |
| `saas-course` | SaaS Email Marketing Course |
| `advanced-strategies` | Advanced strategies |
| `product-tips` | Personalized Product Support & Tips |
| `performance-reports` | Performance reports |
| `alert-center` | Alert center |
| `waitlist` | Waitlist |
| `automation-<name>` | Automation emails, e.g. `automation-onboarding` |

### `utm_term`: audiences

| Value | Who |
|---|---|
| `all` | Whole list, no audience split |
| `paying-customers` | Workspaces that have bought a pack or plan |
| `free-users` | Workspaces that have never paid |
| `byo-ses` | Workspaces sending through their own Amazon SES |

### `utm_content`: link positions

Build as `section-element`. Common values:

| Value | Link |
|---|---|
| `header-logo` | Logo in the header |
| `hero-cta` | First primary button |
| `body-link` | Inline text link in the body copy (add a word if there are several, e.g. `body-link-byo`) |
| `plans-table` | Links inside a pricing table |
| `callout-link` | Link inside a callout box |
| `final-cta` | Last primary button |
| `footer-site` | Website link in the footer |

If the same button appears twice, give each a different `utm_content` value
(`hero-cta` and `final-cta`). That is how we learn which position converts.

## 4. What to tag and what not to tag

**Tag:** links to `bluefox.email` and `app.bluefox.email`.

**Do not tag:**
- `mailto:` links
- Merge tag links (`{{unsubscribeLink}}`, `{{pauseSubscriptionLink}}`)
- Third-party sites (partners, AWS, docs we do not own). Their analytics are
  not ours, and the tags leak our campaign names.
- Transactional emails (password resets, receipts). They are not marketing.

## 5. Recording it

Put the UTM values in the header comment of every newsletter's `.mjml` file,
so the tags can be looked up without opening analytics:

```
UTM: utm_source=whats-new utm_medium=email
     utm_campaign=2026-09-29-monthly-plans utm_term=paying-customers
```
