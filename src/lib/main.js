#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs/promises";
import yaml from "js-yaml";

export async function main(args = []) {
  if (args[0] === "reseed") {
    // Determine config file path
    const configIndex = args.findIndex(
      (arg) => arg === "--config" || arg === "-c"
    );
    const configPath =
      configIndex !== -1 && args[configIndex + 1]
        ? args[configIndex + 1]
        : "agent-config.yaml";

    // Load and parse config only if user specified --config or -c
    let configContent;
    if (configIndex !== -1) {
      try {
        configContent = await fs.readFile(configPath, "utf-8");
      } catch (err) {
        console.error(`Error processing ${configPath}: ${err.message}`);
        process.exit(1);
      }
    }

    let config;
    try {
      config = yaml.load(configContent);
    } catch (err) {
      console.error(`Error processing ${configPath}: ${err.message}`);
      process.exit(1);
    }

    const { seeding, paths } = config || {};
    const requiredKeys = [
      "repositoryReseed",
      "missionFilepath",
      "sourcePath",
      "testsPath",
      "dependenciesFilepath",
      "readmeFilepath",
    ];
    for (const key of requiredKeys) {
      if (!seeding || seeding[key] === undefined) {
        console.error(`Missing seed key: ${key}`);
        process.exit(1);
      }
    }

    // Define mapping of seeds to target paths
    const mapping = [
      { seedKey: "missionFilepath", targets: [paths.missionFilepath.path] },
      { seedKey: "sourcePath", targets: [paths.targetSourcePath.path] },
      {
        seedKey: "testsPath",
        targets: [
          paths.targetTestsPath.path,
          ...(paths.otherTestsPaths.paths || []),
        ],
      },
      { seedKey: "dependenciesFilepath", targets: [paths.dependenciesFilepath.path] },
      { seedKey: "readmeFilepath", targets: ["README.md"] },
    ];

    const operations = [];
    for (const { seedKey, targets } of mapping) {
      const seedFile = seeding[seedKey];
      let data;
      try {
        data = await fs.readFile(seedFile, "utf-8");
      } catch (err) {
        if (err.code === "ENOENT") {
          console.error(`Seed file not found: ${seedFile}`);
        } else {
          console.error(`Error processing ${seedFile}: ${err.message}`);
        }
        process.exit(1);
      }
      for (const target of targets) {
        try {
          await fs.writeFile(target, data, "utf-8");
        } catch (err) {
          console.error(`Error processing ${target}: ${err.message}`);
          process.exit(1);
        }
        operations.push(target);
      }
    }

    console.log(`Overwrote: ${operations.join(", ")}`);
    process.exit(0);
  }

  // default behavior
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}
