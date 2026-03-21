#!/usr/bin/env node
// SPDX-License-Identifier: MIT
// Copyright (C) 2025-2026 Polycode Limited
// src/lib/main.js

const isNode = typeof process !== "undefined" && !!process.versions?.node;

let pkg;
if (isNode) {
  const { createRequire } = await import("module");
  const requireFn = createRequire(import.meta.url);
  pkg = requireFn("../../package.json");
} else {
  try {
    const resp = await fetch(new URL("../../package.json", import.meta.url));
    pkg = await resp.json();
  } catch {
    pkg = { name: document.title, version: "0.0.0", description: "" };
  }
}

export const name = pkg.name;
export const version = pkg.version;
export const description = pkg.description;

export function getIdentity() {
  return { name, version, description };
}

// Roman numeral utilities --------------------------------------------------
const ROMAN_MAP = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I']
];

export function toRoman(n) {
  if (typeof n !== 'number' || !Number.isFinite(n) || !Number.isInteger(n)) {
    throw new TypeError('toRoman: input must be an integer');
  }
  if (n < 1 || n > 3999) {
    throw new RangeError('toRoman: value must be in range 1..3999');
  }
  let remaining = n;
  let out = '';
  for (const [value, sym] of ROMAN_MAP) {
    while (remaining >= value) {
      out += sym;
      remaining -= value;
    }
  }
  return out;
}

const ROMAN_REGEX = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;

export function fromRoman(s) {
  if (typeof s !== 'string') {
    throw new TypeError('fromRoman: input must be a string');
  }
  const str = s.trim().toUpperCase();
  if (!str || !ROMAN_REGEX.test(str)) {
    throw new TypeError('fromRoman: invalid Roman numeral');
  }
  let idx = 0;
  let total = 0;
  while (idx < str.length) {
    let matched = false;
    for (const [value, sym] of ROMAN_MAP) {
      if (str.startsWith(sym, idx)) {
        total += value;
        idx += sym.length;
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Should not happen because regex validated, but guard nonetheless
      throw new TypeError('fromRoman: invalid parse at position ' + idx);
    }
  }
  return total;
}

// CLI / main entrypoint ---------------------------------------------------
export function main(args) {
  if (args?.includes("--version")) {
    console.log(version);
    return;
  }
  if (args?.includes("--identity")) {
    console.log(JSON.stringify(getIdentity(), null, 2));
    return;
  }
  console.log(`${name}@${version}`);
}

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
