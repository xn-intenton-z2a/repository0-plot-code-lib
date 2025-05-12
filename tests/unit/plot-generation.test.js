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
