import { describe, test, expect, vi } from "vitest";
import fs from "fs/promises";
import yaml from "js-yaml";
import { reseed } from "@src/lib/main.js";

describe("reseed command", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test("should exit with code 1 if repositoryReseed is falsy", async () => {
    // Mock reading config to have repositoryReseed: false
    vi.spyOn(fs, "readFile").mockResolvedValue('seeding:\n  repositoryReseed: false');
    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((code) => {
        throw new Error(`exit:${code}`);
      });
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await expect(reseed()).rejects.toThrow("exit:1");
    expect(logSpy).toHaveBeenCalledWith("Reseeding is disabled in configuration.");
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  test("should copy files when repositoryReseed is true", async () => {
    const fakeConfig = {
      seeding: {
        repositoryReseed: true,
        missionFilepath: "seeds/zero-MISSION.md",
        sourcePath: "seeds/zero-main.js",
        testsPath: "seeds/zero-tests.js",
        dependenciesFilepath: "seeds/zero-package.json",
        readmeFilepath: "seeds/zero-README.md",
      },
      paths: {
        missionFilepath: { path: "MISSION.md" },
        targetSourcePath: { path: "src/lib/main.js" },
        targetTestsPath: { path: "tests/unit/plot-generation.test.js" },
        dependenciesFilepath: { path: "package.json" },
        readmeFilepath: { path: "README.md" },
      },
    };
    vi.spyOn(fs, "readFile").mockResolvedValue("irrelevant");
    vi.spyOn(yaml, "load").mockReturnValue(fakeConfig);
    const copySpy = vi.spyOn(fs, "copyFile").mockResolvedValue();
    const logCalls = [];
    vi.spyOn(console, "log").mockImplementation((msg) => logCalls.push(msg));

    await reseed();

    expect(copySpy).toHaveBeenCalledTimes(5);
    expect(copySpy).toHaveBeenCalledWith(
      expect.stringContaining(fakeConfig.seeding.missionFilepath),
      expect.stringContaining(fakeConfig.paths.missionFilepath.path)
    );
    // Ensure summary logged
    expect(logCalls[0]).toBe("Reseed complete:");
    expect(logCalls.some((l) =>
      l.includes(
        `- mission: ${fakeConfig.seeding.missionFilepath} -> ${fakeConfig.paths.missionFilepath.path}`
      )
    )).toBe(true);
  });

  test("should exit with code 1 on config load failure", async () => {
    vi.spyOn(fs, "readFile").mockRejectedValue(new Error("not found"));
    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((code) => {
        throw new Error(`exit:${code}`);
      });
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await expect(reseed()).rejects.toThrow("exit:1");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Failed to load agent-config.yaml:"));
    expect(exitSpy).toHaveBeenCalledWith(1);
  });

  test("should exit with code 1 when a copy fails", async () => {
    const fakeConfig = {
      seeding: {
        repositoryReseed: true,
        missionFilepath: "seeds/zero-MISSION.md",
        sourcePath: "seeds/zero-main.js",
        testsPath: "seeds/zero-tests.js",
        dependenciesFilepath: "seeds/zero-package.json",
        readmeFilepath: "seeds/zero-README.md",
      },
      paths: {
        missionFilepath: { path: "MISSION.md" },
        targetSourcePath: { path: "src/lib/main.js" },
        targetTestsPath: { path: "tests/unit/plot-generation.test.js" },
        dependenciesFilepath: { path: "package.json" },
        readmeFilepath: { path: "README.md" },
      },
    };
    vi.spyOn(fs, "readFile").mockResolvedValue("irrelevant");
    vi.spyOn(yaml, "load").mockReturnValue(fakeConfig);
    vi.spyOn(fs, "copyFile").mockRejectedValue(new Error("copy fail"));
    const exitSpy = vi
      .spyOn(process, "exit")
      .mockImplementation((code) => {
        throw new Error(`exit:${code}`);
      });
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    await expect(reseed()).rejects.toThrow("exit:1");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("Failed to copy mission:"));
    expect(exitSpy).toHaveBeenCalledWith(1);
  });
});
