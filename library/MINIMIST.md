MINIMIST

Table of contents
- Normalised extract: argument parsing with minimist
- Parsing options and return shape
- Recommended option schema for this CLI
- Range parsing helper (start:step:end)
- Detailed digest and attribution

Normalised extract: argument parsing with minimist
- minimist parses process.argv style arrays into an options object. It returns an object where named flags map to values and positional arguments are in the _ array. Provide explicit option types to coerce values and define defaults.

Parsing options and return shape
- Usage pattern: const argv = minimist(process.argv.slice(2), opts)
- Parsed object shape example: { _: [positional...], expression: 'y=Math.sin(x)', range: '-3.14:0.01:3.14', file: 'output.svg', help: true }
- Opts may define: string, boolean, alias, default, unknown handler.

Recommended option schema for this CLI
- string: ['expression', 'range', 'file', 'csv']
- boolean: ['help']
- alias: { h: 'help' }
- default: none; fail fast if required options missing and show usage.

Range parsing helper (start:step:end)
- Split the range string by ':' into three parts. Coerce each to Number using parseFloat. Validate: start != NaN, step != 0, end != NaN.
- Generate numeric sample points using a loop that adds step until sign-correct crossing of end is reached. Compute expected count as Math.floor((end - start)/step) + 1 when step > 0 and end >= start; adapt for negative step accordingly.
- Example algorithm (pseudocode):
  parts = range.split(':')
  start = parseFloat(parts[0]); step = parseFloat(parts[1]); end = parseFloat(parts[2])
  if (Number.isFinite(start) and Number.isFinite(step) and Number.isFinite(end) and step != 0) then
    points = []
    for (v = start; (step > 0 ? v <= end : v >= end); v += step) push v

Detailed digest
- Source: minimist package page (npm)
- URL: https://www.npmjs.com/package/minimist
- Retrieved: 2026-03-21
- Data obtained during crawl: 7134 bytes

Attribution
- Summarised from minimist documentation and common usage patterns to parse CLI flags for expression, range, csv and file output.