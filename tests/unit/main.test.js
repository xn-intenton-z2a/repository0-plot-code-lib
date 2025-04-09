import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { main, resolveNaNAliases } from '@src/lib/main.js';

// Restore original process.argv if needed

describe('Main Module Import', () => {
  test('should be non-null', () => {
    expect(main).not.toBeNull();
  });
});

describe('CLI Argument Parsing', () => {
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
  });

  test('displays help when no arguments provided', () => {
    main([]);
    expect(logSpy).toHaveBeenCalledWith('Usage: node src/lib/main.js [outputFile] [plotSpec]');
  });

  test('displays help when --help is provided', () => {
    main(['--help']);
    expect(logSpy).toHaveBeenCalledWith('Usage: node src/lib/main.js [outputFile] [plotSpec]');
  });

  test('activates interactive mode with --interactive', () => {
    main(['--interactive']);
    expect(logSpy).toHaveBeenCalledWith('Interactive mode activated. Please enter your formula:');
  });

  test('starts web interface with --serve', async () => {
    main(['--serve']);
    expect(logSpy).toHaveBeenCalledWith('Starting web interface...');
    // Allow time for the dynamic import to trigger
    await new Promise(r => setTimeout(r, 100));
  });

  test('generates plot when outputFile and plotSpec are provided', () => {
    main(['output.svg', 'quad:1,0,0,-10,10,1']);
    expect(logSpy).toHaveBeenCalledWith('Generating plot as output.svg with spec quad:1,0,0,-10,10,1');
  });

  test('shows error on invalid arguments', () => {
    main(['onlyOneArg']);
    expect(errorSpy).toHaveBeenCalledWith('Invalid arguments. Use --help for usage information.');
  });
});

// Tests for the NaN alias resolution functionality

describe('NaN Alias Resolution', () => {
  test('Strict mode returns only canonical "nan"', () => {
    process.env.STRICT_NAN_MODE = 'true';
    delete process.env.LOCALE_NAN_ALIASES;
    delete process.env.LOCALE_NAN_OVERRIDE;
    const aliases = resolveNaNAliases();
    expect(aliases).toEqual(['nan']);
  });

  test('Custom aliases are merged in non-strict mode', () => {
    delete process.env.STRICT_NAN_MODE;
    process.env.LOCALE_NAN_ALIASES = 'NotANumber,  NaNValue ';
    delete process.env.LOCALE_NAN_OVERRIDE;
    const aliases = resolveNaNAliases();
    expect(aliases.sort()).toEqual(['nan', 'notanumber', 'undefined', 'nanvalue'].sort());
  });

  test('Locale override replaces defaults completely', () => {
    process.env.LOCALE_NAN_OVERRIDE = 'override1, override2';
    process.env.STRICT_NAN_MODE = 'false';
    process.env.LOCALE_NAN_ALIASES = 'should, be, ignored';
    const aliases = resolveNaNAliases();
    expect(aliases.sort()).toEqual(['override1', 'override2'].sort());
  });
});
