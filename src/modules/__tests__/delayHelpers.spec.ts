import { expect, it, describe } from 'vitest';
import { delay } from '@/modules/commonFunctions/delayHelpers';

describe('delayHelpers', () => {
  it('delay function should make correct time delay', async () => {
    const start = Date.now();
    const testDelayTime = 1000;
    await delay(testDelayTime);
    const end = Date.now();
    const elapsed = end - start;
    expect(elapsed).toBeGreaterThanOrEqual(testDelayTime);
  });
});
