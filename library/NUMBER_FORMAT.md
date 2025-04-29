# NUMBER_FORMAT

## Crawl Summary
Intl.NumberFormat provides a constructor to format numbers based on locale and options. Key specifications include its static method supportedLocalesOf(locales, options) and instance methods such as format, formatRange, formatToParts, formatRangeToParts, and resolvedOptions. Examples demonstrate usage for currency formatting in German ('de-DE'), Japanese Yen ('ja-JP'), and rounding with maximum significant digits. The configuration options include style, currency, maximumSignificantDigits, unit, and unitDisplay, each with precise effects on the formatted output.

## Normalised Extract
Table of Contents:
1. Constructor
   - new Intl.NumberFormat([locales[, options]])
2. Static Methods
   - supportedLocalesOf(locales: string | string[], options?: Object) returns string[]
3. Instance Properties
   - constructor and [Symbol.toStringTag]: 'Intl.NumberFormat'
4. Instance Methods
   - format(value: number): string
   - formatRange(start: number, end: number): string
   - formatToParts(value: number): Array<Object>
   - formatRangeToParts(start: number, end: number): Array<Object>
   - resolvedOptions(): Object
5. Code Examples
   - Currency: de-DE with EUR resulting in "123.456,79 €"
   - Currency: ja-JP with JPY resulting in "￥123,457"
   - Rounding using maximumSignificantDigits: en-IN with output "1,23,000"
6. Options & Configuration
   - style: (decimal, currency, percent, unit)
   - currency: (e.g., EUR, JPY)
   - maximumSignificantDigits: number
   - unit: (e.g., kilometer-per-hour)
   - unitDisplay: (short, long, narrow)

Details:
Constructor accepts locale strings and an options object. The supportedLocalesOf static method returns supported locales without fallback. Instance methods directly format numbers using locale-sensitive rules and return strings or arrays of parts suitable for custom formatting.

## Supplementary Details
Technical Specifications:
- Constructor: new Intl.NumberFormat(locales?: string | string[], options?: {
    style?: 'decimal' | 'currency' | 'percent' | 'unit',
    currency?: string,
    currencyDisplay?: 'code' | 'symbol' | 'name',
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    useGrouping?: boolean,
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact',
    compactDisplay?: 'short' | 'long',
    unit?: string,
    unitDisplay?: 'short' | 'long' | 'narrow'
  })
  Returns an Intl.NumberFormat instance with computed options from the provided locales and configuration.

- Static Method:
  Intl.NumberFormat.supportedLocalesOf(locales: string | string[], options?: { localeMatcher?: 'best fit' | 'lookup' }) : string[]

- Instance Methods:
  format(value: number): string
  formatRange(start: number, end: number): string
  formatToParts(value: number): Array<{ type: string, value: string }>
  formatRangeToParts(start: number, end: number): Array<{ type: string, value: string }>
  resolvedOptions(): Object containing effective locale, numbering system, and all options.

Implementation Steps:
1. Create instance with new Intl.NumberFormat('locale', {options}).
2. Call format(value) to get the formatted number string.
3. Use formatToParts(value) for custom rendering by iterating over returned array of parts.

Configuration Options and Their Effects:
- style: Determines formatting type; 'currency' requires a currency code, 'unit' requires a unit name.
- currency: Specifies the currency and affects symbol placement and rounding.
- maximumSignificantDigits: Limits digits shown for approximate values.
- unit and unitDisplay: Configure unit representation in combination with style 'unit'.

## Reference Details
API Specifications:
Constructor:
  new Intl.NumberFormat(locales?: string | string[], options?: {
    style?: 'decimal' | 'currency' | 'percent' | 'unit',
    currency?: string,
    currencyDisplay?: 'code' | 'symbol' | 'name',
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    useGrouping?: boolean,
    notation?: 'standard' | 'scientific' | 'engineering' | 'compact',
    compactDisplay?: 'short' | 'long',
    unit?: string,
    unitDisplay?: 'short' | 'long' | 'narrow'
  }) : Intl.NumberFormat

Static Method:
  Intl.NumberFormat.supportedLocalesOf(locales: string | string[], options?: { localeMatcher?: 'best fit' | 'lookup' }) : string[]

Instance Methods:
  format(value: number): string
  formatRange(start: number, end: number): string
  formatToParts(value: number): Array<{ type: string, value: string }>
  formatRangeToParts(start: number, end: number): Array<{ type: string, value: string }>
  resolvedOptions(): {
    locale: string,
    numberingSystem: string,
    style?: string,
    currency?: string,
    currencyDisplay?: string,
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    useGrouping?: boolean,
    notation?: string,
    compactDisplay?: string,
    unit?: string,
    unitDisplay?: string
  }

Full Code Example:
// Formatting a number in various locales
const number = 123456.789;

// German currency format
const germanCurrency = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
console.log(germanCurrency.format(number));
// Expected output: "123.456,79 €"

// Japanese Yen (no minor unit)
const japaneseYen = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
console.log(japaneseYen.format(number));
// Expected output: "￥123,457"

// Limit to three significant digits
const significantDigits = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });
console.log(significantDigits.format(number));
// Expected output: "1,23,000"

// Formatting with unit
const unitFormat = new Intl.NumberFormat('pt-PT', { style: 'unit', unit: 'kilometer-per-hour' });
console.log(unitFormat.format(50));
// Expected output: "50 km/h"

Best Practices and Troubleshooting:
- Always specify a fallback locale array if using an uncommon locale.
- Use resolvedOptions() to debug computed formatting settings.
- Verify group separators and decimal symbols by testing output in different environments.
- Command to test: node -e "console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(123456.789))"
Expected output: 123.456,79 €

Configuration Options Summary:
style: "currency" requires a valid currency code.
maximumSignificantDigits: numeric value defining the precision.
unit: when style is "unit", defines the measurement unit.
unitDisplay: display type for unit (short, long, narrow).

## Information Dense Extract
Intl.NumberFormat: constructor(new Intl.NumberFormat(locales?: string|array, options?: {style, currency, currencyDisplay, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits, useGrouping, notation, compactDisplay, unit, unitDisplay})). Static: supportedLocalesOf(locales, {localeMatcher}). Instance: format(number) returns string; formatRange(start, end) returns string; formatToParts(number) returns [{type, value}]; formatRangeToParts(start, end) returns parts; resolvedOptions() returns effective options. Code examples: de-DE with {style:'currency', currency:'EUR'} outputs "123.456,79 €"; ja-JP with {style:'currency', currency:'JPY'} outputs "￥123,457"; en-IN with {maximumSignificantDigits:3} outputs "1,23,000"; unit formatting with {style:'unit', unit:'kilometer-per-hour'} outputs "50 km/h". Key parameters: style, currency, maximumSignificantDigits, unit, unitDisplay. Full API, method signatures, and troubleshooting via resolvedOptions().

## Sanitised Extract
Table of Contents:
1. Constructor
   - new Intl.NumberFormat([locales[, options]])
2. Static Methods
   - supportedLocalesOf(locales: string | string[], options?: Object) returns string[]
3. Instance Properties
   - constructor and [Symbol.toStringTag]: 'Intl.NumberFormat'
4. Instance Methods
   - format(value: number): string
   - formatRange(start: number, end: number): string
   - formatToParts(value: number): Array<Object>
   - formatRangeToParts(start: number, end: number): Array<Object>
   - resolvedOptions(): Object
5. Code Examples
   - Currency: de-DE with EUR resulting in '123.456,79 '
   - Currency: ja-JP with JPY resulting in '123,457'
   - Rounding using maximumSignificantDigits: en-IN with output '1,23,000'
6. Options & Configuration
   - style: (decimal, currency, percent, unit)
   - currency: (e.g., EUR, JPY)
   - maximumSignificantDigits: number
   - unit: (e.g., kilometer-per-hour)
   - unitDisplay: (short, long, narrow)

Details:
Constructor accepts locale strings and an options object. The supportedLocalesOf static method returns supported locales without fallback. Instance methods directly format numbers using locale-sensitive rules and return strings or arrays of parts suitable for custom formatting.

## Original Source
MDN Intl.NumberFormat Documentation
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

## Digest of NUMBER_FORMAT

# Intl.NumberFormat Documentation

Data Retrieved: 2023-10-15

## Overview
The Intl.NumberFormat object provides language-sensitive number formatting. This includes support for currencies, units, and various numbering systems. It is a built-in object in JavaScript available since 2017.

## Constructor
- Syntax: new Intl.NumberFormat([locales[, options]])
- Creates and returns a new NumberFormat object.

## Static Methods
- Intl.NumberFormat.supportedLocalesOf(locales[, options])
  - Returns an array containing the locales that are supported without fallback.
  - Parameters:
    - locales: string or array of strings
    - options (optional): object with properties for configuration

## Instance Properties
- constructor: Reference to Intl.NumberFormat constructor
- [Symbol.toStringTag]: Always returns "Intl.NumberFormat"

## Instance Methods
- format(value: number): string
  - Formats a number according to the locale and options provided.
- formatRange(start: number, end: number): string
  - Formats a range of numbers [start, end].
- formatToParts(value: number): Array<Object>
  - Returns an array of objects representing formatted parts of the number.
- formatRangeToParts(start: number, end: number): Array<Object>
  - Returns an array of objects which represent the range parts.
- resolvedOptions(): Object
  - Returns an object with properties reflecting computed locale and options.

## Code Examples

Example (Currency Formatting in German):
const number = 123456.789;
console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
// Expected output: "123.456,79 €"

Example (Japanese Yen):
console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number));
// Expected output: "￥123,457"

Example (Maximum Significant Digits):
console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number));
// Expected output: "1,23,000"

## Options and Configuration

Common options include:
- style: 'decimal', 'currency', 'percent', or 'unit'
- currency: Currency code (e.g. EUR, JPY)
- currencyDisplay: 'symbol', 'code', or 'name'
- maximumSignificantDigits: number
- unit: Unit identifier (e.g. 'kilometer-per-hour')
- unitDisplay: 'short', 'long', or 'narrow'

For exhaustive details, see the ECMA-402 Internationalization API Specification.

## Browser Compatibility
Works across many devices and browser versions.

## Attribution
Source: MDN Intl.NumberFormat Documentation, Data Size: 2328834 bytes, Links Found: 18875

## Attribution
- Source: MDN Intl.NumberFormat Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
- License: CC BY-SA
- Crawl Date: 2025-04-29T15:50:15.500Z
- Data Size: 2328834 bytes
- Links Found: 18875

## Retrieved
2025-04-29
