Normalised extract
Number.isInteger(value) returns true if value is a number and an integer (no fractional part), false otherwise. It does not coerce types.

Table of contents
- Normalised extract
- Detailed implementation info
- Supplementary details
- Reference API signatures
- Detailed digest
- Attribution

Detailed implementation info
Behavior: returns true only for values of type 'number' that are finite and whose mathematical value is an integer. Implementation typically checks typeof value === 'number' && isFinite(value) && Math.floor(value) === value.

Edge behavior:
- Number.isInteger(1) -> true
- Number.isInteger(1.0) -> true
- Number.isInteger(1.1) -> false
- Number.isInteger(NaN) -> false
- Number.isInteger(Infinity) -> false

Supplementary details
- Unlike global isFinite or parseInt, Number.isInteger does not coerce non-number types.
- Polyfill: Number.isInteger = value => typeof value === 'number' && isFinite(value) && Math.floor(value) === value;

Reference API signatures
- Number.isInteger(value: any): boolean

Detailed digest
- Retrieved: 2026-03-21T10:11:58.557Z
- Data size (approx): 2.2 KB

Attribution
Source: MDN Web Docs (public-facing documentation for JavaScript standard built-ins).