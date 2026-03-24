# repo

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## CLI Examples

Generate an SVG from a mathematical expression:

```bash
node src/lib/main.js --expression "y=Math.sin(x)" --range "-3.14:0.01:3.14" --file out.svg
```

Generate a PNG from CSV data:

```bash
node src/lib/main.js --csv data.csv --file out.png
```

Use `--help` to show usage and examples:

```bash
node src/lib/main.js --help
```

Note on PNG rendering: the library exposes `svgToPng(svg, width, height)` which will return PNG bytes. For CI and simplicity a small built-in PNG fallback is used; for production-quality PNG rendering consider installing a native image library such as `sharp` and enhancing `svgToPng` to use it.

## Getting Started

(remaining README content unchanged)

This repository is powered by [intenti&ouml;n agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## Getting Started

### Step 1: Create Your Repository

Click **"Use this template"** on the [repository0](https://github.com/xn-intenton-z2a/repository0) page, or use the GitHub CLI:

```bash
gh repo create my-project --template xn-intenton-z2a/repository0 --public --clone
cd my-project
```

### Step 2: Initialise with a Mission

Run the init workflow from the GitHub Actions tab (**agentic-lib-init** with mode=purge), or use the CLI:

```bash
npx @xn-intenton-z2a/agentic-lib init --purge --mission 7-kyu-understand-fizz-buzz
```

This resets the repository to a clean state with your chosen mission in `MISSION.md`. The default mission is **fizz-buzz** (7-kyu).

#### Built-in Missions

agentic-lib ships with 20 built-in missions plus two special modes, graded using [Codewars kyu/dan](https://docs.codewars.com/concepts/kata/) difficulty:

| Mission | Kyu/Dan | Description |
|---------|---------|-------------|
| `random` | — | Randomly select from all built-in missions |
| `generate` | — | Ask the LLM to generate a novel mission |
| `8-kyu-remember-empty` | 8 kyu | Blank template |
| `8-kyu-remember-hello-world` | 8 kyu | Hello World |
| `7-kyu-understand-fizz-buzz` | 7 kyu | Classic FizzBuzz (default) |
| `6-kyu-understand-hamming-distance` | 6 kyu | Hamming distance (strings + bits) |
| `6-kyu-understand-roman-numerals` | 6 kyu | Roman numeral conversion |
| `5-kyu-apply-ascii-face` | 5 kyu | ASCII face art |
| `5-kyu-apply-string-utils` | 5 kyu | 10 string utility functions |
| `4-kyu-apply-cron-engine` | 4 kyu | Cron expression parser |
| `4-kyu-apply-dense-encoding` | 4 kyu | Dense binary encoding |
| `4-kyu-analyze-json-schema-diff` | 4 kyu | JSON Schema diff |
| `4-kyu-apply-owl-ontology` | 4 kyu | OWL ontology processor |
| `3-kyu-analyze-lunar-lander` | 3 kyu | Lunar lander simulation |
| `3-kyu-evaluate-time-series-lab` | 3 kyu | Time series analysis |
| `2-kyu-create-markdown-compiler` | 2 kyu | Markdown compiler |
| `2-kyu-create-plot-code-lib` | 2 kyu | Code visualization library |
| `1-kyu-create-ray-tracer` | 1 kyu | Ray tracer |
| `1-dan-create-c64-emulator` | 1 dan | C64 emulator |
| `1-dan-create-planning-engine` | 1 dan | Planning engine |
| `2-dan-create-self-hosted` | 2 dan | Self-hosted AGI vision |

