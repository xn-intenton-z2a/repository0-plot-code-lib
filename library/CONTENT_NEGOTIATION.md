# CONTENT_NEGOTIATION

## Crawl Summary
Server-driven negotiation uses headers: Accept, Accept-Encoding, Accept-Language, Accept-CH and optional User-Agent. Accept header lists media types with q-factors. Client hints (Accept-CH) values: Device-Memory, Viewport-Width, Width. Server sets Vary with used headers. On no match responds 406 or 415 with supported types. Agent-driven negotiation: 300 Multiple Choices page or JavaScript redirection.

## Normalised Extract
Table of Contents
1 Negotiation Types
2 Header Syntax and Parameters
3 Quality Factor Specification
4 Client Hints Extension
5 Vary Header Rules
6 Reactive Negotiation

1 Negotiation Types
server-driven: proactive, uses Accept*, server algorithm picks representation
agent-driven: reactive, server returns 300 with alternatives, client selects

2 Header Syntax and Parameters
Accept: <type>/<subtype>[;<q=value>] (comma separated list)
Accept-Encoding: <encoding>[;<q=value>]
Accept-Language: <language-tag>[;<q=value>]
Accept-CH: Device-Memory, Viewport-Width, Width
User-Agent: <product>/<version> [ (comment) ]

3 Quality Factor Specification
q-value = decimal between 0.001 and 1.000, default=1.000 if omitted; lower q means lower preference

4 Client Hints Extension
Accept-CH values:
  Device-Memory: RAM approximation = round(power-of-two)/1024
  Viewport-Width: layout viewport width in CSSpx
  Width: resource intrinsic width in physical px
Chrome support: Chrome46+, Device-Memory Chrome61+

5 Vary Header Rules
Syntax: Vary: header1, header2 or Vary: *
List request headers used in negotiation; * disables caching

6 Reactive Negotiation
Response 300 Multiple Choices: include HTML or JSON list of URIs
Fallback: script inspects navigator headers then redirects


## Supplementary Details
Accept header exact BNF: "Accept" ":" OWS media-range *( OWS "," OWS media-range )
media-range = ( "*" "/" "*" ) / ( type "/" "*" ) / ( type "/" subtype ) *( OWS ";" OWS parameter )
parameter = token "=" ( token / quoted-string ); quality parameter name = "q"
Accept-Encoding BNF similar, encoding names: gzip, compress, deflate, br, identity, *
Accept-Language: language-range = (1*8ALPHA *("-" 1*8ALPHA)) ; q parameter as above
Accept-CH: comma-separated list of directive names
Vary: header-name *( "," header-name ) / "*"
Server response codes: 300 Multiple Choices, 406 Not Acceptable, 415 Unsupported Media Type


## Reference Details
Header: Accept
Parameters: media-range list, each with optional ;q=0.001–1.000
Default q=1.000
Example request: GET /resource HTTP/1.1
Host: api.example.com
Accept: application/json;q=0.9, text/plain;q=0.5, */*;q=0.1

Header: Accept-Encoding
Parameters: br, gzip, deflate, identity; q range as above
Example: Accept-Encoding: br, gzip;q=0.8, identity;q=0.1

Header: Accept-Language
Parameters: language tag per RFC 5646, q range
Example: Accept-Language: en-US,en;q=0.8, fr;q=0.5

Header: Accept-CH
Values: Device-Memory, Viewport-Width, Width
Example: Accept-CH: Device-Memory, Width

Header: Vary
Values: header names used
Example: Vary: Accept, Accept-Encoding

Response Codes and Patterns
300 Multiple Choices
HTTP/1.1 300 Multiple Choices
Content-Type: text/html; charset=UTF-8
Link: <https://example.com/variant1>; rel="alternate"; type="application/json", <https://example.com/variant2>; rel="alternate"; type="text/html"

406 Not Acceptable
HTTP/1.1 406 Not Acceptable
Content-Type: text/plain
Accept: application/json, text/html

415 Unsupported Media Type
HTTP/1.1 415 Unsupported Media Type
Content-Type: text/plain
Accept-Patch: application/json-patch+json

Configuration Snippets
Nginx:
location /resource {
  add_header Vary "Accept, Accept-Encoding";
  if ($http_accept !~* "application/json") {
    return 406 "Not acceptable";
  }
}

Apache httpd.conf:
<Directory "/var/www/app">
  Options MultiViews
  ForceType application/json
  AddType application/json .json
</Directory>

Best Practices
Always include Vary header matching negotiation headers.
Provide UI override for language; do not rely solely on Accept-Language.
Limit client hints to necessary directives to reduce fingerprinting.

Troubleshooting
Command: curl -I -H "Accept: application/json" https://api.example.com/resource
Expected: HTTP/1.1 200 OK, Content-Type: application/json
Command: curl -I -H "Accept: image/webp" https://example.com/img.png
Expected: 406 or 415 with list of supported encodings via Accept-Encoding header


## Information Dense Extract
server-driven negotiates via headers Accept(type/subtype;q), Accept-Encoding(enc;q), Accept-Language(lang;q), Accept-CH(Device-Memory,Viewport-Width,Width); q syntax 0.001–1.000 default1; server responds 406/415 with supported types; Vary header lists negotiation headers; reactive uses 300 Multiple Choices with links; directives: BNF for headers per RFC; Nginx/Apache config examples; best practices: Vary matches headers, UI override lang.

## Sanitised Extract
Table of Contents
1 Negotiation Types
2 Header Syntax and Parameters
3 Quality Factor Specification
4 Client Hints Extension
5 Vary Header Rules
6 Reactive Negotiation

1 Negotiation Types
server-driven: proactive, uses Accept*, server algorithm picks representation
agent-driven: reactive, server returns 300 with alternatives, client selects

2 Header Syntax and Parameters
Accept: <type>/<subtype>[;<q=value>] (comma separated list)
Accept-Encoding: <encoding>[;<q=value>]
Accept-Language: <language-tag>[;<q=value>]
Accept-CH: Device-Memory, Viewport-Width, Width
User-Agent: <product>/<version> [ (comment) ]

3 Quality Factor Specification
q-value = decimal between 0.001 and 1.000, default=1.000 if omitted; lower q means lower preference

4 Client Hints Extension
Accept-CH values:
  Device-Memory: RAM approximation = round(power-of-two)/1024
  Viewport-Width: layout viewport width in CSSpx
  Width: resource intrinsic width in physical px
Chrome support: Chrome46+, Device-Memory Chrome61+

5 Vary Header Rules
Syntax: Vary: header1, header2 or Vary: *
List request headers used in negotiation; * disables caching

6 Reactive Negotiation
Response 300 Multiple Choices: include HTML or JSON list of URIs
Fallback: script inspects navigator headers then redirects

## Original Source
HTTP Content Negotiation
https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation

## Digest of CONTENT_NEGOTIATION

# Principles of Content Negotiation

Clients request a resource URL; server selects one representation variant by negotiation mechanism and returns it.

# Server-Driven Content Negotiation

Client sends request headers as hints: Accept, Accept-Encoding, Accept-Language, (optional) Accept-Post, Accept-Patch, Accept-CH, User-Agent.
Server algorithm (e.g. Apache mod_negotiation) picks best match or responds 406/415.
Server sets Vary response header listing request headers used.

# Core HTTP Headers

Accept: media-range [;q=weight]
Accept-Encoding: encoding [;q=weight]
Accept-Language: language-tag [;q=weight]
Accept-CH: Device-Memory, Viewport-Width, Width
User-Agent: product/version [comments]
Vary: header-name [, header-name] or "*"

# Quality Factor Syntax

q values range 0.001 to 1.000, default 1.000 when omitted.
Format: ;q=0.x or ;q=1.000

# Agent-Driven (Reactive) Negotiation

Server responds 300 Multiple Choices with links to variants.
Client or script picks one, issues new request.

# Error Responses

406 Not Acceptable: no variant matches; include Accept-Post or Accept-Patch in response
415 Unsupported Media Type: request media type unsupported


## Attribution
- Source: HTTP Content Negotiation
- URL: https://developer.mozilla.org/en-US/docs/Web/HTTP/Content_negotiation
- License: License
- Crawl Date: 2025-04-26T14:48:29.216Z
- Data Size: 2464987 bytes
- Links Found: 48034

## Retrieved
2025-04-26
