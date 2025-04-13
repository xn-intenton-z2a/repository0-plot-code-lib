import { describe, test, expect, afterEach } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";
import fs from 'fs';

// Helper to delay execution for async writes
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default Demo Output", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("PNG Output", () => {
  const outputFile = "test_output.png";

  afterEach(() => {
    if (fs.existsSync(outputFile)) {
      fs.unlinkSync(outputFile);
    }
  });

  test("should generate a valid PNG file", async () => {
    main(["--expression", "y=sin(x)", "--range", "x=0:9,y=-1:1", "--file", outputFile]);
    // Wait for the asynchronous PNG generation
    await delay(500);
    expect(fs.existsSync(outputFile)).toBe(true);

    const buffer = fs.readFileSync(outputFile);
    // Check PNG header: 89 50 4E 47 0D 0A 1A 0A
    const pngHeader = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    expect(buffer.slice(0, 8).equals(pngHeader)).toBe(true);
  });
});
