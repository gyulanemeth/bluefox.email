---
title: BlueFox Email vs Brevo
description: Direct comparison of BlueFox Email and Brevo (formerly Sendinblue) for email marketing and transactional email, covering design, integrations, automation, deliverability, personalization, analytics, support, and pricing with scenario-based cost analysis.
thumbnail: /assets/comparisons/bluefox-vs-brevo.png
sidebar: false
aside: true

prev: false
next: false
datePublished: "2025-10-20"
dateModified: "2026-05-29"
head:
  - - meta
    - name: description
      content: Direct comparison of BlueFox Email and Brevo (formerly Sendinblue) for email marketing and transactional email, covering design, integrations, automation, deliverability, personalization, analytics, support, and pricing with scenario-based cost analysis.
  - - meta
    - property: og:title
      content: BlueFox Email vs Brevo | BlueFox Email
  - - meta
    - property: og:description
      content: Direct comparison of BlueFox Email and Brevo (formerly Sendinblue) for email marketing and transactional email, covering design, integrations, automation, deliverability, personalization, analytics, support, and pricing with scenario-based cost analysis.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/comparisons/bluefox-vs-brevo.png
  - - meta
    - property: og:url
      content: https://bluefox.email/comparisons/bluefox-vs-brevo
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: BlueFox Email vs Brevo | BlueFox Email
  - - meta
    - name: twitter:description
      content: Direct comparison of BlueFox Email and Brevo (formerly Sendinblue) for email marketing and transactional email, covering design, integrations, automation, deliverability, personalization, analytics, support, and pricing with scenario-based cost analysis.
---

<script setup>
import { useDisplay } from 'vuetify'
import { useData } from 'vitepress'

import TemplateShowcase from '../.vitepress/theme/TemplateShowcase.vue'
import Segmentation from '../.vitepress/theme/Segmentation.vue'
import AgencyAnalytics from '../for/marketing-agencies/AgencyAnalytics.vue'

const { lgAndUp, md, sm, xs } = useDisplay()
const { isDark } = useData()
</script>

<style scoped>
  .home-analytics :deep(.analytics-head) {
    text-align: center;
  }
  .home-analytics :deep(.analytics-head p) {
    margin-left: auto;
    margin-right: auto;
  }
  .home-analytics :deep(.agency-analytics) {
    padding: 0;
  }
</style>

<GlossaryNavigation link="/comparisons" label="Back to comparison list" />

# BlueFox Email vs Brevo: Head-to-Head Comparison

In October 2025, Brevo quietly renamed its "Business" tier to "Standard" and slotted a new "Professional" tier in above it at $499 per month. Two months later it closed a €500 million Series C and crossed into unicorn territory. The product underneath those announcements has been broadening for years (email, SMS, WhatsApp, web push, live chat, a sales CRM, an AI marketing agent), but the late-2025 stretch was when Brevo's positioning shifted clearly. This is no longer an email tool that grew up. It's a customer engagement suite aimed at HubSpot's mid-market, priced to undercut.

BlueFox Email is a different kind of bet. One product, email only, sold per-send rather than per-contact, with every feature available on the free tier. There's a managed sending mode (with an optional dedicated IP add-on) and an optional bring-your-own AWS SES mode for teams that want full IP isolation and their own AWS billing relationship. No SMS, no CRM, no landing pages, no AI agent.

The honest question isn't which platform is "better." The two target different shapes of business. The useful question is which model fits your situation: a wide bundle priced by email volume, or a narrow product priced by sends with the option to run on top of your own AWS infrastructure. What follows is a section-by-section comparison covering design, integrations, automation, deliverability, personalization, segmentation, analytics, support, and pricing, with scenario-based cost math at the end. Numbers reflect public pricing and documentation as of May 2026.

## Platform Positioning

Brevo is headquartered in Paris and was originally called Sendinblue. It rebranded in May 2023 to reflect a broader product scope, and as of 2026 it serves 600,000+ customers across 180 countries with €200M+ ARR. B Corp certification arrived in May 2025; the €500M Series C in December 2025 brought General Atlantic and Oakley Capital onto the cap table and confirmed valuation above $1B. The platform now covers email campaigns, transactional email (REST API and SMTP), SMS, WhatsApp, web and mobile push, live chat (sold as Conversations), forms, landing pages, and a built-in sales CRM. EU data residency and GDPR alignment are baseline rather than add-ons, which matters for teams operating in regulated markets or with European customers.

The pricing structure has five tiers as of October 2025: Free, Starter ($9/mo for 5K emails), Standard ($18/mo for 5K emails, previously called "Business"), Professional ($499/mo for 150K+ emails), and Enterprise (custom, from roughly $10K/year). Feature access steps up with the tier: automation caps at 2,000 contacts on Starter and goes unlimited on Standard, landing pages start at Standard, and WhatsApp, mobile/web push, AI segmentation, and a dedicated analytics studio require Professional or Enterprise. A €50 million five-year AI investment funds the Aura AI agent (content generation, launched May 2025), predictive send-time optimization, AI dynamic content, and natural-language AI segmentation.

BlueFox Email's product is narrower by design. It offers two delivery modes: managed infrastructure (projects start in sandbox, move to production after a review, no AWS account required) and an optional [BYO AWS SES](https://bluefox.email/docs/projects/delivery-modes#using-aws-ses-directly) mode for teams that want to use their own AWS account and keep their own sending reputation. The feature set covers campaigns, transactional, triggered emails, automations, sign-up forms, segments, suppression lists, and a subscription preferences page with one-click unsubscribe (RFC-8058) built in. There's no SMS, WhatsApp, push, live chat, CRM, or landing page builder. Pricing is per-send (credit packs roll for 12 months) with unlimited contacts, and all features are available on every plan including the free tier.

The two are aimed at different teams. Brevo fits organizations that want one vendor for multi-channel marketing automation plus a sales CRM. BlueFox Email fits teams that want focused email, either fully managed or on top of their own AWS SES, with predictable per-send costs and no feature gates between tiers. Both keep data in the EU and are GDPR compliant.

## Email Design and Templates

### Brevo

Brevo ships a drag-and-drop builder, a rich-text editor, and an HTML editor, plus 40+ responsive templates that are accessible from the free plan onward. The **Aura AI** agent (launched May 2025) generates subject lines, body copy, CTAs, and tone-adjusted rewrites; multilingual translation is supported. Real-time campaign analytics including heat maps are available on every plan. Higher tiers add AI-powered dynamic content (product recommendations, images, copy based on subscriber behavior).

Independent reviews note specific editor constraints: blocks cannot save with different column structures (a full-width header followed by a two-column body has to be built as two separate blocks), there's no content locking for recurring elements like headers and footers, and the developer mode lacks syntax highlighting. Users also occasionally report formatting inconsistencies and dashboard lag.

**Strengths:** large template library, three editor modes (drag-drop, rich text, HTML), Aura AI on every plan including free, heat-map analytics on every plan, AI dynamic content on higher tiers.

**Trade-offs:** column-structure rigidity in saved blocks, no template-level content locking for shared elements, some users report editor performance lag, AI-generated copy can feel generic and need editing.

### BlueFox Email

BlueFox Email uses the [Chamaileon SDK](https://help.chamaileon.io/en/collections/1340338-email-editor-documentation) for its drag-and-drop builder. The editor offers a built-in stock photo gallery, a photo editor, a shared image library for brand assets, custom font uploads, dark mode preview, and a library of pre-designed starter templates covering common newsletter, announcement, and transactional layouts. Reusable components (blocks, themes, templates) are first-class. Designers build a brand system once and reuse it across campaigns, transactional, and triggered emails. Cross-client rendering covers Gmail, Outlook, Apple Mail, and mobile. The Dynamic Image block pairs with [data feeds](https://bluefox.email/docs/projects/data-feeds) to render images sourced from RSS/JSON at send time.

**Strengths:** reusable design system with block-level reuse, built-in stock photo gallery and photo editor, data-feed-driven dynamic content, cross-client rendering, same editor for transactional and marketing.

**Trade-offs:** no AI content generation, no AI-driven dynamic content beyond data feeds. (Heat-map click visualization is an analytics feature; covered in the Analytics section below.)

<TemplateShowcase
  :is-dark="isDark"
  :lg-and-up="lgAndUp"
  :md="md"
  :sm="sm"
  :xs="xs"
/>

## Integrations

### Brevo

Brevo provides official SDKs for **PHP, Python, Node.js, Ruby, Go, Java, and C#** for both the marketing and transactional APIs. SMTP relay handles language-agnostic sends. Native plugins exist for WordPress, WooCommerce, Magento, Firebase, Supabase, and other common platforms. Marketplace connectors and Zapier extend connectivity. Webhooks support up to **40 endpoints per account** for real-time events: delivered, opened, clicked, bounced, marked spam, unsubscribed, blocked, deferred. Marketing and transactional sends flow through one account with shared contact management, domain authentication, and billing.

**Strengths:** seven first-party SDKs, mature SMTP relay, native plugins for popular CMSes and e-commerce platforms, 40 webhook endpoints per account, unified account for marketing + transactional + CRM, EU data residency.

**Trade-offs:** marketing and transactional share infrastructure, so marketing sender-reputation issues can affect transactional deliverability. Some integrations are tied to higher tiers. API documentation, while comprehensive, has been described as harder to navigate than newer developer-first competitors.

### BlueFox Email

BlueFox Email exposes an [API](https://bluefox.email/docs/api/) for contacts, subscriptions, transactional sends, and triggered sends. [Webhooks](https://bluefox.email/docs/integrations/webhooks) push real-time events: opens, clicks, bounces, complaints, subscribe, unsubscribe, pause, resubscribe. Direct integrations: [Supabase](https://bluefox.email/docs/integrations/supabase) for auth emails (signup confirmation, magic links, password reset, invitations) and [Zapier](https://bluefox.email/docs/integrations/zapier) with six triggers (New Contact, Contact Updated, Contact Deleted, New Subscription, Unsubscribed, Subscription Paused). In BYO SES mode, you keep direct AWS access for any SES-level integration including SNS, Lambda, S3, and CloudWatch.

**Strengths:** complete API on every plan, full webhook event set on every plan, Supabase-native auth email path, Zapier connectivity, BYO SES mode gives direct AWS integration without abstraction.

**Trade-offs:** small native marketplace (Supabase + Zapier are the main first-party integrations), no language-specific SDKs (REST API only), no native e-commerce platform plugins, no native CRM connector.

![bluefox docs collage](/assets/comparisons/bluefox-docs-collage.webp)

## Automation

### Brevo

Brevo's marketing automation supports visual workflow building with triggers based on sign-ups, page visits, purchases, custom events, segment entry, and contact-property changes. Standard plan and above include **unlimited automation contacts**; the Starter plan caps automation at 2,000 contacts. Pre-built journey templates cover welcome series, abandoned cart, browse abandonment, anniversary emails, and re-engagement. A/B testing, send-time optimization, advanced analytics, and frequency capping are available on Standard and above. Brevo runs two automation editors (a **classic** version and a **new** version) with frequency cap and email overload prevention operating differently between the two; users moving between versions report some configuration friction.

**Strengths:** unlimited automation contacts on Standard ($18/mo) and above, pre-built journey templates, A/B testing in flows, send-time optimization, frequency capping, predictive send-time on machine learning.

**Trade-offs:** Starter plan caps automation at 2,000 contacts. Automation is not available on the Free plan beyond very basic flows. The split between classic and new editor can create confusion. User reports of automations occasionally not triggering reliably appear across community forums, though this isn't unique to Brevo.

### BlueFox Email

BlueFox Email's [automation builder](https://bluefox.email/docs/projects/automations) is available on every plan including the free tier. Trigger types: **Contact Added**, **Contact Updated** (with from/to property conditions), **Enter Segment**, **Leave Segment**. Node types: **Send Email**, **Notify** (send to a list or specific addresses rather than the flowing contact), **Timer**, **Audience Filter** (property, segment, or email activity), **Branching** with **Condition** nodes (multi-path), **Set Value** (update a contact property mid-flow), **Manage Tags** (add/remove tags), **Complete** (defined exit). **Exit Criteria** lets contacts leave the flow early based on property, segment, or email activity. **Running flows can be edited** and the updates applied to upcoming-only or upcoming-and-in-progress contacts.

**Strengths:** all automation features on every plan including the free tier, no contact cap on automation, segment-based triggers, mid-flow contact property updates, email-activity-based branching, live editing of running flows.

**Trade-offs:** no A/B testing inside automation flows, no machine-learning send-time optimization, fewer pre-built journey templates than Brevo's catalog, no native e-commerce triggers (no abandoned cart, no purchase events). Those have to be wired via the API or Zapier.

![bluefox automation collage](/assets/comparisons/email-automation-collage.webp)

## Deliverability and Infrastructure

### Brevo

Brevo runs on shared IP infrastructure by default. The company partners with major mailbox providers and provides automatic SPF/DKIM/DMARC configuration with step-by-step DNS setup, helping meet Gmail and Yahoo bulk sender requirements. **Dedicated IPs** are available as an add-on at **$251/year** on the Professional plan, and one dedicated IP is included by default with the Enterprise plan.

**Deliverability data:** independent testing by EmailToolTester (one of the longest-running third-party deliverability trackers) shows Brevo's measured inbox placement at **89.1% as of February 2025**, with historical figures ranging from 84% in 2017 to 2018, peaking at 96.3% in March 2021, dipping to roughly 68% in mid-2023, and recovering since. EmailDeliverabilityReport, which began tracking Brevo in October 2025, currently scores it 92/100. Brevo's own published benchmark shows a 20.73% average open rate across their network for 2025. Inbox placement depends heavily on sender reputation, list quality, authentication setup, and content. Brevo's number is not a constant, and the same is true for every shared-IP platform.

Brevo monitors campaigns sent through shared IPs and can pause sends or suspend accounts that exceed engagement thresholds. The pattern that recurs in third-party reviews is unexpected suspensions following imports of older or under-engaged lists, often before a user has the chance to clean addresses. Brevo's stated rationale is that security algorithms automatically flag accounts whose campaign metrics fall outside acceptable ranges, with the deliverability team conducting follow-up review. This account-monitoring approach is common across shared-IP ESPs (SendGrid, Mailchimp, Postmark, and others have similar policies); the specific complaint with Brevo is the strictness of the thresholds and the limited communication during suspension reviews.

**Strengths:** automatic SPF/DKIM/DMARC setup, Gmail/Yahoo sender requirements coverage, dedicated IPs available, EU data residency, claimed throughput up to 120,000 emails/minute, B Corp certification.

**Trade-offs:** shared-IP reputation depends on platform-wide sender behavior. Deliverability has shown volatility historically (the 2023 dip is well-documented). Marketing and transactional sends share infrastructure, so marketing reputation issues can affect transactional delivery, and transactional delivery speed (typically 5 to 15 seconds) is slower than dedicated transactional providers. Dedicated IP is gated to Professional ($499/mo) and Enterprise. Account suspensions following imports of older lists are a recurring complaint in reviews.

### BlueFox Email

BlueFox Email has three delivery modes documented in [Delivery Modes](https://bluefox.email/docs/projects/delivery-modes):

- **Sandbox** (default for new projects, BlueFox-managed infrastructure): up to 5 verified addresses, 100 emails/day, 1 email/second. No AWS account required. Sends from `no-reply@bluefoxemailsandbox.com`.
- **Production** (BlueFox-managed infrastructure, after a review): unrestricted volume, custom sender identities, your own verified domain.
- **BYO AWS SES** (optional): connect your AWS account via direct credentials or STS Role ARN. Required permissions: `ses:SendEmail`, `ses:SendRawEmail`, `ses:ListIdentities`, `ses:GetSendQuota`. You keep your own AWS sending reputation and IP isolation, and can use an AWS SES dedicated IP if configured there.

To stay in production, projects must maintain bounce rate below 2.5% and complaint rate below 0.05%, shown live in the project dashboard. A per-project **suppression list** lets teams manually add or CSV-import problematic addresses to prevent re-sending. The platform also supports one-click unsubscribe (RFC-8058), a subscription preferences page, and a pause-instead-of-unsubscribe link.

**Strengths:** managed-mode + BYO-SES choice on the same product, your-domain sending, optional dedicated IP add-on on the managed plan ($50/mo per workspace), transparent bounce/complaint thresholds visible in-product, per-project suppression list, STS-based AWS auth (no long-lived keys), one-click unsubscribe and preferences page built in, BYO SES gives complete reputation isolation, EU data residency and GDPR compliance.

**Trade-offs:** Smaller community than Brevo, so less third-party deliverability tooling and shared best-practice content.

## Personalization

### Brevo

Brevo supports personalization through variables (subscriber attributes) and Handlebars-style template syntax for conditional logic and dynamic content. Custom contact attributes can be defined and populated via the API or signup forms. The transactional API supports template variables passed at send time. Dynamic content blocks vary by segment; AI-powered dynamic content (product recommendations, behavior-based copy) is available on higher tiers. The Aura AI agent can generate personalized variations directly inside the email editor.

**Strengths:** Handlebars-style template syntax, custom contact attributes, dynamic content blocks, AI-powered dynamic content and copy generation on higher tiers, separate template variable injection for transactional sends.

**Trade-offs:** advanced personalization scenarios sometimes require working in the HTML view rather than the visual editor. AI segmentation (natural-language segment building) is Enterprise-only. The interface for managing complex conditional content can be hard to navigate.

### BlueFox Email

BlueFox Email also uses **Handlebars** for personalization: <span v-pre>`{{firstName}}`</span> for fields and <span v-pre>`{{#if}}…{{else}}…{{/if}}`</span> for conditional content. Built-in merge tags include `subscriber.name`, `subscriber.email`, `unsubscribeLink`, `pauseSubscriptionLink`, and `verifyLink` (for double opt-in flows). Contact attributes beyond name/email are defined in **Project Settings → Contact Attributes** and can be set or updated programmatically via the [API](https://bluefox.email/docs/api/) or from inside an automation flow (Set Value node). Personalization is available on every plan including the free tier.

**Strengths:** standard Handlebars syntax familiar to developers, conditional blocks at every plan level, contact attributes update-able via API or in-flow Set Value node, built-in `pauseSubscriptionLink` enables a pause-instead-of-unsubscribe path, dynamic image rendering via data feeds.

**Trade-offs:** no AI content generation or AI-driven dynamic content, no pre-built e-commerce product merges (must be passed in via the API), no geographic or timezone tags out of the box, fewer Handlebars helpers than some enterprise platforms.

## Segmentation

### Brevo

Brevo segments contacts based on attribute values, list membership, engagement history (opens, clicks, recent activity), website behavior (via web tracking on Standard and above), and e-commerce events when connected. Segments are dynamic and update as contact data changes. Stackable AND/OR criteria support complex audience logic. **AI segmentation** (natural-language segment building, launched December 2024) is currently Enterprise-only: users describe the segment they want in plain language and the AI translates it to filter rules.

**Strengths:** dynamic segment updates, stackable AND/OR criteria, web-tracking-based behavioral segments (Standard+), AI natural-language segmentation (Enterprise).

**Trade-offs:** web tracking and behavior-based segmentation require Standard tier or higher. AI segmentation is Enterprise-only, which is a major gate for what's marketed as an AI-first feature. Complex segments can be hard to debug when criteria conflict.

### BlueFox Email

BlueFox Email's [segments](https://bluefox.email/docs/projects/segments) use AND/OR condition logic with ten operators: equals, does not equal, contains, does not contain, is empty, is not empty, greater than, less than, greater than or equal, less than or equal. Filters apply to any contact property or tag, plus **engagement-based** conditions (received, not received, opened, not opened, clicked, not clicked) over a configurable day window. Segments can be scoped to a single subscriber list or to all contacts in the project, and can drive both campaign delivery and automation triggers (Enter Segment / Leave Segment).

**Strengths:** unlimited condition count on every plan, engagement-based segments at every plan level, segments usable as automation triggers, segment-scoping to list or whole project, no plan-based feature gates.

**Trade-offs:** one pre-built segment (unengaged contacts) versus Brevo's broader template options, no predictive or AI segmentation, no built-in e-commerce filters (no "purchased product X" out of the box; those need contact attributes set via API), no native website tracking for behavioral segments.

<Segmentation
  :is-dark="isDark"
  :lg-and-up="lgAndUp"
  :md="md"
  :sm="sm"
  :xs="xs"
/>

## Analytics and Reporting

### Brevo

Brevo tracks deliveries, opens, unique opens, clicks, unique clicks, bounces, blocks, spam reports, and unsubscribes across campaigns and transactional sends. **Heat maps** show click distribution within emails. Real-time event tracking via webhooks supports up to 40 endpoints per account. Higher tiers (Standard and above) add advanced statistics, deliverability insights, and click-by-engagement breakdowns. E-commerce revenue tracking is available when connected stores share order data. Marketing and transactional analytics are reported separately within the same account.

**Strengths:** heat-map click visualization, comparative deliverability insights on higher tiers, e-commerce revenue tracking on connected stores, real-time webhooks (40 endpoints), unified reporting for marketing and transactional within one account.

**Trade-offs:** advanced statistics require Standard tier or higher. Data retention is limited on lower tiers; long-window analysis can require external storage. Reports are spread across separate marketing/transactional/CRM dashboards. No live sender-reputation or inbox-placement scoring inside the product.

### BlueFox Email

BlueFox Email scopes [analytics](https://bluefox.email/docs/analytics) at account, project, campaign, transactional email, triggered email, and subscriber list levels. Per email: sends, opens, unique opens, clicks, unique clicks, bounces, complaints, unsubscribes, resubscriptions, paused subscriptions. Time-range filters cover current/previous week, current/previous month, last 3 months, and overall. Project-level dashboard shows live bounce rate (against the 2.5% ceiling) and complaint rate (against the 0.05% ceiling). Automation cards expose Runs, Active, Sends, Opens, Clicks for the whole flow plus per-Send-Email-node breakdowns. Webhooks push every event in real time for external dashboards.

**Strengths:** live bounce/complaint ratios against the production thresholds, per-email-type and per-automation-node stats, real-time webhook push for external analytics, full event set on every plan, no retention add-on required.

**Trade-offs:** no revenue or ROI tracking, no breakdowns by mailbox provider or device, no industry benchmarking data. Per-URL click counts are shown in the data table, but there's no visual heat-map overlay.

<div class="home-analytics">
<AgencyAnalytics
  title="Analytics that show what happened"
  description="Delivery, opens, clicks, bounces, and subscription trends. Switch between hourly, daily, weekly, and monthly views."
  default-tab="hourly"
/>
</div>

## Support and Learning Resources

### Brevo

Brevo offers email support on Starter and above, chat support on Standard and above, and phone support on Professional and Enterprise. Enterprise plans add a dedicated Customer Success Manager and three hours per year of deliverability specialist support. The knowledge base covers common workflows and integrations in six languages: English, Spanish, French, Italian, Portuguese, and German. Brevo also runs an active community and partner network.

**Strengths:** multi-language documentation (six languages), multi-channel support on higher tiers, dedicated CSM on Enterprise, deliverability specialist hours on Professional and Enterprise, established community.

**Trade-offs:** the Free plan has no live support: documentation and community only. Phone support is Professional+ ($499/mo entry). Support response quality during account-status disputes (particularly suspensions) is a recurring complaint on Trustpilot and other review sites. The pattern that surfaces most is delays in support response and difficulty reaching a human during critical account events.

### BlueFox Email

BlueFox Email provides email support across all plan tiers. Users can also book a direct call with the founder from inside the product for hands-on help, onboarding, technical setup, or use-case fit. Self-service resources include the [product documentation](https://bluefox.email/docs/), a glossary, comparison articles, and a smaller set of blog posts and guides. There is no formal learning platform, no certified-partner program, and no agency directory.

**Strengths:** same support tier for free and paid users, in-product founder call booking for direct help, direct line to the people who build the product.

**Trade-offs:** small team; this level of direct access is a function of company stage, not a permanent commitment. No 24/7 desk, no phone hotline, no live-chat. Documentation is English-only. No formal training platform. Knowledge base, community forums, and third-party tutorial coverage are all smaller than Brevo's.

## Pricing

The two platforms price on different axes, which makes head-to-head comparison sensitive to the scenario.

### Brevo (volume-based)

Brevo charges by emails sent per month, not by contact count. In October 2025, Brevo restructured its plans into five tiers (Free, Starter, Standard, Professional, Enterprise), replacing the previous "Business" tier with "Standard" and adding a new "Professional" tier between Standard and Enterprise. All paid plans offer a 10% discount when billed annually.

| Plan | Starting price | Volume | Notes |
| --- | --- | --- | --- |
| Free | $0 | 300 emails/day (~9,000/mo) | Up to 100,000 contacts. Aura AI, basic automation, basic CRM included. |
| Starter | $9/mo (5K) to $69/mo (100K) | 5,000 to 100,000/mo | Removes daily cap. Automation capped at 2,000 contacts. Brevo logo removal is a $9/mo add-on. Contact caps: 500 / 1,500 / unlimited. |
| Standard | $18/mo (5K) to $169/mo (150K) | 5,000 to 150,000/mo | Unlimited automation contacts, A/B testing, landing pages (1 included), advanced statistics, send-time optimization, frequency capping. |
| Professional | from $499/mo | 150,000+/mo | WhatsApp, mobile/web push, AI segmentation, dedicated analytics studio, 10 user seats, phone support, deliverability specialist (3 hrs/yr). Dedicated IP add-on $251/yr. |
| Enterprise | Custom, from ~$10,000/yr | 350,000+/mo | Unlimited contacts, sub-accounts, SLA, SSO/SAML, dedicated CSM, 1 dedicated IP included. |

**Add-ons**: Dedicated IP $251/year (Professional add-on, included in Enterprise). Brevo logo removal $9/mo on Starter. Extra landing pages ~$24/mo per 5-page pack on Standard. Extra Standard seats $10.80/mo each. SMS pay-as-you-go (~$1.09/100 in US, country-specific rates). Conversations live chat $15/mo/user. Sales CRM free tier or $12+/mo/user for advanced features.

### BlueFox Email (per-send)

BlueFox Email charges per email sent. Contacts are unlimited, all features are available at every tier, and packs do not expire monthly; credits roll for 12 months.

| Mode | Free tier | Essential | Premium | Grown-up |
| --- | --- | --- | --- | --- |
| Standard (managed infrastructure) | 3,000 sends/mo | $50 / 50,000 sends | $300 / 500,000 sends | $2,500 / 5,000,000 sends |
| BYO AWS SES | 6,000 sends/mo | $50 / 100,000 sends + AWS fees | $300 / 1,000,000 sends + AWS fees | $2,500 / 10,000,000 sends + AWS fees |

AWS SES costs in BYO mode: ~$0.10 per 1,000 emails, billed directly by AWS. Combine with the AWS Free Tier (3,000 free sends/month for the first 12 months) at small volume. Packs are stackable.

### Scenarios

The right pricing model depends on the ratio of contacts to sends and whether you need multi-channel marketing alongside email.

**Tiny test sending** (under 9,000 emails/month):

- Brevo Free: covers it at $0.
- BlueFox Standard Free: covers it at $0 (3,000/mo cap).
- BYO SES Free: covers it at $0 (6,000/mo cap).

Brevo's free tier is the most generous at small monthly volumes (9,000/mo) but caps daily sends at 300, which can be limiting for newsletter pushes.

**Small newsletter** (5,000 contacts × 4 sends/month = 20,000 sends/month, automation needed):

- Brevo Standard 20K: $65/mo. Includes A/B testing, landing page, advanced stats.
- Brevo Starter 20K: $29/mo, but automation is capped at 2,000 contacts (not enough for this list).
- BlueFox Standard Essential: 20K of a $50 / 50K pack = ~$20/mo equivalent.
- BYO SES Essential: 20K of a $50 / 100K pack = ~$10/mo platform + ~$2 AWS = ~$12/mo.

**Mid-size marketing list** (10,000 contacts × 5 sends each = 50,000 sends/month, automation + segmentation needed):

- Brevo Standard 60K: $89/mo (closest tier that fits).
- BlueFox Standard Essential: $50/mo (50K pack covers it exactly).
- BYO SES Essential: 50K of a $50 / 100K pack = ~$25/mo platform + ~$5 AWS = ~$30/mo.

**Transactional-heavy SaaS** (5,000 users × 8 emails each per month = 40,000 sends/month, no marketing needed):

- Brevo Starter 40K: $39/mo (transactional flows through the same tier).
- BlueFox Standard Essential: 40K of a $50 / 50K pack = ~$40/mo equivalent.
- BYO SES Essential: 40K of a $50 / 100K pack = ~$20/mo platform + ~$4 AWS = ~$24/mo.

**Large list, infrequent broadcast** (50,000 contacts × 1 send each per month = 50,000 sends/month):

- Brevo Standard 60K: $89/mo.
- BlueFox Standard Essential: $50/mo.
- BYO SES Essential: 50K of a $50 / 100K pack = ~$25/mo platform + ~$5 AWS = ~$30/mo.

**High-volume sender** (1,000,000 sends/month):

- Brevo Standard at this volume scales to roughly $669/mo (at the published 100K Standard rate of $129, extrapolated to 1M is approximately the tier ceiling); Professional ($499 entry) covers the volume but for full WhatsApp/push/AI features. Combined cost is plan-dependent.
- BlueFox Standard: 2 Premium packs at $300 each = $600/mo equivalent.
- BYO SES Premium: $300 platform + ~$100 AWS = ~$400/mo.

**Cost summary:** For mid-volume sending where multi-channel marketing isn't needed, BlueFox Email's pack pricing and BYO SES option are typically cheaper than Brevo's equivalent Standard tier, sometimes substantially so at higher volumes. Brevo is competitive (and sometimes cheaper) at small monthly volumes within the free tier, and remains the value choice when SMS, WhatsApp, push, live chat, or sales CRM are part of the same use case. Both bill by send volume rather than contact count (unlike Mailchimp or Klaviyo), so both handle large lists with low send frequency well; at equal volume BlueFox's per-send packs are typically the cheaper of the two.

**Where Brevo makes sense despite the higher price at scale:**
- You also need SMS, WhatsApp, web/mobile push, live chat, or a sales CRM, and would otherwise pay for those as separate tools.
- You specifically want a B Corp-certified, French-incorporated vendor. (Both platforms keep data in the EU and are GDPR compliant, so EU residency alone doesn't separate them.)
- You want AI-driven content generation (Aura), AI dynamic content, or AI segmentation (Enterprise) without integrating third-party tools.
- You need first-party SDKs across seven languages rather than rolling against a REST API.
- You want a single vendor for multi-channel marketing automation plus a built-in CRM.

**Where BlueFox Email is the clear choice:**
- Mid-to-high-volume email sending where per-send pricing beats Brevo's volume tiers.
- Large contact lists with infrequent campaigns: per-send packs (valid 12 months) cost less than Brevo at the same send volume.
- Email-focused workflows where SMS, WhatsApp, push, CRM, and landing pages are handled elsewhere (or not needed).
- You want automation, segmentation, and analytics on the free tier with no contact cap or tier-gating.
- You want to bring your own AWS SES and keep your own sending reputation.
- You need to edit live automations in place rather than work across two editor versions.
- You need per-project suppression-list visibility and bounce/complaint thresholds shown in-product.
- You want a single product covering transactional, triggered, and marketing emails with one bill.

**Notes on both:**
- Brevo pricing shifts with monthly volume and adds overage charges. Verify against the current Brevo pricing page.
- BlueFox prices are public and flat per-pack. AWS SES fees in BYO mode are billed by AWS.
- Both platforms have evolved pricing in the past year. Brevo restructured in October 2025; BlueFox introduced the Grown-up pack and BYO-SES pricing track.

## Which Fits Your Use Case

Pick by what you actually need.

| If you need…                                                                       | Likely better fit       |
| ---------------------------------------------------------------------------------- | ----------------------- |
| Email + SMS + WhatsApp + push + live chat + CRM under one subscription             | Brevo                   |
| B Corp certification                                                               | Brevo                   |
| EU data residency and GDPR compliance                                              | Both                    |
| AI content generation (Aura) and AI dynamic content                                | Brevo                   |
| AI natural-language segmentation                                                   | Brevo (Enterprise)      |
| Large contact list with infrequent campaigns (both price by send; BlueFox cheaper) | BlueFox Email           |
| First-party SDKs in seven languages with mature SMTP relay                         | Brevo                   |
| Built-in sales CRM alongside email marketing                                       | Brevo                   |
| Heat-map click analytics and predictive send-time                                  | Brevo (Standard+)       |
| Phone support on paid plans                                                        | Brevo (Professional+)   |
| Mid-to-high-volume sending with predictable per-send costs                         | BlueFox Email           |
| All features (automation, segmentation, analytics) on the free tier                | BlueFox Email           |
| Bring-your-own AWS SES with STS Role ARN                                           | BlueFox Email           |
| Live editing of running automations without disable/duplicate                      | BlueFox Email           |
| Single product covering transactional, triggered, and marketing                    | BlueFox Email           |
| Suppression-list visibility and bounce/complaint thresholds in-product             | BlueFox Email           |
| One-click unsubscribe (RFC-8058), preferences page, pause-instead-of-unsubscribe   | BlueFox Email           |
| Live RSS/JSON content inside emails (data feeds)                                   | BlueFox Email           |

Both platforms can send email at scale. The decision usually comes down to whether you want Brevo's multi-channel customer engagement suite with built-in AI and CRM, or BlueFox Email's focused single-product email platform with per-send pricing and a managed-or-BYO SES delivery choice.

<GlossaryCTA/>