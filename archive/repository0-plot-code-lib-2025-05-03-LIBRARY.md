library/VITEST.md
# library/VITEST.md
# VITEST

## Crawl Summary
Vitest is a Vite-native testing framework with ESM, TypeScript, and JSX support. It allows installation via npm, yarn, pnpm, or bun, and supports direct CLI invocation via npx. It enforces file naming conventions (.test. or .spec.) and offers unified configuration with Vite through vitest.config or test property in vite.config. Advanced options include workspaces, dependency optimization (server.deps and deps.optimizer options), custom reporter configuration, and choice of execution pools (threads, forks, vmThreads, vmForks). Detailed CLI options, environment settings (node, jsdom, happy-dom, edge-runtime), and troubleshooting recommendations are provided.

## Normalised Extract
Table of Contents:
1. Introduction
2. Installation
3. Writing Tests
4. Configuration
5. CLI Usage
6. Workspaces
7. Dependency and Asset Optimization
8. Debugging and Best Practices

1. Introduction:
- Vitest provides fast testing via Vite's transformation pipeline with out-of-box ESM, TypeScript, and JSX support.

2. Installation:
- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest
- bun: bun add -D vitest
- npx vitest can be used if local binary not found.

3. Writing Tests:
- Test file names must include .test. or .spec.
- Example implementation:
  File: sum.js
    export function sum(a, b) {
      return a + b
    }
  File: sum.test.js
    import { expect, test } from 'vitest'
    import { sum } from './sum.js'
    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3)
    })
- Add script to package.json:
  "scripts": { "test": "vitest" }

4. Configuration:
- Create vitest.config.ts with:
    import { defineConfig } from 'vitest/config'
    export default defineConfig({
      test: { /* options */ }
    })
- Can also configure via vite.config.ts with test property and triple slash reference.
- Key parameters include include, exclude (default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']), globals (default false), environment (default 'node'), root, reporters, and pool settings.

5. CLI Usage:
- Run tests: vitest or npm run test
- Run once: vitest run
- Enable coverage: vitest run --coverage
- Additional options: --port, --https, --watch, --config <path>

6. Workspaces:
- Define multiple configurations in one project using the workspace option in vitest.config.
  Example:
    workspace: [
      'packages/*',
      'tests/*/vitest.config.{e2e,unit}.ts',
      { test: { name: 'happy-dom', root: './shared_tests', environment: 'happy-dom', setupFiles: ['./setup.happy-dom.ts'] } },
      { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } }
    ]

7. Dependency and Asset Optimization:
- server.deps:
  external: default [/\/node_modules\//]
  inline: array or true for all inline
  fallbackCJS: default false
  cacheDir: default 'node_modules/.vite'
- deps.optimizer:
  include/exclude patterns, force rebundling option, and mode-specific settings (optimizer.web and optimizer.ssr).
- Asset options:
  transformAssets: true; transformCss: true; transformGlobPattern for matching external files.

8. Debugging and Best Practices:
- Use mergeConfig for combining Vite and Vitest configurations.
  Example:
    import { defineConfig, mergeConfig } from 'vitest/config'
    import viteConfig from './vite.config.mjs'
    export default mergeConfig(viteConfig, defineConfig({ test: { exclude: ['packages/template/*'] } }))
- For Bun, use bun run test instead of bun test.
- Set VITEST_SKIP_INSTALL_CHECKS=1 to disable dependency checks.
- Always include triple slash reference for Vitest types in TypeScript files.
- Use CLI flags such as --update for snapshots and --watch for re-running tests on changes.

## Supplementary Details
Technical Specifications:
- Installation:
  npm install -D vitest
  yarn add -D vitest
  pnpm add -D vitest
  bun add -D vitest

- Test File Convention: Files must include .test. or .spec. in filename.

- Package.json script configuration:
  {
    "scripts": {
      "test": "vitest",
      "coverage": "vitest run --coverage"
    }
  }

- Vitest Config Options (in test property):
  include: string[] (default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'])
  exclude: string[] (default: ['**/node_modules/**', '**/dist/**', '**/cypress/**', etc])
  globals: boolean (default: false)
  environment: string (default: 'node'; other options: 'jsdom', 'happy-dom', 'edge-runtime')
  root: string (project root directory)
  reporters: string | Reporter[] (default 'default')
  pool: 'threads' | 'forks' | 'vmThreads' | 'vmForks' (default: 'forks')

- Dependency configuration under server.deps:
  external: RegExp[] (default: [/\/node_modules\//])
  inline: (string | RegExp)[] | true
  fallbackCJS: boolean (default: false)
  cacheDir: string (default: 'node_modules/.vite')

- CLI Options:
  --config: Path to configuration file
  --watch, --run, --port, --https
  --update for snapshot updates
  --globals to enable global APIs

- Merging Configurations:
  Use mergeConfig from 'vitest/config' to combine Vite and Vitest settings.

- Environment Setup:
  Triple slash reference for TypeScript:
    /// <reference types="vitest/config" />

- Workspaces Setup:
  Define workspaces as an array of glob patterns or configuration objects with test property.

- Best Practices:
  Use a single configuration file when possible to avoid conflicts.
  For Bun users, invoke tests using 'bun run test'.
  For debugging modules, review deps.optimizer options and cache directories.

- Troubleshooting Procedures:
  1. Verify Node version >=18.0.0
  2. For dependency issues, set VITEST_SKIP_INSTALL_CHECKS=1
  3. Run npx vitest --help to list CLI options
  4. If tests are misbehaving due to configuration conflicts, check and merge Vite and Vitest configs properly.

## Reference Details
API Specifications and Implementation Details:

1. defineConfig from vitest/config:
   Signature: defineConfig(options: { test?: TestOptions; [prop: string]: any }): UserConfigExport
   Example:
     import { defineConfig } from 'vitest/config'
     export default defineConfig({
       test: {
         include: ['**/*.{test,spec}.{js,ts,jsx,tsx}'],
         exclude: ['node_modules', 'dist'],
         globals: false,
         environment: 'node',
         reporters: 'default',
         pool: 'forks'
       }
     })

2. CLI Commands:
   - Run tests: vitest
   - Run tests once: vitest run
   - Run with coverage: vitest run --coverage
   - Additional flags: --config <path>, --watch, --update

3. Test File Example:
   File: sum.js
     export function sum(a: number, b: number): number {
       return a + b
     }
   File: sum.test.js
     import { expect, test } from 'vitest'
     import { sum } from './sum.js'
     test('adds 1 + 2 to equal 3', () => {
       expect(sum(1, 2)).toBe(3)
     })

4. Configuration Options (Exact Details):
   - test.include: string[]; Default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
   - test.exclude: string[]; Default: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
   - globals: boolean; Default: false
   - environment: 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime'; Default: 'node'
   - root: string; Use CLI flag -r or --root
   - reporters: string | Reporter[]; Default: 'default'
   - pool: 'threads' | 'forks' | 'vmThreads' | 'vmForks'; Default: 'forks'

5. Dependency Handling (server.deps):
   - external: RegExp[]; Default: [/\/node_modules\//]
   - inline: (string | RegExp)[] | true; Default: []
   - fallbackCJS: boolean; Default: false
   - cacheDir: string; Default: 'node_modules/.vite'

6. Best Practices and Troubleshooting:
   - Use mergeConfig to combine vite.config and vitest.config.
   - For missing dependencies, set environment variable VITEST_SKIP_INSTALL_CHECKS=1
   - For debugging errors in CJS modules, enable deps.interopDefault (default true).
   - For TypeScript, include triple-slash reference: /// <reference types="vitest/config" />
   - When using workspaces, ensure consistency across configuration fields.

7. Troubleshooting Procedures (Commands):
   - Check Node version: node -v (should be >= 18.0.0)
   - List CLI options: npx vitest --help
   - For snapshot updates: vitest --update
   - For isolated issues, run: vitest run --no-watch

8. Full SDK Method and Usage Patterns:
   Importing and using Vitest APIs in tests:
     import { expect, test, describe } from 'vitest'
     test('example test', () => { /* implementation */ })

This section provides complete technical rationale for method signatures, configuration options and CLI usage for immediate integration.

## Information Dense Extract
Vitest; Install: npm install -D vitest, yarn add -D vitest, pnpm add -D vitest, bun add -D vitest; Use npx vitest if local binary missing; Test files must include .test. or .spec.; Example: sum.js: export function sum(a, b){ return a+b }; sum.test.js: import {expect,test} from 'vitest'; test('adds 1+2 equals 3', () => { expect(sum(1,2)).toBe(3) }); package.json script: {"test":"vitest"}; Config: vitest.config.ts using defineConfig({ test: { include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'], exclude: ['**/node_modules/**', ...], globals: false, environment: 'node', reporters: 'default', pool: 'forks' } }); CLI flags: --config, --watch, --update, --coverage; Dependency: server.deps.external default [/\/node_modules\//], inline, fallbackCJS false, cacheDir 'node_modules/.vite'; Workspaces: array of glob patterns/config objects; Merge config using mergeConfig; Best practices: single config file preferred; triple-slash reference for TS; Troubleshooting: use VITEST_SKIP_INSTALL_CHECKS=1, npx vitest --help; API: defineConfig(options) returns config; Detailed options provided for test file matching, environment, pooling, and dependency optimization.

## Sanitised Extract
Table of Contents:
1. Introduction
2. Installation
3. Writing Tests
4. Configuration
5. CLI Usage
6. Workspaces
7. Dependency and Asset Optimization
8. Debugging and Best Practices

1. Introduction:
- Vitest provides fast testing via Vite's transformation pipeline with out-of-box ESM, TypeScript, and JSX support.

2. Installation:
- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest
- bun: bun add -D vitest
- npx vitest can be used if local binary not found.

3. Writing Tests:
- Test file names must include .test. or .spec.
- Example implementation:
  File: sum.js
    export function sum(a, b) {
      return a + b
    }
  File: sum.test.js
    import { expect, test } from 'vitest'
    import { sum } from './sum.js'
    test('adds 1 + 2 to equal 3', () => {
      expect(sum(1, 2)).toBe(3)
    })
- Add script to package.json:
  'scripts': { 'test': 'vitest' }

4. Configuration:
- Create vitest.config.ts with:
    import { defineConfig } from 'vitest/config'
    export default defineConfig({
      test: { /* options */ }
    })
- Can also configure via vite.config.ts with test property and triple slash reference.
- Key parameters include include, exclude (default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']), globals (default false), environment (default 'node'), root, reporters, and pool settings.

5. CLI Usage:
- Run tests: vitest or npm run test
- Run once: vitest run
- Enable coverage: vitest run --coverage
- Additional options: --port, --https, --watch, --config <path>

6. Workspaces:
- Define multiple configurations in one project using the workspace option in vitest.config.
  Example:
    workspace: [
      'packages/*',
      'tests/*/vitest.config.{e2e,unit}.ts',
      { test: { name: 'happy-dom', root: './shared_tests', environment: 'happy-dom', setupFiles: ['./setup.happy-dom.ts'] } },
      { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } }
    ]

7. Dependency and Asset Optimization:
- server.deps:
  external: default [/'/node_modules'//]
  inline: array or true for all inline
  fallbackCJS: default false
  cacheDir: default 'node_modules/.vite'
- deps.optimizer:
  include/exclude patterns, force rebundling option, and mode-specific settings (optimizer.web and optimizer.ssr).
- Asset options:
  transformAssets: true; transformCss: true; transformGlobPattern for matching external files.

8. Debugging and Best Practices:
- Use mergeConfig for combining Vite and Vitest configurations.
  Example:
    import { defineConfig, mergeConfig } from 'vitest/config'
    import viteConfig from './vite.config.mjs'
    export default mergeConfig(viteConfig, defineConfig({ test: { exclude: ['packages/template/*'] } }))
- For Bun, use bun run test instead of bun test.
- Set VITEST_SKIP_INSTALL_CHECKS=1 to disable dependency checks.
- Always include triple slash reference for Vitest types in TypeScript files.
- Use CLI flags such as --update for snapshots and --watch for re-running tests on changes.

## Original Source
Vitest Documentation
https://vitest.dev/

## Digest of VITEST

# Vitest Documentation

# Table of Contents
1. Introduction
2. Installation and Setup
3. Writing Tests
4. Configuration
5. CLI Usage
6. Workspaces and Advanced Options
7. Dependency Optimization and Transformer Options
8. Troubleshooting and Best Practices

# 1. Introduction
Vitest is a Vite-native testing framework that supports ESM, TypeScript, and JSX out-of-the-box. It is designed for fast test execution using features like smart watch mode and integrated configuration with Vite.

# 2. Installation and Setup
- Requires Vite >= v5.0.0 and Node >= v18.0.0.
- Installation commands:
  npm: npm install -D vitest
  yarn: yarn add -D vitest
  pnpm: pnpm add -D vitest
  bun: bun add -D vitest
- Option to use npx: npx vitest

# 3. Writing Tests
File names must include .test. or .spec.
Example (sum.js):
  export function sum(a, b) {
    return a + b
  }

Example Test (sum.test.js):
  import { expect, test } from 'vitest'
  import { sum } from './sum.js'

  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3)
  })

Package.json script entry:
  {
    "scripts": {
      "test": "vitest"
    }
  }

# 4. Configuration
Vitest integrates with Vite. It supports configuration via a dedicated vitest.config file OR by adding a test property in vite.config.

Example vitest.config.ts:
  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    test: {
      // custom configuration options
    }
  })

Alternate configuration in vite.config.ts with reference:
  /// <reference types="vitest/config" />
  import { defineConfig } from 'vite'
  
  export default defineConfig({
    test: {
      // options here
    }
  })

Key configuration options include:
- include: Array of glob patterns for test files
- exclude: Array of glob patterns to ignore
- globals: Boolean flag (default false) to expose global test APIs
- environment: Environment string such as 'node', 'jsdom', 'happy-dom', 'edge-runtime'
- root: Project root directory
- reporters: Custom reporter settings with support for multiple reporters
- pool: Select between 'threads', 'forks', 'vmThreads', or 'vmForks'
- Dependency options under server.deps and deps.optimizer with options such as external, inline, and transformAssets

# 5. CLI Usage
Vitest can be run via npm scripts or directly with npx. Common CLI commands:
- Run all tests: vitest
- Run tests once: vitest run
- With coverage: vitest run --coverage
- Additional CLI options: --port, --https, --watch, --config <path>

# 6. Workspaces and Advanced Options
Vitest supports multiple workspace configurations within a project. Example configuration:
  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    test: {
      workspace: [
        'packages/*',
        'tests/*/vitest.config.{e2e,unit}.ts',
        {
          test: {
            name: 'happy-dom',
            root: './shared_tests',
            environment: 'happy-dom',
            setupFiles: ['./setup.happy-dom.ts']
          }
        },
        {
          test: {
            name: 'node',
            root: './shared_tests',
            environment: 'node',
            setupFiles: ['./setup.node.ts']
          }
        }
      ]
    }
  })

# 7. Dependency Optimization and Transformer Options
Key dependency options:
- server.deps.external: default [/\/node_modules\//], externalizes packages for native Node processing
- server.deps.inline: accepts array of strings or regular expressions; if set to true, all dependencies are processed inline
- deps.optimizer: supports options for ssr and web modes, including include/exclude patterns and forcing rebundling
- Options for handling assets and CSS with transformAssets (default true) and transformCss (default true)

# 8. Troubleshooting and Best Practices
- For Bun users, use: bun run test
- To merge Vite and Vitest config, use mergeConfig from 'vitest/config':
    import { defineConfig, mergeConfig } from 'vitest/config'
    import viteConfig from './vite.config.mjs'

    export default mergeConfig(viteConfig, defineConfig({ test: { exclude: ['packages/template/*'] } }))
- Use VITEST_SKIP_INSTALL_CHECKS=1 to disable automatic dependency installation prompts
- When debugging transformed modules, adjust deps.optimizer options to force rebundling if necessary
- Always include a reference directive for TypeScript: /// <reference types="vitest/config" />

Retrieved on: 2023-10-12
Attribution: Data Size 41188223 bytes, 26259 links found, no error.

## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev/
- License: License: MIT
- Crawl Date: 2025-05-03T21:05:06.016Z
- Data Size: 41188223 bytes
- Links Found: 26259

## Retrieved
2025-05-03
