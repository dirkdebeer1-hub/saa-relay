# INBOX.md
# claude.ai reads this — Claude Code writes this
# Last updated: 2026-03-16T02:30Z

---

## ENGINEER REPORT — 2026-03-16 (CEO DASHBOARD v5 — PWA + WEB PUSH ✓)

### MILESTONE: Background Push Notifications Working

**CEO Dashboard is now a full PWA with background push notifications — like WhatsApp.**

Dirk confirmed: notifications arrive even with the app closed.

### What was built:

**1. PWA (Progressive Web App):**
- `manifest.json` — installable on Android home screen
- `sw.js` — Service Worker v5: network-first fetch, push handler, notification click opens app
- Dirk installed it on his Samsung S24 — runs full-screen like a native app

**2. Web Push Infrastructure:**
- VAPID keys generated (P-256 ECDSA)
- `push_subscriptions` table in Supabase — stores browser push endpoints
- Dashboard auto-subscribes on load (with notification permission)
- Subscription saved to Supabase for server-side push delivery

**3. Supabase Edge Function `send-push`:**
- Deployed at `https://ofeeugovkunenbiigozr.supabase.co/functions/v1/send-push`
- Accepts `{ title, message }` JSON POST
- Reads all push subscriptions from Supabase
- Signs VAPID JWT, sends to Google FCM push endpoint
- Returns 201 on success
- Also handles Supabase webhook format (`body.record.title`)

**4. How Claude Code sends a push notification:**
```bash
curl -X POST "https://ofeeugovkunenbiigozr.supabase.co/functions/v1/send-push" \
  -H "Content-Type: application/json" \
  -d '{"title":"Session Complete","message":"March payroll processed for AHS"}'
```
Or via Supabase SQL:
```sql
INSERT INTO notifications (type, title, message, is_read, is_dismissed)
VALUES ('info', 'Session Complete', 'Description here', false, false);
```
Note: The SQL insert triggers the in-app poll alert (banner + chime + vibrate). The curl to `send-push` triggers the BACKGROUND push (shows on lock screen even with app closed). **Do both for maximum reliability.**

**5. When to send notifications (confirmed by Dirk):**
- Session ending — "Session complete, here's what was done"
- Needs Dirk's input — a decision, missing info, or approval required
- Something needs attention — error, blocker, deadline, or anomaly
- claude.ai relay — message from claude.ai that needs action
- **Do NOT notify for:** routine progress, successful pushes, intermediate steps

**6. In-app alert channels (when app is open):**
- Red persistent banner — tap to dismiss
- Warm doorbell chime — C-E-G major triad, triangle wave
- Vibration — 300-200-300-200-300ms pattern
- Visual header flash (red/navy)
- Title flash for backgrounded tabs

**7. Files in saa-relay repo:**
- `ceo-dashboard.html` — the full PWA dashboard
- `manifest.json` — PWA manifest (standalone display, navy theme)
- `sw.js` — Service Worker (push handler + network-first)
- `INBOX.md` — this file (relay for claude.ai)
- `SESSION-LOG.md` — timestamped audit trail

**8. Supabase tables:**
- `notifications` — all notifications (polled every 10s by dashboard)
- `recommendations` — approval flow (APPROVE/REJECT/MODIFY buttons)
- `agent_tasks` — tasks from Dirk's phone
- `push_subscriptions` — browser push endpoints for background delivery

**9. Push status indicator:**
- Small text under header shows: "Push: ✅ registered — background alerts ON"
- If it shows "Push: ❌ [error]" — notification permission needs to be re-enabled in Chrome settings

### RLS Policies (all tables allow anon access):
- `notifications` — anon full access ✓
- `recommendations` — anon full access ✓
- `agent_tasks` — anon full access ✓
- `push_subscriptions` — anon full access ✓

### GitHub Pages URL:
https://dirkdebeer1-hub.github.io/saa-relay/ceo-dashboard.html

---

## PRIOR: CEO Dashboard v4 — Alert Channels Confirmed

Root causes found: (1) GitHub Pages caching — Dirk saw old code. (2) Supabase RLS blocking reads — anon key returned 0 rows. Both fixed.

---

## PRIOR: March 2026 Payroll — All Companies Processed

42 companies processed, 181 employees, total gross R2,277,362.31, total EMP201 R261,709.63. AHS verified from actual payslips.

---

## PRIOR: Phase 0 Complete — Full Build System

50 companies loaded via `build_app_data.py`. Dynamic multi-client loader. TY2027 tax engine. CEO Dashboard on Supabase.

---

## PHASE COMPLETION SUMMARY:
```
Phase 0-9: ✅ ALL COMPLETE
Phase 10: Not started — Website management (Dirk said "add to pending list")
Phase 11: ✅ Complete — relay active via saa-relay public repo
```

---

## RELAY STATUS

Public repo: `dirkdebeer1-hub/saa-relay`
Raw URL: https://raw.githubusercontent.com/dirkdebeer1-hub/saa-relay/main/INBOX.md
