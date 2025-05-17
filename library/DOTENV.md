# DOTENV

## Crawl Summary
Installation commands; .env file format and placement; import/require usage; config() options with defaults; parse() and populate() functions; multiline values support; comment syntax; preload via node -r; CLI config via env vars; debug and override flags; troubleshooting guidance for missing file, parse errors, override behavior, React prefixing.

## Normalised Extract
Table of Contents:
1 Installation
2 .env File Format
3 Loading and Configuration
4 Config Options
5 parse() API
6 populate() API
7 Multiline and Comments
8 Preload Usage
9 CLI Configuration
10 Troubleshooting

1 Installation
- npm install dotenv --save
- yarn add dotenv
- bun add dotenv

2 .env File Format
- Each line KEY=VALUE
- Strings may be unquoted or in double quotes
- Multiline in quotes or using \n
3 Loading and Configuration
- require('dotenv').config()
- import 'dotenv/config'
- Must execute before other imports that use process.env

4 Config Options
- path: string|string[] Default: process.cwd() + '/.env'
- encoding: string Default: 'utf8'
- debug: boolean Default: false (logs load and parse info)
- override: boolean Default: false (existing env vars are not overwritten)
- processEnv: object Default: process.env

5 parse() API
- Signature: parse(src: string | Buffer, options?: { debug?: boolean }): Record<string,string>
- src: file content or buffer
- debug: logs invalid lines or duplicates
- Returns object mapping keys to values

6 populate() API
- Signature: populate(target: object, source: Record<string,string>, options?: { override?: boolean; debug?: boolean }): object
- Copies source into target based on override and debug flags

7 Multiline and Comments
- Literal newlines inside quotes supported (>= v15)
- \n escapes expand into new lines in values
- Lines starting with # or inline after value are comments
- To include #: wrap value in quotes

8 Preload Usage
- node -r dotenv/config your_script.js
- No code change required

9 CLI Configuration
- Options via dotenv_config_<option>=value or DOTENV_CONFIG_<OPTION>=value
- Supported options: path, encoding, debug, override
- Command line env vars take precedence over system env vars

10 Troubleshooting
- use config({ debug: true }) for load errors
- verify .env location or set custom path
- set override:true to overwrite existing vars
- React bindings require REACT_APP_ prefix or Webpack DefinePlugin

## Supplementary Details
• Internal load algorithm: for each path in options.path array in order, synchronously read file via fs.readFileSync(path, { encoding: options.encoding }), pass contents to parse(), merge parsed into options.processEnv per override rule.
• parse implementation: split by ambient newlines, for each line match /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)?$/; remove surrounding quotes if any; unescape \n in double-quoted; ignore commented lines and trailing comments; trim unquoted values; preserve inner quotes.
• populate implementation: iterate keys of source; if options.override or target[key]===undefined then assign target[key]=source[key]; on debug log assignments.
• dotenv.parse uses debug flag to log to stderr via console.error; dotenv.populate uses console.error for debug.
• Core supports environment variable expansion via separate dotenv-expand package; use variableExpansion = require('dotenv-expand'); variableExpansion(dotenv.config());
• .env best practice: one file per environment named .env.local, .env.development, .env.production; load multiple via config({ path:['.env.local','.env'] }); first wins unless override:true.
• Protect .env: add to .gitignore; use git pre-commit hook via dotenvx precommit; for Docker use RUN dotenvx prebuild; for CI use encrypted .env.circleci and DOTENV_CONFIG_PATH.


## Reference Details
TypeScript Declarations:

interface DotenvConfigOptions {
  path?: string | string[];       // default: path.resolve(process.cwd(),'.env')
  encoding?: string;               // default: 'utf8'
  debug?: boolean;                 // default: false
  override?: boolean;              // default: false
  processEnv?: { [name: string]: string }; // default: process.env
}

interface DotenvConfigOutput {
  parsed?: { [name: string]: string };
  error?: Error;
}

interface DotenvParseOptions {
  debug?: boolean; // default: false
}

interface DotenvPopulateOptions {
  override?: boolean; // default: false
  debug?: boolean;    // default: false
}

export function config(options?: DotenvConfigOptions): DotenvConfigOutput;
export function parse(src: string | Buffer, options?: DotenvParseOptions): { [name: string]: string };
export function populate(target: object, source: { [name: string]: string }, options?: DotenvPopulateOptions): object;
export function decrypt?(input: string | Buffer, options?: any): any; // if supported

Code Examples:

// Load with custom path and override
import { config } from 'dotenv';
const result = config({ path: ['.env.local', '.env'], override: true, encoding: 'latin1', debug: true });
if (result.error) throw result.error;
console.log(result.parsed);

// Parse buffer
import { parse } from 'dotenv';
const buf = Buffer.from('API_KEY=abc123');
const parsed = parse(buf, { debug: true });
console.log(parsed.API_KEY);

// Populate target manually
import { populate } from 'dotenv';
const target = { EXISTING: 'keep' };
const source = { NEW: 'value', EXISTING: 'override' };
populate(target, source, { override: true, debug: true });
console.log(target); // { EXISTING: 'override', NEW: 'value' }

// Preload via CLI
// DOTENV_CONFIG_PATH=./.env.custom node -r dotenv/config index.js

Webpack Polyfill Example:

npm install node-polyfill-webpack-plugin

// webpack.config.js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();
module.exports = {
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({ 'process.env': JSON.stringify(process.env) })
  ]
};

Best Practices:
• Load dotenv at earliest entry point.
• Use one .env per environment; avoid inheritance.
• Do not commit .env to VCS; add to .gitignore.
• For variable expansion use dotenv-expand.
• For encrypted .env and CI sync use dotenvx.

Troubleshooting Steps:
1. Missing .env: config({ debug: true }) logs ENOENT: no such file.
2. Parsing errors: parse(buffer, { debug: true }) shows invalid lines.
3. Override not applied: set override: true in options.
4. React env not present: prefix keys with REACT_APP_ or use DefinePlugin.
5. Front-end crypto/os/path errors: add node-polyfill-webpack-plugin.


## Information Dense Extract
config(options?:{path=string|string[]='.env';encoding='utf8';debug=false;override=false;processEnv=process.env}):{parsed?:Record<string,string>;error?:Error}; parse(src:string|Buffer,options?:{debug=false}):Record<string,string>; populate(target:object,source:Record<string,string>,options?:{override=false;debug=false}):object; envfile grammar: KEY=VALUE;double-quoted supports unescaped newlines and \n;comments start with # or inline after unquoted;wrap values in quotes to include #;load with require('dotenv').config() or import 'dotenv/config';preload CLI: node -r dotenv/config;CLI options via dotenv_config_<option>=value or DOTENV_CONFIG_<OPTION>=value;options.path accepts array for multiple .env files, merge order first wins unless override;debug logs to stderr;override replaces existing env vars;best practices: load early, per-environment .env, gitignore .env, use dotenv-expand for var expansion;React requires REACT_APP_ prefix or DefinePlugin;front-end polyfill via node-polyfill-webpack-plugin or dotenv-webpack;troubleshoot with debug: true, correct path, override flag, prefix for React.

## Sanitised Extract
Table of Contents:
1 Installation
2 .env File Format
3 Loading and Configuration
4 Config Options
5 parse() API
6 populate() API
7 Multiline and Comments
8 Preload Usage
9 CLI Configuration
10 Troubleshooting

1 Installation
- npm install dotenv --save
- yarn add dotenv
- bun add dotenv

2 .env File Format
- Each line KEY=VALUE
- Strings may be unquoted or in double quotes
- Multiline in quotes or using 'n
3 Loading and Configuration
- require('dotenv').config()
- import 'dotenv/config'
- Must execute before other imports that use process.env

4 Config Options
- path: string|string[] Default: process.cwd() + '/.env'
- encoding: string Default: 'utf8'
- debug: boolean Default: false (logs load and parse info)
- override: boolean Default: false (existing env vars are not overwritten)
- processEnv: object Default: process.env

5 parse() API
- Signature: parse(src: string | Buffer, options?: { debug?: boolean }): Record<string,string>
- src: file content or buffer
- debug: logs invalid lines or duplicates
- Returns object mapping keys to values

6 populate() API
- Signature: populate(target: object, source: Record<string,string>, options?: { override?: boolean; debug?: boolean }): object
- Copies source into target based on override and debug flags

7 Multiline and Comments
- Literal newlines inside quotes supported (>= v15)
- 'n escapes expand into new lines in values
- Lines starting with # or inline after value are comments
- To include #: wrap value in quotes

8 Preload Usage
- node -r dotenv/config your_script.js
- No code change required

9 CLI Configuration
- Options via dotenv_config_<option>=value or DOTENV_CONFIG_<OPTION>=value
- Supported options: path, encoding, debug, override
- Command line env vars take precedence over system env vars

10 Troubleshooting
- use config({ debug: true }) for load errors
- verify .env location or set custom path
- set override:true to overwrite existing vars
- React bindings require REACT_APP_ prefix or Webpack DefinePlugin

## Original Source
dotenv Environment Variable Loader
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV

# Installation

Install via npm:

 npm install dotenv --save

Or via yarn:

 yarn add dotenv

Or via bun:

 bun add dotenv

# Usage (.env File)

Create a file named .env in your project root (or custom path via options) with lines in the form KEY=VALUE.

Examples:

 S3_BUCKET="YOURS3BUCKET"
 SECRET_KEY="YOURSECRETKEYGOESHERE"

# Loading Variables

Early in application entry point:

 require('dotenv').config()
 // or ES6 syntax:
 import 'dotenv/config'

After loading, access via process.env:

 console.log(process.env.S3_BUCKET)

# API Reference

## config(options?: DotenvConfigOptions): DotenvConfigOutput

### DotenvConfigOptions
 path: string | string[] Default: path.resolve(process.cwd(), '.env')
 encoding: string Default: 'utf8'
 debug: boolean Default: false
 override: boolean Default: false
 processEnv: object Default: process.env

### DotenvConfigOutput
 parsed?: Record<string,string>
 error?: Error

## parse(src: string | Buffer, options?: DotenvParseOptions): Record<string,string>

### DotenvParseOptions
 debug: boolean Default: false

## populate(target: object, source: Record<string,string>, options?: DotenvPopulateOptions): object

### DotenvPopulateOptions
 override: boolean Default: false
 debug: boolean Default: false

# Multiline Values and Comments

Multiline values (>= v15.0.0) supported using literal line breaks within quotes or \n escapes:

 PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
 ...
 -----END RSA PRIVATE KEY-----"

Inline or full-line comments start with #. To include # in value, wrap value in quotes.

# Preload

Preload without require call in code:

 node -r dotenv/config your_script.js

# CLI Configuration

Supported via environment variables DOTENV_CONFIG_<OPTION>=value or via dotenv_config_<option>=value before script invocation. Example:

 DOTENV_CONFIG_PATH=./.env.local DOTENV_CONFIG_DEBUG=true node -r dotenv/config index.js

# Troubleshooting

Enable debug:

 require('dotenv').config({ debug: true })

Expected log if .env not found or parse errors.

Common fixes:
• Ensure .env path is correct or specify via path option
• Set override:true to replace existing environment variables
• Prefix React env keys with REACT_APP_


## Attribution
- Source: dotenv Environment Variable Loader
- URL: https://github.com/motdotla/dotenv#readme
- License: BSD-2-Clause
- Crawl Date: 2025-05-17T12:32:50.351Z
- Data Size: 638265 bytes
- Links Found: 4948

## Retrieved
2025-05-17
