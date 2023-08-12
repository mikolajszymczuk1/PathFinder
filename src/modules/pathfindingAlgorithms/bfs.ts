import type { TileCords } from '@/types/CommonTypes';
import { getNeighbors } from '@/modules/commonFunctions/searchingHelpers';
import { areTilesCordsEqual, isTileCordsInArray } from '@/modules/commonFunctions/searchingHelpers';

/**
 * BFS (Breadth-first search) algorithm
 * @param {string[][]} grid Area where function should search
 * @param {TileCords} start Start cordinates
 * @param {TileCords} goal Goal cordinates
 * @return {TileCords[]} Array of discovered tiles
 */
export const bfs = (grid: string[][], start: TileCords, goal: TileCords): TileCords[] => {
  const visited: TileCords[] = [];
  const queue: TileCords[] = [start];
  const discoveredTiles: TileCords[] = [start];
  visited.push(start);

  while (queue.length > 0) {
    const current = queue.shift() as TileCords;

    for (const neighbor of getNeighbors(grid, current)) {
      if (areTilesCordsEqual(neighbor, goal)) {
        return discoveredTiles;
      }

      if (!isTileCordsInArray(visited, neighbor)) {
        visited.push(neighbor);
        queue.push(neighbor);
        discoveredTiles.push(neighbor);
      }
    }
  }

  return discoveredTiles;
};
