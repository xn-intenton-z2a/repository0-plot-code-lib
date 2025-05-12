import { describe, test, expect, vi, beforeEach, afterEach, beforeAll } from 'vitest';
import fs from 'fs';
import sharp from 'sharp';
import request from 'supertest';
import {
  parseArgs,
  parseRange,
  generateData,
  generateDerivativeData,
  generateSVG,
  main,
  generatePlot,
  httpApp,
} from '@src/lib/main.js';

// Mock sharp to return a predictable buffer
vi.mock('sharp', () => {
  return {
    default: vi.fn(() => ({ png: () => ({ toBuffer: () => Promise.resolve(Buffer.from('pngdata')) }) })),
  };
});

describe('parseArgs', () => {
  test('parses valid arguments', () => {
    const args = ['--expression', 'y=x', '--range', 'x=0:3', '--format', 'svg', '--output', 'out.svg'];
    const parsed = parseArgs(args);
    expect(parsed).toEqual({
      expression: 'y=x',
      range: 'x=0:3',
      format: 'svg',
      output: 'out.svg',
    });
  });

  test('throws on missing value', () => {
    expect(() => parseArgs(['--expression'])).toThrow('Missing value for argument: --expression');
  });

  test('throws on unknown argument', () => {
    expect(() => parseArgs(['test'])).toThrow('Unknown argument: test');
  });
});

describe('parseRange', () => {
  test('parses x range correctly', () => {
    expect(parseRange('x=0:10')).toEqual({ axis: 'x', min: 0, max: 10 });
  });

  test('throws on invalid number', () => {
    expect(() => parseRange('x=a:b')).toThrow('Invalid range values: a:b');
  });
});

describe('generateData', () => {
  test('generates correct data for y=x', () => {
    const points = generateData('y=x', { min: 0, max: 3 }, 3);
    expect(points).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 3 },
    ]);
  });
});

describe('generateDerivativeData', () => {
  test('generates correct derivative data for y=x^2', () => {
    const points = generateDerivativeData('y=x^2', { min: 0, max: 2 }, 2);
    expect(points).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 4 },
    ]);
  });
});

describe('generateSVG', () => {
  test('generates svg string with polyline points', () => {
    const points = [
      { x: 0, y: 0 },
      { x: 1, y: 2 },
    ];
    const svg = generateSVG(points, 100, 100);
    expect(svg).toContain('<svg');
    expect(svg).toContain('points="0,0 1,2"');
  });
});

describe('main function', () => {
  const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => {});

  test('writes svg file for svg format', async () => {
    await main(['--expression', 'y=x', '--range', 'x=0:1', '--format', 'svg', '--output', 'out.svg']);
    expect(writeSpy).toHaveBeenCalledWith('out.svg', expect.stringContaining('<svg'));
  });

  test('writes png file for png format', async () => {
    await main(['--expression', 'y=x', '--range', 'x=0:1', '--format', 'png', '--output', 'out.png']);
    expect(writeSpy).toHaveBeenCalledWith('out.png', Buffer.from('pngdata'));
  });

  test('writes svg file with derivative series and legend', async () => {
    writeSpy.mockClear();
    await main([
      '--expression',
      'y=x^2',
      '--range',
      'x=0:2',
      '--format',
      'svg',
      '--output',
      'out.svg',
      '--derivative',
      'true',
    ]);
    expect(writeSpy).toHaveBeenCalledWith('out.svg', expect.any(String));
    const svg = writeSpy.mock.calls[0][1];
    expect((svg.match(/<polyline/g) || []).length).toBe(2);
    expect(svg).toContain('<g class="legend">');
  });
});

describe('generatePlot', () => {
  test('returns svg result', async () => {
    const result = await generatePlot({ expression: 'y=x', range: 'x=0:1', format: 'svg' });
    expect(result).toEqual({ type: 'svg', data: expect.stringContaining('<svg') });
  });

  test('returns png result', async () => {
    const result = await generatePlot({ expression: 'y=x', range: 'x=0:1', format: 'png' });
    expect(result).toEqual({ type: 'png', data: Buffer.from('pngdata') });
  });

  test('throws on missing required options', async () => {
    await expect(generatePlot({ range: 'x=0:1', format: 'svg' })).rejects.toThrow();
  });

  describe('with derivative', () => {
    test('returns svg with two series and legend', async () => {
      const result = await generatePlot({ expression: 'y=x^2', range: 'x=0:2', format: 'svg', derivative: true });
      expect(result.type).toBe('svg');
      expect(typeof result.data).toBe('string');
      expect((result.data.match(/<polyline/g) || []).length).toBe(2);
      expect(result.data).toContain('<g class="legend">');
    });

    test('returns png buffer for derivative', async () => {
      const result = await generatePlot({ expression: 'y=x^2', range: 'x=0:2', format: 'png', derivative: true });
      expect(result.type).toBe('png');
      expect(result.data).toEqual(Buffer.from('pngdata'));
    });
  });
});

describe('HTTP Server Mode', () => {
  beforeAll(async () => {
    await main(['--serve', '3000']);
  });

  test('GET /plot returns svg', async () => {
    const response = await request(httpApp)
      .get('/plot')
      .query({ expression: 'y=x', range: 'x=0:1', format: 'svg' });
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/image\/svg\+xml/);
    expect(response.body.toString()).toContain('<svg');
  });

  test('GET /plot returns png', async () => {
    const response = await request(httpApp)
      .get('/plot')
      .query({ expression: 'y=x', range: 'x=0:1', format: 'png' });
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/image\/png/);
    expect(response.body).toEqual(Buffer.from('pngdata'));
  });

  test('GET /plot missing parameters returns 400', async () => {
    const response = await request(httpApp)
      .get('/plot')
      .query({ range: 'x=0:1', format: 'svg' });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('GET /plot invalid parameters returns 400', async () => {
    const response = await request(httpApp)
      .get('/plot')
      .query({ expression: 'y=x', range: 'x=a:b', format: 'svg' });
    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/range must be/);
  });
});
