import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { main } from '@src/lib/main.js';

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

  test('generates ASCII plot when --ascii and spec provided', () => {
    main(['--ascii', 'sine:1,1,0,0,360,30']);
    expect(logSpy).toHaveBeenCalledWith('Generating ASCII plot with spec sine:1,1,0,0,360,30');
  });

  test('shows error on invalid arguments', () => {
    main(['onlyOneArg']);
    expect(errorSpy).toHaveBeenCalledWith('Invalid arguments. Use --help for usage information.');
  });

  test('shows error on missing ASCII plot specification', () => {
    main(['--ascii']);
    expect(errorSpy).toHaveBeenCalledWith('Missing plot specification for ASCII plotting. Use --help for usage information.');
  });
});
