import { describe, test, expect, vi } from 'vitest';
import fs from 'fs';
import sharp from 'sharp';
import {
  parseArgs,
  parseRange,
  generateData,
  generateSVG,
  main,
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
});

describe('CLI discovery flags', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(process, 'exit').mockImplementation(code => { throw new Error(`Exit:${code}`); });
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('--help outputs usage and exits with code 0', async () => {
    await expect(main(['--help'])).rejects.toThrow('Exit:0');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('# Usage'));
  });

  test('--version outputs version and exits with code 0', async () => {
    await expect(main(['--version'])).rejects.toThrow('Exit:0');
    expect(console.log).toHaveBeenCalledWith(expect.stringMatching(/^\d+\.\d+\.\S+/));
  });

  test('--mission outputs mission and exits with code 0', async () => {
    await expect(main(['--mission'])).rejects.toThrow('Exit:0');
    expect(console.log).toHaveBeenCalledWith(expect.stringContaining('# Mission Statement'));
  });
});
