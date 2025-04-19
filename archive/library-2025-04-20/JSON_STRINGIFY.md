# JSON_STRINGIFY

## Crawl Summary
JSON.stringify() converts a JavaScript value to a JSON string with optional replacer and space parameters. Method signatures include: JSON.stringify(value), JSON.stringify(value, replacer), and JSON.stringify(value, replacer, space). Parameters include 'value' (any type), 'replacer' (function or array), and 'space' (number or string) with defined behaviors: numbers are clamped to 10 spaces, strings are truncated to 10 characters. It returns a JSON string or undefined and throws a TypeError on circular references or BigInt values without custom toJSON(). Detailed examples illustrate usage with Date objects, arrays (including handling of undefined and functions), and objects with custom toJSON() implementations. Best practices include localStorage serialization and handling of special cases such as surrogate pairs.

## Normalised Extract
# Table of Contents
1. Overview
2. Method Signatures
3. Parameters
   - value
   - replacer (function/array)
   - space (number/string)
4. Return Value
5. Exceptions
6. Serialization Behavior
7. Implementation Examples
   - Basic Usage
   - Replacer Function Example
   - Replacer Array Example
   - Space Parameter Example
   - Circular Reference Handling
8. LocalStorage Usage Example
9. Well-Formed JSON Output (Unicode handling)

---

## 1. Overview
`JSON.stringify()` serializes JavaScript values into JSON strings with optional transformation via a replacer and formatting via a space parameter.

## 2. Method Signatures
```
JSON.stringify(value)
JSON.stringify(value, replacer)
JSON.stringify(value, replacer, space)
```

## 3. Parameters
- **value**: The target value to serialize.
- **replacer**: 
  - As a function:
    ```js
    function replacer(key, value) {
      // key: property name ('' for root)
      // value: property value
      return value; // return modified value or undefined to omit
    }
    ```
  - As an array: Only string or number property names are included; others are ignored.
- **space**: A formatting parameter.
  - Number: Specifies indentation, clamped to a maximum of 10 spaces.
  - String: First 10 characters are used as the indentation string.

## 4. Return Value
A JSON string representing the input value, or `undefined` if input is non-serializable (e.g., pure function or undefined).

## 5. Exceptions
Throws `TypeError` if:
- Circular references are detected.
- A BigInt is encountered without a custom `toJSON()` method.

## 6. Serialization Behavior
- Primitives (Boolean, Number, String) are converted to their true values.
- Special values: `undefined`, Functions, and Symbols become omitted in objects and replaced with `null` in arrays.
- Arrays only include valid contiguous indices.
- Custom `toJSON()` methods override default serialization.

## 7. Implementation Examples
### Basic Example
```js
console.log(JSON.stringify({ x: 5, y: 6 }));
// Output: '{"x":5,"y":6}'
```

### Replacer Function Example
```js
function replacer(key, value) {
  if (typeof value === 'string') return undefined;
  return value;
}

const obj = { a: 'ignore', b: 2 };
console.log(JSON.stringify(obj, replacer));
// Output: '{"b":2}'
```

### Replacer Array Example
```js
const obj = { a: 'ignore', b: 2, c: 3 };
console.log(JSON.stringify(obj, ['b', 'c']));
// Output: '{"b":2,"c":3}'
```

### Space Parameter Example
```js
console.log(JSON.stringify({ a: 2 }, null, ' '));
/* Output:
{
 "a": 2
}
*/
```

### Circular Reference Example
```js
const circular = {};
circular.myself = circular;
// JSON.stringify(circular); // Throws TypeError: cyclic object value
```

## 8. LocalStorage Usage Example
```js
const session = {
  screens: [
    { name: 'screenA', width: 450, height: 250 },
    { name: 'screenB', width: 650, height: 350 }
  ],
  state: true
};

localStorage.setItem('session', JSON.stringify(session));
const restoredSession = JSON.parse(localStorage.getItem('session'));
console.log(restoredSession);
```

## 9. Well-Formed JSON (Unicode Handling)
```js
console.log(JSON.stringify("\uD800"));
// Output: '"\\ud800"'
```


## Supplementary Details
# Supplementary Technical Specifications

- **Parameter Details:** 
  - `value`: Accepts any JavaScript type. Custom handling for Date, RegExp, and objects with a `toJSON()` method.
  - `replacer`: 
    * Function signature: `(key: string, value: any) => any`. Called initially with key `""` and the original value.
    * Array format allows selective serialization. Non-string/number elements are filtered out.
  - `space`: 
    * Number: If less than 1, no indentation is used. If greater than 10, treated as 10.
    * String: Truncated to the first 10 characters if longer.

- **Implementation Steps:** 
  1. Evaluate the provided `value` for serialization.
  2. Apply the `toJSON()` method if available.
  3. Traverse the object's enumerable own properties in stable order.
  4. Use the replacer (if provided) to filter/transform values.
  5. Format the output string with the specified white space, if applicable.
  6. Return the final JSON string, or `undefined` for un-serializable pure values.

- **Configuration Options and Effects:**
  - Using a replacer allows exclusion of properties (e.g., omitting string values).
  - The space parameter improves readability in debugging or data export scenarios.

- **Best Practices:**
  - Avoid passing circular references; use alternative methods such as `structuredClone()` for deep copies.
  - For BigInt values, define a custom `toJSON()` to handle serialization.
  - When storing in localStorage, always pair `JSON.stringify()` with `JSON.parse()` to recover the original object structure.

- **Troubleshooting:**
  - **Error:** "TypeError: cyclic object value"
    * **Command:** Inspect object for self-references using utilities like `console.dir()`.
    * **Fix:** Remove or replace the cyclic reference or use a library such as cycle.js.
  - **Error:** "TypeError: BigInt value can't be serialized in JSON"
    * **Command:** Ensure all BigInt values have a custom `toJSON()` defined: 
    ```js
    BigInt.prototype.toJSON = function() { return this.toString(); };
    ```



## Reference Details
# Complete API Specifications

## API Method: JSON.stringify()

### Signatures:

1. `JSON.stringify(value: any): string | undefined`
2. `JSON.stringify(value: any, replacer: (key: string, value: any) => any): string | undefined`
3. `JSON.stringify(value: any, replacer: (key: string, value: any) => any, space: number | string): string | undefined`
4. `JSON.stringify(value: any, replacer: Array<string | number>): string | undefined`

### Parameters Detailed:

- **value** (Any): The input value to be serialized. Acceptable types include primitives, arrays, objects, Dates, etc.
- **replacer** (Optional):
  - **Function Form:** `(key: string, value: any) => any`
    * Called recursively for each property with the current key and value.
    * The function's return value will be used as the serialized value. Returning `undefined` omits the property.
  - **Array Form:** `Array<string | number>`
    * Specifies an explicit set of properties to include in the output.
    * Non-string/number values in the array are ignored outright.
- **space** (Optional):
  - **Number:** Determines the number of spaces for indentation (clamped between 0 and 10).
  - **String:** The string (or first 10 characters thereof) to use for indentation.

### Return Value:

- Returns a `string` that is the JSON representation of the provided value.
- Returns `undefined` if the value is not serializable (e.g., `undefined`, function, or symbol as top-level values).

### Exceptions:

- **TypeError** is thrown if:
  - The value contains a circular reference.
  - A BigInt value is encountered without a custom `toJSON()` method.

## Full Code Examples

### Basic Serialization

```js
const obj = { x: 5, y: 6 };
const jsonStr = JSON.stringify(obj);
console.log(jsonStr); // Outputs: '{"x":5,"y":6}'
```

### Using a Replacer Function

```js
function replacer(key, value) {
  // Exclude all properties where the value is a string
  if (typeof value === 'string') {
    return undefined;
  }
  return value;
}

const foo = { foundation: 'Mozilla', model: 'box', week: 45, transport: 'car', month: 7 };
const result = JSON.stringify(foo, replacer);
console.log(result); // Outputs: '{"week":45,"month":7}'
```

### Using a Replacer Array

```js
const foo = { foundation: 'Mozilla', model: 'box', week: 45, transport: 'car', month: 7 };
const result = JSON.stringify(foo, ['week', 'month']);
console.log(result); // Outputs: '{"week":45,"month":7}'
```

### Using the Space Parameter for Pretty Print

```js
const pretty = JSON.stringify({ a: 2 }, null, '  ');
console.log(pretty);
/* Outputs:
{
  "a": 2
}
*/
```

### Troubleshooting Circular References

```js
const circular = {};
circular.self = circular;
try {
  JSON.stringify(circular);
} catch (err) {
  console.error(err.message); // Expected: 'cyclic object value'
}
```

### Handling BigInt Serialization

```js
BigInt.prototype.toJSON = function() {
  return this.toString();
};
const big = { num: 2n };
console.log(JSON.stringify(big)); // Outputs: '{"num":"2"}'
```

## Best Practices

- Always validate data for circular references before serialization.
- Define `toJSON()` for custom objects to control serialization output.
- Utilize the replacer parameter to exclude or transform sensitive data.
- Use the space parameter to produce human-readable JSON when debugging.

## Detailed Step-by-Step Implementation Pattern

1. **Check** the value type and if it has a `toJSON()` method; if so, invoke it.
2. **Traverse** the object property keys using `Object.keys()` ensuring a stable order.
3. **Apply** the replacer (if provided). For functions, call with `(key, value)`; for arrays, filter properties.
4. **Format** the string with no indentation if `space` is not provided or invalid; otherwise, apply the specified indentation rules.
5. **Return** the resulting JSON string or `undefined` if the value is a pure non-serializable type.

## Troubleshooting Commands

- To debug circular reference issues, run:
  ```js
  console.dir(object);
  ```
  and inspect property references.
- To verify BigInt serialization, run the provided BigInt example and check outputs.

This complete API specification can be directly used by developers to implement, customize, and troubleshoot JSON serialization in JavaScript.


## Original Source
MDN JSON.stringify Documentation
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

## Digest of JSON_STRINGIFY

# JSON.stringify() Documentation

**Retrieved on:** 2023-10-06

**Data Size:** 3553777 bytes
**Links Found:** 25569
**Attribution:** MDN contributors, MDN JSON.stringify Documentation

## Overview
The `JSON.stringify()` static method converts a JavaScript value to a JSON string. It supports optional replacer and space parameters which customize the serialization.

## Method Signatures

```
// Basic usage
JSON.stringify(value)

// With replacer function or array
JSON.stringify(value, replacer)

// With replacer and space (for indentation)
JSON.stringify(value, replacer, space)
```

## Parameters

1. **value** (Any): The value to convert to a JSON string.
2. **replacer** (Optional): Either a function `(key: string, value: any) => any` or an array of strings/numbers indicating the properties to include. 
   - If a function, it is called for every property with signature:
     ```js
     function replacer(key, value) {
       // key: property name (empty string for top-level object)
       // value: value to be serialized
       return value;
     }
     ```
   - If an array, non-string/number values (including Symbols) are ignored.
3. **space** (Optional): A string or number to control whitespace in the output.
   - If a number, it indicates the number of space characters (clamped to a maximum of 10).
   - If a string, only the first 10 characters are used for indentation.

## Return Value

Returns a `string` representing the JSON serialization of the provided value. It may return `undefined` if a pure value (like a function or `undefined`) is given.

## Exceptions

Throws a `TypeError` if:
- The `value` contains a circular reference.
- A `BigInt` value is encountered (unless a custom `toJSON()` method is provided).

## Detailed Serialization Behavior

- **Primitive Types:** Boolean, Number, String, and BigInt (via Object()) are converted to their primitive values. 
- **Symbols and Functions:** are omitted or replaced with `null` in arrays.
- **Special Values:** `Infinity`, `NaN`, and `null` are all serialized as `null` (except that they are included in arrays).
- **Arrays and Objects:** Only enumerable own string-keyed properties are visited. Properties are visited in a stable order defined by `Object.keys()`.
- **toJSON() Method:** If a value has a `toJSON()` method, that method is invoked to obtain the value for serialization.

## Implementation Examples

### Basic Example

```js
console.log(JSON.stringify({ x: 5, y: 6 }));
// Expected: '{"x":5,"y":6}'
```

### Using Replacer Function

```js
function replacer(key, value) {
  if (typeof value === 'string') return undefined;
  return value;
}

const foo = { foundation: 'Mozilla', model: 'box', week: 45, transport: 'car', month: 7 };
console.log(JSON.stringify(foo, replacer));
// Expected: '{"week":45,"month":7}'
```

### Using Replacer Array

```js
const foo = { foundation: 'Mozilla', model: 'box', week: 45, transport: 'car', month: 7 };
console.log(JSON.stringify(foo, ['week', 'month']));
// Expected: '{"week":45,"month":7}'
```

### Using Space Parameter

```js
console.log(JSON.stringify({ a: 2 }, null, ' '));
/* Expected:
{
 "a": 2
}
*/
```

### Handling Circular References

```js
const circularReference = {};
circularReference.myself = circularReference;
// JSON.stringify(circularReference); // Throws TypeError: cyclic object value
```

## Additional Usage Patterns

### LocalStorage Example

```js
const session = {
  screens: [
    { name: 'screenA', width: 450, height: 250 },
    { name: 'screenB', width: 650, height: 350 },
    { name: 'screenC', width: 750, height: 120 }
  ],
  state: true
};

localStorage.setItem('session', JSON.stringify(session));
const restoredSession = JSON.parse(localStorage.getItem('session'));
console.log(restoredSession);
```

## Well-Formed JSON.stringify()

Engines that implement the well-formed specification represent lone surrogates using Unicode escape sequences:

```js
JSON.stringify("\uD800"); // Expected: '"\\ud800"'
```


## Attribution
- Source: MDN JSON.stringify Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
- License: CC BY-SA 2.5
- Crawl Date: 2025-04-17T16:27:18.328Z
- Data Size: 3553777 bytes
- Links Found: 25569

## Retrieved
2025-04-17
