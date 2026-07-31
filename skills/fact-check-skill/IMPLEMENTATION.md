# Implementing fact-check skill in this repo

Repo has `.claude/` dir at root. No skills/commands wired up yet before this. `fact-check-skill/` at repo root stays as-is (source copy for coworkers to review); files get **copied**, not moved, into `.claude/` for local testing.

## Status

Done, copies already live at:
```
.claude/commands/fact-check.md
.claude/skills/fact-check/SKILL.md
.claude/skills/fact-check/references/editorial-standards.md
.claude/skills/fact-check/scripts/style_check.py
```
`fact-check-skill/fact-check-setup/` untouched, keep for sharing.

## Steps (for reference / re-running elsewhere)

1. Create target dirs:
   ```
   mkdir -p .claude/skills/fact-check/references
   mkdir -p .claude/skills/fact-check/scripts
   mkdir -p .claude/commands
   ```

2. Copy files from `fact-check-skill/fact-check-setup/` into place:
   ```
   cp fact-check-skill/fact-check-setup/commands/fact-check.md .claude/commands/fact-check.md
   cp fact-check-skill/fact-check-setup/skills/fact-check/SKILL.md .claude/skills/fact-check/SKILL.md
   cp fact-check-skill/fact-check-setup/skills/fact-check/references/editorial-standards.md .claude/skills/fact-check/references/editorial-standards.md
   cp fact-check-skill/fact-check-setup/skills/fact-check/scripts/style_check.py .claude/skills/fact-check/scripts/style_check.py
   ```

3. Make script executable (optional, matches shebang):
   ```
   chmod +x .claude/skills/fact-check/scripts/style_check.py
   ```

4. Verify `python3` on PATH, no extra deps needed, `style_check.py` uses only stdlib (`re`, `sys`).

5. Restart Claude Code session (or reload) so skill/command registry picks up new `.claude/skills/fact-check` and `.claude/commands/fact-check.md`.

6. Test:
   - `/fact-check path/to/draft.md` should trigger skill.
   - Or ask directly: "can you fact-check this draft before I send it to Gyula" — SKILL.md description has trigger phrases matching this.

## Notes

- Skill relies on Grep/Glob (codebase/docs/pricing config) and WebFetch (competitor sites) and Task tool (subagent split for multi-competitor pieces). No extra permission config needed beyond what's already granted to Claude Code in this project.
- `references/editorial-standards.md` is loaded by Claude only when a style flag needs explaining, not on every run, keep as-is.
- If repo later adds a `.claude/settings.json`, no fact-check-specific entries needed, skill/command discovery is directory-based only.
