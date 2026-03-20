VITEST

Table of contents
- Normalised extract: core behaviors
- CLI and run modes
- Test API: describe, test/it, lifecycle hooks
- Expect API and matchers
- Mocking and spies (vi)
- Configuration and environment options
- Running in Node vs jsdom
- Troubleshooting and best practices
- Supplementary details
- Reference details: API signatures and return types
- Digest and retrieval details
- Attribution

Normalised extract: core behaviors
Vitest is a Vite-powered test runner optimized for fast unit testing in Node environments and browser-like DOM tests via jsdom. Tests are organized with describe blocks and individual test cases defined using test or it. Lifecycle hooks are beforeAll, afterAll, beforeEach, afterEach. Test assertions are provided via expect with a rich matcher set (toBe, toEqual, toMatch, toThrow, resolves, rejects). Vitest supports CLI modes: run-once (--run), watch (--watch), and coverage (--coverage). Test environment is configurable per-suite or globally using the configuration key test.environment which accepts values node or jsdom. Vitest exposes the vi namespace for mocking, spies, and timers: vi.fn, vi.spyOn, vi.mock.

CLI and run modes
- Run once: vitest --run  (runs tests once and exits)
- Watch mode: vitest --watch  (watch files and re-run affected tests)
- Coverage: vitest --coverage  (collect coverage with configured reporter)
- Patterns: pass file globs to vitest to restrict which tests run, e.g. vitest tests/unit/*.test.js

Test API: describe, test/it, lifecycle hooks
- describe(name, fn) groups related tests. The fn may be synchronous or return a Promise.
- test(name, fn[, timeout]) or alias it(name, fn[, timeout]) defines a single test case.
- beforeAll(fn), afterAll(fn), beforeEach(fn), afterEach(fn) register lifecycle handlers. Handlers may be async (return Promise or marked async).

Expect API and matchers (typical set)
- expect(value).toBe(expected)  // strict equality
- expect(value).toEqual(expected)  // deep equality
- expect(value).toStrictEqual(expected)  // strict deep equality
- expect(value).toMatch(regexpOrString)
- expect(array).toContain(item)
- expect(promise).resolves/.rejects
- expect(fn).toThrow(error?)
- Many additional matchers and asymmetric matchers are supported.

Mocking and spies (vi)
- vi.fn([implementation]) returns a mock function.
- vi.spyOn(object, methodName) spies on a method and can be restored.
- vi.mock(moduleId, factory?) replaces a module import with a mock.
- vi.useFakeTimers() and vi.advanceTimersByTime(ms) for timer control.

Configuration and environment options
- Config file: vitest.config.{js,ts} exports a configuration object.
- Common config keys: test: { include, exclude, environment, globals, setupFiles }, coverage: { provider, reporter }
- environment: set to node or jsdom. When set to jsdom tests run with a DOM-like global window/document provided by jsdom.
- Globals: enabling globals maps common helpers (describe, test, expect) onto the global scope.

Running in Node vs jsdom
- Node environment: use test.environment = 'node' to run tests in a Node-only environment without DOM globals.
- jsdom environment: use test.environment = 'jsdom' or call new JSDOM inside tests. When using jsdom, utilities that rely on window/document are available.

Troubleshooting and best practices
- Use vitest --run to verify CI runs match local watch behavior.
- Use setupFiles or setupFilesOnce to prepare global state (e.g., register global window/document shims).
- When mocking modules, reset mocks between tests to avoid cross-test interference (vi.resetAllMocks()).
- For flaky tests, verify test async timing and increase timeout with the third parameter on test or use test.timeout in config.

Supplementary details
- Vitest integrates with Vite and can load ES modules, TypeScript, and Vite plugins. Tests can import source files using the same resolvers and aliases as the app build.
- Vitest exposes programmatic API (run CLI via node) but the common usage is the vitest command line and the vitest.config file.

Reference details: API signatures and return types
- describe(name: string, fn: () => void | Promise<void>): void
- test(name: string, fn: () => void | Promise<void>, timeout?: number): void
- beforeAll(fn: () => void | Promise<void>): void
- afterAll(fn: () => void | Promise<void>): void
- beforeEach(fn: () => void | Promise<void>): void
- afterEach(fn: () => void | Promise<void>): void
- expect(value: any) -> Expectation object with matchers: toBe(expected: any): void, toEqual(expected: any): void, toMatch(re: RegExp|string): void, toThrow(err?: any): void, resolves/rejects for Promise handling
- vi.fn(impl?: Function): MockFunction
- vi.spyOn(obj: object, methodName: string): Spy
- vi.mock(moduleId: string, factory?: Function): void
- Programmatic runner: vitest.run(args?) -> Promise<exitCode>

Digest and retrieval details
- Source URL: https://vitest.dev/
- Retrieval date: 2026-03-20
- Crawled HTML size (approx): 68.0 KB
- Digest: key technical coverage confirmed: CLI flags (--run, --watch, --coverage), test API (describe/test/it, lifecycle hooks), expect API and matchers, vi mocking API, configuration options including test.environment for node/jsdom. The site documents configuration schema and examples for common test patterns.

Attribution
- Source: Vitest documentation site (VitePress) — https://vitest.dev/
- Data retrieved: 2026-03-20, approx 68.0 KB HTML
