// SPDX-License-Identifier: MIT
import { test, expect } from 'vitest';
import { writeFileSync, unlinkSync } from 'fs';
import path from 'path';
import { loadCSV } from '../../src/lib/main.js';

const TMP_CSV = path.join('tests', 'unit', 'tmp_test.csv');

test('loadCSV parses a valid CSV', async () => {
  const content = 'time,value\n2020-01-01T00:00:00Z,1.23\n2020-01-01T01:00:00Z,4.56\n';
  writeFileSync(TMP_CSV, content, 'utf8');
  try {
    const rows = await loadCSV(TMP_CSV);
    expect(Array.isArray(rows)).toBe(true);
    expect(rows.length).toBe(2);
    expect(rows[0]).toEqual({ time: '2020-01-01T00:00:00Z', value: 1.23 });
    expect(rows[1]).toEqual({ time: '2020-01-01T01:00:00Z', value: 4.56 });
  } finally {
    try { unlinkSync(TMP_CSV); } catch (e) {}
  }
});

test('loadCSV rejects malformed header', async () => {
  const content = 'bad,header\n2020-01-01T00:00:00Z,1.23\n';
  writeFileSync(TMP_CSV, content, 'utf8');
  try {
    await expect(loadCSV(TMP_CSV)).rejects.toThrow(/CSV header must be "time,value"/);
  } finally {
    try { unlinkSync(TMP_CSV); } catch (e) {}
  }
});

test('loadCSV rejects non-numeric value', async () => {
  const content = 'time,value\n2020-01-01T00:00:00Z,notanumber\n';
  writeFileSync(TMP_CSV, content, 'utf8');
  try {
    await expect(loadCSV(TMP_CSV)).rejects.toThrow(/Invalid numeric value/);
  } finally {
    try { unlinkSync(TMP_CSV); } catch (e) {}
  }
});
