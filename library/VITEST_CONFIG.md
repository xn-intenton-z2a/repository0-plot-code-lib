# VITEST_CONFIG

## Crawl Summary
Installation commands: npm/yarn/pnpm/bun add -D vitest; require Vite>=5, Node>=18; add scripts test:vitest, coverage:vitest run --coverage; run via npm/yarn/pnpm/bun test. Vitest reads vite.config and vitest.config; supported ext: js,mjs,cjs,ts,cts,mts; defineConfig and mergeConfig from 'vitest/config'. Default test.include '**/*.{test,spec}.?(c|m)[jt]s?(x)'; test.exclude '**/node_modules/**','**/dist/**','**/.{idea,git,cache,output,temp}/**','**/{karma,...}.config.*'; includeSource []; globals false; environment 'node'; reporters 'default'; pool 'forks'; watch true in interactive; update false. server.deps.external [/\/node_modules\//]; inline []; fallbackCJS false; cacheDir 'node_modules/.vite'. deps.optimizer enabled false. deps.web.transformAssets true; transformCss true; interopDefault true; moduleDirectories ['node_modules']. workspace support via glob list or config objects. Custom environment via package 'vitest-environment-name'. CLI flags: --config, --watch, --update, --globals, --environment, --pool, --port, --https. Troubleshoot by env VITEST_SKIP_INSTALL_CHECKS, bun run test note.

## Normalised Extract
Table of Contents
1. Installation and Setup
2. Test File Patterns
3. CLI Usage
4. Configuration File Setup
5. Core Configuration Options
6. Workspaces
7. Environment Definition
8. Dependency Resolution
9. Worker Pools
10. Reporting and Output
11. Troubleshooting

1. Installation and Setup
  • npm install -D vitest
  • yarn add -D vitest
  • pnpm add -D vitest
  • bun add -D vitest
  Requirements: Vite>=5.0.0, Node>=18.0.0
  In package.json:
    scripts:
      test: vitest
      coverage: vitest run --coverage

2. Test File Patterns
  test.include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
  test.exclude: ['**/node_modules/**','**/dist/**','**/.{idea,git,cache,output,temp}/**','**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
  test.includeSource: []  // run files with import.meta.vitest

3. CLI Usage
  vitest [options]
  vitest run [--coverage]
  Flags:
    --config <path>
    --watch, -w  (default: !CI && TTY)
    --update, -u (default: false)
    --globals    (default: false)
    --environment <env>
    --pool <threads|forks|vmThreads|vmForks>
    --port <number>
    --https

4. Configuration File Setup
  Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts
  Priority: vitest.config.ts/js > vite.config.ts/js
  Add triple-slash reference for types:
    /// <reference types="vitest/config" />
  Basic config:
    import { defineConfig } from 'vitest/config'
    export default defineConfig({ test: { /* options */ } })
  Merge with Vite config:
    import { mergeConfig } from 'vitest/config'
    export default mergeConfig(viteConfig, defineConfig({ test: { /* override */ } }))

5. Core Configuration Options
  test.name: string
  test.root: string    // CLI --root
  test.dir: string     // CLI --dir
  test.watch: boolean  // default: !CI && TTY
  test.update: boolean // default: false
  test.globals: boolean// default: false
  test.environment: string // default: 'node'
  test.alias: Record<string,string> or Array<{find,replacement,customResolver?>}

6. Workspaces
  test.workspace: Array<glob:string or config object>
    glob => include sub-project
    config object => overrides per project

7. Environment Definition
  Built-ins: node, jsdom, happy-dom, edge-runtime
  Custom:
    export default { name, transformMode: 'ssr'|'web', setup(): { teardown() } }
  Docblock override:
    /** @vitest-environment jsdom */

8. Dependency Resolution
  server.deps.external: [/\/node_modules\//]
  server.deps.inline: [] or true
  server.deps.fallbackCJS: false
  server.deps.cacheDir: 'node_modules/.vite'
  deps.optimizer.ssr.enabled: false
  deps.optimizer.web.enabled: false
  deps.web.transformAssets: true
  deps.web.transformCss: true
  deps.interopDefault: true
  deps.moduleDirectories: ['node_modules']

9. Worker Pools
  test.pool: threads | forks | vmThreads | vmForks
  Default: forks
  Threads: worker_threads
  Forks: child_process

10. Reporting and Output
  test.reporters: 'default' or Array of built-in names or instances or paths
  test.outputFile: string or Record<string,string>
  benchmark.reporters, outputJson, compare via similar options

11. Troubleshooting
  disable prompts: export VITEST_SKIP_INSTALL_CHECKS=1
  update snapshots: --update
  enforce config use: --config <path>


## Supplementary Details
Installation commands with environment variables
  VITEST_SKIP_INSTALL_CHECKS=1 npm run test

Package.json snippet:
  "devDependencies": { "vitest": "^3.1.3" },
  "scripts": { "test": "vitest", "coverage": "vitest run --coverage" }

TypeScript config:
  tsconfig.json:
    compilerOptions.types += ["vitest/globals","vitest/jsdom"]

VSCode extension from Marketplace: vitest.vitest

CI configuration snippet:
  - name: Run Vitest
    run: npm test
    env:
      CI: true
      VITEST_SKIP_INSTALL_CHECKS: 1

Custom runner signature:
  type VitestRunnerConstructor = (config: any)=>Runner

Workspaces example:
  test: { workspace: ["packages/*","tests/*/vitest.config.ts"] }


## Reference Details
API defineConfig
  defineConfig(config: UserConfig): UserConfig

API mergeConfig
  mergeConfig<A,B>(a: A, b: B): A & B

UserConfig.test: {
  include?: string[]
  exclude?: string[]
  includeSource?: string[]
  name?: string
  root?: string
  dir?: string
  watch?: boolean
  update?: boolean
  globals?: boolean
  environment?: string
  alias?: Record<string,string>|Array<{find:string|RegExp,replacement:string,customResolver?:any}>
  server?: {
    sourcemap?: 'inline'|boolean
    debug?: { dumpModules?: boolean|string, loadDumppedModules?: boolean }
    deps?: {
      external?: (string|RegExp)[]
      inline?: (string|RegExp)[]|true
      fallbackCJS?: boolean
      cacheDir?: string
    }
  }
  deps?: {
    optimizer?: { ssr?:{enabled:boolean,include?:string[],exclude?:string[]}, web?:{enabled:boolean,include?:string[],exclude?:string[]} }
    web?: { transformAssets?: boolean, transformCss?: boolean, transformGlobPattern?: RegExp|RegExp[] }
    interopDefault?: boolean
    moduleDirectories?: string[]
  }
  runner?: string
  benchmark?: {
    include?: string[]
    exclude?: string[]
    includeSource?: string[]
    reporters?: Array<string|Reporter>
    outputJson?: string
    compare?: string
  }
  reporters?: string[]|Reporter[]
  outputFile?: string|Record<string,string>
  pool?: 'threads'|'forks'|'vmThreads'|'vmForks'
}

CLI options
  --config <path>
  --watch, -w
  --run
  --update, -u
  --globals
  --environment <env>
  --pool <mode>
  --port <number>
  --https

Best Practices:
  • Use single config file for Vite and Vitest
  • Alias node_modules via npm: prefix
  • Inline assets via deps.web.transformAssets
  • Use mergeConfig to avoid duplication

Troubleshooting Steps:
  $ export VITEST_SKIP_INSTALL_CHECKS=1
  $ vitest --config ./vitest.config.ts --run
  Expected exit code 0


## Information Dense Extract
install: npm install -D vitest; require Vite>=5,Node>=18; scripts: test:vitest,cov:vitest run --coverage; configFile: vitest.config.ts higher priority; defaults: include['**/*.{test,spec}.?(c|m)[jt]s?(x)'],exclude['**/node_modules/**','**/dist/**',...],globals:false,env:'node',pool:'forks',watch:!CI&&TTY,update:false; CLI: --config,--watch,-w,--update,-u,--globals,--environment,--pool,--port,--https; defineConfig(UserConfig)->UserConfig; mergeConfig(a,b)->a&b; UserConfig.test includes include?,exclude?,includeSource?,name?,root?,dir?,watch?,update?,globals?,environment?,alias?,server{deps{external?,inline?,fallbackCJS?,cacheDir?}},deps{optimizer{ssr{enabled?,include?,exclude?},web{enabled?,include?,exclude?}},web{transformAssets?,transformCss?,transformGlobPattern?},interopDefault?,moduleDirectories?},runner?,benchmark{include?,exclude?,includeSource?,reporters?,outputJson?,compare?},reporters?,outputFile?,pool?; workspaces:Array<string|config>; custom env: {name,transformMode,setup()->{teardown()}}; disable install checks: VITEST_SKIP_INSTALL_CHECKS=1; snapshot update: -u; mergeConfig to combine vite and vitest configs.

## Sanitised Extract
Table of Contents
1. Installation and Setup
2. Test File Patterns
3. CLI Usage
4. Configuration File Setup
5. Core Configuration Options
6. Workspaces
7. Environment Definition
8. Dependency Resolution
9. Worker Pools
10. Reporting and Output
11. Troubleshooting

1. Installation and Setup
   npm install -D vitest
   yarn add -D vitest
   pnpm add -D vitest
   bun add -D vitest
  Requirements: Vite>=5.0.0, Node>=18.0.0
  In package.json:
    scripts:
      test: vitest
      coverage: vitest run --coverage

2. Test File Patterns
  test.include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
  test.exclude: ['**/node_modules/**','**/dist/**','**/.{idea,git,cache,output,temp}/**','**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
  test.includeSource: []  // run files with import.meta.vitest

3. CLI Usage
  vitest [options]
  vitest run [--coverage]
  Flags:
    --config <path>
    --watch, -w  (default: !CI && TTY)
    --update, -u (default: false)
    --globals    (default: false)
    --environment <env>
    --pool <threads|forks|vmThreads|vmForks>
    --port <number>
    --https

4. Configuration File Setup
  Supported extensions: .js, .mjs, .cjs, .ts, .cts, .mts
  Priority: vitest.config.ts/js > vite.config.ts/js
  Add triple-slash reference for types:
    /// <reference types='vitest/config' />
  Basic config:
    import { defineConfig } from 'vitest/config'
    export default defineConfig({ test: { /* options */ } })
  Merge with Vite config:
    import { mergeConfig } from 'vitest/config'
    export default mergeConfig(viteConfig, defineConfig({ test: { /* override */ } }))

5. Core Configuration Options
  test.name: string
  test.root: string    // CLI --root
  test.dir: string     // CLI --dir
  test.watch: boolean  // default: !CI && TTY
  test.update: boolean // default: false
  test.globals: boolean// default: false
  test.environment: string // default: 'node'
  test.alias: Record<string,string> or Array<{find,replacement,customResolver?>}

6. Workspaces
  test.workspace: Array<glob:string or config object>
    glob => include sub-project
    config object => overrides per project

7. Environment Definition
  Built-ins: node, jsdom, happy-dom, edge-runtime
  Custom:
    export default { name, transformMode: 'ssr'|'web', setup(): { teardown() } }
  Docblock override:
    /** @vitest-environment jsdom */

8. Dependency Resolution
  server.deps.external: [/'/node_modules'//]
  server.deps.inline: [] or true
  server.deps.fallbackCJS: false
  server.deps.cacheDir: 'node_modules/.vite'
  deps.optimizer.ssr.enabled: false
  deps.optimizer.web.enabled: false
  deps.web.transformAssets: true
  deps.web.transformCss: true
  deps.interopDefault: true
  deps.moduleDirectories: ['node_modules']

9. Worker Pools
  test.pool: threads | forks | vmThreads | vmForks
  Default: forks
  Threads: worker_threads
  Forks: child_process

10. Reporting and Output
  test.reporters: 'default' or Array of built-in names or instances or paths
  test.outputFile: string or Record<string,string>
  benchmark.reporters, outputJson, compare via similar options

11. Troubleshooting
  disable prompts: export VITEST_SKIP_INSTALL_CHECKS=1
  update snapshots: --update
  enforce config use: --config <path>

## Original Source
Vitest Documentation
https://vitest.dev/

## Digest of VITEST_CONFIG

# Getting Started

## Installation

Use one of the following commands to add Vitest to your project:

  npm install -D vitest
  yarn add -D vitest
  pnpm add -D vitest
  bun add -D vitest

Requirements: Vite >= 5.0.0, Node.js >= 18.0.0.

Add to package.json:

  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }

Run tests:

  npm run test
  yarn test
  pnpm test
  bun run test

# Configuration

Vitest uses Vite config when available. You can override or extend it via a dedicated config file.

## Config File Types and Priority

1. vite.config.(js|mjs|cjs|ts|cts|mts) with test property
2. vitest.config.ts/js/mjs/cjs
3. CLI --config <path>
4. process.env.VITEST or defineConfig mode property

## Example vitest.config.ts

  import { defineConfig } from 'vitest/config'

  export default defineConfig({
    test: {
      include: ["**/*.test.ts"],
      exclude: ["node_modules",
                "dist"],
      environment: 'jsdom',
      globals: true,
      root: './',
      dir: './src'
    }
  })

## Merging Vite and Vitest Configs

  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config'

  export default mergeConfig(
    viteConfig,
    defineConfig({ test: { exclude: ['packages/template/*'] } })
  )

# Table of Contents

1. Project Setup
2. Test File Patterns
3. CLI Options
4. Configuration File
5. Config Options Reference
6. Workspaces
7. Environment
8. Dependency Handling
9. Pools
10. Reporting
11. Troubleshooting

# Normalised Extract

## 1. Project Setup

Install Vitest: npm install -D vitest
Add scripts: test: vitest, coverage: vitest run --coverage

## 2. Test File Patterns

include default: ['**/*.{test,spec}.?(c|m)[jt]s?(x)']
exclude default: ['**/node_modules/**','**/dist/**','**/.{idea,git,cache,output,temp}/**',
                  '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']
includeSource default: [] (runs files with import.meta.vitest)

## 3. CLI Options

--config <path>  use specific config
--run           alias for run once
run: vitest run [--coverage]
--watch, -w     default true in interactive
--update, -u    update snapshots
--port <n>      port for web UI
--https         enable HTTPS

## 4. Configuration File

Supported extensions: js, mjs, cjs, ts, cts, mts
vitest.config.ts higher priority than vite.config.ts
enable type references: /// <reference types="vitest/config" />

## 5. Config Options Reference

### test.include: string[]
default ['**/*.{test,spec}.?(c|m)[jt]s?(x)']

### test.exclude: string[]
default ['**/node_modules/**','**/dist/**',...]

### test.includeSource: string[]
default []

### test.name: string

default undefined (visible in CLI and API)

### test.root: string
default project root
test.dir: string default same as root

### test.globals: boolean
default false CLI --globals

### test.environment: 'node'|'jsdom'|'happy-dom'|'edge-runtime'|custom
default 'node' CLI --environment=<env>

### test.workspace: Array<glob|object>

defines multiple sub-projects

### test.alias: Record<string,string>|Array<{find,replacement,customResolver?}>

### test.server.sourcemap: 'inline'|boolean default 'inline'

### test.server.deps.external: Array<string|RegExp> default [/\/node_modules\//]

### test.server.deps.inline: Array<string|RegExp>|true default []

### test.server.deps.fallbackCJS: boolean default false

### test.server.deps.cacheDir: string default 'node_modules/.vite'

### test.deps.optimizer.ssr/web.enabled: boolean default false

### test.deps.optimizer.[mode].include/exclude: string[]

### test.deps.web.transformAssets: boolean default true

### test.deps.web.transformCss: boolean default true

### test.deps.interopDefault: boolean default true

### test.deps.moduleDirectories: string[] default ['node_modules']

### test.runner: string|VitestRunnerConstructor default 'node' or 'benchmark'

### test.benchmark.include/exclude/includeSource: string[] defaults

### test.benchmark.reporters: Arrayable<string|Reporter> default 'default'

### test.benchmark.outputJson: string|undefined default undefined

### test.benchmark.compare: string|undefined default undefined

### test.reporters: string|string[]|Reporter[] default 'default'

### test.outputFile: string|Record<string,string>

### test.pool: 'threads'|'forks'|'vmThreads'|'vmForks' default 'forks'

### test.watch: boolean default !process.env.CI && process.stdin.isTTY

### test.update: boolean default false

## 6. Workspaces

Define multiple configs:

  workspace: [
    'packages/*',
    { test: { name:'node', environment:'node', setupFiles:['./setup.node.ts'] } }
  ]

## 7. Environment

Built-ins: node, jsdom, happy-dom, edge-runtime
define custom environment:

  interface Environment {
    name: string
    transformMode: 'ssr'|'web'
    setup(): { teardown(): void }
  }

Register name via @vitest-environment docblock or CLI --environment

## 8. Dependency Handling

Externalize by default: [/node_modules/]
Inline specific deps: test.server.deps.inline

Opt-in optimizer: test.deps.optimizer.ssr/web.enabled

## 9. Pools

threads (worker_threads), forks (child_process), vmThreads, vmForks
Default: forks
enable via test.pool or CLI --pool

## 10. Reporting

reporters: specify built-ins or custom via path
outputFile writes JSON/HTML/JUNIT

## 11. Troubleshooting

Disable prompts: set VITEST_SKIP_INSTALL_CHECKS=1
enforce config: --config
update snapshots: --update

# documentNamesToBeDeleted

none

## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev/
- License: License: MIT
- Crawl Date: 2025-05-06T09:30:04.536Z
- Data Size: 35791628 bytes
- Links Found: 25405

## Retrieved
2025-05-06
