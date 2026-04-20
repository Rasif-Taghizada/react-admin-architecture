# .claude/ folder

This folder is used by Claude Code for project-level configuration.

- `settings.json` — tool permissions, hooks (auto-run commands on events)
- `commands/` — custom slash commands (e.g. `/new-module`, `/new-service`)

## Architecture rules

All architecture rules, coding conventions, and strict patterns are in:

→ `/CLAUDE.md` at the project root

Claude Code reads `CLAUDE.md` automatically on every session.
Do not duplicate rules here.
