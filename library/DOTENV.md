# DOTENV

## Crawl Summary
Dotenv zero-dependency module loads .env into process.env via API functions: config, parse, populate. Config(options) reads .env, merges based on path, encoding, debug, override, processEnv -> returns {parsed, error}. Parse(buffer|string, {debug}) -> {key:value}. Populate(target:Object, source:Object, {override,debug}) -> void. CLI preload: node -r dotenv/config with DOTENV_CONFIG_<OPTION>=value or dotenv_config_<option>=value. Supports multiline, comments, escapes. ES modules: import 'dotenv/config' at top. Variables collision: default skip existing, override flag enforces replace. Debug: prints parsing issues. Frontend requires polyfill or webpack plugin. Multiline via line breaks or \n.

## Normalised Extract
Table of Contents
1 Installation
2 Usage .env
3 Multiline Values
4 Comments
5 Config API
6 Parse API
7 Populate API
8 CLI Preload
9 Troubleshooting

1 Installation
  npm install dotenv --save
  yarn add dotenv
  bun add dotenv

2 Usage .env
  File .env at project root
  Lines: KEY=VALUE
  Load with require('dotenv').config() or import 'dotenv/config'

3 Multiline Values
  In-file line breaks:
    PRIVATE_KEY="-----BEGIN RSA...\n...\nEND RSA KEY-----"
  Or literal multi-line:
    PRIVATE_KEY="-----BEGIN RSA
    ...
    -----END RSA"

4 Comments
  Lines starting # skipped
  Inline comments after #
  To include # in value, wrap in quotes

5 Config API
  Function signature:
    config(options?:{
      path?:string|string[]
      encoding?:string
      debug?:boolean
      override?:boolean
      processEnv?:object
    }):{parsed?:object,error?:Error}
  Defaults:
    path=path.resolve(process.cwd(),'.env')
    encoding='utf8'
    debug=false
    override=false
    processEnv=process.env
  Behavior:
    Parses specified files in order, merges into processEnv, first-wins unless override=true

6 Parse API
  Signature:
    parse(input:string|Buffer, options?:{debug?:boolean}):object
  Default debug=false
  Returns object mapping keys to values

7 Populate API
  Signature:
    populate(target:object, source:object, options?:{override?:boolean,debug?:boolean}):void
  Default override=false, debug=false
  Copies entries from source to target according to override

8 CLI Preload
  Use node -r dotenv/config script.js
  Supported env vars for options prefix DOTENV_CONFIG_:
    DOTENV_CONFIG_PATH
    DOTENV_CONFIG_DEBUG
    DOTENV_CONFIG_ENCODING
  Or lowercase dotenv_config_<option>

9 Troubleshooting
  .env not loading: verify CWD, use debug
  Existing vars collision: use override flag
  ES Modules: import 'dotenv/config' before imports
  React: prefix with REACT_APP_
  Webpack: install node-polyfill-webpack-plugin or use dotenv-webpack


## Supplementary Details
Implementation Steps:
1 Create .env file at process execution root
2 Add require('dotenv').config(options) as first statement
3 Confirm loaded keys: console.log(result.parsed)
4 For ES Modules place import 'dotenv/config' at top of entry
5 To override existing env vars set override=true
6 To target custom object pass processEnv
7 Use parse(buffer) to parse arbitrary buffers
8 Use populate for advanced merging into custom targets
9 For CLI preload use node -r dotenv/config with DOTENV_CONFIG_<OPTION>

Parameter Defaults and Effects:
- path: path.resolve(process.cwd(),'.env') – file lookup
- encoding: 'utf8' – file charset
- debug: false – log parse/populate operations
- override: false – skip existing env variables
- processEnv: process.env – destination of assignments

Best Practices:
- Always config before any module import that relies on process.env
- Use explicit override only when necessary
- Keep one .env per environment
- Exclude .env from version control
- Use dotenv-expand for variable expansion

ES Module Pitfall:
- import 'dotenv/config' must be first in entry.mjs

Environment Variables Collision:
- Default: skip existing in process.env
- override flag: last-in wins across multiple files


## Reference Details
API Specifications

config(options?:ConfigOptions):ConfigOutput
  ConfigOptions:
    path: string|string[] – location(s) of .env files
    encoding: string – file encoding
    debug: boolean – enable debug logs
    override: boolean – allow overriding existing env vars
    processEnv: object – target env object
  ConfigOutput:
    parsed?: { [key:string]:string }
    error?: Error

parse(input:string|Buffer, options?:ParseOptions): { [key:string]:string }
  ParseOptions:
    debug: boolean – enable debug logs

populate(target:object, source:{ [key:string]:string }, options?:PopulateOptions): void
  PopulateOptions:
    override: boolean – allow override of existing keys
    debug: boolean – enable debug logs

CLI Preload Patterns
  node -r dotenv/config your_script.js
  dotenv_config_path=/custom/path . . .
  DOTENV_CONFIG_DEBUG=true node -r dotenv/config script.js

Examples

// Load default .env
const result = require('dotenv').config()
if (result.error) throw result.error
console.log(result.parsed)

// Custom path and override
require('dotenv').config({ path:['.env.local','.env'], override:true })

// Parse buffer
const buf = Buffer.from('FOO=bar')
const config = require('dotenv').parse(buf,{debug:true})

// Populate custom object
const myEnv = {}
require('dotenv').populate(myEnv, {HELLO:'world'},{override:true,debug:true})

Troubleshooting Commands

# Debug parse errors
require('dotenv').config({debug:true})

# React inject
npm install node-polyfill-webpack-plugin
# In webpack.config.js
require('dotenv').config()
new NodePolyfillPlugin()
new webpack.DefinePlugin({ 'process.env': { REACT_APP_KEY: JSON.stringify(process.env.REACT_APP_KEY) } })

# Prevent .env in Docker
RUN curl -fsS https://dotenvx.sh/ | sh
RUN dotenvx prebuild


## Information Dense Extract
dotenv loads .env into process.env via config(options)->{parsed,error}, options: path (string|string[], default cwd+/.env), encoding ('utf8'), debug (false), override (false), processEnv (process.env). parse(input:Buffer|string,{debug}) returns key/value object. populate(target,source,{override,debug}) merges accordingly. CLI preload: node -r dotenv/config with DOTENV_CONFIG_<OPTION> environment variables. Load early, ES modules require import 'dotenv/config' at top. Multiline variables supported via literal breaks or \n. Comments start with #; wrap values in quotes to include #. Default skip existing env vars; override flag replaces. Debug mode logs parsing/populating steps. For React frontend, prefix vars with REACT_APP_ or use webpack DefinePlugin or dotenv-webpack. Ensure .env excluded from VCS. Use dotenv-expand for expansion and dotenvx for sync and encryption.

## Sanitised Extract
Table of Contents
1 Installation
2 Usage .env
3 Multiline Values
4 Comments
5 Config API
6 Parse API
7 Populate API
8 CLI Preload
9 Troubleshooting

1 Installation
  npm install dotenv --save
  yarn add dotenv
  bun add dotenv

2 Usage .env
  File .env at project root
  Lines: KEY=VALUE
  Load with require('dotenv').config() or import 'dotenv/config'

3 Multiline Values
  In-file line breaks:
    PRIVATE_KEY='-----BEGIN RSA...'n...'nEND RSA KEY-----'
  Or literal multi-line:
    PRIVATE_KEY='-----BEGIN RSA
    ...
    -----END RSA'

4 Comments
  Lines starting # skipped
  Inline comments after #
  To include # in value, wrap in quotes

5 Config API
  Function signature:
    config(options?:{
      path?:string|string[]
      encoding?:string
      debug?:boolean
      override?:boolean
      processEnv?:object
    }):{parsed?:object,error?:Error}
  Defaults:
    path=path.resolve(process.cwd(),'.env')
    encoding='utf8'
    debug=false
    override=false
    processEnv=process.env
  Behavior:
    Parses specified files in order, merges into processEnv, first-wins unless override=true

6 Parse API
  Signature:
    parse(input:string|Buffer, options?:{debug?:boolean}):object
  Default debug=false
  Returns object mapping keys to values

7 Populate API
  Signature:
    populate(target:object, source:object, options?:{override?:boolean,debug?:boolean}):void
  Default override=false, debug=false
  Copies entries from source to target according to override

8 CLI Preload
  Use node -r dotenv/config script.js
  Supported env vars for options prefix DOTENV_CONFIG_:
    DOTENV_CONFIG_PATH
    DOTENV_CONFIG_DEBUG
    DOTENV_CONFIG_ENCODING
  Or lowercase dotenv_config_<option>

9 Troubleshooting
  .env not loading: verify CWD, use debug
  Existing vars collision: use override flag
  ES Modules: import 'dotenv/config' before imports
  React: prefix with REACT_APP_
  Webpack: install node-polyfill-webpack-plugin or use dotenv-webpack

## Original Source
dotenv (Environment Variable Loader for Node.js)
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV

# DOTENV README – Retrieved 2023-11-27

# Install

npm install dotenv --save
or yarn add dotenv
or bun add dotenv

# Usage

Create a .env file in your project root:

S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"

Early in your application load:

require('dotenv').config()
import 'dotenv/config'

# Multiline Values (>= v15.0.0)

PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...Kh9NV...
-----END RSA PRIVATE KEY-----"
or
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END RSA PRIVATE KEY-----\n"

# Comments

# This is a comment
SECRET_KEY=YOURSECRETKEYGOESHERE # inline comment
SECRET_HASH="something-with-a-#-hash"

# Parsing Engine

const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf)
// config => { BASIC:'basic' }

# Preload CLI

node -r dotenv/config your_script.js
Supported CLI env vars: DOTENV_CONFIG_PATH, DOTENV_CONFIG_DEBUG, DOTENV_CONFIG_ENCODING

# API Reference

## config(options)
Reads .env, assigns to process.env. Returns { parsed, error }

Options:
- path: string | string[] (default: path.resolve(process.cwd(),'.env'))
- encoding: string (default: 'utf8')
- debug: boolean (default: false)
- override: boolean (default: false)
- processEnv: object (default: process.env)

## parse(input, options)
Parses input string or buffer into key/value object.

Options:
- debug: boolean (default: false)

## populate(target, source, options)
Populates target object with source key/values.

Options:
- override: boolean (default: false)
- debug: boolean (default: false)

# Troubleshooting

- File not loading: ensure .env is in CWD, enable debug: require('dotenv').config({ debug: true })
- React: prefix vars with REACT_APP_, inject via DefinePlugin or use dotenv-webpack
- Frontend: add node-polyfill-webpack-plugin or use dotenv-webpack


## Attribution
- Source: dotenv (Environment Variable Loader for Node.js)
- URL: https://github.com/motdotla/dotenv#readme
- License: License
- Crawl Date: 2025-04-26T08:48:22.068Z
- Data Size: 642588 bytes
- Links Found: 5012

## Retrieved
2025-04-26
