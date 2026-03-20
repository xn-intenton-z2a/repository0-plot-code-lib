NORMALISED EXTRACT

Table of Contents
- Transform attribute syntax
- Function signatures and parameter semantics
- Matrix layout and application formula
- Order of operations and composition
- Implementation notes and examples

Transform attribute syntax
- The transform attribute is a list of transform functions applied to the element in the order specified.
- Syntax: transform="func1(...) func2(...) ..." where func is one of: translate, scale, rotate, skewX, skewY, matrix.

Function signatures and semantics (exact)
- translate(tx [, ty])
  - tx, ty: numbers. If ty omitted ty = 0. Moves coordinates by tx in x and ty in y.
- scale(sx [, sy])
  - sx, sy: numbers. If sy omitted sy = sx. Scales x by sx and y by sy.
- rotate(angle [, cx, cy])
  - angle: number in degrees. If cx and cy provided, rotate around point (cx, cy). Otherwise rotate about the origin (0,0).
  - Equivalent when cx,cy provided: translate(cx, cy) rotate(angle) translate(-cx, -cy).
- skewX(angle)
  - angle: degrees. Shears x coordinates by tan(angle).
- skewY(angle)
  - angle: degrees. Shears y coordinates by tan(angle).
- matrix(a b c d e f)
  - a,b,c,d,e,f: numbers specifying the transformation matrix.
  - Matrix corresponds to 3x3 homogeneous matrix:
    [ a  c  e ]
    [ b  d  f ]
    [ 0  0  1 ]
  - Application to a point (x,y): x' = a*x + c*y + e; y' = b*x + d*y + f.

Matrix construction for common functions (reference formulas)
- translate(tx, ty) -> matrix(1 0 0 1 tx ty)
- scale(sx, sy) -> matrix(sx 0 0 sy 0 0)
- rotate(theta) [about origin] -> matrix(cosθ sinθ -sinθ cosθ 0 0)  (note sign convention: matrix(a b c d e f) uses a=cosθ, b=sinθ, c=-sinθ, d=cosθ)
- skewX(α) -> matrix(1 0 tan(α) 1 0 0)
- skewY(α) -> matrix(1 tan(α) 0 1 0 0)

Order of operations
- Transform functions are applied in the order they appear left-to-right in the attribute string. The overall effect is the composition of the individual transform matrices in sequence.
- Implementation note: compute the matrix for each function and multiply them in sequence: M_total = M_n * ... * M_2 * M_1 if applying transforms in code that post-multiplies column vectors; when using the plain application formula x' = M * x, ensure consistent multiplication order.

Implementation notes and examples
- Parsing: tokenise by function name and parenthesised numeric arguments; parse numbers using the same number grammar as SVG path numbers (see SVG_PATHS reference regex).
- Rotation about a point: implement by composing translate(cx, cy) * rotate(angle) * translate(-cx, -cy) or by computing an equivalent single matrix.
- Floating point details: angles are in degrees; convert to radians for trig functions.
- For rasterisation (canvas): build a single combined matrix then apply to canvas transform or compute transformed vertex positions directly.

DETAILED DIGEST (source capture)
- Source: transform - SVG | MDN
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
- Retrieved: 2026-03-20
- Data obtained (approx): 194 KB of HTML

ATTRIBUTION
- Content extracted and normalised from MDN (transform - SVG). Use MDN and the SVG specification for authoritative matrix multiplication order and function definitions.
