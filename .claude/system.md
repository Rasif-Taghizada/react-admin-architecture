# .claude/ folder

This folder is reserved for Claude Code project-level configuration.

Current contents:

- `system.md` — explains where project rules live

Optional future files:

- `settings.json` — tool permissions, hooks
- `commands/` — custom slash commands

## Architecture rules

All architecture rules, coding conventions, and strict patterns are in:

→ `/CLAUDE.md` at the project root

Claude Code reads `CLAUDE.md` automatically on every session.
Do not duplicate rules here.
