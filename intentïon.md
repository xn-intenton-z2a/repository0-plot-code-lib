# Mission Statement

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

**plot-code-lib** is a JavaScript library and CLI tool designed to:
- Transform and given range and a simple expression syntax for (pick an existing open standard) to time series data.
- Read and write the time series data in a standard format (pick an existing open standard).
- Make use of libraries for formula parsing, time series generation, plotting, and persistence in image formats.
- Generate SVG and PNG plots from the time series data and save these as files.
- Variations on this example: `node run start -- --expression "y=sin(x)" --range "x=-1:-1,y=-1:-1" --file output.svg` .
- Showcase all the features of the library via a CLI by dry running tp generate example commands and output in the README.md file.

`plot-code-lib` facilitate the creation of plots from mathematical expressions and time series data. It will take a
mathematical expression and a range of values and generate a plot in SVG or PNG format.
# Activity Log

## Discussions activity at 2025-05-19T15:12:59.445Z

Hello @Antony-at-Polycode 👋

I’ve reseeded the repository as requested. The mission statement remains unchanged. Let me know if you’d like any further adjustments or next steps!

[Posted on "https://github.com/xn-intenton-z2a/repository0-plot-code-lib/discussions/2972#discussioncomment-13195182" by the repository bot which took the action "seed-repository" with the detail "".]

LLM API Usage:

```json
{"prompt_tokens":20662,"completion_tokens":714,"total_tokens":21376,"prompt_tokens_details":{"cached_tokens":1152,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":640,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}```

---

2025-05-19T15:14:25Z - Archiving intentïon to branch https://github.com/xn-intenton-z2a/repository0-plot-code-lib/tree/intention-2025-05-19T15-13Z

## Feature to Issue at 2025-05-19T15:15:38.430Z

Generated feature development issue https://github.com/xn-intenton-z2a/repository0-plot-code-lib/issues/3101 with title:

Implement core PLOT_GENERATION: expression parsing, range handling, SVG/PNG output

And description:

This issue implements the core PLOT_GENERATION feature end-to-end, providing: CLI parsing of `--expression` and `--range`; a `generatePlot(options)` library API to compute time series and render SVG or PNG plots; and updated documentation and tests.\n\nTasks:\n1. **Dependencies**\n   - Add `mathjs` for expression parsing and evaluation.\n   - Add a lightweight SVG-to-PNG converter (e.g., `svg2png` or `sharp`) to support PNG output.\n2. **Source Updates (`src/lib/main.js`)**\n   - Import `zod` to validate CLI arguments: `expression: string`, `range: string` (`start:end:step`), `output: string`, `format: 'svg'|'png'`\n   - Parse the range string into `{ start, end, step }` numbers, generate an inclusive array of x values.\n   - Use `mathjs` to evaluate `y` for each `x`.\n   - Build a simple SVG chart: axes, polyline path using computed points.\n   - If `format` is `png`, convert the generated SVG to PNG.\n   - Write the file to disk at `output`.\n   - Export an async `generatePlot(options)` function matching the library API spec.\n   - Update the CLI entry point (`main(args)`) to call `generatePlot` with parsed arguments.\n3. **Tests (`tests/unit/plot-generation.test.js`)**\n   - Add unit tests for range parsing and expression evaluation (e.g., `y=x*2` over `0:2:1`).\n   - Integration test: call `generatePlot` targeting a temporary filepath with `y=sin(x)` over `0:3.14:1.57`, verify output file exists and SVG contains `<polyline` or PNG header.\n4. **Documentation**\n   - Update `README.md` to include: installation, CLI usage examples, library API usage snippet.\n   - Update `USAGE.md` with detail on `--expression`, `--range`, `--format`, and sample commands producing SVG and PNG.\n5. **Verification**\n   - `npm run build` still succeeds (no build step).\n   - `npm test` passes existing and new tests.\n   - `node src/lib/main.js --expression "y=sin(x)" --range "0:6.28:0.1" --output test.svg --format svg` creates a valid `test.svg` containing an `<svg>` element.\n   - Similarly, a PNG run produces a valid image file.\n\nDeliverables in one LLM invocation: updated `src/lib/main.js`, `package.json`, `tests/unit/plot-generation.test.js`, `README.md`, and `USAGE.md`. Focus solely on these files; do not add or remove other files.

LLM API Usage:

```json
{"prompt_tokens":4637,"completion_tokens":1380,"total_tokens":6017,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0},"completion_tokens_details":{"reasoning_tokens":704,"audio_tokens":0,"accepted_prediction_tokens":0,"rejected_prediction_tokens":0}}
```

---

