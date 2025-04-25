# TRANSFORM_UNITS

## Crawl Summary
Section 8: Defines transform-list syntax: matrix(a b c d e f), translate, scale, rotate, skewX/Y. viewBox attribute as four numbers: min-x, min-y, width>0, height>0. preserveAspectRatio options: none or align[ meet|slice ], align values for nine positions, default xMidYMid meet. Viewport transform computation: scale factors, alignment translation, combined matrix. Units: absolute and relative units with conversions.

## Normalised Extract
Table of Contents
1. Transform Property Syntax
2. viewBox Attribute Syntax
3. preserveAspectRatio Attribute Syntax and Defaults
4. Viewport to User Coordinate Transform Computation
5. Units and Conversions

1. Transform Property Syntax
transform-list := transform ( ws? [,]? ws? transform )*
transform :=
  matrix(a b c d e f)
  translate(tx [ , ty ])
  scale(sx [ , sy ])
  rotate(angle [ , cx , cy ])
  skewX(angle)
  skewY(angle)
Parameters: a,b,c,d,e,f, tx,ty, sx,sy, angle, cx,cy are XML <number> (floating-point, optional leading sign, no units). Comma or whitespace separated.
Semantics:
  matrix: sets 2D affine transformation matrix [ a c e; b d f; 0 0 1 ]
  translate: equivalent to matrix(1 0 0 1 tx ty)
  scale: matrix(sx 0 0 sy 0 0), sy defaults to sx
  rotate: rotation around origin or point (cx,cy)
  skewX/Y: horizontal/vertical shear by tan(angle)

2. viewBox Attribute Syntax
viewBox = min-x min-y width height
min-x, min-y, width, height: XML <number>, width>0, height>0
Defines user coordinate subregion mapped to viewport.

3. preserveAspectRatio Attribute Syntax and Defaults
Syntax: [defer]? ( none | align [ meetOrSlice ] )
align values: xMinYMin, xMidYMin, xMaxYMin, xMinYMid, xMidYMid, xMaxYMid, xMinYMax, xMidYMax, xMaxYMax
meetOrSlice: meet (default) or slice
Default: xMidYMid meet
none: no uniform scaling, independent axis scaling

4. Viewport to User Coordinate Transform Computation
Given viewportSize (vw, vh), viewBox(vx, vy, vbw, vbh), preserveAspectRatio(p):
  sx = vw / vbw; sy = vh / vbh
  if p.align != none:
    if p.meetOrSlice == meet: s = min(sx, sy)
    else s = max(sx, sy)
    tx = alignmentX(vw, vbw*s, p.align)
    ty = alignmentY(vh, vbh*s, p.align)
    m = translate(tx, ty) * scale(s,s) * translate(-vx, -vy)
  else:
    m = translate(-vx*sx, -vy*sy) * scale(sx, sy)

alignmentX(viewportWidth, contentWidth, alignX):
  alignX=Min: 0; Mid: (viewportWidth - contentWidth)/2; Max: viewportWidth - contentWidth
similarly alignmentY.

5. Units and Conversions
Absolute:
  1in = 96px; 1cm = 96px/2.54; 1mm = 1cm/10; 1pt = 1/72in; 1pc = 12pt
Relative:
  percentages of current reference; em, ex relative to font-size; viewport units: vw, vh, vmin, vmax
Usage: numbers with unit suffix or unitless numbers default to px in attributes.

## Supplementary Details
Default behaviors and edge cases:

- Missing viewBox: user units equal to viewport units; no scaling.
- preserveAspectRatio default on absent attribute: xMidYMid meet.
- float precision: implementations should use at least 1e-6 accuracy.
- At-risk feature: vector-effect non-scaling-stroke should preserve stroke width.

Implementation steps in rendering engines:
1. Parse viewBox attribute into four floats.
2. Parse preserveAspectRatio tokens.
3. Compute sx, sy.
4. Determine uniform scale s and translation tx, ty.
5. Compose transformation matrix in order: translate, scale, translate.
6. Apply resulting matrix to all descendant coordinate inputs.
7. Handle 'defer' by delaying application to nested viewBoxes.

Handling units:
1. Parse numeric value and unit suffix.
2. Convert to user units (px) using conversion factors.
3. Default unitless numbers in transform and geometry attributes to px.


## Reference Details
DOM API for transforms:

interface SVGAnimatedTransformList {
  readonly attribute SVGTransformList baseVal;
  readonly attribute SVGTransformList animVal;
}

interface SVGTransformList {
  readonly attribute unsigned long numberOfItems;
  SVGTransform     getItem(unsigned long index);
  SVGTransform     insertItemBefore(SVGTransform newItem, unsigned long index);
  SVGTransform     replaceItem(SVGTransform newItem, unsigned long index);
  SVGTransform     removeItem(unsigned long index);
  SVGTransform     appendItem(SVGTransform newItem);
  SVGTransform     createSVGTransformFromMatrix(SVGMatrix matrix);
  SVGTransform     createSVGTransform();
}

interface SVGTransform {
  readonly attribute unsigned short type;
  readonly attribute SVGMatrix matrix;
  float                 angle;
  void  setMatrix(SVGMatrix matrix);
  void  setTranslate(float tx, float ty);
  void  setScale(float sx, float sy);
  void  setRotate(float angle, float cx, float cy);
  void  setSkewX(float angle);
  void  setSkewY(float angle);
}
Constants for SVGTransform.type:
  SVG_TRANSFORM_UNKNOWN = 0;
  SVG_TRANSFORM_MATRIX = 1;
  SVG_TRANSFORM_TRANSLATE = 2;
  SVG_TRANSFORM_SCALE = 3;
  SVG_TRANSFORM_ROTATE = 4;
  SVG_TRANSFORM_SKEWX = 5;
  SVG_TRANSFORM_SKEWY = 6;

Example: scale origin of <rect> by 2
const svgNS = 'http://www.w3.org/2000/svg';
let rect = document.querySelector('rect');
let transforms = rect.transform.baseVal;
let svgRoot = document.documentElement;
let scaleTransform = svgRoot.createSVGTransform();
scaleTransform.setTranslate(50,50);
transforms.appendItem(scaleTransform);
scaleTransform = svgRoot.createSVGTransform();
scaleTransform.setScale(2,2);
transforms.appendItem(scaleTransform);
scaleTransform = svgRoot.createSVGTransform();
scaleTransform.setTranslate(-50,-50);
transforms.appendItem(scaleTransform);

SVG attribute examples:
<svg width="200" height="200" viewBox="0 0 100 100" preserveAspectRatio="xMinYMin slice">
  <circle cx="50" cy="50" r="40" transform="rotate(45 50 50) scale(1.2) translate(10,0)"/>
</svg>

Configuration options and effects:
- viewBox width,height <=0: invalid value, ignore attribute.
- preserveAspectRatio 'none' allows non-uniform sx,sy.
- defer flag: apply preserveAspectRatio only to outermost viewBox.

Best practices:
- Always include viewBox when scaling SVG for responsive layouts.
- Use preserveAspectRatio="xMidYMid meet" for centered uniform scaling.
- Combine transform origin adjustments via translate(…) around scale/rotate.

Troubleshooting:
1. Unexpected clipping: check viewBox width/height positive and preserveAspectRatio meet/slice.
2. Incorrect scaling: verify unit conversions: cm, mm, pt map to px via CSS DPI (96).
3. Debug matrix:
  console.dir(svgElement.getCTM()); // Check current transformation matrix
4. Normalize transform list:
  let items = svgElement.transform.baseVal.numberOfItems;
  for(let i=0; i<items; i++){ console.log(svgElement.transform.baseVal.getItem(i)); }


## Information Dense Extract
8.2: Compute viewport-to-user CTM: sx=vw/vbw, sy=vh/vbh; if align!=none: s=meet?min(sx,sy):max(sx,sy); tx=alignX(vw,vbw*s,alignX); ty=alignY(vh,vbh*s,alignY); CTM=translate(tx,ty)*scale(s,s)*translate(-vx,-vy); else CTM=scale(sx,sy)*translate(-vx,-vy). 8.5: transform-list grammar: matrix(a b c d e f)|translate(tx[,ty])|scale(sx[,sy])|rotate(angle[,cx,cy])|skewX(angle)|skewY(angle). Parameter types: XML <number>. 8.6: viewBox=min-x min-y width height, width>0,height>0. 8.7: preserveAspectRatio=[defer]? (none|align [meet|slice]), align: xMinYMin|xMidYMin|... default=xMidYMid meet. 8.9: Units conversions: 1in=96px; cm,mm,in,pt,pc conversions; relative units em,ex,%,vw, etc. DOM: SVGTransform API: setMatrix, setTranslate, setScale, setRotate, setSkewX, setSkewY. Methods on SVGTransformList. Constants for transform types. Code patterns: createSVGTransform(), appendItem(), reorder translate->scale->translate for origin-aware scaling.

## Sanitised Extract
Table of Contents
1. Transform Property Syntax
2. viewBox Attribute Syntax
3. preserveAspectRatio Attribute Syntax and Defaults
4. Viewport to User Coordinate Transform Computation
5. Units and Conversions

1. Transform Property Syntax
transform-list := transform ( ws? [,]? ws? transform )*
transform :=
  matrix(a b c d e f)
  translate(tx [ , ty ])
  scale(sx [ , sy ])
  rotate(angle [ , cx , cy ])
  skewX(angle)
  skewY(angle)
Parameters: a,b,c,d,e,f, tx,ty, sx,sy, angle, cx,cy are XML <number> (floating-point, optional leading sign, no units). Comma or whitespace separated.
Semantics:
  matrix: sets 2D affine transformation matrix [ a c e; b d f; 0 0 1 ]
  translate: equivalent to matrix(1 0 0 1 tx ty)
  scale: matrix(sx 0 0 sy 0 0), sy defaults to sx
  rotate: rotation around origin or point (cx,cy)
  skewX/Y: horizontal/vertical shear by tan(angle)

2. viewBox Attribute Syntax
viewBox = min-x min-y width height
min-x, min-y, width, height: XML <number>, width>0, height>0
Defines user coordinate subregion mapped to viewport.

3. preserveAspectRatio Attribute Syntax and Defaults
Syntax: [defer]? ( none | align [ meetOrSlice ] )
align values: xMinYMin, xMidYMin, xMaxYMin, xMinYMid, xMidYMid, xMaxYMid, xMinYMax, xMidYMax, xMaxYMax
meetOrSlice: meet (default) or slice
Default: xMidYMid meet
none: no uniform scaling, independent axis scaling

4. Viewport to User Coordinate Transform Computation
Given viewportSize (vw, vh), viewBox(vx, vy, vbw, vbh), preserveAspectRatio(p):
  sx = vw / vbw; sy = vh / vbh
  if p.align != none:
    if p.meetOrSlice == meet: s = min(sx, sy)
    else s = max(sx, sy)
    tx = alignmentX(vw, vbw*s, p.align)
    ty = alignmentY(vh, vbh*s, p.align)
    m = translate(tx, ty) * scale(s,s) * translate(-vx, -vy)
  else:
    m = translate(-vx*sx, -vy*sy) * scale(sx, sy)

alignmentX(viewportWidth, contentWidth, alignX):
  alignX=Min: 0; Mid: (viewportWidth - contentWidth)/2; Max: viewportWidth - contentWidth
similarly alignmentY.

5. Units and Conversions
Absolute:
  1in = 96px; 1cm = 96px/2.54; 1mm = 1cm/10; 1pt = 1/72in; 1pc = 12pt
Relative:
  percentages of current reference; em, ex relative to font-size; viewport units: vw, vh, vmin, vmax
Usage: numbers with unit suffix or unitless numbers default to px in attributes.

## Original Source
SVG 2 Specification (W3C Recommendation)
https://www.w3.org/TR/SVG2/

## Digest of TRANSFORM_UNITS

# Coordinate Systems, Transformations and Units

## 8.2 Computing the equivalent transform of an SVG viewport
To map user coordinate system to device (CSS px) coordinates: 
Let svgWidth, svgHeight be CSS px of viewport. viewBox = (minX, minY, vbWidth, vbHeight). preserveAspectRatio = [defer] align meetOrSlice. Compute scaleX = svgWidth / vbWidth, scaleY = svgHeight / vbHeight.
If align != none:
  if meetOrSlice == meet:  scale = min(scaleX, scaleY)
  else slice: scale = max(scaleX, scaleY)
  translateX = alignmentAlgorithmX(svgWidth, vbWidth*scale, align)
  translateY = alignmentAlgorithmY(svgHeight, vbHeight*scale, align)
Else (align==none): scaleX and scaleY independent; translateX = -minX * scaleX; translateY = -minY * scaleY.
Equivalent transform matrix = translate(translateX, translateY) * scale(scale, scale) * translate(-minX, -minY)

## 8.5 The transform property
Syntax: transform-list
transform-list := [ transform [ ws? comma? ws? transform ]* ]
transform := matrix(a b c d e f) | translate(tx [ , ty ]) | scale(sx [ , sy ]) | rotate(angle [ , cx , cy ]) | skewX(angle) | skewY(angle)
Parameter types: a,b,c,d,e,f, tx,ty,sx,sy,angle, cx,cy are <number> values conforming to XML number parsing and clamped per range.
Comma/Ws separation allowed between parameters and transforms.
Semantics:
  matrix(a b c d e f): sets transform to the 2D affine matrix [ a c e; b d f; 0 0 1 ].
  translate(tx,ty): equivalent to matrix(1,0,0,1,tx,ty).
  scale(sx,sy): matrix(sx,0,0,sy,0,0).
  rotate(angle,cx,cy): translate(cx,cy) * rotate(angle) * translate(-cx,-cy).
  skewX(angle): matrix(1,tan(angle),0,1,0,0).
  skewY(angle): matrix(1,0,tan(angle),1,0,0).

## 8.6 The viewBox attribute
Syntax: <number>{4}
viewBox = min-x min-y width height
All four values are <number>. width>0, height>0. Defaults: none (attribute required for scaling).
Applied as user coordinate system region to map into viewport.

## 8.7 The preserveAspectRatio attribute
Syntax: [defer]? (none | [align] [meetOrSlice]?)
align := xMinYMin | xMidYMin | xMaxYMin | xMinYMid | xMidYMid | xMaxYMid | xMinYMax | xMidYMax | xMaxYMax
meetOrSlice := meet | slice
Default: xMidYMid meet
Defer flag indicates postpone application to contained viewBox-like elements.

## 8.9 Units
Absolute units: cm, mm, in, pt (1pt = 1/72in), pc (1pc = 12pt), px (CSS px). Relative: em, ex, ch, rem, vw, vh, vmin, vmax.
Conversion: CSS 96px = 1in. e.g., 1cm = 96px/2.54.
Units without suffix default to px.

## Attribution
- Source: SVG 2 Specification (W3C Recommendation)
- URL: https://www.w3.org/TR/SVG2/
- License: License
- Crawl Date: 2025-04-25T23:33:42.928Z
- Data Size: 26689029 bytes
- Links Found: 204175

## Retrieved
2025-04-25
