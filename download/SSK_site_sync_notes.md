# SSK Excel Review & Site Sync Notes

Date: 2026 review round. Source file: `SSK_All_Cohorts_Summary (3).xlsx` (uploaded by Nairobi team).
Updated copy: `download/SSK_All_Cohorts_Summary_updated.xlsx` (this is the deliverable; the original upload is untouched).

## 1. What the data says (review findings)

| Aggregate | Value | Where |
|---|---|---|
| Total submissions (all-time, Apr-Jun 2026 cycle) | 4,334 | Dashboard |
| Registrations | 962 | Dashboard / Demographics |
| Pre-tests | 952 | Dashboard |
| Post-tests | 796 | Dashboard |
| Active facilitator pairs | 12 (+1 "Unassigned" bucket) | Dashboard / Pair x Form Summary |
| Facilitators | 24 (12 pairs x 2, co-facilitation) | Pair x Form Summary |
| Gender split | 527 female (54.8%) / 433 male (45.0%) / 2 other (0.2%) | Demographics |
| Age 15-17 | 487 (50.6% of registrations) | Demographics |
| Top pair | Brandon & Grace - 417 submissions (94.8% of 440 target) | Pair x Form Summary |
| Cohorts | Cohort 1 (Jun 7-13) 1,117 / Cohort 2 (Jun 14-20) 1,295 / Other 11 | Dashboard |

## 2. Changes applied to the updated workbook

1. Removed all em dashes from the 15 generated title strings:
   - 11 sheet titles ("SSK Raw Data - Registration/Pre-Test/Sessions 1-8/Post-Test")
   - "Form Submission Summary - By Form & By Facilitator Pair"
   - "Cohort Comparison - Facilitator Pair Performance"
   - 2 chart titles ("Submissions by Form - Actual vs Target", "Cohort 1 vs Cohort 2 - Submissions by Form")
2. NOT changed on purpose (data integrity):
   - Verbatim survey wording and participant quotes that contain em dashes (3 cells on "Raw - Pre-Test" and "Raw - Session 6"). These are source records; editing punctuation would falsify them.
3. All 6 charts preserved; every number verified identical after re-save (4,334 / 962 / 952 / 796 / 12).
4. No KRA PIN, CBO registration number, "PBO Pending" or email address exists anywhere in the workbook (scanned all 20 sheets). Nothing to remove.

## 3. Site changes driven by this review

- Facilitator model corrected everywhere on the site: 24 facilitators, co-facilitating every session in 12 pairs of 2 (was "36 facilitators" before this round).
- The site's masked facilitator cards now show 3 example pairs (Pair 1 Kibera / Pair 2 Mathare / Pair 3 Kawangware) with the note "Showing 3 of the 12 pairs".
- JTW all-genders messaging added, backed by this file: 45% of the cycle's 962 registrations are young men (433), so "Binti does not just support the She, but also the He" is now stated on the site with data behind it.
- Sensitive strings (KRA PIN P051823456K, CBO Reg CBO/NAI/2024/0147, "PBO Pending", hello@bintirising.or.ke) removed from the site code; the workbook was verified clean of them.

## 4. Scope note (why site headline KPIs were not rebased to 962)

The site dashboard tells a multi-year donor story (1,248 youth YTD enrolment, 4,500+ alumni since 2023, 94% data quality). The SSK workbook covers the Apr-Jun 2026 submission cycle (962 registrations, 4,334 form submissions). These are different scopes - swapping one for the other would corrupt both stories. The workbook remains the per-cycle source of truth; the site keeps the multi-year aggregates. If the team wants the site to display the current cycle numbers (962 / 4,334 / 796), say the word and a "Current cycle (SSK Jun 2026)" card can be added to the dashboard fed by exactly these figures.

## 5. Privacy (Kenya DPA 2019)

- The workbook contains facilitator nicknames and participant free text. It must stay out of git (`.gitignore` blocks `*.xlsx`) and off the public site. Only aggregates appear on the site.
- This updated copy lives in `download/` for the team only; it is not committed to the repository.
