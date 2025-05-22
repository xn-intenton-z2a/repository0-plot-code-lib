# Usage

## CLI Usage

Generates time series data from mathematical expressions over a specified one-dimensional range and outputs it in JSON or CSV format.

**Usage:**

  node src/lib/main.js --expression "y=<math>" --range "x=start:end:step" [--format json|csv] [--file outputPath]

**Options:**

  --expression, -e  Required: formula in form y=<math>, e.g. y=sin(x)
  --range, -r       Required: sampling range in form x=start:end:step, e.g. x=0:6.28:0.1
  --format, -f      Optional: output format, json (default) or csv
  --file, -o        Optional: path to output file; if omitted, prints to stdout

**Examples:**

```bash
# JSON output to stdout
node src/lib/main.js --expression "y=sin(x)" --range "x=0:3.14:1"

# CSV output to file
node src/lib/main.js --expression "y=2*x" --range "x=0:5:2" --format csv --file data.csv
```