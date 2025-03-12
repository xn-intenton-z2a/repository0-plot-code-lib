# repository0-plot-code-lib

Contributing guidelines here apply to human and chat completion developers.
This repository uses the intentïon agentic‑lib for automated workflows. See: [intentïon agentic‑lib](https://github.com/xn-intenton-z2a/agentic-lib)

# Mission Statement

_"Be a go-to plot library with a CLI, be the jq of formulae visualisations."_

## Project goals

# Equation Plotter Features Summary

- **Mathematical Functions:**  
  Supports plotting of quadratic, linear, sine, cosine, polar, exponential, and logarithmic functions.

- **Multiple Output Formats:**  
  Generates plots in SVG, JSON, CSV, Markdown, ASCII, and HTML formats.

- **Custom Range Function:**  
  Uses an in-house range generator to produce number sequences without external libraries.

- **Flexible CLI:**  
  Offers a command-line interface with options for default demo mode, interactive mode, and various flags (e.g., --grid, --json, --csv, --ascii, --md, --html) for customizing output.

- **CLI demo:**
  Keep a short reliable demo that will run from `node run start`.

## The Automated Contribution Process

Our contribution workflow is fully automated—your role is simple:

1. **Open an Issue:**  
   Describe your idea, report a bug, or suggest an improvement by opening an issue in our repository.

2. **Label It as `automated`:**  
   Add the `automated` label to your issue. This is the trigger that starts our workflow.

3. **Automation Takes Over:**  

## Agentic contribution house choice options (programmatically parsed): START

Workflow schedule: schedule-1

## Issue House Choice Options

repository specific activities:
- Create, vary or extend as many library functions as you can that deliver the spirit of this CONTRIBUTING.md Update the Change Log in README.md (or say what was checked).

generic activities:
- Update the source file by applying the Mission Statement to prune any "drift" from the source file. Update the Change Log in README.md (or say what was checked).
- Create, vary or extend as many features in the source file as you can inline with the Mission Statement. Update the Change Log in README.md (or say what was checked).

undocumented chores:
- Refresh the README, consulting the guidance in CONTRIBUTING.md while retaining any relevant content and pruning irrelevant content.
- Bring test coverage up as close to 100% as possible, have single layer mocked tests and deeper tests mocking at the external resource (e.g. file system or network).

## Agentic contribution house choice options (programmatically parsed): END

unused generic activities:
- Find anything that might be a "simulated" or "demo" implementation and switch to a real implementation. Update the Change Log in README.md (or say what was checked).
- Consider alternate code paths that could be explicitly handled to improve the range of supported behaviours. Update the Change Log in README.md (or say what was checked).
- Look for code that could be simplified using a library and introduce that library. Update the Change Log in README.md (or say what was checked).

unused undocumented chores:
- Dry-run any examples in comments or the README against the current code and if they are not accurate or if they could cover more features, update the docs or code to be accurate.
- Ensure the main function so that it generates some demo output without an over the wire call, and hint a CLI switch that will do the real call.
