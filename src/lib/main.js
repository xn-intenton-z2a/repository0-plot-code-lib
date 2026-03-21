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
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

const ROMAN_REGEX = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

export function toRoman(num) {
  if (typeof num !== "number" || !Number.isInteger(num)) {
    throw new TypeError("toRoman expects an integer");
  }
  if (num < 1 || num > 3999) {
    throw new RangeError("toRoman supports integers in the range 1..3999");
  }
  let n = num;
  let res = "";
  for (const [value, symbol] of ROMAN_MAP) {
    while (n >= value) {
      res += symbol;
      n -= value;
    }
  }
  return res;
}

export function fromRoman(str) {
  if (typeof str !== "string") {
    throw new TypeError("fromRoman expects a string");
  }
  if (str.length === 0) {
    throw new TypeError("Invalid Roman numeral");
  }
  if (!ROMAN_REGEX.test(str)) {
    throw new TypeError("Invalid Roman numeral");
  }
  const map = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 };
  let total = 0;
  for (let i = 0; i < str.length; i++) {
    const curr = map[str[i]];
    const next = map[str[i + 1]];
    if (next && curr < next) {
      total += next - curr;
      i++; // skip next character as it's consumed
    } else {
      total += curr;
    }
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
  console.log(`${name}@${version}`);
}

if (isNode) {
  const { fileURLToPath } = await import("url");
  if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const args = process.argv.slice(2);
    main(args);
  }
}
