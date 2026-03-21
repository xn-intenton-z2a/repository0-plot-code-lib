# ROUND_TRIP

Goal
Guarantee the round-trip property: for every integer n in 1..3999, converting n to a Roman numeral and back yields n.

Behavior
- Add a unit test that iterates n from 1 to 3999 and asserts that fromRoman(toRoman(n)) equals n.

Acceptance Criteria
- A test verifies that fromRoman(toRoman(n)) equals n for every integer from 1 to 3999
