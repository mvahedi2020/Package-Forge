# Package Forge

[Open the live demo](https://mvahedi2020.github.io/Package-Forge/) · [Public source](https://github.com/mvahedi2020/Package-Forge) · [Release evidence](docs/product/Validation.md)

A calm fictional quote worksheet: compare three packages against must-have capabilities and team capacity, explain monthly/annual amounts, then review a next-renewal plan change as a local simulation.

**Product decision:** requirements come before price. A cheaper tier that misses approvals or capacity cannot be recommended as a fit. Annual charges remain distinct from equivalent monthly comparisons. All prices are illustrative USD; there is no checkout, real subscription, tax/refund/proration calculation or integration.

Mo owns product and program direction. AI assisted implementation and software verification. Samples are original and fictional; human evaluation is proposed, not performed.

## Review the product

[Product brief](docs/product/Product_Brief.md) · [PRD and S053–S060 map](docs/product/PRD.md) · [Sample/state contract](docs/product/Sample_Contract.md) · [Case study](docs/product/Case_Study.md) · [Decisions and risks](docs/product/Decisions_and_Risks.md) · [Validation and release evidence](docs/product/Validation.md) · [Exact walkthrough](docs/product/Sample_Walkthrough.md).

Cedar needs 8 paid editors and 24 free viewers: Studio costs $96 per month, or $960 annually ($80 per month equivalent). Harbor needs Archive at $2,880 annually ($240 per month equivalent). Widefield exceeds every package capacity, so there is no fit. Kite reviews a Base downgrade with lost Approvals and reduced capacity.

The sample uses an October 2, 2026 clock; the active Studio plan renews October 31. Scenarios change renewal assumptions only. Saved quotes retain confirmed assumptions and cannot be rewritten by draft edits. One-step Undo applies only to an assumptions change. Canceling a preview preserves commitments; canceling a scheduled change does not restore an older schedule. Storage problems keep current work in memory with a warning.

## Run locally

Use Node 24 (see `.nvmrc`).

```sh
npm ci
npx playwright install chromium
npm run lint
npm run test
npm run build
npm run test:e2e
npm run preview
```

Preview: `http://127.0.0.1:4191/Package-Forge/`. Only port 4191 is used. Production base is `/Package-Forge/`; build copies the product documents. The build checks runtime/environment and tracked-file guards. Generated files, runtime configuration and browser evidence are ignored. CSP/referrer settings limit the static demo to local resources. CI verifies before its Pages publish job; Action versions are pinned.


Read the [product documents](https://mvahedi2020.github.io/Package-Forge/docs/index.html) in the styled reading guide. Canonical Markdown remains in `docs/`.
