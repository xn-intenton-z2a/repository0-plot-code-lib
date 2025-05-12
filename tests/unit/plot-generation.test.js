import { describe, test, expect, vi, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import request from 'supertest';
import * as mainModule from '@src/lib/main.js';
import { httpApp } from '@src/lib/main.js';

beforeAll(async () => {
  await mainModule.main(['--serve', '4000']);
});

describe('GET /stats expression mode JSON', () => {
  test('returns JSON stats', async () => {
    const res = await request(httpApp)
      .get('/stats')
      .query({ expression: 'y=x', range: 'x=0:2', samples: '3' });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    // Compute expected stats using the same helpers
    const points = mainModule.generateData('y=x', mainModule.parseRange('x=0:2'), 3);
    const expected = mainModule.computeSummaryStats(points);
    expect(res.body).toEqual(expected);
  });
});

describe('GET /stats expression mode plain text', () => {
  test('returns plain text stats', async () => {
    const res = await request(httpApp)
      .get('/stats')
      .query({ expression: 'y=x', range: 'x=0:2', samples: '2', json: 'false' });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    const lines = res.text.split('\n');
    expect(lines[0]).toMatch(/min: 0.00/);
    expect(lines[1]).toMatch(/max: 2.00/);
  });
});

describe('GET /stats file mode JSON', () => {
  const tmpFile = path.join(__dirname, 'temp-data.json');
  beforeAll(() => {
    fs.writeFileSync(tmpFile, JSON.stringify([{ x: 1, y: 2 }, { x: 3, y: 4 }]));
  });

  test('returns JSON stats from file', async () => {
    const res = await request(httpApp)
      .get('/stats')
      .query({ dataFile: tmpFile });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ min: 2, max: 4, mean: 3, median: 3, stddev: Math.sqrt(1) });
  });
});

// Missing params
describe('GET /stats missing params', () => {
  test('returns 400 if no expression or dataFile', async () => {
    const res = await request(httpApp)
      .get('/stats');
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

// CORS header
describe('CORS header', () => {
  test('includes Access-Control-Allow-Origin', async () => {
    const res = await request(httpApp)
      .get('/stats')
      .query({ expression: 'y=x', range: 'x=0:1' });
    expect(res.headers['access-control-allow-origin']).toBe('*');
  });
});

// CLI --mission flag
describe('CLI --mission flag', () => {
  test('prints mission statement to stdout', async () => {
    const content = '# Test Mission Statement';
    const fsSpy = vi.spyOn(fs, 'readFileSync').mockReturnValue(content);
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await mainModule.main(['--mission']);
    expect(logSpy).toHaveBeenCalledWith(content);
    logSpy.mockRestore();
    fsSpy.mockRestore();
  });
});

// New histogram and trendline feature tests
describe('GET /stats histogram distribution and trendline', () => {
  test('returns histogram bins counts correctly in JSON', async () => {
    const res = await request(httpApp)
      .get('/stats')
      .query({ expression: 'y=x', range: 'x=0:10', samples: '10', histogram: 'true', bins: '5' });
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    const body = res.body;
    expect(Array.isArray(body.histogram)).toBe(true);
    expect(body.histogram).toHaveLength(5);
    const totalCount = body.histogram.reduce((sum, b) => sum + b.count, 0);
    expect(totalCount).toBe(11);
    // Check first and last bin boundaries
    expect(body.histogram[0].binStart).toBeCloseTo(0);
    expect(body.histogram[0].binEnd).toBeCloseTo(2);
    expect(body.histogram[4].binEnd).toBeCloseTo(10);
  });

  test('returns regression stats correctly in JSON', async () => {
    const res = await request(httpApp)
      .get('/stats')
      .query({ expression: 'y=x', range: 'x=0:10', samples: '10', trendlineStats: 'true' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('slope');
    expect(res.body).toHaveProperty('intercept');
    expect(res.body).toHaveProperty('r2');
    expect(res.body.slope).toBeCloseTo(1);
    expect(res.body.intercept).toBeCloseTo(0);
    expect(res.body.r2).toBeCloseTo(1);
  });

  test('includes both histogram and regression in plain text output', async () => {
    const res = await request(httpApp)
      .get('/stats')
      .query({ expression: 'y=x', range: 'x=0:4', samples: '4', histogram: 'true', bins: '2', trendlineStats: 'true', json: 'false' });
    expect(res.status).toBe(200);
    const text = res.text;
    expect(text).toMatch(/slope: 1\.00/);
    expect(text).toMatch(/intercept: 0\.00/);
    expect(text).toMatch(/histogram 0\.00-2\.00: \d+/);
    expect(text).toMatch(/histogram 2\.00-4\.00: \d+/);
  });
});
