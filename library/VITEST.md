# VITEST

## Crawl Summary
Vitest framework provides Vite-native testing with ESM, TS, JSX support. Installation commands, file naming conventions (.test. / .spec.), integration with Vite config (vite.config.ts or vitest.config.ts), CLI options (--config, --watch, --globals), workspace configuration syntax, detailed server.deps and environment properties, and troubleshooting instructions for bundling and dependency issues are specified.

## Normalised Extract
Table of Contents:
1. Installation & Setup
   - Commands: npm install -D vitest, yarn add -D vitest
   - Requirements: Vite >= v5.0.0, Node >= v18.0.0
   - Use npx vitest for direct execution
2. Writing Tests
   - File naming: .test. or .spec.
   - Basic test structure using expect and test from vitest
   - Package.json script: "test": "vitest"
3. Configuration
   - Using root vite.config.ts: Uses plugins, resolve.alias
   - Separate vitest.config.ts with defineConfig from vitest/config
   - Merging config via mergeConfig
   - Key properties: include, exclude, globals, workspace
4. Server & Dependency Options
   - server.deps.external: Default [/\/node_modules\//]
   - server.deps.inline: Option to inline modules; true to process all
   - deps.optimizer: Bundler options with mode-specific settings (ssr for node, web for jsdom)
5. Environment Options
   - environment: 'node', 'jsdom', 'happy-dom', 'edge-runtime'
   - Custom environment creation via vitest-environment-{name} with defined setup and teardown
6. CLI and Watch Mode
   - CLI flags: --config, --watch, --globals
   - Default behavior in interactive vs CI environments
7. Workspaces
   - Defining workspaces with glob patterns or specific config objects
8. Best Practices & Troubleshooting
   - Debug dependency issues using cacheDir and optimizer.force flags
   - Using proper command for Bun package manager (bun run test)
   - TS configuration for globals and environment types

Each topic includes explicit commands, configuration values, and code patterns directly usable in projects.

## Supplementary Details
Installation: npm install -D vitest; requires Vite >=v5.0.0, Node >=v18.0.0. Test file must have .test. or .spec. extension. package.json script: { "scripts": { "test": "vitest" } }.

Configuration in vitest.config.ts (or vite.config.ts with test property):
  import { defineConfig } from 'vitest/config'
  export default defineConfig({
    test: {
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'],
      globals: false,
      environment: 'node',
      workspace: [
        'packages/*',
        'tests/*/vitest.config.{e2e,unit}.ts',
        { test: { name: 'happy-dom', root: './shared_tests', environment: 'happy-dom', setupFiles: ['./setup.happy-dom.ts'] } },
        { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } }
      ]
    },
    server: {
      sourcemap: 'inline',
      deps: {
        external: [/\/node_modules\//],
        inline: []
      }
    }
  })

CLI: vitest --config ./path/to/config; vitest run to run once without watch mode; use --watch to enable file watching.

Troubleshooting: For dependency issues, check cacheDir (default 'node_modules/.vite'); use environment variable VITEST_SKIP_INSTALL_CHECKS=1 to skip dependency installation checks; use bun run test if using Bun.

Best Practices: Use same file for Vite and Vitest if possible; add triple slash reference (e.g., /// <reference types="vitest/config" />) at the top of config files; add vitest/globals to tsconfig types when enabling globals.

## Reference Details
API Specifications:

Method: defineConfig from vitest/config
Signature: import { defineConfig } from 'vitest/config';
Return: Config object with a test property containing configuration parameters.

Example:
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    globals: true,
    environment: 'jsdom',
    // Additional CLI based properties
    reporters: 'default',
    watch: true,
    update: false
  },
  server: {
    sourcemap: 'inline',
    deps: {
      external: [/\/node_modules\//],
      inline: [],
      fallbackCJS: false,
      cacheDir: 'node_modules/.vite'
    }
  }
})

CLI Options:
--config: Specifies path to configuration file
--watch: Enable watch mode (default true in interactive)
--globals: Set to true to expose global APIs
--port, --https: Additional options for server

Full Code Example for a Test:
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

Configuration for Workspaces:
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

Troubleshooting Procedures:
1. If tests do not run, verify file naming conventions and package.json script configuration.
2. For dependency errors, run: npm install -D vitest, and check that Vite >= v5.0.0 and Node >= v18.0.0.
3. For bundling issues, examine node_modules/.vite cache and enable deps.optimizer.force option.
4. To debug with Bun, execute: bun run test.

Best Practices:
- Use unified configuration file if possible.
- Add triple slash directives for type resolution: /// <reference types="vitest/config" />
- Use environment variable VITEST_SKIP_INSTALL_CHECKS=1 to disable auto dependency installation checks when necessary.
- Ensure tsconfig.json includes "vitest/globals" for type definitions when using globals.

SDK Method Signatures:
Method: mergeConfig
Signature: import { mergeConfig } from 'vitest/config'
Parameter: viteConfig (object), vitestConfig (object)
Return: Merged configuration object.

## Information Dense Extract
Vitest: Installation (npm/yarn/pnpm/bun), Requirements (Vite>=5.0.0, Node>=18.0.0); Test File Naming: .test. or .spec.; Config via defineConfig({ test: { include, exclude, globals, environment, workspace } }); CLI flags: --config, --watch, --globals; Server options: server.sourcemap: 'inline', server.deps: { external: [/\/node_modules\//], inline: [] }; Dependency optimizer options; Environment options: 'node', 'jsdom', 'happy-dom', custom via vitest-environment-{name}; Code examples provided for tests, configuration, workspace merging; Troubleshooting: check file naming, cacheDir, VITEST_SKIP_INSTALL_CHECKS; API: defineConfig, mergeConfig with full signatures and sample usage.

## Sanitised Extract
Table of Contents:
1. Installation & Setup
   - Commands: npm install -D vitest, yarn add -D vitest
   - Requirements: Vite >= v5.0.0, Node >= v18.0.0
   - Use npx vitest for direct execution
2. Writing Tests
   - File naming: .test. or .spec.
   - Basic test structure using expect and test from vitest
   - Package.json script: 'test': 'vitest'
3. Configuration
   - Using root vite.config.ts: Uses plugins, resolve.alias
   - Separate vitest.config.ts with defineConfig from vitest/config
   - Merging config via mergeConfig
   - Key properties: include, exclude, globals, workspace
4. Server & Dependency Options
   - server.deps.external: Default [/'/node_modules'//]
   - server.deps.inline: Option to inline modules; true to process all
   - deps.optimizer: Bundler options with mode-specific settings (ssr for node, web for jsdom)
5. Environment Options
   - environment: 'node', 'jsdom', 'happy-dom', 'edge-runtime'
   - Custom environment creation via vitest-environment-{name} with defined setup and teardown
6. CLI and Watch Mode
   - CLI flags: --config, --watch, --globals
   - Default behavior in interactive vs CI environments
7. Workspaces
   - Defining workspaces with glob patterns or specific config objects
8. Best Practices & Troubleshooting
   - Debug dependency issues using cacheDir and optimizer.force flags
   - Using proper command for Bun package manager (bun run test)
   - TS configuration for globals and environment types

Each topic includes explicit commands, configuration values, and code patterns directly usable in projects.

## Original Source
Vitest Documentation
https://vitest.dev/

## Digest of VITEST

# Vitest Documentation

### Overview
Vitest is a next generation testing framework powered by Vite. It supports ESM, TypeScript, and JSX out-of-box, and integrates with Vite’s configuration, including plugins and alias resolution. Vitest is compatible with Jest, offering expect, snapshot, and coverage features with a smart instant watch mode.

### Installation & Setup
To add Vitest, execute one of these commands:
  npm install -D vitest
  yarn add -D vitest
  pnpm add -D vitest
  bun add -D vitest

Vitest requires Vite >= v5.0.0 and Node >= v18.0.0. For running tests directly without installation, use:
  npx vitest

### Writing Tests
Example of a test file using Vitest:

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

Ensure test files contain .test. or .spec. in their filename. Add the following to package.json:

  {
    "scripts": {
      "test": "vitest"
    }
  }

Run tests with npm run test, yarn test, or pnpm test.

### Configuring Vitest
Vitest can use the root Vite config (vite.config.ts) or a separate config file (vitest.config.ts). When using a separate file, use:

  import { defineConfig } from 'vitest/config'
  export default defineConfig({
    test: {
      // custom configuration
    }
  })

Or merge with existing Vite config using mergeConfig:

  import { defineConfig, mergeConfig } from 'vitest/config'
  import viteConfig from './vite.config.mjs'
  export default mergeConfig(viteConfig, defineConfig({
    test: { 
      // additional options
    }
  }))

Main configuration properties include:
  include: Glob patterns to match test files (default: "**/*.{test,spec}.?(c|m)[jt]s?(x)")
  exclude: Patterns to exclude (default: ['**/node_modules/**', '**/dist/**', ...])
  globals: Boolean to expose global APIs; set to true for Jest-like global methods.

#### Server and Dependency Options
Vitest leverages Vite’s transformation pipeline. Key server options include inline source maps, debugging options, and dependency resolution settings such as:
  server.deps.external (default: [/\/node_modules\//])
  server.deps.inline (string | RegExp array or true for all dependencies)
  deps.optimizer settings for bundling external modules.

#### Environment Options
Define test environment via the environment property (node, jsdom, happy-dom, edge-runtime). Specify custom environments by creating a package "vitest-environment-{name}" that exports an Environment object with setup and teardown steps.

#### CLI & Watch Mode
Vitest binary can be invoked in npm scripts. Common CLI flags include:
  --config to specify a config file
  --watch to enable watch mode (default in interactive terminals)
  --globals=true to expose global test APIs

### Workspace Support
Vitest supports multiple project configurations with workspaces. In vitest.config.ts, define a workspace array of configurations. Example:

  workspace: [
    'packages/*',
    'tests/*/vitest.config.{e2e,unit}.ts',
    { test: { name: 'happy-dom', root: './shared_tests', environment: 'happy-dom', setupFiles: ['./setup.happy-dom.ts'] } },
    { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } }
  ]

### Troubleshooting & Best Practices
- Ensure Vite and Node versions meet requirements.
- For debugging dependency inlining, check cache in node_modules/.vite and use deps.optimizer.force option.
- When using Bun, run tests with bun run test instead of bun test to avoid conflicts with Bun's own runner.
- For type safety with globals, add "vitest/globals" to tsconfig types.

Retrieved on: 2023-10-XX | Data Size: 43254039 bytes | Links Found: 26454

## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev/
- License: MIT License
- Crawl Date: 2025-04-29T01:08:45.522Z
- Data Size: 43254039 bytes
- Links Found: 26454

## Retrieved
2025-04-29
