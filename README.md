# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

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

## Roman numerals API

The library provides two named exports for converting between integers and Roman numerals:

- `toRoman(number)` — converts an integer in the range 1..3999 to a Roman numeral string using strict subtractive notation.
- `fromRoman(string)` — converts a canonical Roman numeral string back to an integer, and throws for invalid forms (e.g. 'IIII').

Examples (ESM):

```js
import { toRoman, fromRoman } from './src/lib/main.js';

console.log(toRoman(1994)); // 'MCMXCIV'
console.log(fromRoman('MCMXCIV')); // 1994
console.log(toRoman(4)); // 'IV'
```

Conversion table (selected):

| Number | Roman |
|--------|-------|
| 1      | I     |
| 4      | IV    |
| 9      | IX    |
| 40     | XL    |
| 90     | XC    |
| 400    | CD    |
| 900    | CM    |
| 1994   | MCMXCIV |
| 3999   | MMMCMXCIX |

Notes:
- `toRoman(0)` and `toRoman(4000)` throw `RangeError`.
- `fromRoman('IIII')` and other non-canonical forms throw `TypeError`.

## File Layout

```
src/lib/main.js              <- library (browser-safe)
src/web/index.html            <- web page (imports ./lib.js)
tests/unit/main.test.js       <- unit tests
tests/unit/roman.test.js      <- roman numeral tests
```

## Updating

The `init` workflow updates the agentic infrastructure automatically. To update manually:

```bash
npx @xn-intenton-z2a/agentic-lib@latest init --purge
```
