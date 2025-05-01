# SVGO

## Crawl Summary
SVGO is a Node.js tool for optimizing SVG files with both CLI and API usage. Installation via npm, yarn, or pnpm is supported. Command-line usage allows processing single files or directories recursively. Configuration supports multipass processing, data URI formats, js2svg formatting options, and a plugin-based architecture. Default presets can be overridden for cleanupIds or inlineStyles, while custom plugins can be imported or defined inline. API usage includes the optimize function to optimize an SVG string and loadConfig to load configuration from a file.

## Normalised Extract
Table of Contents:
1. Installation
   - npm install -g svgo
   - yarn global add svgo
   - pnpm add -g svgo
2. Command-line Usage
   - Process single files: svgo one.svg two.svg -o one.min.svg two.min.svg
   - Process directory recursively: svgo -rf path/to/directory_with_svgs -o path/to/output_directory
   - Help: svgo --help
3. Configuration
   - File: svgo.config.mjs
   - Options: multipass (boolean), datauri ('base64'|'enc'|'unenc'), js2svg options (indent: number, pretty: boolean)
   - Plugins: preset-default, prefixIds (with parameters, e.g. prefix: 'uwu')
4. Default Preset
   - Overriding plugins: disable cleanupIds, modify inlineStyles option onlyMatchedOnce
5. Custom Plugins
   - Import external plugin using import syntax
   - Inline plugin structure: name, params, and function fn with parameters (ast, params, info)
6. API Usage
   - optimize function: Accepts svgString and options (path, multipass, etc.) returns { data: string }
   - loadConfig function: Returns configuration from svgo.config.mjs; can accept config file path and working directory

Details:
Installation is done using standard npm commands. Command-line usage enables processing of individual files or recursive folders via flags -r and -f. The svgo.config.mjs file configures multipass processing and js2svg formatting and allows a detailed plugin list. Default presets can be altered by specifying overrides. Custom plugins require a defined name, parameters, and a function that processes the AST. The optimize API call processes SVG with configurable options, and loadConfig resolves configuration files for further customization.

## Supplementary Details
Configuration Options in svgo.config.mjs:
- multipass: Default false; set to true for repeated optimization passes.
- datauri: 'base64' is default; alternatives include 'enc' or 'unenc'.
- js2svg: { indent: 4, pretty: false } where indent sets spacing and pretty controls formatting.
- plugins array: List may include strings like 'preset-default' and 'prefixIds', or objects for configuration:
   { name: 'prefixIds', params: { prefix: 'uwu' } }.

Default Preset Override Example:
{
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
          inlineStyles: { onlyMatchedOnce: false }
        }
      }
    }
  ]
}

API Functions:
- optimize(svgString: string, options: { path?: string, multipass?: boolean, ... }): { data: string }
- loadConfig(configFile?: string, cwd?: string): Promise<Configuration>

Implementation Steps:
1. Install SVGO globally or as a project dependency.
2. Create a configuration file (svgo.config.mjs) with desired options and plugins.
3. For CLI, run commands with correct flags (-r, -f, -o) to process SVG files.
4. For API usage, import optimize and loadConfig from 'svgo' and call them with appropriate parameters.
5. Use custom plugin definitions to extend functionality if needed.


## Reference Details
API Specifications:
1. optimize function:
   - Signature: optimize(svgString: string, options: { path?: string, multipass?: boolean, datauri?: 'base64' | 'enc' | 'unenc', js2svg?: { indent?: number, pretty?: boolean }, plugins?: Array<string | { name: string, params?: any, fn?: Function }> }): { data: string }
   - Returns: Object with property data containing the optimized SVG string.
   - Exceptions: Throws errors if SVG parsing fails or invalid configuration.

2. loadConfig function:
   - Signature: loadConfig(configFile?: string, cwd?: string): Promise<Configuration>
   - Returns: A promise that resolves to the configuration object loaded from svgo.config.mjs or the provided path.
   - Exceptions: Throws error if configuration file not found or malformed.

Example Code for optimize:
------------------------------------------------
import { optimize } from 'svgo';

const svgString = '<svg><!-- sample --></svg>';
const result = optimize(svgString, {
  path: 'sample.svg',
  multipass: true,
  datauri: 'base64',
  js2svg: { indent: 4, pretty: false },
  plugins: [
    'preset-default',
    {
      name: 'prefixIds',
      params: { prefix: 'uwu' }
    }
  ]
});

const optimizedSvg = result.data;
------------------------------------------------

Example Code for loadConfig:
------------------------------------------------
import { loadConfig } from 'svgo';

async function getConfig() {
  try {
    const config = await loadConfig();
    console.log(config);
  } catch (error) {
    console.error('Configuration load error', error);
  }
}

getConfig();
------------------------------------------------

Configuration File (svgo.config.mjs):
------------------------------------------------
export default {
  multipass: false,
  datauri: 'base64',
  js2svg: { indent: 4, pretty: false },
  plugins: [
    'preset-default',
    {
      name: 'prefixIds',
      params: { prefix: 'uwu' }
    }
  ]
};
------------------------------------------------

Troubleshooting Procedures:
- To verify installation, run: svgo --version
- For configuration errors, run with the --config option and check file path validity.
- Use verbose logging: svgo --debug to see detailed processing steps.
- If optimize fails, check SVG input validity and plugin configuration.
- For API errors, wrap calls in try/catch and log error messages.


## Information Dense Extract
SVGO; Installation: npm install -g svgo, yarn global add svgo, pnpm add -g svgo; CLI: svgo one.svg two.svg -o one.min.svg; Directory: svgo -rf <folder> -o <output>; Config file: svgo.config.mjs { multipass: false, datauri: 'base64', js2svg: { indent: 4, pretty: false }, plugins: ['preset-default', { name: 'prefixIds', params: { prefix: 'uwu' } }] }; Default preset override: { plugins: [{ name: 'preset-default', params: { overrides: { cleanupIds: false, inlineStyles: { onlyMatchedOnce: false } } } }] }; API: optimize(svgString, { path, multipass, ... }) returns { data: string }; loadConfig(configFile?, cwd?) returns Promise<Configuration>; Code examples provided with exact method signatures and troubleshooting commands: svgo --version, svgo --debug.

## Sanitised Extract
Table of Contents:
1. Installation
   - npm install -g svgo
   - yarn global add svgo
   - pnpm add -g svgo
2. Command-line Usage
   - Process single files: svgo one.svg two.svg -o one.min.svg two.min.svg
   - Process directory recursively: svgo -rf path/to/directory_with_svgs -o path/to/output_directory
   - Help: svgo --help
3. Configuration
   - File: svgo.config.mjs
   - Options: multipass (boolean), datauri ('base64'|'enc'|'unenc'), js2svg options (indent: number, pretty: boolean)
   - Plugins: preset-default, prefixIds (with parameters, e.g. prefix: 'uwu')
4. Default Preset
   - Overriding plugins: disable cleanupIds, modify inlineStyles option onlyMatchedOnce
5. Custom Plugins
   - Import external plugin using import syntax
   - Inline plugin structure: name, params, and function fn with parameters (ast, params, info)
6. API Usage
   - optimize function: Accepts svgString and options (path, multipass, etc.) returns { data: string }
   - loadConfig function: Returns configuration from svgo.config.mjs; can accept config file path and working directory

Details:
Installation is done using standard npm commands. Command-line usage enables processing of individual files or recursive folders via flags -r and -f. The svgo.config.mjs file configures multipass processing and js2svg formatting and allows a detailed plugin list. Default presets can be altered by specifying overrides. Custom plugins require a defined name, parameters, and a function that processes the AST. The optimize API call processes SVG with configurable options, and loadConfig resolves configuration files for further customization.

## Original Source
SVGO (SVG Optimizer) Documentation
https://github.com/svg/svgo

## Digest of SVGO

# SVGO Documentation

Retrieved Date: 2023-10-12

## Installation

npm install -g svgo

yarn global add svgo

pnpm add -g svgo

## Command-line Usage

Process single files:
svgo one.svg two.svg -o one.min.svg two.min.svg

Process a directory recursively:
svgo -rf path/to/directory_with_svgs -o path/to/output_directory

Display help:
svgo --help

## Configuration

SVGO supports a plugin architecture. It reads the configuration from a file named svgo.config.mjs or via the --config option. Key configuration parameters:

multipass: boolean (default: false)
datauri: string ('base64' | 'enc' | 'unenc')
js2svg: { indent: number (default: 4), pretty: boolean (default: false) }

Plugins example:

export default {
  multipass: false,
  datauri: 'base64',
  js2svg: {
    indent: 4,
    pretty: false
  },
  plugins: [
    'preset-default',
    'prefixIds',
    {
      name: 'prefixIds',
      params: { prefix: 'uwu' }
    }
  ]
};

## Default Preset

Customize the default preset by overriding plugins:

export default {
  plugins: [
    {
      name: 'preset-default',
      params: {
        overrides: {
          cleanupIds: false,
          inlineStyles: { onlyMatchedOnce: false }
        }
      }
    }
  ]
};

## Custom Plugins

You can include custom plugins either by importing or defining inline:

import importedPlugin from './imported-plugin';

export default {
  plugins: [
    importedPlugin,
    {
      name: 'customPlugin',
      params: { paramName: 'paramValue' },
      fn: (ast, params, info) => { /* custom optimization logic */ }
    }
  ]
};

## API Usage

### optimize Function

Import and use the optimize function to transform an SVG string:

import { optimize } from 'svgo';

const result = optimize(svgString, {
  path: 'path-to.svg',
  multipass: true
});

// Access the optimized SVG
const optimizedSvgString = result.data;

### loadConfig Function

Import and use loadConfig to resolve configuration from svgo.config.mjs:

import { loadConfig } from 'svgo';

const config = await loadConfig();

// or with custom path and working directory
const config = await loadConfig(configFile, cwd);


## Attribution
- Source: SVGO (SVG Optimizer) Documentation
- URL: https://github.com/svg/svgo
- License: MIT
- Crawl Date: 2025-05-01T17:46:38.548Z
- Data Size: 513178 bytes
- Links Found: 4396

## Retrieved
2025-05-01
