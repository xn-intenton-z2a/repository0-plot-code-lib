Normalised extract
RangeError is a built-in Error subclass thrown when a numeric value is outside an allowable range, e.g., invalid array length or numeric parameter out of range.

Table of contents
- Normalised extract
- Detailed implementation info
- Supplementary details
- Reference API signatures
- Detailed digest
- Attribution

Detailed implementation info
Construction: new RangeError([message])
Common causes:
- Setting array length to negative or non-integer values
- Passing out-of-range numeric arguments to APIs

Behavior
- Instances inherit from Error; stack and message available. Use instanceof RangeError to detect this error type.

Supplementary details
- Best practice: validate inputs and throw RangeError for out-of-range numeric parameters to match native expectations.

Reference API signatures
- RangeError(message?: string)

Detailed digest
- Retrieved: 2026-03-21T10:11:58.557Z
- Data size (approx): 1.4 KB

Attribution
Source: MDN Web Docs - RangeError documentation.