import { expect, it, describe } from 'vitest';
import { ref, type Ref } from 'vue';
import { getNewTilesSize } from '@/modules/commonFunctions/resizeCommon';

describe('resizeCommon', () => {
  describe('getNewTilesSize', () => {
    it('Should return correct calculated values based on window width and height', () => {
      const testWidth: Ref<number> = ref(375);
      const testHeight: Ref<number> = ref(667);
      const { twidth, theight } = getNewTilesSize(testWidth, testHeight);
      expect(twidth).toBe(7);
      expect(theight).toBe(11);
    });
  });
});
