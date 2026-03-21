Normalised extract
Vitest is a fast unit test framework for Node.js inspired by Jest, with first-class ESM support and Vite integration for frontend projects.

Table of contents
- Normalised extract
- Detailed implementation info
- Supplementary details
- Reference API signatures
- Detailed digest
- Attribution

Detailed implementation info
Core primitives:
- describe(name, fn): group tests
- test(name, fn) / it(name, fn): define a test
- expect(value): assertion builder with matchers like toBe, toEqual, toHaveLength, toThrow, etc.
- beforeEach/afterEach, beforeAll/afterAll for hooks

Example
import { describe, it, expect } from 'vitest';

describe('sum', () => {
  it('adds', () => {
    expect(1 + 2).toBe(3);
  });
});

Supplementary details
- Runs in Node and in-browser environments via Vite; supports snapshots, mocking, and concurrency controls.
- Configuration via vitest.config.js; CLI: vitest run / vitest watch.

Reference API signatures
- describe(name: string, fn: () => void): void
- test(name: string, fn: () => void | Promise<void>): void
- expect<T>(actual: T): Expect<T>

Detailed digest
- Retrieved: 2026-03-21T10:11:58.557Z
- Data size (approx): 8.6 KB

Attribution
Source: Vitest project documentation and README.