# CACHE_INSPECTOR Feature Specification

## Overview

This feature introduces a cache inspection tool for the repository, allowing users to query and manage the in-memory cache used by the PLOT_ENGINE. By providing insights into active cache entries and their TTL (Time-To-Live) values, it enhances transparency of the caching mechanism and aids in debugging and performance tuning.

## Implementation Details

- **CLI Integration:**
  - Add a new flag `--inspect-cache` in the main CLI (`src/lib/main.js`).
  - When invoked, this flag will trigger a subroutine that scans the existing cache (implemented as a JavaScript `Map` in the PLOT_ENGINE) and outputs:
    - A list of active cache keys along with summary information (e.g., plot parameters such as formula and interval).
    - The remaining TTL for each cache entry.
  - Optionally, support an interactive mode via an additional flag (e.g., `--interactive`) to allow targeted deletion of specific cache entries or to flush the entire cache.

- **Cache Query Functionality:**
  - Provide helper functions to iterate over the cache, retrieve metadata, and calculate the remaining TTL based on the current system time and the entry's expiration timestamp.
  - Include robust error handling for scenarios such as an empty cache or cache entries that have terminated their TTL.

- **User Feedback:**
  - Output results in a clear, human-readable format that identifies each cache entry and its associated TTL.
  - If the cache is empty, display a friendly message informing the user accordingly.

## Testing and Documentation

- **Tests:**
  - Add unit tests to verify that the `--inspect-cache` flag returns the correct cache entries and accurately calculates remaining TTLs.
  - Handle edge cases including empty cache and expired entries.

- **Documentation:**
  - Update README.md and CONTRIBUTING.md with detailed usage examples and troubleshooting tips for cache inspection.
  - Include examples such as:
    - `node src/lib/main.js --inspect-cache`
    - `node src/lib/main.js --inspect-cache --interactive`

## Usage Examples

- **Standard Usage:**
  - Command: `node src/lib/main.js --inspect-cache`
  - Expected Behavior: Lists all active cache entries with their keys and remaining TTLs.

- **Interactive Mode:**
  - Command: `node src/lib/main.js --inspect-cache --interactive`
  - Expected Behavior: Initiates an interactive prompt to manage or clear specific cache entries.
