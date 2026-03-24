API_EXPORTS

TABLE OF CONTENTS:
1. Public API surface: named exports and signatures
2. Types, parameters and return types
3. Error conditions and thrown exceptions
4. Integration patterns and examples
5. Digest and attribution

PUBLIC API (named exports required):
- parseExpression(expression: string): (x: number) => number
  - Returns a callable function that computes y for a numeric x. Throws SyntaxError for invalid expressions.
- parseRange(range: string): {start:number, step:number, end:number}
  - Parses a range string "start:step:end" and returns numeric triple. Throws Error on invalid format or NaN.
- generateSeries(fn: (x:number)=>number, rangeString: string, options?: {maxPoints?: number}): Array<{x:number,y:number}>
  - Produces an array of numeric points for plotting. Throws Error on too many points or invalid range.
- loadCsv(filePath: string, options?: {hasHeader?: boolean}): Promise<Array<{time:string,value:number}>>
  - Loads CSV and returns parsed time/value records. Rejects Promise on I/O or parse errors.
- renderSVG(points: Array<{x:number,y:number}>, options?: {width:number,height:number,margin?:number,stroke?:string,strokeWidth?:number}): string
  - Returns a complete SVG string with xmlns and viewBox.
- renderPNG(svgString: string, outPath: string, options?: {density?:number,width?:number,height?:number}): Promise<void>
  - Renders and writes a PNG file using sharp (or canvas fallback). Rejects Promise on failure.
- savePlot(filePath: string, data: Buffer|string): Promise<void>
  - Writes binary or text data to disk; infers method from data type.
- main(argv?: string[]): Promise<number>
  - CLI entrypoint that parses argv and performs requested action; resolves to exit code.

TYPES AND ERRORS (exact behaviours):
- All functions should validate arguments and throw synchronous errors for programming mistakes (TypeError) or Range/Error for invalid values.
- Async functions return Promises that reject with Error instances containing message, and attach cause where appropriate for IO errors.

INTEGRATION PATTERNS:
- For CLI flow: const fn = parseExpression(expression); const points = generateSeries(fn, range); const svg = renderSVG(points, opts); if out ext is .svg write svg; if .png call renderPNG(svg,...).

DIGEST & ATTRIBUTION:
- Public API design uses Node core APIs and MDN references for Function/Math/SVG; retrieval date: 2026-03-24.
