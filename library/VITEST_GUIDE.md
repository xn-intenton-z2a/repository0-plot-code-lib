# VITEST_GUIDE

## Crawl Summary
Installation: npm|yarn|pnpm|bun add -D vitest; requires Vite>=v5.0.0, Node>=v18.0.0. Writing Tests: sum.js exports sum(a:number,b:number):number; sum.test.js uses import {test,expect} from vitest; test name contains .test. or .spec.; add "test":"vitest" script. Configuration: priorities—vitest.config.ts > --config > env.VITEST/mode; supported ext js,mjs,cjs,ts,cts,mts; standalone defineConfig and Vite-integrated defineConfig with triple-slash; mergeConfig(viteConfig,defineConfig). Workspaces: test.workspace array of glob patterns or objects with test:{name,root,environment,setupFiles}. CLI: scripts test,coverage; vitest run [--coverage][--port <n>][--https]; npx vitest --help. Env Vars: VITEST_SKIP_INSTALL_CHECKS=1. Unreleased commits: npm i https://pkg.pr.new/vitest@{commit}; local build/link steps.

## Normalised Extract
Table of Contents:
1. Installation requirements and commands
2. Test Writing example and naming conventions
3. Configuration file hierarchy and supported extensions
4. defineConfig and mergeConfig usage patterns
5. Workspaces configuration structure
6. CLI commands and options
7. Environment variable controls
8. Using unreleased commits and local linking

1. Installation requirements and commands
   - Vite >= v5.0.0
   - Node >= v18.0.0
   - npm install -D vitest
   - yarn add -D vitest
   - pnpm add -D vitest
   - bun add -D vitest

2. Test Writing example and naming conventions
   - sum.js: export function sum(a: number, b: number): number { return a + b }
   - sum.test.js: import { expect, test } from 'vitest'; import { sum } from './sum.js'; test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3) })
   - File name must include .test. or .spec.
   - Add script to package.json: "test": "vitest"

3. Configuration file hierarchy and supported extensions
   - Priority: vitest.config.ts > --config <path> > process.env.VITEST or defineConfig mode
   - Supported extensions: js, mjs, cjs, ts, cts, mts

4. defineConfig and mergeConfig usage patterns
   - defineConfig signature: defineConfig({ test: { /*options*/ } })
   - Vite integration: add triple-slash reference types="vitest/config"
   - mergeConfig usage: mergeConfig(viteConfig, defineConfig({ test: { /*options*/ } }))

5. Workspaces configuration structure
   - workspace: array of strings or objects
   - object shape: test:{ name:string, root:string, environment:string, setupFiles:string[] }

6. CLI commands and options
   - Scripts in package.json: "test": "vitest", "coverage": "vitest run --coverage"
   - vitest run [--coverage] [--port <number>] [--https]
   - Full list: npx vitest --help

7. Environment variable controls
   - VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency installation prompts

8. Using unreleased commits and local linking
   - Install specific commit: npm i https://pkg.pr.new/vitest@{commit}
   - Local build & link steps: git clone, pnpm install, pnpm run build, pnpm link --global

## Supplementary Details
- Minimum requirements: Vite>=5.0.0, Node>=18.0.0
- Test file naming pattern: *.test.* or *.spec.*
- Config file order: vitest.config.ts, CLI --config, environment
- Supported config file extensions: .js, .mjs, .cjs, .ts, .cts, .mts
- defineConfig imported from 'vitest/config'; returns provided config object
- mergeConfig imported from 'vitest/config'; inputs base config and override config, outputs merged config
- Workspace config keys: name (string), root (string), environment (‘node’|’happy-dom’|others), setupFiles (string[])
- CLI default scripts: ‘test’ invokes vitest, ‘coverage’ invokes vitest run --coverage
- CLI flags: --coverage (boolean), --port <number>, --https (boolean)
- Env var VITEST_SKIP_INSTALL_CHECKS default='0', set to '1' to disable prompts
- Warning: Bun users must use ‘bun run test’ to invoke Vitest
- Unreleased commit installation URL pattern: https://pkg.pr.new/vitest@{commit}
- Local linking steps sequence: clone, pnpm install, build, pnpm link, project pnpm link

## Reference Details
// Core API
Function test(name: string, fn: () => unknown): void
Interface Matchers<T> { toBe(expected: T): void; toEqual(expected: any): void; }
Function expect<T>(value: T): Matchers<T>

// Config utilities
Function defineConfig<C>(config: C): C
Function mergeConfig<A,B>(base: A, override: B): A & B

// CLI usage
Binary: vitest [command] [options]
Commands:
• vitest run             Runs tests once (no watch)
• vitest                 Starts in watch mode
Options:
• --config <path>        string   Path to config file (default: vite.config.ts or vitest.config.ts)
• --coverage             boolean  Generate coverage report (default: false)
• --port <number>        number   Dev server port (default: 51272)
• --https                boolean  Enable HTTPS (default: false)
• --help                 boolean  Show help

// Vite/Vitest config test options (partial)
interface VitestConfig {
  workspace?: Array<string | { test: { name: string; root: string; environment: string; setupFiles: string[] } }>;
  root?: string;
  environment?: string;
  setupFiles?: string[];
  globals?: boolean;
  threads?: boolean;
  timeout?: number;
  include?: string[];
  exclude?: string[];
}

// package.json scripts
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}

// Best practices
- Use single config file for Vite and Vitest
- Name test files with .test. or .spec.
- Disable dependency prompts in CI: set VITEST_SKIP_INSTALL_CHECKS=1

// Troubleshooting
1. Bun test runner conflict: use `bun run test`
2. Missing dependencies prompts: set VITEST_SKIP_INSTALL_CHECKS=1
3. Merge Vite and Vitest configs: use mergeConfig to avoid override issues
4. Unreleased local version:
   $ git clone https://github.com/vitest-dev/vitest.git
   $ pnpm install
   $ pnpm run build
   $ pnpm link --global
   $ pnpm link --global vitest

// Example test output
$ npm run test
✓ sum.test.js (1)
  ✓ adds 1 + 2 to equal 3

Test Files 1 passed (1)
Tests 1 passed (1)
Start at 02:15:44
Duration 311ms

## Information Dense Extract
Install: npm|yarn|pnpm|bun add -D vitest; requires Vite>=5.0.0, Node>=18.0.0. Test API: test(name:string,fn():void), expect<T>(val).toBe(exp). Config: vitest.config.ts>--config>env.VITEST; ext js,mjs,cjs,ts,cts,mts. defineConfig({test:{…}}), mergeConfig(viteConfig,defineConfig({test:{…}})). Workspace: string|{test:{name,root,environment,setupFiles[]}}[]. CLI: vitest run [--coverage][--port <n>][--https]; scripts test, coverage. Env var: VITEST_SKIP_INSTALL_CHECKS=1. Bun: use bun run test. Unreleased: npm i https://pkg.pr.new/vitest@{commit}; clone,pnpm install,build,link.

## Sanitised Extract
Table of Contents:
1. Installation requirements and commands
2. Test Writing example and naming conventions
3. Configuration file hierarchy and supported extensions
4. defineConfig and mergeConfig usage patterns
5. Workspaces configuration structure
6. CLI commands and options
7. Environment variable controls
8. Using unreleased commits and local linking

1. Installation requirements and commands
   - Vite >= v5.0.0
   - Node >= v18.0.0
   - npm install -D vitest
   - yarn add -D vitest
   - pnpm add -D vitest
   - bun add -D vitest

2. Test Writing example and naming conventions
   - sum.js: export function sum(a: number, b: number): number { return a + b }
   - sum.test.js: import { expect, test } from 'vitest'; import { sum } from './sum.js'; test('adds 1 + 2 to equal 3', () => { expect(sum(1, 2)).toBe(3) })
   - File name must include .test. or .spec.
   - Add script to package.json: 'test': 'vitest'

3. Configuration file hierarchy and supported extensions
   - Priority: vitest.config.ts > --config <path> > process.env.VITEST or defineConfig mode
   - Supported extensions: js, mjs, cjs, ts, cts, mts

4. defineConfig and mergeConfig usage patterns
   - defineConfig signature: defineConfig({ test: { /*options*/ } })
   - Vite integration: add triple-slash reference types='vitest/config'
   - mergeConfig usage: mergeConfig(viteConfig, defineConfig({ test: { /*options*/ } }))

5. Workspaces configuration structure
   - workspace: array of strings or objects
   - object shape: test:{ name:string, root:string, environment:string, setupFiles:string[] }

6. CLI commands and options
   - Scripts in package.json: 'test': 'vitest', 'coverage': 'vitest run --coverage'
   - vitest run [--coverage] [--port <number>] [--https]
   - Full list: npx vitest --help

7. Environment variable controls
   - VITEST_SKIP_INSTALL_CHECKS=1 disables automatic dependency installation prompts

8. Using unreleased commits and local linking
   - Install specific commit: npm i https://pkg.pr.new/vitest@{commit}
   - Local build & link steps: git clone, pnpm install, pnpm run build, pnpm link --global

## Original Source
Vitest Testing Guide
https://vitest.dev/guide/

## Digest of VITEST_GUIDE

# Installation

Requirements:
- Vite >= v5.0.0
- Node >= v18.0.0

Install Vitest:
- npm install -D vitest
- yarn add -D vitest
- pnpm add -D vitest
- bun add -D vitest

# Writing Tests

sum.js
```js
export function sum(a: number, b: number): number {
  return a + b
}
```

sum.test.js
```js
import { expect, test } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```

File Naming:
- Must include .test. or .spec. in filename

Add script to package.json:
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

Run tests:
```bash
npm run test
# or yarn test
# or pnpm test
```  

Expected Output:
```
✓ sum.test.js (1)
  ✓ adds 1 + 2 to equal 3

Test Files  1 passed (1)
     Tests  1 passed (1)
  Start at  02:15:44
  Duration  311ms
```

Warning (Bun):
- Use `bun run test` instead of `bun test` to avoid Bun's own runner.

# Configuration

Config file priority:
1. vitest.config.ts (highest)
2. CLI option `--config <path>`
3. process.env.VITEST or mode in defineConfig (defaults to test)

Supported config extensions:
- .js, .mjs, .cjs, .ts, .cts, .mts (no .json)

Vitest config (standalone):
```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    /* options */
  }
})
```

Vite-integrated config:
```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    /* options */
  }
})
```

Merge Vite and Vitest configs:
```js
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config.mjs'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      /* options */
    }
  })
)
```

# Workspaces Support

Define multiple configs/test sets in vitest.config.ts:
```ts
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
          setupFiles: ['./setup.happy-dom.ts'],
        }
      },
      {
        test: {
          name: 'node',
          root: './shared_tests',
          environment: 'node',
          setupFiles: ['./setup.node.ts'],
        }
      }
    ]
  }
})
```

# Command Line Interface

Default npm scripts:
```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

Run once (no watch):
```bash
vitest run [--coverage] [--port <number>] [--https]
```  
Full list: `npx vitest --help`

# Automatic Dependency Installation

Disable prompts:
```bash
export VITEST_SKIP_INSTALL_CHECKS=1
```

# Unreleased Commits

Install a specific commit from main:
```bash
npm i https://pkg.pr.new/vitest@{commit}
```

Local build & link:
```bash
git clone https://github.com/vitest-dev/vitest.git
cd vitest
pnpm install
cd packages/vitest
pnpm run build
pnpm link --global
# In your project:
pnpm link --global vitest
```

Data Size: 19056011 bytes
Links Found: 18051
Retrieved: 2024-06-17

## Attribution
- Source: Vitest Testing Guide
- URL: https://vitest.dev/guide/
- License: MIT
- Crawl Date: 2025-05-10T17:02:46.427Z
- Data Size: 19056011 bytes
- Links Found: 18051

## Retrieved
2025-05-10
