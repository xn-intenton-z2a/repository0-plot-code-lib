# Roman Numerals

This document describes the Roman numeral utilities provided by the library.

Functions

- toRoman(n: number): string
  - Converts an integer in the inclusive range 1..3999 to its Roman numeral representation using standard subtractive notation (IV, IX, XL, XC, CD, CM).
  - Throws TypeError for non-integer or non-number inputs.
  - Throws RangeError for integers outside 1..3999.

- fromRoman(s: string): number
  - Converts a valid Roman numeral string to its integer value.
  - Accepts case-insensitive input (leading/trailing whitespace is trimmed).
  - Performs strict validation (rejects malformed numerals such as "IIII", "VX", "IC").
  - Throws TypeError for invalid input.

Examples

```js
import { toRoman, fromRoman } from './src/lib/main.js';

console.log(toRoman(1994)); // 'MCMXCIV'
console.log(fromRoman('MCMXCIV')); // 1994
```

Implementation notes

- Uses a greedy mapping from highest to lowest numeral values to build Roman strings.
- Input validation for fromRoman uses a regular expression to ensure strict subtractive notation.

