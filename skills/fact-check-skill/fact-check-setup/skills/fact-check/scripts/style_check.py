#!/usr/bin/env python3
"""
Mechanical style check for BlueFox editorial standards.
Usage: python3 style_check.py <path-to-draft.md>

Checks for:
  - em dashes
  - title-case headers (should be sentence case)
  - "solo founder" phrasing
  - defensive/overreaching phrases

This is deliberately dumb and fast: it flags candidates for a human (or
Claude) to review, it doesn't auto-fix anything. See references/editorial-standards.md
for the reasoning behind each rule.
"""

import re
import sys

OVERREACHING_PHRASES = [
    "we guarantee",
    "no other provider",
    "impossible to beat",
    "the only tool that",
    "the only platform that",
    "unlike every other",
    "best in the world",
    "never fails",
    "100% guaranteed",
]

# Common acronyms/proper nouns that are allowed to stay capitalized in
# an otherwise-sentence-case header. Extend as needed.
ALLOWED_CAPS = {
    "BlueFox", "DMARC", "SPF", "DKIM", "SES", "SDK", "API", "RFC",
    "Chamaileon", "VitePress", "Mailchimp", "SendGrid", "Brevo",
    "MailerLite", "MailerSend", "Loops", "Resend", "Constant Contact",
    "AWS", "URL", "HTML", "CSS", "JSON",
}

# Multi-word proper nouns. Checked as whole phrases before the per-word
# ALLOWED_CAPS check, since a plain word-split can't match "BlueFox Email"
# against a single-token allowlist entry. Sorted longest-first so a phrase
# like "Constant Contact" is consumed before any single-word overlap.
ALLOWED_PHRASES = sorted(
    {"BlueFox Email", "Constant Contact"},
    key=len,
    reverse=True,
)

# Structural markdown that contains "--" but isn't prose: YAML frontmatter
# fences (---) and Markdown table separator rows (| --- | --- |).
_FRONTMATTER_FENCE_RE = re.compile(r"^-{3,}$")
_TABLE_SEPARATOR_RE = re.compile(r"^\|?[\s:|-]+\|?$")


def _is_structural_dashes(stripped_line):
    return bool(
        _FRONTMATTER_FENCE_RE.match(stripped_line)
        or (_TABLE_SEPARATOR_RE.match(stripped_line) and "-" in stripped_line)
    )


def check_em_dashes(lines):
    hits = []
    for i, line in enumerate(lines, 1):
        stripped = line.strip()
        if "\u2014" in line:
            hits.append((i, stripped))
        elif "--" in line and not _is_structural_dashes(stripped):
            hits.append((i, stripped))
    return hits


def check_headers(lines):
    hits = []
    header_re = re.compile(r"^#{1,6}\s+(.*)")
    for i, line in enumerate(lines, 1):
        m = header_re.match(line)
        if not m:
            continue
        text = m.group(1).strip()
        words = text.split()
        if len(words) < 2:
            continue

        # Join known multi-word proper nouns into single tokens first (e.g.
        # "BlueFox" + "Email" -> "BlueFox_Email") so a two-word product name
        # doesn't get evaluated as two separately-flaggable words, and so
        # word positions (first word vs. rest) stay meaningful.
        joined_text = text
        for phrase in ALLOWED_PHRASES:
            joined_text = joined_text.replace(phrase, phrase.replace(" ", "_"))
        joined_words = joined_text.split()

        rest = joined_words[1:]
        cap_words = [
            w for w in rest
            if w[:1].isupper()
            and w.replace("_", " ") not in ALLOWED_PHRASES
            and w not in ALLOWED_CAPS
            and w.strip(",:") not in ALLOWED_CAPS
        ]
        # crude heuristic: if more than half the non-first words are capitalized
        # and aren't in the allow-list, it's probably title case
        if len(cap_words) >= max(1, len(rest) // 2 + 1):
            hits.append((i, text))
    return hits


def check_solo_founder(lines):
    hits = []
    pattern = re.compile(r"\bsolo\s+founder\b|\bfounded\s+alone\b|\bone[- ]man\s+(team|show|shop)\b", re.I)
    for i, line in enumerate(lines, 1):
        if pattern.search(line):
            hits.append((i, line.strip()))
    return hits


def check_overreaching(lines):
    hits = []
    for i, line in enumerate(lines, 1):
        low = line.lower()
        for phrase in OVERREACHING_PHRASES:
            if phrase in low:
                hits.append((i, phrase, line.strip()))
    return hits


def main():
    if len(sys.argv) != 2:
        print("Usage: python3 style_check.py <path-to-draft.md>")
        sys.exit(1)

    path = sys.argv[1]
    with open(path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    em_dashes = check_em_dashes(lines)
    headers = check_headers(lines)
    solo = check_solo_founder(lines)
    overreach = check_overreaching(lines)

    print(f"Style check: {path}\n")

    print(f"Em dashes ({len(em_dashes)}):")
    for i, text in em_dashes:
        print(f"  line {i}: {text}")
    print()

    print(f"Title-case headers, should be sentence case ({len(headers)}):")
    for i, text in headers:
        print(f"  line {i}: {text}")
    print()

    print(f"'Solo founder' phrasing ({len(solo)}):")
    for i, text in solo:
        print(f"  line {i}: {text}")
    print()

    print(f"Defensive/overreaching phrases ({len(overreach)}):")
    for i, phrase, text in overreach:
        print(f"  line {i} [{phrase}]: {text}")
    print()

    total = len(em_dashes) + len(headers) + len(solo) + len(overreach)
    print(f"Total flags: {total}")


if __name__ == "__main__":
    main()
