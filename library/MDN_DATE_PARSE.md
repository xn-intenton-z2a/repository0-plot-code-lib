MDN_DATE_PARSE

Table of contents
- Function signature and return type
- Supported input formats and ECMAScript notes
- Time zone and local vs UTC parsing rules
- Return values and error handling (NaN)
- Implementation notes for CSV time column handling
- Reference details
- Detailed digest and retrieval metadata
- Attribution

Normalised extract (key technical points)
- Date.parse(string) parses a string representation of a date and returns the number of milliseconds since 1970-01-01T00:00:00Z, or NaN if the string is unrecognised.
- ECMAScript specifies a simplified ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ) as reliably parsed; other locale-specific or implementation-dependent formats are not guaranteed.
- If the input string contains a time zone designator or trailing Z, it is parsed as UTC; if no timezone is present, parsing may be treated as local time depending on the form and host implementation.
- For robust CSV time parsing prefer ISO 8601 timestamps; fallback strategies include explicit Date.parse on the value and checking for NaN, or using Date.UTC for numeric components.

Supplementary details
- Date.parse accepts full date-time strings and returns an integer epoch milliseconds value; use Number.isNaN(result) to detect parse failures.
- For high-quality parsing of non-ISO formats, normalise input (e.g., replace space separators with 'T', ensure timezone present) before calling Date.parse.
- Remember that Date objects have precision to milliseconds; for sub-millisecond data special handling is required.

Reference details
- Signature: Date.parse(dateString: string): number
- Return: integer number of milliseconds since epoch, or NaN on invalid string

Concrete best practices
- Expect and prefer ISO 8601 timestamps in the CSV time column, e.g. 2023-01-02T15:04:05Z, so that Date.parse yields a deterministic UTC epoch.
- After parsing, use new Date(ms) to produce a Date object if needed for formatting or timezone conversion.
- Validate parsed values: const t = Date.parse(s); if (Number.isNaN(t)) handle as parse error or attempt additional parsing strategies.

Detailed digest (content retrieved)
Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
Retrieved: 2026-03-21
Downloaded bytes: 164432
Extract: MDN documents Date.parse's behaviour, recommended ISO 8601 input forms, differences in host parsing for non-ISO formats, and the return of milliseconds or NaN.

Attribution
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
- Data size (bytes) fetched during crawl: 164432
