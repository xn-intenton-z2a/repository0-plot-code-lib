// SPDX-License-Identifier: MIT
import { test, expect } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { loadCsv } from '../../src/lib/main.js';

test('loadCsv parses a well-formed CSV and returns numeric sorted records', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'plot-csv-'));
  try {
    const csv = 'time,value\n1610000000,1.0\n1610000060,2.5\n1610000120,0.0\n';
    const p = path.join(tmp, 'data.csv');
    fs.writeFileSync(p, csv, 'utf8');
    const rows = await loadCsv(p);
    expect(Array.isArray(rows)).toBe(true);
    expect(rows.length).toBe(3);
    for (const r of rows) {
      expect(typeof r.time).toBe('number');
      expect(typeof r.value).toBe('number');
    }
    // Ensure sorted ascending
    expect(rows[0].time).toBeLessThan(rows[1].time);
    expect(rows[1].time).toBeLessThan(rows[2].time);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('loadCsv tolerates extra columns and ignores them', async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'plot-csv-'));
  try {
    const csv = 'time,value,meta\n1,10,hello\n2,20,world\n';
    const p = path.join(tmp, 'data2.csv');
    fs.writeFileSync(p, csv, 'utf8');
    const rows = await loadCsv(p);
    expect(rows.length).toBe(2);
    expect(rows[0]).toHaveProperty('time');
    expect(rows[0]).toHaveProperty('value');
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test('loadCsv throws when header is missing required columns', async () => {
  const csv = 't,v\n1,2\n';
  await expect(async () => await loadCsv(csv)).rejects.toThrow(/missing.*columns/i);
});

test('loadCsv throws when non-numeric values present', async () => {
  const csv = 'time,value\n1,NaN\n2,5\n';
  await expect(async () => await loadCsv(csv)).rejects.toThrow(/non-?numeric/i);
});
