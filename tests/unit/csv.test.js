// SPDX-License-Identifier: MIT
import { describe, test, expect } from 'vitest';
import { parseCSV } from '../../src/lib/main.js';

describe('CSV Loader', () => {
  test('parses time,value CSV text', () => {
    const csv = 'time,value\n2020-01-01,1\n2020-01-02,2\n';
    const rows = parseCSV(csv);
    expect(rows.length).toBe(2);
    expect(rows[0]).toEqual({ time: '2020-01-01', value: 1 });
    expect(rows[1].value).toBe(2);
  });
});
