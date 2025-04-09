# CORE_ENGINE Feature (Enhanced)

## Overview
The CORE_ENGINE remains the backbone of our plotting library. In this update, we integrate our robust numeric parsing, advanced JSON-based parameter configuration, and batch plotting support into a unified system. This update improves error handling, extended Unicode normalization and locale-specific number formatting, while preserving our mission of being the go-to tool for formula visualisations.

## JSON Configuration Integration
- **Objective:** Enhance plot configurations by accepting detailed JSON objects to define data arrays, labels, colors, and titles.
- **Features:**
  - Parse parameters as JSON when the input string begins with `{` and ends with `}`.
  - Provide clear error messages for invalid JSON and ensure smooth integration with numeric routines.
  - Update documentation and tests with practical examples for both CLI and web API usage.

## Advanced Numeric Parsing & Error Handling
- **Objective:** Provide robust numeric validation and customization for international or strict numeric inputs.
- **Features:**
  - Utilize Zod schema for comprehensive token transformation including trimming, Unicode normalization (NFC), and locale-aware lower-casing.
  - Support a configurable set of accepted NaN aliases (with full Unicode support) and enforce a canonical form in strict mode.
  - Allow for custom error handling callbacks for flexible error reporting in different environments.
  - Handle thousands separators appropriately based on locale settings (English or European), ensuring precision in numeric conversions.

## Batch Plotting Commands
- **Objective:** Improve user productivity by processing multiple plotting commands in a single CLI invocation.
- **Features:**
  - Seamlessly integrate advanced and non-advanced command handling within the same run.
  - Ensure independent validation and error logging for each command.
  - Provide detailed output and diagnostic logging, enabling efficient debugging and scriptability.

## Benefits
- **Unified Functionality:** Combines core plotting routines with advanced JSON configuration, robust numeric parsing, and batch command processing.
- **Enhanced User Experience:** Customizable and locale-aware numeric handling paired with flexible configuration support directly benefits users working with complex plot setups.
- **Mission Alignment:** Advances our goal of delivering a versatile, user-friendly formula visualization tool with a strong emphasis on reliability and internationalization.
