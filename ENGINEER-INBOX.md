# ENGINEER-INBOX.md
# From: Architect (claude.ai)
# Date: 2026-03-14
# Session: 001 — First Live Build Session
# Previous session summary: Blueprint complete. No code written yet this relay cycle.
#   saaccountants.html exists at ~2,460 lines / 144KB with working login, nav,
#   AHS + GOT payroll data, payslip generation, YTD reports, EMP201, EMP501, IRP5,
#   UI-19, recon reports, and inline form layout. All documented in PROGRESS-PAYROLL-APP.md.

---

## CRITICAL: READ FIRST

Before writing a single line of code, read these files IN THIS ORDER:
1. PROGRESS-PAYROLL-APP.md — full blueprint, all phases, all rules
2. SAA-RELAY-PROTOCOL.md — communication protocol, self-test format, CEO-Brief rules
3. saaccountants.html — current app state (the file you will be editing)

Do not start coding until all three are read.

---

## CURRENT APP STATE

Phase 1: 0/8 tasks complete
Phase 2-8: Not started
Pilot clients: AHS (monthly), GOT (weekly)
Full scope: 39 payroll clients — architecture must be data-driven, no client names hardcoded

---

## TASKS FOR THIS SESSION

MODEL FOR ALL TASKS BELOW: SONNET
(Switch to OPUS only for tax bracket logic in P3. Switch to HAIKU for syntax checks.)

---

### Task P1-01: Fix YTD Accumulation on Payslips

**What to build:**
The payslip YTD section currently shows only the current period's figures, not running totals.
Fix it to show cumulative totals from the first processed period (M1) to the current period.

**Where in the file:**
Find the payslip generation function — likely named `generatePayslip`, `renderPayslip`,
`payslipPage`, or similar. Look for where YTD figures are set.

**How it works (logic):**
1. Get the current employee's full payroll history from Store (all processed periods)
2. Filter to periods UP TO AND INCLUDING the current payslip period (not future periods)
3. Sum: gross earnings, PAYE, UIF employee, SDL employee, all deductions, nett pay
4. These sums = the YTD figures to display
5. The "current period" column stays as the single-period figure
6. The "YTD" column shows the accumulated total

**Test to run before marking complete:**
- AHS should have multiple processed periods in its data
- Open a payslip for a period that is NOT the first period (e.g. March 2026 if Jan+Feb exist)
- YTD gross must equal the sum of all periods up to March — NOT just March alone
- YTD PAYE must equal sum of all PAYE deductions across those periods
- Single period column must still show only the current month's figures
- Write a comment in the code: `// YTD TEST: AHS [employee] [period] = [expected total]`

**If test fails:** Do not mark complete. Trace the Store lookup — confirm period filtering is correct.

---

### Task P1-02 through P1-08: See full ENGINEER-INBOX.md in saa-practice-intelligence repo

(Relay copy contains task headers only — full task details in the private repo)

---

## AFTER ALL P1 TASKS COMPLETE

Run full regression:
1. Login with standard password → works
2. Both companies load → works
3. All employees load → works
4. Run payroll for AHS → preview appears → confirm → payslips generated
5. Open a payslip → YTD figures are cumulative → compliance stamp shows
6. All fringe benefit and deduction edits save and appear on payslips
7. Export data → import data → everything restored

Then write ARCHITECT-INBOX.md with results.

---

## CONSTRAINTS THIS SESSION

- Never hardcode a client name in JS logic — always read from Store
- Every new function must have a source comment if it involves a tax calculation
- Never put </script> inside a JS template literal
- Do not split into multiple files
- Do not deploy to Vercel
- Email drafts to dirkdebeer1@gmail.com only, subject prefix [SAA TEST], Gmail MCP draft only — never send
