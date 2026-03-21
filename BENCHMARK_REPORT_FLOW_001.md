# Flow Benchmark Report 001

**Date**: 2026-03-21
**Operator**: agentic-lib-flow (automated)
**agentic-lib version**: 0.1.0
**Run**: [23380204847](https://github.com/xn-intenton-z2a/repository0-plot-code-lib/actions/runs/23380204847)

---

## Configuration

| Parameter | Value |
|-----------|-------|
| Mission seed | 2-kyu-create-plot-code-lib |
| Model | gpt-5-mini |
| Profile | max |
| Workflow runs | 4 |
| Init mode | purge |

## State File

```toml
# agentic-lib-state.toml — Persistent state across workflow runs
# Written to the agentic-lib-logs branch by each agentic-step invocation

[counters]
log-sequence = 1
cumulative-transforms = 0
cumulative-maintain-features = 0
cumulative-maintain-library = 0
cumulative-nop-cycles = 0
total-tokens = 170164
total-duration-ms = 225860

[budget]
transformation-budget-used = 0
transformation-budget-cap = 128

[status]
mission-complete = false
mission-failed = false
mission-failed-reason = ""
last-transform-at = ""
last-non-nop-at = "2026-03-21T13:05:57.094Z"

[schedule]
current = ""
auto-disabled = false
auto-disabled-reason = ""
```

## Results

| Metric | Value |
|--------|-------|
| Mission complete | NO |
| Mission failed | NO |
| Source lines | 48 |
| Test files | 2 |
| Agent log files | 1 |

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

- agent-log-2026-03-21T13-05-57-515Z-001.md
