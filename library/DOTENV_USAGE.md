# DOTENV_USAGE

## Crawl Summary
The content provides precise instructions for installing dotenv, loading .env variables using config, parse, and populate, and command line preloading. It details configuration option defaults (path, encoding, debug, override, processEnv) and supports multiline values, comments, variable expansion, command substitution, and multiple environment files. Troubleshooting steps and webpack configuration recommendations are included.

## Normalised Extract
Table of Contents:
  1. Installation
     - npm install dotenv --save, yarn add dotenv, bun add dotenv
  2. Usage
     - CommonJS: require('dotenv').config()
     - ES6: import 'dotenv/config'
  3. Multiline Values and Comments
     - Multiline: Use literal lines or \n
     - Comment rules: Lines starting with #, inline comments require quoting if value contains #
  4. API Functions
     - config({path, encoding, debug, override, processEnv})
       Default: path = process.cwd() + '/.env', encoding = 'utf8', debug = false, override = false, processEnv = process.env
     - parse(src, {debug}) returns parsed key-value object
     - populate(target, source, {override, debug})
  5. CLI Preloading and Configuration Options
     - Preload: node -r dotenv/config
     - CLI options: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding, etc.
  6. Variable Expansion and Command Substitution
     - Use dotenv-expand for nested variables
     - Use dotenvx for command substitution
  7. Multiple Environments and Deployment
     - Use separate .env files (.env.production, .env.local) and dotenvx --env-file flag
  8. Troubleshooting
     - Debug mode, file placement check, webpack polyfills

Each section provides specific implementation details enabling immediate use in projects.

## Supplementary Details
Installation commands: npm install dotenv --save; yarn add dotenv; bun add dotenv.
Usage: Create a .env file in the project root and load environment variables using require('dotenv').config() for CommonJS or import 'dotenv/config' for ESM.
Configuration Options:
  - path: Default path.resolve(process.cwd(), '.env') or an array for multiple files.
  - encoding: Default 'utf8', can be set to other encodings like 'latin1'.
  - debug: Boolean flag to enable detailed logging; defaults to false.
  - override: Boolean flag to replace existing process.env variables; defaults to false.
  - processEnv: Target object for variables; defaults to process.env.

API Explanations:
  - config: Reads and parses the .env file and returns an object with parsed keys; throws error if loading fails.
  - parse: Converts a string or Buffer to an object of key-value pairs.
  - populate: Merges parsed variables into a target object with options to override.

CLI Preloading:
  Use command: node -r dotenv/config your_script.js and set CLI config using DOTENV_CONFIG_* environment variables.

Troubleshooting:
  - Verify the .env file location relative to process.cwd().
  - Use debug mode (config({ debug: true })) to trace issues.
  - For React/Webpack integration, add node-polyfill-webpack-plugin or use dotenv-webpack.

Multiple Environments:
  - Maintain separate .env files for different environments.
  - Use dotenvx commands to select specific env files (--env-file=.env.production).
  - For secure deployments, encrypt .env files using the --encrypt option and manage private keys through environment variables.

## Reference Details
API Specifications:

1. config(options):
   - Signature: function config(options?: {
         path?: string | string[],
         encoding?: string,
         debug?: boolean,
         override?: boolean,
         processEnv?: object
     }): { parsed?: { [key: string]: string }, error?: Error }
   - Example:
     const result = require('dotenv').config({ path: '/custom/path/to/.env', debug: true });
     if(result.error) { throw result.error; } else { console.log(result.parsed); }

2. parse(src, options):
   - Signature: function parse(src: string | Buffer, options?: { debug?: boolean }): { [key: string]: string }
   - Example:
     const dotenv = require('dotenv');
     const buf = Buffer.from('BASIC=basic');
     const config = dotenv.parse(buf, { debug: true });
     console.log(typeof config, config);

3. populate(target, source, options):
   - Signature: function populate(target: object, source: object, options?: { override?: boolean, debug?: boolean }): void
   - Example:
     const target = {};
     const source = { HELLO: 'world' };
     require('dotenv').populate(target, source, { override: true, debug: true });
     console.log(target); // { HELLO: 'world' } if override true, else original value preserved

CLI Preloading and Configuration:
   - Preload: node -r dotenv/config index.js
   - CLI Options:
       dotenv_config_path (string): Custom path to .env file
       dotenv_config_encoding (string): File encoding, default 'utf8'
       dotenv_config_debug (boolean): Enable debugging messages
       dotenv_config_override (boolean): Whether to override existing env variables
   - Environment Variables can also be set: e.g., DOTENV_CONFIG_PATH, DOTENV_CONFIG_DEBUG

Best Practices and Troubleshooting:
   - Use separate .env files for each environment: .env, .env.production, .env.local
   - For security, do not commit .env to version control; use gitignore and pre-commit hooks to prevent leaks.
   - For React and Webpack, ensure proper polyfill usage, e.g., install node-polyfill-webpack-plugin and configure webpack:
       const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
       plugins: [ new NodePolyfillPlugin(), new webpack.DefinePlugin({ 'process.env': { HELLO: JSON.stringify(process.env.HELLO) } }) ]
   - Troubleshooting: If env variables are missing, confirm .env file location, enable debug mode, and check for preloading issues in ESM.

Command Examples:
   - Preload: $ node -r dotenv/config app.js
   - Set custom path: $ node -r dotenv/config app.js dotenv_config_path=/custom/path/.env
   - Encrypt .env for deployment using dotenvx: $ dotenvx set HELLO Production --encrypt -f .env.production
   - Run with encrypted .env: $ DOTENV_PRIVATE_KEY_PRODUCTION="<private key>" dotenvx run -- node index.js


## Information Dense Extract
Install: npm install dotenv; Usage: require('dotenv').config() or import 'dotenv/config'; API: config({path:string|array, encoding:string='utf8', debug:boolean=false, override:boolean=false, processEnv:object=process.env}) returns {parsed, error}; parse(src:string|Buffer, {debug:boolean=false}) returns object; populate(target, source, {override:boolean=false, debug:boolean=false}); CLI preload: node -r dotenv/config; CLI options: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding, dotenv_config_override; Multiline and comments supported; Use dotenv-expand for variable expansion; Use dotenvx for command substitution; Multiple .env files support via array in config; Troubleshooting: enable debug, check file location, polyfill for webpack.

## Sanitised Extract
Table of Contents:
  1. Installation
     - npm install dotenv --save, yarn add dotenv, bun add dotenv
  2. Usage
     - CommonJS: require('dotenv').config()
     - ES6: import 'dotenv/config'
  3. Multiline Values and Comments
     - Multiline: Use literal lines or 'n
     - Comment rules: Lines starting with #, inline comments require quoting if value contains #
  4. API Functions
     - config({path, encoding, debug, override, processEnv})
       Default: path = process.cwd() + '/.env', encoding = 'utf8', debug = false, override = false, processEnv = process.env
     - parse(src, {debug}) returns parsed key-value object
     - populate(target, source, {override, debug})
  5. CLI Preloading and Configuration Options
     - Preload: node -r dotenv/config
     - CLI options: dotenv_config_path, dotenv_config_debug, dotenv_config_encoding, etc.
  6. Variable Expansion and Command Substitution
     - Use dotenv-expand for nested variables
     - Use dotenvx for command substitution
  7. Multiple Environments and Deployment
     - Use separate .env files (.env.production, .env.local) and dotenvx --env-file flag
  8. Troubleshooting
     - Debug mode, file placement check, webpack polyfills

Each section provides specific implementation details enabling immediate use in projects.

## Original Source
dotenv GitHub Repository
https://github.com/motdotla/dotenv

## Digest of DOTENV_USAGE

# DOTENV USAGE

## Installation

- npm: npm install dotenv --save
- yarn: yarn add dotenv
- bun: bun add dotenv

## Usage

Create a .env file in your project root. For example:

S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"

As early as possible in your application, include one of the following:

CommonJS:
  require('dotenv').config()
  console.log(process.env)

ES6:
  import 'dotenv/config'

## Multiline Values and Comments

- Multiline values can be enclosed with literal line breaks or using \n:
  PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END RSA PRIVATE KEY-----\n"
- Comments are supported. Lines starting with # or inline after a value are treated as comments. Wrap values containing # in quotes.

## API Functions

### config(options)

- Loads the .env file and parses the content into process.env.
- Options (all optional):
  - path (string or array): Default is path.resolve(process.cwd(), '.env')
  - encoding (string): Default 'utf8'
  - debug (boolean): Default false
  - override (boolean): Default false
  - processEnv (object): Defaults to process.env

Example:
  const result = require('dotenv').config({ path: '/custom/path/to/.env', debug: true });
  if (result.error) { throw result.error; }
  console.log(result.parsed);

### parse(src, options)

- Accepts a String or Buffer containing env variables in KEY=VAL format and returns an Object.
- Options:
  - debug (boolean): Default false

Example:
  const dotenv = require('dotenv');
  const buf = Buffer.from('BASIC=basic');
  const config = dotenv.parse(buf, { debug: true });
  console.log(typeof config, config);

### populate(target, source, options)

- Merges parsed environment variables into a target object.
- Options:
  - override (boolean): Default false
  - debug (boolean): Default false

Example:
  const dotenv = require('dotenv');
  const parsed = { HELLO: 'universe' };
  const target = { HELLO: 'world' };
  dotenv.populate(target, parsed, { override: true, debug: true });
  console.log(target);

### decrypt

- (Not detailed here but available for use with dotenvx encryption/decryption workflows.)

## Configuration Options via CLI

- Preload dotenv using node command with -r flag:
  node -r dotenv/config your_script.js
- Set options via command line in the format: dotenv_config_<option>=value
  e.g., node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env dotenv_config_debug=true
- Environment variable override: DOTENV_CONFIG_<OPTION>=value

## Variable Expansion and Command Substitution

- Use dotenv-expand to enable nested variable expansion.
- For command substitution in .env files, use dotenvx.

## Multiple Environments and Deployment

- Create environment specific files like .env.production or .env.local. Use --env-file flag with dotenvx:
  dotenvx run --env-file=.env.production -- node index.js
- To encrypt .env files for secure deployment, use the --encrypt flag with dotenvx and set private keys via environment variables.

## Troubleshooting

- Ensure the .env file is in the correct directory (process.cwd()).
- Turn on debug mode via config({ debug: true }) to get detailed logging.
- For React/Webpack, note that process.env must be injected; consider using node-polyfill-webpack-plugin or dotenv-webpack.
- If environment variables are not loaded, check file placement and any preloading issues in ESM modules.

Retrieved: 2023-10-06
Data Size: 624025 bytes; Links Found: 5067

## Attribution
- Source: dotenv GitHub Repository
- URL: https://github.com/motdotla/dotenv
- License: MIT License
- Crawl Date: 2025-04-29T08:52:27.108Z
- Data Size: 624025 bytes
- Links Found: 5067

## Retrieved
2025-04-29
