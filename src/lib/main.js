#!/usr/bin/env node
// src/lib/main.js

import { fileURLToPath } from "url";
import fs from "fs/promises";
import yaml from "js-yaml";
import { execSync } from "child_process";
import { Octokit } from "@octokit/rest";

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

  if (args[0] === "open-release-pr") {
    const argv = args.slice(1);
    const getArg = (flag) => {
      const i = argv.indexOf(flag);
      return i >= 0 && argv[i + 1] ? argv[i + 1] : null;
    };
    const token = getArg("--token") || process.env.GITHUB_TOKEN;
    const base = getArg("--base");
    const version = getArg("--release-version");
    const changelog = getArg("--changelog");
    if (!token || !base || !version || !changelog) {
      console.error(
        "Error: Missing required options --token, --base, --release-version, and --changelog"
      );
      process.exit(1);
    }
    if (!/^\d+\.\d+\.\d+$/.test(version)) {
      console.error("Error: Invalid semver version");
      process.exit(1);
    }

    let pkg;
    try {
      pkg = JSON.parse(await fs.readFile("package.json", "utf-8"));
    } catch (err) {
      console.error(`Error reading package.json: ${err.message}`);
      process.exit(1);
    }
    pkg.version = version;
    const pkgContent = JSON.stringify(pkg, null, 2) + "\n";

    let existingChangelog;
    try {
      existingChangelog = await fs.readFile(changelog, "utf-8");
    } catch (err) {
      console.error(`Error reading changelog: ${err.message}`);
      process.exit(1);
    }

    let previousTag;
    try {
      previousTag = execSync("git describe --tags --abbrev=0").toString().trim();
    } catch (err) {
      previousTag = "";
    }
    let commitList;
    try {
      commitList = execSync(
        `git log ${previousTag}..HEAD --pretty=format:"- %s"`
      ).toString();
    } catch (_) {
      commitList = "";
    }
    const date = new Date().toISOString().split("T")[0];
    const newChangelog =
      `## v${version} – ${date}\n\n${commitList}\n\n${existingChangelog}`;

    const ownerRepo = process.env.GITHUB_REPOSITORY;
    if (!ownerRepo) {
      console.error(
        "Error: GITHUB_REPOSITORY environment variable not set"
      );
      process.exit(1);
    }
    const [owner, repo] = ownerRepo.split("/");
    const octokit = new Octokit({ auth: token });
    try {
      const baseRef = await octokit.git.getRef({
        owner,
        repo,
        ref: `heads/${base}`,
      });
      const sha = baseRef.data.object.sha;
      await octokit.git.createRef({
        owner,
        repo,
        ref: `refs/heads/release/v${version}`,
        sha,
      });
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: "package.json",
        message: `chore(release): bump version to v${version}`,
        content: Buffer.from(pkgContent).toString("base64"),
        branch: `release/v${version}`,
      });
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: changelog,
        message: `chore(release): update changelog for v${version}`,
        content: Buffer.from(newChangelog).toString("base64"),
        branch: `release/v${version}`,
      });
      const pr = await octokit.pulls.create({
        owner,
        repo,
        head: `release/v${version}`,
        base,
        title: `chore(release): v${version}`,
        body: `Release v${version}`,
      });
      console.log(pr.data.html_url);
      process.exit(0);
    } catch (err) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  }

  // default behavior
  console.log(`Run with: ${JSON.stringify(args)}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2));
}
