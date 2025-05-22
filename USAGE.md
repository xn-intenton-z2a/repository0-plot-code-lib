# Usage

## CLI Usage

This tool supports displaying the mission statement, help information, and placeholder stub commands.

**Usage:**

```
node src/lib/main.js [options]
```

## Options

  --mission, -m       Show the mission statement and exit
  --help, -h          Show help information and exit
  --expression, -e    (Future) Expression in form y=<expr>
  --range, -r         (Future) Range in form x=start:end:step
  --format, -f        (Future) Output format: json (default) or csv
  --plot-format, -p   (Future) Plot format: svg or png
  --file, -o          (Future) Output file path
  --width, -w         (Future) Plot width in pixels (default 800)
  --height, -H        (Future) Plot height in pixels (default 600)
  --parametric, -P    (Future) Parametric expressions x=<expr>,y=<expr>

## Examples

```bash
# Display the mission statement
node src/lib/main.js --mission

# Display help information
node src/lib/main.js --help
```