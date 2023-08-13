import { expect, it, describe } from 'vitest';
import { ref, type Ref } from 'vue';
import { getNewTilesSize, getCalcualtionNumberForWidth, getCalcualtionNumberForHeight } from '@/modules/commonFunctions/resizeCommon';
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
      expect(twidth).toBe(14);
      expect(theight).toBe(12);
    });
  });

  it('getCalcualtionNumberForWidth should returns specific number based on width', () => {
    expect(getCalcualtionNumberForWidth(EDITOR_CONST.BREAKPOINTS.XLG + 1)).toBe(EDITOR_CONST.TILE_WIDTH_CALC_NUMBER_C);
    expect(getCalcualtionNumberForWidth(EDITOR_CONST.BREAKPOINTS.MD + 1)).toBe(EDITOR_CONST.TILE_WIDTH_CALC_NUMBER_B);
    expect(getCalcualtionNumberForWidth(EDITOR_CONST.BREAKPOINTS.MD - 1)).toBe(EDITOR_CONST.TILE_WIDTH_CALC_NUMBER_A);
  });

  it('getCalcualtionNumberForHeight should returns specific number based on width', () => {
    expect(getCalcualtionNumberForHeight(EDITOR_CONST.BREAKPOINTS.SM)).toBe(EDITOR_CONST.TILE_HEIGHT_CALC_NUMBER_B);
    expect(getCalcualtionNumberForHeight(EDITOR_CONST.BREAKPOINTS.SM - 1)).toBe(EDITOR_CONST.TILE_HEIGHT_CALC_NUMBER_A);
  });
});
