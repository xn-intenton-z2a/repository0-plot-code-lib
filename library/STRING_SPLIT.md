NORMALISED EXTRACT

Table of Contents
1. Purpose and signature
2. Parameters and return value
3. Separator behavior (string vs RegExp)
4. Limit semantics and edge cases
5. Interaction with capturing groups in RegExp separators
6. Implementation notes for CSV and range parsing

1. Purpose and signature
- String.prototype.split(separator, limit) -> Array
  - Splits a string into an array of substrings using separator as the delimiter.

2. Parameters and return value
- separator: optional; may be a String or a RegExp. If omitted or undefined, the result is an array containing the original string.
- limit: optional integer; maximum number of substrings to include in the returned array. If limit is 0, an empty array is returned.
- Return: Array of substrings (zero or more), with a length no greater than limit if limit is supplied.

3. Separator behavior
- When separator is a non-empty string, occurrences of the exact substring are used as cut points (not a pattern); consecutive separators produce empty-string elements between them.
- When separator is the empty string (''), split returns an array of the string's UTF-16 code units (effectively its characters) subject to the limit.
- When separator is a RegExp, the RegExp is applied to the string and splitting occurs at matched ranges.

4. Limit semantics and edge cases
- If limit is provided and is not undefined, it is converted to an unsigned 32-bit integer and the returned array will contain at most limit elements.
- limit = 0 returns [] (empty array).
- If separator is undefined, result is [originalString]. If separator is null, it is coerced to the string 'null' and used as a string separator.

5. Capturing groups in RegExp separators
- If the separator is a RegExp that contains capturing parentheses, the text matched by the capturing groups is included in the result array interleaved with the substrings. That is, capturing group matches are inserted into the array after each split.

6. Implementation notes for CSV and range parsing
- For simple CSV loader adhering to RFC4180, prefer using a CSV parser library; however for simple lines with single-value time series (time,value) where values do not contain unescaped separators, split(',') is a minimal approach.
- For parsing numeric range format start:step:end, use split(':') to obtain three fields then parse them with Number.parseFloat and validate that step is non-zero and that the direction of step matches start/end relationship.

SUPPLEMENTARY DETAILS
- Unicode and surrogate pairs: splitting by '' yields UTF-16 code units which may split surrogate pairs; for true Unicode-aware splitting into user-perceived characters, use Intl.Segmenter or Array.from(str).

REFERENCE DETAILS (exact signatures and behaviors)
- String.prototype.split(separator, limit) -> Array
  - separator: String or RegExp or undefined
  - limit: Integer (converted to UInt32)
  - Returns an Array of substrings; capturing groups in RegExp separators are included in the result array.

DETAILED DIGEST
- Source: MDN String.prototype.split documentation
- Retrieved: 2026-03-20
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split
- Bytes fetched: 178382

ATTRIBUTION
- Content extracted and condensed from MDN documentation for String.prototype.split (see source URL). The above captures exact parameter semantics, behavior differences between string and RegExp separators, and practical guidance for CSV/range parsing.