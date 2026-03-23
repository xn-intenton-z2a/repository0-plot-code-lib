# Flow Benchmark Report 001

**Date**: 2026-03-23
**Operator**: agentic-lib-flow (automated)
**agentic-lib version**: 0.1.0
**Run**: [23415439359](https://github.com/xn-intenton-z2a/repository0-plot-code-lib/actions/runs/23415439359)

---

## Configuration

| Parameter | Value |
|-----------|-------|
| Mission seed | 2-kyu-create-plot-code-lib |
| Model | gpt-5-mini |
| Profile | max |
| Workflow runs | 8 |
| Init mode | purge |

## State File

```toml
# agentic-lib-state.toml — Persistent state across workflow runs
# Written to the agentic-lib-logs branch by each agentic-step invocation

[counters]
log-sequence = 6
cumulative-transforms = 3
cumulative-maintain-features = 1
cumulative-maintain-library = 1
cumulative-nop-cycles = 0
total-tokens = 1146638
total-duration-ms = 1003177

[budget]
transformation-budget-used = 3
transformation-budget-cap = 128

[status]
mission-complete = true
mission-failed = false
mission-failed-reason = ""
last-transform-at = "2026-03-22T23:58:28.981Z"
last-non-nop-at = "2026-03-23T00:01:56.349Z"

[schedule]
current = ""
auto-disabled = true
auto-disabled-reason = "mission-complete"
```

## Results

| Metric | Value |
|--------|-------|
| Mission complete | YES |
| Mission failed | NO |
| Source lines | 235 |
| Test files | 3 |
| Agent log files | 6 |

## Mission

```
# Mission

A JavaScript library and CLI tool for generating plots from mathematical expressions and time series data. Produces SVG and PNG output files.

## Required Capabilities

- Parse a mathematical expression string using JavaScript `Math` functions (e.g. `"y=Math.sin(x)"`, `"y=x*x+2*x-1"`) into an evaluatable function.
- Evaluate an expression over a numeric range (`start:step:end`) and return an array of data points.
- Load time series data from a CSV file with columns `time,value`.
- Render a data series to SVG 1.1 using `<polyline>` elements with a `viewBox` attribute.
- Render a data series to PNG (canvas-based or via SVG conversion — document the approach in the README).
- Save a plot to a file, inferring format from extension (`.svg` or `.png`).

## CLI

```
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file output.svg
node src/lib/main.js --csv data.csv --file output.png
node src/lib/main.js --help
```
```

## Agent Log Files

- agent-log-2026-03-22T23-48-18-207Z-001.md
- agent-log-2026-03-22T23-50-41-580Z-002.md
- agent-log-2026-03-22T23-52-28-862Z-003.md
- agent-log-2026-03-22T23-55-04-964Z-004.md
- agent-log-2026-03-22T23-58-29-389Z-005.md
- agent-log-2026-03-23T00-01-56-492Z-006.md
