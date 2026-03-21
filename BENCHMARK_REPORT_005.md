# Benchmark Report

**Date**: 2026-03-21
**Repository**: xn-intenton-z2a/repository0-plot-code-lib
**Period**: 2026-03-20T22:30:00.866Z → 2026-03-21T22:30:00.177Z
**Model**: gpt-5-mini

---

## Summary

Mission: implement a CLI plot library (parse/evaluate/CSV/SVG/PNG/CLI) — incomplete. Tests for library identity pass and CI shows many successful test runs, but the codebase lacks the plotting/parser/rendering functions so the majority of MISSION.md acceptance criteria are not implemented; mission state remains false.

---

## Configuration

| Parameter | Value |
|-----------|-------|
| Mission complete | NO |
| Mission failed | NO |
| Transforms | 4 |
| Budget | 4/128 |
| Total tokens | 1521472 |
| Workflow runs | 50 |
| Commits | 83 |
| PRs merged | 11 |
| Issues (open/closed) | 0/39 |

---

## Timeline

2026-03-20T22:39:54Z — agentic-step updated acceptance checkboxes (commit 2081f984). Between 2026-03-21T00:31:49Z and 2026-03-21T21:02:45Z a sequence of agentic-step transform PRs were merged (example: PR #49 merged 2026-03-21T00:31:50 — commit ed57854c; PR #51 merged 2026-03-21T01:10:31 — commit a4a16217; PR #55 merged 2026-03-21T02:28:53 — commit 48eccc9c; PR #58 merged 2026-03-21T03:21:56 — commit 10b5dcce; PR #72 merged 2026-03-21T10:55:33 — commit 3865cea8; PRs #77,#81,#82,#89,#92,#101 merged later). Workflow activity shows many agentic-lib-test runs succeeded (e.g. run id 23389925480 conclusion: success) while several agentic-lib-workflow runs were cancelled (multiple entries in workflow-runs.json). Agentic state shows cumulative-transforms = 4 and transformation-budget-used = 4 (agentic-lib-state.toml), while 11 PRs were merged in the period (pull-requests.json).

---

## Acceptance Criteria

| Criterion | Status | Evidence |
|-----------|--------|----------|
| Parsing "y=Math.sin(x)" returns a callable function | FAIL | src/lib/main.js exports only: name,version,description,getIdentity,main — no parser or eval function present. tests/unit contains no tests for parsing; config acceptance entry 1 in /tmp/report-data/config.toml shows met = false. |
| Evaluating over range "-3.14:0.01:3.14" returns ~628 data points | FAIL | No range-evaluation implementation in src/lib/main.js; no unit test asserting ~628 points in tests/unit/*.test.js; acceptance entry 2 in config.toml met = false. |
| SVG output contains <polyline> and viewBox attributes | FAIL | No SVG rendering or polyline/viewBox generation code in src/lib/main.js and no tests asserting SVG structure; acceptance entry 3 in config.toml met = false. |
| PNG output starts with the PNG magic bytes | FAIL | No PNG rendering or canvas/sharp integration present in src/lib/main.js; no unit test checks PNG magic bytes; acceptance entry 4 in config.toml met = false. |
| CLI `--expression ... --range ... --file output.svg` produces a file | FAIL | main(args) in src/lib/main.js only handles --version and --identity and prints identity; no CLI parsing for --expression/--range/--file implemented; acceptance entry 5 in config.toml met = false. |
| CLI `--help` prints usage information | FAIL | src/lib/main.js does not check for `--help`; main() prints name@version by default; acceptance entry 6 in config.toml met = false. |
| All unit tests pass | PASS | Unit tests in tests/unit/main.test.js and tests/unit/web.test.js run only identity and web-file checks and are satisfied by current code; multiple agentic-lib-test workflow runs finished with conclusion 'success' (see workflow-runs.json entries, e.g. run id 23389624930 and commit messages like 'maintain(features+library): tests completed [healthy]' — commit sha 53ae3f26). |
| README documents CLI usage with examples | FAIL | README.md focuses on agentic-lib setup and mission workflows and does not contain the plotting CLI examples required by MISSION.md; MISSION.md itself includes example plot CLI commands but README does not replicate them; acceptance entry 8 in config.toml met = false. |

---

## Findings

### F-1: Core plotting features missing in source (CRITICAL)

src/lib/main.js contains only identity and minimal CLI output (exports: name, version, description, getIdentity, main) and no parser, range-evaluator, CSV loader, SVG/PNG renderers or file-save logic; evidence: file content at src/lib/main.js and tests that exercise only identity (tests/unit/main.test.js). This directly explains why 6 of 8 MISSION acceptance criteria fail (see acceptance_criteria evidence).

### F-2: Tests pass but do not validate mission requirements (CONCERN)

tests/unit/main.test.js and tests/unit/web.test.js validate identity and web assets only; CI shows repeated successful 'agentic-lib-test' runs (workflow-runs.json) and commits 'maintain(...): tests completed [healthy]' (commits: 53ae3f26, 363a2aed, etc.), giving a false-positive signal that mission features are implemented when they are not.

### F-3: PRs merged with zero-code-diff metadata (CONCERN)

pull-requests.json shows 11 merged PRs (numbers: 49,51,55,58,72,77,81,82,89,92,101) but each entry lists additions: 0 and deletions: 0, suggesting PRs merged with no substantive file edits or that diffs were not captured in this export; example: PR #101 additions=0 deletions=0. Commits referencing transforms exist (e.g. commit 10b5dcce 'agentic-step: transform issue #57 (#58)') but the PR diffs in the snapshot are empty — mismatch requiring investigation.

### F-4: Automated issue churn: many 'unused github issue' entries (OBSERVATION)

issues.json shows many issues titled 'unused github issue' created and closed rapidly (e.g., #98–#102, #76–#80, #47–#51). This pattern indicates automated issue generation lacking substantive content or triage, increasing noise for the agent and reviewers.

### F-5: Workflow orchestration instability (cancelled runs) (CONCERN)

workflow-runs.json contains numerous 'agentic-lib-workflow' entries with conclusion 'cancelled' (multiple timestamps across the report period), while agentic-lib-test and pages runs succeed; frequent cancellations suggest orchestration timeouts, throttling, or supervisor-level aborts that interrupt transform cycles.

### F-6: Mission-state vs commit claims mismatch (CRITICAL)

Several commits include messages 'mission-complete' or similar (examples: commit sha 24d32ab9 at 2026-03-21T03:24:10Z and a767a719 at 2026-03-20T22:46:46Z), yet agentic-lib-state.toml shows mission-complete = false and config.toml acceptance criteria all met = false. This indicates agents are committing claims of completion without updating the persistent mission state or actually meeting criteria — a structural correctness gap.

### F-7: Budget and transform accounting inconsistent (OBSERVATION)

agentic-lib-state.toml reports cumulative-transforms = 4 and transformation-budget-used = 4 while pull-requests.json lists 11 merged PRs in the period. This suggests transforms are categorized differently (maintain vs transform) or counting is incomplete; evidence: state file + pull-requests.json.

### F-8: Documentation mismatch: README lacks mission-specific CLI examples (CONCERN)

MISSION.md contains the required plotting CLI usage examples, but README.md (root) documents agentic-lib usage and does not document the plotting CLI commands or sample outputs required by the mission; evidence: README.md and MISSION.md contents.

### F-9: Positive: CI test harness is operational (POSITIVE)

Multiple agentic-lib-test workflow runs succeeded during the period (workflow-runs.json entries with conclusion 'success') and maintain-* commit messages state 'tests completed [healthy]' (commits: 53ae3f26, 363a2aed, 8066af7d), indicating the test runner and CI plumbing are functioning and can be leveraged once tests are expanded to cover mission features.

---

## Recommendations

1. Add targeted unit tests for each acceptance criterion (parser, range evaluation producing ~628 points, CSV loader, SVG <polyline>+viewBox output, PNG magic-bytes check, CLI flags and file save). Make these tests fail initially and use them as the authoritative acceptance gate before PR merge.
2. Implement the missing library functions in src/lib/main.js (or split into modules) for: expression parsing (using Function/Math), range evaluation, CSV loader (parse time,value), SVG renderer that produces a <polyline> and viewBox, and PNG renderer (document approach in README).
3. Ensure PR generation includes actual diffs; investigate why pull-requests.json shows additions/deletions = 0 (possible export snapshot or fast-forward merges). Require the agent to commit and push code changes to branches with visible diffs before merging.
4. Stop generating empty 'unused github issue' items; add an issue template that requires a problem description and acceptance criteria, and change the agent's issue creation policy to include content and labels.
5. Align mission state updates with code changes: when an agent writes a 'mission-complete' commit message, also update agentic-lib-state.toml and /tmp/report-data/config.toml acceptance entries atomically (or add a CI check preventing 'mission-complete' messaging unless state and criteria are actually updated).
6. Investigate cancelled workflow runs (check runner logs/step timeouts) and add retry/backoff or increase step timeouts for long transform cycles to reduce aborted runs.
7. Update README.md to include the plotting CLI examples and a short note on the approach used for PNG rendering (canvas vs sharp) and list any external dependencies and lockfile update procedure.

