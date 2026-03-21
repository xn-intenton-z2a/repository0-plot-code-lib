TABLE OF CONTENTS:
1. Test runner and CLI invocation
2. Test definition primitives: test, it, describe
3. Expectation API: key matchers and semantics
4. Lifecycle hooks
5. Mocking and spies (vi)
6. ESM considerations for tests
7. Reference details: exact signatures and examples
8. Troubleshooting and digest

NORMALISED EXTRACT:
1) Test runner and CLI invocation
- Common command (from package.json here): npm test which runs: vitest --run tests/unit/*.test.js
- Vitest supports ESM test files; import test utilities from "vitest".

2) Test definition primitives (signatures)
- test(name: string, fn: Function | AsyncFunction)  — run a single test case
- it is an alias for test
- describe(name: string, fn: Function)  — group tests

3) Expectation API (selected matchers and behavior)
- expect(value).toBe(expected) — strict equality (===)
- expect(value).toEqual(expected) — deep equality of object structures
- expect(fn).toThrow(error?) — asserts function throws (sync) or use async/await for Promise rejects
- expect(value).toBeTruthy(), toBeFalsy(), toBeDefined(), toBeUndefined()
- expect(array).toHaveLength(n)
- Asynchronous: use async test function and await Promises before assertions

4) Lifecycle hooks
- beforeEach(fn), afterEach(fn), beforeAll(fn), afterAll(fn) — setup and teardown with support for async functions

5) Mocking and spies (vi)
- vi.fn() — create a mock function
- vi.spyOn(object, methodName) — spy on an object method
- vi.mock(moduleName, factory?) — mock modules when necessary

6) ESM considerations for tests
- Use ESM import syntax in test files: import { describe, it, expect, vi } from "vitest"  
- Ensure package.json contains "type": "module" so vitest executes test files as ESM, or configure vitest accordingly in vitest.config.js

REFERENCE DETAILS (exact signatures and practical examples):
- Example test (single-line example): import { test, expect } from "vitest"; test("returns Fizz for 3", () => { expect(fizzBuzzSingle(3)).toBe("Fizz") })
- Asynchronous example: test("async example", async () => { const result = await asyncFn(); expect(result).toEqual(expected) })
- Use expect(...).toThrow() for validating thrown errors from functions: expect(() => func()).toThrow(RangeError)

TROUBLESHOOTING:
- Symptom: SyntaxError in tests when using import -> ensure package.json "type": "module" or configure Vitest to use ESM.  
- Symptom: Mocks not applied -> verify module path used in vi.mock matches resolution and that mocks are reset between tests if needed.

DIGEST:
- Source: Vitest API / guide
- URL: https://vitest.dev/api/  and https://vitest.dev/guide/
- Date retrieved: 2026-03-21
- Extracted technical points: test and describe signatures, expectation matchers, lifecycle hooks, mocking API, ESM test file considerations.

ATTRIBUTION AND DATA SIZE:
- Attribution: Vitest documentation
- Bytes retrieved from source in crawl: 227319 bytes
