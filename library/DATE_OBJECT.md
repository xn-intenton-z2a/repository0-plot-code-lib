DATE_OBJECT

Normalized extract (key technical points)

Table of Contents
- Constructor and factory forms
- Static methods and semantics
- Instance getters and setters (local and UTC)
- ISO 8601 parsing behaviour and recommendations
- Numeric epoch handling and units
- CSV parsing guidance for "time" column
- Edge cases, portability and troubleshooting

Constructor and factory forms
- new Date() -> Date instance for current time (system clock).
- new Date(value: number) -> Date with time value in milliseconds since Unix epoch (1 January 1970 00:00:00 UTC).
- new Date(dateString: string) -> Date parsed from string per ES specification; for reliable parsing use ISO 8601 formats (see ISO_8601 document).
- Date(value) called as a function returns a string representation and should not be used to construct Date objects.

Static methods and semantics
- Date.now() -> number: integer milliseconds since epoch (UTC).
- Date.parse(dateString: string) -> number: milliseconds since epoch, or NaN if not parseable. Accepts ISO 8601 and a subset of other standard forms; behaviour for non-ISO strings is implementation-dependent.
- Date.UTC(year: number, month: number[, day, hour, minute, second, ms]) -> number: milliseconds since epoch for the UTC values provided. month is zero-indexed.

Instance getters and setters (signatures and return types)
- getTime() -> number: ms since epoch.
- getFullYear() -> number
- getMonth() -> number (0-11)
- getDate() -> number (1-31)
- getHours(), getMinutes(), getSeconds(), getMilliseconds() -> numbers (local time)
- getUTCFullYear(), getUTCMonth(), getUTCDate(), getUTCHours(), getUTCMinutes(), getUTCSeconds(), getUTCMilliseconds() -> numbers (UTC)
- setTime(time: number) -> number: sets time in ms and returns new ms value.
- toISOString() -> string: canonical ISO 8601 string in UTC with millisecond precision, always produces form YYYY-MM-DDTHH:mm:ss.sssZ.

ISO 8601 parsing behaviour and recommendations (implementation details)
- Prefer using ISO 8601 extended form for CSV time column: YYYY-MM-DDTHH:mm:ss (optionally .sss fraction) and timezone either Z or ±HH:MM.
- Date.parse and new Date(string) reliably accept extended ISO forms; other date-only or locale forms may be interpreted differently across engines and should be avoided.

Numeric epoch handling
- Many CSV time columns use numeric epoch values; first detect units: if values look like integers ~1e10 they are seconds, if ~1e12 they are milliseconds. Convert seconds to ms by multiplying by 1000 before passing to new Date(number).
- Recommended pattern for numeric epoch (no code fences): let epochMs = (value > 1e11) ? Number(value) : Number(value) * 1000; new Date(epochMs).

CSV parsing guidance for "time" column
- If CSV rows have ISO strings, parse with Date.parse(row.time) and treat result as ms; guard for NaN.
- If CSV rows contain numeric timestamps, detect units as above and convert to ms. If CSV uses separate date and time columns, compose an ISO string explicitly rather than relying on Date.parse for non-ISO locales.
- Prefer explicit parsing or normalization to ISO 8601 at ingest time to avoid cross-platform parsing differences.

Edge cases and portability (troubleshooting)
- Date.parse can return NaN for malformed or locale-specific formats. Always validate by isFinite(result) and fallback to manual parsing or a strict parser.
- Month number is zero-based in constructors that accept components (Date.UTC, setUTCMonth, etc.).
- watch out for leap seconds: JavaScript Date does not represent leap seconds; values are continuous UTC milliseconds.

Supplementary details (implementation tips)
- For high-throughput CSV parsing, parse and convert the time column once during CSV load and cache numeric ms values for plotting and scaling.
- Use Date.prototype.toISOString() when serializing dates to ensure canonical, sortable format.

Reference details (API signatures and effects)
- new Date(): Date
- new Date(value: number): Date (value in ms)
- new Date(dateString: string): Date (string parsed using ES parser; use ISO 8601 formats for deterministic results)
- Date.now() -> number (ms)
- Date.parse(dateString: string) -> number (ms or NaN)
- Date.UTC(year, month[, day, hour, minute, second, ms]) -> number (ms)
- Date.prototype.toISOString() -> string (YYYY-MM-DDTHH:mm:ss.sssZ)

Detailed digest and retrieval
- Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
- Retrieved: 2026-03-20
- Bytes fetched: 201224
- Extracted: authoritative list of constructors, static helpers (now, parse, UTC), instance getters and setters, and recommendations to use ISO 8601 for deterministic parsing across environments.

Attribution
- Content crawled from MDN (Date) on 2026-03-20, 201224 bytes.
