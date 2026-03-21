NORMALISED EXTRACT

API signature
- TypeError([message]) -> TypeError object
  - Parameters: message: string (optional)
  - Returns: TypeError instance with name 'TypeError'

Table of contents
- When to use TypeError
- Constructor behaviour
- Validation patterns

Detailed information
When to use
- TypeError indicates a value is not of the expected type (e.g., string passed where number expected).
- For fizzBuzz: when n is not a number or not an integer, throw new TypeError('n must be integer').

Constructor behaviour and checking
- Use instanceof TypeError or error.name === 'TypeError' to detect.

REFERENCE DETAILS (exact behaviour)
- Constructor: TypeError(message?: string) -> TypeError
- Properties: name: 'TypeError', message: string

DETAILED DIGEST
- Source URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError
- Retrieved: 2026-03-21
- Data size obtained during crawl (trimmed capture): 20000 bytes
- Extract (first fragment of retrieved HTML):

      <!doctype html>
      <html
        lang="en-US"
        data-theme="light dark"
        data-renderer="Doc"

ATTRIBUTION
- MDN Web Docs: TypeError reference. Content trimmed for digest.
