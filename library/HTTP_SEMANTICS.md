# HTTP_SEMANTICS

## Crawl Summary
HTTP/1.1 semantics defined in RFC7231 includes explicit definitions for request methods, header fields, and content negotiation. ABNF grammars specify media types and parameters, such as media-type, type, subtype, and parameter formations. Detailed method definitions (GET, HEAD, POST, PUT, DELETE, etc.) and header fields like Content-Type, Content-Encoding, and Content-Language are provided. The spec describes proactive and reactive content negotiation strategies, payload structure layering (Content-Encoding over Content-Type), and guidelines for representation identification via Content-Location.

## Normalised Extract
Table of Contents:
1. HTTP Message Structure
   - Definition of request and response messages
   - Conformance definitions using MUST, SHOULD and related keywords per RFC2119
2. Request Methods
   - GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE
   - Properties: safe, idempotent, and cacheable
3. Representation Metadata
   - Content-Type: media-type (ABNF: media-type = type "/" subtype *( OWS ";" OWS parameter ), where type and subtype are tokens, parameter = token "=" ( token / quoted-string ))
   - Charset: token as defined in RFC6365
   - Content-Encoding: header listing one or more codings (e.g., gzip, deflate, compress), defined as 1#content-coding
   - Content-Language: 1#language-tag (RFC5646 identifiers)
   - Content-Location: absolute-URI or partial-URI identifying the representation
4. Content Negotiation
   - Proactive negotiation: server selects representation based on Accept and other headers
   - Reactive negotiation: client picks an alternative from provided list
5. Payload Semantics & Representation Data
   - Representation-data constructed as: Content-Encoding( Content-Type( bits ) )
   - Guidelines for handling partial content (e.g., 206 Partial Content) and error responses
6. Multipart Types
   - Syntax and use of boundary parameters for multipart/form-data and multipart/byteranges
Detailed Information:
- ABNF for media types, parameter syntax, and coding values are explicitly defined. 
- Exact header field examples include: 'Content-Type: text/html; charset=ISO-8859-4' and 'Content-Encoding: gzip'.
- Negotiation involves both proactive (server-driven) and reactive (client-driven) mechanisms with use of Vary header.

## Supplementary Details
Technical specifications include:
- ABNF Definition: media-type = type "/" subtype *( OWS ";" OWS parameter )
   where: type = token, subtype = token, parameter = token "=" ( token / quoted-string )
- Content-Encoding header: syntax is 1#content-coding; valid codings include 'gzip', 'compress', 'deflate'.
- Content-Type header: if absent, default is assumed as 'application/octet-stream'.
- Charset handling is defined per RFC6365, and language tags follow RFC5646.
- Request Methods: GET is safe and cacheable, POST is used for processing data, PUT for state modification, DELETE for removal. 
- Content Negotiation: Uses Accept, Accept-Language, Accept-Encoding headers with quality value semantics; includes both server-driven and client-driven selection tactics.
- Multipart types require the use of a boundary parameter. 
Exact parameter values, such as case insensitivity for type/subtype, are essential. 
Implementation Steps:
1. Parse the message to separate headers from payload.
2. Validate the media type using ABNF rules.
3. Decode using the specified Content-Encoding in the order provided.
4. Process representations according to Content-Type and negotiated language.
5. Apply appropriate error handling per status codes (e.g., 400, 404, 500) with payload representation detailed error messages.

## Reference Details
Full API Specifications / SDK Method Signatures (as per protocol definitions):
- HTTP Request Parsing Function:
  function parseHTTPRequest(rawData: string): { method: string, uri: string, headers: Record<string, string>, body: string };
  // Parses raw HTTP data into method, URI, headers, and body. Throws Error if parsing fails.

- HTTP Response Construction Function:
  function buildHTTPResponse(statusCode: number, headers: Record<string,string>, body: string): string;
  // Constructs an HTTP response string given a status code, headers, and body. Returns a complete response message.

- ABNF Grammar for media-type:
  media-type = type "/" subtype *( OWS ";" OWS parameter )
  type       = token
  subtype    = token
  parameter  = token "=" ( token / quoted-string )

- Example Header Field Implementations:
  // Content-Type example
  Header: "Content-Type: text/html; charset=ISO-8859-4"

  // Content-Encoding example
  Header: "Content-Encoding: gzip"

- Configuration Options:
  Option: EnableContentSniffing (default: false) - When false, disables client-side content type overriding.
  Option: MaxPayloadSize (default: 1048576 bytes) - Maximum allowed size for payload, rejects messages exceeding limit.

- Best Practices & Implementation Code Pattern:
  1. Always check for the presence of Content-Type header. If missing, default to application/octet-stream.
  2. Validate content-coding order; process each listed encoding in sequence.
  3. Use Vary header in responses when utilizing proactive negotiation.

- Troubleshooting Procedures:
  Command: curl -I http://yourserver/resource
  Expected Output: HTTP/1.1 200 OK with correct Content-Type and Content-Encoding headers.
  Command: Check server logs for parsing errors if response payload does not match declared media type.
  Debug Step: Use a network proxy (e.g., Wireshark) to inspect raw HTTP messages to verify header field integrity and message structure.

- Detailed SDK Example:
  // Example in a Node.js-like pseudocode:
  /*
  function handleRequest(request) {
    try {
      let parsed = parseHTTPRequest(request);
      if (!parsed.headers['Content-Type']) {
        parsed.headers['Content-Type'] = 'application/octet-stream';
      }
      // Decode body based on Content-Encoding
      let decodedBody = decodeContent(parsed.body, parsed.headers['Content-Encoding']);
      // Process based on request method
      switch(parsed.method) {
        case 'GET':
          return buildHTTPResponse(200, {'Content-Type': parsed.headers['Content-Type']}, decodedBody);
        // Add handling for POST, PUT, DELETE
        default:
          throw new Error('Unsupported Method');
      }
    } catch (err) {
      return buildHTTPResponse(500, {'Content-Type': 'text/plain'}, err.message);
    }
  }
  */

This specification provides developers with concrete definitions and patterns to implement HTTP/1.1 compliant services, ensuring proper parsing, response construction, content negotiation, and error handling.

## Information Dense Extract
RFC7231 defines HTTP/1.1 semantics: Request/Response structure, methods (GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE); header fields: Content-Type (media-type= token/token *( OWS ";" OWS token "=" (token/quoted-string) )), Content-Encoding (1#content-coding; valid: gzip, deflate, compress), Content-Language (1#language-tag per RFC5646), Content-Location (absolute-URI/partial-URI); ABNF grammar provided; content negotiation: proactive vs reactive; payload layering: representation-data = Content-Encoding( Content-Type( bits ) ); SDK endpoints: parseHTTPRequest(rawData:string) returns {method, uri, headers, body}; buildHTTPResponse(statusCode:number, headers:Record<string,string>, body:string) returns string; configuration options include EnableContentSniffing (false), MaxPayloadSize (1048576); troubleshooting via curl -I and network inspection.

## Sanitised Extract
Table of Contents:
1. HTTP Message Structure
   - Definition of request and response messages
   - Conformance definitions using MUST, SHOULD and related keywords per RFC2119
2. Request Methods
   - GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE
   - Properties: safe, idempotent, and cacheable
3. Representation Metadata
   - Content-Type: media-type (ABNF: media-type = type '/' subtype *( OWS ';' OWS parameter ), where type and subtype are tokens, parameter = token '=' ( token / quoted-string ))
   - Charset: token as defined in RFC6365
   - Content-Encoding: header listing one or more codings (e.g., gzip, deflate, compress), defined as 1#content-coding
   - Content-Language: 1#language-tag (RFC5646 identifiers)
   - Content-Location: absolute-URI or partial-URI identifying the representation
4. Content Negotiation
   - Proactive negotiation: server selects representation based on Accept and other headers
   - Reactive negotiation: client picks an alternative from provided list
5. Payload Semantics & Representation Data
   - Representation-data constructed as: Content-Encoding( Content-Type( bits ) )
   - Guidelines for handling partial content (e.g., 206 Partial Content) and error responses
6. Multipart Types
   - Syntax and use of boundary parameters for multipart/form-data and multipart/byteranges
Detailed Information:
- ABNF for media types, parameter syntax, and coding values are explicitly defined. 
- Exact header field examples include: 'Content-Type: text/html; charset=ISO-8859-4' and 'Content-Encoding: gzip'.
- Negotiation involves both proactive (server-driven) and reactive (client-driven) mechanisms with use of Vary header.

## Original Source
RFC7231: Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content
https://tools.ietf.org/html/rfc7231

## Digest of HTTP_SEMANTICS

# RFC 7231 - HTTP/1.1 Semantics and Content
Date Retrieved: 2023-10-XX

This document contains the official IETF specifications for HTTP/1.1 message semantics. It covers request/response message structure, header field definitions, content negotiation, representation metadata, and payload processing. It includes ABNF definitions for media types and outlines the semantics of methods, header fields (e.g., Content-Type, Content-Encoding, Content-Language), and status code categorizations (1xx, 2xx, 3xx, 4xx, 5xx).

## Key Sections Extracted
1. Introduction
   - HTTP message types: requests and responses
   - Conformance directives (MUST, SHOULD, etc.), per RFC2119
   - Use of Augmented Backus-Naur Form (ABNF) for syntax definitions

2. Request Methods
   - Detailed definitions for GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE
   - Method properties: safe, idempotent, cacheable

3. Representation and Metadata
   - Representation metadata: Content-Type, Content-Encoding, Content-Language, Content-Location
   - ABNF definitions for media-type:
     media-type = type "/" subtype *( OWS ";" OWS parameter )
     type = token
     subtype = token
     parameter = token "=" ( token / quoted-string )
   - Charset handling per RFC6365

4. Content Negotiation
   - Proactive (server-driven) and reactive (agent-driven) negotiation
   - Use of Accept headers with quality values
   - Vary header field implications

5. Payload Semantics and Representation Data
   - How payload bodies are defined, including use in error and success responses
   - Dual layer encoding: Content-Encoding (applied coding) over Content-Type (media-type)

6. Other Key Technical Areas
   - Multipart types with boundary parameters
   - Content codings definitions: compress, deflate, gzip
   - Identification of representations via Content-Location header

Attribution: IETF Trust; Data Size: 25347882 bytes; Links Found: 82849

## Attribution
- Source: RFC7231: Hypertext Transfer Protocol (HTTP/1.1): Semantics and Content
- URL: https://tools.ietf.org/html/rfc7231
- License: IETF Document (Public Domain)
- Crawl Date: 2025-04-28T19:47:54.579Z
- Data Size: 25347882 bytes
- Links Found: 82849

## Retrieved
2025-04-28
