import type { Ref } from 'vue';
import { get } from '@vueuse/core';
import { EDITOR_CONST } from '@/modules/consts/editorConst';

/**
 * Function return amount of tiles in row and in column based on window size
 * @param width Current window width
 * @param height Current window height
 * @return {{ twidth: number; theight: number }} Calculated amount of tiles in row and column
 */
export const getNewTilesSize = (width: Ref<number>, height: Ref<number>): { twidth: number; theight: number } => {
  const newTilesCountWidth = Math.floor(get(width) / (get(width) >= EDITOR_CONST.BREAKPOINTS.MD ? EDITOR_CONST.TILE_WIDTH_CALC_NUMBER_B : EDITOR_CONST.TILE_WIDTH_CALC_NUMBER_A));
  const newTilesCountHeight = Math.floor(get(height) / (get(width) >= EDITOR_CONST.BREAKPOINTS.SM ? EDITOR_CONST.TILE_HEIGHT_CALC_NUMBER_B : EDITOR_CONST.TILE_HEIGHT_CALC_NUMBER_A));
  return { twidth: newTilesCountWidth, theight: newTilesCountHeight };
}
