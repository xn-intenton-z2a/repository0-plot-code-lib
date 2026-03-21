DATE_PARSE

Normalised extract

Table of contents
1. Signature
2. Accepted input formats and semantics
3. Return values and time zone rules
4. Portability and best practices
5. Usage notes for CSV time column parsing

1. Signature
Date.parse(string) -> number | NaN
Returns the time value (ms since 1970-01-01T00:00:00Z) for a date string.

2. Accepted input formats and semantics
- ECMAScript recognises a simplified subset of ISO 8601 date-time strings for consistent parsing across engines. The recommended format is the ISO 8601 complete date and time form: YYYY-MM-DDTHH:mm:ss.sssZ (Z for UTC or an offset like +HH:MM).
- For strings that match the ES ISO format, parsing is deterministic and returns the corresponding UTC epoch milliseconds.
- For non-ISO formats, parsing may be implementation-dependent and vary between environments; results can differ across browsers and Node versions.

3. Return values and time zone rules
- If the string represents a valid date/time, returns the number of milliseconds since the epoch (UTC).
- If the string is invalid or cannot be parsed, returns NaN.
- When the input omits time zone information, engines may interpret the date-time in local time or apply other heuristics; therefore always include an explicit time zone (Z or ±HH:MM) for portability.

4. Portability and best practices
- Use ISO 8601 format (with explicit timezone) in CSV files to ensure consistent parsing with Date.parse.
- For custom or legacy date formats, parse with a deterministic parser (manual parsing, regex, or a lightweight parser) rather than relying on Date.parse.
- Prefer Date.prototype.toISOString() for output and require ISO input when exchanging data.

5. Usage notes for CSV time column parsing
- When loading CSV files with a time column, prefer to validate each token as an ISO 8601 string and then call Date.parse(token) or new Date(token).getTime() and check Number.isFinite(...) on the result.
- If times are provided as UNIX timestamps (seconds or milliseconds), detect numeric tokens and convert appropriately (e.g., multiply seconds by 1000 for ms).

Supplementary details
- Equivalence: Date.parse(string) is equivalent to calling new Date(string).getTime() for most inputs.
- Edge cases: Date.parse('2012-12-12') is interpreted as midnight UTC or local time depending on the exact string and engine — include time and timezone for reliability.

Reference details
- Method signature: Date.parse(string) -> number | NaN
- Parameter: string — ToString coercion applied; non-string inputs are coerced before parse.
- Return: integer ms since epoch, or NaN on failure.
- Recommended input: ISO 8601 string: 2020-12-31T23:59:59.000Z

Detailed digest
- Source: MDN: Date.parse() (retrieved 2026-03-21)
- Crawl size: 165.5 KB (HTML response saved during fetch)
- Extracted facts: deterministic ISO 8601 parsing recommended, Date.parse returns epoch ms or NaN, avoid non-ISO formats for portability.

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
- Retrieved: 2026-03-21
- Data size (fetched): 165.5 KB
