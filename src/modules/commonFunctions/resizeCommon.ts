import type { Ref } from 'vue';
import { get } from '@vueuse/core';
import { EDITOR_CONST } from '@/modules/consts/editorConst';

// ====== Helpers functions to get specific const to do calculations ======

/**
 * Used to select specific const number to calculate tiles width count
 * @param {number} width Current window width
 * @returns {number} Specific const value based on window width
 */
const getCalcualtionNumberForWidth = (width: number): number => {
  if (width > EDITOR_CONST.BREAKPOINTS.XLG) {
    return EDITOR_CONST.TILE_WIDTH_CALC_NUMBER_C;
  } else if (width > EDITOR_CONST.BREAKPOINTS.MD) {
    return EDITOR_CONST.TILE_WIDTH_CALC_NUMBER_B;
  }

  return EDITOR_CONST.TILE_WIDTH_CALC_NUMBER_A;
};

/**
 * Used to select specific const number to calculate tiles height count
 * @param {number} width Current window width
 * @return {number} Specific const value based on window width
 */
const getCalcualtionNumberForHeight = (width: number): number => {
  return width >= EDITOR_CONST.BREAKPOINTS.SM
    ? EDITOR_CONST.TILE_HEIGHT_CALC_NUMBER_B
    : EDITOR_CONST.TILE_HEIGHT_CALC_NUMBER_A;
};

// ========================================================================

/**
 * Function return amount of tiles in row and in column based on window size
 * @param width Current window width
 * @param height Current window height
 * @return {{ twidth: number, theight: number }} Calculated amount of tiles in row and column
 */
export const getNewTilesSize = (width: Ref<number>, height: Ref<number>): { twidth: number; theight: number } => {
  const newTilesCountWidth = Math.floor(get(width) / getCalcualtionNumberForWidth(get(width)));
  const newTilesCountHeight = Math.floor(get(height) / getCalcualtionNumberForHeight(get(width)));
  return { twidth: newTilesCountWidth, theight: newTilesCountHeight };
}
