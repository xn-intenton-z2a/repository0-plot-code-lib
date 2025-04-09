# NAN_HANDLER

## Overview
This feature provides a centralized module for managing NaN alias resolution in the plotting library. It ensures that invalid numerical values are consistently recognized and handled across all components of the system.

## Key Objectives
- **Configurable NaN Resolutions:** Allow the library to operate in different modes, supporting strict mode, custom alias merging, and full override based on environment variables.
- **Robust Error Handling:** Enhance diagnostic outputs by clearly logging the active set of NaN aliases and addressing misconfigurations early in the tool's lifecycle.

## Design Details
- **Strict Mode:** When the environment variable `STRICT_NAN_MODE` is set to "true", the module returns only the canonical alias `nan`.
- **Custom Aliases:** If `LOCALE_NAN_ALIASES` is provided, the module merges these with the default set (`nan`, `notanumber`, `undefined`) while ensuring deduplication.
- **Override Capability:** The `LOCALE_NAN_OVERRIDE` option allows complete replacement of the default aliases, providing flexibility for locale-specific needs.

## Implementation & Testing
- **Single Module Integration:** The functionality is implemented in `src/lib/main.js` as the `resolveNaNAliases` function.
- **Comprehensive Unit Tests:** Tests ensure the correct behavior for strict mode, merging custom aliases, and complete override using the configuration options.
- **Diagnostic Logging:** On initialization, the module logs the active NaN aliases for transparency and troubleshooting.

## Usage
- **Library Integration:** Import the `resolveNaNAliases` function to reliably manage NaN configurations.
- **Environment Configuration:** Adjust behavior via environment variables for varying runtime contexts, whether for development or production.

By implementing the NAN_HANDLER, the repository enhances its resilience and configurability, aligning with our mission to provide a robust, go-to tool for formula visualisations.
