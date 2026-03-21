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

// Roman numeral conversion utilities
const ROMAN_MAP = [
  { value: 1000, symbol: "M" },
  { value: 900, symbol: "CM" },
  { value: 500, symbol: "D" },
  { value: 400, symbol: "CD" },
  { value: 100, symbol: "C" },
  { value: 90, symbol: "XC" },
  { value: 50, symbol: "L" },
  { value: 40, symbol: "XL" },
  { value: 10, symbol: "X" },
  { value: 9, symbol: "IX" },
  { value: 5, symbol: "V" },
  { value: 4, symbol: "IV" },
  { value: 1, symbol: "I" }
];

export function intToRoman(num) {
  if (typeof num !== "number" || !Number.isInteger(num)) {
    throw new TypeError("intToRoman expects an integer");
  }
  if (num < 1 || num > 3999) {
    throw new RangeError("intToRoman expects a value in the range 1..3999");
  }
  let n = num;
  let out = "";
  for (const { value, symbol } of ROMAN_MAP) {
    while (n >= value) {
      out += symbol;
      n -= value;
    }
  }
  return out;
}

export function romanToInt(roman) {
  if (typeof roman !== "string") {
    throw new TypeError("romanToInt expects a string");
  }
  if (roman.length === 0) {
    throw new TypeError("Empty string is not a valid Roman numeral");
  }
  const s = roman.toUpperCase();
  if (!/^[IVXLCDM]+$/.test(s)) {
    throw new TypeError("Invalid Roman numeral characters");
  }
  const values = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const curr = values[s[i]];
    const next = values[s[i + 1]] ?? 0;
    if (next > curr) {
      total -= curr;
    } else {
      total += curr;
    }
  }
  if (total < 1 || total > 3999) {
    throw new TypeError("Roman numeral out of range");
  }
  // Enforce canonical (strict) form by round-trip
  const canonical = intToRoman(total);
  if (canonical !== s) {
    throw new TypeError("Invalid or non-canonical Roman numeral");
  }
  return total;
}

export function main(args) {
  if (args?.includes("--version")) {
    console.log(version);
    return;
  }
  if (args?.includes("--identity")) {
    console.log(JSON.stringify(getIdentity(), null, 2));
    return;
  }
  if (args?.includes("--roman")) {
    const idx = args.indexOf("--roman");
    const val = args[idx + 1];
    try {
      const n = Number(val);
      console.log(intToRoman(n));
    } catch (e) {
      console.error(e.message);
      process.exitCode = 2;
    }
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
