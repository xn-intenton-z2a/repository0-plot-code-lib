Normalised extract
Array.from creates a new Array instance from an array-like or iterable object. It optionally accepts a map function and an thisArg.

Table of contents
- Normalised extract
- Detailed implementation info
- Supplementary details
- Reference API signatures
- Detailed digest
- Attribution

Detailed implementation info
Signature: Array.from(arrayLike, mapFn?, thisArg?)
- Accepts array-like objects (with length) and iterables (Symbol.iterator).
- If mapFn provided, applies mapFn to each item before inserting into the new Array.
- Preserves insertion order for iterables; constructs a new dense array of length equal to the source's length.

Polyfill notes
- Implementation iterates using either indexed access for array-like or the iterator protocol for iterables. Map function is called with (element, index).

Supplementary details
- Use cases: converting NodeList, arguments, or other iterables to arrays for array methods.
- Complexity: O(n) time, O(n) additional memory for returned array.

Reference API signatures
- Array.from<T, U = T>(arrayLike: Iterable<T> | ArrayLike<T>, mapFn?: (v: T, k: number) => U, thisArg?: any): U[]

Detailed digest
- Retrieved: 2026-03-21T10:11:58.557Z
- Data size (approx): 3.0 KB

Attribution
Source: MDN Web Docs - Array.from documentation.