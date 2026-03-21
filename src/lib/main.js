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

/**
 * Convert an integer (1..3999) to a Roman numeral (strict subtractive notation).
 * @param {number} num - integer between 1 and 3999
 * @returns {string}
 * @throws {RangeError} if number is outside 1..3999
 * @throws {TypeError} if input is not an integer
 */
export function toRoman(num) {
  if (typeof num !== "number" || !Number.isInteger(num)) {
    throw new TypeError("toRoman expects an integer");
  }
  if (num < 1 || num > 3999) {
    throw new RangeError("toRoman: value must be in range 1..3999");
  }
  const thousands = ["", "M", "MM", "MMM"];
  const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
  return (
    thousands[Math.floor(num / 1000)] +
    hundreds[Math.floor((num % 1000) / 100)] +
    tens[Math.floor((num % 100) / 10)] +
    ones[num % 10]
  );
}

/**
 * Parse a Roman numeral in strict subtractive notation and return its integer value.
 * Throws TypeError for invalid strings (including 'IIII' style forms).
 * @param {string} roman - Roman numeral string (e.g., 'MCMXCIV')
 * @returns {number}
 * @throws {TypeError} if input is not a valid canonical Roman numeral
 */
const ROMAN_REGEX = /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

export function fromRoman(roman) {
  if (typeof roman !== "string") {
    throw new TypeError("fromRoman expects a string");
  }
  if (roman.length === 0) {
    throw new TypeError("fromRoman: empty string is not a valid Roman numeral");
  }
  const s = roman.toUpperCase();
  if (!ROMAN_REGEX.test(s)) {
    throw new TypeError("fromRoman: invalid Roman numeral (strict form required)");
  }
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const cur = map[s[i]];
    const next = map[s[i + 1]] || 0;
    if (cur < next) {
      total -= cur;
    } else {
      total += cur;
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
