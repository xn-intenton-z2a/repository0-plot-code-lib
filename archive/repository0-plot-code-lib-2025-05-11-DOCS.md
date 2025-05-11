USAGE.md
# USAGE.md
# Usage

## API

```js
import { generateTimeSeries } from '@xn-intenton-z2a/repository0-plot-code-lib';

// Generate a time series for sin(x) from 0 to 6.28 with step 0.1
const series = generateTimeSeries('sin(x)', 'x=0:6.28:0.1');
console.log(series);
// [
//   { x: 0, y: 0 },
//   { x: 0.1, y: 0.0998334166 },
//   ...
// ]
```

## CLI

Invoke via command line:

```sh
repository0-plot-code-lib --expression "sin(x)" --range "x=0:6.28:0.1"
```

This will print the generated time series as formatted JSON to stdout.
