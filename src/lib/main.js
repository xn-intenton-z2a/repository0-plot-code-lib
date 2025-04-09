// File: src/lib/main.js

import { resolveNaNAliases } from './naNAlias.js';

export function main(args) {
  // Resolve and log NaN aliases for diagnostic purposes
  const naNAliases = resolveNaNAliases();
  console.log('NaN Aliases:', naNAliases);
  console.log(`Run with: ${JSON.stringify(args)}`);
}

// Removed the shebang line to comply with ECMAScript Module specifications.
// This file is now intended to be imported. For CLI execution, use the provided CLI entrypoint (bin/cli.js).
