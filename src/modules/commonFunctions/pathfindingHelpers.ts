import type { TileCords } from '@/types/CommonTypes';
import { areTilesCordsEqual, getNeighbours } from '@/modules/commonFunctions/searchingHelpers';

/**
 * Function recontructs path based on discovered tiles
 * @param {string[][]} grid Area where function should search
 * @param {TileCords[]} discovered Array of discovered tiles
 * @param {TileCords} goal Cords of goal tile
 * @return {TileCords[]} Reconstructed path
 */
export const recontructShortestPath = (grid: string[][], discovered: TileCords[], goal: TileCords): TileCords[] => {
  let parrent: TileCords = goal;
  const path: TileCords[] = [];

  for (let i = discovered.length - 1; i >= 0; i--) {
    const neighbors = getNeighbours(grid, discovered[i]);
    for (const neighbor of neighbors) {
      if (areTilesCordsEqual(neighbor, parrent)) {
        parrent = discovered[i];
        path.unshift(parrent);
        break;
      }
    }
  }

  return path;
};
