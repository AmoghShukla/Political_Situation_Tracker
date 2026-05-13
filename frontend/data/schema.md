# Data Schema

This static database is designed to migrate cleanly into Postgres, SQLite, or a headless CMS.

## Promise

- `id`, `slug`: stable identifiers for shareable URLs.
- `category`: policy bucket such as Infrastructure, Agriculture, Women Welfare, or Metro Projects.
- `originalWording`: manifesto or announcement wording. Completion must never be inferred from wording alone.
- `status`: `Completed`, `In Progress`, `Delayed`, `Partially Completed`, `Not Started`, or `Abandoned`.
- `completion`: 0 to 100 evidence-weighted implementation score.
- `budgetAllocatedCrore`, `budgetSpentCrore`: normalized INR crore amounts.
- `sources`: foreign keys into `/data/sources/sources.json`.
- `citizenVerification`: public report counts and last field-check date.

## Evidence Rules

Claims are not marked completed without documentary evidence. Preferred hierarchy:

1. Government resolution, budget document, department dashboard, tender award, audit, or court order.
2. Legislative answer, PIB release, CAG/PRS analysis, or official project report.
3. Trusted newsroom reporting with named documents or field evidence.
4. Citizen submission, satellite observation, or RTI response awaiting moderation.

## Project

Projects track original estimate, current estimate, cost escalation, deadline slippage, contractor or package owner, verified milestones, and announcement count.

## Budget

Budget rows use allocation, actual expenditure, capital share, district distribution, and trend data. Values are display-ready but should be periodically reconciled with official finance department statements.
