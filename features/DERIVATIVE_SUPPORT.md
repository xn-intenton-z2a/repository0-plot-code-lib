# Purpose

Provide derivative calculation support to generate and plot the derivative of a mathematical expression with respect to x.

# Behavior

## Programmatic API

Extend getTimeSeries(expression, range, options) to accept an options.derivative boolean flag. When derivative is true compute the symbolic derivative of the expression using mathjs.derivative, then evaluate the derivative expression across the specified range. Return an array of points where each y value is the derivative at x.

## Command Line Interface

Add a global flag --derivative default false. In timeseries mode when --derivative is set produce a data series for the derivative. In plot mode plot the derivative line instead of the original expression.

## HTTP Server API

Accept a query parameter derivative for GET endpoints and a body parameter derivative for POST /plot, default false. When derivative=true compute and return the derivative time series in the requested format or plot the derivative curve.

# Implementation

In src/lib/main.js import derivative from mathjs. Update getTimeSeries to accept options.derivative and branch to compute and evaluate the derived expression when set. In the commander setup add --derivative as a boolean option and include it in the Zod schema for CLI validation. In the HTTP server extend querySchema and formSchema to parse a boolean derivative field with default false, and pass the flag to getTimeSeries and plot handlers.

# Testing

Add unit tests for getTimeSeries with derivative option to confirm derivative series matches expected values. Add mainCLI tests invoking --derivative in both timeseries and plot commands and verify output. Add integration tests for HTTP endpoints /json, /csv, and /plot with derivative queries and body parameters to ensure the derivative series and plots are returned correctly. Ensure existing tests remain passing.