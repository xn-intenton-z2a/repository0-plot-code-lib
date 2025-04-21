# REGEX_GUIDE

## Crawl Summary
The technical details cover JavaScript regular expressions: creation via literal and constructor, writing patterns with simple and special characters, escaping rules, usage of capturing groups, detailed method signatures for exec(), test(), match(), matchAll(), replace(), split(), and the behavior of each. It also documents regex flags (d, g, i, m, s, u, v, y) with examples and provides a full code example for phone number validation along with configuration details.

## Normalised Extract
# Table of Contents

1. Creating a Regular Expression
2. Writing a Regular Expression Pattern
3. Special Characters and Escaping
4. Capturing Groups and Parentheses
5. Regular Expression Methods and Signatures
6. Regex Flags and Their Effects
7. Phone Number Validation Example
8. Tools and Resources

---

## 1. Creating a Regular Expression

- **Literal**: `const re = /ab+c/;`
- **Constructor**: `const re = new RegExp("ab+c");`

## 2. Writing a Regular Expression Pattern

- Simple: `/abc/` matches "abc"
- Complex: `/ab*c/` matches 'a' followed by 0+ 'b's then 'c'
- Example with Group: `/Chapter (\d+)\.\d*/`

## 3. Special Characters and Escaping

- Use backslash to escape special characters. Example:
  - To match `a*b`: `/a\*b/` or `new RegExp("a\\*b")`
  - For literal slash: `/\/example\/[a-z]+/i`
  - For a backslash: `/[A-Z]:\\/`

## 4. Capturing Groups and Parentheses

- Parentheses capture submatches:

```js
const myRe = /d(b+)d/g;
const myArray = myRe.exec("cdbbdbsbz");
// Returns: ['dbbd', 'bb', index: 1, input: 'cdbbdbsbz']
```

## 5. Regular Expression Methods and Signatures

- `exec(str: string): RegExpExecArray | null`
- `test(str: string): boolean`
- `match(regexp: RegExp): (string[] | null)`
- `matchAll(regexp: RegExp): IterableIterator<RegExpExecArray>`
- `search(regexp: RegExp): number`
- `replace(searchValue, replaceValue): string`
- `split(separator: RegExp | string, limit?: number): string[]`

## 6. Regex Flags and Their Effects

| Flag | Description | Property |
|------|-------------|----------|
| d    | Generate indices | hasIndices |
| g    | Global search | global |
| i    | Case-insensitive | ignoreCase |
| m    | Multiline (^ and $ for each line) | multiline |
| s    | Dot matches newline | dotAll |
| u    | Unicode mode | unicode |
| v    | Enhanced Unicode | unicodeSets |
| y    | Sticky search | sticky |

Example: `const re = /pattern/gi;`

## 7. Phone Number Validation Example

### HTML

```html
<p>
  Enter your phone number (with area code) and then click "Check".
  <br />
  Format: ###-###-####
</p>
<form id="form">
  <input id="phone" />
  <button type="submit">Check</button>
</form>
<p id="output"></p>
```

### JavaScript

```js
const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const output = document.querySelector("#output");

// Regex breakdown:
// ^ : Start of line
// (?:\d{3}|\(\d{3}\)) : Three digits or (three digits)
// ([-/.]) : Separator captured
// \d{3} : Three digits
// \1 : Same separator
// \d{4} : Four digits
// $ : End of line
const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;

function testInfo(phoneInput) {
  const ok = re.exec(phoneInput.value);
  output.textContent = ok
    ? `Thanks, your phone number is ${ok[0]}`
    : `${phoneInput.value} isn't a phone number with area code!`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  testInfo(input);
});
```

## 8. Tools and Resources

- RegExr
- Regex Tester
- Regex Interactive Tutorial
- Regex Visualizer


## Supplementary Details
### Technical Specifications and Implementation Details

1. **Creation Methods**:
   - **Literal Notation**: Automatically compiled on script load. Best when regex is constant.
   - **Constructor Function**: Allows dynamic regex creation. Ensure proper escaping in string literals (e.g., `\\` for a literal backslash).

2. **Flags Configuration**:
   - Default flag settings are off unless specified in the regex literal or constructor.
   - Flags are immutable once the RegExp object is created.
   - Example: `/\w+ /g` vs. `new RegExp("\\w+ ", "g")`

3. **Pattern Writing**:
   - Use parentheses `()` to group parts of the expression and capture submatches.
   - Use non-capturing groups `(?:...)` when the match need not be stored.
   - For matching literal characters that are normally special, always precede with a backslash.

4. **Implementation Steps for Validation**:
   - Define HTML input and output elements.
   - Create a RegExp object with precise control over expected patterns and flags.
   - Attach event listeners to the form to process input on submission and use `exec()` for match retrieval.
   - Use the captured match (if any) for processing (e.g., display the validated number).

5. **Troubleshooting**:
   - Use `console.log()` to output the result of `exec()` for debugging.
   - Verify flag usage: Global (`g`) flag may affect the `lastIndex` of the RegExp object.
   - Ensure proper escaping of special characters especially when using the RegExp constructor.
   - Use online tools like RegExr to visually test patterns and isolate issues.

6. **Best Practices**:
   - Always assign regex literals to variables if you plan to inspect properties like `lastIndex`.
   - Avoid creating multiple instances of regex patterns unnecessarily, as properties may differ between instances.
   - Use the appropriate method (`exec`, `test`, `match`) based on whether you require detailed match info or simple boolean checks.


## Reference Details
### Complete API Specifications and Code Examples

1. **RegExp Object Creation**
   - **Literal Notation**:
     - Syntax: `/pattern/flags`
     - Example: `const re = /ab+c/;`
     - Behavior: Compiled at load time, faster if constant.

   - **Constructor Function**:
     - Syntax: `new RegExp(pattern: string, flags?: string)`
     - Example: `const re = new RegExp("ab+c", "g");`
     - Note: Remember to escape backslashes (e.g., "\\d" for digit).

2. **RegExp Methods**

   - **exec()**:
     - Signature: `exec(str: string): RegExpExecArray | null`
     - Returns: An array containing the full match, captured groups, and additional properties (`index` and `input`), or `null` if no match.
     - Example:
       ```js
       const myRe = /d(b+)d/g;
       const myArray = myRe.exec("cdbbdbsbz");
       // Output: ['dbbd', 'bb', index: 1, input: 'cdbbdbsbz']
       ```

   - **test()**:
     - Signature: `test(str: string): boolean`
     - Returns: `true` if there is a match, otherwise `false`.
     - Example:
       ```js
       const re = /abc/;
       console.log(re.test("abcdef")); // true
       ```

   - **match()**:
     - Signature: `match(regexp: RegExp): string[] | null`
     - Returns: An array of matches or `null` if no match is found.
     - Example:
       ```js
       const str = "fee fi fo fum";
       console.log(str.match(/\w+ /g)); // ['fee ', 'fi ', 'fo ']
       ```

   - **matchAll()**:
     - Signature: `matchAll(regexp: RegExp): IterableIterator<RegExpExecArray>`
     - Returns: An iterator for all matches, including capturing groups.

   - **search()**:
     - Signature: `search(regexp: RegExp): number`
     - Returns: The index of the first match, or `-1` if not found.

   - **replace() / replaceAll()**:
     - Signature: `replace(searchValue: string | RegExp, replaceValue: string | ((...args: any[]) => string)): string`
     - Use: To replace found patterns with a replacement string or function result.

   - **split()**:
     - Signature: `split(separator: RegExp | string, limit?: number): string[]`
     - Use: To divide a string into an array based on the separator.

3. **Flags and Options**

   - **Flags**: 'g', 'i', 'm', 's', 'u', 'y', 'd', 'v'
   - **Example**:
     ```js
     const re = /pattern/gi; // Global, case-insensitive
     ```
   - **Effects**:
     - `g`: Searches entire string, affects `lastIndex` property in iterative methods.
     - `i`: Case-insensitive matching.
     - `m`: `^` and `$` match start/end of any line in a multiline string.
     - `s`: Dot (`.`) matches newline characters.
     - `u`: Treat pattern as a sequence of Unicode code points.
     - `y`: Sticky match starting exactly at `lastIndex`.

4. **Detailed Troubleshooting Procedures**

   - **Debugging `lastIndex` Issues**:
     - When using `/pattern/g`, log `re.lastIndex` to see where the next match will start.
     - Example:
       ```js
       const re = /d(b+)d/g;
       let match;
       while((match = re.exec("cdbbdbsbz")) !== null) {
         console.log(`Found match at index ${match.index} with lastIndex ${re.lastIndex}`);
       }
       ```

   - **Escaping Problems**:
     - If a regex literal is terminated prematurely, check for unescaped `/` characters.
     - For constructor usage, double escape: `new RegExp("\\d{3}")` for `\d{3}`.

   - **Validation Test Cases**:
     - Use test strings to ensure patterns match exactly:
       ```js
       // Phone number example
       const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;
       console.log(re.test("123-456-7890")); // true
       console.log(re.test("(123)456-7890")); // true
       console.log(re.test("1234567890")); // false
       ```

5. **Concrete Best Practices**

   - Always define regex variables to reuse and inspect properties.
   - Use non-capturing groups when you do not need to retain match data.
   - Validate input using the most appropriate method (`test` for boolean results, `exec` for detailed matches).
   - Utilize online regex testers for rapid prototyping and debugging before deployment.

This comprehensive specification provides developers with all the necessary details to implement and troubleshoot JavaScript regular expressions directly in their projects.

## Original Source
MDN Regular Expressions
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

## Digest of REGEX_GUIDE

# REGEX GUIDE DOCUMENT

**Retrieved on:** 2023-10-08

# 1. Creating a Regular Expression

There are two distinct methods to create a regular expression in JavaScript:

- **Literal Notation**: Compiled at script load time. Example:

```js
const re = /ab+c/;
```

- **Constructor Notation**: Compiled at runtime. Example:

```js
const re = new RegExp("ab+c");
```

# 2. Writing a Regular Expression Pattern

Patterns combine simple characters and special characters:

- **Simple Pattern**: `/abc/` matches the substring "abc" exactly.
- **Complex Pattern**: `/ab*c/` matches an 'a' followed by zero or more 'b's then a 'c'.
- **Example with Groups**: `/Chapter (\d+)\.\d*/` uses parentheses to capture digits.

# 3. Special Characters and Escaping

- **Special Characters**: Characters like `*`, `.`, `?`, `+` have special meanings.
- **Escaping**: Use a backslash to treat special characters as literals. Examples:
  - Matching `a*b`:
    - Literal: `/a\*b/`
    - Constructor: `new RegExp("a\\*b")`
  - Matching a literal slash `/` in a pattern: `/\/example\/[a-z]+/i`
  - Matching a literal backslash: `/[A-Z]:\\/`

# 4. Parentheses and Capturing Groups

Parentheses () not only group sub-patterns but also capture parts of the match for later use.

Example:

```js
const myRe = /d(b+)d/g;
const myArray = myRe.exec("cdbbdbsbz");
// myArray => ['dbbd', 'bb', index: 1, input: 'cdbbdbsbz']
```

# 5. RegExp Methods and Their Behaviors

**Method Signatures and Descriptions:**

- **exec()**: Searches for a match in a string.
  - **Signature**: `RegExp.prototype.exec(str: string): RegExpExecArray | null`
  - **Example**:
    ```js
    const myRe = /d(b+)d/g;
    const myArray = myRe.exec("cdbbdbsbz");
    ```

- **test()**: Tests for a match, returns boolean.
  - **Signature**: `RegExp.prototype.test(str: string): boolean`

- **match()**: Returns an array containing all matches or null.
  - **Signature**: `String.prototype.match(regexp: RegExp): (string | null)[] | null`

- **matchAll()**: Returns an iterator over all matches.
  - **Signature**: `String.prototype.matchAll(regexp: RegExp): IterableIterator<RegExpExecArray>`

- **search()**: Returns the index where the match is found or -1.
  - **Signature**: `String.prototype.search(regexp: RegExp): number`

- **replace() / replaceAll()**: Replace matched substring(s) with a replacement string.
  - **Signature**: `String.prototype.replace(regexp: RegExp|string, newSubStr: string|((...args: any[]) => string)): string`

- **split()**: Splits a string by a regular expression or fixed string.
  - **Signature**: `String.prototype.split(separator: RegExp|string, limit?: number): string[]`

# 6. Flags and Their Descriptions

Flags modify regex behavior. They are included as part of the regex literal or constructor:

| Flag | Description | Property |
|------|-------------|----------|
| d    | Generate indices for substring matches | hasIndices |
| g    | Global search | global |
| i    | Case-insensitive search | ignoreCase |
| m    | Multiline search (each line treated separately for ^ and $) | multiline |
| s    | Allows . to match newline characters | dotAll |
| u    | Unicode; treat pattern as Unicode code points | unicode |
| v    | UnicodeSets upgrade | unicodeSets |
| y    | Sticky search; match starting at current position | sticky |

Example using flags:

```js
const re = /pattern/gi;
// or
const re = new RegExp("pattern", "gi");
```

# 7. Code Example: Phone Number Validation

**HTML:**

```html
<p>
  Enter your phone number (with area code) and then click "Check".
  <br />
  The expected format is like ###-###-####.
</p>
<form id="form">
  <input id="phone" />
  <button type="submit">Check</button>
</form>
<p id="output"></p>
```

**JavaScript:**

```js
const form = document.querySelector("#form");
const input = document.querySelector("#phone");
const output = document.querySelector("#output");

// The regular expression:
// ^ asserts start of line
// (?:\d{3}|\(\d{3}\)) matches 3 digits or (3 digits) WITHOUT capturing
// ([-/.]) capturing group for dash, slash, or dot
// \d{3} matches 3 digits
// \1 matches the same separator as captured
// \d{4} matches four digits
// $ asserts end of line
const re = /^(?:\d{3}|\(\d{3}\))([-/.])\d{3}\1\d{4}$/;

function testInfo(phoneInput) {
  const ok = re.exec(phoneInput.value);
  output.textContent = ok
    ? `Thanks, your phone number is ${ok[0]}`
    : `${phoneInput.value} isn't a phone number with area code!`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  testInfo(input);
});
```

# 8. Additional Tools & Resources

- **RegExr**: Online tool for building and testing regex patterns.
- **Regex Tester**: Live testing and debugging of regex patterns.

# Attribution

Content extracted from MDN Regular Expressions guide.
Data Size: 3606244 bytes, Links: 36114


## Attribution
- Source: MDN Regular Expressions
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
- License: CC BY-SA 2.5
- Crawl Date: 2025-04-21T03:54:28.902Z
- Data Size: 3606244 bytes
- Links Found: 36114

## Retrieved
2025-04-21
