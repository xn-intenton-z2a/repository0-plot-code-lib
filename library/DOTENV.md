# DOTENV

## Crawl Summary
Dotenv loads environment variables from a .env file to process.env. Key API methods include config(options), parse(content, options), populate(target, source, options), and decrypt. CLI preload options such as --require and DOTENV_CONFIG_* allow custom file paths, encoding, debug mode, and override behavior. Multiline, comments, variable expansion, and command substitution are supported for robust environment setup.

## Normalised Extract
Table of Contents:
1. Installation
   - npm install dotenv --save
2. Usage
   - Create .env file with key-value pairs
   - Import using require('dotenv').config() or import 'dotenv/config'
3. API Methods
   a. config(options)
      - Reads .env file with options: path (default: process.cwd() + '/.env'), encoding (default 'utf8'), debug (default false), override (default false), processEnv (default process.env)
      - Returns an object with property parsed or error
   b. parse(content, options)
      - Accepts a String or Buffer
      - Returns an object with key-value pairs, supports debug option
   c. populate(target, source, options)
      - Merges source object into target, with override and debug options
   d. decrypt(encryptedString, decryptionKey)
      - Decrypts encrypted .env files
4. Configuration Options and CLI Usage
   - Options via CLI: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding
   - Environment Variable Overrides using DOTENV_CONFIG_*
5. Advanced Features
   - Multiline values, inline comments, variable expansion (using dotenv-expand), command substitution (using dotenvx)
6. Troubleshooting
   - Enable debug mode; check file location; use webpack polyfills for front-end

Detailed Technical Points:
Installation: Execute 'npm install dotenv --save'.
Usage: Create a .env file with parameters, then load the config immediately as the application starts.
API: 
  config: require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true }) returns either { parsed: { ... } } or { error: Error }.
  parse: const config = require('dotenv').parse(Buffer.from('BASIC=basic'), { debug: true }) returns { BASIC: 'basic' }.
  populate: require('dotenv').populate(targetObj, { HELLO: 'world' }, { override: true }) sets targetObj.HELLO to 'world'.
CLI and Environment: Use node -r dotenv/config to preload variables. Command line arguments override environment variables when DOTENV_CONFIG_* variables are set.
Troubleshooting: Use require('dotenv').config({ debug: true }) for verbose logging and check placement of .env file.


## Supplementary Details
Configuration Options for config():
- path: string; default is path.resolve(process.cwd(), '.env'); used to specify location of .env file
- encoding: string; default 'utf8'; can be set to 'latin1' or other encoding
- debug: boolean; default false; when true, logs debug messages for troubleshooting
- override: boolean; default false; if true, any existing environment variables in process.env are overridden
- processEnv: object; default process.env; allows specifying a custom target object

API Method Details:
1. config(options):
   - Signature: config(options?: { path?: string, encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }): { parsed?: object, error?: Error }
   - Throws error if file not found or if options misconfigured and error property is returned.
2. parse(content, options):
   - Signature: parse(content: string | Buffer, options?: { debug?: boolean }): object
3. populate(target, source, options):
   - Signature: populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void

Implementation Steps:
- Create .env file in project root.
- Invoke require('dotenv').config() at the very start of application.
- For multiple .env files, pass an array to the path option: config({ path: ['.env.local', '.env'] })
- To use custom decoding with encoding option, set config({ encoding: 'latin1' })

Best Practices:
- Do not commit .env files to version control.
- Use environment-specific .env files such as .env.production and .env.development.
- Enable debug mode during development to verify keys are loaded as expected.
- Use dotenv-expand for variable expansion in .env files if necessary.

Troubleshooting Procedures:
- Run script with debug: require('dotenv').config({ debug: true }) to output parsing errors.
- In case of preloading issues in ES modules, use import 'dotenv/config' instead of calling config() after import.
- For front-end bundlers, use polyfill plugins such as node-polyfill-webpack-plugin or dotenv-webpack to inject process.env variables.
- For command substitution or encryption, consider using dotenvx commands such as: dotenvx run --debug -- node index.js and dotenvx set KEY Value --encrypt -f .env.production


## Reference Details
API Specifications:
config(options?: { path?: string, encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }) : { parsed?: object, error?: Error }
Example:
const result = require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true });
if (result.error) { throw result.error; }

parse(content: string | Buffer, options?: { debug?: boolean }) : object
Example:
const buf = Buffer.from('BASIC=basic');
const config = require('dotenv').parse(buf, { debug: true });
// returns { BASIC: 'basic' }

populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }) : void
Example:
const target = {};
const source = { HELLO: 'world' };
require('dotenv').populate(target, source, { override: true, debug: true });
// target becomes { HELLO: 'world' }

decrypt(encryptedString: string, decryptionKey: string) : string
// Provided for decrypting encrypted .env files using a decryption key

CLI Usage:
Node Preload: node -r dotenv/config your_script.js
Command Line Options: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding
Environment Variable Override: DOTENV_CONFIG_DEBUG, DOTENV_CONFIG_PATH, etc.

Implementation Patterns:
1. Standard Initialization:
   Create .env file; require('dotenv').config(); console.log(process.env.KEY);
2. Multiple Files: require('dotenv').config({ path: ['.env.local', '.env'] });
3. Custom ProcessEnv Target:
   const myEnv = {};
   require('dotenv').config({ processEnv: myEnv });
   console.log(myEnv);

Best Practices:
- Never commit your .env file; use secure storage or encryption via dotenvx.
- Use separate .env files per environment and use the override flag if necessary.

Troubleshooting:
- For missing variables: verify file location, use debug mode:
  require('dotenv').config({ debug: true });
- For front-end issues with webpack, include node-polyfill-webpack-plugin:
  In webpack.config.js, add new NodePolyfillPlugin() and configure webpack.DefinePlugin to inject process.env values.
- For ES module pitfalls, ensure dotenv/config is imported before any module that depends on process.env.

Full SDK Method Signatures:
- config(options?: { path?: string, encoding?: string, debug?: boolean, override?: boolean, processEnv?: object }): { parsed?: object, error?: Error }
- parse(content: string | Buffer, options?: { debug?: boolean }): object
- populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void
- decrypt(encryptedString: string, decryptionKey: string): string


## Information Dense Extract
DOTENV; npm install; .env file in project root; require('dotenv').config() or import 'dotenv/config'; API: config({path,encoding,debug,override,processEnv}) returns {parsed,error}; parse(Buffer|string,{debug}) returns object; populate(target,source,{override,debug}) merges vars; CLI: node -r dotenv/config; Options via DOTENV_CONFIG_*; Multiline support with line breaks in quotes; Comments with '#' handled; Use dotenv-expand for variable expansion; Troubleshoot with debug:true; For ES modules, import 'dotenv/config' first; Best practices: do not commit .env, use separate files per environment; Webpack polyfill for front-end integration.

## Sanitised Extract
Table of Contents:
1. Installation
   - npm install dotenv --save
2. Usage
   - Create .env file with key-value pairs
   - Import using require('dotenv').config() or import 'dotenv/config'
3. API Methods
   a. config(options)
      - Reads .env file with options: path (default: process.cwd() + '/.env'), encoding (default 'utf8'), debug (default false), override (default false), processEnv (default process.env)
      - Returns an object with property parsed or error
   b. parse(content, options)
      - Accepts a String or Buffer
      - Returns an object with key-value pairs, supports debug option
   c. populate(target, source, options)
      - Merges source object into target, with override and debug options
   d. decrypt(encryptedString, decryptionKey)
      - Decrypts encrypted .env files
4. Configuration Options and CLI Usage
   - Options via CLI: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding
   - Environment Variable Overrides using DOTENV_CONFIG_*
5. Advanced Features
   - Multiline values, inline comments, variable expansion (using dotenv-expand), command substitution (using dotenvx)
6. Troubleshooting
   - Enable debug mode; check file location; use webpack polyfills for front-end

Detailed Technical Points:
Installation: Execute 'npm install dotenv --save'.
Usage: Create a .env file with parameters, then load the config immediately as the application starts.
API: 
  config: require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true }) returns either { parsed: { ... } } or { error: Error }.
  parse: const config = require('dotenv').parse(Buffer.from('BASIC=basic'), { debug: true }) returns { BASIC: 'basic' }.
  populate: require('dotenv').populate(targetObj, { HELLO: 'world' }, { override: true }) sets targetObj.HELLO to 'world'.
CLI and Environment: Use node -r dotenv/config to preload variables. Command line arguments override environment variables when DOTENV_CONFIG_* variables are set.
Troubleshooting: Use require('dotenv').config({ debug: true }) for verbose logging and check placement of .env file.

## Original Source
Dotenv Documentation
https://github.com/motdotla/dotenv

## Digest of DOTENV

# DOTENV

Date Retrieved: 2023-10-27

## Overview
Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env, following the Twelve-Factor App methodology. It provides functions to configure, parse, populate, and decrypt environment variables.

## Installation
- npm install dotenv --save
- yarn add dotenv
- bun add dotenv

## Usage
1. Create a .env file in the root of your project with key-value pairs:
   S3_BUCKET="YOURS3BUCKET"
   SECRET_KEY="YOURSECRETKEYGOESHERE"
2. Import and configure dotenv early in your application:
   CommonJS: require('dotenv').config()
   ES6: import 'dotenv/config'
3. process.env now contains the environment variables.

## API Methods
### config(options?)
- Reads and parses the .env file, merges with process.env.
- Options:
  - path: string, default is path.resolve(process.cwd(), '.env')
  - encoding: string, default 'utf8'
  - debug: boolean, default false
  - override: boolean, default false
  - processEnv: object, default process.env
- Returns: { parsed: Object } or { error: Error }

Example:
  const result = require('dotenv').config({ path: '/custom/path/to/.env', encoding: 'latin1', debug: true, override: true });
  if (result.error) { throw result.error; }
  console.log(result.parsed);

### parse(content, options?)
- Parses a String or Buffer and returns an object with key-value pairs.
- Options:
  - debug: boolean, default false

Example:
  const buf = Buffer.from('BASIC=basic');
  const config = require('dotenv').parse(buf, { debug: true });
  // config becomes { BASIC: 'basic' }

### populate(target, source, options?)
- Populates environment variables from source into target.
- Options:
  - override: boolean, default false
  - debug: boolean, default false

Example:
  const parsed = { HELLO: 'world' };
  require('dotenv').populate(process.env, parsed);
  // process.env.HELLO now equals 'world'

### decrypt(encryptedString, decryptionKey)
- (If available) Decrypts an encrypted .env file content using the provided decryption key.

## Configuration Options (CLI and Env Vars)
- Preload with: node -r dotenv/config your_script.js
- Command Line Overrides: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding
- Environment Variables: DOTENV_CONFIG_<OPTION> (e.g., DOTENV_CONFIG_DEBUG=true)

## Advanced Features
- Multiline values: Use literal line breaks within quotes or \n for new line
- Comments: Lines starting with # are ignored. Inline comments must have proper quoting if the value contains a '#'
- Variable Expansion: Use dotenv-expand to expand variables defined in .env
- Command Substitution: Use dotenvx for command substitution in .env files
- Preloading: Use --require (-r) option to load dotenv without explicit code changes

## Troubleshooting
- If .env variables fail to load, check the file placement, enable debug mode: require('dotenv').config({ debug: true })
- For React and front-end use, ensure environment variables are injected via webpack or appropriate framework tooling.
- For module resolution issues (crypto|os|path), use node-polyfill-webpack-plugin or dotenv-webpack.

## Attribution and Data
- Data Size: 762122 bytes
- Links Found: 5611
- Source: https://github.com/motdotla/dotenv


## Attribution
- Source: Dotenv Documentation
- URL: https://github.com/motdotla/dotenv
- License: MIT License
- Crawl Date: 2025-04-27T08:49:23.793Z
- Data Size: 762122 bytes
- Links Found: 5611

## Retrieved
2025-04-27
