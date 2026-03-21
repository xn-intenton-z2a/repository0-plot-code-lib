NORMALISED EXTRACT

API signature
- Array.from(arrayLike, mapFn?, thisArg?) -> Array
  - Parameters:
    - arrayLike: iterable or object with length property
    - mapFn (optional): function called as mapFn(element, index)
    - thisArg (optional): value used as 'this' when executing mapFn
  - Returns: a new Array instance

Table of contents
- Creating integer ranges
- mapFn behaviour
- Edge cases and array-like handling

Detailed information
Creating sequences 1..n
- Pattern: Array.from({ length: n }, (_, i) => i + 1) produces an Array of length n with values 1..n.
- When using an object with only a length property, elements are undefined before mapFn but indices are provided to mapFn.

mapFn behaviour
- mapFn receives two arguments: currentValue and index. For array-like objects without real values, currentValue will usually be undefined and index is the numeric index.
- mapFn is executed in order from index 0 to length-1.

REFERENCE DETAILS (exact signatures)
- Function: Array.from(arrayLike: Iterable|ArrayLike, mapFn?: (v, i) => any, thisArg?: any) -> Array<any>

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
- Retrieved: 2026-03-21
- Data size obtained during crawl (trimmed capture): 20000 bytes
- Extract (first fragment of retrieved HTML):

      <!doctype html>
      <html
        lang="en-US"
        data-theme="light dark"
        data-renderer="Doc"

ATTRIBUTION
- MDN Web Docs: Array.from() reference. Content trimmed for digest.
