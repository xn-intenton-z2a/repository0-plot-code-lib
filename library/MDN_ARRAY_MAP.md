Normalised extract
Array.prototype.map creates a new array populated with the results of calling a provided function on every element in the calling array.

Table of contents
- Normalised extract
- Detailed implementation info
- Supplementary details
- Reference API signatures
- Detailed digest
- Attribution

Detailed implementation info
Signature: arr.map(callbackFn, thisArg?)
- Executes callbackFn once for each array element in order.
- Does not mutate the original array (but callback may mutate referenced objects).
- Sparse arrays: map skips holes but preserves length in resulting array (holes remain holes unless mapFn returns a value for that index).

Example
const result = [1,2,3].map(x => x*2); // [2,4,6]

Supplementary details
- Complexity: O(n) time; new array of same length.
- Use typed arrays with caution; mapping to different types may require conversions.

Reference API signatures
- Array.prototype.map<T, U>(this: T[], callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[]

Detailed digest
- Retrieved: 2026-03-21T10:11:58.557Z
- Data size (approx): 2.8 KB

Attribution
Source: MDN Web Docs - Array.prototype.map documentation.