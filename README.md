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

## Roman numerals

This library now includes two helpers for converting between integers and Roman numerals:

- `toRoman(n)` — convert an integer 1..3999 to its canonical Roman numeral string using subtractive notation.
- `fromRoman(s)` — parse a canonical Roman numeral string and return its integer value.

Examples:

```js
import { toRoman, fromRoman } from './src/lib/main.js';

console.log(toRoman(1994)); // => 'MCMXCIV'
console.log(fromRoman('MCMXCIV')); // => 1994
console.log(toRoman(4)); // => 'IV'

// Round-trip property
for (let n = 1; n <= 3999; n++) {
  if (fromRoman(toRoman(n)) !== n) throw new Error('round-trip failed for ' + n);
}
```

Conversion table (selected):

| Number | Roman |
|--------|-------|
| 1      | I     |
| 4      | IV    |
| 5      | V     |
| 9      | IX    |
| 10     | X     |
| 40     | XL    |
| 50     | L     |
| 90     | XC    |
| 100    | C     |
| 400    | CD    |
| 500    | D     |
| 900    | CM    |
| 1000   | M     |

Error handling:

- `toRoman` throws `RangeError` for numbers outside 1..3999 and `TypeError` for non-integer/invalid inputs.
- `fromRoman` throws `TypeError` for non-strings or invalid/non-canonical Roman numerals (e.g., 'IIII').

## How It Works

The website in `src/web/` imports the library and shows a small demo. The library is ESM and safe to import in the browser.

## File Layout

```
src/lib/main.js              <- library (browser-safe)
src/web/index.html           <- web page (imports ./lib.js)
tests/unit/roman.test.js     <- unit tests for roman conversion
```

For full project details see the repository and MISSION.md.
