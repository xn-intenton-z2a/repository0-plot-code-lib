# INTL_NUMBERFORMAT

## Crawl Summary
Intl.NumberFormat provides a constructor and several methods for locale-sensitive number formatting. Key specifications include the static method supportedLocalesOf, instance methods like format, formatRange, formatToParts, and resolvedOptions. The options allow customization such as style (currency, unit), currency code, maximumSignificantDigits, and unit display. Concrete examples demonstrate currency output for different locales, significant digit formatting, and locale fallback mechanisms.

## Normalised Extract
Table of Contents:
1. Constructor
   - Usage: new Intl.NumberFormat([locales, options])
2. Static Method: supportedLocalesOf
   - Signature: Intl.NumberFormat.supportedLocalesOf(locales: string | string[], options?: object) => string[]
3. Instance Methods
   - format(number: number) => string
   - formatRange(start: number, end: number) => string
   - formatRangeToParts(start: number, end: number) => Array<Object>
   - formatToParts(number: number) => Array<Object>
   - resolvedOptions() => Object
4. Options & Configurations
   - style: 'decimal' | 'currency' | 'percent' | 'unit'
   - currency: string (e.g., 'EUR', 'JPY')
   - currencyDisplay: 'symbol' | 'code' | 'name'
   - maximumSignificantDigits: number
   - unit: string (for style 'unit', e.g., 'kilometer-per-hour', 'liter')
   - unitDisplay: 'short' | 'long'

Detailed Topics:
1. Constructor: Creates a new Intl.NumberFormat instance; accepts optional locales (as string or array) and an options object containing configuration parameters.
2. supportedLocalesOf: Determines supported locales from the provided list without falling back to the default locale.
3. format: Converts a number to a formatted string based on the locale and specified options.
4. Format Range Methods: Provide rich formatting options for numeric ranges, returning either a complete string or segmented parts for custom formatting.
5. resolvedOptions: Outputs the final configuration used by the formatter, allowing developers to inspect active settings.

## Supplementary Details
Parameter Values and Configurations:
- locales: Accepts BCP 47 language tags (e.g., 'en-US', 'de-DE').
- options:
   style: Default 'decimal'. When set to 'currency', requires a valid ISO 4217 currency code (e.g., 'EUR', 'JPY').
   currencyDisplay: Defaults to 'symbol'. Options: 'code', 'name'.
   maximumSignificantDigits: Numeric value to limit formatted digits (e.g., 3).
   unit: Requires a valid unit string when style is 'unit' (e.g., 'kilometer-per-hour').
   unitDisplay: 'short' (default) or 'long'.

Implementation Steps:
1. Create a new instance: new Intl.NumberFormat('locale', { options }).
2. Format numbers using format() for immediate output.
3. For finer control, use formatToParts() to get an array of parts with types such as 'integer', 'decimal', 'fraction'.
4. Use supportedLocalesOf() for validating locale support before instantiation.

Best Practices:
- Always provide explicit locale to avoid discrepancies.
- Use fallback locale arrays for broader compatibility.
- Validate resolvedOptions() to ensure configuration is as expected.

Troubleshooting Procedures:
- If output format is not as expected, check the options object and ensure correct types for style and currency.
- Use console.log(formatter.resolvedOptions()) to debug configuration.
- Verify browser compatibility if encountering unsupported behavior.

## Reference Details
API Specifications and Code Examples:

Constructor:
- Signature: new Intl.NumberFormat(locales?: string | string[], options?: {
    style?: 'decimal' | 'currency' | 'percent' | 'unit',
    currency?: string,
    currencyDisplay?: 'symbol' | 'code' | 'name',
    minimumIntegerDigits?: number,
    minimumFractionDigits?: number,
    maximumFractionDigits?: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    useGrouping?: boolean,
    unit?: string,
    unitDisplay?: 'short' | 'long',
    localeMatcher?: 'lookup' | 'best fit'
})

Static Method:
- Intl.NumberFormat.supportedLocalesOf(locales: string | string[], options?: { localeMatcher?: 'lookup' | 'best fit' }): string[]

Instance Methods:
1. format(number: number): string
2. formatRange(start: number, end: number): string
3. formatRangeToParts(start: number, end: number): Array<{ type: string, value: string }>
4. formatToParts(number: number): Array<{ type: string, value: string }>
5. resolvedOptions(): {
    locale: string,
    numberingSystem: string,
    style: string,
    currency?: string,
    currencyDisplay?: string,
    minimumIntegerDigits: number,
    minimumFractionDigits: number,
    maximumFractionDigits: number,
    minimumSignificantDigits?: number,
    maximumSignificantDigits?: number,
    useGrouping: boolean
}

Full Code Example (Currency Formatting):
------------------------------------------
// Create a formatter for German locale with Euro currency
const number = 123456.789;
const formatterDE = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
console.log(formatterDE.format(number));
// Expected output: "123.456,79 €"

// Japanese Yen formatting (no minor unit)
const formatterJP = new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' });
console.log(formatterJP.format(number));
// Expected output: "￥123,457"

// Formatting with significant digits
const formatterIN = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });
console.log(formatterIN.format(number));
// Expected output: "1,23,000"

Configuration Options Details:
- style defaults to 'decimal'; setting to 'currency' requires a valid currency code.
- maximumSignificantDigits supports any positive integer; typical values: 3 or 4.

Troubleshooting:
- Command: console.log(formatter.resolvedOptions());
  Expected output: An object with keys such as locale, numberingSystem, style, currency (if applicable), minimumIntegerDigits, and useGrouping.
- If output is inconsistent, verify the provided locale string and the options structure.

Best Practices:
- For internationalized applications, always specify the locale explicitly.
- Use fallback arrays for locales when uncertain about browser support, e.g., new Intl.NumberFormat(['ban', 'id']).
- Check resolvedOptions() to confirm that the formatter is configured correctly.

Exceptions:
- If an invalid currency code is passed when style is 'currency', a RangeError will be thrown.
- Similarly, invalid locales or options may result in a RangeError.

## Information Dense Extract
Intl.NumberFormat: constructor(new Intl.NumberFormat(locales?: string|array, options?: {style:'decimal'|'currency'|'percent'|'unit', currency?: string, currencyDisplay?: 'symbol'|'code'|'name', minimumIntegerDigits?: number, minimumFractionDigits?: number, maximumFractionDigits?: number, minimumSignificantDigits?: number, maximumSignificantDigits?: number, useGrouping?: boolean, unit?: string, unitDisplay?: 'short'|'long', localeMatcher?: 'lookup'|'best fit'})). Static: supportedLocalesOf(locales, options) => string[]. Instance: format(number) => string; formatRange(start, end) => string; formatRangeToParts(start, end) => Array<object>; formatToParts(number) => Array<object>; resolvedOptions() => object. Options example: { style:'currency', currency:'EUR' } => Output formatted according to locale. Code: new Intl.NumberFormat('de-DE', {style:'currency',currency:'EUR'}).format(123456.789) yields "123.456,79 €". Troubleshoot by logging resolvedOptions(); exceptions: RangeError for invalid codes or options.

## Sanitised Extract
Table of Contents:
1. Constructor
   - Usage: new Intl.NumberFormat([locales, options])
2. Static Method: supportedLocalesOf
   - Signature: Intl.NumberFormat.supportedLocalesOf(locales: string | string[], options?: object) => string[]
3. Instance Methods
   - format(number: number) => string
   - formatRange(start: number, end: number) => string
   - formatRangeToParts(start: number, end: number) => Array<Object>
   - formatToParts(number: number) => Array<Object>
   - resolvedOptions() => Object
4. Options & Configurations
   - style: 'decimal' | 'currency' | 'percent' | 'unit'
   - currency: string (e.g., 'EUR', 'JPY')
   - currencyDisplay: 'symbol' | 'code' | 'name'
   - maximumSignificantDigits: number
   - unit: string (for style 'unit', e.g., 'kilometer-per-hour', 'liter')
   - unitDisplay: 'short' | 'long'

Detailed Topics:
1. Constructor: Creates a new Intl.NumberFormat instance; accepts optional locales (as string or array) and an options object containing configuration parameters.
2. supportedLocalesOf: Determines supported locales from the provided list without falling back to the default locale.
3. format: Converts a number to a formatted string based on the locale and specified options.
4. Format Range Methods: Provide rich formatting options for numeric ranges, returning either a complete string or segmented parts for custom formatting.
5. resolvedOptions: Outputs the final configuration used by the formatter, allowing developers to inspect active settings.

## Original Source
MDN Intl.NumberFormat Documentation
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat

## Digest of INTL_NUMBERFORMAT

# Intl.NumberFormat Detailed Digest (Retrieved: 2025-02-11)

# Constructor
Intl.NumberFormat()
- Description: Creates a new NumberFormat object for language-sensitive number formatting.
- Usage: new Intl.NumberFormat([locales[, options]])

# Static Methods
1. Intl.NumberFormat.supportedLocalesOf(locales, options)
   - Parameters:
     - locales: (string | Array<string>) - the locale or locales to check for support
     - options: (object) - optional configuration.
   - Returns: An array of supported locale strings.

# Instance Properties
- constructor: Reference to Intl.NumberFormat constructor.
- [Symbol.toStringTag]: Defaults to "Intl.NumberFormat" used in Object.prototype.toString().

# Instance Methods
1. format(number)
   - Formats a number based on the provided locale and options.
   - Returns: A formatted string.

2. formatRange(start, end)
   - Formats a numeric range into a locale-aware string.
   - Returns: A formatted string representing the range.

3. formatRangeToParts(start, end)
   - Returns an Array of objects representing the range parts for custom formatting.

4. formatToParts(number)
   - Returns an Array of objects representing the parts of the formatted number with types.

5. resolvedOptions()
   - Returns an object with the actual properties resolved during initialization.

# Options and Configuration
- style: 'decimal', 'currency', 'percent', or 'unit'.
- currency: When style is 'currency', specify the currency code (e.g., 'EUR', 'JPY').
- currencyDisplay: 'symbol', 'code', or 'name' (affects how the currency is displayed).
- maximumSignificantDigits: Limits the number of significant digits (example: 3).
- unit: When style is 'unit', specify the unit (e.g., 'kilometer-per-hour', 'liter').
- unitDisplay: 'short' (default) or 'long'.

# Code Examples
Example 1: Currency Formatting
--------------------------------
const number = 123456.789;
console.log(new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(number));
// Output: "123.456,79 €"

Example 2: Japanese Yen Formatting
-----------------------------------
console.log(new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(number));
// Output: "￥123,457"

Example 3: Significant Digits
------------------------------
console.log(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(number));
// Output: "1,23,000"

Example 4: Formatting with Units
---------------------------------
console.log(new Intl.NumberFormat('pt-PT', { style: 'unit', unit: 'kilometer-per-hour' }).format(50));
// Output: "50 km/h"

# Implementation Patterns
- Always specify locale for UI consistency.
- Use fallback arrays when a locale may not be supported, e.g., new Intl.NumberFormat(['ban', 'id']).
- Leverage resolvedOptions() to debug or adjust settings dynamically.

# Browser Compatibility & Specifications
- Widely supported in modern browsers.
- Compliance with ECMAScript® 2026 Internationalization API Specification for number formatting.

# Attribution & Data Size
- Crawled from MDN Intl.NumberFormat Documentation with data size 1884357 bytes.

## Attribution
- Source: MDN Intl.NumberFormat Documentation
- URL: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
- License: CC BY-SA
- Crawl Date: 2025-04-29T20:50:44.522Z
- Data Size: 1884357 bytes
- Links Found: 16066

## Retrieved
2025-04-29
