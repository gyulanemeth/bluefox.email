# How we make newsletters

A checklist for creating a BlueFox Email newsletter, based on the 2026-09-29
monthly plans launch. Follow it top to bottom. The "Avoid" notes are mistakes
we already made once.

## 0. Before you start

- [ ] Read the three brand files:
  - `brand/design-system.md` (colors, type, components)
  - `brand/writing-style.md` (voice, naming, banned words, newsletter checklist)
  - `brand/utm-tagging.md` (link tagging, required on every send)
- [ ] Check every fact against the site source (`pricing.md`,
  `byo-amazon-ses-pricing.md`, `docs/`). Do the math yourself for any savings
  claim and include the cases where our offer is *not* cheaper.
- [ ] Look for pages that contradict the news, and fix them before sending.
  For example, `docs/pricing.md` still said "No subscriptions" after the plans
  launched.

**Avoid:** claims nobody has verified. "Switching takes a minute from your
billing settings" was a guess, and the app has no billing URL. Link to
`https://app.bluefox.email/` and say "Log in to ...".

**Avoid:** badges like "Most popular" on something that just launched.
Readers know it's new.

## 1. Decide the audience first

- [ ] One email per audience. At minimum, split paying customers from free
  users. They need different arguments:
  - Free users: the lower entry price.
  - Paying customers: savings, and reassurance that nothing they have breaks.
- [ ] Map each audience to a segment in BlueFox Email:
  - `Paying customers`: has tag `paying-customer`
  - `Free users`: does not have tag `paying-customer`
- [ ] Refresh the `paying-customer` tag from the current paying-accounts list
  (bulk add tags). Report addresses that aren't contacts.
- [ ] Check for team or test accounts carrying the tag, for example
  tiwariparth067, ahmedku0123, gyula@innovarisgroup.com.

**Avoid:** leaving contact data lying around. Delete contact CSV exports right
after use, and never commit contact lists to the repo.

## 2. Folder structure

```
newsletters/
  YYYY-MM-DD/                 send date, also used in utm_campaign
    <audience>/               e.g. paying-customers, free-users
      newsletter.mjml         the source, the only file you edit
      newsletter.html         compiled output, never edit by hand
    images/                   only if we host images for this send
```

- [ ] Header comment at the top of every `.mjml`:
  - audience
  - subject line
  - UTM values
  - the build command

## 3. Write the copy

- [ ] Subject under 50 characters. Preheader adds the number the subject left
  out.
- [ ] The first lines answer "what changed for me?"
- [ ] Every price shows +VAT, with the VAT footnote.
- [ ] One primary CTA, repeated at most twice, each with a different
  `utm_content`.
- [ ] A reply prompt ("reply with your volume") and a real person's sign-off.
- [ ] No em dashes, no exclamation marks, nothing from the banned-words list.

## 4. Merge tags (campaigns)

- [ ] Contact fields use the `contact.` prefix: `{{contact.name}}`. Do **not**
  use `{{subscriber.name}}`, which renders empty in campaigns.
- [ ] Greeting with fallback: `Hi{{#if contact.name}} {{contact.name}}{{/if}},`
- [ ] Footer links: `{{pauseSubscriptionLink}}` (offer it first) and
  `{{unsubscribeLink}}`. These get no UTM tags.

## 5. MJML layout rules (mobile first)

- [ ] **Logo:** put it in a small `mj-table`, with the image at fixed
  `width="44" height="44"` plus the same values in inline style, next to the
  wordmark cell.
  - **Avoid:** `mj-image` with a fixed `height` inside a percentage column (for
    example `mj-group` with 15%/85%). The column gets narrower than the image on
    phones, and the logo distorts.
- [ ] **Price tables:** two columns at most on mobile.
  - Put name and details on the left.
  - Put the price or rate on the right, in a fixed-width cell (`width="80"`,
    `width:80px; min-width:80px; white-space:nowrap; word-break:keep-all`).
  - Stack small labels under the number ("/ month", "per 1,000 sends") instead
    of putting them beside it.
  - Keep "+VAT" in the footnote, not in every row.
  - **Avoid:** `white-space:nowrap` on the flexible (left) column. Some mail
    apps then squeeze the price column until it breaks one character per line.
  - **Avoid:** three-column tables. They are cramped at 375px.
- [ ] Section labels ("Your packs", "Monthly plans") help long tables scan
  better than a header row.
- [ ] Short card list items, so they fit on one line at card width. Shorten
  the copy rather than shrinking the font.

## 6. Build and preview

- [ ] Compile with strict validation:
  `npx mjml newsletters/<date>/<audience>/newsletter.mjml -o newsletters/<date>/<audience>/newsletter.html --config.validationLevel=strict`
- [ ] Preview at **320, 375 and 600+ px**.
  - Headless Chrome can't make a window narrower than about 500px. Load the
    HTML in an `<iframe>` of the target width instead.
  - Crop the screenshots with Python PIL. `sips --cropOffset` gave unreliable
    results.
- [ ] Check with grep:
  - every `bluefox.email` and `app.bluefox.email` link has the full UTM set
  - the merge tags survived compilation

## 7. Upload to BlueFox Email

- [ ] Create each campaign as a **draft** (no `scheduledFor`):
  - list: `What's new with bluefox.email`
  - segment: the audience's segment
  - subject, preview text, `bodyType: html`
- [ ] Set reply-to (`gyula@bluefox.email`).
- [ ] Upload the **whole freshly compiled file** every time you change it.
  - **Avoid:** splicing changed sections into a previously uploaded body. It
    can't be proven identical to the MJML.
- [ ] If you minify, compile with `--config.minify=true`. Strip only plain
  comments.
  - **Avoid:** a regex that also eats Outlook's `<!--[if ...]>` or `<!-->`
    markers. Check that the `<!-->` count matches the unminified build.
- [ ] After uploading, read the stored body back with `get_email` and confirm
  it matches what you uploaded.

## 8. Test and send

- [ ] Send a test of every version to the private `GY test` list.
- [ ] Check it on a real phone. The mail app can render differently from
  browser previews. When a mail app shows a bug, compare it with the stored
  HTML before changing anything.
- [ ] Check the greeting, the links, the pause and unsubscribe links, and
  reply-to.
- [ ] Get explicit approval, then schedule. Keep drafts unscheduled until then.
