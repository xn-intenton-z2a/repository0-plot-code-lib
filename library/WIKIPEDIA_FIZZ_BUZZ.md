NORMALISED EXTRACT

Definition and rules
- For integers i in the inclusive range 1..n produce an array of strings where:
  - i divisible by both 3 and 5 -> "FizzBuzz"
  - i divisible by 3 only -> "Fizz"
  - i divisible by 5 only -> "Buzz"
  - otherwise -> decimal string of i
- Divisibility test: use the JavaScript remainder operator (a % b). For positive integers, use (i % 3 === 0) and (i % 5 === 0).

Table of contents
- Definition and rules
- Input validation and errors
- Implementation patterns
- Complexity

Detailed information
Definition and rules
- Replace multiples of 3 with "Fizz", multiples of 5 with "Buzz" and multiples of both with "FizzBuzz". Order of checks: test combined condition first (i % 15 === 0) or evaluate both i%3===0 && i%5===0 before single tests.

Input validation and errors
- n = 0 -> return empty array ([]).
- Negative integers -> throw RangeError with a clear message (e.g., "n must be >= 0").
- Non-integers -> throw TypeError (use Number.isInteger to detect).

Implementation patterns
- Imperative loop: for i from 1 to n, compute labels and push to result array. Complexity: O(n) time, O(n) memory (output array).
- Array.from pattern: Array.from({length: n}, (_, i) => computeLabel(i+1)) where computeLabel applies the divisibility rules.
- Generator alternative: yield strings for each i to avoid allocating the whole array if streaming is acceptable.

Complexity
- Time: O(n) where n is the input parameter.
- Space: O(n) for returned array; O(1) extra auxiliary space.

SUPPLEMENTARY DETAILS
- Use strict equality (===) for divisibility checks: (i % 3 === 0).
- Prefer (i % 15 === 0) for combined check to avoid two modulo operations if micro-optimising.
- Return value types: fizzBuzz(n) -> Array<string>; fizzBuzzSingle(n) -> string.

REFERENCE DETAILS (exact signatures and validation rules)
- Constants: FIZZ = "Fizz", BUZZ = "Buzz", FIZZBUZZ = "FizzBuzz"
- Function signatures:
  - fizzBuzz(n) -> Array<string>
    Parameters: n: number (integer >= 0)
    Returns: array of strings length n
    Errors: TypeError if typeof n !== 'number' or Number.isInteger(n) === false; RangeError if n < 0
  - fizzBuzzSingle(n) -> string
    Parameters: n: number (positive integer)
    Returns: exact string for the single integer according to rules above
    Errors: same validation as fizzBuzz
- Validation pseudocode (explicit checks):
  - if (typeof n !== 'number' || !Number.isInteger(n)) throw new TypeError('n must be integer')
  - if (n < 0) throw new RangeError('n must be >= 0')
  - if (n === 0) return []

DETAILED DIGEST
- Source URL: https://en.wikipedia.org/wiki/Fizz_buzz
- Retrieved: 2026-03-21
- Data size obtained during crawl: 20000 bytes (trimmed capture)
- Extract (first fragment of retrieved HTML):
<!DOCTYPE html>
<html class="client-nojs vector-feature-language-in-header-enabled vector-feature-language-in-main-menu-disabled vector-feature-language-in-main-page-header-disabled vector-feature-page-tools-pinned-disabled vector-feature-toc-pinned-clientpref-1 vector-feature-main-menu-pinned-disabled vector-feature-limited-width-clientpref-1 vector-feature-limited-width-content-enabled vector-feature-custom-font-size-clientpref-1 vector-feature-appearance-pinned-clientpref-1 skin-theme-clientpref-day vector-sticky-header-enabled wp25eastereggs-enable-clientpref-1 vector-toc-available skin-theme-clientpref-thumb-standard" lang="en" dir="ltr">
<head>
<meta charset="UTF-8">
<title>Fizz buzz - Wikipedia</title>

ATTRIBUTION
- Wikipedia: "Fizz buzz" article (Creative Commons). Content trimmed for digest.
