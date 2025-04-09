// File: src/lib/main.js

// Removed the import for resolveNaNAliases from a non-existent file. Now it's defined inline.

export function resolveNaNAliases() {
  const strict = process.env.STRICT_NAN_MODE === 'true';
  if (strict) {
    return ['nan'];
  }

  if (process.env.LOCALE_NAN_OVERRIDE) {
    // Override defaults completely
    return process.env.LOCALE_NAN_OVERRIDE.split(',').map(alias => alias.trim()).filter(alias => alias.length > 0);
  }

  const defaultAliases = ['nan', 'notanumber', 'undefined'];

  if (process.env.LOCALE_NAN_ALIASES) {
    const customAliases = process.env.LOCALE_NAN_ALIASES.split(',').map(alias => alias.trim().toLowerCase()).filter(alias => alias.length > 0);
    // Merge custom aliases with defaults, deduplicating
    const merged = new Set([...defaultAliases, ...customAliases]);
    return Array.from(merged);
  }

  return defaultAliases;
}

export function main(args) {
  // Resolve and log NaN aliases for diagnostic purposes
  const naNAliases = resolveNaNAliases();
  console.log('NaN Aliases:', naNAliases);
  console.log(`Run with: ${JSON.stringify(args)}`);
}

// Removed the shebang line to comply with ECMAScript Module specifications.
// This file is now intended to be imported. For CLI execution, use the provided CLI entrypoint (bin/cli.js).
