# QUICKCHART

## Crawl Summary
QuickChart API endpoints: GET and POST /chart. Query parameters: chart (JS/JSON), width (int, default 500), height (int, default 300), devicePixelRatio (1|2, default 2), backgroundColor (CSS color, default transparent), version (string, default 2.9.4), format (png|webp|jpg|svg|pdf|base64, default png), encoding (url|base64, default url). POST body: JSON fields matching query params and optional API key; chart payload as string or object. Short URL endpoint POST /chart/create returns {success, url}. Template override parameters: title, labels, data1...N, label1...N, backgroundColor1...N, borderColor1...N. Limitations: URL length, activation delay, expiration. Troubleshooting: use POST or base64 to avoid URL length limits, URL-encode chart, verify DPR.

## Normalised Extract
Table of Contents:
1. GET /chart Endpoint Usage
2. Query Parameters Reference
3. POST /chart JSON Specification
4. Short URL Creation (/chart/create)
5. Template Parameter Overrides
6. Troubleshooting Steps

1. GET /chart Endpoint Usage
Endpoint URL: https://quickchart.io/chart
Append query string parameters; URL-encode the `chart` JSON or use base64 encoding.

2. Query Parameters Reference
chart: JS or JSON object; required; alias `c`.
width: integer; default 500; alias `w`.
height: integer; default 300; alias `h`.
devicePixelRatio: integer 1 or 2; default 2.
backgroundColor: CSS color string; default transparent; alias `bkg`.
version: string (2,3,4 or any Chart.js); default 2.9.4; alias `v`.
format: string png, webp, jpg, svg, pdf, base64; default png; alias `f`.
encoding: string url or base64; default url.

3. POST /chart JSON Specification
Send JSON content-type; avoid URL length limits.
Fields:
  version (string), backgroundColor (string), width (integer), height (integer), devicePixelRatio (number), format (string), chart (string|object), key (string, optional).

4. Short URL Creation (/chart/create)
POST same JSON; response: {success: boolean, url: string}; global activation delay; free expiration 3 days; paid 6 months.

5. Template Parameter Overrides
Modify a short URL by adding query parameters:
title, labels (CSV), data1..dataN (CSV), label1..labelN, backgroundColor1..N, borderColor1..N.
Supports numeric and (x,y) JSON values.

6. Troubleshooting Steps
Error 414: switch to POST or base64 encoding.
Syntax errors: URL-encode JSON.
Visual resolution mismatches: set devicePixelRatio to 1 for exact dimensions.


## Supplementary Details
Implementation steps:
1. Choose endpoint: GET for simple charts; POST for large/complex charts.
2. Construct query string with parameters; URL-encode `chart` JSON or set encoding=base64 and supply base64 string.
3. For POST, set HTTP header Content-Type: application/json; send JSON body matching ChartRequest interface.
4. Optionally include `key` in POST body for authenticated usage.
5. To shorten URL, POST to /chart/create; store returned URL for embedding.
6. Use template parameters on short URL for dynamic overrides in email/SMS.
7. Monitor URL length: echo ${#URL} on Unix systems; ensure below ~2000 bytes for compatibility.
8. For retina support, use devicePixelRatio=2; set to 1 for exact pixel dimensions.

Encoding examples:
URL encoding: encodeURIComponent(JSON.stringify(config))
Base64 encoding: btoa(JSON.stringify(config))

Dimension calculation:
Actual width = width * devicePixelRatio
Actual height = height * devicePixelRatio



## Reference Details
Complete API Specifications:

GET /chart
Request: HTTP GET to https://quickchart.io/chart with query parameters.
Parameters:
- chart (string, required): URL-encoded JS/JSON Chart.js config; alias c
- width (int, optional): default=500; alias w
- height (int, optional): default=300; alias h
- devicePixelRatio (int, optional): 1 or 2; default=2
- backgroundColor (string, optional): CSS color; default transparent; alias bkg
- version (string, optional): Chart.js version; default 2.9.4; alias v
- format (string, optional): png, webp, jpg, svg, pdf, base64; default png; alias f
- encoding (string, optional): url or base64; default url

Responses:
- 200 OK: image binary or JSON URL if format=base64 or encoding=url
- 400 Bad Request: missing or invalid parameters
- 414 URI Too Long: chart config exceeds URL length limits

POST /chart
Request: HTTP POST to https://quickchart.io/chart
Headers:
  Content-Type: application/json
Body schema:
{
  width: string,
  height: string,
  devicePixelRatio: number,
  format: string,
  backgroundColor: string,
  version: string,
  key?: string,
  chart: string | ChartConfiguration
}

Responses:
- 200 OK: image binary
- 400 Bad Request: malformed JSON or invalid ChartConfiguration

POST /chart/create
Request: same as POST /chart
Response (application/json):
{
  success: boolean,
  url: string  // short URL to /chart/render/<id>
}

SDK Method Signatures:

JavaScript (Node.js) example using axios:

import axios from 'axios';

async function fetchChart(config) {
  const response = await axios.get('https://quickchart.io/chart', {
    params: Object.assign({chart: JSON.stringify(config), encoding: 'url'}, config.options)
  });
  return response.data; // image URL or base64
}

async function postChart(requestBody) {
  const response = await axios.post('https://quickchart.io/chart', requestBody);
  return response.data; // binary image data
}

async function createShortUrl(requestBody) {
  const response = await axios.post('https://quickchart.io/chart/create', requestBody);
  return response.data.url;
}

Configuration Options Table:
Parameter             Value                     Effect
chart                 JSON/JS object            Defines Chart.js rendering
width                 integer >=1               Render width in CSS pixels
height                integer >=1               Render height in CSS pixels
devicePixelRatio      1 or 2                    Multiplier for device DPI support
backgroundColor       CSS color string          Canvas background fill
version               Chart.js version string   Select Chart.js engine version
format                png, webp, jpg, svg, pdf, base64  Output file format
encoding              url, base64               Encoding for `chart` parameter
key                   string                    API key for authenticated usage

tools:
URL length: echo ${#URL}; curl -I "<URL>" to inspect headers.

Best Practices:
- Use POST for chart payloads > 2000 characters.
- Set devicePixelRatio to 1 for exact dimension control.
- Pre-encode chart JSON with base64 for special characters.
- Cache short URLs server-side to reduce POST calls.

Troubleshooting Procedures:

1. Error: 414 URI Too Long
   Command: curl -I "$(printf 'https://quickchart.io/chart?c=%s' "$(cat config.json | jq -c .)")"
   Solution: switch to POST or set encoding=base64.

2. Missing chart data
   Inspect `chart` parameter: echo $CHART; echo ${#CHART}
   Ensure JSON string is properly escaped or encoded.

3. Incorrect dimensions
   Check width and height in response headers:
     curl -I "<URL>" | grep Content-Dimension
   Adjust devicePixelRatio.


## Information Dense Extract
GET /chart?chart=<URL-encoded JSON>|<base64>&width=int(500)&height=int(300)&devicePixelRatio=1|2(2)&backgroundColor=CSS(transparent)&version=2|3|4(2.9.4)&format=png|webp|jpg|svg|pdf|base64(png)&encoding=url|base64(url)

POST /chart {width:string,height:string,devicePixelRatio:number,format:string,backgroundColor:string,version:string,key?:string,chart:string|ChartConfiguration}

POST /chart/create same body -> {success:boolean,url:string}

Template URL: /chart/render/<id>?title=string&labels=CSV&data1..N=CSV&label1..N=CSV&backgroundColor1..N=CSV&borderColor1..N=CSV

Limit free URLs: expire=3d; paid=6mo; activation delay=seconds; validation on render.

Troubleshoot: 414->POST/base64; URL-encode chart; echo ${#URL}; curl -I; set devicePixelRatio=1 for exact CSS px.

## Sanitised Extract
Table of Contents:
1. GET /chart Endpoint Usage
2. Query Parameters Reference
3. POST /chart JSON Specification
4. Short URL Creation (/chart/create)
5. Template Parameter Overrides
6. Troubleshooting Steps

1. GET /chart Endpoint Usage
Endpoint URL: https://quickchart.io/chart
Append query string parameters; URL-encode the 'chart' JSON or use base64 encoding.

2. Query Parameters Reference
chart: JS or JSON object; required; alias 'c'.
width: integer; default 500; alias 'w'.
height: integer; default 300; alias 'h'.
devicePixelRatio: integer 1 or 2; default 2.
backgroundColor: CSS color string; default transparent; alias 'bkg'.
version: string (2,3,4 or any Chart.js); default 2.9.4; alias 'v'.
format: string png, webp, jpg, svg, pdf, base64; default png; alias 'f'.
encoding: string url or base64; default url.

3. POST /chart JSON Specification
Send JSON content-type; avoid URL length limits.
Fields:
  version (string), backgroundColor (string), width (integer), height (integer), devicePixelRatio (number), format (string), chart (string|object), key (string, optional).

4. Short URL Creation (/chart/create)
POST same JSON; response: {success: boolean, url: string}; global activation delay; free expiration 3 days; paid 6 months.

5. Template Parameter Overrides
Modify a short URL by adding query parameters:
title, labels (CSV), data1..dataN (CSV), label1..labelN, backgroundColor1..N, borderColor1..N.
Supports numeric and (x,y) JSON values.

6. Troubleshooting Steps
Error 414: switch to POST or base64 encoding.
Syntax errors: URL-encode JSON.
Visual resolution mismatches: set devicePixelRatio to 1 for exact dimensions.

## Original Source
QuickChart Chart API
https://quickchart.io/documentation

## Digest of QUICKCHART

# QuickChart API Detailed Digest

Retrieved: 2024-06-25
Data Size: 557282 bytes
Links Found: 2160

# 1. GET /chart Endpoint

Endpoint: https://quickchart.io/chart
Methods: GET, POST

Parameters:

| Name            | Type               | Default      | Required | Accepted Values                              | Aliases           |
|-----------------|--------------------|--------------|----------|-----------------------------------------------|-------------------|
| chart           | Javascript/JSON obj| none         | yes      | Any valid Chart.js config                     | chart, c          |
| width           | integer            | 500          | no       | any positive integer                          | width, w          |
| height          | integer            | 300          | no       | any positive integer                          | height, h         |
| devicePixelRatio| integer            | 2            | no       | 1, 2                                          | devicePixelRatio  |
| backgroundColor | string             | transparent  | no       | rgb(...), #hex, hsl(...), named colors       | backgroundColor, bkg|
| version         | string             | 2.9.4        | no       | 2, 3, 4, valid Chart.js versions              | version, v        |
| format          | string             | png          | no       | png, webp, jpg, svg, pdf, base64              | format, f         |
| encoding        | string             | url          | no       | url, base64                                  | encoding          |

# 2. POST /chart Endpoint

Endpoint: https://quickchart.io/chart
Method: POST

Request Body (JSON):
```
{
  "version": "2",                // Chart.js version
  "backgroundColor": "transparent",
  "width": 500,
  "height": 300,
  "devicePixelRatio": 1.0,
  "format": "png",
  "chart": {...},                // string or ChartConfiguration object
  "key": "YOUR_API_KEY"      // optional
}
```

Type specification:
```
interface ChartRequest {
  width: string               // Pixel width
  height: string              // Pixel height
  devicePixelRatio: number    // 1 or 2
  format: string              // png, svg, webp
  backgroundColor: string     // any CSS color
  version: string             // Chart.js version
  key?: string                // API key
  chart: string | ChartConfiguration
}
```

# 3. Short URL Creation

Endpoint: https://quickchart.io/chart/create
Method: POST

Request Body: identical to POST /chart.
Response:
```
{
  "success": true,
  "url": "https://quickchart.io/chart/render/<uuid>"
}
```
Limitations:
- Activation delay: ~couple seconds globally
- Validation on render only
- Free short URLs expire in 3 days; paid expire in 6 months

# 4. Chart Templates

Use any short URL as template: append query parameters:

| Parameter          | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| title              | Chart title                                                                 |
| labels             | Comma-separated labels for primary axis                                       |
| data1...dataN      | Comma-separated data values per dataset                                      |
| label1...labelN    | Comma-separated dataset labels                                               |
| backgroundColor1..N| Comma-separated dataset background colors                                    |
| borderColor1..N    | Comma-separated dataset border colors                                        |

Example: https://quickchart.io/chart/render/<id>?title=New%20Title&labels=Q1,Q2,Q3&data1=10,20,30

# 5. Troubleshooting

- URI Too Long (414): switch to POST or base64 encoding
- Syntax errors: URL-encode `chart` config or send as JSON string in POST
- Verify pixel dimensions: width*devicePixelRatio and height*devicePixelRatio

# 6. Attribution

© Alioth LLC, CEO Ian Webster
Contact: [email protected]


## Attribution
- Source: QuickChart Chart API
- URL: https://quickchart.io/documentation
- License: Unknown
- Crawl Date: 2025-05-12T03:37:22.839Z
- Data Size: 557282 bytes
- Links Found: 2160

## Retrieved
2025-05-12
