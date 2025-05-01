# VITEST

## Crawl Summary
Vitest provides a Vite-native testing environment supporting ESM, TS, and JSX. It requires Vite >= v5.0.0 and Node >= v18.0.0. Key points include installation via npm/yarn/pnpm, writing tests with file naming conventions (*.test.js), unified configuration via vite.config.ts or separate vitest.config.ts, CLI options for watch, run, and coverage, workspaces for multi-config setups, dependency optimization with external and inline modules, and detailed troubleshooting guidance for environment specific issues.

## Normalised Extract
Table of Contents:
1. Installation
   - npm install -D vitest
   - yarn add -D vitest
   - pnpm add -D vitest
   - Requires Vite >= v5.0.0 and Node >= v18.0.0
2. Writing Tests
   - Test file naming: *.test.js or *.spec.js
   - Example: sum.js and sum.test.js with usage of expect and test from vitest
3. Configuration
   - Use vitest.config.ts (or .js, .mjs, etc) to override vite.config.ts if needed
   - CLI --config option
   - Conditional configuration using process.env.VITEST or mode property
   - Merge configuration with mergeConfig from vitest/config
4. CLI and Scripts
   - Default scripts in package.json: "test": "vitest", "coverage": "vitest run --coverage"
   - CLI options: --watch, --run, --port, --https
5. Dependency Optimization
   - server.deps.external default: [/\/node_modules\//]
   - server.deps.inline configurable as string, RegExp, or true to process all dependencies
6. Workspaces Support
   - Define workspace array in vitest.config with glob patterns or objects specifying test options (name, root, environment, setupFiles)
7. Troubleshooting
   - Bun: use bun run test
   - Environment differences: use triple slash directives for type references and migrate to vitest/config
   - Debugging: check node_modules/.vite cache for dependency rebundling issues
Detailed Implementation:
Installation: Execute command as per package manager; verify dependency versions.
Writing Tests: Create files with .test. extension, import { expect, test } from 'vitest', write functions and assertions.
Configuration: Create vitest.config.ts with defineConfig export. Example:
import { defineConfig } from 'vitest/config'
export default defineConfig({ test: { globals: true, include: ['**/*.{test,spec}.{js,ts}'] } })
CLI: Run tests using npx vitest or configured npm scripts; use --config for custom config.
Dependency Optimization: Configure server.deps properties to control externalization and inlining of modules.
Workspaces: Define workspace array with glob strings or configuration objects to run tests under different environments.

## Supplementary Details
Technical Specifications and Implementation Details:
1. Installation Requirements:
   - Vite version: >= v5.0.0
   - Node version: >= v18.0.0
2. vitest.config.ts Example:
   /// <reference types="vitest/config" />
   import { defineConfig, mergeConfig } from 'vitest/config'
   import viteConfig from './vite.config.mjs'
   
   export default mergeConfig(viteConfig, defineConfig({
     test: {
       globals: true,
       include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
       exclude: ['**/node_modules/**', '**/dist/**'],
       environment: 'node',
       deps: {
         external: [/\/node_modules\//],
         inline: []
       },
       reporter: 'default',
       watch: !process.env.CI && process.stdin.isTTY,
       update: false
     }
   }))

3. CLI Commands:
   - Run tests: npm run test or npx vitest
   - Run with coverage: npm run coverage or vitest run --coverage
   - Specify custom config: vitest --config ./path/to/config.ts
4. Dependency Optimization Options:
   - server.deps.inline: (string | RegExp)[] | true
   - server.deps.external: Default externalization for node_modules
5. Workspaces Example:
   - Workspace configuration object includes properties: name, root, environment, setupFiles
6. Troubleshooting:
   - Bun: Execute bun run test
   - If using separate config files, ensure same Vite options are defined in both; use mergeConfig if necessary.
   - To force dependency rebundling, adjust deps.optimizer.force option
7. API and TypeScript integration:
   - Triple slash directive: /// <reference types="vitest/config" />
   - For global API usage, set globals: true and add types in tsconfig.json:
     { "compilerOptions": { "types": ["vitest/globals"] } }

Concrete Steps for Test Setup:
Step 1: Install Vitest with your package manager.
Step 2: Add a test script to package.json.
Step 3: Create test files with naming convention *.test.js.
Step 4: Write tests importing { expect, test } from 'vitest'.
Step 5: Configure vitest.config.ts for custom settings and merge with Vite config if used.
Step 6: Execute tests using npm run test, and observe console output for passed tests and error messages.

## Reference Details
API Specifications, SDK Method Signatures, and Implementation Examples:
1. defineConfig Method:
   - Signature: function defineConfig(config: { test?: TestOptions, plugins?: any[], [key: string]: any }): UserConfigExport
   - TestOptions properties include:
     - globals: boolean (default false)
     - include: string[] (default ['**/*.{test,spec}.?(c|m)[jt]s?(x)'])
     - exclude: string[] (default ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'])
     - environment: 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime' | string (default 'node')
     - deps: { external?: (string | RegExp)[], inline?: (string | RegExp)[] | true, cacheDir?: string }
     - reporter: string | Reporter | Array<Reporter> (default 'default')
     - watch: boolean (default based on environment)
     - update: boolean (snapshot update flag)

2. Code Example for Writing a Test:
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

3. CLI Command Examples:
   - Run tests: npx vitest
   - Run tests once: vitest run
   - Run with coverage: vitest run --coverage
   - Use custom config: vitest --config ./path/to/vitest.config.ts

4. Configuration Merging Pattern:
   import { defineConfig, mergeConfig } from 'vitest/config'
   import viteConfig from './vite.config.mjs'

   export default mergeConfig(viteConfig, defineConfig({
     test: {
       include: ['**/*.{test,spec}.js'],
       globals: true
     }
   }))

5. Best Practices:
   - Use a single configuration file to avoid discrepancies.
   - Ensure your test files are named correctly to be automatically picked up.
   - For TypeScript projects, add triple-slash directives and update tsconfig.json types array with "vitest/globals".
   - For dependency issues, use server.deps.inline configuration to process problematic ESM modules.

6. Troubleshooting Procedures:
   - If tests are not running, verify file naming conventions and inclusion patterns in the config.
   - For module resolution issues, check the settings under server.deps.external and server.deps.inline.
   - If using Bun, confirm that you invoke tests with bun run test.
   - To inspect dependency bundling, check the cache directory: node_modules/.vite.

7. Detailed Parameters and Defaults Summary:
   - include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
   - exclude: ['**/node_modules/**', '**/dist/**', ...]
   - environment: defaults to 'node'; override with jsdom/happy-dom for browser-like tests
   - globals: false by default, set to true for Jest-like global APIs
   - reporter: default is 'default'
   - watch: auto-enabled in interactive terminal
   - deps.cacheDir: 'node_modules/.vite'


## Information Dense Extract
Vitest: Vite-native testing framework, requires Vite>=5.0.0, Node>=18.0.0. Installation: npm install -D vitest, yarn add -D vitest, pnpm add -D vitest. Test files must include .test. or .spec. Extension. Example: sum.js exports function sum(a,b){return a+b}, sum.test.js imports { expect, test } from 'vitest'. Configuration via vitest.config.ts using defineConfig from 'vitest/config'; merge with Vite config via mergeConfig. Key properties: include, exclude, environment (default 'node'), globals (default false), deps with external ([/\/node_modules\//]) and inline options, reporter default 'default'. CLI options: --watch, --run, --config, --coverage. Workspaces support: define workspaces array with glob patterns and custom test objects (name, root, environment, setupFiles). Troubleshooting: use bun run test for Bun, check naming conventions, inspect node_modules/.vite for dependency rebundling. API: defineConfig({ test: { globals:boolean, include:string[], exclude:string[], environment:string, deps:{ external:(string|RegExp)[], inline:(string|RegExp)[]|true, cacheDir:string } } }).

## Sanitised Extract
Table of Contents:
1. Installation
   - npm install -D vitest
   - yarn add -D vitest
   - pnpm add -D vitest
   - Requires Vite >= v5.0.0 and Node >= v18.0.0
2. Writing Tests
   - Test file naming: *.test.js or *.spec.js
   - Example: sum.js and sum.test.js with usage of expect and test from vitest
3. Configuration
   - Use vitest.config.ts (or .js, .mjs, etc) to override vite.config.ts if needed
   - CLI --config option
   - Conditional configuration using process.env.VITEST or mode property
   - Merge configuration with mergeConfig from vitest/config
4. CLI and Scripts
   - Default scripts in package.json: 'test': 'vitest', 'coverage': 'vitest run --coverage'
   - CLI options: --watch, --run, --port, --https
5. Dependency Optimization
   - server.deps.external default: [/'/node_modules'//]
   - server.deps.inline configurable as string, RegExp, or true to process all dependencies
6. Workspaces Support
   - Define workspace array in vitest.config with glob patterns or objects specifying test options (name, root, environment, setupFiles)
7. Troubleshooting
   - Bun: use bun run test
   - Environment differences: use triple slash directives for type references and migrate to vitest/config
   - Debugging: check node_modules/.vite cache for dependency rebundling issues
Detailed Implementation:
Installation: Execute command as per package manager; verify dependency versions.
Writing Tests: Create files with .test. extension, import { expect, test } from 'vitest', write functions and assertions.
Configuration: Create vitest.config.ts with defineConfig export. Example:
import { defineConfig } from 'vitest/config'
export default defineConfig({ test: { globals: true, include: ['**/*.{test,spec}.{js,ts}'] } })
CLI: Run tests using npx vitest or configured npm scripts; use --config for custom config.
Dependency Optimization: Configure server.deps properties to control externalization and inlining of modules.
Workspaces: Define workspace array with glob strings or configuration objects to run tests under different environments.

## Original Source
Vitest Testing Framework Documentation
https://vitest.dev/

## Digest of VITEST

# Vitest Documentation Digest
Retrieved Date: 2023-10-25

## Overview
Vitest is a Vite-native testing framework providing ESM, TypeScript, and JSX support powered by esbuild. It is Jest compatible and supports features such as snapshot testing, coverage reporting, and smart watch mode.

## Installation
Installation methods:
- npm: npm install -D vitest
- yarn: yarn add -D vitest
- pnpm: pnpm add -D vitest
- bun: bun add -D vitest
Requirements: Vite >= v5.0.0 and Node >= v18.0.0.

## Writing Tests
Test files must include .test. or .spec. in their filename. Example implementation:

File: sum.js
-------------------
export function sum(a, b) {
  return a + b
}
-------------------
File: sum.test.js
-------------------
import { expect, test } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
-------------------

Script addition in package.json:

{
  "scripts": {
    "test": "vitest"
  }
}

## Configuration
Vitest supports unified configuration with Vite. It leverages a vitest.config.ts file (or .js, .mjs, etc) that can override vite.config.ts.

### Methods to configure:
1. Create a dedicated vitest.config.ts file with higher priority.
2. Use CLI option --config to load a specific file.
3. Use process.env.VITEST or mode in defineConfig to conditionally modify options.

Example using Vite configuration:

/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    // Test options here
  }
})

To merge Vite and Vitest configs:

import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // Vitest options
  }
}))

## CLI Options
Vitest can be run directly via npx vitest, and supports options such as:
- --watch: Enable watch mode (default in interactive environments).
- --run: Execute tests once.
- --config: Specify a configuration file path.
- --coverage: Run coverage with vitest run --coverage.

Vitest automatically installs dependencies if missing (can be disabled with VITEST_SKIP_INSTALL_CHECKS=1).

## Workspaces Support
Vitest workspaces allow running different configurations in a single project. Example configuration:

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

## Dependency Optimization
Vitest provides configuration for dependency resolution within the test environment:
- server.deps.external: Default is [/\/node_modules\//].
- server.deps.inline: Optional list for inlining modules.
- deps.optimizer: Options to bundle external libraries using esbuild.

## Troubleshooting and Best Practices
- For Bun users, use bun run test instead of bun test.
- Use the same configuration file to avoid conflicts between Vite and Vitest, or merge configurations using mergeConfig.
- When debugging, consider that optimized dependencies are stored in node_modules/.vite.
- Configure globals via --globals or by setting globals: true in the config.

## Attribution
Crawled from https://vitest.dev/ with data size 25402523 bytes and 21676 links found.

## Attribution
- Source: Vitest Testing Framework Documentation
- URL: https://vitest.dev/
- License: MIT
- Crawl Date: 2025-05-01T13:48:00.179Z
- Data Size: 25402523 bytes
- Links Found: 21676

## Retrieved
2025-05-01
