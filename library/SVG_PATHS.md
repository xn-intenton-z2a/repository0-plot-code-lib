NORMALISED EXTRACT

Table of Contents
- Overview
- Command list and signatures
- Number grammar and separators
- Relative vs absolute behaviour
- Parsing and validation rules
- Implementation notes (tokenisation and parsing)

Overview
- SVG path data encodes a sequence of drawing commands for the path element using single-letter commands (case matters).
- Commands are single letters: M, m, Z, z, L, l, H, h, V, v, C, c, S, s, Q, q, T, t, A, a.
- Commands may be followed by one or more parameter sets; when multiple parameter sets follow a command the same command is repeated for each parameter set.

Command list and signatures (exact parameter sequences)
- M x y
  - Absolute moveto. Accepts one or more pairs: (x y)+. The first pair starts a new subpath; subsequent pairs are treated as implicit L commands.
- m dx dy
  - Relative moveto. Same as M but coordinates are offsets from the current point.
- Z or z
  - closepath. No parameters. Closes the current subpath and sets the current point to the initial point of the subpath.
- L x y
  - Absolute lineto. Accepts one or more pairs: (x y)+.
- l dx dy
  - Relative lineto. As L but relative offsets.
- H x
  - Absolute horizontal lineto. Accepts one or more x coordinates: (x)+. y remains unchanged.
- h dx
  - Relative horizontal lineto.
- V y
  - Absolute vertical lineto. Accepts one or more y coordinates: (y)+. x remains unchanged.
- v dy
  - Relative vertical lineto.
- C x1 y1 x2 y2 x y
  - Absolute cubic Bézier curveto. Accepts one or more sextuplets: (x1 y1 x2 y2 x y)+.
- c x1 y1 x2 y2 x y
  - Relative cubic curveto.
- S x2 y2 x y
  - Absolute smooth cubic curveto. Accepts one or more quadruplets: (x2 y2 x y)+. If previous command was C or S then the first control point is the reflection of the previous control point; otherwise the first control point equals the current point.
- s x2 y2 x y
  - Relative smooth cubic curveto.
- Q x1 y1 x y
  - Absolute quadratic Bézier curveto. Accepts one or more quadruplets: (x1 y1 x y)+.
- q x1 y1 x y
  - Relative quadratic curveto.
- T x y
  - Absolute smooth quadratic curveto. Accepts one or more pairs: (x y)+. If previous command was Q or T then the control point is the reflection of the previous control point; otherwise control point = current point.
- t x y
  - Relative smooth quadratic curveto.
- A rx ry x-axis-rotation large-arc-flag sweep-flag x y
  - Absolute elliptical arc. Accepts one or more septuplets: (rx ry x-axis-rotation large-arc-flag sweep-flag x y)+.
  - rx, ry: positive numbers (radii). x-axis-rotation: degrees. large-arc-flag and sweep-flag: integers 0 or 1. x,y: destination coordinates.
- a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy
  - Relative elliptical arc: endpoint coordinates are offsets.

Number grammar and separators
- Valid number format (ECMAScript/ SVG path): optional sign, digits with optional fractional part, optional exponent.
- A usable regex for tokenising numbers: [-+]?(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?
- Numbers may be separated by commas and/or whitespace. A comma and/or whitespace are both valid separators.
- A leading sign (+ or -) can indicate the start of a new number even without a separator.

Relative vs absolute behaviour
- Uppercase command letters denote absolute coordinates; lowercase denote coordinates relative to the current point.
- For repeated parameter sets following a command the same absolute/relative rule applies for each set.
- For M/m: when multiple coordinate pairs follow, the first pair is a moveto and subsequent pairs are treated as implicit lineto (L/l).

Parsing and validation rules
- Tokenise the path string into command tokens (letters) and numeric tokens (numbers) using the number regex and single-letter command detection.
- Validate parameter counts per command: e.g., C requires groups of 6 numbers; Q requires groups of 4; A requires groups of 7; H/V require single numbers but may repeat.
- Flags (large-arc-flag, sweep-flag) are parsed as integers 0 or 1; other numeric parameters parsed as floats.
- Reject commands when parameter counts are not a multiple of the expected group size.
- When parsing arc commands ensure rx and ry are non-negative and if either is zero the arc degenerates to a straight line.

Implementation notes (tokenisation and parsing algorithm)
- Tokenisation strategy:
  1. Remove optional leading/trailing whitespace.
  2. Insert explicit separators before command letters if necessary (commands are letters A-Za-z).
  3. Use a global regex to extract tokens where tokens are either command letters or numbers matching the number regex above.
- Parsing loop:
  1. Read next token; if it is a command letter set currentCommand and determine expected parameter group size.
  2. Read successive numeric tokens grouping them into parameter sets of the expected size. For each full parameter set emit a concrete command invocation (resolved to absolute coords if desired).
  3. If a command is omitted and numeric tokens follow (implicit command repetition), continue using last command.
- Relative-to-absolute resolution: maintain currentPoint and subpathStartPoint for z/Z handling; convert relative groups by adding currentPoint offsets.

Edge cases and best practices
- Support both comma and space separators; allow repeated parameter groups without repeated command letters.
- Support exponent notation (e.g., 1e-3).
- Treat consecutive numbers without separators as separate tokens if a sign indicates new number.
- For arcs, follow the SVG arc-to-curves algorithm in the spec if decomposition to cubic curves is required (implementation pattern: compute center parameterisation, then convert to cubic Béziers for canvas or polyline approximation).

SUPPLEMENTARY DETAILS
- Coordinate system: SVG user coordinates default to origin (0,0) at the top-left with positive x to the right and positive y downwards unless a viewBox and transforms change orientation.
- Units: path numbers are unitless user units; any external CSS or transform may change rendering scale.
- Polyline and polygon points attributes use an ordered list of coordinates similar to repeated L commands: pairs of numbers separated by commas and/or whitespace.

REFERENCE DETAILS (precise command parameter counts and parsing regex)
- Command parameter group sizes:
  - M, m: groups of 2
  - L, l: groups of 2
  - H, h: groups of 1
  - V, v: groups of 1
  - C, c: groups of 6
  - S, s: groups of 4
  - Q, q: groups of 4
  - T, t: groups of 2
  - A, a: groups of 7
  - Z, z: groups of 0
- Number token regex (recommended): [-+]?(?:[0-9]*\.)?[0-9]+(?:[eE][-+]?[0-9]+)?
- Arc flags: large-arc-flag ∈ {0,1}; sweep-flag ∈ {0,1}.
- Absolute coordinate application: x' = x (given); relative coordinate application: x' = currentX + dx.
- Closepath behavior: Z sets the current point to the initial point of the current subpath; subsequent drawing resumes from there.

DETAILED DIGEST (source capture)
- Source: Paths - SVG | MDN
- URL: https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Paths
- Retrieved: 2026-03-20
- Data obtained (approx): 215 KB of HTML

ATTRIBUTION
- Content extracted and normalised from MDN (Paths - SVG). Use MDN content as authoritative reference for command semantics and number tokenisation rules.
