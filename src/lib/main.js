// File: src/lib/naNAlias.js

// This module dynamically resolves NaN aliases based on environment configuration.

export function resolveNaNAliases() {
  const strict = process.env.STRICT_NAN_MODE === 'true';
  if (strict) {
    return ['nan'];
  }

  // Default aliases
  let defaultAliases = ['nan', 'notanumber', 'undefined'];

  // If a locale-specific override is provided, use it and ignore defaults
  if (process.env.LOCALE_NAN_OVERRIDE) {
    return process.env.LOCALE_NAN_OVERRIDE.split(',')
      .map(a => a.trim())
      .filter(a => a.length > 0)
      .map(a => a.normalize('NFC').toLowerCase());
  }

  // Merge additional locale-specific aliases if provided
  if (process.env.LOCALE_NAN_ALIASES) {
    const custom = process.env.LOCALE_NAN_ALIASES.split(',')
      .map(a => a.trim())
      .filter(a => a.length > 0)
      .map(a => a.normalize('NFC').toLowerCase());
    defaultAliases = Array.from(new Set([...defaultAliases, ...custom]));
  }

  return defaultAliases;
}

// File: src/lib/main.js
#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from 'url';
import { resolveNaNAliases } from './naNAliases.js';

export function main(args) {
  // Resolve and log NaN aliases for diagnostic purposes
  const naNAliases = resolveNaNAliases();
  console.log('NaN Aliases:', naNAliases);

  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  main(args);
}
