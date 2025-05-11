# DOTENV

## Crawl Summary
Dotenv zero dependency loader reads .env files into process.env. Install via npm install dotenv. Create .env in project root with KEY=VALUE pairs. Load at application start with require('dotenv').config(options) or ES6 import 'dotenv/config'. Options: path (string or array, default cwd/.env), encoding (utf8), debug (false), override (false), processEnv (process.env). parse(input, options) returns parsed object. populate(target,source,options) writes key value pairs. Preload via node -r dotenv/config. Supports multiline values, inline comments, backtick quoting. Parsing rules: skip empty and comment lines, trim unquoted, preserve quoted whitespace, expand newlines, support backticks. CLI configuration via DOTENV_CONFIG_PATH and DOTENV_CONFIG_DEBUG. Turn on debug for troubleshooting.

## Normalised Extract
Table of Contents:
1 Installation
2 Usage
3 Multiline Values
4 Comments
5 Parsing API
6 CLI Preload
7 Functions and Options
8 Parsing Rules
9 Troubleshooting

1 Installation
Install with npm install dotenv --save, yarn add dotenv or bun add dotenv

2 Usage
Create .env in project root:
S3_BUCKET=YOURS3BUCKET
SECRET_KEY=YOURSECRETKEY
Import before other modules:
require('dotenv').config()
Access via process.env.VAR

3 Multiline Values
Define variables across lines between BEGIN and END markers
Or use \n escapes inside double quotes

4 Comments
Lines starting with # ignored
Inline comments allowed if value is quoted containing #

5 Parsing API
parse(input, options): input is string or Buffer, options.debug boolean, returns Record<string,string>

6 CLI Preload
node -r dotenv/config script.js
Use DOTENV_CONFIG_PATH and DOTENV_CONFIG_DEBUG environment variables or dotenv_config_path and dotenv_config_debug CLI params

7 Functions and Options
config(options): path string or array, encoding string, debug boolean, override boolean, processEnv object
Returns { parsed: Record<string,string>, error?: Error }

8 Parsing Rules
Empty lines skipped
Comment lines skipped
Empty values become ''
Unquoted values trimmed
Quoted values preserve whitespace
Newlines expanded in double quotes
Backtick quoting supported

9 Troubleshooting
Enable debug in config to show parsing errors
Ensure .env file path is correct
For browser builds use dotenv-webpack or DefinePlugin

## Supplementary Details
Implementation Steps:
1 Install module: npm install dotenv --save
2 Create .env file at application root with key values
3 In main entry file, add require('dotenv').config({ path, encoding, debug, override, processEnv }) before any other imports
4 Use process.env.VAR to read variables
5 For parsing custom content, use const parsed = dotenv.parse(buffer, { debug })
6 To programmatically populate custom object, call dotenv.populate(targetObj, parsedEnv, { override, debug })
7 To decrypt encrypted .env files, use dotenvx plugin decrypt method with private key

Configuration Options:
path: string or string[], default path.resolve(process.cwd(), '.env')
encoding: string, default utf8
debug: boolean, default false
override: boolean, default false
processEnv: object, default process.env

Supported file features:
Multiline values between markers
Line breaks via \n
Comments and inline comments
Backtick quoted values

CLI Integration:
Use node -r dotenv/config, pass dotenv_config_path and dotenv_config_debug via CLI or DOTENV_CONFIG_PATH/ DEBUG via env vars

Best Practice:
Load dotenv at the very start of application to ensure all modules see env
Wrap require config in try catch to handle missing files
Use override true only when necessary to replace system env
Use dotenv-expand for variable expansion
Use dotenvx for multi env and encryption needs

## Reference Details
Function Signatures and Details:

1 config(options?): { parsed?: Record<string,string>; error?: Error }
Parameters:
  options.path: string or string[]; defaults to process.cwd()/.env
  options.encoding: string; default utf8
  options.debug: boolean; default false
  options.override: boolean; default false
  options.processEnv: object; default process.env
Returns:
  parsed: object mapping keys to string values
  error: Error if parsing or file access fails
Example:
  const result = dotenv.config({ path: ['.env.local', '.env'], encoding: 'latin1', debug: true, override: true })
  if (result.error) throw result.error
  console.log(result.parsed.DB_HOST)

2 parse(input: string | Buffer, options?): Record<string,string>
Parameters:
  input: string or Buffer containing KEY=VAL lines
  options.debug: boolean; default false
Returns:
  object with parsed keys and values
Example:
  const buffer = Buffer.from('API_KEY=abc123')
  const env = dotenv.parse(buffer, { debug: true })
  console.log(env.API_KEY)

3 populate(target: object, source: object, options?): void
Parameters:
  target: object to receive keys
  source: object of parsed env
  options.override: boolean; default false
  options.debug: boolean; default false
Behavior:
  Writes each key from source into target if override true or target key undefined
Example:
  const parsed = { FOO: 'bar' }
  dotenv.populate(process.env, parsed, { override: false })

4 decrypt(encryptedData: object|string, options: { key: string }): Record<string,string>
Parameters:
  encryptedData: object or encrypted file content
  options.key: private key string for decryption
Returns:
  decrypted key value pairs

CLI Usage Patterns:
  node -r dotenv/config app.js
  node -r dotenv/config app.js dotenv_config_path=/custom/.env dotenv_config_debug=true
  DOTENV_CONFIG_PATH=/custom/.env DOTENV_CONFIG_DEBUG=true node -r dotenv/config app.js

Webpack Integration:
Method 1: polyfill crypto os path via node-polyfill-webpack-plugin
  npm install node-polyfill-webpack-plugin
  In webpack.config.js add NodePolyfillPlugin and DefinePlugin mapping process.env values
Method 2: use dotenv-webpack plugin
  npm install dotenv-webpack
  Add new DotenvWebpack() to plugins

Best Practices:
- Always load config at the top of entry file
- Use ES6 import 'dotenv/config' in ESM modules
- For variable expansion, integrate dotenv-expand immediately after config
- For multi env, adopt dotenvx with --env-file flags

Troubleshooting Steps:
1 If env not loaded, enable debug: require('dotenv').config({ debug: true })
2 Confirm .env existence and correct working directory
3 In CI, explicitly set DOTENV_CONFIG_PATH to .env file
4 For client builds, ensure env keys prefixed with REACT_APP_ or use DefinePlugin
5 If module not found errors, install missing polyfills with node-polyfill-webpack-plugin or use dotenv-webpack

## Information Dense Extract
dotenv load .env into process.env. Install npm install dotenv. Create .env: KEY=VAL. require('dotenv').config({ path, encoding, debug, override, processEnv }). path default cwd/.env; encoding utf8; debug false; override false; processEnv process.env. parse(string|Buffer, { debug }): Record<string,string>. populate(target, source, { override, debug }) writes vars. CLI preload via node -r dotenv/config with DOTENV_CONFIG_PATH and DOTENV_CONFIG_DEBUG. Supports multiline values, inline comments, backtick quoting. Parsing rules: skip empty/comment lines, trim unquoted, preserve quoted whitespace, expand \n. Webpack: use node-polyfill-webpack-plugin or dotenv-webpack. Best practice load first, use dotenv-expand for var expansion, use dotenvx for multi env and encryption. Troubleshoot with debug mode.

## Sanitised Extract
Table of Contents:
1 Installation
2 Usage
3 Multiline Values
4 Comments
5 Parsing API
6 CLI Preload
7 Functions and Options
8 Parsing Rules
9 Troubleshooting

1 Installation
Install with npm install dotenv --save, yarn add dotenv or bun add dotenv

2 Usage
Create .env in project root:
S3_BUCKET=YOURS3BUCKET
SECRET_KEY=YOURSECRETKEY
Import before other modules:
require('dotenv').config()
Access via process.env.VAR

3 Multiline Values
Define variables across lines between BEGIN and END markers
Or use 'n escapes inside double quotes

4 Comments
Lines starting with # ignored
Inline comments allowed if value is quoted containing #

5 Parsing API
parse(input, options): input is string or Buffer, options.debug boolean, returns Record<string,string>

6 CLI Preload
node -r dotenv/config script.js
Use DOTENV_CONFIG_PATH and DOTENV_CONFIG_DEBUG environment variables or dotenv_config_path and dotenv_config_debug CLI params

7 Functions and Options
config(options): path string or array, encoding string, debug boolean, override boolean, processEnv object
Returns { parsed: Record<string,string>, error?: Error }

8 Parsing Rules
Empty lines skipped
Comment lines skipped
Empty values become ''
Unquoted values trimmed
Quoted values preserve whitespace
Newlines expanded in double quotes
Backtick quoting supported

9 Troubleshooting
Enable debug in config to show parsing errors
Ensure .env file path is correct
For browser builds use dotenv-webpack or DefinePlugin

## Original Source
dotenv Environment Variable Loader
https://github.com/motdotla/dotenv#readme

## Digest of DOTENV

# Dotenv Module

## Installation

Install via npm, yarn or bun:

  npm install dotenv --save
  yarn add dotenv
  bun add dotenv

## Usage

1. Create a .env file in project root with key value pairs:

   S3_BUCKET=YOURS3BUCKET
   SECRET_KEY=YOURSECRETKEYGOESHERE

2. Import and configure before other modules:

   require('dotenv').config()
   // or ES6
   import 'dotenv/config'

3. Access loaded variables in process.env:

   console.log(process.env.S3_BUCKET)

## Multiline Values (>= v15.0.0)

Private keys spanning multiple lines are supported:

   PRIVATE_KEY=-----BEGIN RSA PRIVATE KEY-----
   ...
   -----END RSA PRIVATE KEY-----

Or escape newlines:

   PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----"

## Comments

- Lines starting with # are comments.
- Inline comments allowed if value is quoted and contains #.

## API Functions

### config(options)

Loads and parses .env files into target object.

Signature

  config(options?: {
    path?: string | string[]
    encoding?: string
    debug?: boolean
    override?: boolean
    processEnv?: object
  }): { parsed?: Record<string,string>; error?: Error }

Defaults

  path        process.cwd()/.env
  encoding    utf8
  debug       false
  override    false
  processEnv  process.env

Behavior

- Multiple paths combined in order; first value wins unless override true.
- Existing processEnv values are not overwritten unless override true.

### parse(input, options)

Parses string or buffer into object.

Signature

  parse(input: string | Buffer, options?: { debug?: boolean }): Record<string,string>

### populate(target, source, options)

Populates target object with source key value pairs.

Signature

  populate(target: object, source: object, options?: { override?: boolean; debug?: boolean }): void

### decrypt(encryptedData, options)

Decrypts encrypted env file content. (dotenvx plugin)

Signature

  decrypt(target: object, options: { key: string }): Record<string,string>

## Preload via CLI

Use node require option:

  node -r dotenv/config your_script.js

Configure via env vars or CLI args:

  DOTENV_CONFIG_PATH=/custom/path/.env DOTENV_CONFIG_DEBUG=true node -r dotenv/config app.js

## Parsing Rules

- Skip empty lines
- Skip lines starting with # unless inside quoted value
- Empty values become empty string
- Trim whitespace on unquoted values
- Preserve whitespace on quoted values
- Expand \n in double quotes
- Support backticks for values containing quotes

## Troubleshooting

- Turn on debug logging:

  require('dotenv').config({ debug: true })

- Ensure .env file is in the working directory
- For front end, use webpack DefinePlugin or dotenv-webpack plugin


## Attribution
- Source: dotenv Environment Variable Loader
- URL: https://github.com/motdotla/dotenv#readme
- License: BSD-2-Clause
- Crawl Date: 2025-05-11T09:01:29.596Z
- Data Size: 655248 bytes
- Links Found: 5161

## Retrieved
2025-05-11
