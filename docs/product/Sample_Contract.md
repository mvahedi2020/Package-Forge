# Package Forge — fictional sample and state contract

All names and prices are invented. Fixed sample clock: **2026-10-02**. Catalog **2026.10-v1**. Quote schema **v1**, valid through **2026-10-09**. The application deliberately does not advance a real subscription or use the wall clock for charges. A saved quote with another clock, expiration, catalog or baseline is inconsistent and preserved for recovery.

| Tier | Monthly / editor | Annual equivalent / editor / month | Editor/viewer capacity | Capabilities |
|---|---|---|---|---|
| Base | $0 | $0 | 3 / 20 | Shared boards |
| Studio | $12 | $10 | 20 / 200 | Shared boards, Approval workflows |
| Archive | $24 | $20 | 100 / 1,000 | All of Studio + Audit export |

Viewer price is always $0. Counts use integers 0–10,000; no minimum paid-seat fee exists in this hypothetical catalog. Viewer-only and zero-member teams can produce $0 quotes when fit holds. Every money value uses integer cents; formatting occurs only for display. Largest bounded annual arithmetic is 10,000 × 2,000 × 12 = 240,000,000 cents ($2,400,000); this count exceeds package capacity and cannot be confirmed.

| Scenario | Proposed editors/viewers | Must-haves | Term | Hand-calculated result |
|---|---|---|---|---|
| Cedar Design | 8 / 24 | Boards + Approvals | Monthly | Studio: 8 × $12 = $96; Base lacks approvals and both capacities |
| Kite Collective | 2 / 8 | Boards | Monthly | Base: $0; downgrade from active Studio loses Approvals, editor capacity 20→3 and viewer capacity 200→20 |
| Harbor Records | 12 / 60 | Boards + Approvals + Audit | Annual | Archive: 12 × $20 × 12 = $2,880 actual annual; $240 equivalent/month |
| Widefield Network | 101 / 1,001 | Boards | Monthly | No fit, including Archive 100/1,000 |

The fixed active baseline is **Studio, 8 editors / 24 viewers, $96 monthly**, baseline-v1, renewing **2026-10-31**. Scenarios change the proposed renewal team only. Confirmed quotes schedule a local change effective October 31. Monthly target term ends November 30; annual target term ends October 31, 2027. Month arithmetic clamps to the last calendar day in UTC: January31→February28 (or29 in a leap year), February29→February28 a year later. No charge occurs today, no immediate plan switch, no proration.

An eight-editor Studio annual quote is $960 actual annual and $80 equivalent/month; twelve monthly $96 payments total $1,152, a hypothetical $192 difference. These numbers establish arithmetic, not a purchase or elasticity claim.

Persistence key `package-forge:v1`, schema1. Revision changes on applied assumptions, selection, confirmation and schedule cancellation, bounded at 1,000,000; a change beyond that boundary is rejected with reset recovery. Confirmed history has sequential Q1…Q100 identifiers and strictly increasing quote revisions. Every quote is recalculated for fit, price, baseline, catalog, dates and source assumptions when loading. A schedule references only the latest noncanceled quote. A nonempty history with no schedule requires the latest quote to be explicitly canceled. Cancellation identifiers must be valid and chronological. History cannot be edited or undone; a later quote supersedes the schedule only. At 100 quotes further confirmation is blocked until reviewed reset.

Pending previews are ephemeral. Full raw saved content is checked, including same-revision content changes. Cross-tab changes block writes and confirmation until reload or reviewed reset. Getter/read/write exceptions keep current memory and display a persistence warning. Unreadable saved data is never written, even if writes would succeed. Reset captures reviewed raw bytes and current-memory fingerprint, rejects any intervening change, and preserves both memory and saved data if reading or writing fails. A fresh reset after external corruption deliberately reviews those current corrupt bytes. Unknown/corrupt/inconsistent data is never silently overwritten. Refresh preserves compatible data; refresh cannot preserve memory when browser storage is unavailable. Undo and reset boundaries are defined in [PRD](PRD.md). Actual software evidence and release work: [Validation](Validation.md).
