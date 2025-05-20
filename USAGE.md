# Usage

## CLI

```bash
repository0-plot-code-lib --expression "<expr>" --range "<var>=<start>:<end>" [--points <number>]
```

### Examples

Generate 5 points of sin(x) from 0 to 2π:

```bash
$ repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.2831853" --points 5
[
  {
    "x": 0,
    "y": 0
  },
  {
    "x": 1.5707963,
    "y": 1
  },
  {
    "x": 3.1415927,
    "y": 0
  },
  {
    "x": 4.712389,
    "y": -1
  },
  {
    "x": 6.2831853,
    "y": 0
  }
]
```

# API

The library exports:

```js
import { main } from "repository0-plot-code-lib";

// Returns an array of objects { x, y }
const data = main([
  "--expression", "x^2", 
  "--range", "x=0:10", 
  "--points", "11"
]);
```
