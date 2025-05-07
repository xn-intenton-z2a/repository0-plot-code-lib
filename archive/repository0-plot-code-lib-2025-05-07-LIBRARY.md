library/CSV_FORMAT.md
# library/CSV_FORMAT.md
# CSV_FORMAT

## Crawl Summary
Each CSV record is a CRLF-delimited line. Optional header line indicated via header parameter. Fields separated by comma; spaces significant. Quoting rules: quote fields containing CRLF, commas, quotes; escape internal quotes by doubling. ABNF grammar defines file, header, record, field, escaped and non-escaped forms. MIME type text/csv registered with optional charset and header parameters. File extension .CSV.

## Normalised Extract
Table of Contents:
1. Record Delimiter
2. Header Line
3. Field Separator
4. Quoting Rules
5. Escaping Double Quotes
6. ABNF Grammar
7. MIME Parameters and File Extension

1. Record Delimiter
Each record ends with CRLF (\r\n). Last record may omit trailing CRLF.

2. Header Line
Optional first line matching record format; header parameter = present|absent.

3. Field Separator
Comma (%x2C). No trailing comma after last field. Spaces are part of field content.

4. Quoting Rules
Fields may be enclosed in DQUOTE (%x22). Mandatory quoting when field includes comma, CR, LF, or quote.

5. Escaping Double Quotes
Within quoted field, represent a single quote by two sequential DQUOTE characters.

6. ABNF Grammar
file = [header CRLF] record *(CRLF record) [CRLF]
header = name *(COMMA name)
record = field *(COMMA field)
field = escaped / non-escaped
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA

7. MIME Parameters and File Extension
MIME type: text/csv
Parameters:
  charset = IANA text charsets (default US-ASCII)
  header = present | absent
File extension: CSV

## Supplementary Details
Parameters and Defaults:
- charset: US-ASCII (other IANA text charsets allowed)
- header: present | absent (default implementor choice if omitted)
- delimiter: comma
- lineBreak: CRLF

Implementation Steps:
1. Read input as bytes, convert to string using specified charset.
2. Split input on CRLF boundary, preserving empty final line.
3. If header=present, parse first line as array of names by splitting per rules.
4. For each line, parse fields:
   a. If starts with DQUOTE, read until matching unescaped DQUOTE, handling doubled DQUOTE as single quote.
   b. If unquoted, read until next COMMA or line end.
5. Return array of records (arrays of strings).

## Reference Details
API: parseCSV(input: string|Buffer, options?: {charset?: string; header?: 'present'|'absent'; delimiter?: string;}): {headers?: string[]; rows: string[][]}

Parameters:
- input: UTF-8 string or Buffer
- options.charset: IANA text charset (default 'utf-8')
- options.header: 'present' | 'absent' (default 'absent')
- options.delimiter: string (default ',')

Returns:
- headers: string[] if header=present
- rows: array of records

Code Example (Node.js):
const fs = require('fs');
const { parseCSV } = require('csv-parser');

const raw = fs.readFileSync('data.csv', {encoding: 'utf-8'});
const {headers, rows} = parseCSV(raw, {header: 'present', charset: 'utf-8'});
console.log(headers);
console.table(rows);

Best Practices:
- Normalize line breaks to CRLF before parsing.
- Trim BOM if present.
- Validate uniform field count per record; raise error if mismatch.

Troubleshooting:
Command: head -n1 data.csv | od -c
 Expected: '\\r\\n' at end-of-line; presence of '\\n' only may indicate improper line-break.
Command: node test-parser.js
 Expected: no exceptions; rows.length > 0.



## Information Dense Extract
Record Delimiter=CRLF; Last record may omit. Header optional (header=present|absent). Delimiter=COMMA. Spaces significant. Fields requiring quoting: containing comma, CR, LF, quote. Quoted fields start/end with DQUOTE; internal DQUOTE escaped as two DQUOTE. ABNF: file=[headerCRLF]record*(CRLFrecord)[CRLF]; field=escaped/non-escaped; escaped=DQUOTE*(TEXTDATA/COMMA/CR/LF/2DQUOTE)DQUOTE; non-escaped=*TEXTDATA. MIME=text/csv; params: charset (IANA text; default US-ASCII), header (present|absent). Extension=CSV.

## Sanitised Extract
Table of Contents:
1. Record Delimiter
2. Header Line
3. Field Separator
4. Quoting Rules
5. Escaping Double Quotes
6. ABNF Grammar
7. MIME Parameters and File Extension

1. Record Delimiter
Each record ends with CRLF ('r'n). Last record may omit trailing CRLF.

2. Header Line
Optional first line matching record format; header parameter = present|absent.

3. Field Separator
Comma (%x2C). No trailing comma after last field. Spaces are part of field content.

4. Quoting Rules
Fields may be enclosed in DQUOTE (%x22). Mandatory quoting when field includes comma, CR, LF, or quote.

5. Escaping Double Quotes
Within quoted field, represent a single quote by two sequential DQUOTE characters.

6. ABNF Grammar
file = [header CRLF] record *(CRLF record) [CRLF]
header = name *(COMMA name)
record = field *(COMMA field)
field = escaped / non-escaped
escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-escaped = *TEXTDATA

7. MIME Parameters and File Extension
MIME type: text/csv
Parameters:
  charset = IANA text charsets (default US-ASCII)
  header = present | absent
File extension: CSV

## Original Source
CSV (RFC 4180) Specification
https://datatracker.ietf.org/doc/html/rfc4180

## Digest of CSV_FORMAT

# CSV Format and MIME Type (RFC4180)

_Originally retrieved on 2023-10-05_

# Definition of the CSV Format

1. Each record is on its own line, delimited by CRLF (\r\n).
   Example:
   aaa,bbb,ccc\r\n
   zzz,yyy,xxx\r\n

2. Final record may omit trailing CRLF:
   aaa,bbb,ccc\r\n
   zzz,yyy,xxx

3. Optional header line, same field count as data records. Indicated by MIME parameter header=present or header=absent.
   Example:
   field1,field2,field3\r\n
   aaa,bbb,ccc\r\n

4. Fields separated by comma. Spaces are significant. No trailing comma after last field.
   Example: aaa,bbb,ccc

5. Fields may be enclosed in double quotes ("). If not quoted, embedded quotes are disallowed.
   Example: "aaa","bbb","ccc"\r\n

6. Fields with CRLF, comma, or quote must be quoted.
   Example:
   "aaa","b\r\nbb","ccc"\r\n

7. To include a double quote inside a quoted field, escape by doubling it:
   Example: "aaa","b""bb","ccc"

# ABNF Grammar

file     = [header CRLF] record *(CRLF record) [CRLF]
header   = name *(COMMA name)
record   = field *(COMMA field)
field    = escaped / non-escaped
escaped  = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
non-esc. = *TEXTDATA
COMMA    = %x2C
CR       = %x0D
LF       = %x0A
CRLF     = CR LF
DQUOTE   = %x22
TEXTDATA = %x20-21 / %x23-2B / %x2D-7E

# MIME Type Registration (text/csv)

- Type: text
- Subtype: csv
- Optional parameters:
   * charset (default US-ASCII)
   * header = present | absent
- Encoding: CRLF line breaks
- File extension: .CSV


## Attribution
- Source: CSV (RFC 4180) Specification
- URL: https://datatracker.ietf.org/doc/html/rfc4180
- License: License: IETF (public domain)
- Crawl Date: 2025-05-06T18:31:03.253Z
- Data Size: 4025809 bytes
- Links Found: 8227

## Retrieved
2025-05-06
library/VITEST_CONFIG.md
# library/VITEST_CONFIG.md
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
library/SHARP_CONSTRUCTOR.md
# library/SHARP_CONSTRUCTOR.md
# SHARP_CONSTRUCTOR

## Crawl Summary
Signature: new Sharp([input], [options]) -> Sharp
Input: Buffer|ArrayBuffer|TypedArray|string path; supports JPEG, PNG, WebP, GIF, AVIF, SVG, TIFF, raw pixel data.
Options:
 failOn: 'none'|'truncated'|'error'|'warning' (default 'warning')
 limitInputPixels: number|boolean (default 268402689)
 unlimited: boolean (default false)
 autoOrient: boolean (default false)
 sequentialRead: boolean (default true)
 density: number (1-100000, default 72)
 ignoreIcc: boolean (default false)
 pages: number (default 1), page: number (default 0)
 subifd: number (default -1), level: number (default 0)
 pdfBackground: string|Object, animated: boolean (default false)
 raw: { width, height, channels, premultiplied }
 create: { width, height, channels, background, noise:{ type:'gaussian', mean, sigma }}
 text: { text, font, fontfile, width, height, align, justify, dpi, rgba, spacing, wrap }
 join: { across, animated, shim, background, halign, valign }
Examples: chaining, stream transform, blank image, animated conversion, raw pixel input, noise generation, text rendering, join grid.

## Normalised Extract
Table of Contents:
1. Constructor Signature
2. Input Types
3. Option Parameters
4. Create Option
5. Text Option
6. Join Option
7. Raw Option
8. Examples

1. Constructor Signature:
new Sharp(input?, options?) => Sharp instance
 Implements stream.Duplex; emits 'info','warning'; throws Error on invalid parameters

2. Input Types:
Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string file path | Array of inputs
 Supported formats: JPEG, PNG, WebP, AVIF, GIF, SVG, TIFF, raw pixel data

3. Option Parameters:
 failOn (string): 'none'|'truncated'|'error'|'warning' default 'warning'
 limitInputPixels (number|boolean): pixel limit default 268402689; false/0 disable; true use default
 unlimited (boolean): default false; disable memory safeguards
 autoOrient (boolean): default false; apply EXIF orientation
 sequentialRead (boolean): default true; false for random access
 density (number): 1-100000 default 72
 ignoreIcc (boolean): default false; ignore ICC profile
 pages (number): default 1; -1 all pages
 page (number): default 0; start page index
 subifd (number): default -1; OME-TIFF subIFD index
 level (number): default 0; multi-level input level
 pdfBackground (string|Object): PDF transparency background
 animated (boolean): default false; read all frames

4. Create Option:
 create.width (number)
 create.height (number)
 create.channels (3|4)
 create.background (string|Object)
 create.noise.type ('gaussian')
 create.noise.mean (number)
 create.noise.sigma (number)

5. Text Option:
 text.text (string)
 text.font (string)
 text.fontfile (string)
 text.width (number)
 text.height (number)
 text.align ('left','centre','center','right')
 text.justify (boolean)
 text.dpi (number)
 text.rgba (boolean)
 text.spacing (number)
 text.wrap ('word','char','word-char','none')

6. Join Option:
 join.across (number)
 join.animated (boolean)
 join.shim (number)
 join.background (string|Object)
 join.halign ('left','centre','center','right')
 join.valign ('top','centre','center','bottom')

7. Raw Option:
 raw.width (number)
 raw.height (number)
 raw.channels (number)
 raw.premultiplied (boolean)

8. Examples:
 sharp('in.jpg').resize(w,h).toFile(path)
 sharp().resize(w).on('info',cb).pipe()
 sharp({ create:{...}}).png().toBuffer()
 await sharp('in.gif',{animated:true}).toFile('out.webp')
 await sharp(input,{ raw:{ width,height,channels }}).toFile()
 await sharp({ text:{...}}).toFile()
 await sharp([img1,img2],{ join:{ across,shim }}).toFile()

## Supplementary Details
Essential specifications:
- Default pixel limit 268402689 (0x3FFF x 0x3FFF); set limitInputPixels to 0 to disable; true uses default.
- failOn levels: 'none' ignores invalid pixels; 'truncated' aborts on partial data; 'error' aborts on errors; 'warning' logs and continues.
- unlimited:true disables safety checks; risk memory exhaustion.
- To auto-rotate EXIF: autoOrient:true.
- For random access decoding: sequentialRead:false.
- DPI for vector input: density:72-100000.
- Extract all pages: pages:-1; start at page index: page.
- OME-TIFF subIFD selection: subifd index.
- Multi-level inputs (OpenSlide): level index.
- PDF rendering requires libvips with support; set pdfBackground as CSS color or object {r,g,b,alpha}.
- Raw pixel input requires width,height,channels, optional premultiplied flag.
- Create blank image: specify create.width,height,channels,background components; add noise with gaussian type, mean, sigma.
- Text generation uses Pango; text.font or fontfile; rgba:true for alpha.
- Join arrays: across count, shim pixels, halign, valign, animated for output format.

Implementation steps:
1. require('sharp')
2. const image = sharp(input, options)
3. chain operations (resize, rotate, extract)
4. output via toFile, toBuffer, pipe
5. listen to 'info' for metadata
6. handle warnings via 'warning' event

Memory allocator best practice: on glibc Linux, use jemalloc via LD_PRELOAD or alternative allocator to avoid fragmentation.


## Reference Details
API Specification:

constructor Sharp(input?: Buffer|ArrayBuffer|TypedArray|string|Array, options?: {
  failOn?: 'none'|'truncated'|'error'|'warning',
  limitInputPixels?: number|boolean,
  unlimited?: boolean,
  autoOrient?: boolean,
  sequentialRead?: boolean,
  density?: number,
  ignoreIcc?: boolean,
  pages?: number,
  page?: number,
  subifd?: number,
  level?: number,
  pdfBackground?: string|{ r:number,g:number,b:number,alpha:number },
  animated?: boolean,
  raw?: { width:number,height:number,channels:number,premultiplied?:boolean },
  create?: { width:number,height:number,channels:3|4,background:string|{r:number,g:number,b:number,alpha:number},noise?:{ type:'gaussian',mean:number,sigma:number } },
  text?: { text:string,font?:string,fontfile?:string,width?:number,height?:number,align?:'left'|'centre'|'center'|'right',justify?:boolean,dpi?:number,rgba?:boolean,spacing?:number,wrap?:'word'|'char'|'word-char'|'none' },
  join?: { across?:number,animated?:boolean,shim?:number,background?:string|{r:number,g:number,b:number,alpha:number},halign?:'left'|'centre'|'center'|'right',valign?:'top'|'centre'|'center'|'bottom' }
}): Sharp

Events: 'info' with metadata object; 'warning' with warning details.

Sharp methods inherit input pipeline; use clone() to snapshot.

Code Examples:

// Multiple pipelines from one input
const pipeline = sharp({ failOn:'none' });
pipeline.clone().jpeg({ quality:100 }).toFile('orig.jpg');
pipeline.clone().resize({ width:500 }).jpeg({ quality:80 }).toFile('opt-500.jpg');
pipeline.clone().resize({ width:500 }).webp({ quality:80 }).toFile('opt-500.webp');
got.stream('https://...').pipe(pipeline);

// Memory allocator workaround on Linux
yarn add jemalloc; LD_PRELOAD=libjemalloc.so node app.js

// AWS Lambda bundling
npm install --cpu=x64 --os=linux sharp
Ensure node_modules includes linux-x64 binaries. Increase function memory to 1536MB.

// Bundler exclusion
esbuild app.js --bundle --platform=node --external:sharp
webpack.config.js externals: { sharp:'commonjs sharp' }

Troubleshooting:
- Invalid pixel data abort: adjust failOn
- Out-of-memory: set unlimited:true or use alternative allocator
- Missing fonts on Linux: set FONTCONFIG_PATH to directory with fontconfig files
- PDF rendering errors: install libvips with PDF support

Detailed Steps:
1. Install sharp: npm install sharp
2. require and invoke constructor with desired options
3. Chain transform methods
4. Choose output: .toFile(path, callback) or .toBuffer().then()
5. Use .metadata() before operations for dimensions
6. Handle events: .on('info',cb) and .on('warning',cb)


## Information Dense Extract
new Sharp(input?,options?)=>Sharp stream.Duplex; input: Buffer|TypedArray|string path|Array; options: {
 failOn:'none'|'truncated'|'error'|'warning' (warning);
 limitInputPixels:number|boolean (268402689);
 unlimited:boolean (false);
 autoOrient:boolean (false);
 sequentialRead:boolean (true);
 density:number (1-100000,72);
 ignoreIcc:boolean (false);
 pages:number (1|-1);
 page:number (0);
 subifd:number (-1);
 level:number (0);
 pdfBackground:string|{r,g,b,alpha};
 animated:boolean (false);
 raw:{width,height,channels,premultiplied?};
 create:{width,height,channels(3|4),background,noise:{type:'gaussian',mean,sigma}};
 text:{text,font,fontfile?,width?,height?,align,justify?,dpi?,rgba?,spacing?,wrap?};
 join:{across,animated?,shim,background,halign,valign};
}
Examples: .resize(w,h).toFile(); .on('info',cb); .clone(); .toBuffer(); await .metadata(); Troubleshooting: failOn adjust; unlimited or jemalloc for memory; FONTCONFIG_PATH for fonts; ensure PDF libvips; bundler externals; AWS Lambda binaries.

## Sanitised Extract
Table of Contents:
1. Constructor Signature
2. Input Types
3. Option Parameters
4. Create Option
5. Text Option
6. Join Option
7. Raw Option
8. Examples

1. Constructor Signature:
new Sharp(input?, options?) => Sharp instance
 Implements stream.Duplex; emits 'info','warning'; throws Error on invalid parameters

2. Input Types:
Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string file path | Array of inputs
 Supported formats: JPEG, PNG, WebP, AVIF, GIF, SVG, TIFF, raw pixel data

3. Option Parameters:
 failOn (string): 'none'|'truncated'|'error'|'warning' default 'warning'
 limitInputPixels (number|boolean): pixel limit default 268402689; false/0 disable; true use default
 unlimited (boolean): default false; disable memory safeguards
 autoOrient (boolean): default false; apply EXIF orientation
 sequentialRead (boolean): default true; false for random access
 density (number): 1-100000 default 72
 ignoreIcc (boolean): default false; ignore ICC profile
 pages (number): default 1; -1 all pages
 page (number): default 0; start page index
 subifd (number): default -1; OME-TIFF subIFD index
 level (number): default 0; multi-level input level
 pdfBackground (string|Object): PDF transparency background
 animated (boolean): default false; read all frames

4. Create Option:
 create.width (number)
 create.height (number)
 create.channels (3|4)
 create.background (string|Object)
 create.noise.type ('gaussian')
 create.noise.mean (number)
 create.noise.sigma (number)

5. Text Option:
 text.text (string)
 text.font (string)
 text.fontfile (string)
 text.width (number)
 text.height (number)
 text.align ('left','centre','center','right')
 text.justify (boolean)
 text.dpi (number)
 text.rgba (boolean)
 text.spacing (number)
 text.wrap ('word','char','word-char','none')

6. Join Option:
 join.across (number)
 join.animated (boolean)
 join.shim (number)
 join.background (string|Object)
 join.halign ('left','centre','center','right')
 join.valign ('top','centre','center','bottom')

7. Raw Option:
 raw.width (number)
 raw.height (number)
 raw.channels (number)
 raw.premultiplied (boolean)

8. Examples:
 sharp('in.jpg').resize(w,h).toFile(path)
 sharp().resize(w).on('info',cb).pipe()
 sharp({ create:{...}}).png().toBuffer()
 await sharp('in.gif',{animated:true}).toFile('out.webp')
 await sharp(input,{ raw:{ width,height,channels }}).toFile()
 await sharp({ text:{...}}).toFile()
 await sharp([img1,img2],{ join:{ across,shim }}).toFile()

## Original Source
Sharp Image Processing Library
https://sharp.pixelplumbing.com/api-constructor

## Digest of SHARP_CONSTRUCTOR

# Constructor Sharp

new Sharp([input], [options])

Constructor factory to create an instance of sharp, to which further methods are chained. Emits 'info' and 'warning' events. Implements stream.Duplex. Throws Error on invalid parameters.

Parameters:

[input] Buffer | ArrayBuffer | Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array | string | Array
  If present, may be a Buffer/ArrayBuffer/Uint8Array/Uint8ClampedArray containing JPEG, PNG, WebP, AVIF, GIF, SVG or TIFF image data; a TypedArray of raw pixel data; or a String path to an image file. Can be an array of such inputs to join.

[options] Object (optional) with attributes:

  failOn         string   default 'warning'
                 one of 'none','truncated','error','warning' to abort processing of invalid pixel data. Invalid metadata always aborts.
  limitInputPixels number|boolean  default 268402689
                 maximum pixels (width x height) allowed. false or 0 to disable; true to use default limit.
  unlimited      boolean  default false
                 disable safety features to prevent memory exhaustion.
  autoOrient     boolean  default false
                 rotate/flip image based on EXIF Orientation.
  sequentialRead boolean  default true
                 false to use random access rather than sequential read.
  density        number   default 72
                 DPI for vector images (1 to 100000).
  ignoreIcc      boolean  default false
                 ignore embedded ICC profile.
  pages          number   default 1
                 number of pages/frames to extract (-1 for all).
  page           number   default 0
                 zero-based start page for multi-page input.
  subifd         number   default -1
                 subIFD index for OME-TIFF, defaults to main image.
  level          number   default 0
                 multi-level input level for OpenSlide.
  pdfBackground  string|Object
                 background colour for PDF rendering.
  animated       boolean  default false
                 read all frames/pages (equivalent pages=-1).
  raw            Object describes raw pixel input:
                   width        number
                   height       number
                   channels     number (1 to 4)
                   premultiplied boolean (default false)
  create         Object describes new image creation:
                   width        number
                   height       number
                   channels     number (3 or 4)
                   background   string|Object
                   noise        Object:
                     type      'gaussian'
                     mean      number
                     sigma     number
  text           Object describes new text image:
                   text         string UTF-8 with optional Pango markup
                   font         string
                   fontfile     string path
                   width        number
                   height       number
                   align        'left','centre','center','right'
                   justify      boolean
                   dpi          number default 72
                   rgba         boolean
                   spacing      number
                   wrap         'word','char','word-char','none'
  join           Object describes joining array of inputs:
                   across       number
                   animated     boolean
                   shim         number
                   background   string|Object
                   halign       'left','centre','center','right'
                   valign       'top','centre','center','bottom'

Examples:

sharp('input.jpg')  .resize(300, 200)  .toFile('output.jpg', function(err) { /* callback */ });

const { body } = fetch('https://...');
const transformer = sharp().resize(300).on('info', ({ height }) => console.log(height));
Readable.fromWeb(body).pipe(transformer).pipe(writableStream);

sharp({ create: { width:300, height:200, channels:4, background:{ r:255, g:0, b:0, alpha:0.5 }}}).png().toBuffer();

await sharp('in.gif', { animated:true }).toFile('out.webp');

const input = Uint8Array.from([255,255,255,0,0,0]);
await sharp(input, { raw:{ width:2, height:1, channels:3 }}).toFile('two.png');

await sharp({ create:{ width:300, height:200, channels:3, noise:{ type:'gaussian', mean:128, sigma:30 }}}).toFile('noise.png');

await sharp({ text:{ text:'Hello', width:400, height:300 } }).toFile('text.png');

await sharp([img1, img2, img3, img4], { join:{ across:2, shim:4 }}).toFile('grid.png');

## Attribution
- Source: Sharp Image Processing Library
- URL: https://sharp.pixelplumbing.com/api-constructor
- License: License: Apache-2.0
- Crawl Date: 2025-05-06T14:30:11.578Z
- Data Size: 6407230 bytes
- Links Found: 18125

## Retrieved
2025-05-06
library/JSONSTREAM.md
# library/JSONSTREAM.md
# JSONSTREAM

## Crawl Summary
install npm install JSONStream; parse(path,map) returns Transform emitting header/data/footer; path supports string patterns such as 'rows.*.doc', recursive '..', array patterns using string, true, RegExp, function, {recurse:true}, {emitKey:true}, {emitPath:true}; stringify(open,sep,close) returns Writable with defaults open='[\\n', sep='\\n,\\n', close='\\n]\\n'; stringify(false) uses newline separator only; stringifyObject similar with '{\\n','\\n,\\n','\\n}\\n', accepts write([key,data]); numbers <=MAX_SAFE_INTEGER as Number, larger as String

## Normalised Extract
Table of Contents:
1 Installation
2 JSONStream.parse(path[,map])
3 Event API
4 JSONStream.stringify(open,sep,close)
5 JSONStream.stringifyObject(open,sep,close)
6 Recursive Patterns
7 Key and Path Emission
8 Number Handling

1 Installation
npm install JSONStream

2 JSONStream.parse(path[,map])
path: string or array pattern
  string examples: 'rows.*', 'rows.*.doc', 'docs..value'
  '..': recursive descent
array pattern elements:
  string: key name
  true: wildcard any key
  RegExp: match key
  function(value): custom test
  {recurse:true}: recursive descent
  {emitKey:true}: emit key/value pairs
  {emitPath:true}: emit match path/value
map: function(nodeValue) => return non-nullish to emit
returns: Transform stream emitting 'header','data','footer'

3 Event API
'on header': raw JSON before matches
'on data': each matched value or mapped result
'on footer': raw JSON after matches

4 JSONStream.stringify(open,sep,close)
returns Writable stream
defaults: open='[\n', sep='\n,\n', close='\n]\n'
write(value): serializes into JSON array
stringify(false): disables wrappers, uses '\n' separator

5 JSONStream.stringifyObject(open,sep,close)
returns Writable stream
defaults: open='{\n', sep='\n,\n', close='\n}\n'
write([key,value]): serializes into object entries

6 Recursive Patterns
use '..' in strings or {recurse:true} in arrays
example: JSONStream.parse('docs..value')

7 Key and Path Emission
{emitKey:true}: emit {key,value}
{emitPath:true}: emit {path,value}
string pattern 'obj.$*': emit keys for wildcard

8 Number Handling
numbers within JS safe integer range => Number
numbers outside range => string

## Supplementary Details
Defaults:
  JSONStream.stringify: open='[\n', sep='\n,\n', close='\n]\n'
  JSONStream.stringify(false): sep='\n', no open/close
  JSONStream.stringifyObject: open='{\n', sep='\n,\n', close='\n}\n'
Path patterns:
  string: dot-separated keys, '*' wildcard, '..' recursion, prefix '$' to '*' to emit key
  array: mix of string, true, RegExp, function(value), {recurse:true}, {emitKey:true}, {emitPath:true}
map callback: invoked per matched node value, return non-nullish to emit
Stream type: Transform extends Node.js stream.Transform
Writable type: inherits stream.Writable
Node.js versions: >=0.8
Dependencies: creationix/jsonparse >=1.2.0
License: MIT OR Apache-2.0

## Reference Details
API Specifications:

1. JSONStream.parse(path, map) -> Transform
  - path: string | Array<string|true|RegExp|Function|Object>
  - map: (nodeValue:any) => any | null | undefined
  Events:
    'header': listener(headerObject:Object)
    'data': listener(data:any)
    'footer': listener(footerObject:Object)
  Usage:
    var stream = JSONStream.parse(['rows', true, 'doc', {emitKey:true}]);
    stream.on('header', function(obj){ console.log(obj) });
    stream.on('data', function(node){ console.log(node.key, node.value) });
    stream.on('footer', function(obj){ console.log(obj) });

2. JSONStream.stringify(open?, sep?, close?) -> Writable
  - open: string, default='[\n'
  - sep: string, default='\n,\n'
  - close: string, default='\n]\n'
  Methods:
    write(value:any)
    end()
  Example:
    var out = JSONStream.stringify('[', ',', ']');
    out.write({a:1});
    out.write({b:2});
    out.end();

3. JSONStream.stringifyObject(open?, sep?, close?) -> Writable
  - open: string, default='{\n'
  - sep: string, default='\n,\n'
  - close: string, default='\n}\n'
  Methods:
    write([key:string, value:any])
    end()
  Example:
    var objOut = JSONStream.stringifyObject();
    objOut.write(['id', 123]);
    objOut.write(['name', 'abc']);
    objOut.end();

Concrete Best Practices:
  - Pipe HTTP responses: request(url).pipe(JSONStream.parse('rows.*.doc')).pipe(process.stdout)
  - Combine with event-stream mapSync for transformations
  - Use map parameter to filter or transform matched nodes
  - Use recursive patterns for nested JSON structures

Troubleshooting:
  - If no 'data' events: verify pattern syntax and JSON structure
  - Log 'header' to inspect pre-match content
  - Use map function with console.log to debug matching values
  - Ensure stream pipeline includes stream.resume() if paused

CLI Example:
  curl https://registry.npmjs.org/browserify | JSONStream 'versions.*.dependencies'

Configuration Options Effects:
  - stringify(false): newline-delimited JSON for streaming log lines
  - pattern array with RegExp: exact key matching without escape issues

Error Conditions:
  - Passing null or undefined path => no 'data' events
  - Invalid RegExp in array => thrown at stream creation
  - Exceeding memory when not using streaming: avoid JSON.parse on large payloads

## Information Dense Extract
npm install JSONStream;parse(path,map)->Transform;path:string('a.*.b','docs..value')|'array'[string,true,RegExp,Function,{recurse:true},{emitKey:true},{emitPath:true}];map filters/mapping;events:'header'(Object),'data'(value),'footer'(Object);stringify(open='[\n',sep='\n,\n',close='\n]\n')->Writable writes values as JSON array;stringify(false)->newline-delimited;stringifyObject(open='{\n',sep='\n,\n',close='\n}\n')->Writable.write([key,value]);numeric tokens<=2^53-1 Number,>String;use map to exclude nodes;prefix '$' to '*' for key emission

## Sanitised Extract
Table of Contents:
1 Installation
2 JSONStream.parse(path[,map])
3 Event API
4 JSONStream.stringify(open,sep,close)
5 JSONStream.stringifyObject(open,sep,close)
6 Recursive Patterns
7 Key and Path Emission
8 Number Handling

1 Installation
npm install JSONStream

2 JSONStream.parse(path[,map])
path: string or array pattern
  string examples: 'rows.*', 'rows.*.doc', 'docs..value'
  '..': recursive descent
array pattern elements:
  string: key name
  true: wildcard any key
  RegExp: match key
  function(value): custom test
  {recurse:true}: recursive descent
  {emitKey:true}: emit key/value pairs
  {emitPath:true}: emit match path/value
map: function(nodeValue) => return non-nullish to emit
returns: Transform stream emitting 'header','data','footer'

3 Event API
'on header': raw JSON before matches
'on data': each matched value or mapped result
'on footer': raw JSON after matches

4 JSONStream.stringify(open,sep,close)
returns Writable stream
defaults: open='['n', sep=''n,'n', close=''n]'n'
write(value): serializes into JSON array
stringify(false): disables wrappers, uses ''n' separator

5 JSONStream.stringifyObject(open,sep,close)
returns Writable stream
defaults: open='{'n', sep=''n,'n', close=''n}'n'
write([key,value]): serializes into object entries

6 Recursive Patterns
use '..' in strings or {recurse:true} in arrays
example: JSONStream.parse('docs..value')

7 Key and Path Emission
{emitKey:true}: emit {key,value}
{emitPath:true}: emit {path,value}
string pattern 'obj.$*': emit keys for wildcard

8 Number Handling
numbers within JS safe integer range => Number
numbers outside range => string

## Original Source
JSONStream Library
https://github.com/dominictarr/JSONStream#readme

## Digest of JSONSTREAM

# JSONStream.parse

Signature: JSONStream.parse(path[, map]) -> Transform

Parameters:
  path: string or array specifying JSONPath-like pattern. String patterns use dot notation with '*' wildcard and '..' recursive descent. Array patterns can include:
    - string: exact key name
    - true: wildcard matching any key
    - RegExp: key matches regex
    - function(value): custom filter function
    - {recurse:true}: recursive descent same as '..'
    - {emitKey:true}: emit key and value object
    - {emitPath:true}: emit path and value object
  map (optional): function(nodeValue) returning non-nullish to emit, nullish to skip

Returns: Transform stream emitting 'header', 'data', 'footer' events.

# Events

  'header': raw JSON chunk before first match
  'data': emitted for each matching node or mapped value
  'footer': raw JSON chunk after last match

# JSONStream.stringify

Signature: JSONStream.stringify([open, sep, close]) -> Writable

Parameters:
  open: string written before first element. Default '[\n'
  sep: string between elements. Default '\n,\n'
  close: string after last element. Default '\n]\n'

Behavior:
  - Calling stringify(false) disables open/close wrapper and uses '\n' as separator only
  - Writing values serializes into a JSON array or newline-delimited JSON sequence

# JSONStream.stringifyObject

Signature: JSONStream.stringifyObject([open, sep, close]) -> Writable

Parameters:
  open: default '{\n'
  sep: default '\n,\n'
  close: default '\n}\n'

Behavior:
  - Write entries using write([key, data]) to serialize object properties

# Recursive Patterns

Use '..' in string patterns or {recurse:true} in array patterns for recursive descent. Example:
  JSONStream.parse('docs..value')
  JSONStream.parse(['docs', {recurse:true}, 'value'])
Emits every 'value' property at any depth under 'docs'.

# Key and Path Emission

Pattern element {emitKey:true}: emits objects {key, value}
Pattern element {emitPath:true}: emits objects {path, value}
Prefix '$' to '*' in string pattern: 'obj.$*' to enable key emission

# Numbers

Numeric tokens within JavaScript safe range emitted as Number. Tokens exceeding MAX_SAFE_INTEGER emitted as string to preserve precision.

# Defaults and Dependencies

Module depends on creationix/jsonparse. Dual MIT or Apache 2.0 license. Archived read-only.

Retrieval Date: 2023-10-01

## Attribution
- Source: JSONStream Library
- URL: https://github.com/dominictarr/JSONStream#readme
- License: License: MIT
- Crawl Date: 2025-05-06T20:30:18.494Z
- Data Size: 800262 bytes
- Links Found: 5270

## Retrieved
2025-05-06
library/EXPR_EVAL.md
# library/EXPR_EVAL.md
# EXPR_EVAL

## Crawl Summary
Parser constructor accepts an optional options object controlling operators (add, subtract, multiply, divide, power, remainder, factorial, concatenate, conditional, logical, comparison, in, assignment). Static methods parse(expression: string) and evaluate(expression: string, variables?: object) return Expression or computed value. Expression methods: evaluate, substitute, simplify, variables, symbols, toString, toJSFunction. Expression syntax: precedence from grouping down to separators. Built-in unary operators and functions with precise method names. Custom functions via parser.functions and constants via parser.consts.

## Normalised Extract
Table of Contents:
 1 Installation
 2 Parser API
 3 Expression API
 4 Syntax and Precedence
 5 Operators and Functions
 6 Constants

1 Installation
 npm install expr-eval

2 Parser API
 new Parser(options?)
 options.operators: { add, subtract, multiply, divide, power, remainder, factorial, concatenate, conditional, logical, comparison, in, assignment }
 Parser.parse(expression: string) => Expression
 Parser.evaluate(expression: string, variables?: object) => any
 parser.parse(...) and parser.evaluate(...)

3 Expression API
 expr.evaluate(variables?) => any
 expr.substitute(variable: string, expression: Expression|string|number) => Expression
 expr.simplify(variables: object) => Expression
 expr.variables(options?: { withMembers: boolean }) => string[]
 expr.symbols(options?: { withMembers: boolean }) => string[]
 expr.toString() => string
 expr.toJSFunction(parameters: string[]|string, variables?: object) => Function

4 Syntax and Precedence
 Level 1: (...)
 Level 2: f(), x.y, a[i]
 Level 3: x!
 Level 4: ^
 Level 5: unary +, -, not, sqrt, etc.
 Level 6: *, /, %
 Level 7: +, -, ||
 Level 8: ==, !=, >=, <=, >, <, in
 Level 9: and
 Level 10: or
 Level 11: x ? y : z
 Level 12: =
 Level 13: ;

5 Operators and Functions
 Unary: -x, +x, x!, abs, acos, asin, atan, ceil, cos, exp, floor, ln, log10, not, round, sign, sin, sqrt, tan, trunc
 Pre-defined Functions: random(n), min(a,b,...), max(a,b,...), hypot(a,b,...), pow(x,y), atan2(y,x), roundTo(x,n), map(f,a), fold(f,y,a), filter(f,a), indexOf(x,a), join(sep,a), if(c,a,b)

6 Constants
 parser.consts: { E: number, PI: number, true: boolean, false: boolean }

## Supplementary Details
Default operator flags (all true): add, subtract, multiply, divide, power, remainder, factorial, concatenate, conditional, logical, comparison, in, assignment.
Disable comparison and logical operators:
 const parser = new Parser({ operators: { logical: false, comparison: false } });
Add custom JS function:
 const parser = new Parser();
 parser.functions.customAddFunction = (a, b) => a + b;
 parser.evaluate('customAddFunction(2,4)'); // 6
Modify constants:
 parser.consts.R = 1.234;
 parser.parse('A+B/R').toString(); // '((A + B) / 1.234)'

## Reference Details
API Signatures:
 1. Parser(options?: ParserOptions)
    interface ParserOptions { operators?: { add?: boolean; subtract?: boolean; multiply?: boolean; divide?: boolean; power?: boolean; remainder?: boolean; factorial?: boolean; concatenate?: boolean; conditional?: boolean; logical?: boolean; comparison?: boolean; in?: boolean; assignment?: boolean } }
 2. Parser.parse(expression: string): Expression
 3. Parser.evaluate(expression: string, variables?: object): any
 4. Expression.evaluate(variables?: object): any
 5. Expression.substitute(variable: string, expression: Expression|string|number): Expression
 6. Expression.simplify(variables: object): Expression
 7. Expression.variables(options?: { withMembers: boolean }): string[]
 8. Expression.symbols(options?: { withMembers: boolean }): string[]
 9. Expression.toString(): string
 10. Expression.toJSFunction(parameters: string[]|string, variables?: object): Function

Code Examples:
 // Basic parse and evaluate
 const Parser = require('expr-eval').Parser;
 const parser = new Parser();
 const expr = parser.parse('2 * x + 1');
 const result = expr.evaluate({ x: 3 }); // 7

 // Static evaluate
 const result2 = Parser.evaluate('6 * x', { x: 7 }); // 42

 // Compile to JS function
 const f = expr.toJSFunction('x');
 f(4); // 9

Configuration Patterns:
 // Disable logical and comparison
 new Parser({ operators: { logical: false, comparison: false } });

Best Practices:
 - Pre-simplify static portions: expr.simplify({ y: 4 }) before evaluate
 - Use toJSFunction for repeated evaluations to improve performance
 - Manage scope: reuse parser instance with custom functions and constants

Troubleshooting:
 $ npm test
 Expected: all tests pass under 'test' directory
 $ Parser.parse('2 ^').evaluate({});
 Throws: SyntaxError at position 3: unexpected '^'
 $ expr.evaluate({});
 Throws: Error: Variable x not provided


## Information Dense Extract
Parser(options?){operators:{add,subtract,multiply,divide,power,remainder,factorial,concatenate,conditional,logical,comparison,in,assignment}all boolean defaults true}.Static: parse(string)->Expression; evaluate(string,object?)->any. Expr methods: evaluate(object?)->any; substitute(string,Expression|string|number)->Expression; simplify(object)->Expression; variables({withMembers?})->string[]; symbols({withMembers?})->string[]; toString()->string; toJSFunction(string[]|string,object?)->Function. Syntax precedence: grouping>call/access>factorial>^>unary>*/%>+/-/||>==/!=/>=/<=/>/</in>and>or>?::=>;. Unary ops: -,+,!,abs,acos,asin,atan,ceil,cos,exp,floor,ln,log10,not,round,sign,sin,sqrt,tan,trunc. Predefs: random(n),min(...),max(...),hypot(...),pow(x,y),atan2(y,x),roundTo(x,n),map(f,a),fold(f,y,a),filter(f,a),indexOf(x,a),join(sep,a),if(c,a,b). Constants: E,PI,true,false in parser.consts. npm install expr-eval; npm test.

## Sanitised Extract
Table of Contents:
 1 Installation
 2 Parser API
 3 Expression API
 4 Syntax and Precedence
 5 Operators and Functions
 6 Constants

1 Installation
 npm install expr-eval

2 Parser API
 new Parser(options?)
 options.operators: { add, subtract, multiply, divide, power, remainder, factorial, concatenate, conditional, logical, comparison, in, assignment }
 Parser.parse(expression: string) => Expression
 Parser.evaluate(expression: string, variables?: object) => any
 parser.parse(...) and parser.evaluate(...)

3 Expression API
 expr.evaluate(variables?) => any
 expr.substitute(variable: string, expression: Expression|string|number) => Expression
 expr.simplify(variables: object) => Expression
 expr.variables(options?: { withMembers: boolean }) => string[]
 expr.symbols(options?: { withMembers: boolean }) => string[]
 expr.toString() => string
 expr.toJSFunction(parameters: string[]|string, variables?: object) => Function

4 Syntax and Precedence
 Level 1: (...)
 Level 2: f(), x.y, a[i]
 Level 3: x!
 Level 4: ^
 Level 5: unary +, -, not, sqrt, etc.
 Level 6: *, /, %
 Level 7: +, -, ||
 Level 8: ==, !=, >=, <=, >, <, in
 Level 9: and
 Level 10: or
 Level 11: x ? y : z
 Level 12: =
 Level 13: ;

5 Operators and Functions
 Unary: -x, +x, x!, abs, acos, asin, atan, ceil, cos, exp, floor, ln, log10, not, round, sign, sin, sqrt, tan, trunc
 Pre-defined Functions: random(n), min(a,b,...), max(a,b,...), hypot(a,b,...), pow(x,y), atan2(y,x), roundTo(x,n), map(f,a), fold(f,y,a), filter(f,a), indexOf(x,a), join(sep,a), if(c,a,b)

6 Constants
 parser.consts: { E: number, PI: number, true: boolean, false: boolean }

## Original Source
expr-eval Parser Library
https://github.com/silentmatt/expr-eval#readme

## Digest of EXPR_EVAL

# Installation

```bash
npm install expr-eval
```

# Parser

## Constructor
`new Parser(options?: ParserOptions)`

Options:
- operators.add: boolean = true
- operators.concatenate: boolean = true
- operators.conditional: boolean = true
- operators.divide: boolean = true
- operators.factorial: boolean = true
- operators.multiply: boolean = true
- operators.power: boolean = true
- operators.remainder: boolean = true
- operators.subtract: boolean = true
- operators.logical: boolean = true
- operators.comparison: boolean = true
- operators.in: boolean = true
- operators.assignment: boolean = true

## Static Methods
- `Parser.parse(expression: string): Expression`
- `Parser.evaluate(expression: string, variables?: object): number | string | boolean | Array<any>`

## Instance Methods
- `parser.parse(expression: string): Expression`
- `parser.evaluate(expression: string, variables?: object): number | string | boolean | Array<any>`

# Expression

## Methods and Signatures
- `expr.evaluate(variables?: object): any`
- `expr.substitute(variable: string, expression: Expression | string | number): Expression`
- `expr.simplify(variables: object): Expression`
- `expr.variables(options?: { withMembers: boolean }): string[]`
- `expr.symbols(options?: { withMembers: boolean }): string[]`
- `expr.toString(): string`
- `expr.toJSFunction(parameters: string[] | string, variables?: object): Function`

# Expression Syntax

## Operator Precedence (high to low)
1. Grouping: `(...)`
2. Function call, property access, array indexing: `f()`, `x.y`, `a[i]`
3. Factorial: `x!`
4. Exponentiation: `^` (right associative)
5. Unary prefix: `+x`, `-x`, `not x`, `sqrt x`, etc.
6. Multiplication, division, remainder: `*`, `/`, `%`
7. Addition, subtraction, concatenation: `+`, `-`, `||`
8. Comparison and membership: `==`, `!=`, `>=`, `<=`, `>`, `<`, `in`
9. Logical AND: `and`
10. Logical OR: `or`
11. Conditional: `x ? y : z`
12. Assignment: `=`
13. Expression separator: `;`

# Functions and Operators

## Unary Operators
- `-x`, `+x`, `x!`, `abs x`, `acos x`, `asin x`, `atan x`, `ceil x`, `cos x`, `exp x`, `floor x`, `ln x`, `log10 x`, `not x`, `round x`, `sign x`, `sin x`, `sqrt x`, `tan x`, `trunc x`, others.

## Pre-defined Functions
- `random(n?: number): number`
- `min(...args: number[]): number`
- `max(...args: number[]): number`
- `hypot(...args: number[]): number`
- `pow(x: number, y: number): number`
- `atan2(y: number, x: number): number`
- `roundTo(x: number, n: number): number`
- `map(f: Function, a: any[]): any[]`
- `fold(f: Function, y: any, a: any[]): any`
- `filter(f: Function, a: any[]): any[]`
- `indexOf(x: any, a: any[]): number`
- `join(sep: string, a: any[]): string`
- `if(c: any, a: any, b: any): any`

## Constants
- `parser.consts.E: number`
- `parser.consts.PI: number`
- `parser.consts.true: boolean`
- `parser.consts.false: boolean`

# Troubleshooting

```bash
npm test
```

# Data
- Source: https://github.com/silentmatt/expr-eval#readme
- Retrieved: 2024-06-15
- Data Size: 605003 bytes
- Attribution: silentmatt


## Attribution
- Source: expr-eval Parser Library
- URL: https://github.com/silentmatt/expr-eval#readme
- License: License: MIT
- Crawl Date: 2025-05-07T00:40:09.772Z
- Data Size: 605003 bytes
- Links Found: 4700

## Retrieved
2025-05-07
library/PLUGIN_GUIDE.md
# library/PLUGIN_GUIDE.md
# PLUGIN_GUIDE

## Crawl Summary
Defines plugin object: id:string, defaults:Object, hook functions. Register globally via Chart.register(plugin:Plugin):void or inline per-chart in plugins config. Plugin id constraints: lowercase, URL safe, follow npm naming. Options under options.plugins.<id> with nested properties. Disable plugin per-chart with options.plugins.<id>=false or disable all with options.plugins=false. Default values via plugin.defaults. Lifecycle hooks list with signatures and cancellation behavior. Typescript typing via declaration merging of PluginOptionsByType interface.

## Normalised Extract
Table of Contents
1 Plugin Object Definition
2 Registration Methods
3 Configuration Options Path
4 Disabling Plugins
5 Default Values
6 Lifecycle Hook Signatures
7 Typescript Declarations

1 Plugin Object Definition
id: string unique identifier matching npm package name rules
defaults: Object with keys and default values
hook methods: beforeInit(chart: Chart, args: any, options: any): void  and similar for update, layout, render, draw, event, destroy hooks

2 Registration Methods
Global registration: Chart.register(plugin: Plugin): void
Inline registration: pass plugin in Chart constructor plugins array; inline plugins not globally registered

3 Configuration Options Path
Plugin options under chart.config.options.plugins.<plugin-id> as an object of key: value pairs; default empty object

4 Disabling Plugins
Per-plugin disable: set chart.config.options.plugins.<plugin-id> = false
Disable all plugins: set chart.config.options.plugins = false

5 Default Values
plugin.defaults property used to define default option values applied unless overridden in chart.options.plugins.<plugin-id>.<option>

6 Lifecycle Hook Signatures
beforeInit(chart: Chart, args: {initial: boolean}, options: any): boolean|void
afterInit(chart: Chart, args: any, options: any): void
beforeUpdate(chart: Chart, args: {mode?: string}, options: any): boolean|void
afterUpdate(chart: Chart, args: any, options: any): void
beforeLayout(chart: Chart, args: any, options: any): boolean|void
afterLayout(chart: Chart, args: any, options: any): void
beforeRender(chart: Chart, args: any, options: any): boolean|void
afterRender(chart: Chart, args: any, options: any): void
beforeDraw(chart: Chart, args: any, options: any): boolean|void
afterDraw(chart: Chart, args: any, options: any): void
beforeEvent(chart: Chart, args: {event: Event}, options: any): boolean|void
afterEvent(chart: Chart, args: {event: Event, changed: boolean}, options: any): void
afterDestroy(chart: Chart, args: any, options: any): void

7 Typescript Declarations
Add to a .d.ts file:
declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    <pluginId>?: { <optionKey>?: <optionType> }
  }
}

## Supplementary Details
Plugin ID constraints: cannot start with dot or underscore, no uppercase letters, only URL-safe characters, recommended prefix chartjs-plugin- for public plugins. Chart.register signature: static register(...items: ChartComponentLike[]): void. Chart.unregister(...items: ChartComponentLike[]): void. options.plugins type: false| Record<string, any>. plugin.defaults applies to options.plugins.<id>.<key>. Cancellation: returning false from before* hooks stops default processing. Event hook: args.changed boolean indicates need to re-render. Destroy hook deprecated in v3.7.0 replaced by afterDestroy. Inline plugin warning: cannot register inline plugin globally. TypeScript augmentation: merge PluginOptionsByType to include new plugin options for specific chart types.

## Reference Details
API Specifications:
Chart.register(...items: ChartComponentLike[]): void  // register plugins or components globally
Chart.unregister(...items: ChartComponentLike[]): void  // unregister globally
// Chart constructor signature:
new Chart(ctx: CanvasRenderingContext2D|HTMLCanvasElement|{canvas:HTMLCanvasElement}|ArrayLike<CanvasRenderingContext2D|HTMLCanvasElement>, config: {type: string, data: any, options?: {plugins?: false|Record<string,any>}})

Plugin Object Structure:
interface Plugin<TOptions = any> {
  id: string  // unique plugin ID
  defaults?: TOptions  // default option values
  beforeInit?(chart: Chart, args: {initial: boolean}, options: TOptions): boolean|void
  afterInit?(chart: Chart, args: any, options: TOptions): void
  beforeUpdate?(chart: Chart, args: {mode?: string}, options: TOptions): boolean|void
  afterUpdate?(chart: Chart, args: any, options: TOptions): void
  beforeLayout?(chart: Chart, args: any, options: TOptions): boolean|void
  afterLayout?(chart: Chart, args: any, options: TOptions): void
  beforeRender?(chart: Chart, args: any, options: TOptions): boolean|void
  afterRender?(chart: Chart, args: any, options: TOptions): void
  beforeDraw?(chart: Chart, args: any, options: TOptions): boolean|void
  afterDraw?(chart: Chart, args: any, options: TOptions): void
  beforeEvent?(chart: Chart, args: {event: Event}, options: TOptions): boolean|void
  afterEvent?(chart: Chart, args: {event: Event, changed: boolean}, options: TOptions): void
  afterDestroy?(chart: Chart, args: any, options: TOptions): void
}

Configuration Options:
chart.config.options.plugins = false  // disable all plugins
chart.config.options.plugins['plugin-id'] = false  // disable specific plugin
chart.config.options.plugins['plugin-id'] = { key1: value1, key2: value2 }

Best Practices:
Define plugin.id following npm conventions to avoid collisions.
Use Chart.register for global plugins before creating chart instances.
Provide plugin.defaults for user-configurable options with sensible defaults.
Return false from before* hook to cancel default behavior when needed.
Use args.changed = true in afterEvent to trigger new render when event changes state.

Implementation Example:
import {Chart, Plugin} from 'chart.js';

const backgroundPlugin: Plugin<{color: string}> = {
  id: 'custom_canvas_background_color',
  defaults: {color: 'lightGreen'},
  beforeDraw(chart,args,options) {
    const ctx = chart.ctx;
    ctx.save();
    ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = options.color;
    ctx.fillRect(0,0,chart.width,chart.height);
    ctx.restore();
  }
};

Chart.register(backgroundPlugin);

const chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: {
    plugins: {
      custom_canvas_background_color: {color: 'pink'}
    }
  }
});

Troubleshooting:
Command: console.log(Chart.registry.getPlugin('custom_canvas_background_color'))
Expected: plugin object with id and defaults.
If undefined, ensure Chart.register(backgroundPlugin) ran before chart creation.
Check plugin.id for invalid characters via:
console.assert(/^[a-z0-9\-]+$/.test(plugin.id), 'Invalid plugin id');

## Information Dense Extract
plugin.id:string; plugin.defaults:Object; hook methods beforeInit(chart:Chart,args,options):boolean|void; afterDestroy(chart,args,options):void; register globally: Chart.register(...items:ChartComponentLike[]):void; unregister: Chart.unregister(...items):void; Chart constructor: new Chart(ctx,config(type,data,options.plugins?:false|Record<string,any>)); options.plugins.<id>:Object|false disables specific plugin; options.plugins:false disables all; id constraints: lowercase, url-safe, no leading . or _; default via plugin.defaults applied to options.plugins.<id>.<key>; returning false from before* cancels default; args.changed in afterEvent triggers re-render; TS declaration merging: extend PluginOptionsByType<TType> with plugin option interface.

## Sanitised Extract
Table of Contents
1 Plugin Object Definition
2 Registration Methods
3 Configuration Options Path
4 Disabling Plugins
5 Default Values
6 Lifecycle Hook Signatures
7 Typescript Declarations

1 Plugin Object Definition
id: string unique identifier matching npm package name rules
defaults: Object with keys and default values
hook methods: beforeInit(chart: Chart, args: any, options: any): void  and similar for update, layout, render, draw, event, destroy hooks

2 Registration Methods
Global registration: Chart.register(plugin: Plugin): void
Inline registration: pass plugin in Chart constructor plugins array; inline plugins not globally registered

3 Configuration Options Path
Plugin options under chart.config.options.plugins.<plugin-id> as an object of key: value pairs; default empty object

4 Disabling Plugins
Per-plugin disable: set chart.config.options.plugins.<plugin-id> = false
Disable all plugins: set chart.config.options.plugins = false

5 Default Values
plugin.defaults property used to define default option values applied unless overridden in chart.options.plugins.<plugin-id>.<option>

6 Lifecycle Hook Signatures
beforeInit(chart: Chart, args: {initial: boolean}, options: any): boolean|void
afterInit(chart: Chart, args: any, options: any): void
beforeUpdate(chart: Chart, args: {mode?: string}, options: any): boolean|void
afterUpdate(chart: Chart, args: any, options: any): void
beforeLayout(chart: Chart, args: any, options: any): boolean|void
afterLayout(chart: Chart, args: any, options: any): void
beforeRender(chart: Chart, args: any, options: any): boolean|void
afterRender(chart: Chart, args: any, options: any): void
beforeDraw(chart: Chart, args: any, options: any): boolean|void
afterDraw(chart: Chart, args: any, options: any): void
beforeEvent(chart: Chart, args: {event: Event}, options: any): boolean|void
afterEvent(chart: Chart, args: {event: Event, changed: boolean}, options: any): void
afterDestroy(chart: Chart, args: any, options: any): void

7 Typescript Declarations
Add to a .d.ts file:
declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    <pluginId>?: { <optionKey>?: <optionType> }
  }
}

## Original Source
Chart.js Plugin Developer Guide
https://www.chartjs.org/docs/latest/developers/plugins.html

## Digest of PLUGIN_GUIDE

# Plugins
Crawled from https://www.chartjs.org/docs/latest/developers/plugins.html  Data Size: 606912 bytes  Retrieved: 2024-06-09

# Using plugins
Plugins can be shared between chart instances by passing the plugin object to the Chart constructor:

const plugin = {
  id: 'custom_plugin',
  beforeInit: function(chart, args, options) {
    // plugin setup
  }
};
const chart1 = new Chart(ctx, {plugins:[plugin]});
const chart2 = new Chart(ctx, {plugins:[plugin]});

Inline plugins (not registered globally):
const chart3 = new Chart(ctx, {plugins:[{beforeInit(chart,args,options){ /*...*/ }}]});

# Global plugins
Register plugin globally to apply to all charts:
Chart.register({
  id: 'global_plugin',
  beforeDraw: function(chart,args,options){ /*...*/ }
});

# Plugin ID and Options
Every plugin must define a unique id:
- Cannot start with . or _
- Must be lowercase URL safe (no spaces or uppercase)
- Should follow npm package convention: chartjs-plugin-<name>

Plugin options live under options.plugins.<plugin-id>:
const chart = new Chart(ctx, {
  options: {
    plugins: {
      p1: { foo: 10, bar: true },
      p2: { baz: 'value' }
    }
  }
});

# Disabling plugins
Disable a specific global plugin for one chart:
Chart.register({id: 'p1', /*...*/});
const chart = new Chart(ctx, {options:{plugins:{p1:false}}});

Disable all plugins for a chart:
const chart = new Chart(ctx, {options:{plugins:false}});

# Plugin defaults
Set default option values in plugin.defaults:
const plugin = {
  id: 'custom_canvas_background_color',
  defaults: { color: 'lightGreen' },
  beforeDraw: (chart,args,options)=>{/*...*/}
};

# Plugin Core API Hooks
Hooks are called during chart lifecycle events:
- beforeInit(chart,args,options)
- afterInit(chart,args,options)
- beforeUpdate(chart,args,options)
- afterUpdate(chart,args,options)
- beforeLayout(chart,args,options)
- afterLayout(chart,args,options)
- beforeDatasetsUpdate(chart,args,options)
- afterDatasetsUpdate(chart,args,options)
- beforeRender(chart,args,options)
- afterRender(chart,args,options)
- beforeDraw(chart,args,options)
- afterDraw(chart,args,options)
- beforeDatasetsDraw(chart,args,options)
- afterDatasetsDraw(chart,args,options)
- beforeDatasetDraw(chart,args,options)
- afterDatasetDraw(chart,args,options)
- beforeTooltipDraw(chart,args,options)
- afterTooltipDraw(chart,args,options)
- beforeEvent(chart,args,options)
- afterEvent(chart,args,options)
- afterDestroy(chart,args,options)  (destroy hook deprecated since v3.7.0)

If a hook returns false, some before* hooks will cancel the default behavior.

# TypeScript Typings
Provide a .d.ts declaring:
import {ChartType, Plugin} from 'chart.js';
declare module 'chart.js' {
  interface PluginOptionsByType<TType extends ChartType> {
    customCanvasBackgroundColor?: { color?: string }
  }
}

Last Updated: 4/15/2025, 1:19:05 PM

## Attribution
- Source: Chart.js Plugin Developer Guide
- URL: https://www.chartjs.org/docs/latest/developers/plugins.html
- License: License: MIT
- Crawl Date: 2025-05-06T12:32:50.223Z
- Data Size: 606912 bytes
- Links Found: 13974

## Retrieved
2025-05-06
library/NDJSON_SPEC.md
# library/NDJSON_SPEC.md
# NDJSON_SPEC

## Crawl Summary
NDJSON is a newline-delimited JSON format. Each record is a standalone JSON text terminated by a newline. The only record separator is U+000A. Encoding is UTF-8. Content type application/x-ndjson. Parsers must read up to newline, parse JSON, then continue. Empty lines and invalid UTF-8 must be rejected. Use for logs and streaming large data.

## Normalised Extract
Table of Contents

1 Format Definition
2 Content-Type
3 Character Encoding
4 Record Syntax
5 Parsing Rules
6 Error Handling
7 Examples

1 Format Definition
Each record is a valid JSON text terminated by a newline (U+000A). No other separators.

2 Content-Type
application/x-ndjson

3 Character Encoding
UTF-8 only. Reject invalid sequences.

4 Record Syntax
- Valid JSON values: object, array, string, number, boolean, null
- No trailing characters beyond newline
- Empty lines invalid

5 Parsing Rules
- Read bytes until newline
- Exclude newline, parse JSON text
- On error, emit record-level exception
- Continue until EOF

6 Error Handling
- Malformed JSON: parser must throw record error with line index
- Invalid UTF-8: stream-level error

7 Examples
Sample lines:
{ "foo": "bar" }
{"a":1,"nested":{"b":[2,3,4]}}

## Supplementary Details
Content-Type header: "application/x-ndjson"; charset=UTF-8. Parsers must process in streaming mode: read chunk, split on '\n', buffer incomplete lines across reads. Implementations should expose lineCount in error events. Acceptable JSON types: object, array, string, number, boolean, null. Reject BOM at start. Maximum line length unbounded; implementations may set configurable maxLineLength parameter default 1MB.

## Reference Details
### Node.js Example
```js
const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: fs.createReadStream('data.ndjson', { encoding: 'utf8' }),
  crlfDelay: Infinity
});
rl.on('line', line => {
  try {
    const record = JSON.parse(line);
    console.log(record);
  } catch (err) {
    console.error(`Parse error on line ${rl.input.bytesRead}:`, err.message);
  }
});
```

### Python Example
```py
import json
with open('data.ndjson', 'r', encoding='utf-8') as f:
    for line_no, line in enumerate(f, 1):
        if not line.strip():
            raise ValueError(f"Empty line at {line_no}")
        try:
            obj = json.loads(line)
        except json.JSONDecodeError as e:
            print(f"Error on line {line_no}: {e.msg}")
        else:
            print(obj)
```

### Go Example
```go
package main
import (
  "bufio"
  "encoding/json"
  "fmt"
  "io"
  "os"
)
func main() {
  file, _ := os.Open("data.ndjson")
  defer file.Close()
  scanner := bufio.NewScanner(file)
  lineNo := 0
  for scanner.Scan() {
    lineNo++
    var v interface{}
    err := json.Unmarshal(scanner.Bytes(), &v)
    if err != nil {
      fmt.Fprintf(os.Stderr, "Error line %d: %s\n", lineNo, err)
      continue
    }
    fmt.Println(v)
  }
  if err := scanner.Err(); err != nil && err != io.EOF {
    fmt.Fprintf(os.Stderr, "Scan error: %s\n", err)
  }
}
```

### Implementation Pattern
1. Open file/stream with UTF-8 decoding
2. Buffer data and split on '\n'
3. For each line: Verify non-empty, parse JSON
4. Handle parse or encoding errors at record-level
5. Continue until EOF

### Configuration Options
- maxLineLength (integer; default: 1048576 bytes): reject lines longer than this.
- skipEmptyLines (boolean; default: false): if true, ignore empty lines instead of throwing.
- onError callback(lineNo, error): custom record-level error handler.

### Best Practices
- Always validate input encoding is UTF-8.
- Do not accumulate entire file in memory; process line by line.
- Use backpressure in streaming contexts to avoid memory spikes.
- Expose diagnostics: line number, byte offset on errors.

### Troubleshooting
Command:
  head -c 100 file.ndjson | node parse.js
Expected:
  Logs of first 4 records or parse errors with line numbers.
If UTF-8 error: node will throw \"Unexpected token\" at byte offset; check encoding.
If line too long: custom error thrown: \"Line exceeds maxLineLength at 1050000 bytes\".

## Information Dense Extract
newline = U+000A separator; each record = standalone JSON text; content-type = application/x-ndjson; charset=UTF-8; invalid UTF-8 or empty line => error; parser pattern: stream→split at '\n'→JSON.parse; config: maxLineLength=1MB, skipEmpty=false, onError callback; Node/Python/Go examples above.

## Sanitised Extract
Table of Contents

1 Format Definition
2 Content-Type
3 Character Encoding
4 Record Syntax
5 Parsing Rules
6 Error Handling
7 Examples

1 Format Definition
Each record is a valid JSON text terminated by a newline (U+000A). No other separators.

2 Content-Type
application/x-ndjson

3 Character Encoding
UTF-8 only. Reject invalid sequences.

4 Record Syntax
- Valid JSON values: object, array, string, number, boolean, null
- No trailing characters beyond newline
- Empty lines invalid

5 Parsing Rules
- Read bytes until newline
- Exclude newline, parse JSON text
- On error, emit record-level exception
- Continue until EOF

6 Error Handling
- Malformed JSON: parser must throw record error with line index
- Invalid UTF-8: stream-level error

7 Examples
Sample lines:
{ 'foo': 'bar' }
{'a':1,'nested':{'b':[2,3,4]}}

## Original Source
Newline Delimited JSON (NDJSON) Specification
http://ndjson.org/

## Digest of NDJSON_SPEC

# NDJSON Specification

# Format Definition
Each line in an NDJSON stream is a complete JSON text. Lines are separated by the newline character (U+000A). No other separators or framing characters are used.

# Content-Type
application/x-ndjson

# Record Syntax
- Each record must be a valid JSON text: object, array, number, string, boolean or null.
- A record must end exactly at the newline; no extra characters allowed.
- Empty lines are invalid and must be rejected by strict parsers.

# Character Encoding
- UTF-8 is the normative encoding.
- Parsers must reject streams containing invalid UTF-8.

# Parsing Rules
1. Read bytes until newline (0x0A).
2. Interpret the bytes (excluding the newline) as a standalone JSON text.
3. Parse with a standard JSON parser.
4. Repeat until end-of-file.

# Examples
{ "foo": "bar" }
{"a":1,"b":[2,3,4]}

# Error Handling
- Any malformed JSON in a line must cause the parser to throw or return an error.
- In streaming contexts, parsers may emit a record-level error event with line number.

# Use Cases
- Log files: each log entry is a JSON object on a line.
- Data exchange: streaming large JSON datasets line by line.

# Compliance
Strict conformance requires every line to parse independently. Parsers may implement optional modes to skip empty lines or comments, but these are non-standard.


## Attribution
- Source: Newline Delimited JSON (NDJSON) Specification
- URL: http://ndjson.org/
- License: License: CC0
- Crawl Date: 2025-05-06T03:33:34.142Z
- Data Size: 247044 bytes
- Links Found: 158

## Retrieved
2025-05-06
library/SUPERTEST.md
# library/SUPERTEST.md
# SUPERTEST

## Crawl Summary
Installation: npm install supertest --save-dev. Initialize: const request = require('supertest'); request(app[,options]) returns Test bound to an ephemeral port. Options: {http2:boolean}. Methods: get, post, put, patch, delete, head, options; each returns Test. Configuration: .send(body), .set(field,value), .auth(user,pass,options). Multipart: .field(name,value[,options]), .attach(field,file[,options]). Expectations: .expect(status[,fn]), .expect(status,body[,fn]), .expect(body[,fn]), .expect(field,value[,fn]), .expect(fn). Expectations run in order; failures passed to .end. Finalize: .end(fn) or promise thenable. Response: {status,headers,body,text}. Supports callbacks, promises, async/await. HTTP/2: request(app,{http2:true}), request.agent(app,{http2:true}). Agent: maintain cookies.

## Normalised Extract
Table of Contents:
1. Installation & Setup
2. Initialization
3. HTTP Methods
4. Request Configuration
5. File Upload (Multipart)
6. Expectations API
7. Finalizing Requests
8. Response Structure
9. Promise & Async Support
10. HTTP/2 Option
11. Agent & Cookie Persistence

1. Installation & Setup
npm install supertest --save-dev

2. Initialization
const request = require('supertest');

3. HTTP Methods
request(app,options).get(path) → Test
request(app,options).post(path) → Test
request(app,options).put(path) → Test
request(app,options).patch(path) → Test
request(app,options).delete(path) → Test
request(app,options).head(path) → Test
request(app,options).options(path) → Test

4. Request Configuration
.send(body: any) → Test  // JSON if object, form otherwise
.set(field: string, value: string|RegExp) → Test
.auth(user: string, pass: string, options?: {type?:string}) → Test  // type defaults to basic

5. File Upload (Multipart)
.field(name: string, value: string, options?: {contentType:string}) → Test
.attach(field: string, file: string|Buffer, options?: {filename?:string,contentType?:string}) → Test

6. Expectations API
.expect(status: number[, fn]) → Test
.expect(status: number, body: any[, fn]) → Test
.expect(body: string|RegExp|object[, fn]) → Test
.expect(field: string, value: string|RegExp[, fn]) → Test
.expect(assertFn: (res:Response)=>void) → Test

7. Finalizing Requests
.end(fn?: (err:Error,res:Response)=>void) → void

8. Response Structure
status: number
headers: object
body: any
text: string

9. Promise & Async Support
Test implements Promise<Response>
// Promise
test.then(res=>{})
// Async/Await
const res=await test;

10. HTTP/2 Option
request(app,{http2:true})
request.agent(app,{http2:true})

11. Agent & Cookie Persistence
const agent = request.agent(app[,options]);
agent.get(path)
     .expect('set-cookie',cookieString)
     .end();

## Supplementary Details
- Default port: ephemeral if server not listening
- Error behavior: HTTP errors (non-2xx) passed as err argument if no .expect(status)
- Order of .expect calls determines execution sequence
- JSON payload: .send(obj) sets Content-Type: application/json
- x-www-form-urlencoded payload: .send('key=value') sets Content-Type: application/x-www-form-urlencoded
- Cookie header: .set('Cookie', ['key1=val1;key2=val2'])
- Agent retains cookies set via Set-Cookie across subsequent calls
- HTTP Basic auth: .auth(user,pass,'basic') sets Authorization: Basic base64(user:pass)
- Bearer auth: .auth(token,{type:'bearer'}) sets Authorization: Bearer token
- Custom assertion: .expect(res=>{ if(condition) throw new Error() })


## Reference Details
// Complete Test usage pattern
// 1. Install
npm install supertest --save-dev

// 2. Import
const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());
app.post('/users', (req,res)=>{ res.status(201).json({id:'123',name:req.body.name}); });

// 3. Callback style
request(app)
  .post('/users')                        // method and path
  .send({name:'john'})                   // JSON payload
  .set('Accept','application/json')      // header
  .expect('Content-Type',/json/)         // header assertion
  .expect(201, {id:'123',name:'john'})   // status and body assertion
  .end((err,res)=>{                      // finalize
    if(err) return done(err);
    return done();
  });

// 4. Promise style
return request(app)
  .get('/users')
  .set('Accept','application/json')
  .expect(200)
  .then(res=>{
    expect(res.body).toHaveProperty('email');
  });

// 5. Async/Await
it('should fetch user', async ()=>{
  const res = await request(app)
    .get('/users/123')
    .expect(200);
  expect(res.headers['content-type']).toMatch(/json/);
});

// 6. HTTP/2
const http2Req = request(app,{http2:true}).get('/user');

// 7. Agent & Cookies
const agent = request.agent(app);
agent.get('/login').expect('set-cookie','sid=abc; Path=/; HttpOnly');
agent.get('/profile').expect(200, done);

// 8. File upload
request(app)
  .post('/upload')
  .field('name','avatar')
  .attach('file','./avatar.jpg',{filename:'avatar.jpg',contentType:'image/jpeg'})
  .expect(200, done);

// 9. Custom assertion
request(app)
  .get('/data')
  .expect(res=>{
    if(!res.body.items.length) throw new Error('No items');
  })
  .end(done);

// 10. Troubleshooting
// Test hangs: ensure .end(done) or return promise
// Unexpected JSON parsing: confirm express.json() middleware loaded
// HTTP/2 failed: check Node.js HTTP/2 support version

// Default Config Options
// http2: false


## Information Dense Extract
npm install supertest --save-dev; const request=require('supertest'); request(app[, {http2:boolean}]) → Test; request.agent(app[, {http2}]) → Test; HTTP methods: .get(path), .post(path), .put(path), .patch(path), .delete(path), .head(path), .options(path); config: .send(body), .set(field,value), .auth(user,pass[,options]); multipart: .field(name,value[,options]), .attach(field,file[,options]); expectations: .expect(status[,fn]), .expect(status,body[,fn]), .expect(body[,fn]), .expect(field,value[,fn]), .expect(fn); finalize: .end(fn) or promise thenable; Response: {status,headers,body,text}; errors: non-2xx → err if no .expect(status); agent retains Set-Cookie; order of expects enforced; async/await supported; http2 opt; custom assertions; troubleshooting: missing .end or return; JSON payload via express.json().

## Sanitised Extract
Table of Contents:
1. Installation & Setup
2. Initialization
3. HTTP Methods
4. Request Configuration
5. File Upload (Multipart)
6. Expectations API
7. Finalizing Requests
8. Response Structure
9. Promise & Async Support
10. HTTP/2 Option
11. Agent & Cookie Persistence

1. Installation & Setup
npm install supertest --save-dev

2. Initialization
const request = require('supertest');

3. HTTP Methods
request(app,options).get(path)  Test
request(app,options).post(path)  Test
request(app,options).put(path)  Test
request(app,options).patch(path)  Test
request(app,options).delete(path)  Test
request(app,options).head(path)  Test
request(app,options).options(path)  Test

4. Request Configuration
.send(body: any)  Test  // JSON if object, form otherwise
.set(field: string, value: string|RegExp)  Test
.auth(user: string, pass: string, options?: {type?:string})  Test  // type defaults to basic

5. File Upload (Multipart)
.field(name: string, value: string, options?: {contentType:string})  Test
.attach(field: string, file: string|Buffer, options?: {filename?:string,contentType?:string})  Test

6. Expectations API
.expect(status: number[, fn])  Test
.expect(status: number, body: any[, fn])  Test
.expect(body: string|RegExp|object[, fn])  Test
.expect(field: string, value: string|RegExp[, fn])  Test
.expect(assertFn: (res:Response)=>void)  Test

7. Finalizing Requests
.end(fn?: (err:Error,res:Response)=>void)  void

8. Response Structure
status: number
headers: object
body: any
text: string

9. Promise & Async Support
Test implements Promise<Response>
// Promise
test.then(res=>{})
// Async/Await
const res=await test;

10. HTTP/2 Option
request(app,{http2:true})
request.agent(app,{http2:true})

11. Agent & Cookie Persistence
const agent = request.agent(app[,options]);
agent.get(path)
     .expect('set-cookie',cookieString)
     .end();

## Original Source
Supertest HTTP Assertions Library
https://github.com/visionmedia/supertest#readme

## Digest of SUPERTEST

# Installation

npm install supertest --save-dev

# Initialization

Import SuperTest and create a Test function:

```js
const request = require('supertest');
// or
import request from 'supertest';
```

# request(app[, options])

- **app**: http.Server|Function
- **options**: { http2?: boolean }
  - http2: enable HTTP/2 protocol (default: false)

Returns a Test instance bound to app on an ephemeral port if not listening.

# request.agent(app[, options])

Creates a persistent Test instance that maintains cookies across requests.

# HTTP Methods

Test.VERB(path)

- **path**: string URL or route
- VERB ∈ {get, post, put, patch, delete, head, options}

Each method returns a Test instance.

# Request Configuration

- .send(body: any): Test     – sets JSON or form payload based on type
- .set(field: string, value: string|RegExp): Test  – set HTTP header
- .auth(user: string, pass: string, options?: { type?: string }): Test – HTTP Basic or Bearer auth

# File Uploads (Multipart Form)

- .field(name: string, value: string, options?: { contentType: string }): Test
- .attach(field: string, file: string|Buffer, options?: { filename?: string, contentType?: string }): Test

# Expectations

- .expect(status: number[, fn]): Test
- .expect(status: number, body: any[, fn]): Test
- .expect(body: string|RegExp|object[, fn]): Test
- .expect(field: string, value: string|RegExp[, fn]): Test
- .expect(assertFn: (res: Response) => void): Test

Expectations are executed in definition order. Assertion failure returns error to .end callback unless thrown manually.

# Finalizing the Test

- .end(fn?: (err: Error, res: Response) => void): void

If no callback is provided, Test instance is a thenable Promise resolving with Response.

# Response Object

- **status**: number
- **headers**: object
- **body**: any (parsed JSON or text)
- **text**: string (raw response body)

# Callbacks, Promises, Async/Await

```js
// Callback
request(app).get('/user').expect(200).end((err,res)=>{ if(err) throw err });

// Promise
return request(app).get('/users').expect(200).then(res=>{ /* assertions */ });

// Async/Await
const res = await request(app).get('/users').expect(200);
```

# HTTP2 Support

Enable HTTP/2 with options:
```js
request(app,{http2:true})
request.agent(app,{http2:true})
```

# Agent (Cookie Persistence)

```js
const agent = request.agent(app);
agent.get('/').expect('set-cookie','cookie=hey; Path=/');
agent.get('/return').expect('hey');
```


## Attribution
- Source: Supertest HTTP Assertions Library
- URL: https://github.com/visionmedia/supertest#readme
- License: License: MIT
- Crawl Date: 2025-05-06T22:28:57.624Z
- Data Size: 658264 bytes
- Links Found: 5412

## Retrieved
2025-05-06
