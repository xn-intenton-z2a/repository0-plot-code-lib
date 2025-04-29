# CHROMA_JS

## Crawl Summary
chroma.js supports comprehensive color manipulations including parsing from multiple formats (named, hex, numeric, RGB, object), conversion to various color spaces (HSL, HSV, Lab, Lch, HCL, OKLab, OKLch, CMYK, GL), and output in hex, CSS, and array formats. It provides methods for blending (mix, average, blend), computing contrast ratios (WCAG, APCA), and generating color scales with options for domain, gamma, lightness correction, padding, and discrete classes. Cubehelix support is included with adjustable start, rotations, hue, gamma, and lightness parameters.

## Normalised Extract
TABLE OF CONTENTS:
1. Installation and Setup
2. Color Constructors and Input Formats
3. Color Space Conversions and Constructors
4. Color Manipulation Methods
5. Color Output Methods
6. Statistical and Comparison Functions
7. Scale and Palette Generation
8. Cubehelix Configuration

1. Installation and Setup:
- npm install chroma-js
- Import: import chroma from 'chroma-js'
- For browser use: download chroma.min.js or use unpkg.com link

2. Color Constructors and Input Formats:
- chroma(color): Auto-detects input such as 'hotpink', '#f39', 0xff3399, [255,51,153]
- Object input: chroma({ h:120, s:1, l:0.75 })
- Format validation: chroma.valid(color)

3. Color Space Conversions and Constructors:
- chroma.hsl(h, s, l): h in [0,360], s,l in [0,1]
- chroma.hsv, chroma.lab, chroma.lch, chroma.hcl, chroma.oklab, chroma.oklch
- chroma.cmyk(c, m, y, k): values in [0,1]
- chroma.gl(r, g, b, [alpha]): normalized 0..1
- chroma.temperature(K): Converts Kelvin to color

4. Color Manipulation Methods:
- alpha(a): Set/get opacity
- darken(value=1)/brighten(value=1): Adjust lightness
- saturate(value=1)/desaturate(value=1): Adjust saturation in Lch space
- set(channel, value): Change a channel (supports relative changes with '*')
- get(channel): Retrieve channel value
- luminance([lum, mode]): Get/set brightness (default mode 'rgb')
- mix(target, ratio=0.5, mode): Mix with another color
- shade(ratio, mode): Mix with black; tint(ratio, mode): Mix with white

5. Color Output Methods:
- hex(mode='auto|rgb|rgba|argb'): Returns hex string; 'auto' includes alpha if <1
- name(): Returns color name or hex if not available
- css(optionalSpace): Returns CSS representation in specified color space
- rgb(round=true)/rgba(round=true): Returns r, g, b[,a] array
- hsl(), hsv(), hsi(), lab(), lch(), hcl(), oklab(), oklch(): Returns arrays in respective spaces
- num(): Numeric representation of hex color
- gl(): Normalized RGB components
- clipped: Flag if value outside [0,255]

6. Statistical and Comparison Functions:
- contrast(color1, color2): WCAG contrast ratio
- contrastAPCA(text, background): APCA contrast ratio
- distance(color1, color2, mode='lab'): Euclidean distance in a given space
- deltaE(color1, color2, Kl=1, Kc=1, Kh=1): CIE2000 color difference

7. Scale and Palette Generation:
- chroma.scale(colors): Creates a color scale function
  - domain([min, max] or custom array): Specifies input values
  - mode('rgb'|'lab'|'lrgb'|'hsl'|'lch'): Sets interpolation method
  - gamma(factor): Adjusts midpoint brightness (default 1)
  - correctLightness(): Distributes lightness evenly
  - cache(true/false): Enable/disable caching
  - padding(value or [padStart, padEnd]): Crops gradient ends
  - colors(n, format): Retrieves n colors as hex or chroma objects
  - classes(number or array): Returns discrete color classes
  - nodata(color): Sets fallback for null inputs
- chroma.brewer: Predefined ColorBrewer palettes (e.g., OrRd, RdBu)
- chroma.bezier(colors): Bezier interpolation in Lab space; can be converted with .scale()

8. Cubehelix Configuration:
- chroma.cubehelix([start=300, rotations=-1.5, hue=1, gamma=1, lightness=[0,1]]): Generates a cubehelix scale
  - start(value): Starting hue angle
  - rotations(value): Number and direction (e.g., -1.5 for -540°)
  - hue(value): Fixed value or range
  - gamma(value): Gamma correction factor
  - lightness(range): Specifies lightness bounds (e.g., [0.3,0.8])
  - Use .scale() for conversion to chroma.scale design


## Supplementary Details
Installation:
- npm install chroma-js
- Import using ES6: import chroma from 'chroma-js'

Color Constructor Parameters:
- chroma(input) where input may be string (e.g., 'hotpink', '#ff3399', 'F39'), number (e.g., 0xff3399 or between 0 and 16777215), array ([255,51,153]), object with keys (e.g., { h: 120, s: 1, l: 0.75 })

Method Defaults and Parameter Values:
- darken/brighten/saturate/desaturate: default value = 1 if not provided
- mix: default ratio = 0.5, mode = 'lrgb'
- hex: default mode = 'auto'; to force exclusion of alpha use hex('rgb')
- scale functions: default domain is [0,1]; gamma default is 1, caching enabled by default

Cubehelix Defaults:
- start = 300, rotations = -1.5, hue = 1, gamma = 1, lightness = [0,1]

Example Implementation Patterns:
- Reading and Manipulating Colors:
  color = chroma('pink')
  modified = color.darken(2).saturate(2)
  hexValue = modified.hex()

- Generating a Color Scale:
  scale = chroma.scale(['yellow', 'navy']).domain([0,100]).mode('lab').gamma(1.2)
  colorsArray = scale.colors(5)

- Using Cubehelix:
  chCube = chroma.cubehelix().start(200).rotations(-0.5).gamma(0.8).lightness([0.3,0.8]).scale()
  palette = chCube.colors(5)


## Reference Details
API Specifications:
1. chroma(input: string | number | number[] | object): Color
   - Auto-detects input format; throws Error if parsing fails
   Examples:
      chroma('hotpink')
      chroma('#ff3399')
      chroma(0xff3399)
      chroma([255,51,153])
      chroma({ h: 120, s: 1, l: 0.75 })

2. chroma.hsl(h: number, s: number, l: number): Color
   - h in [0,360], s and l in [0,1]

3. chroma.mix(color1: Color|string, color2: Color|string, ratio?: number, mode?: string): Color
   - ratio default 0.5; mode options: 'lrgb', 'rgb', 'hsl', 'lab', 'lch'

4. Color Methods:
   - alpha(a?: number): number | Color (setter returns new Color)
   - darken(value?: number = 1): Color
   - brighten(value?: number = 1): Color
   - saturate(value?: number = 1): Color
   - desaturate(value?: number = 1): Color
   - set(channel: string, value: number | string): Color
       Example: set('hsl.h', 0) to set hue to 0
   - get(channel: string): number
   - luminance(lum?: number, mode?: string = 'rgb'): number | Color
   - hex(mode?: 'auto' | 'rgb' | 'rgba' | 'argb'): string
   - css(colorSpace?: string): string
   - rgb(round?: boolean = true): number[]
   - rgba(round?: boolean = true): number[]
   - lab(): number[]
   - lch(): number[]
   - hcl(): number[]
   - oklab(): number[]
   - oklch(): number[]
   - num(): number
   - gl(): number[]
   - clipped: boolean

5. Scale API:
   let scale = chroma.scale(colors: string[] | Color[])
       scale.domain(domain: number[]): Scale
       scale.mode(mode: string): Scale
       scale.gamma(factor: number): Scale
       scale.correctLightness(): Scale
       scale.cache(flag: boolean): Scale
       scale.padding(pad: number | [number, number]): Scale
       scale.colors(n: number, format?: string): string[] | Color[]
       scale.classes(classes: number | number[]): Scale
       scale.nodata(color: string): Scale

6. Cubehelix API:
   let cubehelix = chroma.cubehelix(start?: number, rotations?: number, hue?: number, gamma?: number, lightness?: [number, number])
       cubehelix.start(value: number): Cubehelix
       cubehelix.rotations(value: number): Cubehelix
       cubehelix.hue(value: number | [number, number]): Cubehelix
       cubehelix.gamma(value: number): Cubehelix
       cubehelix.lightness(range: [number, number]): Cubehelix
       cubehelix.scale(): Scale

Code Examples:
// Example: Read, manipulate and output a color
var color = chroma('pink');
var darkened = color.darken(2).saturate(2);
var hexCode = darkened.hex(); // e.g. "#d81b60"

// Example: Generate a 5-color palette using a chroma scale
var palette = chroma.scale(['yellow', 'navy']).domain([0,100]).mode('lab').gamma(1.2).colors(5);

// Example: Cubehelix scale generation
var cubeScale = chroma.cubehelix().start(200).rotations(-0.5).gamma(0.8).lightness([0.3, 0.8]).scale();
var cubePalette = cubeScale.colors(5);

Troubleshooting Procedures:
- If a color fails to parse, use chroma.valid(color) to validate inputs.
- For incorrect interpolation results, adjust scale.mode() to 'lab' or 'lrgb'.
- Verify alpha handling using hex('rgb') if undesired alpha in output.
- Check white point settings with chroma.setLabWhitePoint(whitePoint) when using Lab/Lch conversions.

Configuration Options:
- Scale default domain: [0,1]
- Gamma default: 1
- Cubehelix defaults: start=300, rotations=-1.5, hue=1, gamma=1, lightness=[0,1]

Return Types:
All color transformation methods return a new Color instance; scale methods return Scale instance; cubehelix methods return Cubehelix instance, convertible to Scale.

## Information Dense Extract
chroma(input): accepts string ('hotpink', '#f39'), number (0xff3399), array ([255,51,153]), object ({h:120,s:1,l:0.75}); chroma.valid(input): boolean; Constructors: chroma.hsl(h,s,l), chroma.hsv, lab, lch, hcl, oklab, oklch, cmyk, gl, temperature(K); Methods: alpha(a), darken(1), brighten(1), saturate(1), desaturate(1), set('channel', value), get('channel'), luminance(lum, 'rgb'), mix(target,0.5,'lrgb'), shade(ratio), tint(ratio), hex('auto'|'rgb'|'rgba'|'argb'), name(), css(cs), rgb(true), rgba(true), hsl(), hsv(), hsi(), lab(), lch(), hcl(), oklab(), oklch(), num(), gl(), clipped; Scale: chroma.scale(colors), domain([min,max]), mode('rgb'|'lab'|'lrgb'|'hsl'|'lch'), gamma(1), correctLightness(), cache(true), padding(pad), colors(n,'hex'|null), classes(n or array), nodata(color); Cubehelix: chroma.cubehelix(start=300,rotations=-1.5,hue=1,gamma=1,lightness=[0,1]), methods: start(val), rotations(val), hue(val), gamma(val), lightness(range), scale(); API returns new Color; scale functions return Scale objects; troubleshooting: use chroma.valid, adjust scale.mode, use hex('rgb') for alpha control.

## Sanitised Extract
TABLE OF CONTENTS:
1. Installation and Setup
2. Color Constructors and Input Formats
3. Color Space Conversions and Constructors
4. Color Manipulation Methods
5. Color Output Methods
6. Statistical and Comparison Functions
7. Scale and Palette Generation
8. Cubehelix Configuration

1. Installation and Setup:
- npm install chroma-js
- Import: import chroma from 'chroma-js'
- For browser use: download chroma.min.js or use unpkg.com link

2. Color Constructors and Input Formats:
- chroma(color): Auto-detects input such as 'hotpink', '#f39', 0xff3399, [255,51,153]
- Object input: chroma({ h:120, s:1, l:0.75 })
- Format validation: chroma.valid(color)

3. Color Space Conversions and Constructors:
- chroma.hsl(h, s, l): h in [0,360], s,l in [0,1]
- chroma.hsv, chroma.lab, chroma.lch, chroma.hcl, chroma.oklab, chroma.oklch
- chroma.cmyk(c, m, y, k): values in [0,1]
- chroma.gl(r, g, b, [alpha]): normalized 0..1
- chroma.temperature(K): Converts Kelvin to color

4. Color Manipulation Methods:
- alpha(a): Set/get opacity
- darken(value=1)/brighten(value=1): Adjust lightness
- saturate(value=1)/desaturate(value=1): Adjust saturation in Lch space
- set(channel, value): Change a channel (supports relative changes with '*')
- get(channel): Retrieve channel value
- luminance([lum, mode]): Get/set brightness (default mode 'rgb')
- mix(target, ratio=0.5, mode): Mix with another color
- shade(ratio, mode): Mix with black; tint(ratio, mode): Mix with white

5. Color Output Methods:
- hex(mode='auto|rgb|rgba|argb'): Returns hex string; 'auto' includes alpha if <1
- name(): Returns color name or hex if not available
- css(optionalSpace): Returns CSS representation in specified color space
- rgb(round=true)/rgba(round=true): Returns r, g, b[,a] array
- hsl(), hsv(), hsi(), lab(), lch(), hcl(), oklab(), oklch(): Returns arrays in respective spaces
- num(): Numeric representation of hex color
- gl(): Normalized RGB components
- clipped: Flag if value outside [0,255]

6. Statistical and Comparison Functions:
- contrast(color1, color2): WCAG contrast ratio
- contrastAPCA(text, background): APCA contrast ratio
- distance(color1, color2, mode='lab'): Euclidean distance in a given space
- deltaE(color1, color2, Kl=1, Kc=1, Kh=1): CIE2000 color difference

7. Scale and Palette Generation:
- chroma.scale(colors): Creates a color scale function
  - domain([min, max] or custom array): Specifies input values
  - mode('rgb'|'lab'|'lrgb'|'hsl'|'lch'): Sets interpolation method
  - gamma(factor): Adjusts midpoint brightness (default 1)
  - correctLightness(): Distributes lightness evenly
  - cache(true/false): Enable/disable caching
  - padding(value or [padStart, padEnd]): Crops gradient ends
  - colors(n, format): Retrieves n colors as hex or chroma objects
  - classes(number or array): Returns discrete color classes
  - nodata(color): Sets fallback for null inputs
- chroma.brewer: Predefined ColorBrewer palettes (e.g., OrRd, RdBu)
- chroma.bezier(colors): Bezier interpolation in Lab space; can be converted with .scale()

8. Cubehelix Configuration:
- chroma.cubehelix([start=300, rotations=-1.5, hue=1, gamma=1, lightness=[0,1]]): Generates a cubehelix scale
  - start(value): Starting hue angle
  - rotations(value): Number and direction (e.g., -1.5 for -540)
  - hue(value): Fixed value or range
  - gamma(value): Gamma correction factor
  - lightness(range): Specifies lightness bounds (e.g., [0.3,0.8])
  - Use .scale() for conversion to chroma.scale design

## Original Source
Chroma.js Documentation
https://gka.github.io/chroma.js/

## Digest of CHROMA_JS

# chroma.js Documentation Digest

Retrieved Date: 2023-10-xx

## Overview
chroma.js is a zero-dependency JavaScript library (13.5kB) providing extensive functionality for color conversion, manipulation, interpolation, and scale generation. It supports multiple color input formats (named colors, hex strings, numbers, RGB arrays, and objects) and output formats (hex, CSS strings, rgb arrays) across various color spaces.

## Installation
- Node.js: npm install chroma-js
- Import using: import chroma from 'chroma-js';
- For tree shaking: import specific modules e.g., import deltaE from 'chroma-js/src/utils/deltaE.js'
- Browser: use chroma.min.js or hosted version on unpkg.com

## API Functions and Methods

### Color Constructors and Parsing
- chroma(color): Automatically detects input formats (e.g. 'hotpink', '#f39', 0xff3399, [255,51,153])
- chroma(h, s, l, 'hsl') for HSL creation
- chroma({h:120, s:1, l:0.75}) and other color space objects
- chroma.valid(color): Returns boolean if color is parsed

### Color Space Constructors
- chroma.hsl(h, s, l): h in [0,360], s, l in [0,1]
- chroma.hsv(h, s, v)
- chroma.lab(l, a, b)
- chroma.lch(l, c, h): l roughly 0..100-150, hue in 0..360
- chroma.hcl(h, c, l): same as lch with order reversed
- chroma.oklab(l, a, b)
- chroma.oklch(l, c, h)
- chroma.cmyk(c, m, y, k): values between 0 and 1
- chroma.gl(r, g, b, [alpha]): channels normalized to 0..1
- chroma.temperature(K): Returns color from temperature in Kelvin

### Color Manipulation Methods
- alpha(a): Get/set the opacity
- darken(value=1) and brighten(value=1)
- saturate(value=1) and desaturate(value=1)
- set(channel, value): Change individual channel (supports relative changes with * operator)
- get(channel): Retrieve specific channel value
- luminance([lum, mode='rgb']): Get or set WCAG relative brightness
- mix(targetColor, ratio=0.5, mode='lrgb'): Mixes two colors
- shade(ratio, mode): Mixes with black
- tint(ratio, mode): Mixes with white

### Color Output Methods
- hex(mode='auto|rgb|rgba|argb'): Returns hexadecimal string representation; alpha included if < 1 in 'auto' mode
- name(): Returns named color if available, otherwise hex string
- css([colorSpace]): Returns CSS string in formats such as rgb, hsl, lab, etc.
- rgb(round=true) and rgba(round=true): Returns array of channel values
- hsl(), hsv(), hsi(), lab(), lch(), hcl(), oklab(), oklch(): Returns respective color space arrays
- num(): Returns numeric representation of hex RGB color
- gl(): Returns normalized RGB
- clipped: Indicates if RGB value is clipped and _rgb._unclipped for unclipped values

### Color Comparison and Statistical Methods
- contrast(color1, color2): WCAG contrast ratio
- contrastAPCA(text, background): APCA contrast ratio
- distance(color1, color2, mode='lab'): Euclidean distance in a color space
- deltaE(color1, color2, Kl=1, Kc=1, Kh=1): CIE 2000 color difference metric

### Scales and Palettes
- chroma.scale(colors): Returns a scale function mapping 0..1 to a color gradient
  - domain(domainArray): Set the input domain
  - mode(mode): Set interpolation method (e.g., rgb, lab, lrgb, hsl, lch)
  - gamma(factor): Gamma correction with default 1
  - correctLightness(): Adjust gradient for even lightness
  - cache(true/false): Cache computed colors
  - padding(number or [start, end]): Adjust gradient endpoints
  - colors(n, format='hex' or null): Returns array of n colors; if format is null, returns chroma objects
  - classes(n or array): Return discrete classes from scale
  - nodata(color): Set fallback color for null inputs
- chroma.brewer: Collection of ColorBrewer palettes (e.g., OrRd, RdBu, etc.)
- chroma.bezier(colors): Returns function for bezier color interpolation in Lab space

### Cubehelix
- chroma.cubehelix([start=300, rotations=-1.5, hue=1, gamma=1, lightness=[0,1]]): Configures a cubehelix color scale
  - start(value): Starting hue angle
  - rotations(value): Number and direction of rotations
  - hue(value): Controls saturation (can be a range)
  - gamma(value): Gamma correction factor
  - lightness(range): Lightness range; can be reversed
  - scale(): Converts cubehelix function into chroma scale instance

## Changelog Highlights
- Version changes include API adjustments such as addition of color.shade, color.tint, and support for modern CSS color spaces.
- Use of setLabWhitePoint and getLabWhitePoint to manage the D65, D50, etc. white reference points for Lab conversions.


## Attribution
- Source: Chroma.js Documentation
- URL: https://gka.github.io/chroma.js/
- License: MIT License
- Crawl Date: 2025-04-29T09:50:23.226Z
- Data Size: 803296 bytes
- Links Found: 80

## Retrieved
2025-04-29
