# XML2JS

## Crawl Summary
This document provides the complete technical details for xml2js which includes usage examples (callback, promise, CoffeeScript), complete parser options (attrkey, charkey, explicitArray, etc.), Builder options for generating XML (renderOpts, xmldec, headless, cdata), processing functions (tagNameProcessors, attrNameProcessors, etc.) and migration instructions for defaults. It also includes troubleshooting procedures and full code examples with exact API signatures.

## Normalised Extract
# Table of Contents

1. Usage Examples
   - Basic Parsing
   - CoffeeScript Parsing
   - File Parsing
   - Promise-based Parsing
2. Builder Usage
   - Basic XML Building
   - Attributes & CDATA
   - Namespace Handling
3. Processing Options
   - Name and Value Processors
4. Parser Options
   - Configuration Parameters with Defaults
5. Builder Options
   - XML Declaration and Formatting
6. Migration Guidelines
7. Development, Testing and Troubleshooting

## 1. Usage Examples

**Basic Parsing:**

• Method: parseString
• Signature: parseString(xml: string, callback: (err: Error, result: Object) => void)

Example:
```javascript
var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>";
parseString(xml, function (err, result) {
    console.dir(result);
});
```

**CoffeeScript Parsing:**

Example:
```coffeescript
{parseString} = require 'xml2js'
xml = "<root>Hello xml2js!</root>"
parseString xml, (err, result) -> console.dir result
```

**File Parsing:**

Example using fs:
```javascript
var fs = require('fs'), xml2js = require('xml2js');
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/foo.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result);
        console.log('Done');
    });
});
```

**Promise-based Parsing:**

Example using parseStringPromise:
```javascript
var xml2js = require('xml2js');
var xml = '<foo></foo>';
var parser = new xml2js.Parser();
parser.parseStringPromise(xml).then(function (result) {
  console.dir(result);
  console.log('Done');
}).catch(function (err) {
  // Handle error
});
```

## 2. Builder Usage

**Basic XML Building:**

Signature: buildObject(obj: Object): string

Example:
```javascript
var builder = new xml2js.Builder();
var xml = builder.buildObject({name: "Super", Surname: "Man", age: 23});
```

**Attributes & CDATA:**

Example:
```javascript
var builder = new xml2js.Builder();
var xml = builder.buildObject({root: {$: {id: "my id"}, _: "my inner text"}});
```

**Namespace Handling:**

Example default namespace:
```javascript
let obj = { Foo: { $: { "xmlns": "http://foo.com" } } };
```

Non-default namespaces:
```javascript
let obj = {
  'foo:Foo': {
    $: { 'xmlns:foo': 'http://foo.com' },
    'bar:Bar': { $: { 'xmlns:bar': 'http://bar.com' } }
  }
};
```

## 3. Processing Options

- tagNameProcessors, attrNameProcessors, valueProcessors, attrValueProcessors

Example:
```javascript
function nameToUpperCase(name){ return name.toUpperCase(); }
parseString(xml, {
  tagNameProcessors: [nameToUpperCase],
  attrNameProcessors: [nameToUpperCase],
  valueProcessors: [nameToUpperCase],
  attrValueProcessors: [nameToUpperCase]
}, function (err, result) {
  // Processed data
});
```

## 4. Parser Options

Configuration options when instantiating a Parser:

- attrkey: '$' (default)
- charkey: '_' (default)
- explicitCharkey: false
- trim: false
- normalizeTags: false
- normalize: false
- explicitRoot: true
- emptyTag: ''
- explicitArray: true
- ignoreAttrs: false
- mergeAttrs: false
- validator: null
- xmlns: false
- explicitChildren: false
- childkey: '$$'
- preserveChildrenOrder: false
- charsAsChildren: false
- includeWhiteChars: false
- async: false
- strict: true
- attrNameProcessors: null
- attrValueProcessors: null
- tagNameProcessors: null
- valueProcessors: null

## 5. Builder Options

Use with new Builder({})

- attrkey: '$'
- charkey: '_'
- rootName: 'root'
- renderOpts: { pretty: true, indent: '  ', newline: '\n' }
- xmldec: { version: '1.0', encoding: 'UTF-8', standalone: true }
- doctype: null
- headless: false
- allowSurrogateChars: false
- cdata: false

## 6. Migration Guidelines

For switching defaults:
```javascript
var parser = new xml2js.Parser(xml2js.defaults["0.2"]);
// or to switch back to 0.1 defaults:
var parser = new xml2js.Parser(xml2js.defaults["0.1"]);
```

## 7. Development, Testing and Troubleshooting

- Run tests: `npm test`

**Troubleshooting Util.inspect Truncation:**
```javascript
console.log(require('util').inspect(result, false, null));
```

**Troubleshooting eyes output truncation:**
```javascript
var inspect = require('eyes').inspector({ maxLength: false });
inspect(result);
```


## Supplementary Details
# Supplementary Technical Details

## Parser Detailed Options

```javascript
var parser = new xml2js.Parser({
  attrkey: '$',           // Access attributes via object.$
  charkey: '_',           // Access text content via object._
  explicitCharkey: false,
  trim: false,            // No trimming of whitespace
  normalizeTags: false,   // Tag names remain case-sensitive
  normalize: false,       // Inner text not trimmed
  explicitRoot: true,     // Root node returned explicitly
  emptyTag: '',           // Empty nodes set to empty string
  explicitArray: true,    // Enforce array for child nodes
  ignoreAttrs: false,     // Attributes are parsed
  mergeAttrs: false,      // Do not merge attributes with child nodes
  validator: null,
  xmlns: false,
  explicitChildren: false,
  childkey: '$$',         // Access children via '$$'
  preserveChildrenOrder: false,
  charsAsChildren: false,
  includeWhiteChars: false,
  async: false,
  strict: true,
  attrNameProcessors: null,
  attrValueProcessors: null,
  tagNameProcessors: null,
  valueProcessors: null
});
```

## Builder Detailed Options

```javascript
var builder = new xml2js.Builder({
  attrkey: '$',
  charkey: '_',
  rootName: 'root',
  renderOpts: { pretty: true, indent: '  ', newline: '\n' },
  xmldec: { version: '1.0', encoding: 'UTF-8', standalone: true },
  doctype: null,
  headless: false,
  allowSurrogateChars: false,
  cdata: false
});
```

## Implementation Best Practices

- Always instantiate a new Parser per file to avoid shared references.
- If processing multiple XML files, avoid using reset() unless necessary.
- Use promise-based parsing (parseStringPromise) for modern asynchronous code.
- For complete inspection, use util.inspect with depth null.
- When building XML, set cdata to true if you need CDATA sections for special text handling.

## Detailed Troubleshooting Procedures

1. If the output is truncated:
   - Command: `console.log(require('util').inspect(result, false, null));`
   - Expected output: Full nested object representation.

2. If attribute names or tag names need processing:
   - Ensure custom processors are added properly. Example:
   ```javascript
   function nameToUpperCase(name){ return name.toUpperCase(); }
   var options = { tagNameProcessors: [nameToUpperCase] };
   parser.parseString(xml, options, callback);
   ```

3. If XML is not well-formed:
   - Validate XML format. Ensure strict mode is enabled.
   - Command: `xmllint --noout yourfile.xml`

4. If promise rejection occurs:
   - Check the error message in the catch block and verify XML syntax.
   - Logging command: `.catch(function(err){ console.error(err); });`


## Reference Details
# Complete API Specifications and SDK Method Signatures

## parseString

**Signature:**
```javascript
parseString(xml: string, options?: Object, callback: (err: Error|null, result: Object) => void): void
```

**Parameters:**
- xml: A string containing the XML to be parsed.
- options (optional): An object containing key-value pairs for parser configuration (e.g., trim, explicitArray, etc.).
- callback: A function that receives an error object (if any) and the resulting JavaScript object.

**Return Type:**
- void (results are provided via the callback).

**Example:**
```javascript
var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>";
parseString(xml, {trim: true}, function (err, result) {
    if(err) {
       console.error(err);
    } else {
       console.dir(result);
    }
});
```

## parseStringPromise

**Signature:**
```javascript
parseStringPromise(xml: string, options?: Object): Promise<Object>
```

**Parameters:**
- xml: XML string to parse.
- options (optional): Configuration options as per the parser.

**Return Type:**
- Promise that resolves to the JavaScript object representing the XML.

**Example:**
```javascript
var xml2js = require('xml2js');
var xml = '<foo></foo>';
xml2js.parseStringPromise(xml, {trim: true})
    .then(function(result) {
        console.dir(result);
    })
    .catch(function(err) {
        console.error(err);
    });
```

## Parser Class Constructor

**Signature:**
```javascript
new Parser(options?: Object)
```

**Parameters:**
- options: An object with configuration options (see Parser Detailed Options above).

**Example:**
```javascript
var xml2js = require('xml2js');
var parser = new xml2js.Parser({
  explicitArray: false,
  trim: true
});
```

## Builder Class Constructor

**Signature:**
```javascript
new Builder(options?: Object)
```

**Parameters:**
- options: An object that may include:
  - attrkey: string (default: '$')
  - charkey: string (default: '_')
  - rootName: string (default: 'root')
  - renderOpts: object (default: { pretty: true, indent: '  ', newline: '\n' })
  - xmldec: object (default: { version: '1.0', encoding: 'UTF-8', standalone: true })
  - doctype: object | null
  - headless: boolean (default: false)
  - allowSurrogateChars: boolean (default: false)
  - cdata: boolean (default: false)

**Example:**
```javascript
var builder = new xml2js.Builder({
  rootName: 'customRoot',
  xmldec: { version: '1.0', encoding: 'UTF-8', standalone: false },
  headless: false
});
var xml = builder.buildObject({ test: 'value' });
console.log(xml);
```

## Best Practices and Troubleshooting

- Always use a new Parser instance per XML file to avoid cross contamination.
- When results are truncated in logs, use:
  ```javascript
  console.log(require('util').inspect(result, false, null));
  ```
- Use promise-based parsing for asynchronous workflows.
- Validate XML with external tools (e.g., xmllint) before processing.
- For full attribute or tag name processing, provide custom processors as arrays of functions with the required signature.

## Detailed Implementation Steps

1. Install xml2js: `npm install xml2js`

2. Require module and choose usage mode:
   - For callbacks: `var parseString = require('xml2js').parseString;`
   - For promises: `var xml2js = require('xml2js');`

3. Create a Parser instance if needed:
   ```javascript
   var parser = new xml2js.Parser({ explicitArray: false, trim: true });
   ```

4. Parse XML string using:
   ```javascript
   parser.parseString(xml, function(err, result) { ... });
   ```
   or using promise:
   ```javascript
   parser.parseStringPromise(xml).then(result => { ... }).catch(err => { ... });
   ```

5. To build XML from an object, instantiate Builder and call buildObject:
   ```javascript
   var builder = new xml2js.Builder();
   var xml = builder.buildObject(obj);
   ```

6. For troubleshooting output, increase inspection depth:
   ```javascript
   console.log(require('util').inspect(result, false, null));
   ```

7. If custom formatting is required, use provided options in both Parser and Builder.

8. Refer to the above code examples for exact configuration, expected outputs, and error handling mechanisms.


## Original Source
xml2js Documentation
https://www.npmjs.com/package/xml2js

## Digest of XML2JS

# XML2JS Documentation

**Retrieved:** 2023-10-05

## Overview

xml2js is a simple XML to JavaScript object converter that offers bidirectional conversion using sax-js and xmlbuilder-js. It is available via npm and Bower and supports multiple modes of usage: callback style, promise style, and even use with CoffeeScript. It also provides a Builder class for converting JavaScript objects to XML.

## Usage Examples

### Basic Parsing

```javascript
var parseString = require('xml2js').parseString;
var xml = "<root>Hello xml2js!</root>";
parseString(xml, function (err, result) {
    console.dir(result);
});
```

### CoffeeScript Parsing

```coffeescript
{parseString} = require 'xml2js'
xml = "<root>Hello xml2js!</root>"
parseString xml, (err, result) ->
    console.dir result
```

### Specifying Options

```javascript
parseString(xml, {trim: true}, function (err, result) {
    // result with trimmed text nodes
});
```

### File Parsing Example

```javascript
var fs = require('fs'), xml2js = require('xml2js');
var parser = new xml2js.Parser();
fs.readFile(__dirname + '/foo.xml', function(err, data) {
    parser.parseString(data, function (err, result) {
        console.dir(result);
        console.log('Done');
    });
});
```

### Promise Based Parsing

```javascript
var xml2js = require('xml2js');
var xml = '<foo></foo>';

// With parser instance
var parser = new xml2js.Parser(/* options */);
parser.parseStringPromise(xml).then(function (result) {
  console.dir(result);
  console.log('Done');
}).catch(function (err) {
  // Error handling
});

// Without parser instance
xml2js.parseStringPromise(xml /*, options */).then(function (result) {
  console.dir(result);
  console.log('Done');
}).catch(function (err) {
  // Error handling
});
```

## Builder Usage

### Basic XML Building

```javascript
var xml2js = require('xml2js');
var obj = {name: "Super", Surname: "Man", age: 23};

var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);
// XML output:
// <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <root>
//   <name>Super</name>
//   <Surname>Man</Surname>
//   <age>23</age>
// </root>
```

### Attributes and CDATA

```javascript
var obj = {root: {$: {id: "my id"}, _: "my inner text"}};
var builder = new xml2js.Builder();
var xml = builder.buildObject(obj);
// XML output:
// <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
// <root id="my id">my inner text</root>
```

### Namespaces

Default namespace:

```javascript
let obj = { 
  Foo: {
    $: { "xmlns": "http://foo.com" }
  }
};
// Output: <Foo xmlns="http://foo.com"/>
```

Non-default namespaces:

```javascript
let obj = {
  'foo:Foo': {
    $: { 'xmlns:foo': 'http://foo.com' },
    'bar:Bar': {
      $: { 'xmlns:bar': 'http://bar.com' }
    }
  }
};
// Output:
// <foo:Foo xmlns:foo="http://foo.com">
//   <bar:Bar xmlns:bar="http://bar.com"/>
// </foo:Foo>
```

## Processing Options

The parser supports name and value processing functions:

```javascript
function nameToUpperCase(name){
    return name.toUpperCase();
}

parseString(xml, {
  tagNameProcessors: [nameToUpperCase],
  attrNameProcessors: [nameToUpperCase],
  valueProcessors: [nameToUpperCase],
  attrValueProcessors: [nameToUpperCase]
}, function (err, result) {
  // processed data
});
```

Processors available out-of-the-box (in lib/processors.js):

- normalize: lowercases names (used if options.normalize is true)
- firstCharLowerCase: converts first character to lower case
- stripPrefix: removes namespace prefix
- parseNumbers: converts numeric strings to numbers
- parseBooleans: converts boolean-like strings to booleans

## Parser Options

Instantiate a parser with:

```javascript
var parser = new xml2js.Parser({
  attrkey: '$',         // default '$'
  charkey: '_',         // default '_'
  explicitCharkey: false, // default false
  trim: false,          // default false
  normalizeTags: false,  // default false
  normalize: false,      // default false
  explicitRoot: true,    // default true
  emptyTag: '',          // default '' or a factory function
  explicitArray: true,   // default true
  ignoreAttrs: false,    // default false
  mergeAttrs: false,     // default false
  validator: null,       // default null
  xmlns: false,          // default false
  explicitChildren: false, // default false
  childkey: '$$',        // default '$$'
  preserveChildrenOrder: false, // default false
  charsAsChildren: false, // default false
  includeWhiteChars: false, // default false
  async: false,          // default false
  strict: true,          // default true
  attrNameProcessors: null, // default null
  attrValueProcessors: null, // default null
  tagNameProcessors: null,  // default null
  valueProcessors: null     // default null
});
```

## Builder Options

When creating a Builder instance:

```javascript
var builder = new xml2js.Builder({
  attrkey: '$',
  charkey: '_',
  rootName: 'root',
  renderOpts: { pretty: true, indent: '  ', newline: '\n' },
  xmldec: { version: '1.0', encoding: 'UTF-8', standalone: true },
  doctype: null,
  headless: false,
  allowSurrogateChars: false,
  cdata: false
});
```

Options explanation:
- renderOpts: Settings for xmlbuilder-js (pretty printing, indent, newline)
- xmldec: XML declaration attributes
- doctype: Option DTD, e.g. { ext: 'hello.dtd' }
- headless: Omit XML header when true
- cdata: Wrap text nodes in CDATA sections when true

## Migration and Defaults

To use previous defaults in version 0.2:

```javascript
var xml2js = require('xml2js');
var parser = new xml2js.Parser(xml2js.defaults["0.2"]);
// For 0.1 defaults in version 0.2, use xml2js.defaults["0.1"]
```

## Development & Testing

- Run unit tests via: `npm test`
- xml2js is written in CoffeeScript; do not modify the generated JavaScript files.

## Troubleshooting

1. If results are truncated due to util.inspect depth, use:
   ```javascript
   console.log(require('util').inspect(result, false, null));
   ```
2. For colored output with no truncation, use:
   ```javascript
   var inspect = require('eyes').inspector({ maxLength: false });
   inspect(result);
   ```
3. If parser errors occur, verify the XML is well-formed and ensure `strict` option is set to true.

## Attribution

- Data Size: 513945 bytes
- Links Found: 1858
- No errors encountered


## Attribution
- Source: xml2js Documentation
- URL: https://www.npmjs.com/package/xml2js
- License: MIT
- Crawl Date: 2025-04-17T20:26:38.252Z
- Data Size: 513945 bytes
- Links Found: 1858

## Retrieved
2025-04-17
