import type { Ref } from 'vue';
import { get } from '@vueuse/core';

const TILE_WIDTH_CALC_NUMBER: number = 53;
const TILE_HEIGHT_CALC_NUMBER: number = 60;

/**
 * Function return amount of tiles in row and in column based on window size
 * @param width Current window width
 * @param height Current window height
 * @return {{ twidth: number; theight: number }} Calculated amount of tiles in row and column
 */
export const getNewTilesSize = (width: Ref<number>, height: Ref<number>): { twidth: number; theight: number } => {
  const newTilesCountWidth = Math.floor(get(width) / TILE_WIDTH_CALC_NUMBER);
  const newTilesCountHeight = Math.floor(get(height) / TILE_HEIGHT_CALC_NUMBER);
  return { twidth: newTilesCountWidth, theight: newTilesCountHeight };
}
