# VALIDATION

Overview

Enforce strict validation of Roman numeral strings so only canonical subtractive notation is accepted. Validation must reject non-canonical forms, incorrect repetition, disallowed subtractive pairs, lowercase input, empty strings and non-string types.

Validation rules

Apply the strict regular expression from the library reference as a first-pass validator: ^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$. Reject input that does not match this pattern. Reject lowercase input rather than implicitly converting.

Acceptance Criteria

- romanToInt accepts MCMXCIV and returns 1994.
- romanToInt rejects the non-canonical strings IIII, VV, IL, IC, XM and throws TypeError.
- romanToInt rejects empty string and non-string inputs and throws TypeError.
- Validation behaviour is asserted in tests/unit/validation.test.js and those tests pass.
