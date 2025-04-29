# VITEST

## Crawl Summary
Includes installation commands (npm, yarn, pnpm), test file naming conventions, detailed configuration examples using defineConfig and mergeConfig, workspace setup for multiple configurations, CLI command examples, advanced configuration options (test, server, deps, benchmark), and troubleshooting practices specific to Vitest.

## Normalised Extract
Table of Contents:
  1. Installation
  2. Writing Tests
  3. Configuration
  4. Workspaces
  5. CLI Options
  6. Advanced Options

1. Installation:
  - npm: npm install -D vitest
  - yarn: yarn add -D vitest
  - pnpm: pnpm add -D vitest

2. Writing Tests:
  - File naming: include .test. or .spec.
  - Example:
    File: sum.js exports function sum(a, b) { return a + b }
    File: sum.test.js imports { expect, test } from 'vitest' and asserts expect(sum(1,2)).toBe(3)
  - Add test script in package.json: "test": "vitest"

3. Configuration:
  - Use vitest.config.ts with defineConfig from 'vitest/config'.
  - Example: defineConfig({ test: { include: [...], exclude: [...], globals: false, environment: 'node' } })
  - Override config using CLI: vitest --config ./path/to/config

4. Workspaces:
  - Define test.workspace as an array of glob patterns or configuration objects with keys: name, root, environment, setupFiles.
  - Example includes configurations for 'happy-dom' and 'node'.

5. CLI Options:
  - Run tests: vitest or vitest run
  - Options: --watch, --config <path>, --port, --https, etc.
  - Default npm scripts: { "test": "vitest", "coverage": "vitest run --coverage" }

6. Advanced Options:
  - test options: include, exclude, globals, environment, update, watch
  - server options: sourcemap ('inline'), debug (dumpModules, loadDummpedModules), deps (external, inline)
  - deps.optimizer for bundling external libraries
  - Benchmark configuration: include, exclude, outputJson
  - Use VITEST_SKIP_INSTALL_CHECKS=1 to disable auto dependency installation prompts

## Supplementary Details
Key technical specifications:
- Vitest requires Vite >=v5.0.0, Node >=v18.0.0
- Configuration file supports extensions: .js, .mjs, .cjs, .ts, .cts, .mts
- Test configuration options:
    include (default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'])
    exclude (default: ['**/node_modules/**', '**/dist/**', etc])
    globals: false
    environment: 'node'
    update: false
    watch: true
- Server configuration:
    sourcemap: 'inline'
    debug: { dumpModules: false, loadDumppedModules: false }
    deps: {
       external: [/\/node_modules\//],
       inline: []
    }
- Workspaces: Array of glob patterns and config objects (keys: name, root, environment, setupFiles)
- CLI available commands: vitest, vitest run, vitest --config <path>
- Dependency optimization via deps.optimizer including options for bundling and inline processing
- Environment override via docblock (@vitest-environment jsdom/happy-dom)
- Best practices: unified configuration file, disable dependency checks with VITEST_SKIP_INSTALL_CHECKS, use correct command for Bun

## Reference Details
API Specifications:
----------------------------------------------------------------
1. defineConfig (from 'vitest/config'):
   Signature: defineConfig(config: {
     test?: {
       include?: string[],
       exclude?: string[],
       globals?: boolean,
       environment?: string,
       update?: boolean,
       watch?: boolean
     },
     server?: {
       sourcemap?: 'inline' | boolean,
       debug?: {
         dumpModules?: boolean | string,
         loadDumppedModules?: boolean
       },
       deps?: {
         external?: (string | RegExp)[],
         inline?: (string | RegExp)[]
       }
     },
     deps?: {
       optimizer?: { ssr?: boolean, web?: boolean }
     },
     benchmark?: {
       include?: string[],
       exclude?: string[],
       outputJson?: string
     },
     alias?: Record<string, string> | Array<{ find: string | RegExp, replacement: string }>
   }): Config

2. mergeConfig:
   Signature: mergeConfig(viteConfig: any, vitestConfig: any): any

3. Example Test Code:
   // sum.js
   export function sum(a: number, b: number): number {
     return a + b
   }

   // sum.test.js
   import { expect, test } from 'vitest';
   import { sum } from './sum.js';
   test('adds 1 + 2 to equal 3', () => {
     expect(sum(1, 2)).toBe(3);
   });

4. CLI Usage:
   - Run tests: npm run test
   - Run once: vitest run
   - Custom config: vitest --config ./custom/vitest.config.ts

5. Troubleshooting:
   - For Bun: use 'bun run test'
   - For VM context memory issues: adjust poolOptions.vmThreads.memoryLimit (in advanced config)
   - View help: npx vitest --help

6. Environment Specification:
   - Use docblock: 
     /**
      * @vitest-environment jsdom
      */
   - Alternatively, use comment style: // @vitest-environment happy-dom
----------------------------------------------------------------
Best Practices:
- Use a unified config to avoid duplication.
- Set VITEST_SKIP_INSTALL_CHECKS=1 to disable automatic dependency prompts.
- Ensure proper CLI usage depending on your package manager (e.g., Bun requirements).


## Information Dense Extract
Vitest: Vite >=5.0.0, Node >=18.0.0; install: npm install -D vitest / yarn add -D vitest / pnpm add -D vitest; Test file: *.test.js, must include .test. or .spec.; Example: sum.js exports sum(a, b), sum.test.js imports { expect, test } from 'vitest'; Config: defineConfig({ test: { include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'], exclude: [...], globals: false, environment: 'node' } }); CLI: vitest, vitest run, --config <path>, --watch; Workspaces: test.workspace as array of glob patterns/config objects; Advanced: server.sourcemap: 'inline', server.debug: { dumpModules: false }, deps.external: [/\/node_modules\//]; API: defineConfig, mergeConfig; Troubleshooting: use bun run test, adjust poolOptions.vmThreads.memoryLimit; Environment override via @vitest-environment docblock.

## Sanitised Extract
Table of Contents:
  1. Installation
  2. Writing Tests
  3. Configuration
  4. Workspaces
  5. CLI Options
  6. Advanced Options

1. Installation:
  - npm: npm install -D vitest
  - yarn: yarn add -D vitest
  - pnpm: pnpm add -D vitest

2. Writing Tests:
  - File naming: include .test. or .spec.
  - Example:
    File: sum.js exports function sum(a, b) { return a + b }
    File: sum.test.js imports { expect, test } from 'vitest' and asserts expect(sum(1,2)).toBe(3)
  - Add test script in package.json: 'test': 'vitest'

3. Configuration:
  - Use vitest.config.ts with defineConfig from 'vitest/config'.
  - Example: defineConfig({ test: { include: [...], exclude: [...], globals: false, environment: 'node' } })
  - Override config using CLI: vitest --config ./path/to/config

4. Workspaces:
  - Define test.workspace as an array of glob patterns or configuration objects with keys: name, root, environment, setupFiles.
  - Example includes configurations for 'happy-dom' and 'node'.

5. CLI Options:
  - Run tests: vitest or vitest run
  - Options: --watch, --config <path>, --port, --https, etc.
  - Default npm scripts: { 'test': 'vitest', 'coverage': 'vitest run --coverage' }

6. Advanced Options:
  - test options: include, exclude, globals, environment, update, watch
  - server options: sourcemap ('inline'), debug (dumpModules, loadDummpedModules), deps (external, inline)
  - deps.optimizer for bundling external libraries
  - Benchmark configuration: include, exclude, outputJson
  - Use VITEST_SKIP_INSTALL_CHECKS=1 to disable auto dependency installation prompts

## Original Source
Vitest Documentation
https://vitest.dev/

## Digest of VITEST

# Vitest Documentation

## Overview
Vitest is a next generation testing framework powered by Vite. It supports ESM, TypeScript, and JSX out of the box. Vitest requires Vite >=v5.0.0 and Node >=v18.0.0.

## Installation
Install via one of the following commands:
- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest

## Writing Tests
Test files must include .test. or .spec. in their file names. Example:

// sum.js
export function sum(a, b) {
  return a + b
}

// sum.test.js
import { expect, test } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})

Update package.json with:
{
  "scripts": {
    "test": "vitest"
  }
}

## Configuration
Vitest supports unified configuration with Vite. Use a separate file (vitest.config.ts) or integrate into vite.config.ts. You can override default behavior:

Example vitest.config.ts:
-------------------------------------------------
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    globals: false,
    environment: 'node',
    update: false,
    watch: true
  }
})
-------------------------------------------------

CLI override example:
vitest --config ./path/to/vitest.config.ts

Merge Vite config with Vitest config using mergeConfig:
-------------------------------------------------
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // override settings
  }
}))
-------------------------------------------------

## Workspaces
Support for multiple project configurations:
-------------------------------------------------
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
-------------------------------------------------

## Command Line Interface (CLI)
Default npm scripts:
-------------------------------------------------
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
-------------------------------------------------

CLI options include:
- vitest run (run tests once)
- --watch (watch mode)
- --config <path> to specify a custom configuration
- Additional options like --port and --https are available.

## Advanced Configuration Options
Vitest allows deep configuration including server, dependency resolution, and benchmarking. Key options include:

- test.include: Glob patterns, default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
- test.exclude: Default: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
- globals: boolean, default false
- environment: string, default 'node'

Server settings example:
-------------------------------------------------
server: {
  sourcemap: 'inline',
  debug: {
    dumpModules: false,
    loadDumppedModules: false
  },
  deps: {
    external: [/\/node_modules\//],
    inline: []
  }
}
-------------------------------------------------

Benchmark options, alias settings, and advanced dependency optimization (deps.optimizer) are also supported.

## Best Practices
- Use a unified configuration file for both Vite and Vitest when possible.
- Disable automatic dependency prompts with environment variable VITEST_SKIP_INSTALL_CHECKS=1.
- For Bun users, always run tests using 'bun run test' instead of 'bun test'.
- If using separate config files, ensure duplicate Vite options are consistent between them.

## Troubleshooting
- If using Bun, replace 'bun test' with 'bun run test'.
- For VM context issues (memory leaks), adjust poolOptions.vmThreads.memoryLimit.
- Refer to CLI help by running: npx vitest --help

Retrieved on: 2023-10-29
Data Size: 43045419 bytes, Links Found: 26450

## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev/
- License: MIT License
- Crawl Date: 2025-04-29T06:53:05.481Z
- Data Size: 43045419 bytes
- Links Found: 26450

## Retrieved
2025-04-29
