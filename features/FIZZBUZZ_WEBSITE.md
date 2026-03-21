# FIZZBUZZ_WEBSITE

Overview
Provide a small web demo page that uses the library to render fizzBuzz(15) and add a behaviour test that verifies the demo output.

Specification
- The demo page (docs or src/web) must render a heading "FizzBuzz Demo (n = 15)" and display the 15-element sequence in a pre or code element.
- The demo must derive its output from the library at runtime (import or consume the library API) rather than using a hard-coded string.
- Add a Playwright behaviour test at tests/behaviour/demo.test.js that starts the site (npm start) and asserts the expected sequence is present on the page.

Files to change
- src/web or docs generation (to include the demo block)
- tests/behaviour/demo.test.js (behaviour test)
- README.md (link to the demo page)

Acceptance Criteria
1. The demo page contains the exact sequence: 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz, Buzz, 11, Fizz, 13, 14, FizzBuzz.
2. A behaviour test exists that can be run with npm run test:behaviour and asserts the demo content when the site is served.
3. The demo is implemented using the library functions (fizzBuzz or fizzBuzzSingle) so its output changes correctly if the library is updated.
