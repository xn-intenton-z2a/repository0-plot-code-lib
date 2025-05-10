# Purpose

Add performance profiling capabilities to measure time taken by plot generation stages for large datasets

# Behavior

When users include the profile flag in the plot CLI invocation the application marks key stages of the generation process including sampling formula evaluation and formatting
At completion the CLI outputs a summary of elapsed times for each stage or writes a JSON report to a file if profile output path is specified

# Implementation

In src lib main js extend the CLI option schema to include profile and profile output path using zod
Import perf hooks from node perf hooks and instrument performance marks before and after sample computation formula evaluation and output rendering
After rendering call performance measure to capture durations then collect entries and format a text summary or a JSON object
Write the report to stdout or to the configured output file using fs
Ensure builtin perf hooks are used without new dependencies

# Testing

Add unit tests in tests unit main test js to simulate runs with profile flag by mocking perf hooks entries and verifying that measurements are collected and output contains expected stage labels and durations
Test writing a JSON report to a file path and handle errors when the file path is invalid

# Documentation

Update README md to add Profiling section under CLI Usage describing profile and profile output options with examples of summary and JSON report
Update USAGE md to mirror these additions