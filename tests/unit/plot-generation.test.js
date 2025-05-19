import { describe, test, expect } from "vitest";
import * as mainModule from "@src/lib/main.js";
import { main } from "@src/lib/main.js";

describe("Main Module Import", () => {
  test("should be non-null", () => {
    expect(mainModule).not.toBeNull();
  });
});

describe("Default main", () => {
  test("should terminate without error", () => {
    process.argv = ["node", "src/lib/main.js"];
    main();
  });
});

describe("Mission Flag", () => {
  test("should display mission statement", () => {
    const logs = [];
    const originalLog = console.log;
    console.log = (msg) => logs.push(msg);
    process.argv = ["node", "src/lib/main.js", "--mission"];
    main();
    console.log = originalLog;
    expect(
      logs.some((entry) => entry.includes("Be a go-to plot library"))
    ).toBe(true);
  });
});
