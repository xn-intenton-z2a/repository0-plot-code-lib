# VITEST_DOC

## Crawl Summary
Vitest is a Vite-powered testing framework with support for ESM, TypeScript, and JSX. It provides unified configuration through vite.config files, supports workspaces for monorepo setups, and offers a wide range of configuration options including CLI flags, environment settings, dependency optimization, and test pool settings. Key technical configurations include detailed test file matching patterns, server and dependency settings, and options for global variables and aliasing. Detailed code examples and configuration file setups are provided for seamless integration and usage.

## Normalised Extract
**Table of Contents**
1. Getting Started & Installation
2. Writing Tests
3. Running Tests
4. Configuration (Separate and Vite-based)
5. CLI Options & Commands
6. Workspaces Support
7. Dependency Optimization & Server Options
8. Environment & Pool Configurations
9. Troubleshooting

---

1. **Getting Started & Installation**
   - Install Vitest via npm/yarn/pnpm/bun.
   - Ensure Vite >= 5.0.0 and Node >= 18.0.0.
   - Use `npx vitest` for direct execution.

2. **Writing Tests**
   - Code example for function and test file
   - Example snippets provided with clear file names (`sum.js`, `sum.test.js`).

3. **Running Tests**
   - Command examples: `npm run test`, `yarn test`, `pnpm test`.
   - Special note for Bun users: use `bun run test`.

4. **Configuration**
   - Separate file example: `vitest.config.ts` using `defineConfig` from 'vitest/config'.
   - Vite-based config with triple slash directives (`<reference types="vitest" />` or `<reference types="vitest/config" />`).
   - Merging configurations using `mergeConfig` from 'vitest/config'.

5. **CLI Options & Commands**
   - Script setup in package.json with `test` and `coverage` commands.
   - Options include `--config`, `--port`, `--https`, `--watch`, etc.

6. **Workspaces Support**
   - Define multiple projects using `vitest.workspace.ts`.
   - Example with glob patterns and custom test configurations (happy-dom, node).

7. **Dependency Optimization & Server Options**
   - Detailed configuration options for server, deps, and optimizer.
   - Options include `server.sourcemap`, `server.debug`, and dependency inlining.

8. **Environment & Pool Configurations**
   - Supports `node`, `jsdom`, `happy-dom`, etc.
   - Custom environment definition with full API shape.
   - Pool options like `threads`, `forks`, `vmThreads` etc.

9. **Troubleshooting**
   - Guidelines on Bun command usage, alias configurations, and handling memory in VM threads.
   - Steps to disable auto dependency installations and resolve module caching issues.


## Supplementary Details
### Detailed Configuration Specifications

- **Test File Matching**:
  - include: `["**/*.{test,spec}.?(c|m)[jt]s?(x)"]`
  - exclude: `["**/node_modules/**", "**/dist/**", "**/cypress/**", "**/.{idea,git,cache,output,temp}/**", "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*"]`

- **Global Options**:
  - globals: `false` (set to `true` to enable Jest-like global APIs)

- **Server Settings**:
  - server.sourcemap: `'inline'` (or boolean)
  - server.debug: { dumpModules: `boolean | string`, loadDumppedModules: `boolean` }
  - server.deps.external: Default `[ /\/node_modules\// ]`
  - server.deps.inline: Default `[]` or `true` to inline every dependency
  - server.deps.fallbackCJS: `false`
  - server.deps.cacheDir: `'node_modules/.vite'`

- **Dependency Optimizer**:
  - deps.optimizer: Supports options for `ssr` and `web` modes; integrates with Vite's optimizeDeps.
  - deps.web.transformAssets: `true`
  - deps.web.transformCss: `true`
  - deps.web.transformGlobPattern: `[]`
  - deps.web.interopDefault: `true`

- **Environment Settings**:
  - environment: Defaults to `'node'`; alternatives: `'jsdom'`, `'happy-dom'`, `'edge-runtime'`, or custom string.
  - Custom environment example provided with a shape conforming to Vitest's Environment API.

- **Runner & Pool**:
  - runner: Default `'node'` (or specify benchmark runner)
  - pool: Options include `'threads'`, `'forks'`, `'vmThreads'`, `'vmForks'` with default being `'forks''.

- **Benchmark Options**:
  - benchmark.include: `["**/*.{bench,benchmark}.?(c|m)[jt]s?(x)"]`
  - benchmark.exclude: `["node_modules", "dist", ".idea", ".git", ".cache"]`
  - benchmark.reporters: `'default'`

**Implementation Steps for Configuring Vitest**:
1. Create/modify `vite.config.ts` or `vitest.config.ts` with a test property.
2. Use triple slash directives for type reference: `/// <reference types="vitest/config" />`.
3. Merge configurations if necessary with `mergeConfig`.
4. Define workspaces via a `vitest.workspace.ts` file for monorepo setups.
5. Setup package.json scripts to execute `vitest` or `vitest run --coverage`.

**Troubleshooting Steps**:
- For dependency issues, run: `export VITEST_SKIP_INSTALL_CHECKS=1`.
- If test runner errors occur on Bun, ensure to run `bun run test`.
- For alias problems, verify that aliases are defined in the Vite config and that they target node_modules directly.
- For memory leakage using vmThreads, consider using forks pool or adjust `deps.optimizer` settings.


## Reference Details
### Complete API Specifications & Code Examples

#### 1. Vitest Config API

- **defineConfig (from 'vitest/config')**:

  ```ts
  import { defineConfig } from 'vitest/config';

  export default defineConfig({
    test: {
      // File matching
      include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*'],

      // Global APIs
      globals: false,

      // Server configuration
      // sourcemap can be 'inline' or boolean
      // debug: { dumpModules: boolean | string, loadDumppedModules: boolean }
      // deps: configuration with external, inline, fallbackCJS, cacheDir
      server: {
        sourcemap: 'inline',
        debug: {
          dumpModules: false,
          loadDumppedModules: false
        },
        deps: {
          external: [/\/node_modules\//],
          inline: [],
          fallbackCJS: false,
          cacheDir: 'node_modules/.vite'
        }
      },

      // Environment settings
      environment: 'node',

      // Runner and pool settings
      runner: 'node',
      pool: 'forks',

      // Benchmark options
      benchmark: {
        include: ['**/*.{bench,benchmark}.?(c|m)[jt]s?(x)'],
        exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
        reporters: 'default'
      }
    }
  });
  ```

#### 2. Merging Vite and Vitest Configs

  ```ts
  import { defineConfig, mergeConfig } from 'vitest/config';
  import viteConfig from './vite.config.mjs';

  export default mergeConfig(viteConfig, defineConfig({
    test: {
      exclude: ['packages/template/*']
    }
  }));
  ```

#### 3. Custom Environment Definition

  ```ts
  // environment.ts
  import type { Environment } from 'vitest';

  const customEnv: Environment = {
    name: 'custom',
    transformMode: 'ssr',
    setup() {
      // custom initialization
      return {
        teardown() {
          // cleanup code
        }
      };
    }
  };

  export default customEnv;
  ```

#### 4. Package.json Scripts Example

  ```json
  {
    "scripts": {
      "test": "vitest",
      "coverage": "vitest run --coverage"
    }
  }
  ```

#### 5. Troubleshooting Commands

- **Run Vitest tests once:**

  ```bash
  vitest run
  ```

- **Specify a custom config file:**

  ```bash
  vitest --config ./path/to/vitest.config.ts
  ```

- **Disable automatic dependency installation:**

  ```bash
  export VITEST_SKIP_INSTALL_CHECKS=1
  ```

- **Run tests in Bun:**

  ```bash
  bun run test
  ```

- **Check CLI options:**

  ```bash
  npx vitest --help
  ```

#### 6. Best Practices Implementation

- Use a unified configuration file (e.g., `vite.config.ts`) to avoid discrepancies between app and test setups.
- Leverage workspaces for monorepo projects by defining a `vitest.workspace.ts` with glob patterns and specific environment configs.
- Always include `.test.` or `.spec.` in your test file names to ensure they are discovered.
- For improved dependency handling, customize `server.deps.inline` and optimizer options.

These specifications and patterns are immediately applicable and complete for integrating Vitest into your project.


## Original Source
Vitest Documentation
https://vitest.dev/

## Digest of VITEST_DOC

# Vitest Documentation

**Retrieved Date:** 2023-10-12

## Getting Started

Vitest is a next generation testing framework powered by Vite. The documentation details the installation steps, configuration options, CLI commands, and integration examples.

### Installation

- Using npm:
  ```bash
  npm install -D vitest
  ```
- Using yarn:
  ```bash
  yarn add -D vitest
  ```
- Using pnpm:
  ```bash
  pnpm add -D vitest
  ```
- Using bun:
  ```bash
  bun add -D vitest
  ```

**Note:** Vitest requires Vite >=5.0.0 and Node >=18.0.0. If running via NPX, use:

```bash
npx vitest
```

### Writing Tests

Example: Create a function and its test.

**sum.js**
```js
export function sum(a, b) {
  return a + b;
}
```

**sum.test.js**
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

In your package.json add:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

### Running Tests

Run tests using:

- npm:
  ```bash
  npm run test
  ```
- yarn:
  ```bash
  yarn test
  ```
- pnpm:
  ```bash
  pnpm test
  ```

**Bun Users:** Run tests with `bun run test` (not `bun test`).

### Configuring Vitest

Vitest supports unified configuration with Vite. If a root `vite.config.ts` is found, Vitest will use its plugins and alias configuration.

#### Separate Config File

Create a separate `vitest.config.ts` for test-specific configuration:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Test options here
  }
});
```

#### Using Vite Config

When using Vite's config, add the `test` property and include a triple slash directive:

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // ... Specify options here
  }
});
```

**Migration:** The `<reference types="vitest" />` is being migrated to `<reference types="vitest/config" />`.

#### Merging Configurations

Using `mergeConfig` to merge Vite and Vitest configurations:

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // Test options
  }
}));
```

### Workspaces Support

Vitest supports running multiple project configurations with a workspace file. Example `vitest.workspace.ts`:

```ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  {
    test: {
      name: 'happy-dom',
      root: './shared_tests',
      environment: 'happy-dom',
      setupFiles: ['./setup.happy-dom.ts'],
    },
  },
  {
    test: {
      name: 'node',
      root: './shared_tests',
      environment: 'node',
      setupFiles: ['./setup.node.ts'],
    },
  },
]);
```

### Command Line Interface (CLI)

Default npm scripts in a scaffolded project:

```json
{
  "scripts": {
    "test": "vitest",
    "coverage": "vitest run --coverage"
  }
}
```

CLI options include:

- `vitest run` to run tests once.
- `--config ./path/to/vitest.config.ts` to specify a config file.
- Additional flags such as `--port`, `--https`, and `--watch`.

### Automatic Dependency Installation

Vitest prompts to install missing dependencies automatically. To disable, set:

```bash
export VITEST_SKIP_INSTALL_CHECKS=1
```

### IDE Integrations

An official VS Code extension is available on the VS Code Marketplace to improve testing experience.

## Configuration Options

### General Test Options:

- **include:** string[] (Default: `["**/*.{test,spec}.?(c|m)[jt]s?(x)"]`)
- **exclude:** string[] (Default: `["**/node_modules/**", "**/dist/**", "**/cypress/**", "**/.{idea,git,cache,output,temp}/**", "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*"]`)
- **globals:** boolean (Default: false). Enable global APIs similar to Jest.

### Server Options:

- **server.sourcemap:** 'inline' | boolean (Default: 'inline')
- **server.debug:** { dumpModules?: boolean | string, loadDumppedModules?: boolean }
- **server.deps:** {
    external: (string | RegExp)[] (Default: [/\/node_modules\//]),
    inline: (string | RegExp)[] | true (Default: []),
    fallbackCJS: boolean (Default: false),
    cacheDir: string (Default: 'node_modules/.vite')
  }

### Dependency Optimization Options:

- **deps.optimizer:** { ssr?: any, web?: any }
- **deps.web:** { transformAssets?: boolean (Default: true), transformCss?: boolean (Default: true), transformGlobPattern?: RegExp | RegExp[] (Default: []), interopDefault?: boolean (Default: true) }
- **deps.moduleDirectories:** string[] (Default: ['node_modules'])

### Environment Options:

- **environment:** 'node' | 'jsdom' | 'happy-dom' | 'edge-runtime' | string (Default: 'node')
- Custom environment can be defined by using a package such as `vitest-environment-{name}`.

### Runner and Pool Options:

- **runner:** Path to a custom test runner (Default: 'node' or 'benchmark')
- **pool:** 'threads' | 'forks' | 'vmThreads' | 'vmForks' (Default: 'forks')

### Benchmark Options:

- **benchmark.include:** string[] (Default: `["**/*.{bench,benchmark}.?(c|m)[jt]s?(x)"]`)
- **benchmark.exclude:** string[] (Default: `["node_modules", "dist", ".idea", ".git", ".cache"]`)
- **benchmark.reporters:** array (Default: 'default')

## Troubleshooting

- **Issue with Bun:** If using Bun, run tests with `bun run test`.
- **Alias Problems:** Ensure that aliases are defined for direct ES imports. For example, do not alias require calls.
- **Memory Leaks in VM Threads:** When using `vmThreads`, note that ES modules are cached indefinitely which might lead to memory leaks. Consider manual adjustments for memory management.
- **Missing Dependencies:** If Vitest prompts for dependency installation, set `VITEST_SKIP_INSTALL_CHECKS=1` to disable automatic installation.

## Attribution

Data Size: 36251597 bytes
Links Found: 25517
Error: None


## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev/
- License: MIT
- Crawl Date: 2025-04-21T05:48:54.154Z
- Data Size: 36251597 bytes
- Links Found: 25517

## Retrieved
2025-04-21
