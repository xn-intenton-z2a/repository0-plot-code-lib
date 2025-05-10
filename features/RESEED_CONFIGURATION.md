# Purpose

This feature adds a new CLI flag reseed that triggers reseeding of the repository with the latest agentic lib driven configuration from AGENT_CONFIG_FILE

# Behavior

When invoked as repository0-plot-code-lib --reseed the CLI will parse the agent config yaml and for each seeding mapping copy contents from seed files to corresponding target paths writing source main js tests package json and readme

# Implementation

In src/lib/main js import fs promises and js yaml to read the config file Detect the --reseed flag in args For each key under config seeding section read seed filepath and target filepath then overwrite the target with seed content preserving file permissions and logging progress

# Testing

Extend tests in tests unit plot generation test js to mock fs and yaml read operations Verify reseed logic writes files for all configured paths and handles missing seed files gracefully reporting errors

# Documentation

Update USAGE md and README md to document the --reseed flag usage with example invocation and effect