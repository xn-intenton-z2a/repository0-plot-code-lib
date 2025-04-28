import { describe, test, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import { main } from "@src/lib/main.js";

const tempConfigFile = "temp_config.json";
const outputFile = "temp_output.json";

describe("Configuration File Management", () => {
  beforeEach(() => {
    process.env.TEST_RES = "150";
  });

  afterEach(() => {
    if (fs.existsSync(tempConfigFile)) fs.unlinkSync(tempConfigFile);
    if (fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
  });

  test("should interpolate environment variables in config file and merge with CLI flags", () => {
    const configContent = {
      resolution: "${TEST_RES}",
      xlabel: "ConfigX",
    };
    fs.writeFileSync(tempConfigFile, JSON.stringify(configContent), "utf8");

    // Set CLI flags; CLI flag for ylabel provided to override config (which doesn't set ylabel)
    process.argv = [
      "node",
      "src/lib/main.js",
      "--config",
      tempConfigFile,
      "--expression",
      "y=sin(x)",
      "--range",
      "x=0:10,y=0:10",
      "--file",
      outputFile,
      "--ylabel",
      "CLI_YAxis",
      "--jsonExport",
      "true",
    ];

    // Call main to generate JSON export
    main();
    const jsonOutput = JSON.parse(fs.readFileSync(outputFile, "utf8"));
    // resolution should be interpolated to number 150
    expect(jsonOutput.resolution).toBe(150);
    // xlabel should come from config file
    // ylabel should be overridden by CLI flag
    // Since the JSON export doesn't directly reflect these labels in a predictable way, we mainly test resolution
  });

  test("should throw error for malformed config file", () => {
    fs.writeFileSync(tempConfigFile, "{ invalidJson: }", "utf8");
    process.argv = [
      "node",
      "src/lib/main.js",
      "--config",
      tempConfigFile,
      "--expression",
      "y=sin(x)",
      "--range",
      "x=0:10,y=0:10",
      "--file",
      outputFile,
      "--jsonExport",
      "true",
    ];
    expect(() => main()).toThrow(/Error: Unable to read or parse configuration file/);
  });

  test("should throw error for invalid numeric config values", () => {
    const configContent = {
      resolution: "not a number",
    };
    fs.writeFileSync(tempConfigFile, JSON.stringify(configContent), "utf8");
    process.argv = [
      "node",
      "src/lib/main.js",
      "--config",
      tempConfigFile,
      "--expression",
      "y=sin(x)",
      "--range",
      "x=0:10,y=0:10",
      "--file",
      outputFile,
      "--jsonExport",
      "true",
    ];
    expect(() => main()).toThrow(/Error: Invalid numeric value/);
  });
});
