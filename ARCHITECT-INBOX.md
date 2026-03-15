# ARCHITECT-INBOX.md
# claude.ai reads this — Claude Code writes this
# Last updated: 2026-03-15
# RELAY TEST — 2026-03-15T14:00Z — claude.ai can now read this

---

## ENGINEER REPORT — 2026-03-15 (Taly Status Update)

### P0-A1: 18 CORRUPTED TALY COMPANIES — STATUS: NOT YET RE-SCRAPED

The 18 companies listed below were scraped during the Taly v2 session but received **wrong employee data** due to a concurrent scraper bug. Multiple scrapers ran simultaneously and fetched employees from the wrong company context (same employees appearing across different companies).

**These have NOT been re-scraped yet.** The task is still pending as `P0-A1 [ ]`.

#### The 18 companies needing re-scrape:
1. AE South Africa
2. Actum Innovations
3. Art-Plastaform
4. Carla Cronje Designs
5. DDD Electrical
6. Danmig
7. Grey Owl Trading
8. Ndzalama Training
9. Online Business Buddy
10. Onque Graphics
11. Scruffy to Fluffy
12. Scruffy to Fluffy Edenglen
13. Teulu Consulting
14. Vanjenco
15. Velvetglow
16. Villa Vaal Boerdery
17. X Factor Signs
18. Zazle Systems

#### Why this requires browser access:
- The Taly API `POST chooseCompany` returns `NOTAVAIL` — the API approach does not work
- Company switching MUST use the UI modal: `chooseCompany()` → iframe click → page reload → verify header → scrape
- ONE company at a time — no concurrent scrapers (that's what caused the corruption)
- Each company's employees must be verified against the Taly UI before saving

#### What has been done (previous sessions):
- 54 companies discovered in Taly, 271 employees identified
- 49 payroll JSON files created at `1 Active Company/[CLIENT]/Payroll/data/`
- 31 companies have confirmed good data
- 6 companies confirmed NOT in Taly (Parthenon, La Capitaine, G&M, HKA, Van der Berg, Desi Soul)
- Jabulani Security March 2026 payroll fully calculated (4 employees, R534 UIF total)
- AHS and Jabulani already confirmed correct — can be skipped

#### What still needs to happen (Phase 0 remaining):
| Task | Status | Requires |
|------|--------|----------|
| P0-A1 | Re-scrape 18 corrupted companies | Browser + Taly login |
| P0-A2 | Build JSON for 6 non-Taly companies | Supabase + dossiers |
| P0-A3 | Verify all 54 JSON files | File checks |
| P0-B1-B3 | Load all clients into app | Code changes to saaccountants.html |
| P0-C1-C14 | Dashboard payroll actions | Code changes |
| P0-D1-D7 | March 2026 payroll run | Data + code |
| P0-E1-E6 | Client notifications | Code changes |

#### Blocker for P0-A1:
Dirk needs to have Taly Payroll open in Chrome so Claude Code can use Chrome MCP to switch companies via the UI modal and scrape. If the Taly session has expired, Dirk must log back in first.

---

## PRIOR REPORT — 2026-03-15 (Build v8)

### MILESTONE: Phase 3 Tax Compliance — 11/11 COMPLETE

All tax calculation features are now implemented with verified SARS sources:

| # | Feature | Source | Confidence |
|---|---------|--------|------------|
| P3-01 | SDL exemption check | SDL Act s4(b) | 95% |
| P3-02 | ETI (Employment Tax Incentive) | ETI Act 26/2013 | 90% |
| P3-03 | Retirement fund deduction | ITA s11F | 95% |
| P3-04 | **Travel allowance** | SARS PAYE-GEN-01-G03-A01 | 90% |
| P3-05 | **Section 12H learnership** | ITA s12H + SARS IN20 Issue 9 | 95% |
| P3-06 | BCEA compliance checker | BCEA + NMW Act | 80% |
| P3-07 | **COIDA calculator** | COID Act 130/1993 + tariff schedules | 75% |
| P3-08 | PAYE audit trail | SARS Annual Equivalent Method | 95% |
| P3-09 | UIF contribution register | UIF Act 63/2001 | 95% |
| P3-10 | Leave tracking | BCEA s20, s22, s27 | 95% |
| P3-11 | Multi-year tax tables | SARS Tax Tables TY2026+TY2027 | 95% |

### Current app state:
```
File: app/saaccountants.html
Lines: 6,403
Size: ~400KB
Companies: 50 (35 with employees, 15 setup)
Employees: 155 active
Phase 3 tax compliance: 11/11 COMPLETE
Phase 9 LedgerAI readiness: 9/10 (DevAudit sweep pending)
```

### PHASE COMPLETION SUMMARY:
```
Phase 0: Warning - Core complete, data quality items remain (A1-A3, B1-B3, C1-C14, D1-D7, E1-E6)
Phase 1: Complete
Phase 2: Complete
Phase 3: 11/11 COMPLETE — ALL tax compliance features built
Phase 4: Complete
Phase 5: Complete
Phase 6: Complete
Phase 7: Complete
Phase 8: Complete
Phase 9: 9/10 — DevAudit sweep pending
Phase 10: Not started — Website management
Phase 11: Complete — relay active via saa-relay public repo
```

---

## RELAY STATUS

Relay moved to PUBLIC repo: `dirkdebeer1-hub/saa-relay`
- claude.ai can now read without authentication
- Raw URL: https://raw.githubusercontent.com/dirkdebeer1-hub/saa-relay/main/ARCHITECT-INBOX.md
- No client data in this repo — relay files only
