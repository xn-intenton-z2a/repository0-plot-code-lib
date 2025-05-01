# DOTENV

## Crawl Summary
Installs via npm, yarn, or bun. Loads environment variables from a .env file into process.env. Supports multiline values, inline and full-line comments using #, and offers API functions (config, parse, populate, decrypt). Command line options and environment variable overrides (dotenv_config_<option>) are available. Developers can preload dotenv using node -r dotenv/config. Default configuration options include path (.env at process.cwd()), encoding (utf8), debug (false), and override (false). Troubleshooting includes ensuring file location and using debug mode.

## Normalised Extract
Table of Contents:
  1. Installation & Usage
  2. .env File Specification
  3. API Functions
    a. config(options)
    b. parse(input, options)
    c. populate(target, source, options)
    d. decrypt (extended functionality)
  4. Command Line and Environment Overrides
  5. Troubleshooting and Best Practices

1. Installation & Usage: Install via npm (npm install dotenv --save), or yarn/bun. Load using require('dotenv').config() or import 'dotenv/config'.

2. .env File Specification: Format in KEY=VALUE pairs. Supports multiline values via literal newlines or \n escapes. Comments start with #. Trims whitespace for unquoted values.

3. API Functions:
  a. config(options): Reads .env file, parses it, sets variables. Returns object with { parsed: {KEY: value, ... } } or { error: Error }.
     Parameters:
       - path: default = process.cwd() + '/.env'
       - encoding: default 'utf8'
       - debug: default false
       - override: default false
       - processEnv: default process.env
  b. parse(input, options): Accepts String or Buffer, returns Object mapping keys to values. Option debug default false.
  c. populate(target, source, options): Merges source into target. Options: override (false), debug (false).
  d. decrypt: Handles decryption of encrypted environment files (usage tied to dotenvx).

4. Command Line and Environment Overrides: Preload by using node -r dotenv/config. Set options using command line arguments (e.g., dotenv_config_path=/custom/path/.env, dotenv_config_debug=true) or environment variables prefixed with DOTENV_CONFIG_.

5. Troubleshooting & Best Practices: Use config({ debug: true }) for error output. Do not commit .env files, maintain separate files per environment. Proxy for front-end environments using webpack polyfills and DefinePlugin if required.

## Supplementary Details
Configuration Options:
- path (string): Default is path.resolve(process.cwd(), '.env'). Can be a single string or an array of paths. When multiple files are provided, the first value wins unless override is true.
- encoding (string): Default 'utf8'. Can be set to other encodings like 'latin1'.
- debug (boolean): Default false. Enables logging of parsing process.
- override (boolean): Default false. When true, existing process.env variables are replaced.
- processEnv (object): Default is process.env, or a user-supplied object.

API Function Signatures:
function config(options?: { path?: string | string[], encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }): { parsed?: { [key: string]: string }, error?: Error }
function parse(src: string | Buffer, options?: { debug?: boolean }): { [key: string]: string }
function populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void

Implementation Steps:
1. Create a .env file with KEY=VALUE pairs.
2. Invoke config() as early as possible in your application.
3. For multiple environments, supply an array of paths or use dotenvx with --env-file options.
4. For debugging, set debug: true in configuration or use command line arguments.
5. For encryption and secure sync, use dotenvx commands (e.g., dotenvx set HELLO Production --encrypt -f .env.production).

Troubleshooting:
- If environment variables are missing, verify file location and use debug mode.
- For React, ensure usage of REACT_APP_ prefix and proper webpack configuration.
- For module not found errors (crypto, os, path), add node-polyfill-webpack-plugin and configure webpack accordingly.

## Reference Details
API Specifications:

config(options: { path?: string | string[], encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }): { parsed?: { [key: string]: string }, error?: Error }
- Reads file at options.path (default: process.cwd() + '/.env') with encoding (default 'utf8').
- If options.debug is true, logs details. If file read fails, returns { error: Error }.
- Without override, existing keys in processEnv remain unchanged; with override true, later values replace earlier ones.

parse(src: string | Buffer, options?: { debug?: boolean }): { [key: string]: string }
- Accepts input as string or Buffer. Splits by newline. Ignores lines starting with '#' unless inside quotes. Returns object mapping keys to values.

populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void
- Iterates over keys in source. If override is false and key exists in target, value is not replaced. If override true, key is overwritten.

Usage Examples:
// Using config
const result = require('dotenv').config({ path: '/custom/path/.env', override: true });
if (result.error) { throw result.error; }
console.log(result.parsed);

// Using parse
const dotenv = require('dotenv');
const buf = Buffer.from('BASIC=basic');
const configObj = dotenv.parse(buf, { debug: true });
console.log(configObj); // { BASIC: 'basic' }

// Using populate
const target = {};
const source = { HELLO: 'world' };
require('dotenv').populate(target, source, { override: true, debug: true });
console.log(target); // { HELLO: 'world' }

Command Line Preload Example:
node -r dotenv/config your_script.js

Environment Variable Configuration:
DOTENV_CONFIG_PATH=/custom/path/.env
DOTENV_CONFIG_DEBUG=true
DOTENV_CONFIG_ENCODING=latin1

Troubleshooting Commands:
- Run with debug:
  node -r dotenv/config your_script.js dotenv_config_debug=true
- For webpack polyfill:
  npm install node-polyfill-webpack-plugin
  // In webpack.config.js, add new NodePolyfillPlugin() and configure webpack.DefinePlugin with process.env keys.

Best Practices:
- Do not commit .env to version control.
- Use separate .env files per environment (.env.development, .env.production).
- Use dotenv-expand for variable expansion: const expanded = require('dotenv-expand')(envConfig);
- For encryption and secure handling, use dotenvx commands such as:
  dotenvx set KEY Value --encrypt -f .env.production

SDK Method Signatures and Return Types are as specified above; exceptions are thrown when file reading/parsing fails.

All values and configuration options are set as per defaults unless overridden by developer provided options.

## Information Dense Extract
Install: npm install dotenv; Usage: require('dotenv').config() or import 'dotenv/config'; .env file format: KEY=VALUE, supports multiline via \n or literal newlines, comments with #; API: config(options:{path?:string|string[],encoding?:string,debug?:boolean,override?:boolean,processEnv?:object}) returns {parsed?:object,error?:Error}; parse(src:string|Buffer,options?:{debug?:boolean}) returns object; populate(target,source,options?:{override?:boolean,debug?:boolean}); Command line preload: node -r dotenv/config; Environment configuration via DOTENV_CONFIG_*; Defaults: path=process.cwd()+'/.env', encoding='utf8', debug=false, override=false; Troubleshooting: set debug:true, check file location; Best practices: do not commit .env, separate per environment; Encryption and variable expansion via dotenvx and dotenv-expand.

## Sanitised Extract
Table of Contents:
  1. Installation & Usage
  2. .env File Specification
  3. API Functions
    a. config(options)
    b. parse(input, options)
    c. populate(target, source, options)
    d. decrypt (extended functionality)
  4. Command Line and Environment Overrides
  5. Troubleshooting and Best Practices

1. Installation & Usage: Install via npm (npm install dotenv --save), or yarn/bun. Load using require('dotenv').config() or import 'dotenv/config'.

2. .env File Specification: Format in KEY=VALUE pairs. Supports multiline values via literal newlines or 'n escapes. Comments start with #. Trims whitespace for unquoted values.

3. API Functions:
  a. config(options): Reads .env file, parses it, sets variables. Returns object with { parsed: {KEY: value, ... } } or { error: Error }.
     Parameters:
       - path: default = process.cwd() + '/.env'
       - encoding: default 'utf8'
       - debug: default false
       - override: default false
       - processEnv: default process.env
  b. parse(input, options): Accepts String or Buffer, returns Object mapping keys to values. Option debug default false.
  c. populate(target, source, options): Merges source into target. Options: override (false), debug (false).
  d. decrypt: Handles decryption of encrypted environment files (usage tied to dotenvx).

4. Command Line and Environment Overrides: Preload by using node -r dotenv/config. Set options using command line arguments (e.g., dotenv_config_path=/custom/path/.env, dotenv_config_debug=true) or environment variables prefixed with DOTENV_CONFIG_.

5. Troubleshooting & Best Practices: Use config({ debug: true }) for error output. Do not commit .env files, maintain separate files per environment. Proxy for front-end environments using webpack polyfills and DefinePlugin if required.

## Original Source
Dotenv Package Documentation
https://github.com/motdotla/dotenv

## Digest of DOTENV

# DOTENV PACKAGE DOCUMENTATION

## Installation

Install using npm:
  npm install dotenv --save

Alternate package managers:
  yarn add dotenv
  bun add dotenv

## Usage

Create a .env file in your project root containing environment variables in KEY=VALUE format. For example:

  S3_BUCKET="YOURS3BUCKET"
  SECRET_KEY="YOURSECRETKEYGOESHERE"

Then, at the entry point of your application add one of the following:

  require('dotenv').config()
  // or using ES6:
  import 'dotenv/config'

After configuration process.env will contain your environment variables.

## .env File Format

- Supports single-line and multiline values (using newline characters or literal newlines in quoted strings).
- Comments are allowed using # (unless the value is wrapped in quotes).
- Empty lines are skipped. Leading and trailing whitespaces are trimmed for unquoted values.

Example multiline usage:

  PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"

## API Specifications

### config(options?)

Reads the .env file, parses its contents, assigns them to process.env (or provided target) and returns an object with either a "parsed" property containing the key-value pairs or an "error" key if the file reading failed.

- Default options:
  - path: path.resolve(process.cwd(), '.env')
  - encoding: 'utf8'
  - debug: false
  - override: false
  - processEnv: process.env

Example:

  const result = require('dotenv').config({ path: '/custom/path/to/.env', override: true });
  if (result.error) { throw result.error; }
  console.log(result.parsed);

### parse(input, options?)

Accepts a String or Buffer containing environment variable declarations and returns an Object with the parsed keys and values. An optional options object supports:
  - debug (boolean): default false

Example:

  const dotenv = require('dotenv');
  const buf = Buffer.from('BASIC=basic');
  const config = dotenv.parse(buf, { debug: true });
  console.log(config);

### populate(target, source, options?)

Populates a target object with source key-value pairs from a parsed .env file. This function can override existing keys if the override option is set.

- Options:
  - override (boolean): default false
  - debug (boolean): default false

Example:

  const dotenv = require('dotenv');
  const parsed = { HELLO: 'world' };
  dotenv.populate(process.env, parsed, { override: true, debug: true });
  console.log(process.env.HELLO); // world

### decrypt

Provided function for decrypting encrypted .env files when using additional tooling (e.g., dotenvx). Refer to the extended documentation for full usage.

## Command Line and Preload Options

- To preload dotenv via command line use:
    node -r dotenv/config your_script.js

- Supported configuration through command line arguments (e.g., dotenv_config_path, dotenv_config_debug, dotenv_config_encoding).

- Environment variables prefixed with DOTENV_CONFIG_ can also be used to set configuration options.

## Variable Expansion and Command Substitution

- For expanding variables within .env files, use the dotenv-expand module.
- For command substitution, dotenvx provides enhanced functionality by allowing command outputs to be captured in environment variables.

## Troubleshooting and Best Practices

- If process.env variables are not set, ensure the .env file is in the correct location and use debug mode:
    require('dotenv').config({ debug: true });

- Do not commit your .env file to source control; use environment-specific files (.env.production, .env.development) instead.

- For frontend frameworks like React, configure variables through the bundler (e.g., webpack) and prefix with REACT_APP_ if needed.

Retrieved: 2023-10-05
Data Size: 716598 bytes
Attribution: Crawled from https://github.com/motdotla/dotenv

## Attribution
- Source: Dotenv Package Documentation
- URL: https://github.com/motdotla/dotenv
- License: MIT
- Crawl Date: 2025-05-01T12:57:33.642Z
- Data Size: 716598 bytes
- Links Found: 5554

## Retrieved
2025-05-01
