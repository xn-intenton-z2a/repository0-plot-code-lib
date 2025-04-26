# HTTP_STATUS

## Crawl Summary
HTTP status codes are divided into five classes: Informational (100-199), Successful (200-299), Redirection (300-399), Client Error (400-499), and Server Error (500-599). Each code specifies a precise result or requirement. Codes such as 200, 301, 404, and 500 provide definitive instructions on handling responses. Detailed definitions are provided for each code including intended use, deprecation notices, and caching or redirection behavior.

## Normalised Extract
Table of Contents:
1. Informational Responses
   - 100: Continue; 101: Switching Protocols; 102: Processing (Deprecated); 103: Early Hints
2. Successful Responses
   - 200: OK; 201: Created; 202: Accepted; 203: Non-Authoritative Information; 204: No Content; 205: Reset Content; 206: Partial Content; 207: Multi-Status; 208: Already Reported; 226: IM Used
3. Redirection Messages
   - 300: Multiple Choices; 301: Moved Permanently; 302: Found; 303: See Other; 304: Not Modified; 305: Use Proxy (Deprecated); 306: Unused; 307: Temporary Redirect; 308: Permanent Redirect
4. Client Error Responses
   - 400: Bad Request; 401: Unauthorized; 402: Payment Required; 403: Forbidden; 404: Not Found; 405: Method Not Allowed; 406: Not Acceptable; 407: Proxy Authentication Required; 408: Request Timeout; 409: Conflict; 410: Gone; 411: Length Required; 412: Precondition Failed; 413: Content Too Large; 414: URI Too Long; 415: Unsupported Media Type; 416: Range Not Satisfiable; 417: Expectation Failed; 418: I'm a teapot; 421: Misdirected Request; 422: Unprocessable Content; 423: Locked; 424: Failed Dependency; 425: Too Early; 426: Upgrade Required; 428: Precondition Required; 429: Too Many Requests; 431: Request Header Fields Too Large; 451: Unavailable For Legal Reasons
5. Server Error Responses
   - 500: Internal Server Error; 501: Not Implemented; 502: Bad Gateway; 503: Service Unavailable; 504: Gateway Timeout; 505: HTTP Version Not Supported; 506: Variant Also Negotiates; 507: Insufficient Storage; 508: Loop Detected; 510: Not Extended; 511: Network Authentication Required
Detailed technical data for each topic includes exact code numbers, specific semantic meanings, applicable HTTP methods, and caching or redirection behaviors. Developers can use this information to implement precise HTTP response handling in both server-side and client-side code.

## Supplementary Details
Technical Specifications and Implementation Details:
- RFC 9110 defines the standard. Each status code includes a numeric code and a short phrase.
- Configuration options: When implementing server responses (eg. using Node.js/Express), use response.status(code).send(message) with code matching the definitions. For example:
  • response.status(200).send('OK')
  • response.status(404).send('Not Found')
- Parameter expectations: Ensure Content-Length is provided when required (e.g., 411) and use Retry-After header with 503 responses.
- Implementation steps:
  1. Validate request parameters.
  2. Determine proper status code (e.g., 200 for successful GET or 201 for creation).
  3. Return exact HTTP status along with required headers (Location for 301, Retry-After for 503).
  4. Use conditional headers to enforce caching (304 response).
- Best practices include: Logging specific response codes for debugging, mapping error codes to user-friendly error pages, and using a switch-case structure for response handling.
- Troubleshooting:
  • Use curl commands (e.g., curl -I http://example.com) to verify returned status codes.
  • Check server logs for status code anomalies.
  • Validate HTTP header correctness when encountering 400 or 411 errors.


## Reference Details
API Specifications and Detailed Implementation for HTTP Status Handling:

Function: sendResponse
Signature: sendResponse(statusCode: number, headers: object, body: string): Response
Description: Sets HTTP response code along with headers and sends body content.
Example:
  // Node.js/Express example
  // Returns a 200 OK response with JSON body
  app.get('/data', function(req, res) {
    res.status(200).set({'Content-Type': 'application/json'}).send(JSON.stringify({ success: true }));
  });

Status Code Handling Patterns:
- 200 OK: For successful GET, HEAD, PUT, POST, TRACE methods. Return full content or headers accordingly.
- 201 Created: After resource creation, include the URI in the Location header.
- 301 Moved Permanently / 308 Permanent Redirect: Set Location header to new URI. Maintain HTTP method if required.
- 302 Found / 307 Temporary Redirect: Use for temporary redirection; preserve method for 307.
- 400 Bad Request: Trigger when request parameters do not match expected format (e.g., missing required fields).
- 404 Not Found: Return when endpoint exists but resource is absent. Optionally hide resource existence.
- 500 Internal Server Error: Catch-all error for unexpected server conditions.

Configuration Options:
- Content-Length: Must be provided if body is sent; missing header triggers 411 error.
- Retry-After: Used with 503 Service Unavailable responses to communicate downtime.

Troubleshooting Steps:
1. Run the command: curl -I http://yourserver/path to inspect HTTP headers and status codes.
2. Inspect server logs for responses matching error codes (400, 500 series).
3. Validate routing configuration if receiving unexpected redirects (300 series).
4. Use middleware to log all outgoing responses to identify misconfigured status codes.

Best Practices:
- Always validate input and use proper status codes to reflect the result.
- In RESTful APIs, return detailed error messages in the body for 4xx responses.
- Ensure that custom status codes (non-standard responses) are documented and handled explicitly.
- Follow the RFC 9110 guidelines for consistency in HTTP responses.

Exception Handling:
- For unexpected errors, catch exceptions and return a 500 Internal Server Error with error logging.
- For authentication issues, return 401 Unauthorized along with WWW-Authenticate header detailing required authentication scheme.


## Information Dense Extract
RFC9110 HTTP status codes: 100-199 Informational (100 Continue, 101 Switching Protocols, 102 Processing Deprecated, 103 Early Hints); 200-299 Successful (200 OK, 201 Created, 202 Accepted, 203 Non-Authoritative, 204 No Content, 205 Reset, 206 Partial, 207 Multi-Status, 208 Already Reported, 226 IM Used); 300-399 Redirection (300 Multiple Choices, 301 Moved Permanently, 302 Found, 303 See Other, 304 Not Modified, 305 Use Proxy Deprecated, 306 Unused, 307 Temporary Redirect, 308 Permanent Redirect); 400-499 Client Errors (400 Bad Request, 401 Unauthorized, 402 Payment Required, 403 Forbidden, 404 Not Found, 405 Method Not Allowed, 406 Not Acceptable, 407 Proxy Auth Required, 408 Request Timeout, 409 Conflict, 410 Gone, 411 Length Required, 412 Precondition Failed, 413 Too Large, 414 URI Too Long, 415 Unsupported Media Type, 416 Range Not Satisfiable, 417 Expectation Failed, 418 I'm a teapot, 421 Misdirected, 422 Unprocessable, 423 Locked, 424 Failed Dependency, 425 Too Early, 426 Upgrade Required, 428 Precondition Required, 429 Too Many, 431 Header Fields Too Large, 451 Legal Reasons); 500-599 Server Errors (500 Internal, 501 Not Implemented, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout, 505 HTTP Version Not Supported, 506 Variant Negotiates, 507 Insufficient Storage, 508 Loop Detected, 510 Not Extended, 511 Network Auth Required); API pattern: response.status(code).set(headers).send(body); troubleshooting via curl -I and log inspection.

## Sanitised Extract
Table of Contents:
1. Informational Responses
   - 100: Continue; 101: Switching Protocols; 102: Processing (Deprecated); 103: Early Hints
2. Successful Responses
   - 200: OK; 201: Created; 202: Accepted; 203: Non-Authoritative Information; 204: No Content; 205: Reset Content; 206: Partial Content; 207: Multi-Status; 208: Already Reported; 226: IM Used
3. Redirection Messages
   - 300: Multiple Choices; 301: Moved Permanently; 302: Found; 303: See Other; 304: Not Modified; 305: Use Proxy (Deprecated); 306: Unused; 307: Temporary Redirect; 308: Permanent Redirect
4. Client Error Responses
   - 400: Bad Request; 401: Unauthorized; 402: Payment Required; 403: Forbidden; 404: Not Found; 405: Method Not Allowed; 406: Not Acceptable; 407: Proxy Authentication Required; 408: Request Timeout; 409: Conflict; 410: Gone; 411: Length Required; 412: Precondition Failed; 413: Content Too Large; 414: URI Too Long; 415: Unsupported Media Type; 416: Range Not Satisfiable; 417: Expectation Failed; 418: I'm a teapot; 421: Misdirected Request; 422: Unprocessable Content; 423: Locked; 424: Failed Dependency; 425: Too Early; 426: Upgrade Required; 428: Precondition Required; 429: Too Many Requests; 431: Request Header Fields Too Large; 451: Unavailable For Legal Reasons
5. Server Error Responses
   - 500: Internal Server Error; 501: Not Implemented; 502: Bad Gateway; 503: Service Unavailable; 504: Gateway Timeout; 505: HTTP Version Not Supported; 506: Variant Also Negotiates; 507: Insufficient Storage; 508: Loop Detected; 510: Not Extended; 511: Network Authentication Required
Detailed technical data for each topic includes exact code numbers, specific semantic meanings, applicable HTTP methods, and caching or redirection behaviors. Developers can use this information to implement precise HTTP response handling in both server-side and client-side code.

## Original Source
MDN HTTP Status Codes
https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

## Digest of HTTP_STATUS

# HTTP STATUS CODES

Retrieved on: 2023-10-12

# Overview
HTTP response status codes are numerical responses provided by a server to indicate the result of an HTTP request. They are standardized by RFC 9110 and are grouped into five classes:

1. Informational Responses (100-199)
2. Successful Responses (200-299)
3. Redirection Messages (300-399)
4. Client Error Responses (400-499)
5. Server Error Responses (500-599)

# Informational Responses
- 100 Continue: Instructs the client to continue with the request.
- 101 Switching Protocols: Indicates protocol upgrade.
- 102 Processing: (Deprecated, WebDAV) Request received but awaiting status.
- 103 Early Hints: Used with Link header for preloading resources.

# Successful Responses
- 200 OK: Request succeeded. Behavior differs by method (GET returns message body; HEAD only headers).
- 201 Created: New resource created (typically after POST or certain PUT requests).
- 202 Accepted: Request received but not yet processed.
- 203 Non-Authoritative Information: Metadata comes from a local or third-party copy.
- 204 No Content: Request processed but no content to return; headers are provided.
- 205 Reset Content: Client should reset the document view.
- 206 Partial Content: Used for range requests.
- 207 Multi-Status (WebDAV): Multiple resources status.
- 208 Already Reported (WebDAV): Avoids repetition in multi-binding responses.
- 226 IM Used: Indicates instance-manipulation has been applied.

# Redirection Messages
- 300 Multiple Choices: Multiple potential responses; requires user/agent decision.
- 301 Moved Permanently: Resource permanently relocated; new URL provided.
- 302 Found: Temporary URI change; client should use same URI in future.
- 303 See Other: Redirect with a GET method regardless of original method.
- 304 Not Modified: Cached version is still valid.
- 305 Use Proxy: (Deprecated) Response must be accessed through a proxy.
- 306 (Unused): Reserved status code.
- 307 Temporary Redirect: Redirect preserving the original HTTP method.
- 308 Permanent Redirect: Permanent redirection with method preservation.

# Client Error Responses
- 400 Bad Request: Server cannot process due to client error (syntax, framing, etc.).
- 401 Unauthorized: Authentication required; indicates unauthenticated client.
- 402 Payment Required: Reserved for digital payment systems (rarely used).
- 403 Forbidden: Client not permitted to access the resource.
- 404 Not Found: Resource not found or hidden to prevent unauthorized access.
- 405 Method Not Allowed: HTTP method not supported by target resource.
- 406 Not Acceptable: No content matches the request criteria.
- 407 Proxy Authentication Required: Requires proxy authentication.
- 408 Request Timeout: Idle connection timed out.
- 409 Conflict: Request conflicts with the current state of the server.
- 410 Gone: Resource no longer available, permanently removed.
- 411 Length Required: Missing Content-Length header.
- 412 Precondition Failed: Preconditions in request headers not met.
- 413 Payload Too Large: Request body exceeds server limits.
- 414 URI Too Long: Request URI exceeds server limits.
- 415 Unsupported Media Type: Media format not supported.
- 416 Range Not Satisfiable: Request range not within resource size.
- 417 Expectation Failed: Expectation given in the request cannot be met.
- 418 I'm a teapot: Easter egg status (refusal to brew coffee).
- 421 Misdirected Request: Request sent to an inappropriate server.
- 422 Unprocessable Content (WebDAV): Well-formed request but semantic errors.
- 423 Locked (WebDAV): Resource is locked.
- 424 Failed Dependency (WebDAV): Prior request failure affected this request.
- 425 Too Early: (Experimental) Server unwilling to process early replayable requests.
- 426 Upgrade Required: Client should upgrade to a different protocol.
- 428 Precondition Required: Request must be conditional to prevent lost updates.
- 429 Too Many Requests: Rate limiting triggered.
- 431 Request Header Fields Too Large: Header fields exceed permissible size.
- 451 Unavailable For Legal Reasons: Resource cannot be provided due to legal restrictions.

# Server Error Responses
- 500 Internal Server Error: Generic server error when no more specific code applies.
- 501 Not Implemented: HTTP method not supported; only GET and HEAD guaranteed.
- 502 Bad Gateway: Invalid response received while acting as a gateway.
- 503 Service Unavailable: Server temporarily unable to handle the request (maintenance or overload).
- 504 Gateway Timeout: Timed-out response from an upstream server.
- 505 HTTP Version Not Supported: Request HTTP version not supported.
- 506 Variant Also Negotiates: Circular reference in content negotiation configuration.
- 507 Insufficient Storage (WebDAV): Server unable to store representation.
- 508 Loop Detected (WebDAV): Infinite loop detected in processing.
- 510 Not Extended: Required extensions are not supported.
- 511 Network Authentication Required: Client must authenticate to access network.

# Attribution
Data Size: 2266491 bytes; Retrieved from https://developer.mozilla.org/en-US/docs/Web/HTTP/Status



## Attribution
- Source: MDN HTTP Status Codes
- URL: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
- License: MDN License
- Crawl Date: 2025-04-26T19:47:30.327Z
- Data Size: 2266491 bytes
- Links Found: 35962

## Retrieved
2025-04-26
