ARRAY_FROM

Table of contents
- Syntax
- Parameters
- Behaviour (iterable vs array-like)
- Map function semantics and thisArg
- Return value and constructor/subclass behavior
- Edge cases and TypeErrors
- Examples
- Supplementary details
- Reference details (exact signatures and types)
- Detailed digest and attribution

Normalised extract
Syntax
Array.from(arrayLike, mapFn, thisArg)

Parameters
- arrayLike: an iterable object or an array-like object with a numeric length property (ToLength(length)).
- mapFn (optional): If provided, must be a callable function invoked for each element as mapFn(element, index). If mapFn is not callable, a TypeError is thrown.
- thisArg (optional): Value used as this when calling mapFn.

Behaviour
- If arrayLike is an object that implements the iterable protocol (has a Symbol.iterator), Array.from obtains an iterator and iterates, calling the iterator to produce values which are inserted into the new array in iteration order.
- If arrayLike is not iterable but has a numeric length property, Array.from will read properties 0..length-1 (using ToLength on the length property) and copy or convert each property to array elements.
- If the calling context is a constructor (Array.from called as C.from where C is a constructor), the created object will be an instance of C with length set to the number of elements; otherwise a plain Array is returned.

Map function semantics
- mapFn is applied to each produced element before storage in the result array. It receives two arguments: the element value and the zero-based index.
- mapFn is called with thisArg as this if thisArg is provided; otherwise undefined in strict mode.
- Errors thrown by mapFn propagate to the caller and abort creation; partially created arrays are not returned.

Return value
- A new Array (or instance of the calling constructor) whose elements are the results of iterating arrayLike and, if provided, transforming each element with mapFn.

Edge cases
- If arrayLike is null or undefined, TypeError is thrown when trying to convert to object/iterator.
- Length coercion: non-integer length is converted via ToLength; very large lengths may throw or result in memory exhaustion.
- Sparse sources: when using an array-like object with missing indices, Array.from will set result elements according to the presence of properties; it does not preserve holes in the same way as other array methods.

Examples (inline, no code fences)
- Creating an array from a string: Array.from('abc') produces ['a','b','c'].
- Using mapFn: Array.from([1,2,3], x => x * 2) produces [2,4,6].
- Generating a range: Array.from({ length: 5 }, (_, i) => i) produces [0,1,2,3,4].

Supplementary details
- Performance: For large iterable sources prefer iterators and streaming processing where possible; Array.from will allocate a contiguous array of the resulting size.
- Typed arrays: When arrayLike is a typed array, Array.from copies values and returns a plain Array unless called on a typed array constructor.
- Subclassing: When called on a subclass of Array (MyArray.from), the species/constructor path is used and the result is an instance of the subclass.
- Polyfill: Implementation follows ECMAScript specification algorithm: determine iterator or array-like path, construct result array with right length, iterate/copy values, apply mapFn if present, set length and return.

Reference details (exact signatures and types)
- Signature: Array.from(arrayLike: Iterable|ArrayLike, mapFn?: Function, thisArg?: any) -> Array or instance of calling constructor
- Parameters types: arrayLike is any value; if iterable, it must implement Symbol.iterator; mapFn, if provided, must be callable (Function). thisArg is optional and may be any value.
- Throws: TypeError if mapFn is provided but not callable; TypeError if arrayLike is null or undefined when required to access properties/iterator.
- Return: A new Array (or constructed instance) containing the mapped/copied elements.

Detailed digest
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
- Retrieved: 2026-03-20
- Crawl data size: 171641 bytes (HTML content saved during fetch)
- Extract: Extracted syntax, parameter semantics, iterator vs array-like behavior, mapFn invocation order, subclassing behavior, and common usage patterns from the MDN reference page.

Attribution
Content derived from MDN Web Docs: Array.from() reference (https://developer.mozilla.org/). Retrieved 2026-03-20. HTML snapshot size 171,641 bytes obtained via curl.
