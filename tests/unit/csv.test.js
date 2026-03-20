// SPDX-License-Identifier: MIT
import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { loadCSV } from "../../src/lib/main.js";
import fs from "fs";

const tmp = "tests/unit/tmp-series.csv";

describe("CSV loader", () => {
  beforeEach(() => {
    fs.writeFileSync(tmp, "time,value\n0,1\n1,2\n2,3\n");
  });
  afterEach(() => {
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  });

  test("loadCSV reads time,value pairs", async () => {
    const series = await loadCSV(tmp);
    expect(series.length).toBe(3);
    expect(series[0]).toHaveProperty("time");
    expect(series[0]).toHaveProperty("value");
    expect(series[0].value).toBe(1);
  });
});
