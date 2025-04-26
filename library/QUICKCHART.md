# QUICKCHART

## Crawl Summary
GET and POST /chart endpoints accept chart config plus width,height,devicePixelRatio,backgroundColor,version,format,encoding. JSON POST uses payload schema with chart as string or object. Short URL creation via POST /chart/create returns {success,url}. Templates parameterize title, labels, dataN,labelN,backgroundColorN,borderColorN. Iframe endpoint /chart-maker/view/{id}. Expiration: free=3 days, paid=6 months.

## Normalised Extract
Table of Contents
1  GET /chart Endpoint Parameters
2  POST /chart Payload Specification
3  /chart/create Short URL Response
4  Template Parameter Overrides
5  Iframe Embed URL
6  Expiration Rules

1  GET /chart Endpoint Parameters
  name                type        default   accepted values   description
  chart (or c)        string      —         JSON or JS object  required JS/JSON Chart.js configuration
  width (or w)        integer     500       any positive      image width in pixels
  height (or h)       integer     300       any positive      image height in pixels
  devicePixelRatio    integer     2         1 or 2            multiplies width and height
  backgroundColor     string      transparent rgb(),hex,hsl,name canvas background
  version (or v)      string      2.9.4     any valid version Chart.js version to use
  format (or f)       string      png       png,webp,jpg,svg,pdf,base64 output format
  encoding            string      url       url,base64        chart parameter encoding

2  POST /chart Payload Specification
  JSON body fields:
    width           string             pixel width
    height          string             pixel height
    devicePixelRatio number            pixel ratio
    format          string             png,svg,webp
    backgroundColor string             canvas background
    version         string             Chart.js version
    key             string (optional)  API key
    chart           string|object      Chart.js configuration; string for JS functions

3  /chart/create Short URL Response
  Request: POST same body as POST /chart
  Response JSON:
    success boolean
    url     string short URL to /chart/render/{id}

4  Template Parameter Overrides
  query parameters: title, labels, data1…dataN, label1…labelN, backgroundColor1…N, borderColor1…N
  values: comma-separated or JSON list, numbers or (x,y) objects

5  Iframe Embed URL
  format: https://quickchart.io/chart-maker/view/{short-id}
  embed as HTML iframe with width,height

6  Expiration Rules
  free API charts expire after 3 days
  professional API charts expire after 6 months

## Supplementary Details
URL construction recommendations: URL-encode chart parameter or use base64 encoding. For GET, watch out for URL length limits; use POST for large configs. To include JS functions in chart config, wrap function code in string. Supported color formats: rgb(r,g,b), hex (#rrggbb URL-encoded), hsl(h,s%,l%), named colors. devicePixelRatio multiplies requested width and height. BackgroundColor parameter accepts both 'backgroundColor' and 'bkg'. Version parameter accepts Chart.js major versions '2','3','4' or full semver. Format parameter alias 'f'. Encoding parameter alias 'encoding'.

## Reference Details
GET /chart
Request: HTTP GET https://quickchart.io/chart?width={int}&height={int}&devicePixelRatio={int}&backgroundColor={string}&version={string}&format={string}&encoding={string}&chart={urlencoded JSON or JS}
Response: Image binary (content-type matching format) or JSON when encoding=base64

POST /chart
Request: HTTP POST https://quickchart.io/chart
Headers: Content-Type: application/json
Body: {
  width: string;             // pixel width
  height: string;            // pixel height
  devicePixelRatio: number;  // 1 or 2
  format: string;            // png,svg,webp
  backgroundColor: string;   // transparent, rgb(), hex, hsl, name
  version: string;           // Chart.js version
  key?: string;              // your API key if required
  chart: string | ChartConfiguration; // JSON object or JS code string
}
Response: image binary (png/svg/webp) or JSON when format=base64

POST /chart/create
Request and payload identical to POST /chart
Response JSON:
  success: true | false
  url: https://quickchart.io/chart/render/{uuid}

ChartConfiguration Type (TypeScript):
interface ChartConfiguration {
  type: string;
  data: { labels: (string|number)[]; datasets: { label: string; data: number[] }[] };
  options?: object;
}

Code Examples:
1  GET with curl
curl "https://quickchart.io/chart?width=600&height=400&chart={type:'line',data:{labels:['A','B'],datasets:[{label:'X',data:[1,2]}]}}"
2  POST with Python
import requests
payload={
  'width':'600', 'height':'400','devicePixelRatio':2,
  'format':'png','backgroundColor':'white','version':'4',
  'chart':{ 'type':'bar','data':{ 'labels':['Q1','Q2'], 'datasets':[{'label':'S','data':[3,5]}] } }
}
resp=requests.post('https://quickchart.io/chart',json=payload)
with open('chart.png','wb') as f: f.write(resp.content)

Best Practices:
• Use POST for configs >2000 characters
• URL-encode or base64 your chart parameter to avoid syntax errors
• Cache short URLs for repeated renders
• Set devicePixelRatio=1 when exact dimensions are required

Troubleshooting:
Command: curl -I "https://quickchart.io/chart?chart={}"
Expected: HTTP/1.1 400 Bad Request for empty chart
Error: URL length exceeded 414. Switch to POST or shorter config
If response 404 from short URL, check expiry period or payment plan

## Information Dense Extract
/chart GET parameters chart(js/json,required), width(int,500), height(int,300), devicePixelRatio(int,2), backgroundColor(string,transparent), version(string,2.9.4), format(string,png), encoding(string,url). /chart POST JSON body same keys plus optional key and chart as string|object. /chart/create returns {success:boolean,url:string}. Template overrides via query params title, labels, dataN, labelN, backgroundColorN, borderColorN. Iframe URL /chart-maker/view/{id}. Expiration free=3d, paid=6mo.

## Sanitised Extract
Table of Contents
1  GET /chart Endpoint Parameters
2  POST /chart Payload Specification
3  /chart/create Short URL Response
4  Template Parameter Overrides
5  Iframe Embed URL
6  Expiration Rules

1  GET /chart Endpoint Parameters
  name                type        default   accepted values   description
  chart (or c)        string               JSON or JS object  required JS/JSON Chart.js configuration
  width (or w)        integer     500       any positive      image width in pixels
  height (or h)       integer     300       any positive      image height in pixels
  devicePixelRatio    integer     2         1 or 2            multiplies width and height
  backgroundColor     string      transparent rgb(),hex,hsl,name canvas background
  version (or v)      string      2.9.4     any valid version Chart.js version to use
  format (or f)       string      png       png,webp,jpg,svg,pdf,base64 output format
  encoding            string      url       url,base64        chart parameter encoding

2  POST /chart Payload Specification
  JSON body fields:
    width           string             pixel width
    height          string             pixel height
    devicePixelRatio number            pixel ratio
    format          string             png,svg,webp
    backgroundColor string             canvas background
    version         string             Chart.js version
    key             string (optional)  API key
    chart           string|object      Chart.js configuration; string for JS functions

3  /chart/create Short URL Response
  Request: POST same body as POST /chart
  Response JSON:
    success boolean
    url     string short URL to /chart/render/{id}

4  Template Parameter Overrides
  query parameters: title, labels, data1dataN, label1labelN, backgroundColor1N, borderColor1N
  values: comma-separated or JSON list, numbers or (x,y) objects

5  Iframe Embed URL
  format: https://quickchart.io/chart-maker/view/{short-id}
  embed as HTML iframe with width,height

6  Expiration Rules
  free API charts expire after 3 days
  professional API charts expire after 6 months

## Original Source
QuickChart (HTTP Chart Generation API)
https://quickchart.io/documentation/

## Digest of QUICKCHART

# QuickChart HTTP API
Data retrieved: 2024-06-20
Data size: 1400134 bytes

## 1. GET /chart Endpoint
Parameters:
  • chart (string, required): Chart.js configuration object in JS or JSON. Must be URL-encoded or base64.
  • width (integer, default=500): output image width in pixels.
  • height (integer, default=300): output image height in pixels.
  • devicePixelRatio (integer, accepted=1|2, default=2): multiplies width and height for retina support.
  • backgroundColor (string, default=transparent): canvas background in rgb(), hex, hsl or color name.
  • version (string, default=2.9.4): Chart.js version. Set to "4" for Chart.js v4.
  • format (string, default=png): output format png|webp|jpg|svg|pdf|base64.
  • encoding (string, default=url): chart config encoding url|base64.

## 2. POST /chart Endpoint
Request JSON payload:
  {
    width: string;
    height: string;
    devicePixelRatio: number;
    format: string;
    backgroundColor: string;
    version: string;
    key?: string;
    chart: string | ChartConfiguration;
  }
Tip: send chart as string if it contains JS functions.

## 3. POST /chart/create (Short URLs)
Endpoint accepts same JSON as POST /chart. Returns:
  {
    success: boolean;
    url: string;
  }
Limits: free expiry=3 days; paid expiry=6 months.

## 4. Short URL Templates
Append query parameters to short URL /chart/render/{id}:
  • title, labels, data1…dataN, label1…labelN, backgroundColor1…N, borderColor1…N.
Supports comma-separated lists and JSON values.

## 5. Iframe Integration
URL: /chart-maker/view/{id}
Embed with <iframe> of matching width/height.

## 6. Expiration and Limits
Free API charts expire in 3 days; professional API in 6 months. Expired requests return 404.

## Attribution
- Source: QuickChart (HTTP Chart Generation API)
- URL: https://quickchart.io/documentation/
- License: License
- Crawl Date: 2025-04-26T07:45:40.885Z
- Data Size: 1400134 bytes
- Links Found: 3627

## Retrieved
2025-04-26
