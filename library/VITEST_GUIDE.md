NORMALISED EXTRACT

Purpose
- Vitest provides test runner, assertion library, and mocking utilities for JavaScript/TypeScript projects. Use it to author unit tests that verify fizzBuzz and fizzBuzzSingle behavior.

Table of contents
- Core API
- Test structure and lifecycle
- Common assertions for FizzBuzz
- Running tests with npm

Detailed information
Core API
- test(name, fn) or it(name, fn) to define test cases.
- describe(name, fn) to group tests.
- Assertions: expect(value).toEqual(expected), expect(value).toBe(expected), expect(() => fn()).toThrow(ErrorConstructorOrMessage).
- Lifecycle hooks: beforeEach, afterEach, beforeAll, afterAll.

Test patterns for this mission
- Import ESM named exports: import { fizzBuzz, fizzBuzzSingle } from '../../src/lib/main.js'
- Assertions to satisfy acceptance criteria:
  - expect(fizzBuzz(15)).toEqual([...expected 15-element array...])
  - expect(fizzBuzzSingle(3)).toBe('Fizz') etc.
- Edge-case tests:
  - expect(fizzBuzz(0)).toEqual([])
  - expect(() => fizzBuzz(-1)).toThrow(RangeError)
  - expect(() => fizzBuzzSingle(3.14)).toThrow(TypeError)

Running tests
- Package.json script: "test": "vitest --run tests/unit/*.test.js"
- Command: npm test

DETAILED DIGEST
- Source URL: https://vitest.dev/guide/
- Retrieved: 2026-03-21
- Data size obtained during crawl (trimmed capture): 20000 bytes
- Extract (first fragment of retrieved HTML):
<!DOCTYPE html>
<html lang="en-US" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>Getting Started | Guide | Vitest</title>

ATTRIBUTION
- Vitest project documentation (MIT/OSS). Content trimmed for digest.
