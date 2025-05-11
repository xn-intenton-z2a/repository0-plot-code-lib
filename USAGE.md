# Usage

This tool currently logs the arguments passed to it. You can use it as a starting point for building out plotting functionality.

## CLI

To run the tool and see the arguments passed:

```bash
# Using npm script
npm start -- foo bar baz

# Or directly with node
node src/lib/main.js foo bar baz
```

Output:

```
Run with: ["foo","bar","baz"]
```

## Programmatic API

You can also import and call the `main` function directly from your code:

```js
import { main } from "@xn-intenton-z2a/repository0-plot-code-lib/lib/main.js";

// Pass an array of arguments
main(["--expression", "y=sin(x)", "--range", "x=0:6.28:0.1"]);
```

Currently, the tool simply echoes back the provided arguments. Future releases will add expression parsing, time series generation, and plotting capabilities.
