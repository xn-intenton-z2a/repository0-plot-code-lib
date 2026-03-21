# WEB_DEMO

## Summary
Add a minimal interactive example in the examples/ directory that demonstrates fizzBuzz behaviour in a browser environment so reviewers can manually validate the library via the site or a static file.

## Specification
- Create examples/demo.html and examples/demo.js that present a numeric input and a button.
- On submit, compute fizzBuzz(n) using the library and render the results as a list in the page.
- Keep the example lightweight and dependency-free; use a simple script tag that imports or requires the library build or directly invokes the function when testing locally.
- Include instructions in README for serving examples via npm run start or a static file server.

## Files to change
- examples/demo.html, examples/demo.js
- README.md (brief pointer to the demo)

## Acceptance Criteria
- Opening examples/demo.html and entering 15 displays the standard FizzBuzz list ending with FizzBuzz.
- The demo provides clear instructions for manual validation and is reachable from the README.
