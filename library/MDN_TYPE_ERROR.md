Normalised extract
TypeError is a built-in Error thrown when an operation is performed on a value of an unexpected type, e.g., calling a non-function or accessing properties of undefined.

Table of contents
- Normalised extract
- Detailed implementation info
- Supplementary details
- Reference API signatures
- Detailed digest
- Attribution

Detailed implementation info
Construction: new TypeError([message])
Common causes:
- Calling undefined as a function
- Applying methods to values of incompatible type

Behavior
- Inherit from Error; detecting via instanceof TypeError. Include clear messages to aid debugging and avoid leaking implementation details in production.

Supplementary details
- Use TypeError when type contract is violated; prefer early validation and descriptive messages.

Reference API signatures
- TypeError(message?: string)

Detailed digest
- Retrieved: 2026-03-21T10:11:58.557Z
- Data size (approx): 1.5 KB

Attribution
Source: MDN Web Docs - TypeError documentation.