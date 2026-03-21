# ROMAN_VALIDATION

Summary
Define and use a canonical validation step for Roman numeral inputs to ensure strict acceptance only of subtractive, canonical form.

Validation rules
- Use the exact canonical regex for strict validation: ^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$.
- The library must throw TypeError for any string that does not fully match this pattern.
- Validation must be performed before attempting to compute an integer value to avoid ambiguous or non-canonical inputs being accepted.

Behavior and API
- Expose validation as an internal helper used by fromRoman or optionally export validateRoman(s) if that aids testing.
- Examples of invalid input: IIII, IL, VX, IIV, empty string; these must all fail validation.
- Examples of valid input: I, IV, IX, XL, XC, CD, CM, MCMXCIV.

Acceptance Criteria
- validateRoman returns true for MCMXCIV and for single-symbol values such as I and V.
- validateRoman returns false for IIII and IL and the public fromRoman throws TypeError for the same invalid strings.
- The regex is used verbatim in tests to assert that non-matching inputs are rejected.

Deliverables
- A clear validation helper and unit tests that exercise valid and invalid inputs and demonstrate that invalid inputs cause fromRoman to throw TypeError.