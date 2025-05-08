USAGE.md
# USAGE.md
# Usage

## CLI Flags

- `--flow-sync`  
  Boolean flag to synchronize timestamps across multiple formulas.

- `--start <number>`  
  Start time (default `0`), required with `--flow-sync`.

- `--end <number>`  
  End time (required with `--flow-sync`).

- `--step <number>`  
  Time step increment (required with `--flow-sync`).

## Modes

### Flow-Sync Mode

When `--flow-sync` is provided, generates JSON with synchronized timestamps and series values:

```bash
node src/lib/main.js --flow-sync --start 0 --end 4 --step 2 x '2*x'
```

Output:
```json
{
  "timestamps": [0, 2, 4],
  "series": [
    { "expression": "x", "values": [0, 2, 4] },
    { "expression": "2*x", "values": [0, 4, 8] }
  ]
}
```

### Default Mode

Without `--flow-sync`, the CLI simply echoes the invocation:

```bash
node src/lib/main.js
```

Output:
```
Run with: []
```
