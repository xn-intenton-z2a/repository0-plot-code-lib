# repo

This repository is powered by [intentiön agentic-lib](https://github.com/xn-intenton-z2a/agentic-lib) — autonomous code transformation driven by GitHub Copilot. Write a mission, and the system generates issues, writes code, runs tests, and opens pull requests.

## FizzBuzz Library

This project implements a tiny JavaScript library that exports two named functions:

- `fizzBuzz(n)` — returns an array of FizzBuzz strings for the sequence 1..n
- `fizzBuzzSingle(n)` — returns the FizzBuzz string for a single positive integer

Both functions perform parameter validation: non-integers throw `TypeError`, negatives throw `RangeError`, and `fizzBuzz(0)` returns an empty array.

## Usage Examples

ES modules (Node or browser):

```js
import { fizzBuzz, fizzBuzzSingle } from './src/lib/main.js';

console.log(fizzBuzzSingle(3)); // 'Fizz'
console.log(fizzBuzzSingle(5)); // 'Buzz'
console.log(fizzBuzzSingle(15)); // 'FizzBuzz'
console.log(fizzBuzz(15));
// [ '1','2','Fizz','4','Buzz','Fizz','7','8','Fizz','Buzz','11','Fizz','13','14','FizzBuzz' ]
```

Command line (library exposes a small CLI helper):

```bash
node src/lib/main.js --identity
node src/lib/main.js --version
```

## Development

Run the unit tests:

```bash
npm ci
npm test
```

Run behaviour tests (Playwright):

```bash
npm run test:behaviour
```

## Website Demo

Open `src/web/index.html` in a browser (it imports the library via `src/web/lib.js`). The demo page shows the library identity and renders a FizzBuzz demo for n=15.

---

See `MISSION.md` for the project mission and acceptance criteria.
