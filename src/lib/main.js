#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import { resolve } from "path";
import fs from "fs/promises";
import yaml from "js-yaml";

/**
 * Restore repository files from seed files based on agent-config.yaml.
 */
export async function reseed() {
  let configFile;
  try {
    configFile = await fs.readFile(resolve(process.cwd(), "agent-config.yaml"), "utf8");
  } catch (err) {
    console.log(`Failed to load agent-config.yaml: ${err.message}`);
    process.exit(1);
  }

  let config;
  try {
    config = yaml.load(configFile);
  } catch (err) {
    console.log(`Failed to parse agent-config.yaml: ${err.message}`);
    process.exit(1);
  }

  const seedCfg = config.seeding || {};
  if (
    !seedCfg.repositoryReseed ||
    seedCfg.repositoryReseed === "false" ||
    seedCfg.repositoryReseed === false
  ) {
    console.log("Reseeding is disabled in configuration.");
    process.exit(1);
  }

  const pathCfg = config.paths || {};
  const operations = [
    { name: "mission", src: seedCfg.missionFilepath, dest: pathCfg.missionFilepath.path },
    { name: "source", src: seedCfg.sourcePath, dest: pathCfg.targetSourcePath.path },
    { name: "tests", src: seedCfg.testsPath, dest: pathCfg.targetTestsPath.path },
    { name: "dependencies", src: seedCfg.dependenciesFilepath, dest: pathCfg.dependenciesFilepath.path },
    { name: "readme", src: seedCfg.readmeFilepath, dest: pathCfg.readmeFilepath.path },
  ];

  for (const op of operations) {
    try {
      await fs.copyFile(resolve(process.cwd(), op.src), resolve(process.cwd(), op.dest));
    } catch (err) {
      console.log(`Failed to copy ${op.name}: ${err.message}`);
      process.exit(1);
    }
  }

  console.log("Reseed complete:");
  operations.forEach((op) => {
    console.log(`  - ${op.name}: ${op.src} -> ${op.dest}`);
  });
  process.exit(0);
}

/**
 * Entry point for the CLI.
 * If first argument is 'reseed', invoke reseed(), otherwise default behavior.
 */
export async function main(args = process.argv.slice(2)) {
  if (args[0] === "reseed") {
    await reseed();
    return;
  }
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
