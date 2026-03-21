# SUBTRACTIVE_NOTATION

Summary
Ensure subtractive notation rules are implemented and tested so the library never emits or accepts non-canonical repetitive forms such as IIII.

Description
- toRoman must produce subtractive notation for the canonical values 4, 9, 40, 90, 400, 900.
- fromRoman must reject non-canonical repetitions (e.g. IIII) by validation and throw TypeError.

Acceptance Criteria
- toRoman(4) returns IV and toRoman(9) returns IX.
- fromRoman(IIII) throws TypeError.
- toRoman never produces four identical symbols in a row; tests assert this property for representative values.

Deliverables
- Unit tests demonstrating subtractive outputs and rejecting non-canonical inputs.
- Short explanation in the README or feature file of the allowed subtractive pairs and the reasoning behind strict rejection of non-canonical forms.

Notes
- The canonical validation regex should be documented and used before parsing to guarantee subtractive-only acceptance.