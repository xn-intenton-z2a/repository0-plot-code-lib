# DOTENV

## Crawl Summary
Installation commands (npm, yarn, bun), usage examples (CommonJS and ES6 import), support for multiline and commented variables, parsing via dotenv.parse, preload with command-line flags, configuration options (path, encoding, debug, override, processEnv), variable expansion using dotenv-expand and command substitution via dotenvx, syncing and managing multiple environment files, deployment encryption steps, integration examples for various frameworks and tools, and detailed troubleshooting procedures for common pitfalls (e.g., React and Webpack polyfills).

## Normalised Extract
# Table of Contents

1. Installation
2. Usage
3. Multiline Values
4. Comments
5. Parsing
6. Preload & Command Line Options
7. Variable Expansion
8. Command Substitution
9. Syncing & Multiple Environments
10. Deploying (Encryption)
11. Examples & Framework Integrations
12. Documentation Functions
13. FAQ & Troubleshooting

---

## 1. Installation

- npm: `npm install dotenv --save`
- yarn: `yarn add dotenv`
- bun: `bun add dotenv`

## 2. Usage

- Create a `.env` file:

```
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

- Load it early in your app:

CommonJS:

```
require('dotenv').config()
```

ES6:

```
import 'dotenv/config'
```

## 3. Multiline Values

- Direct newline support:

```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
-----END RSA PRIVATE KEY-----"
```

- Escaped newlines:

```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...\n-----END RSA PRIVATE KEY-----\n"
```

## 4. Comments

- Full-line and inline comments:

```
# This is a comment
SECRET_KEY=YOURSECRETKEYGOESHERE # inline comment
```

## 5. Parsing

- Parsing with `dotenv.parse`:

```
const buf = Buffer.from('BASIC=basic')
const config = require('dotenv').parse(buf)
console.log(config) // Output: { BASIC: 'basic' }
```

## 6. Preload & Command Line Options

- Preload via CLI:

```
node -r dotenv/config your_script.js
```

- Custom configuration via CLI:

```
node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env dotenv_config_debug=true
```

## 7. Variable Expansion

- Using dotenv-expand:

```
const dotenv = require('dotenv')
const expand = require('dotenv-expand')
const env = dotenv.config()
expand(env)
```

## 8. Command Substitution

- With dotenvx, substitute command outputs:

```
DATABASE_URL="postgres://$(whoami)@localhost/my_database"
```

Run:

```
dotenvx run --debug -- node index.js
```

## 9. Syncing & Multiple Environments

- Sync files using dotenvx encryption.
- Use multiple files:

```
dotenvx run --env-file=.env.production -- node index.js
```

Chaining:

```
dotenvx run --env-file=.env.local --env-file=.env -- node index.js
```

## 10. Deploying (Encryption)

- Encrypt a file:

```
dotenvx set HELLO Production --encrypt -f .env.production
```

- Run with private key:

```
DOTENV_PRIVATE_KEY_PRODUCTION="<private key>" dotenvx run -- node index.js
```

## 11. Examples & Framework Integrations

- Node.js debugging and override examples
- ES6 module preload: `import 'dotenv/config'`
- Framework integration: react (prefix with REACT_APP_), express, nestjs, fastify, webpack plugin usage

## 12. Documentation Functions

### config(options)

```js
const result = require('dotenv').config({
  path: '/custom/path/to/.env',  // default: path.resolve(process.cwd(), '.env')
  encoding: 'utf8',               // default: 'utf8'
  debug: false,                   // default: false
  override: false,                // default: false
  processEnv: process.env         // default: process.env
})
```

### parse(src, options)

```js
const config = require('dotenv').parse(Buffer.from('BASIC=basic'), { debug: true })
```

### populate(target, parsed, options)

```js
const parsed = { HELLO: 'world' };
require('dotenv').populate(process.env, parsed, { override: true, debug: true });
```

### decrypt

- Used with dotenvx to decrypt encrypted .env files.

## 13. FAQ & Troubleshooting

- **File not loading?** Check file location and use `debug: true`:

```js
require('dotenv').config({ debug: true })
```

- **React issues:** Ensure variables are prefixed with `REACT_APP_` and configured in webpack.

- **Webpack polyfill error:** Install `node-polyfill-webpack-plugin` and add to webpack config:

```js
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// In plugins:
new NodePolyfillPlugin()
```

- **Prevention of .env commit:** Use git pre-commit hook:

```
dotenvx precommit --install
```


## Supplementary Details
## Config Function Options

- path: Default is `path.resolve(process.cwd(), '.env')`. Can be a string or an array of paths.
- encoding: Default is `'utf8'`. Specify e.g. `'latin1'` if needed.
- debug: Boolean flag (default false) to log debug messages during parsing.
- override: Boolean flag (default false). If true, later values override existing env variables.
- processEnv: Target object (default is `process.env`).

## Implementation Steps

1. Install package via npm/yarn/bun.
2. Create a `.env` file with key-value pairs using proper syntax. Use quotes for values with spaces or `#` characters.
3. Load environment variables as early as possible in your application via `require('dotenv').config()` or `import 'dotenv/config'` for ES6.
4. For advanced usage, use `dotenv.parse()` to manually process strings or buffers.
5. For encryption and synchronization across environments, use `dotenvx` commands such as `dotenvx set` and `dotenvx precommit`.
6. In deployment, ensure environment variables are injected securely using preloaded keys or command line options.

## Detailed Troubleshooting Commands

- Debug loading issues:

```
require('dotenv').config({ debug: true })
```

- Preload dotenv using Node CLI:

```
node -r dotenv/config your_script.js
```

- Webpack configuration troubleshooting with NodePolyfillPlugin:

```
npm install node-polyfill-webpack-plugin
```

Then in webpack.config.js:

```
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
module.exports = {
  plugins: [
    new NodePolyfillPlugin()
  ]
};
```


## Reference Details
## Complete API Specifications

### config(options?: ConfigOptions): { parsed?: { [key: string]: string }, error?: Error }

- **Parameters:**
  - options: {
      path?: string | string[];  // Default: path.resolve(process.cwd(), '.env')
      encoding?: string;           // Default: 'utf8'
      debug?: boolean;             // Default: false
      override?: boolean;          // Default: false
      processEnv?: { [key: string]: any } // Default: process.env
    }

- **Return:** An object with either a `parsed` key containing the env variables or an `error` key if loading fails.

**Example:**

```js
const result = require('dotenv').config({
  path: '/custom/path/to/.env',
  encoding: 'utf8',
  debug: true,
  override: true
});
if (result.error) {
  throw result.error;
}
console.log(result.parsed);
```

### parse(src: string | Buffer, options?: { debug?: boolean }): { [key: string]: string }

- **Parameters:**
  - src: A string or Buffer containing environment file data.
  - options: { debug?: boolean } where debug logs warnings/errors.

- **Return:** An object mapping keys to values.

**Example:**

```js
const dotenv = require('dotenv');
const buf = Buffer.from('BASIC=basic');
const config = dotenv.parse(buf, { debug: true });
console.log(config); // { BASIC: 'basic' }
```

### populate(target: { [key: string]: any }, parsed: { [key: string]: string }, options?: { override?: boolean, debug?: boolean }): void

- **Parameters:**
  - target: The target object (commonly process.env) to populate.
  - parsed: The object returned by parse.
  - options: { override?: boolean, debug?: boolean } 

- **Usage Example:**

```js
const dotenv = require('dotenv');
const parsed = { HELLO: 'world' };
const target = {};
dotenv.populate(target, parsed, { override: true, debug: true });
console.log(target); // { HELLO: 'world' }
```

### decrypt(encryptedData: string, key: string): string

- **Usage:** Provided by dotenvx for decrypting encrypted .env files. (Exact method signature may vary in dotenvx implementations.)

## Full Code Example (Using dotenv with ES6):

```js
// index.mjs
import 'dotenv/config';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send(`Environment Variable: ${process.env.S3_BUCKET}`);
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
```

## Best Practices

- Always load environment variables at the very start of your application.
- Use quotes for any values that might contain special characters or spaces.
- Enable `debug` mode during development to diagnose any issues with environment variable parsing.
- Do not commit your `.env` file to version control; use pre-commit hooks or encryption for secure environments.
- In a multi-environment setup, maintain separate `.env` files for each deployment context and use the override option judiciously.

## Detailed Troubleshooting Procedures

1. **Environment Not Loading:**
   - Confirm the `.env` file is in the correct location relative to the working directory.
   - Run with `debug: true`:
     ```js
     require('dotenv').config({ debug: true });
     ```
   - Expected output: Debug logs indicating if any keys are skipped due to pre-existing values.

2. **React Environment Variables Not Showing:**
   - Ensure using the `REACT_APP_` prefix in `.env` and verify configuration in Webpack.

3. **Module Not Found Errors in Webpack:**
   - Install missing polyfills:
     ```bash
     npm install node-polyfill-webpack-plugin
     ```
   - Update webpack.config.js as shown in the supplementary details.

4. **Variable Override Issues:**
   - Use the `override: true` option in the config call if process.env already has values.

5. **Encrypted .env Handling:**
   - Use dotenvx commands to encrypt and decrypt your .env files consistently.

6. **Command Substitution Failures:**
   - Verify that the command used in the .env file (e.g., `$(whoami)`) returns the expected output in your shell.


## Original Source
dotenv Documentation
https://github.com/motdotla/dotenv

## Digest of DOTENV

# DOTENV Technical Digest

**Date Retrieved:** 2023-10-24

## Installation

- Install via npm: `npm install dotenv --save`
- Alternatively using yarn: `yarn add dotenv`
- Or bun: `bun add dotenv`

## Usage (.env file)

1. Create a `.env` file in the root of your project. Example contents:

```
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

2. Early in your application, load the contents:

CommonJS:

```
require('dotenv').config()
console.log(process.env) // verify the loaded variables
```

ES6 Modules:

```
import 'dotenv/config'
```

Example with AWS S3 usage:

```
s3.getBucketCors({Bucket: process.env.S3_BUCKET}, function(err, data) {})
```

## Multiline Values

- To support line breaks in variables (v15.0.0+):

```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
...
Kh9NV...
...
-----END RSA PRIVATE KEY-----"
```

- Alternatively, with escaped newlines:

```
PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nKh9NV...\n-----END RSA PRIVATE KEY-----\n"
```

## Comments

- Comments can be on their own line or inline:

```
# This is a comment
SECRET_KEY=YOURSECRETKEYGOESHERE # comment
SECRET_HASH="something-with-a-#-hash"
```

*Note:* When a value contains a `#`, wrap it in quotes.

## Parsing

- The `dotenv.parse` function accepts a String or Buffer and returns an object with keys and values.

Example:

```
const dotenv = require('dotenv')
const buf = Buffer.from('BASIC=basic')
const config = dotenv.parse(buf)
console.log(typeof config, config) // { BASIC: 'basic' }
```

## Preload

- Preload using command line option (-r):

```
$ node -r dotenv/config your_script.js
```

- Command line configuration options:

```
$ node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env dotenv_config_debug=true
```

- Can also set via environment variables:

```
$ DOTENV_CONFIG_ENCODING=latin1 DOTENV_CONFIG_DEBUG=true node -r dotenv/config your_script.js dotenv_config_path=/custom/path/to/.env
```

## Variable Expansion

- Use `dotenv-expand` to expand environment variables:

```
const dotenv = require('dotenv')
const variableExpansion = require('dotenv-expand')
const myEnv = dotenv.config()
variableExpansion(myEnv)
```

## Command Substitution

- With `dotenvx`, you can run command substitution in the .env file:

Example .env:

```
DATABASE_URL="postgres://$(whoami)@localhost/my_database"
```

And usage:

```
console.log('DATABASE_URL', process.env.DATABASE_URL)
```

Run with debugging:

```
$ dotenvx run --debug -- node index.js
```

## Syncing and Multiple Environments

- **Syncing:** Use `dotenvx` to encrypt and synchronize environment files. 
- **Multiple Environments:** Create files like `.env.production`, `.env.local` and load with:

```
$ dotenvx run --env-file=.env.production -- node index.js
```

Or chain multiple:

```
$ dotenvx run --env-file=.env.local --env-file=.env -- node index.js
```

## Deploying (Encryption)

- Encrypt .env files with `dotenvx` using the `--encrypt` flag:

```
$ dotenvx set HELLO Production --encrypt -f .env.production
```

- Running with a private key:

```
$ DOTENV_PRIVATE_KEY_PRODUCTION="<.env.production private key>" dotenvx run -- node index.js
```

## Examples & Framework Integration

Supports examples for nodejs (debug, override, processEnv), esm (preload), typescript (parse, config), webpack (plugin), react, express, nestjs, fastify.

## Documentation Functions

Dotenv exposes four primary functions:

1. `config([options])`
   - Reads the .env file, sets process.env, and returns an object with a `parsed` key or an `error` key.

   **Example:**
   
   ```js
   const result = require('dotenv').config()
   if (result.error) {
     throw result.error
   }
   console.log(result.parsed)
   ```

   **Options:**
   - `path` (default: `path.resolve(process.cwd(), '.env')`): Custom file path or array of file paths. 
   - `encoding` (default: `'utf8'`): File encoding.
   - `debug` (default: `false`): Enable logging.
   - `override` (default: `false`): Override existing values in process.env.
   - `processEnv` (default: `process.env`): Target object for assignment.

2. `parse(src, [options])`
   - Parses a string or buffer to return an object with keys and values.
   
   **Example:**
   
   ```js
   const dotenv = require('dotenv')
   const buf = Buffer.from('BASIC=basic')
   const config = dotenv.parse(buf)
   console.log(config) // { BASIC: 'basic' }
   ```

   **Options:**
   - `debug`: Enable debug logging if parsing fails.

3. `populate(target, parsed, [options])`
   - Populates the target object with parsed environment variables.
   
   **Example:**
   
   ```js
   const dotenv = require('dotenv')
   const parsed = { HELLO: 'world' }
   dotenv.populate(process.env, parsed)
   console.log(process.env.HELLO) // world
   ```

   **Options:**
   - `override` (default: `false`): Override existing keys.
   - `debug` (default: `false`): Enable logging.

4. `decrypt` (available with dotenvx): For decrypting encrypted environment files.

## FAQ & Troubleshooting

- **.env File Placement:** Ensure the .env file is at the correct location. Use `debug: true` to troubleshoot:

```
require('dotenv').config({ debug: true })
```

- **React Environment Variables:** For React, ensure variables are prefixed with `REACT_APP_` and configured via Webpack.

- **Webpack Polyfill Issues:** If you see "Module not found: Error: Can't resolve 'crypto|os|path'", install and configure polyfills:

```
npm install node-polyfill-webpack-plugin
```

Webpack configuration example:

```
const path = require('path');
const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        HELLO: JSON.stringify(process.env.HELLO)
      }
    }),
  ]
};
```

- **Avoid Committing .env:** Do not commit your .env file to version control. Use pre-commit hooks like:

```
dotenvx precommit --install
```

- **Docker Build Issues:** Prevent your .env file from being committed by using Docker prebuild hooks.

## Attribution

- Data Size: 599712 bytes
- Crawled from: https://github.com/motdotla/dotenv
- Retrieved on: 2023-10-24

## Attribution
- Source: dotenv Documentation
- URL: https://github.com/motdotla/dotenv
- License: MIT
- Crawl Date: 2025-04-20T22:47:12.928Z
- Data Size: 599712 bytes
- Links Found: 4768

## Retrieved
2025-04-20
