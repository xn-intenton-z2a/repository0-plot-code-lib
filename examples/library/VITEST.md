# VITEST

## Crawl Summary
Vitest is a Vite-native testing framework that integrates with Vite config. It supports ESM, TypeScript, and JSX. The installation commands (npm/yarn/pnpm, bun) are provided along with test examples. Configuration can be defined in vite.config.ts or vitest.config.ts and merged when needed. CLI options include test, coverage, update, and watch modes. Dependency handling options such as deps.external, deps.inline, and optimizer settings are available. Environment configurations (node, jsdom, happy-dom) are supported via docblocks and config. Workspaces for monorepo setups and aliasing for module resolution are also documented.

## Normalised Extract
## Table of Contents
1. Introduction and Overview
2. Installation and Setup
3. Writing Tests
4. Configuration Options
5. CLI Commands
6. Dependency Handling
7. Environment Configuration
8. Workspace Support and Aliases
9. Troubleshooting and Best Practices

### 1. Introduction and Overview
- Vitest is a fast, Vite-native testing framework with ESM, TypeScript, and JSX support.
- Uses esbuild for transformation.

### 2. Installation and Setup
- Install via npm: `npm install -D vitest`
- Requires: Vite >= v5.0.0, Node >= v18.0.0

### 3. Writing Tests
- Example: sum function and test file

```js
// sum.js
export function sum(a, b) {
  return a + b;
}

// sum.test.js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

### 4. Configuration Options
- **vite.config.ts / vitest.config.ts**: Define test options within a `test` property

```ts
// vite.config.ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: false,
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    server: {
      sourcemap: 'inline',
      deps: {
        external: [/\/node_modules\//],
        inline: []
      }
    }
  }
});
```

- **Merging Configurations:** Use `mergeConfig` to combine Vite and Vitest config.

### 5. CLI Commands
- Run tests: `npx vitest`
- Single run: `vitest run`
- Coverage: `vitest run --coverage`
- Additional flags: `--config`, `--watch`, `--update`

### 6. Dependency Handling
- **deps.external:** Externals modules matching `/\/node_modules\//`
- **deps.inline:** Inline modules; set to `true` to inline all dependencies or an array of specific modules
- **deps.optimizer:** Bundles dependencies via esbuild. Inherits options from Vite's optimizeDeps.

### 7. Environment Configuration
- Default environment: `node`
- Use docblock comments to switch environment:

```js
/** @vitest-environment jsdom */
```

- Custom environment definition example:

```ts
// custom environment
import type { Environment } from 'vitest';

export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',
  setup() {
    return {
      teardown() {
        // cleanup
      }
    };
  }
};
```

### 8. Workspace Support and Aliases
- **Workspace File:** Define multiple project configurations in `vitest.workspace.ts`

```ts
import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  'packages/*',
  'tests/*/vitest.config.{e2e,unit}.ts',
  { test: { name: 'node', root: './shared_tests', environment: 'node', setupFiles: ['./setup.node.ts'] } }
]);
```

- **Aliases:** Set custom module aliases in the config:

```ts
alias: {
  'react': 'preact/compat'
}
```

### 9. Troubleshooting and Best Practices
- **Watch Mode:** Use `--watch` to re-run only changed tests.
- **For Bun Users:** Use `bun run test` instead of `bun test`.
- **Dependency Checks:** Disable automatic dependency installation using `VITEST_SKIP_INSTALL_CHECKS=1`.
- **Debug Options:** Use `server.debug.dumpModules` to dump transformed modules for inspection.


## Supplementary Details
### Supplementary Technical Specifications

1. **Installation Requirements**:
   - Vite >= v5.0.0
   - Node >= v18.0.0

2. **Configuration Parameters (Examples):**

- In `vite.config.ts` / `vitest.config.ts`:

```ts
export default defineConfig({
  test: {
    globals: false, // Enable global APIs if set to true
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/cypress/**'],
    server: {
      sourcemap: 'inline',
      debug: {
        dumpModules: true
      },
      deps: {
        external: [/\/node_modules\//],
        inline: [],
        cacheDir: 'node_modules/.vite'
      }
    }
  }
});
```

3. **CLI Options:**
   - Use `npx vitest --help` for full list.
   - Examples:
     - `vitest run --coverage`
     - `vitest --watch`
     - `vitest --config ./path/to/vitest.config.ts`

4. **Test File Naming Conventions:**
   - Files must contain `.test.` or `.spec.` in their filename

5. **Best Practices:**
   - Use a single config file for Vite and Vitest to avoid overriding configurations unless custom conditions are needed.
   - Leverage workspaces for monorepo setups, ensuring each workspace defines its own environment and setup files.
   - Set a custom alias for dependencies to ensure compatibility when using externalized modules.

6. **Troubleshooting Commands:**
   - To force rebundling for debugging issues, adjust `deps.optimizer.force` flag in the config.
   - If tests fail with CJS module errors, enable `deps.interopDefault: true` in the config.
   - For detailed logging, set environment variable `DEBUG=vitest*` prior to running tests.


## Reference Details
### Complete API Specifications and Code Examples

#### 1. Vitest API and SDK Method Signatures

- **Test Function Signature:**
  ```ts
test(description: string, callback: () => void | Promise<void>): void;
// Example:
import { test, expect } from 'vitest';

test('example test case', () => {
  expect(true).toBe(true);
});
  ```

- **Expect API:**
  ```ts
texpect(value: any): { toBe(expected: any): void; toEqual(expected: any): void; };
// Example:
expect(sum(1, 2)).toBe(3);
  ```

#### 2. Configuration API

- **Vite Config with Vitest Test Property:**
  ```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: false,
    include: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    server: {
      sourcemap: 'inline',
      debug: {
        dumpModules: true
      },
      deps: {
        external: [/\/node_modules\//],
        inline: [],
        cacheDir: 'node_modules/.vite'
      }
    }
  }
});
  ```

- **Separate Vitest Config (vitest.config.ts):**
  ```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Specify tests configuration
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    setupFiles: ['./vitest.setup.ts'],
    reporters: 'default',
    update: false
  }
});
  ```

#### 3. CLI Commands and Usage

- **Run Tests:**
  ```bash
  npx vitest
  ```

- **Run with Coverage:**
  ```bash
  npx vitest run --coverage
  ```

- **Run in Watch Mode:**
  ```bash
  npx vitest --watch
  ```

- **Specify Config File:**
  ```bash
  npx vitest --config ./path/to/vitest.config.ts
  ```

#### 4. Code Examples with Comments

- **Simple Addition Test Example:**

  *sum.js*
  ```js
  // Function to add two numbers
  export function sum(a, b) {
    return a + b;
  }
  ```

  *sum.test.js*
  ```js
  // Import the test APIs and the sum function
  import { expect, test } from 'vitest';
  import { sum } from './sum.js';

  // Define a test case
  test('adds 1 + 2 to equal 3', () => {
    // Assert that the sum of 1 and 2 equals 3
    expect(sum(1, 2)).toBe(3);
  });
  ```

#### 5. Detailed Troubleshooting Procedures

- **Dependency Rebundling Issue:**
  - If modules are not inline as expected, set `deps.optimizer.force` in your config:
    ```ts
    deps: {
      optimizer: {
        force: true
      }
    }
    ```

- **CJS Module Import Errors:**
  - Enable `deps.interopDefault` to interpret default exports correctly:
    ```ts
deps: {
  interopDefault: true
}
    ```

- **Debugging Module Transformation:**
  - Enable verbose dump using `server.debug.dumpModules: true` and check the output folder.

- **Command to Check Available CLI Options:**
  ```bash
  npx vitest --help
  ```

This complete technical document includes all the necessary API specifications, method signatures, full code examples, implementation patterns, configuration options with exact defaults and values, best practices, and troubleshooting commands for using Vitest directly in your projects.

## Original Source
Vitest Documentation
https://vitest.dev/

## Digest of VITEST

# Vitest Documentation Digest

**Retrieved on:** 2023-10-27

## Overview and Getting Started

- *Vitest* is a next-generation, Vite-native testing framework with out-of-box ESM, TypeScript, and JSX support powered by esbuild.
- Uses Vite configuration (vite.config.ts) by default but allows overriding via vitest.config.ts or CLI (--config option).

## Installation

Use one of these commands to install Vitest as a dev dependency:

```bash
npm install -D vitest
# OR
yarn add -D vitest
# OR
pnpm add -D vitest
# OR
bun add -D vitest
```

**Note:** Vitest requires Vite >= v5.0.0 and Node >= v18.0.0.

## Writing Tests

Example test files:

*sum.js*
```js
export function sum(a, b) {
  return a + b;
}
```

*sum.test.js*
```js
import { expect, test } from 'vitest';
import { sum } from './sum.js';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```

Add the following to package.json to run tests:

```json
{
  "scripts": {
    "test": "vitest"
  }
}
```

## Configuration

Vitest supports unified configuration with Vite as well as separate config files. 

**Example using vite.config.ts with Vitest test property:**

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    // Specify test options here
  }
});
```

**Separate Vitest configuration (vitest.config.ts):**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ... Specify options here
  }
});
```

You can merge Vite and Vitest config:

```ts
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config.mjs';

export default mergeConfig(viteConfig, defineConfig({
  test: {
    // ... test configuration
  }
}));
```

## CLI and Command Usage

- Run tests: `npx vitest` (or via your package manager scripts)
- Run once without watch: `vitest run`
- Coverage: `vitest run --coverage`
- Additional options: `--port`, `--https`, `--update`, `--watch`

## Dependency Handling and Optimization

- **deps.external:** Externalizes packages (default: [/\/node_modules\//]).
- **deps.inline:** Inline processed modules. Can be set to an array or `true` for all dependencies.
- **deps.optimizer:** Bundling options for dependencies. Extended via Vite optimizeDeps configuration.

## Environment Configuration

Set the environment via configuration or docblock in test files:

```js
/**
 * @vitest-environment jsdom
 */

test('sample test', () => {
  const div = document.createElement('div');
  expect(div).not.toBeNull();
});
```

Built-in environments include `node`, `jsdom`, `happy-dom`, `edge-runtime`. Custom environments can be defined using a package `vitest-environment-{name}`.

## Workspaces and Aliases

Vitest supports workspaces via a `vitest.workspace.ts` file:

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
]);
```

Aliases can be defined in the configuration directly:

```ts
alias: {
  'react': 'preact/compat'
}
```

## Detailed Configuration Options

- **include:** (string[]) Glob patterns for test files. Default: `['**/*.{test,spec}.?(c|m)[jt]s?(x)']`.
- **exclude:** (string[]) Glob patterns to exclude. Default: `['**/node_modules/**', '**/dist/**', '**/cypress/**', '**/.{idea,git,cache,output,temp}/**', '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*']`.
- **server:** Configs for Vite-Node with options such as `sourcemap` (default `'inline'`), `debug`, and `deps` options.
- **runner:** Specify custom test runner. Default: `node`.
- **benchmark:** Options include `include`, `exclude`, `reporters`, `outputJson` etc.
- **globals:** (boolean) Default: `false`. Enable global APIs like Jest.

For full option definitions, refer to the configuration examples above.

## Troubleshooting and Best Practices

- **Watch Mode:** Use `--watch` to run only changed tests.
- **Bun Users:** Use `bun run test` instead of `bun test` to avoid conflicts with Bun's test runner.
- **Dependency Issues:** Set `VITEST_SKIP_INSTALL_CHECKS=1` to disable automatic dependency checks.
- **Debugging:** Use `deps.optimizer.force` to force rebundling for debugging. Use `server.debug.dumpModules` to dump transformed modules for inspection.

---

**Attribution:** Vitest documentation content crawled from vitest.dev.
**Data Size:** 38121185 bytes

## Attribution
- Source: Vitest Documentation
- URL: https://vitest.dev/
- License: Unknown
- Crawl Date: 2025-04-21T16:51:08.154Z
- Data Size: 38121185 bytes
- Links Found: 25823

## Retrieved
2025-04-21
