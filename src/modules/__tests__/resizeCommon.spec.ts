import { expect, it, describe } from 'vitest';
import { ref, type Ref } from 'vue';
import { getNewTilesSize } from '@/modules/commonFunctions/resizeCommon';
import { EDITOR_CONST } from '@/modules/consts/editorConst';

describe('resizeCommon', () => {
  describe('getNewTilesSize', () => {
    it('Should return correct calculated values based on window width and height', () => {
      const testWidth: Ref<number> = ref(375);
      const testHeight: Ref<number> = ref(667);
      const { twidth, theight } = getNewTilesSize(testWidth, testHeight);
      expect(twidth).toBe(7);
      expect(theight).toBe(11);
    });

    it('Should return different values when width is higher than special const value', () => {
      const testWidth: Ref<number> = ref(EDITOR_CONST.BREAKPOINTS.MD);
      const testHeight: Ref<number> = ref(667);
      const { twidth, theight } = getNewTilesSize(testWidth, testHeight);
      expect(twidth).toBe(15);
      expect(theight).toBe(12);
    });
  });
});
