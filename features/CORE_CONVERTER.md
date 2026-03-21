# CORE_CONVERTER

Summary
Implement the core integer-to-Roman and Roman-to-integer conversion functions as the primary library feature. This feature produces canonical, subtractive Roman numerals for input integers 1..3999 and parses strict Roman strings back to integers.

Specification
- Functions (to be exported from src/lib/main.js): integerToRoman(n) -> string, romanToInteger(s) -> number.
- integerToRoman: Accepts a finite integer n. If n < 1 or n > 3999 throw RangeError. If input is not a finite integer throw TypeError. Returns canonical Roman numeral using subtractive notation (IV, IX, XL, XC, CD, CM).
- romanToInteger: Accepts a non-empty string s. Trim whitespace, then validate s against the canonical regex. If input is not a string or fails validation throw TypeError. If parsed value is outside 1..3999 throw RangeError. Returns the integer value.

Validation
- Use the canonical strict regex: ^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$
- Parsing: after validation, parse left-to-right using symbol values and subtraction rule (if smaller value precedes larger, subtract; otherwise add).

Implementation notes
- integerToRoman should use a greedy token list in descending order: 1000=M, 900=CM, 500=D, 400=CD, 100=C, 90=XC, 50=L, 40=XL, 10=X, 9=IX, 5=V, 4=IV, 1=I.
- romanToInteger must validate with the regex before parsing to guarantee strict behaviour (reject "IIII", "IC", etc.).

Acceptance criteria
- Converting 1994 to Roman produces MCMXCIV
- Converting MCMXCIV from Roman produces 1994
- Converting 4 to Roman produces IV
- Round-trip property holds: for all integers n in 1..3999, romanToInteger(integerToRoman(n)) === n
- integerToRoman(0) throws RangeError
- integerToRoman(4000) throws RangeError
- romanToInteger("IIII") throws TypeError

Files changed by this feature
- src/lib/main.js: implement integerToRoman and romanToInteger and export them as named exports.
- tests/unit/main.test.js: unit tests described in UNIT_TESTS feature.
- README.md: usage examples described in README_EXAMPLES feature.
