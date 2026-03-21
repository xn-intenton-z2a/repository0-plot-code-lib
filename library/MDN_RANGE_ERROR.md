NORMALISED EXTRACT

API signature
- RangeError([message]) -> RangeError object
  - Parameters: message: string (optional)
  - Returns: RangeError instance (subclass of Error) with 'name' property equal to 'RangeError' and 'message' property set to provided message

Table of contents
- When to use RangeError
- Constructor behaviour
- Checking and throwing patterns

Detailed information
When to use
- RangeError indicates a numeric value falls outside the allowable set or range (e.g., negative length where only non-negative is allowed).
- For fizzBuzz: when n < 0, prefer throw new RangeError('n must be >= 0').

Constructor behaviour and checking
- new RangeError(message) constructs an Error-like object; instanceof RangeError and error.name === 'RangeError' are valid checks.
- Do not rely on message contents for programmatic checks; use instanceof or error.name.

REFERENCE DETAILS (exact behaviour)
- Constructor: RangeError(message?: string) -> RangeError
- Properties: name: 'RangeError', message: string

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RangeError
- Retrieved: 2026-03-21
- Data size obtained during crawl (trimmed capture): 20000 bytes
- Extract (first fragment of retrieved HTML):

      <!doctype html>
      <html
        lang="en-US"
        data-theme="light dark"
        data-renderer="Doc"

ATTRIBUTION
- MDN Web Docs: RangeError reference. Content trimmed for digest.
