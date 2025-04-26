# HTTP_CONTENT_NEGOTIATION

## Crawl Summary
Negotiation types: server-driven (proactive) via request headers; agent-driven (reactive) via 300/406/415 responses. Server-driven headers: Accept, Accept-Encoding, Accept-Language, Accept-CH. Header syntax definitions: media-range and quality factors for Accept, Accept-Encoding, Accept-Language. Experimental Accept-CH values: Device-Memory, Viewport-Width, Width. User-Agent product tokens. Vary response header syntax. Reactive negotiation uses 300 codes and link lists.

## Normalised Extract
Table of Contents
1 Principles of negotiation
2 Server-driven negotiation
3 Header syntax and parameters
 3.1 Accept
 3.2 Accept-CH
 3.3 Accept-Encoding
 3.4 Accept-Language
 3.5 User-Agent
 3.6 Vary
4 Agent-driven negotiation

1 Principles of negotiation
When client requests URL, server selects representation based on headers or codes. Each variant has its own URL.

2 Server-driven negotiation
Client sends headers listing preferences. Server algorithm matches available representations. On no match, returns 406 or 415 and response headers Accept-Post, Accept-Patch.
Include Vary: listing headers used.

3 Header syntax and parameters
3.1 Accept
Syntax: Accept: type/subtype|type/*|*/* ;q=0.0–1.0(default1.0)  comma-separated

3.2 Accept-CH
Syntax: Accept-CH: hint1,hint2
Valid hints: Device-Memory, Viewport-Width, Width

3.3 Accept-Encoding
Syntax: Accept-Encoding: encoding ;q=0.0–1.0 (default identity if unspecified)

3.4 Accept-Language
Syntax: Accept-Language: lang-tag;q=0.0–1.0 default from UA interface language

3.5 User-Agent
Syntax: product/version [ (comment) ]

3.6 Vary
Syntax: Vary: header1,header2 or Vary: *

4 Agent-driven negotiation
On ambiguous request, server returns 300 Multiple Choices with links. Client selects and requests variant URL. Implementation requires custom HTML/JS link list or redirect script.

## Supplementary Details
Accept header default quality: 1.0. Quality parameter precision up to three decimal places. Servers must interpret q=0 as unacceptable. Accept-Encoding default identity;q=0.001. Nginx example: gzip on; gzip_types text/plain application/json; gzip_vary on; Vary: Accept-Encoding; to enable compression negotiation.

Accept-CH requires server opt-in via response header: Accept-CH: Width,Viewport-Width. Client must support Chrome>=46 and Device-Memory>=61.

Vary header impact: listing multiple headers increases cache fragmentation. Use Vary: Accept-Encoding for compression only.

## Reference Details
cURL examples:
 curl -H "Accept: application/json" -I https://api.example.com/resource
 Expected response header: Content-Type: application/json; charset=utf-8

Node.js Express pattern:
 const express = require('express');
 const app = express();
 app.get('/data', (req, res) => {
   res.format({
     'application/json': () => res.send({key:'value'}),
     'text/html': () => res.send('<p>value</p>'),
     default:       () => res.status(406).send('Not Acceptable')
   });
 });

Nginx config snippet:
 server {
   listen 80;
   location / {
     proxy_pass http://backend;
     gzip on;
     gzip_types application/json text/html;
     add_header Vary Accept-Encoding;
   }
 }

Troubleshooting:
 Run curl -v -H "Accept-Encoding: br" https://example.com
 Expect response header: Content-Encoding: br
 If missing, ensure server gzip on and brotli installed.

HTTP status codes:
 300 Multiple Choices  -> agent-driven negotiation
 406 Not Acceptable    -> no matching representation
 415 Unsupported Media Type -> request Content-Type not supported

## Information Dense Extract
Negotiate by Accept,Accept-Encoding,Accept-Language,Accept-CH headers. Syntax Accept: type/subtype|type/*|*/*;q=0–1.0, default q=1.0. Accept-Encoding: encoding;q=0–1.0, identity default. Accept-Language: lang-tag;q=0–1.0. Accept-CH: Device-Memory,Viewport-Width,Width (Chrome>=46). User-Agent: product/version (comment). Vary: header-list or *. Server algorithm matches header q-values to available variants; on no match returns 406/415. Agent-driven returns 300 with variant links. Configure compression: gzip on,h2o brotli; add_header Vary Accept-Encoding. Express res.format maps formats; fallback 406. Troubleshoot with curl -I and verify Content-Encoding/Content-Type headers.

## Sanitised Extract
Table of Contents
1 Principles of negotiation
2 Server-driven negotiation
3 Header syntax and parameters
 3.1 Accept
 3.2 Accept-CH
 3.3 Accept-Encoding
 3.4 Accept-Language
 3.5 User-Agent
 3.6 Vary
4 Agent-driven negotiation

1 Principles of negotiation
When client requests URL, server selects representation based on headers or codes. Each variant has its own URL.

2 Server-driven negotiation
Client sends headers listing preferences. Server algorithm matches available representations. On no match, returns 406 or 415 and response headers Accept-Post, Accept-Patch.
Include Vary: listing headers used.

3 Header syntax and parameters
3.1 Accept
Syntax: Accept: type/subtype|type/*|*/* ;q=0.01.0(default1.0)  comma-separated

3.2 Accept-CH
Syntax: Accept-CH: hint1,hint2
Valid hints: Device-Memory, Viewport-Width, Width

3.3 Accept-Encoding
Syntax: Accept-Encoding: encoding ;q=0.01.0 (default identity if unspecified)

3.4 Accept-Language
Syntax: Accept-Language: lang-tag;q=0.01.0 default from UA interface language

3.5 User-Agent
Syntax: product/version [ (comment) ]

3.6 Vary
Syntax: Vary: header1,header2 or Vary: *

4 Agent-driven negotiation
On ambiguous request, server returns 300 Multiple Choices with links. Client selects and requests variant URL. Implementation requires custom HTML/JS link list or redirect script.

## Original Source
HTTP Content Negotiation
https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation

## Digest of HTTP_CONTENT_NEGOTIATION

# HTTP Content Negotiation (retrieved 2024-06-10)
Data Size: 2122287 bytes
Attribution: MDN Contributors, last modified Apr 10 2025

# Principles of content negotiation
When a client requests a resource URL, the server selects one of its available representations (variants) by inspecting request headers or returning specific HTTP response codes. Each variant and the overall resource has its own URL.

# Server-driven content negotiation
Client-supplied headers: Accept, Accept-Encoding, Accept-Language, Accept-CH. Server uses an internal algorithm (e.g., Apache negotiation) to match headers against available representations. If no match, responds with 406 or 415 and lists supported media types in response headers (Accept-Post, Accept-Patch).

Server MUST include Vary response header listing request headers used in selection.

# Header details
## Accept
Syntax: Accept: media-range[;q=quality][, media-range[;q=quality]]
media-range = type/subtype | type/* | */*  quality = 0.0–1.0 (default 1.0)
Example: Accept: text/html;q=0.8, application/json

## Accept-CH (experimental)
Syntax: Accept-CH: client-hint[, client-hint]
Values:
  Device-Memory  -> approximate RAM in powers of two divided by 1024 (e.g., 0.5)
  Viewport-Width -> layout viewport width in CSS px
  Width          -> resource intrinsic width in physical px

## Accept-Encoding
Syntax: Accept-Encoding: encoding[;q=quality][, encoding[;q=quality]]
Default: identity;q=0.001 if not listed
Example: Accept-Encoding: br, gzip;q=0.8

## Accept-Language
Syntax: Accept-Language: lang-tag[;q=quality][, lang-tag[;q=quality]]
lang-tag per RFC 4646, quality 0.0–1.0
Example: Accept-Language: en-US,en;q=0.7

## User-Agent
Syntax: User-Agent: product[/version][ comment]
product = token/
comment optional, delimited by ()
Example: User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)

## Vary
Syntax: Vary: header-name[, header-name] | Vary: *
Indicates caching criteria. Must match request headers used in negotiation.

# Agent-driven negotiation
Server responds with 300 Multiple Choices and provides links to alternative representations. Client (via UI or script) selects and requests chosen URL. Not standardized—requires site-specific handling (HTML lists, JavaScript redirects).

## Attribution
- Source: HTTP Content Negotiation
- URL: https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
- License: License
- Crawl Date: 2025-04-26T13:48:25.575Z
- Data Size: 2122287 bytes
- Links Found: 37757

## Retrieved
2025-04-26
