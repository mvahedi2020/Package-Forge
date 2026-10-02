# Validation

## Software evidence

Executed October2, 2026, using Node24.14.1 and the production build at `/Package-Forge/` on port4191:

| Check | Actual result |
|---|---|
| Locked install `npm ci` | Passed |
| `npm run lint` | Passed |
| Strict types `npm run typecheck` (also part of build) | Passed |
| `npm run test` | 55 domain/storage checks passed |
| `npm run build` | Passed runtime/environment guard, tracked-file guard, strict types and production build; seven docs copied |
| `npm audit --audit-level=high` | Zero vulnerabilities, including zero high/critical |
| `npm run test:e2e` | 30 production Chromium flows passed |
| Initial production agent-browser replay | Page loaded, controls rendered, no browser errors reported; screenshots inspected |
| Action pins | All four workflow SHAs resolved through GitHub commit APIs |

Domain/storage coverage includes independent $96/$960/$80 Studio and $2,880/$240 Archive examples, free viewers, zero/large/negative/decimal counts, month/year/leap boundaries, no-fit, missing approvals, exact downgrade losses, immutable quote snapshots, stale drafts/selections/revisions, quote arithmetic and references, disappearing schedules, superseded/canceled distinction, unexpected assumptions, expired quotes/stale catalog and getter/read/write failures.

Production coverage includes Cedar preview/cancel, annual commitment and refresh, Archive upgrade, Base downgrade and exact losses, replacement/cancel preservation, schedule cancellation without revival, Widefield no-fit, separately reviewed must-have changes, scoped Undo, invalid and zero counts, compatible refresh, corrupt/unknown/inconsistent storage preservation and explicit reset, same-revision content change, cross-tab corruption, getter/read/write failures, trap Tab/reverse Tab/Escape, focus restoration and fallback, 1280×633 editor/quote visibility, 320/390 mobile layouts, docs HTTP200, no page/console errors and no external app requests. Additional regressions verify that unreadable storage cannot overwrite unseen original bytes, stale reset cannot erase another tab's newer commitment, failed reset preserves original corrupt bytes, and expired/catalog records are explained and preserved.

Real screenshots at 1280×633, 320×844 and 390×844 were inspected. Review actions stay visible beneath scrollable details; narrow screens have no horizontal overflow. Screenshots and generated reports remain ignored local evidence rather than public product data. Terminal color warnings are tooling-only; no application error was observed. Browser/preview processes owned by implementation were stopped after verification.

React review checked stable dialog effects, derived fit/cost state, explicit button actions, accessible labels/fieldset/announcements, dialog keyboard boundaries and focus fallback. The app uses no data fetch, third-party font or external runtime service. These software checks do not establish human comprehension or real billing reliability. Local storage has no atomic multi-tab transaction; a race after the checked snapshot remains a prototype limit.

## Proposed human evaluation — not performed

Ask a participant to choose Cedar's lowest-cost fitting tier, explain annual charge versus equivalent monthly, and state Kite's exact lost capability/capacities and effective date. Observe correct package selection, total-cost explanation and downgrade consequence comprehension without hints. No participant results, customer/commercial outcomes or owner comprehension have been observed. These proposed measures do not establish willingness to pay.

## Release evidence

Local implementation and verification are prepared for primary independent review. Public repository creation/push, final Actions/Pages publication, exact public/local head agreement, built/live file parity, profile routing and Mo's personal review remain pending primary release gates. No public release is claimed by local tests. Other product documents link here for release status.
