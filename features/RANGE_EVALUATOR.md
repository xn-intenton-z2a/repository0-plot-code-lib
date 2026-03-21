# BOUNDARY_CASES

Summary
Define and require unit tests that cover boundary values and invalid inputs so the library behavior is well-specified and unambiguous.

Description
- Tests must include canonical boundaries and special subtractive boundaries: 1, 3, 4, 9, 40, 90, 400, 900, 3999.
- Tests must also assert error behavior for invalid inputs: 0 and 4000 for toRoman; non-string and non-matching strings for fromRoman such as IIII, IL, and empty string.

Acceptance Criteria
- Unit tests assert toRoman(1) === I and toRoman(3999) === MMMCMXCIX.
- Unit tests assert toRoman(4) === IV and toRoman(9) === IX.
- Unit tests assert calling toRoman with 0 or 4000 throws RangeError.
- Unit tests assert fromRoman called with IIII throws TypeError and fromRoman called with null throws TypeError.

Deliverables
- Focused unit tests in tests/unit/ that enumerate boundary cases and invalid inputs and assert error types and messages where appropriate.

Notes
- Keep assertions about error types strict; match RangeError and TypeError for the relevant invalid inputs.