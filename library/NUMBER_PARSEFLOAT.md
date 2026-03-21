NUMBER_PARSEFLOAT

Normalised extract

Table of contents
1. Signature
2. Parsing algorithm (step-by-step)
3. Return values and edge cases
4. Differences vs parseInt and global parseFloat
5. Usage notes for CSV and range parsing

1. Signature
Number.parseFloat(string) -> number | NaN
Equivalent to the global parseFloat function; accepts a single argument coerced to string.

2. Parsing algorithm (step-by-step)
- Coerce the argument to a string.
- Discard leading whitespace characters (Unicode whitespace as per ECMAScript).
- Parse an optional sign (+ or -).
- Parse a sequence consisting of digits and an optional decimal point, or a decimal point followed by digits. Parsing accepts exponent notation using an 'e' or 'E' followed by an optional sign and decimal digits.
- Parsing stops at the first character that cannot be part of a floating-point literal. Any characters after the parsed prefix are ignored.
- If the parsed prefix is empty or not a valid number literal, the result is NaN.
- Recognises the string literal "Infinity" (case-sensitive) returning Infinity/-Infinity when an optional sign is present.

3. Return values and edge cases
- Returns a Number value parsed from the initial portion of the string, or NaN if no such numeric prefix exists.
- parseFloat('') => NaN, parseFloat('   ') => NaN
- parseFloat('10.5abc') => 10.5 (trailing chars ignored)
- parseFloat('0x10') => 0 (historical behavior: leading 0x parsed as 0 in some engines) — prefer explicit conversion for hex.
- parseFloat('Infinity') => Infinity
- parseFloat('NaN') => NaN

4. Differences vs parseInt and global parseFloat
- parseFloat parses decimal floating-point literals and exponent notation; parseInt parses integers and accepts a radix (base) or infers it for legacy strings.
- parseInt can truncate at non-digit characters and may interpret '0x' as hex when radix isn't provided. parseFloat does not parse hex notation as a floating literal.
- Number.parseFloat is the ES2015 property that references the same function as the global parseFloat.

5. Usage notes for CSV and range parsing
- For parsing numeric components in CSV or range strings, use Number.parseFloat(token) and then validate with Number.isFinite(result) or Number.isNaN(result) to reject invalid numeric fields.
- Trim tokens and explicitly check for empty strings before parsing to avoid silent NaN propagation.
- Prefer explicit validation (e.g. regex for numeric literal) when strict formats are required.

Supplementary details
- ECMAScript: Number.parseFloat references the same algorithm as the global parseFloat. Rely on standardized Unicode whitespace trimming and the ECMAScript lexical grammar for numeric literals when available.
- Implementation note: do not use Number() for partial parsing — Number('10px') returns NaN, whereas parseFloat('10px') returns 10.

Reference details
- Exact method signature: Number.parseFloat(string) -> number | NaN
- Parameters: string (any, will be ToString coercion per ECMAScript)
- Return: primitive Number. NaN indicates no leading numeric portion.
- Safe checks: if (!Number.isFinite(v)) handle as parse failure.

Detailed digest
- Source: MDN: Number.parseFloat() (retrieved 2026-03-21)
- Crawl size: 153.6 KB (HTML response saved during fetch)
- Extracted facts: parsing steps, accepted tokens (digits, decimal point, exponent), handling of leading whitespace, stopping on first invalid char, return NaN for no numeric prefix, equivalence to global parseFloat.

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseFloat
- Retrieved: 2026-03-21
- Data size (fetched): 153.6 KB
