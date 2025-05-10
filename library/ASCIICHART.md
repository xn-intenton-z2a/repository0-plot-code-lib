# ASCIICHART

## Crawl Summary
asciichart.plot(series,config) produces console ASCII line charts. series: number[] or number[][]. config options: offset (number,min2,default3), padding (string,default7-space), height (number or auto), format (function(x,i):string), colors (ANSI codes array). Returns string containing chart. Supports NodeJS (require) and browsers (<script>). Multiple series overlaid with per-series colors. Auto-range computes min/max. Scale to height rescales to ±height/2. Color constants: asciichart.blue, green, default, red, yellow, magenta, cyan. Troubleshoot by checking ANSI support and adjusting offset/padding.

## Normalised Extract
Table of Contents

1 Installation
2 API Method Signature
3 Configuration Options
4 Usage Examples
5 Color Constants
6 Troubleshooting

1 Installation
Install via npm: npm install asciichart
Include in browser: <script src="asciichart.js"></script>

2 API Method Signature
Function plot(series, config) => string
Arguments:
  series: array of numbers or array of number arrays
  config: object{
    offset: number (min 2)
    padding: string
    height: number
    format: function(x,i) returns string
    colors: array of ANSI code strings
  }

3 Configuration Options
offset: axis left margin, default 3
padding: label padding, default seven spaces
height: chart height in lines, default auto range
format: label formatter, default right-pad to padding length
colors: per-series ANSI color array, default single series default color

4 Usage Examples
Basic:
  plot([15*sin series])
Scale Height:
  plot(series,{height:6})
Auto-range:
  plot(seriesWithoutConfig)
Multi-series:
  plot([seriesA,seriesB],config)
Colored series:
  config.colors=[blue,green,default]

5 Color Constants
blue '\u001b[34m'
green '\u001b[32m'
default '\u001b[39m'
red, yellow, magenta, cyan exist

6 Troubleshooting
- No colors: verify ANSI in terminal
- Labels misaligned: increase offset >=2 or padding length

## Supplementary Details
Default config values:
  offset=3; padding='       ' (7 spaces); height=auto; format(x,i) => (padding + x.toFixed(2)).slice(-padding.length); colors=[default ANSI code]

Browser include path: 'node_modules/asciichart/dist/asciichart.js' or CDN link

Node import: const asciichart = require('asciichart')

Implementation steps:
1 npm install
2 require or include script
3 prepare data array(s) of numbers
4 call plot with optional config
5 output string via console.log

Environment: NodeJS >=6 or any browser supporting ES5

Limitations: series length defines width; Unicode fixed-width font required

## Reference Details
API Specification
---------------
Function plot(series:number[]|number[][], config?:{
  offset?:number; // axis offset from left margin; minimum 2; default 3
  padding?:string; // label formatting pad; default '       ' (7 spaces)
  height?:number; // chart height in terminal lines; default auto-range
  format?:function(x:number,i:number):string; // label formatter; default: right-align to padding length
  colors?:string[]; // ANSI codes per series; default [asciichart.default]
}):string

Color Constants:
  asciichart.blue    = '\u001b[34m'
  asciichart.green   = '\u001b[32m'
  asciichart.red     = '\u001b[31m'
  asciichart.yellow  = '\u001b[33m'
  asciichart.magenta = '\u001b[35m'
  asciichart.cyan    = '\u001b[36m'
  asciichart.default = '\u001b[39m'

Examples:
-----------
// Basic single series
var data = Array(120).fill(0).map((_,i)=>Math.sin(i/10));
console.log(asciichart.plot(data));

// With height and offset
var cfg={height:8,offset:4,padding:'    '};
console.log(asciichart.plot(data,cfg));

// Multi-series with colors
var a=data; var b=data.map(v=>v*0.5);
var cfg2={colors:[asciichart.blue,asciichart.red]};
console.log(asciichart.plot([a,b],cfg2));

Best Practices:
 - Use offset>=2 to prevent labels truncation
 - Override format to customize numeric precision: format:(x,i)=>(' '+x.toFixed(1)).slice(-4)
 - For dynamic data, call plot on full series array to ensure accurate scaling

Troubleshooting:
- No ANSI colors: run in bash or supported terminal; test with console.log(asciichart.blue+'text'+asciichart.default)
- Inconsistent scaling: ensure data array contains no NaN or non-numeric values; validate before plotting

CLI Commands:
# Install
npm install asciichart
# Test chart output
node -e "console.log(require('asciichart').plot([0,1,2,3,2,1,0]));"

Expected output:
0.00─╮      
     │  . . 
     │ .   .
 1.00╭     .


## Information Dense Extract
plot(series:number[]|number[][],config?){offset=3,min2;pading='       ';height=auto;format=(x,i)=>pad+x.toFixed(2).slice(-pad.length);colors=[default];return string}
Color constants: blue:'\u001b[34m',green:'\u001b[32m',red,yellow,magenta,cyan,default:'\u001b[39m'
Usage: require('asciichart').plot(data[,config]) or include asciichart.js
Examples: plot(data); plot(data,{height:6}); plot([a,b],{colors:[blue,green]})
Best practices: offset>=2, override format for precision
Troubleshoot: ensure ANSI support, validate numeric arrays

## Sanitised Extract
Table of Contents

1 Installation
2 API Method Signature
3 Configuration Options
4 Usage Examples
5 Color Constants
6 Troubleshooting

1 Installation
Install via npm: npm install asciichart
Include in browser: <script src='asciichart.js'></script>

2 API Method Signature
Function plot(series, config) => string
Arguments:
  series: array of numbers or array of number arrays
  config: object{
    offset: number (min 2)
    padding: string
    height: number
    format: function(x,i) returns string
    colors: array of ANSI code strings
  }

3 Configuration Options
offset: axis left margin, default 3
padding: label padding, default seven spaces
height: chart height in lines, default auto range
format: label formatter, default right-pad to padding length
colors: per-series ANSI color array, default single series default color

4 Usage Examples
Basic:
  plot([15*sin series])
Scale Height:
  plot(series,{height:6})
Auto-range:
  plot(seriesWithoutConfig)
Multi-series:
  plot([seriesA,seriesB],config)
Colored series:
  config.colors=[blue,green,default]

5 Color Constants
blue ''u001b[34m'
green ''u001b[32m'
default ''u001b[39m'
red, yellow, magenta, cyan exist

6 Troubleshooting
- No colors: verify ANSI in terminal
- Labels misaligned: increase offset >=2 or padding length

## Original Source
asciichart: ASCII Charts in JavaScript
https://github.com/kroitor/asciichart

## Digest of ASCIICHART

# asciichart
Date retrieved: 2024-06-20

# Installation

**NodeJS**
```bash
npm install asciichart
```  
**Browser**  
Download or reference `asciichart.js` from npm or GitHub CDN.

# Usage in NodeJS

```javascript
var asciichart = require('asciichart')
var s0 = new Array(120)
for (var i = 0; i < 120; i++)
    s0[i] = 15 * Math.sin(i * ((Math.PI * 4) / 120))
console.log(asciichart.plot(s0))
```

# Usage in Browsers

```html
<script src="asciichart.js"></script>
<script>
 var s0 = Array(120).fill(0).map((_,i)=>15*Math.sin(i*((Math.PI*4)/120)));  
 console.log(asciichart.plot(s0));
</script>
```

# plot Function Signature

> `plot(series, config)`  
- `series`: number[] or number[][]  
- `config` (optional): object with keys `offset`, `padding`, `height`, `format`, `colors`
- Returns: string (ASCII chart)

# Config Options

| Option   | Type                  | Default         | Description                                |
|----------|-----------------------|-----------------|--------------------------------------------|
| offset   | number                | 3               | axis offset from left (min 2)              |
| padding  | string                | '       ' (7)   | label formatting padding string            |
| height   | number                | automatically   | chart height in lines                      |
| format   | function(x,i):string  | default format  | label formatter: returns padded string     |
| colors   | array of ANSI strings | [default]       | per-series ANSI color codes                |

# Examples

## Scale To Desired Height
```javascript
var data = Array(120).fill(0).map((_,i)=>15*Math.cos(i*((Math.PI*8)/120)));  
console.log(asciichart.plot(data,{height:6}));
```

## Auto-range
```javascript
var r = Array(120); r[0]=Math.round(Math.random()*15);
for(var i=1;i<120;i++) r[i]=r[i-1]+Math.round(Math.random()*(Math.random()>0.5?2:-2));
console.log(asciichart.plot(r));
```

## Multiple Series
```javascript
var a=..., b=...; console.log(asciichart.plot([a,b]));
```

## Colors
```javascript
var cfg={colors:[asciichart.blue,asciichart.green,asciichart.default,undefined]};
console.log(asciichart.plot([a,b,c,d],cfg));
```

# Color Constants

- asciichart.blue    : '\u001b[34m'
- asciichart.green   : '\u001b[32m'
- asciichart.default : '\u001b[39m'
- asciichart.red, .yellow, .magenta, .cyan similarly defined

# Troubleshooting

- Ensure terminal supports ANSI: test with `console.log(asciichart.blue + '*' + asciichart.default)`
- If labels overlap, increase `offset` >= 2 or adjust `padding`

----

Attribution: kroitor/asciichart (MIT)
Data Size: 733117 bytes

## Attribution
- Source: asciichart: ASCII Charts in JavaScript
- URL: https://github.com/kroitor/asciichart
- License: MIT
- Crawl Date: 2025-05-10T18:03:01.954Z
- Data Size: 733117 bytes
- Links Found: 5678

## Retrieved
2025-05-10
