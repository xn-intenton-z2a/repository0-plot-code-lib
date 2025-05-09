import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import fs from "fs/promises";
import yaml from "js-yaml";
import { main } from "@src/lib/main.js";

describe("reseed command", () => {
  let consoleLogSpy;
  let consoleErrorSpy;
  let exitSpy;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((code) => {
        throw new Error(`exit:${code}`);
      });
    vi.spyOn(fs, "readFile").mockReset();
    vi.spyOn(fs, "writeFile").mockReset();
    vi.spyOn(yaml, "load").mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("successful reseed", async () => {
    const config = {
      seeding: {
        repositoryReseed: true,
        missionFilepath: "seedM",
        sourcePath: "seedS",
        testsPath: "seedT",
        dependenciesFilepath: "seedP",
        readmeFilepath: "seedR",
      },
      paths: {
        missionFilepath: { path: "M1" },
        targetSourcePath: { path: "S1" },
        targetTestsPath: { path: "T1" },
        otherTestsPaths: { paths: ["T2"] },
        dependenciesFilepath: { path: "P1" },
        documentationPath: { path: "U1" },
      },
    };
    yaml.load.mockReturnValue(config);
    // mock reading seed files
    vi.spyOn(fs, "readFile").mockImplementation((path, _enc) => {
      if (["seedM", "seedS", "seedT", "seedP", "seedR"].includes(path)) {
        return Promise.resolve(`data-${path}`);
      }
      // config file
      return Promise.resolve("");
    });
    vi.spyOn(fs, "writeFile").mockResolvedValue();

    try {
      await main(["reseed", "--config", "configPath"]);
    } catch (e) {
      expect(e.message).toBe("exit:0");
    }

    expect(fs.readFile).toHaveBeenCalledWith("configPath", "utf-8");
    expect(fs.readFile).toHaveBeenCalledWith("seedM", "utf-8");
    expect(fs.readFile).toHaveBeenCalledWith("seedS", "utf-8");
    expect(fs.readFile).toHaveBeenCalledWith("seedT", "utf-8");
    expect(fs.readFile).toHaveBeenCalledWith("seedP", "utf-8");
    expect(fs.readFile).toHaveBeenCalledWith("seedR", "utf-8");
    expect(fs.writeFile).toHaveBeenCalledWith("M1", "data-seedM", "utf-8");
    expect(fs.writeFile).toHaveBeenCalledWith("S1", "data-seedS", "utf-8");
    expect(fs.writeFile).toHaveBeenCalledWith("T1", "data-seedT", "utf-8");
    expect(fs.writeFile).toHaveBeenCalledWith("T2", "data-seedT", "utf-8");
    expect(fs.writeFile).toHaveBeenCalledWith("P1", "data-seedP", "utf-8");
    expect(fs.writeFile).toHaveBeenCalledWith("README.md", "data-seedR", "utf-8");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "Overwrote: M1, S1, T1, T2, P1, README.md"
    );
  });

  test("missing seed key", async () => {
    yaml.load.mockReturnValue({ seeding: {} });
    try {
      await main(["reseed"]);
    } catch (e) {
      // ignore
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Missing seed key: repositoryReseed"
    );
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  test("seed file not found", async () => {
    const config = {
      seeding: {
        repositoryReseed: true,
        missionFilepath: "seedM",
        sourcePath: "seedS",
        testsPath: "seedT",
        dependenciesFilepath: "seedP",
        readmeFilepath: "seedR",
      },
      paths: {
        missionFilepath: { path: "M1" },
        targetSourcePath: { path: "S1" },
        targetTestsPath: { path: "T1" },
        otherTestsPaths: { paths: ["T2"] },
        dependenciesFilepath: { path: "P1" },
        documentationPath: { path: "U1" },
      },
    };
    yaml.load.mockReturnValue(config);
    vi.spyOn(fs, "readFile").mockRejectedValueOnce(
      Object.assign(new Error("not found"), { code: "ENOENT" })
    );
    try {
      await main(["reseed"]);
    } catch (e) {
      // ignore
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith("Seed file not found: seedM");
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  test("error on writeFile", async () => {
    const config = {
      seeding: {
        repositoryReseed: true,
        missionFilepath: "seedM",
        sourcePath: "seedS",
        testsPath: "seedT",
        dependenciesFilepath: "seedP",
        readmeFilepath: "seedR",
      },
      paths: {
        missionFilepath: { path: "M1" },
        targetSourcePath: { path: "S1" },
        targetTestsPath: { path: "T1" },
        otherTestsPaths: { paths: ["T2"] },
        dependenciesFilepath: { path: "P1" },
        documentationPath: { path: "U1" },
      },
    };
    yaml.load.mockReturnValue(config);
    vi.spyOn(fs, "readFile").mockResolvedValue("data");
    vi.spyOn(fs, "writeFile").mockRejectedValue(
      new Error("write failed")
    );
    try {
      await main(["reseed"]);
    } catch (e) {
      // ignore
    }
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error processing M1: write failed"
    );
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});

// tests for open-release-pr command

describe("open-release-pr command", () => {
  let consoleErrorSpy;
  let exitSpy;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => {
      throw new Error(`exit:${code}`);
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("missing required options", async () => {
    try {
      await main(["open-release-pr"]);
    } catch (e) {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error: Missing required options --token, --base, --release-version, and --changelog"
      );
      expect(exitSpy).toHaveBeenCalledWith(1);
    }
  });
});
