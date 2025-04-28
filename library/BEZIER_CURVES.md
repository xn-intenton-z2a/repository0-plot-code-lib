# BEZIER_CURVES

## Crawl Summary
Includes detailed basis function definitions for Bézier curves, binomial coefficient computation via LUT, optimized implementations for quadratic and cubic curves, weighted and rational formulations, de Casteljau's recursive algorithm for point evaluation, curve flattening and splitting methods, and matrix representations for converting and splitting curves. Data Size: 32562089 bytes.

## Normalised Extract
Table of Contents:
1. Basis Functions and Lookup Table
   - Function Bezier(n, t) = Σ[k=0..n] binomial(n,k) * (1-t)^(n-k) * t^k
   - Dynamic LUT generation for Pascal's Triangle; binomial(n,k) returns LUT[n][k]
2. Optimized Implementations
   - Quadratic: Compute t2, mt, mt2; return mt2 + 2*mt*t + t2
   - Cubic: Compute t2, t3, mt, mt2, mt3; return mt3 + 3*mt2*t + 3*mt*t2 + t3
3. Weighted and Rational Functions
   - Weighted: BezierWeighted(n, t, w[]) using w[k] factor
   - Rational: Compute f[k] = r[k] * binomial(n,k) * (1-t)^(n-k) * t^k, then output weighted sum divided by Σ f[k]
4. de Casteljau's Algorithm
   - Recursive function drawCurvePoint(points[], t) that reduces points until one is left
   - Alternate version computes x and y separately forming new point(x,y)
5. Curve Flattening
   - flattenCurve(curve, segmentCount): sample at t steps with step = 1/segmentCount; join points
6. Splitting Curves
   - Enhanced de Casteljau algorithm records left and right arrays during recursion for splitting
7. Matrix Representation
   - Represent curve as [T]*[M]*[P] to allow sub-curve extraction via matrix manipulation

## Supplementary Details
Specifications:
- Basis Function: For order n, Bezier(n,t) = Σ[k=0..n] binomial(n,k)*(1-t)^(n-k)*t^k
- LUT: Initialize with [1], [1,1], [1,2,1]…; expand using nextRow[i] = previous_row[i-1] + previous_row[i]
- Quadratic Implementation: t2 = t*t, mt = 1-t, mt2 = mt*mt; optionally with weights: result = w[0]*mt2 + 2*w[1]*mt*t + w[2]*t2
- Cubic Implementation: t2, t3, mt, mt2, mt3 computed; result = w[0]*mt3 + 3*w[1]*mt2*t + 3*w[2]*mt*t2 + w[3]*t3
- Weighted Function: Accepts array w[]; Rational adds array r[] and computes terms f[k]; final value is (weighted sum) / (Σ f[k])
- de Casteljau's: Recursive interpolation; base when points.length==1 returns final point
- Flattening: Use curve.getXValue(t) and curve.getYValue(t) over evenly spaced t values; step = 1/segmentCount
- Splitting: Use modified de Casteljau recording first and last elements of each newpoints array to form left/right control point arrays
- Configuration: Parameter t normally in [0,1]; values outside produce extrapolation

## Reference Details
API and Code Examples:

Basis Function:
Function: Bezier(n, t)
Parameters: n (integer, order of curve), t (float, 0<= t <=1)
Return: Sum of binomial(n,k) * (1-t)^(n-k) * t^k for k=0..n

Binomial Lookup:
Function: binomial(n, k)
Parameters: n (integer), k (integer)
Algorithm: Expand LUT if n >= current length using:
  nextRow[0] = 1
  for i=1 to s-1: nextRow[i] = lut[s-1][i-1] + lut[s-1][i]
  nextRow[s] = 1
Return: lut[n][k]

Optimized Quadratic Bézier:
Function: Bezier2(t)
Parameters: t (float)
Local Variables: t2 = t*t, mt = 1-t, mt2 = mt*mt
Return: mt2 + 2*mt*t + t2

Optimized Cubic Bézier:
Function: Bezier3(t)
Parameters: t (float)
Local Variables: t2 = t*t, t3 = t2*t, mt = 1-t, mt2 = mt*mt, mt3 = mt2*mt
Return: mt3 + 3*mt2*t + 3*mt*t2 + t3

Weighted Implementation:
Function: BezierWeighted(n, t, w[])
Parameters: n (integer), t (float), w[] (array of weights, length = n+1)
Operation: Sum over k=0 to n of w[k]*binomial(n,k)*(1-t)^(n-k)*t^k

Rational Bézier Example (Quadratic):
Function: RationalBezier2(t, w[], r[])
Parameters: t (float), w[] (length 3), r[] (length 3)
Local Variables: t2, mt, mt2; f0 = r[0]*mt2, f1 = 2*r[1]*mt*t, f2 = r[2]*t2; basis = f0+f1+f2
Return: (w[0]*f0 + w[1]*f1 + w[2]*f2) / basis

De Casteljau's Algorithm:
Function: drawCurvePoint(points[], t)
Parameters: points[] (array of control points), t (float)
Algorithm: If points.length==1 return points[0]; else compute newpoints with newpoints[i] = (1-t)*points[i] + t*points[i+1] and recurse

Curve Splitting using de Casteljau:
Global arrays: left, right
Function: splitCurve(points[], t)
Operation: Record first element to left and last element to right at each recursion level; then recursive call with newpoints

Curve Flattening:
Function: flattenCurve(curve, segmentCount)
Parameters: curve (object with methods getXValue(t), getYValue(t)), segmentCount (integer)
Algorithm: step = 1/segmentCount; loop for i=1 to segmentCount collecting coordinates; return coordinate list

Troubleshooting Steps:
- Verify LUT array length and dynamic expansion in binomial(n,k) for high n values
- Debug de Casteljau's algorithm by logging intermediate newpoints arrays
- For flattening, adjust segmentCount to capture high curvature accurately; expected output is a smoother line when segmentCount is high
- Confirm that t values are within [0,1] unless extrapolation is intended

Configuration Options:
- Parameter t default range: [0,1]
- Weight array w[]: Must have (order+1) elements; default weights if not modified are equivalent to standard Bézier
- Ratio array r[] for rational curves: Alters the curve's pull; typical default: [1,1,...,1]


## Information Dense Extract
Basis: Bezier(n,t)=Σ[k=0..n] binomial(n,k)*(1-t)^(n-k)*t^k; LUT via Pascal's triangle; Quadratic optimized: t2, mt, mt2, return mt2+2mt*t+t2; Cubic optimized: t2,t3,mt,mt2,mt3, return mt3+3mt2*t+3mt*t2+t3; Weighted: include w[] multiplier per term; Rational: add r[] multiplier per term, divide by Σ(r[k]*basis term); de Casteljau: recursive reduction until one point remains; Flattening: sample curve at t=i/segments; Splitting: record left/right arrays during recursion; Matrix form: curve=[T]*[M]*[P]; t in [0,1] controls interpolation; default weights and ratios = 1.

## Sanitised Extract
Table of Contents:
1. Basis Functions and Lookup Table
   - Function Bezier(n, t) = [k=0..n] binomial(n,k) * (1-t)^(n-k) * t^k
   - Dynamic LUT generation for Pascal's Triangle; binomial(n,k) returns LUT[n][k]
2. Optimized Implementations
   - Quadratic: Compute t2, mt, mt2; return mt2 + 2*mt*t + t2
   - Cubic: Compute t2, t3, mt, mt2, mt3; return mt3 + 3*mt2*t + 3*mt*t2 + t3
3. Weighted and Rational Functions
   - Weighted: BezierWeighted(n, t, w[]) using w[k] factor
   - Rational: Compute f[k] = r[k] * binomial(n,k) * (1-t)^(n-k) * t^k, then output weighted sum divided by  f[k]
4. de Casteljau's Algorithm
   - Recursive function drawCurvePoint(points[], t) that reduces points until one is left
   - Alternate version computes x and y separately forming new point(x,y)
5. Curve Flattening
   - flattenCurve(curve, segmentCount): sample at t steps with step = 1/segmentCount; join points
6. Splitting Curves
   - Enhanced de Casteljau algorithm records left and right arrays during recursion for splitting
7. Matrix Representation
   - Represent curve as [T]*[M]*[P] to allow sub-curve extraction via matrix manipulation

## Original Source
A Primer on Bézier Curves
https://pomax.github.io/bezierinfo/

## Digest of BEZIER_CURVES

# Basis Functions and Lookup Table

The core Bézier basis function is defined as:

Bezier(n, t) = sum from k = 0 to n of [ binomial(n, k) * (1 - t)^(n-k) * t^k ]

To compute binomial coefficients efficiently, a lookup table (LUT) is used. The LUT is initialized with:

  [1]
  [1, 1]
  [1, 2, 1]
  [1, 3, 3, 1]
  [1, 4, 6, 4, 1]
  ...

And expanded dynamically with the algorithm:

function binomial(n, k):
  while (n >= lut.length):
    s = lut.length
    nextRow = new array of size (s + 1)
    nextRow[0] = 1
    for i from 1 to s - 1:
      nextRow[i] = lut[s-1][i-1] + lut[s-1][i]
    nextRow[s] = 1
    lut.push(nextRow)
  return lut[n][k]

# Optimized Implementations for Quadratic and Cubic Curves

For many graphics applications, quadratic and cubic curves are used.

Quadratic Bézier:

function Bezier2(t):
  t2 = t * t
  mt = 1 - t
  mt2 = mt * mt
  return mt2 + 2 * mt * t + t2

If weights are required:

function Bezier2Weighted(t, w[]):
  t2 = t * t
  mt = 1 - t
  mt2 = mt * mt
  return w[0] * mt2 + 2 * w[1] * mt * t + w[2] * t2

Cubic Bézier:

function Bezier3(t):
  t2 = t * t
  t3 = t2 * t
  mt = 1 - t
  mt2 = mt * mt
  mt3 = mt2 * mt
  return mt3 + 3 * mt2 * t + 3 * mt * t2 + t3

With weighting:

function Bezier3Weighted(t, w[]):
  t2 = t * t
  t3 = t2 * t
  mt = 1 - t
  mt2 = mt * mt
  mt3 = mt2 * mt
  return w[0] * mt3 + 3 * w[1] * mt2 * t + 3 * w[2] * mt * t2 + w[3] * t3

# Weighted and Rational Bézier Functions

Weighted Bézier adds per-control-point multipliers:

function BezierWeighted(n, t, w[]):
  sum = 0
  for k = 0 to n:
    sum += w[k] * binomial(n, k) * (1 - t)^(n - k) * t^k
  return sum

For Rational Bézier curves, introduce ratio factors (r[]) to further adjust the influence:

Quadratic Rational Bézier:

function RationalBezier2(t, w[], r[]):
  t2 = t * t
  mt = 1 - t
  mt2 = mt * mt
  f0 = r[0] * mt2
  f1 = 2 * r[1] * mt * t
  f2 = r[2] * t2
  basis = f0 + f1 + f2
  return (w[0] * f0 + w[1] * f1 + w[2] * f2) / basis

Cubic Rational Bézier:

function RationalBezier3(t, w[], r[]):
  t2 = t * t
  t3 = t2 * t
  mt = 1 - t
  mt2 = mt * mt
  mt3 = mt2 * mt
  f0 = r[0] * mt3
  f1 = 3 * r[1] * mt2 * t
  f2 = 3 * r[2] * mt * t2
  f3 = r[3] * t3
  basis = f0 + f1 + f2 + f3
  return (w[0] * f0 + w[1] * f1 + w[2] * f2 + w[3] * f3) / basis

# de Casteljau's Algorithm for Curve Evaluation

de Casteljau's algorithm recursively computes the point on the curve for a given t without direct polynomial evaluation.

Simple version using operator overloading:

function drawCurvePoint(points[], t):
  if points.length == 1:
    return points[0]
  else:
    newpoints = []
    for i = 0 to points.length - 2:
      newpoints.push((1 - t) * points[i] + t * points[i+1])
    return drawCurvePoint(newpoints, t)

Alternate version handling x and y separately:

function drawCurvePoint(points[], t):
  if points.length == 1:
    return points[0]
  else:
    newpoints = []
    for i = 0 to points.length - 2:
      x = (1 - t) * points[i].x + t * points[i+1].x
      y = (1 - t) * points[i].y + t * points[i+1].y
      newpoints.push(new point(x, y))
    return drawCurvePoint(newpoints, t)

# Curve Flattening and Drawing Algorithms

Flattening reduces a Bézier curve to a series of line segments by sampling at intervals:

function flattenCurve(curve, segmentCount):
  step = 1 / segmentCount
  coordinates = [curve.getXValue(0), curve.getYValue(0)]
  for i = 1 to segmentCount:
    t = i * step
    coordinates.push(curve.getXValue(t), curve.getYValue(t))
  return coordinates

Drawing the flattened curve:

function drawFlattenedCurve(curve, segmentCount):
  coordinates = flattenCurve(curve, segmentCount)
  currentCoord = coordinates[0]
  for i = 1 to coordinates.length - 1:
    nextCoord = coordinates[i]
    line(currentCoord, nextCoord)
    currentCoord = nextCoord

# Splitting Curves Using de Casteljau's Algorithm

By recording intermediate points, a curve can be split into two segments at a chosen t:

left = []
right = []
function splitCurve(points[], t):
  if points.length == 1:
    left.push(points[0])
    right.push(points[0])
    return
  else:
    newpoints = []
    for i = 0 to points.length - 2:
      if i == 0:
        left.push(points[i])
      if i == points.length - 2:
        right.push(points[i+1])
      newpoints.push((1 - t) * points[i] + t * points[i+1])
    splitCurve(newpoints, t)

After execution, left and right arrays contain the control points for the two new Bézier curves.

# Bézier Curves as Matrix Operations

Bézier curves can be expressed in matrix form where:

Curve = [T] * [M] * [P]

Where [T] is the vector of t powers, [M] is the basis (Bernstein) matrix, and [P] contains the control point coordinates. This representation
can be rearranged to solve for sub-curves when splitting using linear algebra: compute new control points via operations like [M^-1 * Z * M].

# Metadata

Content retrieved on: 2023-10-04
Attribution: Data crawled from https://pomax.github.io/bezierinfo/ (Data Size: 32562089 bytes)

## Attribution
- Source: A Primer on Bézier Curves
- URL: https://pomax.github.io/bezierinfo/
- License: Creative Commons Attribution (Educational Use)
- Crawl Date: 2025-04-28T17:48:22.062Z
- Data Size: 32562089 bytes
- Links Found: 19384

## Retrieved
2025-04-28
