# VITEST_CONFIG

## Crawl Summary
Installation commands (npm, yarn, pnpm, bun) with Vite>=5.0.0 and Node>=18.0.0; Test file detection '**/*.{test,spec}.?(c|m)[jt]s?(x)'; Config resolution order: vite.config.ts, vitest.config.ts, --config, env VITEST; Supported config extensions (.js,.mjs,.cjs,.ts,.cts,.mts); CLI flags with defaults: --config, --run, --watch, --update, --environment, --port, --https, --globals, --skip-install-checks, --coverage, --reporter, --outputFile; Workspace array patterns and inline config objects; Dependency resolution options (external, inline, moduleDirectories, optimizer.web, optimizer.ssr) with defaults; Environment options and custom environment interface; Pools settings (threads,forks,vmThreads,vmForks); Example package.json scripts: test, coverage.

## Normalised Extract
Table of Contents
1 Installation
2 Writing Tests
3 Configuration Resolution
4 CLI Options
5 Workspaces Support
6 Dependency Optimization
7 Environments
8 Runner Pools

1 Installation
Commands:
  npm install -D vitest
  yarn add -D vitest
  pnpm add -D vitest
  bun add -D vitest
Requirements: Vite >=5.0.0, Node >=18.0.0

2 Writing Tests
Default file patterns: **/*.{test,spec}.?(c|m)[jt]s?(x)
Default snapshot extension: .test or .spec in filename
Basic API: import { test, expect } from 'vitest'
Example:
  export function sum(a,b){return a+b}
  test('adds',()=>expect(sum(1,2)).toBe(3))
Add to package.json scripts: { "test":"vitest" }

3 Configuration Resolution
Precedence:
  1 vite.config.[js,mjs,cjs,ts,cts,mts] with test property
  2 vitest.config.[js,mjs,cjs,ts,cts,mts]
  3 CLI --config override
Conditionals via process.env.VITEST or defineConfig({mode})
Supported extensions: .js .mjs .cjs .ts .cts .mts (no .json)

4 CLI Options
--config <path>         config file path lookup
--run                   run tests once
-w, --watch             enable watch mode (true if interactive)
-u, --update            update snapshots
--environment=<env>     node|jsdom|happy-dom|edge-runtime|custom
--port <n>              server port
--https                 https server
--globals               enable global APIs
--skip-install-checks   VITEST_SKIP_INSTALL_CHECKS=1
--coverage              alias run --coverage
--reporter <name|path>  built-in or custom
--outputFile <path>     output file for json/html/junit reports

5 Workspaces Support
In vitest.config.ts:
  test.workspace: Array<glob|config> where config includes name, root, environment, setupFiles
Examples: 'packages/*', {test:{name:'node',root:'./shared',environment:'node',setupFiles:['./setup.ts']}}

6 Dependency Optimization
test.deps.external: RegExp[] default [/\/node_modules\//]
test.deps.inline: Array|string|true default []
test.deps.moduleDirectories: string[] default ['node_modules']
test.deps.optimizer.web: {enabled:boolean, include:string[], exclude:string[], transformAssets:boolean, transformCss:boolean}
test.deps.optimizer.ssr: {enabled:boolean, include:string[], exclude:string[]}

7 Environments
Default: node
Builtin alternatives: jsdom, happy-dom, edge-runtime
Custom: export default <Environment>{name,transformMode,setup()}
Docblock syntax: /** @vitest-environment jsdom */

8 Runner Pools
Default: forks
types: threads, forks, vmThreads, vmForks

## Supplementary Details
Default test.include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
Default test.exclude: ['**/node_modules/**','**/dist/**','**/cypress/**','**/.{idea,git,cache,output,temp}/**','**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
Default coverage.exclude inherits test.include patterns
VITEST_SKIP_INSTALL_CHECKS disables prompts
To use globals API in TS: add 'vitest/globals' to tsconfig.types
To use jsdom globals: add 'vitest/jsdom' to tsconfig.types
Merge configs via mergeConfig(viteConfig, defineConfig({test:{}}))
Workspace configs cannot override certain root-only options (indicated by *)
Automatic dependency install: disabled by VITEST_SKIP_INSTALL_CHECKS
IDE integration: official VS Code extension
Examples repos available via GitHub playground links

## Reference Details
import { defineConfig, mergeConfig, configDefaults } from 'vitest/config'

// defineConfig signature
declare function defineConfig(config: UserConfig & { test?: TestConfig }): UserConfig & { test?: TestConfig }

interface TestConfig {
  include?: string[] // default ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
  exclude?: string[] // default [node_modules,dist,...]
  includeSource?: string[]
  name?: string
  root?: string
  dir?: string
  coverage?: boolean
  globals?: boolean
  environment?: string
  environmentOptions?: Record<string,unknown>
  workspace?: Array<string | WorkspaceConfig>
  runner?: string
  update?: boolean
  watch?: boolean
  reporters?: Array<string | Reporter>
  outputFile?: string | Record<string,string>
  pool?: 'threads'|'forks'|'vmThreads'|'vmForks'
  deps?: {
    external?: Array<string|RegExp>
    inline?: Array<string|RegExp> | true
    moduleDirectories?: string[]
    optimizer?: {
      web?: {enabled:boolean;include:string[];exclude:string[];transformAssets:boolean;transformCss:boolean}
      ssr?: {enabled:boolean;include:string[];exclude:string[]}
    }
  }
  server?: {
    sourcemap?: 'inline'|boolean
    debug?: {dumpModules?:boolean|string;loadDumppedModules?:boolean}
    deps?: {external?:Array<string|RegExp>;inline?:Array<string|RegExp>|true;fallbackCJS?:boolean;cacheDir?:string}
  }
}

// Example: merge Vite and Vitest
import viteConfig from './vite.config'
export default mergeConfig(viteConfig, defineConfig({
 test:{ exclude:['packages/template/*'] }
}))

// CLI usage examples
npx vitest --config ./vitest.config.ts --environment jsdom --globals --port 3000 --https

// Troubleshooting
// Bun users must run: bun run test
// To skip dependency checks: export VITEST_SKIP_INSTALL_CHECKS=1
// If tests not found, ensure filenames include .test. or .spec.
// To debug transformer: enable server.debug.dumpModules=true and inspect cacheDir


## Information Dense Extract
install: npm|yarn|pnpm|bun add -D vitest; requires Vite>=5.0.0,Node>=18.0.0; tests: **/*.{test,spec}.?(c|m)[jt]s?(x); config: vite.config.* then vitest.config.* then --config; extensions: .js,.mjs,.cjs,.ts,.cts,.mts; CLI: --config, --run, -w/--watch, -u/--update, --environment, --port, --https, --globals, --skip-install-checks, --coverage, --reporter, --outputFile; defaults: test.include=['**/*.{test,spec}.?(c|m)[jt]s?(x)'],exclude=['**/node_modules/**',...]; deps.external=[/\/node_modules\//],deps.inline=[],optimizer.web/ssr disabled by default; workspace: glob|string config objects; environments: node/jsdom/happy-dom/edge-runtime/custom via Environment interface; pools: forks(default)/threads/vmThreads/vmForks; defineConfig(config:UserConfig&{test?:TestConfig}) => merged config; troubleshooting: bun run test, VITEST_SKIP_INSTALL_CHECKS=1, filenames pattern, server.debug.dumpModules

## Sanitised Extract
Table of Contents
1 Installation
2 Writing Tests
3 Configuration Resolution
4 CLI Options
5 Workspaces Support
6 Dependency Optimization
7 Environments
8 Runner Pools

1 Installation
Commands:
  npm install -D vitest
  yarn add -D vitest
  pnpm add -D vitest
  bun add -D vitest
Requirements: Vite >=5.0.0, Node >=18.0.0

2 Writing Tests
Default file patterns: **/*.{test,spec}.?(c|m)[jt]s?(x)
Default snapshot extension: .test or .spec in filename
Basic API: import { test, expect } from 'vitest'
Example:
  export function sum(a,b){return a+b}
  test('adds',()=>expect(sum(1,2)).toBe(3))
Add to package.json scripts: { 'test':'vitest' }

3 Configuration Resolution
Precedence:
  1 vite.config.[js,mjs,cjs,ts,cts,mts] with test property
  2 vitest.config.[js,mjs,cjs,ts,cts,mts]
  3 CLI --config override
Conditionals via process.env.VITEST or defineConfig({mode})
Supported extensions: .js .mjs .cjs .ts .cts .mts (no .json)

4 CLI Options
--config <path>         config file path lookup
--run                   run tests once
-w, --watch             enable watch mode (true if interactive)
-u, --update            update snapshots
--environment=<env>     node|jsdom|happy-dom|edge-runtime|custom
--port <n>              server port
--https                 https server
--globals               enable global APIs
--skip-install-checks   VITEST_SKIP_INSTALL_CHECKS=1
--coverage              alias run --coverage
--reporter <name|path>  built-in or custom
--outputFile <path>     output file for json/html/junit reports

5 Workspaces Support
In vitest.config.ts:
  test.workspace: Array<glob|config> where config includes name, root, environment, setupFiles
Examples: 'packages/*', {test:{name:'node',root:'./shared',environment:'node',setupFiles:['./setup.ts']}}

6 Dependency Optimization
test.deps.external: RegExp[] default [/'/node_modules'//]
test.deps.inline: Array|string|true default []
test.deps.moduleDirectories: string[] default ['node_modules']
test.deps.optimizer.web: {enabled:boolean, include:string[], exclude:string[], transformAssets:boolean, transformCss:boolean}
test.deps.optimizer.ssr: {enabled:boolean, include:string[], exclude:string[]}

7 Environments
Default: node
Builtin alternatives: jsdom, happy-dom, edge-runtime
Custom: export default <Environment>{name,transformMode,setup()}
Docblock syntax: /** @vitest-environment jsdom */

8 Runner Pools
Default: forks
types: threads, forks, vmThreads, vmForks

## Original Source
Vitest Documentation
https://vitest.dev/

## Digest of VITEST_CONFIG

# Vitest Configuration and Usage

Date Retrieved: 2024-06-14
Attribution: https://vitest.dev/ (Data Size: 38084111 bytes)

# Installation
```bash
npm install -D vitest      # npm
yarn add -D vitest         # yarn
pnpm add -D vitest         # pnpm
bun add -D vitest          # bun
```
Requirements: Vite >=5.0.0, Node >=18.0.0

# Writing Tests
By default, Vitest detects files matching **/*.{test,spec}.?(c|m)[jt]s?(x)
Example:
```js
// sum.js
export function sum(a, b) {
  return a + b
}

// sum.test.js
import { test, expect } from 'vitest'
import { sum } from './sum.js'

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3)
})
```
Add to package.json:
```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

# Configuration Resolution
1. Read vite.config.[js,mjs,cjs,ts,cts,mts] if it contains test property.
2. Read vitest.config.[js,mjs,cjs,ts,cts,mts].
3. --config CLI flag overrides files.
4. process.env.VITEST or defineConfig mode property for conditional logic.
Supports .js, .mjs, .cjs, .ts, .cts, .mts (no .json).

# CLI Options
`vitest [run] [options]`
- --config <path>          path to config file
- --run                    run tests once (skip watch)
- -w, --watch              watch mode (default: true unless CI)
- -u, --update             update snapshots (default: false)
- --environment=<env>      node|jsdom|happy-dom|edge-runtime|custom (default: node)
- --port <number>          dev server port
- --https                  enable HTTPS
- --globals                enable global APIs (default: false)
- --skip-install-checks    bypass dependency prompts (env VITEST_SKIP_INSTALL_CHECKS=1)
- --coverage               alias: run --coverage
- --reporter <name|path>   built-in or custom reporter
- --outputFile <path>      write output when using json/html/junit reporter

# Workspaces Support
```ts
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    workspace: [
      'packages/*',
      'tests/*/vitest.config.{e2e,unit}.ts',
      { test: { name: 'happy-dom', root: './shared_tests', environment: 'happy-dom', setupFiles: ['./setup.happy-dom.ts'] } },
      { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } }
    ]
  }
})
```

# Dependency Optimization
```ts
export default defineConfig({
  test: {
    deps: {
      external: [/\/node_modules\//],
      inline: [],
      moduleDirectories: ['node_modules'],
      optimizer: {
        web: { enabled: false, include: [], exclude: [], transformAssets: true, transformCss: true },
        ssr: { enabled: false, include: [], exclude: [] }
      }
    }
  }
})
```

# Environments
Builtin: node, jsdom, happy-dom, edge-runtime
Custom:
```ts
import type { Environment } from 'vitest'
export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    return { teardown() {} }
  }
}
```
Docblock: /** @vitest-environment jsdom */

# Runner Pools
Default: forks
Options: threads (worker_threads), forks (child_process), vmThreads (VM+threads), vmForks (VM+forks)


## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev/
- License: License: MIT
- Crawl Date: 2025-05-03T22:27:29.229Z
- Data Size: 38084111 bytes
- Links Found: 25804

## Retrieved
2025-05-03
