# PROBLEM_DETAILS

## Crawl Summary
RFC 7807 defines a standardized JSON (and XML) structure to represent HTTP API error details. It specifies the mandatory members (type, title, status, detail, instance) for error objects, extension mechanism for additional problem-specific members, and associated media types (application/problem+json and application/problem+xml). The document also includes a RELAX NG schema for XML serialization and detailed security and IANA considerations.

## Normalised Extract
Table of Contents:
1. Introduction
   - Context for error representation in HTTP APIs.
2. Requirements
   - Must use problem details JSON or XML, with mandatory members and optional extensions.
3. Problem Details JSON Object
   - Mandatory members: type (string, default 'about:blank'), title (string), status (number), detail (string), instance (string).
   - Extensions: Custom members (e.g., balance, accounts) following naming rules.
4. Defining New Problem Types
   - Specifications for new type URIs, titles, and associated HTTP status codes. Optional Retry-After header usage.
5. Media Types
   - application/problem+json: JSON encoding, no required parameters, follows RFC7159.
   - application/problem+xml: XML encoding per RFC7303 with RELAX NG schema provided.
6. Security Considerations
   - Avoid exposing sensitive information; ensure consistency between HTTP status code and JSON 'status' member.
7. IANA Considerations
   - Registration details of media types and usage instructions.

For each topic, the details include the exact member definitions, media type configurations, example structures (JSON and XML), and related RFC specifications for error message formats.

## Supplementary Details
Technical Specifications & Configuration:
- Problem Details JSON Object Members:
  * type: string (URI reference, default 'about:blank').
  * title: string (short, human-readable summary, fixed except for localization).
  * status: number (HTTP status code corresponding to the error).
  * detail: string (problem-specific, human-readable error explanation focused on resolution).
  * instance: string (URI reference for the specific occurrence of the error).
- Extension Members: Must begin with ALPHA; at least 3 characters; valid characters ALPHA, DIGIT, underscore.
- Media Types:
  * application/problem+json: No parameters; encoding per RFC7159.
  * application/problem+xml: No parameters; encoding per RFC7303; includes XML namespace 'urn:ietf:rfc:7807'.
- XML RELAX NG Schema (documentation only):
  default namespace ns = 'urn:ietf:rfc:7807'
  start = problem
  problem = element problem { ( element type { xsd:anyURI }?, element title { xsd:string }?, element detail { xsd:string }?, element status { xsd:positiveInteger }?, element instance { xsd:anyURI }? ), anyNsElement }
- Security Considerations: Validate output to avoid leakage of internal details; use advisory 'status' member aligned with HTTP response code.
- IANA Registration: Media types registered with specifications from RFC 7807, including contact information and restrictions on usage.

## Reference Details
API Specifications & Implementation Details:
- JSON Problem Details Object Example:
    HTTP/1.1 403 Forbidden
    Content-Type: application/problem+json
    Content-Language: en
    {
      'type': 'https://example.com/probs/out-of-credit',
      'title': 'You do not have enough credit.',
      'detail': 'Your current balance is 30, but that costs 50.',
      'instance': '/account/12345/msgs/abc',
      'balance': 30,
      'accounts': ['/account/12345', '/account/67890']
    }

- XML Problem Details Object Example:
    HTTP/1.1 403 Forbidden
    Content-Type: application/problem+xml
    Content-Language: en
    <?xml version='1.0' encoding='UTF-8'?>
    <problem xmlns='urn:ietf:rfc:7807'>
      <type>https://example.com/probs/out-of-credit</type>
      <title>You do not have enough credit.</title>
      <detail>Your current balance is 30, but that costs 50.</detail>
      <instance>https://example.net/account/12345/msgs/abc</instance>
      <balance>30</balance>
      <accounts>
        <i>https://example.net/account/12345</i>
        <i>https://example.net/account/67890</i>
      </accounts>
    </problem>

- Method Signatures (Conceptual, as RFC is specification not SDK):
    function createProblemDetail(type: string = 'about:blank', title: string, status: number, detail: string, instance: string, extensions: object = {}): object
    Returns a JSON object that conforms to RFC 7807. Throws error if mandatory fields are missing.

- Configuration Options:
    * MediaType: 'application/problem+json' or 'application/problem+xml' set in HTTP header.
    * Extensions: Optional keys must follow naming convention: regex /^[A-Za-z][A-Za-z0-9_]{2,}$/.

- Best Practices:
    * Always use the same HTTP status code as in the 'status' member.
    * Do not include debugging or sensitive implementation details in the 'detail' member.
    * Use consistent type URIs to allow client-side caching or documentation lookups.

- Troubleshooting Procedures:
    1. Command: curl -i -H 'Accept: application/problem+json' https://api.example.com/resource
       Expected Output: HTTP status code matching error, and JSON body with matching 'status' and 'type'.
    2. Verify XML output by requesting with Accept: application/problem+xml. Use xmllint --noout to check XML well-formedness.
    3. Check media type consistency in HTTP headers to ensure client compatibility.
    4. Log all error responses and verify against the RFC member definitions using a JSON schema validator.

- Detailed Implementation Pattern:
    Step 1: Define error response based on environment configuration (JSON or XML).
    Step 2: Populate required fields: type, title, status, detail, instance.
    Step 3: Append any extension members after validating against naming rules.
    Step 4: Set appropriate Content-Type header.
    Step 5: Return error response with matching HTTP status code.

Developers can directly use these specifications to guide error response implementations and verify conformance using automated tests.

## Information Dense Extract
RFC7807 defines error details format: JSON object with members: type(string, default 'about:blank'), title(string), status(number), detail(string), instance(string). Extensions allowed with naming regex /^[A-Za-z][A-Za-z0-9_]{2,}$/. Media types: application/problem+json (JSON per RFC7159) and application/problem+xml (XML per RFC7303). XML RELAX NG schema provided; example JSON and XML responses given. API pattern: createProblemDetail(type, title, status, detail, instance, extensions) returns compliant object. Implementation best practices include aligning HTTP status code with JSON 'status', avoiding sensitive data exposure, and validating extension names. Troubleshooting involves CURL commands and XML linting to check media type and structure conformance.

## Sanitised Extract
Table of Contents:
1. Introduction
   - Context for error representation in HTTP APIs.
2. Requirements
   - Must use problem details JSON or XML, with mandatory members and optional extensions.
3. Problem Details JSON Object
   - Mandatory members: type (string, default 'about:blank'), title (string), status (number), detail (string), instance (string).
   - Extensions: Custom members (e.g., balance, accounts) following naming rules.
4. Defining New Problem Types
   - Specifications for new type URIs, titles, and associated HTTP status codes. Optional Retry-After header usage.
5. Media Types
   - application/problem+json: JSON encoding, no required parameters, follows RFC7159.
   - application/problem+xml: XML encoding per RFC7303 with RELAX NG schema provided.
6. Security Considerations
   - Avoid exposing sensitive information; ensure consistency between HTTP status code and JSON 'status' member.
7. IANA Considerations
   - Registration details of media types and usage instructions.

For each topic, the details include the exact member definitions, media type configurations, example structures (JSON and XML), and related RFC specifications for error message formats.

## Original Source
RFC 7807: Problem Details for HTTP APIs
https://tools.ietf.org/html/rfc7807

## Digest of PROBLEM_DETAILS

# Introduction
This document (RFC 7807) defines a standardized format for expressing error details in HTTP APIs using a JSON object or an equivalent XML format. It specifies a dedicated media type for problem details in JSON: application/problem+json and for XML: application/problem+xml. The document explains how HTTP status codes can be supplemented with additional machine‐readable information to assist API clients in error diagnosis and resolution.

# Requirements
The specification requires that HTTP APIs adopting problem details: 
- Use a JSON object (or XML) to convey error information.
- Represent a problem type with a URI reference in the "type" member, with the default value "about:blank" when omitted.
- Include members "title", "status", "detail", and "instance" that provide human-readable error messages and context.
- Allow for extension members that provide additional error-specific attributes (e.g., balance, accounts).

# The Problem Details JSON Object
When serialized, the JSON object MUST be identified with the media type application/problem+json. An example response is as follows:

HTTP/1.1 403 Forbidden
Content-Type: application/problem+json
Content-Language: en
{
  "type": "https://example.com/probs/out-of-credit",
  "title": "You do not have enough credit.",
  "detail": "Your current balance is 30, but that costs 50.",
  "instance": "/account/12345/msgs/abc",
  "balance": 30,
  "accounts": ["/account/12345", "/account/67890"]
}

# Members of a Problem Details Object
The canonical JSON object can include:
- type (string): URI reference identifying the problem type. Default: "about:blank".
- title (string): A short, consistent summary of the problem type.
- status (number): The HTTP status code generated by the origin server for this occurrence of the problem.
- detail (string): A human-readable explanation targeting correction, not debugging.
- instance (string): A URI reference identifying the specific occurrence of the problem.

Extension members MAY be added to the object. Extensions MUST use names beginning with an ALPHA character and be at least three characters long, consisting only of ALPHA, DIGIT, and underscore characters.

# Defining New Problem Types
When defining new problem types, the following MUST be documented:
1. A type URI (with http or https scheme).
2. A descriptive title.
3. The HTTP status code to be used with.

Optionally, new types MAY specify additional members (e.g., use of Retry-After header or typed links in extensions) and SHOULD resolve to HTML documentation when dereferenced.

# Media Types
Two media types are defined:

1. application/problem+json:
   - Required parameters: None
   - Optional parameters: None (unrecognized parameters ignored)
   - Encoding: Same as JSON (RFC7159)

2. application/problem+xml:
   - Required parameters: None
   - Optional parameters: None (unrecognized parameters ignored)
   - Encoding: As per RFC7303

# XML Format and RELAX NG Schema
For XML representations, the following RELAX NG schema is given (for documentation only):

default namespace ns = "urn:ietf:rfc:7807"
start = problem
problem = element problem {
  ( element type { xsd:anyURI }?,
    element title { xsd:string }?,
    element detail { xsd:string }?,
    element status { xsd:positiveInteger }?,
    element instance { xsd:anyURI }? ),
  anyNsElement
}

Extension arrays and objects are encoded as nested XML elements within the same namespace.

# Security Considerations
Problem details must not inadvertently expose sensitive internal details. It is recommended that extensions be carefully considered to avoid leaking implementation internals. The duplicated information in the HTML status code and in the "status" member can be used by intermediaries, but its interpretation is advisory only.

# IANA Considerations
IANA has registered the media types application/problem+json and application/problem+xml, with their associated parameters and usage recommendations as documented in RFC 7807.

# References
Key normative and informative references include RFC 2119, RFC 3986, RFC 5234, RFC 7159, RFC 7230, RFC 7231, and others which provide broader context on HTTP, JSON, XML and URI specifications.

Retrieved: 2023-10-05
Data Size: 5183169 bytes

## Attribution
- Source: RFC 7807: Problem Details for HTTP APIs
- URL: https://tools.ietf.org/html/rfc7807
- License: IETF (Public Domain)
- Crawl Date: 2025-04-27T02:23:13.964Z
- Data Size: 5183169 bytes
- Links Found: 8719

## Retrieved
2025-04-27
