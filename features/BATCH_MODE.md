# BATCH_MODE Feature Specification (Enhanced)

## Overview
The BATCH_MODE feature enables users to automate and streamline plotting tasks by processing multiple plotting instructions from a single JSON configuration file. This enhancement introduces support for parallel execution of commands, concurrency control, and improved error recovery and reporting. With these enhancements, users benefit from faster processing of commands, a more responsive experience, and detailed summaries when executing batch jobs.

## New Enhancements
- **Parallel Command Execution:** Leverages asynchronous processing to execute multiple plotting and formula evaluation commands in parallel. This improves performance especially when dealing with large or complex batch configurations.

- **Concurrency Control:** Allows users to specify the maximum number of concurrent tasks. A configurable parameter (e.g., via the JSON configuration or CLI flag) provides flexibility to balance system load and processing speed.

- **Enhanced Error Handling and Recovery:** Implements robust error detection for each command execution. When a command fails, the feature captures detailed error messages, logs the command that failed, and continues processing the remaining commands if possible. A summary report lists both successful executions and errors.

- **Detailed Logging and Reporting:** Provides progress updates during batch execution and outputs a comprehensive summary at the end, including performance metrics, successful task counts, and a list of errors.

## Implementation Details
1. **Configuration File Processing:**
   - Extend the existing JSON configuration parser to support additional properties such as `maxConcurrency`.
   - Validate the batch configuration file’s existence, JSON structure, and each command’s correctness.

2. **Parallel Execution Engine:**
   - Implement an asynchronous execution engine within the batch mode handler. Use JavaScript Promises along with a concurrency limiter (such as a simple semaphore) to control the number of parallel tasks.
   - Incorporate error handling logic that logs failures without halting execution of subsequent commands.

3. **Logging and Summary Reporting:**
   - Enhance the logging functionality to provide real-time updates during batch processing.
   - Generate a final summary report detailing overall success, failures, and performance statistics.

4. **Integration and Testing:
   - Update unit and integration tests to include scenarios with parallel execution and varied concurrency settings.
   - Update CLI documentation and README examples to include instructions for using the new `maxConcurrency` parameter.

## Usage Examples
**CLI Usage:**
```bash
node src/lib/main.js --batch batch_config.json
```

**Example JSON Configuration (batch_config.json):**
```json
{
  "maxConcurrency": 3,
  "commands": [
    { "command": "advanced", "plotType": "spiral", "params": "1,NaN,5,-10,10,1" },
    { "command": "formula", "formula": "sin(x) + cos(x)", "domain": [0, 10, 0.1] }
  ]
}
```

**Summary Reporting:**
After processing, the output will include a summary similar to:

```
Batch Execution Summary:
- Total Commands: 2
- Successful: 2
- Failed: 0
- Execution Time: 1.2s
```

This enhanced BATCH_MODE feature capitalizes on parallel processing and robust error handling, aligning with our mission to provide a fast, efficient, and reliable plotting library.
