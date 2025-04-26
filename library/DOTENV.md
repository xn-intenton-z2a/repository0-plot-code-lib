# DOTENV

## Crawl Summary
Install commands for npm/yarn/bun; .env structure with key=value; import early via require('dotenv').config() or import 'dotenv/config'; multiline values syntax; comment rules; parse API usage; CLI preload and config via dotenv_config and DOTENV_CONFIG env vars; four core functions with signatures and options; defaults: path=process.cwd()/.env, encoding='utf8', debug=false, override=false, processEnv=process.env.

## Normalised Extract
Table of Contents:
 1. Installation
 2. .env Format
 3. Loading Mechanism
 4. Multiline Values
 5. Comments Handling
 6. Parsing Engine
 7. CLI Preload and Config
 8. Core Function Signatures

1. Installation
 npm install dotenv --save
 yarn add dotenv
 bun add dotenv

2. .env Format
 key=value pairs
 Supported value types: unquoted, single-quoted, double-quoted, backticks
 Empty values become empty string

3. Loading Mechanism
 require('dotenv').config(options)
 import 'dotenv/config'
 Executes at require/import time, populates process.env or custom object

4. Multiline Values
 Use literal line breaks in double-quoted value
 Or escape newlines with \n

5. Comments Handling
 Lines starting with # are skipped
 Inline comments start at unquoted #
 To include # in value, wrap in quotes

6. Parsing Engine
 dotenv.parse(src, { debug })
 Input: String or Buffer
 Output: object of key:string to value:string
 Rules:
  - Skip empty lines
  - Skip comments
  - Trim unquoted values
  - Maintain whitespace in quoted
  - Expand \n in double quotes
  - Support backticks

7. CLI Preload and Config
 node -r dotenv/config script.js
 dotenv_config_path=path dotenv_config_debug=true
 DOTENV_CONFIG_<OPTION>=value overrides CLI args
 Supported options: PATH, ENCODING, DEBUG, OVERRIDE, PROCESS_ENV

8. Core Function Signatures
 config(options?): output
 parse(src, opts?): output
 populate(target, parsed, opts?): void
 decrypt(encrypted, opts): Buffer

## Supplementary Details
Default Options:
 path: string or array, default: path.resolve(process.cwd(), '.env')
 encoding: utf8
 debug: false
 override: false
 processEnv: process.env

Process:
 1. Read file(s) in order
 2. Parse each into key/value pairs
 3. For each key, if override=true or not present in processEnv, assign
 4. If debug=true, log assignment decisions

Example Multi-file Load:
 require('dotenv').config({ path: ['.env.local', '.env'], override: true })

Docker Prebuild Hook:
 RUN curl -fsS https://dotenvx.sh/ | sh
 RUN dotenvx prebuild

Webpack Polyfill Example:
 const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
 module.exports = {
   plugins: [ new NodePolyfillPlugin(), new webpack.DefinePlugin({ 'process.env': JSON.stringify(process.env) }) ]
 }


## Reference Details
API: require('dotenv') exports:

function config(options?: {
  path?: string|string[]
  encoding?: string
  debug?: boolean
  override?: boolean
  processEnv?: {[key:string]:string|undefined}
}): {
  parsed?: {[key:string]:string}
  error?: Error
}

Example:
 const result = dotenv.config({ path: '/custom/.env', encoding: 'latin1', debug: true, override: false })
 if (result.error) throw result.error
 console.log(result.parsed)

function parse(src: string|Buffer, opts?: { debug?: boolean }): {[key:string]:string}
 Example:
 const buf = Buffer.from('KEY=value')
 const out = dotenv.parse(buf, { debug: true })

function populate(target: object, parsed: {[key:string]:string}, opts?: { override?: boolean; debug?: boolean }): void
 Example:
 const parsed = dotenv.parse(Buffer.from('HELLO=world'))
 dotenv.populate(process.env, parsed, { override: true, debug: false })

CLI Preload:
 $ node -r dotenv/config index.js
 $ node -r dotenv/config index.js dotenv_config_path=/path/.env dotenv_config_debug=true
 $ DOTENV_CONFIG_ENCODING=latin1 DOTENV_CONFIG_DEBUG=true node -r dotenv/config index.js

Best Practices:
 - Place .env at root of process runtime directory
 - Load before any other module
 - Do not commit .env to source control
 - Use override only when necessary
 - Use separate .env per environment

Troubleshooting:
 .env not loading: confirm path, enable debug
   require('dotenv').config({ debug: true })
 Expected debug log: Loaded .env file at /path/.env

 Webpack error crypto|os|path:
   npm install node-polyfill-webpack-plugin
   add NodePolyfillPlugin to webpack.config.js

 Docker build leak:
   RUN dotenvx prebuild


## Information Dense Extract
npm install dotenv; require('dotenv').config({ path:string|string[], encoding:'utf8', debug:false, override:false, processEnv:object }); import 'dotenv/config'; supports multiline in double quotes or \n; comments skip full-line or inline at unquoted #; dotenv.parse(src, { debug?:boolean }): {[k:string]:string}; dotenv.populate(target, parsed, { override?:boolean, debug?:boolean }); CLI preload via node -r dotenv/config with dotenv_config_path, dotenv_config_debug or DOTENV_CONFIG_<OPTION>; defaults path=process.cwd()/.env; encoding=utf8; debug=false; override=false; processEnv=process.env; best practices: load early; separate .env per env; do not commit; troubleshooting with debug logs; webpack polyfill via node-polyfill-webpack-plugin; docker prebuild hook via dotenvx prebuild.

## Sanitised Extract
Table of Contents:
 1. Installation
 2. .env Format
 3. Loading Mechanism
 4. Multiline Values
 5. Comments Handling
 6. Parsing Engine
 7. CLI Preload and Config
 8. Core Function Signatures

1. Installation
 npm install dotenv --save
 yarn add dotenv
 bun add dotenv

2. .env Format
 key=value pairs
 Supported value types: unquoted, single-quoted, double-quoted, backticks
 Empty values become empty string

3. Loading Mechanism
 require('dotenv').config(options)
 import 'dotenv/config'
 Executes at require/import time, populates process.env or custom object

4. Multiline Values
 Use literal line breaks in double-quoted value
 Or escape newlines with 'n

5. Comments Handling
 Lines starting with # are skipped
 Inline comments start at unquoted #
 To include # in value, wrap in quotes

6. Parsing Engine
 dotenv.parse(src, { debug })
 Input: String or Buffer
 Output: object of key:string to value:string
 Rules:
  - Skip empty lines
  - Skip comments
  - Trim unquoted values
  - Maintain whitespace in quoted
  - Expand 'n in double quotes
  - Support backticks

7. CLI Preload and Config
 node -r dotenv/config script.js
 dotenv_config_path=path dotenv_config_debug=true
 DOTENV_CONFIG_<OPTION>=value overrides CLI args
 Supported options: PATH, ENCODING, DEBUG, OVERRIDE, PROCESS_ENV

8. Core Function Signatures
 config(options?): output
 parse(src, opts?): output
 populate(target, parsed, opts?): void
 decrypt(encrypted, opts): Buffer

## Original Source
dotenv (Environment Variable Loader for Node.js)
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV

# Install

Install via npm:

    npm install dotenv --save

Or with yarn:

    yarn add dotenv

Or with bun:

    bun add dotenv

# Usage

Create a .env file in your project root (or the folder where your process runs):

    S3_BUCKET="YOURS3BUCKET"
    SECRET_KEY="YOURSECRETKEYGOESHERE"

As early as possible in application entry:

    require('dotenv').config()
    // or for ES6 modules
    import 'dotenv/config'

After loading, process.env contains your variables:

    require('dotenv').config()
    console.log(process.env.S3_BUCKET)

# Multiline Values

Supported since v15.0.0 with line breaks:

    PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
    ...
    -----END RSA PRIVATE KEY-----"

Or with explicit newline escapes:

    PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"

# Comments

Lines or inline after # are ignored. To include # in value, wrap value in quotes.

    # full-line comment
    SECRET_HASH="value-with-#-hash"

# Parsing API

    const dotenv = require('dotenv')
    const buf = Buffer.from('KEY=val')
    const parsed = dotenv.parse(buf)
    // parsed => { KEY: 'val' }

# Preload via CLI

    node -r dotenv/config your_script.js

Pass config via CLI args:

    node -r dotenv/config your.js dotenv_config_path=/custom/.env dotenv_config_debug=true

Or via env vars:

    DOTENV_CONFIG_ENCODING=latin1 DOTENV_CONFIG_DEBUG=true node -r dotenv/config your.js

# Core Functions and Signatures

    // Loads .env into process.env
    config(options?: {
      path?: string|string[]
      encoding?: string
      debug?: boolean
      override?: boolean
      processEnv?: object
    }): { parsed?: {[key:string]:string}; error?: Error }

    // Parses string or buffer to key/value pairs
    parse(src: string|Buffer, opts?: { debug?: boolean }): {[key:string]:string}

    // Populates target object from parsed values
    populate(target: object, parsed: {[key:string]:string}, opts?: { override?: boolean; debug?: boolean }): void

    // Decrypts encrypted .env (used by dotenvx)
    decrypt?(encrypted: Buffer|string, opts: { key: string }): Buffer


## Attribution
- Source: dotenv (Environment Variable Loader for Node.js)
- URL: https://github.com/motdotla/dotenv#readme
- License: License
- Crawl Date: 2025-04-26T04:47:55.743Z
- Data Size: 800985 bytes
- Links Found: 5820

## Retrieved
2025-04-26
