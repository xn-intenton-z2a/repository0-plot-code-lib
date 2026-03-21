# Benchmark Report

**Date**: 2026-03-21
**Repository**: xn-intenton-z2a/repository0-plot-code-lib
**Period**: 2026-03-21T23:37:04Z → 2026-03-21T23:40:31.821Z
**Model**: gpt-5-mini

---

## Summary

Mission: implement a Roman numeral converter (toRoman/fromRoman) with tests and README. Code and focused unit tests exist and cover the acceptance items, but CI/state/issue metadata are inconsistent — the implementation is present, but no recorded successful test run and mission state flags remain unset.

---

## Configuration

| Parameter | Value |
|-----------|-------|
| Mission complete | YES |
| Mission failed | NO |
| Transforms | 3 |
| Budget | 3/128 |
| Total tokens | 1135997 |
| Workflow runs | 8 |
| Commits | 3 |
| PRs merged | 0 |
| Issues (open/closed) | 1/0 |

---

## Timeline

2026-03-21T23:37:04Z — agentic-lib-init and an agentic test run were started (runs 23391301602 and 23391301592); agentic-lib-init completed and produced commit d1c1a2a8 ("update agentic-lib@7.4.52") at 23:37:38Z. 2026-03-21T23:37:46Z–23:37:47Z — agentic-lib-bot run (23391313080) completed and produced commit 3cc919e1 ("mission-complete: Source code, unit tests, and README satisfy all mission acceptance crite") that contains the implementation and tests for the Roman numerals mission; no pull request was opened (PRs list is empty) and the change landed directly on main. 2026-03-21T23:37:48Z — pages build and deployment ran and succeeded (23391313229), indicating docs were built. 2026-03-21T23:40:07Z — a benchmark/flow commit fef0c6e2 ("flow: benchmark report ...") was created summarizing runs. 2026-03-21T23:40:13Z — issue #112 ("test+docs: add dedicated unit tests and README examples for Roman numeral conversion") was created and remains open, despite the earlier mission-complete commit that added tests and README.

---

## Acceptance Criteria

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Converting `1994` to Roman produces "MCMXCIV" | PASS | toRoman implementation in src/lib/main.js uses ROMAN_MAP and produces 'MCMXCIV' for 1994; verified by tests/unit/roman.test.js test '1994 -> MCMXCIV and back'. |
| Converting "MCMXCIV" from Roman produces 1994 | PASS | fromRoman implementation in src/lib/main.js parses strict subtractive notation (ROMAN_REGEX) and tests/unit/roman.test.js includes expect(fromRoman('MCMXCIV')).toBe(1994). |
| Converting `4` to Roman produces "IV" | PASS | toRoman maps 4 -> 'IV' (ROMAN_MAP includes [4,'IV']) and tests/unit/roman.test.js asserts expect(toRoman(4)).toBe('IV'). |
| Round-trip holds for all n in 1–3999 | PASS | tests/unit/roman.test.js contains an explicit loop 'for (let n = 1; n <= 3999; n++) expect(fromRoman(toRoman(n))).toBe(n);' and src/lib/main.js implements symmetrical toRoman/fromRoman logic using ROMAN_MAP and the strict ROMAN_REGEX. |
| Converting `0` to Roman throws `RangeError` | PASS | src/lib/main.js toRoman explicitly throws RangeError for num < 1 and tests/unit/roman.test.js includes expect(() => toRoman(0)).toThrow(RangeError). |
| Converting `4000` to Roman throws `RangeError` | PASS | src/lib/main.js toRoman throws RangeError for num > 3999 and tests/unit/roman.test.js asserts expect(() => toRoman(4000)).toThrow(RangeError). |
| Converting `"IIII"` from Roman throws `TypeError` (strict: only subtractive notation accepted) | PASS | src/lib/main.js validates input with ROMAN_REGEX and throws TypeError for malformed strings; tests/unit/roman.test.js asserts expect(() => fromRoman('IIII')).toThrow(TypeError). |
| All unit tests pass | NOT TESTED | No successful 'agentic-lib-test' run is recorded in workflow-runs.json (agentic-lib-test run 23391301592 was cancelled). While tests covering all criteria are present (tests/unit/roman.test.js), a passing CI run was not observed in the workflow-run data, and tests were not executed by this analysis. |
| README documents usage with examples | PASS | README.md contains a Roman numerals API section with usage examples (toRoman(1994) -> 'MCMXCIV', fromRoman('MCMXCIV') -> 1994) and a conversion table; pages build runs completed successfully (23391313229 and 23391349819). |

---

## Findings

### FINDING-1: Implementation and test coverage present (POSITIVE) (POSITIVE)

The repository contains a correct implementation of toRoman/fromRoman in src/lib/main.js (ROMAN_MAP, ROMAN_REGEX, integer/range checks) and a focused test suite tests/unit/roman.test.js that covers boundary values, subtractive cases, malformed inputs, and a full 1..3999 round-trip loop. Evidence: src/lib/main.js exports toRoman/fromRoman; tests/unit/roman.test.js tests '1994 -> MCMXCIV and back', 'subtractive cases', invalid numbers, malformed strings, and the round-trip loop.

### FINDING-2: Mission-state and acceptance metadata inconsistent (CRITICAL) (CRITICAL)

Commit 3cc919e1 is labeled 'mission-complete' and contains the implementation and tests, yet agentic-lib-state.toml shows status.mission-complete = false and config.toml acceptance_criteria entries remain met = false. This mismatch (evidence: commit 3cc919e1 @ 2026-03-21T23:37:46Z; /tmp/report-data/state.toml [status] mission-complete = false; /tmp/report-data/config.toml acceptance_criteria all met = false) risks the supervisor incorrectly continuing work or reopening already-resolved tasks.

### FINDING-3: No recorded successful test run before mission completion (CONCERN) (CONCERN)

The data contains a cancelled 'agentic-lib-test' run (23391301592, conclusion: cancelled) and no successful test run entry in workflow-runs.json. Despite a 'mission-complete' commit, CI evidence of a passing test run is missing, so the repository might have landed changes without CI verification.

### FINDING-4: Transforms landed directly on main with no PR (OBSERVATION / CONCERN) (CONCERN)

pull-requests.json is empty while commits.json shows three commits (d1c1a2a8, 3cc919e1, fef0c6e2) authored by automation. Direct commits remove the PR review gate and make it harder to audit changes; evidence: pull-requests.json == [] and commits.json contains the mission-complete commit by github-actions[bot].

### FINDING-5: Issue created after implementation (OBSERVATION) (OBSERVATION)

Issue #112 (created 2026-03-21T23:40:13Z) requests tests and README examples but was created after the mission-complete commit (3cc919e1 at 23:37:46Z) that added those artifacts. This ordering indicates an orchestration/order-of-operations bug where issue generation can lag and become stale. Evidence: issue #112 body and created_at timestamp vs commit timestamp.

### FINDING-6: Documentation and pages are built (POSITIVE) (POSITIVE)

README.md documents usage and examples, and pages build workflows completed successfully (runs 23391313229 and 23391349819 concluded 'success'), so documentation and published docs are present and buildable.

### FINDING-7: Transformation budget and commit count consistent (OBSERVATION) (OBSERVATION)

agentic-lib-state.toml reports cumulative-transforms = 3 and budget used 3/128; commits.json shows three commits — the cost accounting appears consistent for this short run window.

---

## Recommendations

1. Run the unit test suite in CI and require a successful agentic-lib-test run before marking the mission complete or committing the 'mission-complete' message; this prevents false positives (evidence: agentic-lib-test 23391301592 was cancelled).
2. Fix the mission-complete/state-update choreography so that acceptance_criteria entries in config.toml and agentic-lib-state.toml are atomically updated when transforms and CI verification succeed; currently commit 3cc919e1 and state/config disagree.
3. Close or update issue #112: if tests and README are already present, either close the issue referencing commit 3cc919e1 or update the issue with links to the implemented tests/docs to avoid duplicated work.
4. Prefer PR-based transforms or ensure the automation attaches richer metadata (commit -> issue/summary link and CI pass) so human reviewers can audit changes; currently transforms landed on main and pull-requests.json is empty.
5. Add a post-transform reconciliation step: after changes land, re-run the supervisor to 1) run tests, 2) update acceptance_criteria.met flags in config.toml, 3) set agentic-lib-state.toml status.mission-complete=true, and 4) close related feature/test issues if criteria are satisfied.

