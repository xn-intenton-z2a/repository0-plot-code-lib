import { describe, test, expect } from 'vitest';
import { main } from '@src/lib/main.js';

describe('generateSeries programmatic API', () => {  
  test('simple linear function with y= prefix', () => {
    const result = main({ expression: 'y=x+1', range: 'x=0:2:1' });
    expect(result).toEqual([
      { x: 0, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
    ]);
  });

  test('expression without y= prefix', () => {
    const result = main({ expression: 'x*2', range: 'x=0:3:1' });
    expect(result).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 2 },
      { x: 2, y: 4 },
      { x: 3, y: 6 },
    ]);
  });

  test('invalid expression throws error', () => {
    expect(() => main({ expression: 'y=x+', range: 'x=0:1:1' })).toThrow('Invalid expression');
  });

  test('invalid range throws error', () => {
    expect(() => main({ expression: 'y=x', range: '0:1:1' })).toThrow('Invalid range');
  });
});
