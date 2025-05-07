# Overview

Add detailed performance and memory usage profiling for large dataset rendering to help developers identify bottlenecks and optimize the rendering pipeline.

# CLI Interface

--profile         Optional flag to enable profiling output.
--profile-output  Optional file path to write the JSON profiling report. If omitted, profiling is printed to stdout.

# Behavior

1. Extend parseArgs to support --profile and --profile-output flags.
2. When profiling is enabled:
   • Record timestamp and memory usage before data generation.
   • After data generation, capture elapsed time and memory delta.
   • If downsampling is applied (when --max-points is used), capture a second snapshot after downsampling.
   • Before SVG rendering, record a profiling snapshot.
   • After SVG string is produced, record a snapshot for SVG generation time and memory usage.
   • If format is png, before PNG conversion record a snapshot and after conversion record a final snapshot.
   • Assemble an array of profiling stages with fields: stage, durationMs, memoryDeltaBytes, and timestamp.
   • At completion, serialize the profiling report as JSON and write to the provided profile-output path or stdout.

# Tests

Create tests/unit/profile-report.test.js:

• Invoke main with --expression "y=x" --range 0:1 --points 10 --profile and capture stdout.
  - Parse the stdout as JSON.
  - Assert the report is an array of profiling entries containing keys stage, durationMs, memoryDeltaBytes.

• Invoke main with --expression "y=x" --range 0:1 --points 10 --profile --profile-output report.json:
  - After execution assert exit code 0.
  - Assert fs.existsSync('report.json') is true.
  - Read and parse report.json as JSON and verify it matches the expected structure.

# Documentation Updates

In USAGE.md add a section "Profiling Performance" describing:

- The --profile flag and optional --profile-output.
- Example invocation:
  repository0-plot-code-lib --expression "y=sin(x)" --range 0:6.28 --points 5000 --max-points 1000 --profile

- Example profiling output:
  [
    { "stage": "data-generation", "durationMs": 12.5, "memoryDeltaBytes": 204800 },
    { "stage": "downsampling", "durationMs": 5.0, "memoryDeltaBytes": 102400 },
    { "stage": "svg-render", "durationMs": 30.2, "memoryDeltaBytes": 512000 },
    { "stage": "png-conversion", "durationMs": 45.7, "memoryDeltaBytes": 1024000 }
  ]

In README.md under "Examples" add a subsection "Profiling Rendering Pipeline" with:

repository0-plot-code-lib --expression "y=x^2" --range -5:5 --max-points 2000 --profile --profile-output pipeline.json
