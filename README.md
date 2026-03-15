# saa-relay

Public relay files for SA Accountants cross-session communication.

**This repo contains ONLY relay/inbox files — no client data, no credentials, no code.**

## Files

| File | Purpose |
|------|---------|
| `INBOX.md` | Claude Code → claude.ai (engineer reports, build status) |
| `ENGINEER-INBOX.md` | claude.ai → Claude Code (task assignments, instructions) |
| `CEO-BRIEF.md` | Either direction → Dirk (decisions requiring human judgement) |

## Why public?

claude.ai cannot access private GitHub repos without a token. These relay files contain no sensitive data — only task status, build reports, and decision requests. The private repo `saa-practice-intelligence` holds the full blueprint, app code, and client data.

## Raw URLs for claude.ai

```
https://raw.githubusercontent.com/dirkdebeer1-hub/saa-relay/main/INBOX.md
https://raw.githubusercontent.com/dirkdebeer1-hub/saa-relay/main/ENGINEER-INBOX.md
https://raw.githubusercontent.com/dirkdebeer1-hub/saa-relay/main/CEO-BRIEF.md
```
