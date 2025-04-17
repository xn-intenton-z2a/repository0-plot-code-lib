# OCLIF_DOCS

## Crawl Summary
Commands for installing, generating, initializing, and running an oclif-based CLI are provided. Key commands: 'npm install --global oclif', 'oclif generate mynewcli' for creating a new CLI, 'oclif init' for adding oclif to an existing project, and methods to add new commands (oclif generate command foo:bar) and hooks (oclif generate hook my-hook --event init). The documentation includes exact command usage, flag options, configuration steps, and file locations for generated CI projects.

## Normalised Extract
# Table of Contents
1. Installation and Requirements
2. New CLI Project Generation
3. Running the CLI (Development and Production Modes)
4. Initializing oclif in Existing Project
5. Adding Commands and Hooks
6. oclif init Command Detailed Usage

# 1. Installation and Requirements
- Command:
  npm install --global oclif
- Requirement: Only Node LTS versions supported.

# 2. New CLI Project Generation
- Command:
  oclif generate mynewcli
- Prompts:
  • Module type: [ESM, CommonJS]
  • NPM package name
  • CLI Bin name (exported command name)
- After generation: Change directory using cd mynewcli

# 3. Running the CLI
## Development Mode
- Command:
  ./bin/dev.js hello world
- Production Mode:
  ./bin/run.js hello world

# 4. Initializing oclif in Existing Project
- Command:
  oclif init
- Adds files:
  • bin/run.js, bin/run.cmd, bin/dev.js, bin/dev.cmd
  • oclif section in package.json with properties: bin, dirname, commands, topicSeparator
  • Dependencies: @oclif/core and devDependencies: ts-node

# 5. Adding Commands and Hooks
## Adding a Command
- Command:
  oclif generate command foo:bar
- Creates file: src/commands/foo/bar.ts

## Adding a Hook
- Command:
  oclif generate hook my-hook --event init

# 6. oclif init Command Detailed Usage
- Usage:
  oclif init [--bin <value>] [--module-type ESM|CommonJS] [--package-manager npm|yarn|pnpm] [--topic-separator colons|spaces] [-d <value>] [-y]
- Flags and Options:
  • --output-dir: Directory to initialize in
  • --yes: Use default answers
  • --bin: Define CLI bin name
  • --module-type: Choose between ESM and CommonJS
  • --package-manager: Choose npm, yarn, or pnpm
  • --topic-separator: Choose between colons and spaces
- Examples provided for different scenarios


## Supplementary Details
# Supplementary Technical Specifications

## oclif init Command Flag Definitions

- --output-dir (-d): String value; specifies the target directory for initialization. No default value.
- --yes (-y): Boolean flag; when set, bypasses prompts using default values.
- --bin: String value; defines the command bin name to be exported (e.g., mycli).
- --module-type: Must be one of [ESM, CommonJS]. Controls the module system in the generated project.
- --package-manager: Must be one of [npm, yarn, pnpm]; determines which package manager to configure in the generated project.
- --topic-separator: Must be one of [colons, spaces]; configures how subcommands are delimited in the CLI (e.g., 'mycli do:something' vs 'mycli do something').

## Project Configuration

When using oclif init, the following modifications are made:

- A new section is injected into package.json under the key "oclif":
  {
    "oclif": {
      "bin": "my-pkg",
      "dirname": "./src/commands",
      "commands": "./src/commands",
      "topicSeparator": "colons"
    }
  }

- Installation of dependencies:
  • @oclif/core is added to dependencies if missing.
  • ts-node is added to devDependencies if missing.

## File Structure Examples

- Generated CLI project has:
  • bin/run.js and bin/dev.js for production and development respectively.
  • Commands placed in the ./src/commands directory.

## Best Practices

- Use the --yes flag during automated deployments to ensure consistent default configurations.
- Confirm the Node LTS version requirement before deploying your CLI application.
- Validate the outputs of oclif generate commands by inspecting generated file paths and package.json modifications.


## Reference Details
# Complete API Specifications and Implementation Details

## CLI Command Generation

- Method: oclif generate command [commandName]

  Example:
  ```bash
  $ oclif generate command foo:bar
  ```

  This command creates a TypeScript file at ./src/commands/foo/bar.ts. In the generated file, you may see code resembling:

  ```typescript
  import {Command, flags} from '@oclif/command';

  export default class FooBar extends Command {
    static description = 'Describe the command here';

    static flags = {
      help: flags.help({char: 'h'}),
      // Define additional flags with default values and descriptions
      file: flags.string({char: 'f', description: 'file to process', required: true}),
    };

    static args = [
      {name: 'input', required: true, description: 'Input file path'},
      {name: 'output', required: false, description: 'Output file path'},
    ];

    async run() {
      const {args, flags} = this.parse(FooBar);
      // Implementation code here
      this.log(`Processing file: ${args.input} with flag file: ${flags.file}`);
    }
  }
  ```

## Lifecycle Event Hooks

- Method: oclif generate hook [hookName] --event [eventName]

  Example:
  ```bash
  $ oclif generate hook my-hook --event init
  ```

  This creates a hook that listens for the 'init' event. The hook file might include:

  ```typescript
  export default async function (options: any) {
    // Hook triggered during initialization
    if(options && options.config) {
      // Custom initialization logic
      console.log('Init hook triggered with config:', options.config);
    }
  }
  ```

## oclif init Command Detailed API

- Command: oclif init

  Usage Example with flags:
  ```bash
  $ oclif init --output-dir "/path/to/project" --bin mycli --module-type ESM --package-manager npm --topic-separator colons
  ```

- Detailed Parameters:
  - output-dir (-d): string (directory path)
  - yes (-y): boolean
  - bin: string (CLI bin name)
  - module-type: string enum ("ESM" | "CommonJS")
  - package-manager: string enum ("npm" | "yarn" | "pnpm")
  - topic-separator: string enum ("colons" | "spaces")

## Error Handling Example

Within an oclif command, errors can be thrown with detailed context:

  ```typescript
  class MyCommand extends Command {
    async run() {
      try {
        // Command logic...
      } catch (error) {
        this.error('An error has occurred!', {
          code: 'OCLIF_ERR',
          ref: 'https://oclif.io/docs/commands#thiserrormessage-string--error-options-code-string-exit-number',
          suggestions: ['Check your input parameters', 'Ensure dependencies are installed']
        });
      }
    }
  }
  ```

## Troubleshooting Procedures

1. If a command is not found, verify that the file exists in the './src/commands' directory and that the package.json 'oclif' section correctly references it.

2. For issues related to flag parsing:
   - Run the command with the --help flag to review required flags and arguments.
   - Example:
     ```bash
     $ ./bin/dev.js mycommand --help
     ```
3. To debug initialization errors, check the output of:
   ```bash
   $ oclif init --output-dir "/path/to/project" --yes
   ```
   and review the modifications in package.json to ensure the 'oclif' section is configured correctly.

4. Ensure Node version compatibility by running:
   ```bash
   $ node -v
   ```
   The CLI requires an LTS version of Node (e.g. Node 14 or Node 16).

## Best Practices

- Always use version control when generating new projects with oclif to track configuration changes.
- Utilize the --yes flag in CI/CD pipelines to standardize CLI initialization.
- Validate the output of 'oclif generate' commands by comparing file structure and configuration settings against the official documentation.
- For plugin development, confirm that command discovery strategies work by using clearly defined file paths and names.

This complete set of API specifications, method signatures, example code, configuration details, and troubleshooting commands is intended for direct use by developers building and maintaining oclif-based CLIs.


## Original Source
oclif Documentation
https://oclif.io/docs/introduction

## Digest of OCLIF_DOCS

# Introduction
Retrieved on: 2023-10-30

oclif is an open source framework for building command-line interfaces (CLIs) in Node.js and TypeScript. It supports a minimal runtime footprint and allows extensive customization including custom flag parsers, help output, and plugin-based extensions.

# Installation and Requirements

- Only Node LTS versions are supported.
- To install the oclif CLI globally, run:

  npm install --global oclif

# Creating a New CLI Project

## Using oclif generate

Run the command:

  oclif generate mynewcli

The generator prompts:
- Module type: ESM or CommonJS
- NPM package name
- Command bin name which will be exported (e.g., mynewcli)

After generation, change directory and run development mode:

  cd mynewcli
  ./bin/dev.js hello world

Example source file: ./src/commands/hello/world.ts

Production mode can be run using:

  ./bin/run.js hello world

# Initializing oclif in an Existing Project

Use the command:

  oclif init

Example prompt responses:
- Command bin name (e.g., my-pkg)
- Topic separator: spaces or colons
- Module type: CommonJS (or ESM)
- Package manager: npm, yarn, or pnpm

oclif init adds:
- Bin scripts: bin/run.js, bin/run.cmd, bin/dev.js, bin/dev.cmd
- An "oclif" section in package.json with properties: bin, dirname, commands, topicSeparator
- Dependencies: adds @oclif/core if not present
- Dev dependencies: adds ts-node if not present

# Running and Developing the CLI

## Development Mode

  ./bin/dev.js hello world

## Production Mode

  ./bin/run.js hello world

# Adding New Commands and Hooks

## Adding a Command

To add a new command, for example, a command at src/commands/foo/bar.ts, run:

  oclif generate command foo:bar

This generates a TypeScript file with command arguments and flag definitions.

## Adding a Hook

To add a lifecycle hook (e.g. for event 'init'), run:

  oclif generate hook my-hook --event init

# oclif init Command Detailed Help

Usage and flags for 'oclif init':

```
USAGE
  $ oclif init [--bin <value>] [--module-type ESM|CommonJS] [--package-manager npm|yarn|pnpm] [--topic-separator colons|spaces] [-d <value>] [-y]

FLAGS
  -d, --output-dir=<value>        Directory to initialize the CLI in.
  -y, --yes                       Use defaults for all prompts. Individual flags override defaults.
  --bin=<value>                   Supply answer for prompt: Command bin name the CLI will export
  --module-type=<option>          Supply answer for prompt: Select a module type (<options: ESM|CommonJS>)
  --package-manager=<option>      Supply answer for prompt: Select a package manager (<options: npm|yarn|pnpm>)
  --topic-separator=<option>      Supply answer for prompt: Select a topic separator (<options: colons|spaces>)

DESCRIPTION
  Initialize a new oclif CLI
  This will add the necessary oclif bin files, configuration in package.json, and install @oclif/core and ts-node.

EXAMPLES
  Initialize in current directory:
    $ oclif init

  Initialize in a different directory:
    $ oclif init --output-dir "/path/to/existing/project"

  Supply specific answers:
    $ oclif init --topic-separator colons --bin mycli
```

# Attribution

Data Size: 3987818 bytes | Links Found: 3238


## Attribution
- Source: oclif Documentation
- URL: https://oclif.io/docs/introduction
- License: MIT
- Crawl Date: 2025-04-17T15:26:23.276Z
- Data Size: 3987818 bytes
- Links Found: 3238

## Retrieved
2025-04-17
