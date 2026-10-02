# Package Forge

A calm fictional quote worksheet: compare three packages against must-have capabilities and team capacity, explain monthly/annual amounts, then review a next-renewal plan change as a local simulation.

**Product decision:** requirements come before price. A cheaper tier that misses approvals or capacity cannot be recommended as a fit. Annual charges remain distinct from equivalent monthly comparisons. All prices are illustrative USD; there is no checkout, real subscription, tax/refund/proration calculation or integration.

Mo owns product and program direction. AI assisted implementation and software verification. Samples are original and fictional; human evaluation is proposed, not performed.

## Run locally

Use Node24 (see `.nvmrc`).

```sh
npm ci
npx playwright install chromium
npm run lint
npm run test
npm run build
npm run test:e2e
npm run preview
```

Preview: `http://127.0.0.1:4191/Package-Forge/`. Only port4191 is used. Production base is `/Package-Forge/`; build copies the product documents. The build checks runtime/environment and tracked-file guards. Generated files, runtime configuration and browser evidence are ignored. CSP/referrer settings limit the static demo to local resources. CI verifies before its Pages publish job; Action versions are pinned.

## Review the product

[Product brief](docs/product/Product_Brief.md) · [PRD and S053–S060 map](docs/product/PRD.md) · [Sample/state contract](docs/product/Sample_Contract.md) · [Case study](docs/product/Case_Study.md) · [Decisions and risks](docs/product/Decisions_and_Risks.md) · [Validation and release evidence](docs/product/Validation.md) · [Exact walkthrough](docs/product/Sample_Walkthrough.md).

Cedar: Studio $96 monthly for8 editors/24 free viewers; Studio annual $960 actual/$80 equivalent. Harbor: Archive $2,880 annual/$240 equivalent. Widefield: no-fit. Kite: review a Base downgrade with lost Approvals and reduced capacities. The active Studio baseline renews October31 against a fixed October2 sample clock; scenarios change renewal assumptions only.

Local storage is versioned and checked for reference/arithmetic consistency. Corrupt or unfamiliar records survive until reviewed reset. Quotes preserve confirmed assumptions; drafts cannot rewrite history. Undo covers one applied assumptions change only. Cancel-preview preserves commitments; cancel-scheduled does not revive old schedules. Storage failures retain current memory with a warning.
