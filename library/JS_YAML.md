# JS_YAML

## Crawl Summary
The js-yaml package provides a YAML 1.2 parser and writer for JavaScript. Key technical details include installation instructions for both module and CLI usage, comprehensive CLI options, and a robust API with methods such as load, loadAll, and dump. The load method requires a YAML string and optional configuration (filename, onWarning callback, schema specification, and json flag). The dump method serializes JavaScript objects with configurable options such as indent, noArrayIndent, skipInvalid, flowLevel, styles mapping, schema selection, sortKeys, lineWidth, noRefs, noCompatMode, condenseFlow, quotingType, and forceQuotes. Detailed example implementations and full method signatures are provided for direct developer use.

## Normalised Extract
## Table of Contents

1. Installation
   - npm install js-yaml
   - Global installation for CLI

2. CLI Usage
   - Command syntax and options

3. API Methods
   - load: Parses a single document (signature: load(string, [options])). Options include: filename (default null), onWarning (default null), schema (default DEFAULT_SCHEMA), json (default false).
   - loadAll: Parses multiple documents (signature: loadAll(string, [iterator], [options])).
   - dump: Serializes an object to YAML (signature: dump(object, [options])). Options include:
     - indent (default 2)
     - noArrayIndent (default false)
     - skipInvalid (default false)
     - flowLevel (default -1)
     - styles (mapping per tag)
     - schema (default DEFAULT_SCHEMA)
     - sortKeys (default false)
     - lineWidth (default 80)
     - noRefs (default false)
     - noCompatMode (default false)
     - condenseFlow (default false)
     - quotingType (default ' or ")
     - forceQuotes (default false)
     - replacer function

4. Supported YAML Types and Styles
   - Standard tags: !!null, !!bool, !!int, !!float, !!binary, !!timestamp, !!omap, !!pairs, !!set, !!str, !!seq, !!map.
   - Style mappings: Detailed mapping for tags (e.g., canonical: '~', lowercase: 'null').

5. Caveats
   - Arrays/objects cannot be used as keys and are stringified.
   - Limitations with implicit block mapping keys and duplicate anchors.


## Detailed Technical Information

### Installation
```bash
npm install js-yaml
npm install -g js-yaml
```

### CLI Usage
```bash
js-yaml [-h] [-v] [-c] [-t] file
```

### API Method Details
#### load
```javascript
load(string, [options])
```
- **Parameters:**
  - string: YAML content to parse.
  - options: { filename?: string, onWarning?: function, schema?: any, json?: boolean }
- **Returns:**: JavaScript object/string/number/null/undefined
- **Throws:** YAMLException

#### loadAll
```javascript
loadAll(string, [iterator], [options])
```
- **Parameters:**
  - string: YAML content containing one or more documents.
  - iterator (optional): Function to process each document.
  - options: Same as load options.
- **Returns:**: Array of documents if no iterator is provided.

#### dump
```javascript
dump(object, [options])
```
- **Parameters:**
  - object: JavaScript object to serialize.
  - options: {
      indent?: number,
      noArrayIndent?: boolean,
      skipInvalid?: boolean,
      flowLevel?: number,
      styles?: { [tag: string]: string },
      schema?: any,
      sortKeys?: boolean | function,
      lineWidth?: number,
      noRefs?: boolean,
      noCompatMode?: boolean,
      condenseFlow?: boolean,
      quotingType?: string,
      forceQuotes?: boolean,
      replacer?: function
    }
- **Returns:**: YAML formatted string

### Supported YAML Types
- **Tags and their default representations:**
  - !!null: { canonical: "~", lowercase: "null", uppercase: "NULL", camelcase: "Null" }
  - !!int: { binary: "0b1", octal: "0o1", decimal: "1", hexadecimal: "0x1" }
  - !!bool & !!float: Similar mappings as defined above.

### Caveats and Limitations
- Objects/arrays used as keys will be converted to strings using toString().
- Loading YAML with duplicate anchors or implicit mapping keys may throw exceptions due to unsupported operations in JavaScript.


## Supplementary Details
### API Options and Configuration

**load Options:**
- filename: string (default: null) - used in error messages.
- onWarning: function (default: null) - receives YAMLException instances on warnings.
- schema: (default: DEFAULT_SCHEMA) - can be FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, or DEFAULT_SCHEMA.
- json: boolean (default: false) - when true, duplicate keys override earlier values.

**dump Options:**
- indent: number (default: 2) - indentation in spaces.
- noArrayIndent: boolean (default: false) - disables extra indentation for arrays if set to true.
- skipInvalid: boolean (default: false) - skips invalid types instead of throwing exceptions.
- flowLevel: number (default: -1) - level at which collection style switches; -1 forces block style.
- styles: object - mapping of YAML tags to their output style (e.g., { '!!null': 'canonical' }).
- schema: (default: DEFAULT_SCHEMA) - schema to use for dumping.
- sortKeys: boolean or function (default: false) - if true, keys will be sorted; if function, used for custom sort order.
- lineWidth: number (default: 80) - maximum line width, use -1 for unlimited.
- noRefs: boolean (default: false) - when true, disables reference indicator for duplicate objects.
- noCompatMode: boolean (default: false) - disables compatibility mode for older YAML versions.
- condenseFlow: boolean (default: false) - removes extra spaces in flow sequences when true.
- quotingType: string (default: ' or ") - determines the quote style for strings.
- forceQuotes: boolean (default: false) - when true, forces quotes for all non-key strings.
- replacer: function - callback applied on each key/value pair during serialization.

**Implementation Steps:**
1. Install using npm.
2. Import package using `const yaml = require('js-yaml');`.
3. For parsing, read file content using Node's fs module and call `yaml.load` or `yaml.loadAll`.
4. For dumping, pass the object and options to `yaml.dump` and handle exceptions if any invalid type exists.

**Best Practices:**
- Always catch exceptions from `yaml.load` to prevent runtime errors.
- Use the `onWarning` callback to log non-critical issues.
- Validate configuration options especially when using custom schemas.
- For CLI usage, utilize the `-c` and `-t` flags for compact error messages and stack traces.

**Troubleshooting Procedures:**
- If duplicate keys cause an error, consider using the `json` flag set to true.
- For large YAML files, check the `lineWidth` and indent settings if formatting issues occur.
- Use the CLI with `-h` to confirm available options.
- Run a simple test script to isolate YAML parsing or dumping issues:

```bash
node -e "try { const yaml = require('js-yaml'); const fs = require('fs'); const data = fs.readFileSync('test.yml', 'utf8'); console.log(yaml.load(data)); } catch(e) { console.error(e); }"
```


## Reference Details
## Complete API Specifications

### load(string, [options])
```javascript
/**
 * Parses a YAML string and returns a JavaScript representation.
 *
 * @param {string} input - YAML formatted string.
 * @param {Object} [options] - Parsing options.
 * @param {string} [options.filename=null] - Filename for error reporting.
 * @param {function} [options.onWarning=null] - Callback invoked with YAMLException on warnings.
 * @param {Object} [options.schema=DEFAULT_SCHEMA] - Schema to use (FAILSAFE_SCHEMA, JSON_SCHEMA, CORE_SCHEMA, DEFAULT_SCHEMA).
 * @param {boolean} [options.json=false] - If true, duplicate keys override previous values.
 *
 * @throws {YAMLException} If parsing fails.
 * @returns {any} Parsed JavaScript value (object, string, number, null, or undefined).
 */
function load(input, options) {}
```

### loadAll(string, [iterator], [options])
```javascript
/**
 * Parses a YAML string containing one or more documents.
 *
 * @param {string} input - A YAML string with one or more documents.
 * @param {function} [iterator] - Optional function(doc) to process each document.
 * @param {Object} [options] - Parsing options (same as load).
 *
 * @returns {Array|undefined} An array of documents if no iterator is provided, otherwise undefined.
 */
function loadAll(input, iterator, options) {}
```

### dump(object, [options])
```javascript
/**
 * Serializes a JavaScript object into a YAML formatted string.
 *
 * @param {any} input - JavaScript object to serialize.
 * @param {Object} [options] - Serialization options.
 * @param {number} [options.indent=2] - Number of spaces for indentation.
 * @param {boolean} [options.noArrayIndent=false] - If true, array elements are not indented further.
 * @param {boolean} [options.skipInvalid=false] - If true, invalid types are skipped without throwing.
 * @param {number} [options.flowLevel=-1] - Level at which to switch to flow style (use -1 for block style everywhere).
 * @param {Object} [options.styles] - Map of tag names to style strings (e.g., { '!!null': 'canonical' }).
 * @param {Object} [options.schema=DEFAULT_SCHEMA] - Schema to use for dumping.
 * @param {boolean|function} [options.sortKeys=false] - If true, sort keys; if a function, use it to compare keys.
 * @param {number} [options.lineWidth=80] - Maximum line width (-1 for unlimited).
 * @param {boolean} [options.noRefs=false] - If true, duplicate objects are not replaced with references.
 * @param {boolean} [options.noCompatMode=false] - If true, disables YAML 1.1 compatibility fixes.
 * @param {boolean} [options.condenseFlow=false] - If true, condenses flow sequences by removing spaces.
 * @param {string} [options.quotingType='\''] - The quoting style for strings (' or ").
 * @param {boolean} [options.forceQuotes=false] - If true, forces quoting of all non-key strings.
 * @param {function} [options.replacer] - A function (key, value) for custom serialization of properties.
 *
 * @returns {string} YAML formatted string.
 */
function dump(input, options) {}
```

## Full Code Example

```javascript
const yaml = require('js-yaml');
const fs = require('fs');

// Parsing a YAML file with error handling
try {
  const fileContent = fs.readFileSync('/home/ixti/example.yml', 'utf8');
  const doc = yaml.load(fileContent, {
    filename: '/home/ixti/example.yml',
    onWarning: (e) => { console.warn('Warning:', e.message); },
    schema: yaml.DEFAULT_SCHEMA,
    json: false
  });
  console.log('Parsed Document:', doc);
} catch (e) {
  console.error('Parsing error:', e);
}

// Serializing an object to YAML
const sampleObject = { key: null, list: [1, 2, 3] };
try {
  const yamlString = yaml.dump(sampleObject, {
    indent: 2,
    noArrayIndent: false,
    skipInvalid: true,
    flowLevel: -1,
    styles: { '!!null': 'canonical' },
    sortKeys: true,
    lineWidth: 80,
    noRefs: false,
    noCompatMode: false,
    condenseFlow: false,
    quotingType: '"',
    forceQuotes: false,
    replacer: (key, value) => { return value; }
  });
  console.log('YAML Output:\n', yamlString);
} catch (e) {
  console.error('Dump error:', e);
}
```

## Troubleshooting Commands

- **Test Parsing:**
```bash
node -e "const yaml = require('js-yaml'); const fs = require('fs'); try { const data = fs.readFileSync('test.yml', 'utf8'); console.log(yaml.load(data)); } catch(e) { console.error(e); }"
```

- **Test Dumping:**
```bash
node -e "const yaml = require('js-yaml'); console.log(yaml.dump({ test: 'value' }));"
```


## Original Source
js-yaml Documentation
https://www.npmjs.com/package/js-yaml

## Digest of JS_YAML

# JS-YAML Documentation

**Retrieved Date:** 2023-10-04

## Installation

- **Module Installation for Node.js:**
  ```bash
  npm install js-yaml
  ```

- **Global CLI Installation:**
  ```bash
  npm install -g js-yaml
  ```

## CLI Usage

```bash
js-yaml [-h] [-v] [-c] [-t] file
```

**Positional Arguments:**
- `file`: File with YAML document(s)

**Optional Arguments:**
- `-h, --help`     : Show help message and exit.
- `-v, --version`  : Show version number and exit.
- `-c, --compact`  : Display errors in compact mode.
- `-t, --trace`    : Show stack trace on error.

## API Overview

The following are the most used API methods:

### 1. load

**Signature:**
```javascript
load(string, [options])
```

**Description:**
Parses a string as a single YAML document. Returns one of:
- a plain JavaScript object
- a string
- a number
- null
- undefined

**Throws:** `YAMLException` on error.

**Options:**
- `filename` (default: `null`): A string to be used as a file path in error/warning messages.
- `onWarning` (default: `null`): A callback function that receives a `YAMLException` for each warning.
- `schema` (default: `DEFAULT_SCHEMA`): Specifies the schema to use. Alternatives include:
  - `FAILSAFE_SCHEMA` (only strings, arrays and plain objects)
  - `JSON_SCHEMA` (supports all JSON types)
  - `CORE_SCHEMA` (alias of JSON_SCHEMA)
  - `DEFAULT_SCHEMA` (supports all YAML types)
- `json` (default: `false`): If true, duplicate keys override values (JSON.parse behavior).

**Example:**
```javascript
const yaml = require('js-yaml');
const fs   = require('fs');

try {
  const doc = yaml.load(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
  console.log(doc);
} catch (e) {
  console.log(e);
}
```

### 2. loadAll

**Signature:**
```javascript
loadAll(string, [iterator], [options])
```

**Description:**
Parses a string that may contain multiple YAML documents.
If an iterator is provided, it is applied to each document; otherwise, an array of documents is returned.

**Example:**
```javascript
const yaml = require('js-yaml');

yaml.loadAll(data, function (doc) {
  console.log(doc);
});
```

### 3. dump

**Signature:**
```javascript
dump(object, [options])
```

**Description:**
Serializes a JavaScript object into a YAML document. Uses `DEFAULT_SCHEMA` by default.

**Options:**
- `indent` (default: `2`): Indentation width (in spaces).
- `noArrayIndent` (default: `false`): If true, disables adding an indentation level to array elements.
- `skipInvalid` (default: `false`): If true, invalid types are skipped instead of throwing.
- `flowLevel` (default: `-1`): Switches from block to flow style at the specified level of nesting; `-1` forces block style everywhere.
- `styles`: A mapping of YAML tags to style strings (e.g. `{ '!!null': 'canonical' }`).
- `schema` (default: `DEFAULT_SCHEMA`): Specifies the schema to use.
- `sortKeys` (default: `false`): If true, sorts keys when dumping; if a function, it is used for sorting keys.
- `lineWidth` (default: `80`): Maximum line width (-1 for unlimited).
- `noRefs` (default: `false`): If true, duplicate objects are not converted to references.
- `noCompatMode` (default: `false`): If true, avoids compatibility measures with older YAML versions.
- `condenseFlow` (default: `false`): If true, condenses flow sequences (e.g. `[a,b]` without spaces).
- `quotingType` (default: `'`): Specifies the string quoting style; if set, double quotes will still be used for non-printable characters.
- `forceQuotes` (default: `false`): If true, forces quoting of all non-key strings.
- `replacer`: A callback (similar to JSON.stringify replacer) called recursively on key/value pairs.

**Example:**
```javascript
const yaml = require('js-yaml');

const obj = { key: null };
console.log(yaml.dump(obj, {
  styles: { '!!null': 'canonical' },
  sortKeys: true
}));
```

## Supported YAML Types & Styles

### Standard YAML Tags

| Tag        | JavaScript Type        |
|------------|------------------------|
| `!!null`   | null                   |
| `!!bool`   | Boolean                |
| `!!int`    | Number                 |
| `!!float`  | Number                 |
| `!!binary` | Buffer                 |
| `!!timestamp` | Date                |
| `!!omap`   | Array of key-value pairs |
| `!!pairs`  | Array of pairs         |
| `!!set`    | Array (keys as object with null values) |
| `!!str`    | String                 |
| `!!seq`    | Array                  |
| `!!map`    | Object                 |

### Example Tag Styles for `!!null`, `!!int`, ...

- For `!!null`:
  - `canonical` : `~`
  - `lowercase` : `null`
  - `uppercase` : `NULL`
  - `camelcase` : `Null`

- For `!!int`:
  - `binary`      : e.g. `0b1`, `0b101010`
  - `octal`       : e.g. `0o1`, `0o52`
  - `decimal`     : e.g. `1`, `42`
  - `hexadecimal` : e.g. `0x1`, `0x2A`

- For `!!bool` and `!!float` similar style mappings are available.

## Caveats

- JavaScript does not support using arrays or objects as keys. They will be stringified using their `toString()` method.
- Properties on implicit block mapping keys are not supported. For example, documents using anchors and duplicate keys may cause exceptions.

## Attribution & Data Size

- **Data Size:** 415940 bytes
- **Source:** https://www.npmjs.com/package/js-yaml


## Attribution
- Source: js-yaml Documentation
- URL: https://www.npmjs.com/package/js-yaml
- License: MIT License
- Crawl Date: 2025-04-21T23:47:24.446Z
- Data Size: 415940 bytes
- Links Found: 2374

## Retrieved
2025-04-21
