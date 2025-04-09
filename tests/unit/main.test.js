import { describe, test, expect } from 'vitest';
import * as mainModule from '@src/lib/main.js';
import { main } from '@src/lib/main.js';
import { resolveNaNAliases } from '@src/lib/naNAlias.js';


describe('Main Module Import', () => {
  test('should be non-null', () => {
    expect(mainModule).not.toBeNull();
  });
});

describe('Default Demo Output', () => {
  test('should terminate without error', () => {
    process.argv = ['node', 'src/lib/main.js'];
    main([]);
  });
});

// Tests for the new NaN alias resolution module

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
    // Default aliases are ['nan', 'notanumber', 'undefined']
    // Custom adds 'notanumber' (which is duplicate when lowercased) and 'nanvalue'
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
