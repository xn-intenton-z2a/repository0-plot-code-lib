import { describe, test, expect, beforeEach, afterEach, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as mainModule from '@src/lib/main.js';
import { main } from '@src/lib/main.js';

// Prepare mission text
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const missionPath = path.resolve(__dirname, '../../MISSION.md');
const missionText = fs.readFileSync(missionPath, 'utf8');

describe('Main Module Import', () => {
  test('module should be non-null', () => {
    expect(mainModule).not.toBeNull();
  });
});

describe('Default main', () => {
  test('should terminate without error', () => {
    process.argv = ['node', 'src/lib/main.js'];
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    main();
    consoleLogSpy.mockRestore();
  });
});

describe('CLI mission and help', () => {
  let consoleLogSpy;
  let consoleErrorSpy;
  let exitSpy;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    exitSpy = vi.spyOn(process, 'exit').mockImplementation((code) => { throw new Error(`process.exit:${code}`); });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('--mission flag prints mission and exits 0', () => {
    expect(() => main(['--mission'])).toThrow('process.exit:0');
    expect(consoleLogSpy).toHaveBeenCalledWith(missionText);
  });

  test('--help flag prints mission then help and exits 0', () => {
    try {
      main(['--help']);
    } catch (err) {
      expect(err.message).toBe('process.exit:0');
    }
    // The first call is mission
    expect(consoleLogSpy.mock.calls[0][0]).toBe(missionText);
    // Next call contains usage
    const usageCall = consoleLogSpy.mock.calls.find(call => call[0].startsWith('Usage:'));
    expect(usageCall).toBeDefined();
    // Confirm presence of flags in help
    expect(consoleLogSpy.mock.calls.some(call => call[0].includes('--mission'))).toBe(true);
    expect(consoleLogSpy.mock.calls.some(call => call[0].includes('--help'))).toBe(true);
    expect(consoleLogSpy.mock.calls.some(call => call[0].includes('--expression'))).toBe(true);
    expect(consoleLogSpy.mock.calls.some(call => call[0].includes('--range'))).toBe(true);
  });

  test('no flags prints stub behavior', () => {
    const args = ['foo', 'bar'];
    const stubLog = vi.spyOn(console, 'log').mockImplementation(() => {});
    main(args);
    expect(stubLog).toHaveBeenCalledWith(`Run with: ${JSON.stringify(args)}`);
    stubLog.mockRestore();
  });
});