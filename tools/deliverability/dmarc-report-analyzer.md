---
title: Free DMARC Report Analyzer | Parse DMARC Aggregate Reports 
description: Free online DMARC report analyzer tool to parse and analyze DMARC aggregate reports, identify authentication failures, and improve email security posture.
thumbnail: /assets/free-deliverability-tools.png
sidebar: false
layout: post
category: tools

datePublished: "2025-08-01"
dateModified: "2025-08-01"

keywords:
  - DMARC report analyzer
  - DMARC aggregate reports
  - DMARC report parser
  - email authentication analysis
  - DMARC insights
  - email security posture
  - authentication failures
  - DMARC reporting
  - free tool
  - email deliverability
  - domain security
  - DMARC analytics
  - email forensics
  - security analysis

faqs:
  - question: "Where do I get a DMARC aggregate report to analyze?"
    answer: "Your domain needs a rua address configured in its DMARC record. Mailbox providers (Google, Microsoft, Yahoo, and others) then email aggregate reports to that address, typically daily, as compressed XML attachments."
  - question: "Why does a source show as \"unaligned pass\" instead of just \"pass\"?"
    answer: "It means the message passed SPF or DKIM against a domain other than the one in the visible From address, often a forwarder or third-party sender using its own authentication. DMARC doesn't count this as a full pass because the visible sender still isn't verified."
  - question: "An unfamiliar IP is sending mail from my domain. Is that a problem?"
    answer: "Check the recommendations panel first, some flagged sources turn out to be legitimate forwarding services rather than spoofing. If a source is unrecognized and unaligned, it's worth investigating, since that's exactly the pattern DMARC reporting is designed to surface."
  - question: "Can I upload multiple reports at once?"
    answer: "No, the tool analyzes one report at a time. Providers typically send a separate report per day, so review them individually or use a dedicated DMARC monitoring service if you need aggregated trends across many reports."

head:
  - - meta
    - name: description
      content: Free online DMARC report analyzer tool to parse and analyze DMARC aggregate reports, identify authentication failures, and improve email security posture.
  - - meta
    - property: og:title
      content: Free DMARC Report Analyzer | Parse DMARC Aggregate Reports | BlueFox Email
  - - meta
    - property: og:description
      content: Free online DMARC report analyzer tool to parse and analyze DMARC aggregate reports, identify authentication failures, and improve email security posture.
  - - meta
    - property: og:image
      content: https://bluefox.email/assets/free-deliverability-tools.png
  - - meta
    - property: og:url
      content: https://bluefox.email/tools/deliverability/dmarc-report-analyzer
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: Free DMARC Report Analyzer | Parse DMARC Aggregate Reports | BlueFox Email
  - - meta
    - name: twitter:description
      content: Free online DMARC report analyzer tool to parse and analyze DMARC aggregate reports, identify authentication failures, and improve email security posture.
  - - meta
    - name: twitter:image
      content: https://bluefox.email/assets/free-deliverability-tools.png
---

<GlossaryNavigation link="/tools/deliverability" label="Back to deliverability Tools" />

<script setup>
import DmarcReportAnalyzer from '../../.vitepress/theme/free-tools/DmarcReportAnalyzer.vue'
</script>

# Free DMARC Report Analyzer

**Parse and analyze [DMARC](/email-sending-concepts/dmarc) aggregate reports** to gain deep insights into your email authentication performance and security posture.

<DmarcReportAnalyzer />

## What This Tool Checks

Paste or upload a DMARC aggregate report (the XML file mailbox providers send to your `rua` address), and the analyzer breaks it down into:

- Every sending source (IP address), how many messages it sent, and its disposition (none, quarantine, or reject).
- SPF and DKIM alignment per source: aligned, not aligned, or mixed.
- Authentication outcome per source, distinguishing an aligned pass from an unaligned pass or an outright failure.
- Warnings for things like DKIM selector mismatches, and recommendations such as sources that appear to be legitimate forwarders rather than spoofing attempts.

## How to Use It

1. Open the aggregate report XML file your mailbox provider sent (these usually arrive as email attachments).
2. Either drag and drop the `.xml` file onto the upload area, or paste its raw contents into the text box.
3. Click **Analyze Report** and review each source in the results table.
4. Expand a source row for its full detail, including envelope-from and SPF scope where available.

## A Note on File Format

DMARC aggregate reports are XML, but most providers deliver them compressed, as a `.zip` or `.gz` attachment. This tool accepts plain `.xml` only, so decompress the file first (double-click a `.zip` on most systems, or use `gunzip` for `.gz`) before uploading or pasting its contents.

## Reading the Alignment Columns

"Aligned" means the domain that SPF or DKIM authenticated matches the visible From domain, the core check DMARC performs. "Not aligned" means the message may have passed SPF or DKIM technically, but against a different domain, which DMARC won't credit as a legitimate pass. "Mixed" appears when a single IP sends some aligned and some unaligned mail, common with shared infrastructure or forwarding services.

## Frequently Asked Questions

### Where do I get a DMARC aggregate report to analyze?

Your domain needs a `rua` address configured in its DMARC record. Mailbox providers (Google, Microsoft, Yahoo, and others) then email aggregate reports to that address, typically daily, as compressed XML attachments.

### Why does a source show as "unaligned pass" instead of just "pass"?

It means the message passed SPF or DKIM against a domain other than the one in the visible From address, often a forwarder or third-party sender using its own authentication. DMARC doesn't count this as a full pass because the visible sender still isn't verified.

### An unfamiliar IP is sending mail from my domain. Is that a problem?

Check the recommendations panel first, some flagged sources turn out to be legitimate forwarding services rather than spoofing. If a source is unrecognized and unaligned, it's worth investigating, since that's exactly the pattern DMARC reporting is designed to surface.

### Can I upload multiple reports at once?

No, the tool analyzes one report at a time. Providers typically send a separate report per day, so review them individually or use a dedicated DMARC monitoring service if you need aggregated trends across many reports.

