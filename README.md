# repo

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

## Roman numeral conversion

This library provides two named exports for working with Roman numerals:

- `intToRoman(number)` — convert an integer in the range 1..3999 to its canonical Roman numeral using subtractive notation (IV, IX, XL, XC, CD, CM).
- `romanToInt(roman)` — parse a Roman numeral string and return the integer value; strictly validates canonical form and throws `TypeError` for invalid forms.

Usage examples:

```js
import { intToRoman, romanToInt } from './src/lib/main.js';

intToRoman(1994); // -> "MCMXCIV"
romanToInt('MCMXCIV'); // -> 1994
intToRoman(4); // -> "IV"

// Out-of-range values throw RangeError
// intToRoman(0) => RangeError
// intToRoman(4000) => RangeError

// Invalid roman strings throw TypeError
// romanToInt('IIII') => TypeError
```

Common conversions

| Integer | Roman |
|--------:|:------|
| 1 | I |
| 4 | IV |
| 9 | IX |
| 40 | XL |
| 90 | XC |
| 400 | CD |
| 900 | CM |
| 1994 | MCMXCIV |

See `tests/unit/roman.test.js` for the full test-suite, including a round-trip check across all values 1..3999.

---

The rest of this README documents the repository template and agentic-lib usage.

(remaining content omitted for brevity)
