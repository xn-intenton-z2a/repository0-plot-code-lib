# Overview
Add the ability to emit raw time series data alongside or instead of rendered plots, allowing users to inspect, chain, or persist data in standard formats JSON and CSV.

# CLI Flags
- `--export-data <path>` to specify an output file for the generated time series data
- `--data-format json|csv` to select the serialization format, defaulting to json
- `--skip-plot` to generate data without rendering any plot image

# Data Serialization
- After evaluating the expression over the specified range, assemble an array of objects `{ x: number, y: number }`.
- If `json` is selected, serialize the array with `JSON.stringify` and write to the given path.
- If `csv` is selected, generate a header `x,y` followed by one line per data point, and write to the given path.
- Use native `fs/promises` for file operations; add a lightweight CSV utility or implement basic CSV formatting inline.

# Source File Changes
- In `src/lib/main.js`, extend named flag parsing to include `export-data`, `data-format`, and `skip-plot`.
- After data generation, branch: if `export-data` is provided, invoke the serialization routine and exit; otherwise continue to rendering.
- Add validation with `zod` to ensure `data-format` is either `json` or `csv`.

# Testing
- Create unit tests in `tests/unit/time-series-export.test.js` to:
  - Invoke the CLI logic with small ranges and a simple expression, capture serialized output in both formats.
  - Assert that JSON files parse correctly to the expected array of points.
  - Assert that CSV strings contain correct header and comma-separated values.
  - Mock `fs` to avoid writing real files, and verify calls with correct content.

# Documentation
- Update `README.md` and `USAGE.md` with examples:
  - `repository0-plot-code-lib --expression "y=x" --range "x=0:3" --export-data data.json`
  - `repository0-plot-code-lib --expression "y=sin(x)" --range "x=0:6.28" --export-data data.csv --data-format csv`
- Describe the new flags and show sample output snippets.
