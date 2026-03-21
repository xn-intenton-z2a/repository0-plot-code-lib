# VALIDATION

Summary
Provide a strict, canonical validator and explicit error semantics for Roman numeral inputs. Validation must be deterministic and reject all non-canonical forms.

Specification
- Canonical validator regex: ^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$
- Trim input before validation; reject empty strings after trim as TypeError.
- Reject any characters outside I V X L C D M as TypeError.
- Reject invalid subtractive or ordering forms such as IIII, IC, IL, XM, VX as TypeError.

Acceptance criteria
- romanToInteger accepts " MCMXCIV " (with surrounding whitespace) and returns 1994
- romanToInteger rejects "IIII" with TypeError
- romanToInteger rejects "IC" and "XM" with TypeError
- romanToInteger rejects non-string inputs (null, undefined, number) with TypeError

Files changed by this feature
- src/lib/main.js: implement validation using the canonical regex and explicit error messages.
- tests/unit/main.test.js: add tests for invalid inputs and whitespace handling.
