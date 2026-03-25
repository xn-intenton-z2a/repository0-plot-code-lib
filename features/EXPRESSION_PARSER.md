# EXPRESSION_PARSER

## Summary

Parse a simple mathematical expression string into a safe, evaluatable JavaScript function that computes y for a given x.

## Motivation

Provide a deterministic, tested way to turn user-supplied expressions such as "y=Math.sin(x)" or "y=x*x+2*x-1" into a callable function while preventing access to process, require, global objects or arbitrary evaluation.

## Scope

- Input: expression string starting with an assignment to y (for example "y=Math.sin(x)").
- Output: a named JavaScript function f(x) that returns the numeric y value.
- Reject expressions that contain unsafe identifiers or keywords (process, require, globalThis, window, eval, Function).

## Requirements

- Export parseExpression from src/lib/main.js as a named export.
- The returned function must accept a single numeric argument x and return numeric y.
- The parser must allow JavaScript Math functions (Math.sin, Math.cos, Math.log, etc.) and numeric constants.
- Simple validation must be performed to prevent injection: only allow characters, identifiers and tokens typical for math expressions and the Math namespace.

## Acceptance Criteria

- parseExpression called with "y=Math.sin(x)" returns a callable function.
- Calling the returned function with x=0 returns 0 (or a value numerically equal to 0).
- parseExpression called with "y=x*x+2*x-1" returns a function that for x=2 returns 7.
- parseExpression throws or returns a clear error when expression contains any of: process, require, Function, eval, globalThis, window.

## Notes

- Implementation recommendation: perform a whitelist validation on the expression then compile a small function that only exposes Math and x (for example by using a Function wrapper that receives Math and x as parameters). Avoid exposing Node globals.
