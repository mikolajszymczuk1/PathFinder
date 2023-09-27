import type { TileCords } from '@/types/CommonTypes';
import { getNeighbours, areTilesCordsEqual } from '@/modules/commonFunctions/searchingHelpers';

/**
 * RW (Random Walk) algorithm
 * @param {string[][]} grid Area where function should search
 * @param {TileCords} start Start cordinates
 * @param {TileCords} goal Goal cordinates
 * @return {TileCords[]} Array of discovered tiles
 */
export const rw = (grid: string[][], start: TileCords, goal: TileCords): TileCords[] => {
  const visited: TileCords[] = [];
  const queue: TileCords[] = [start];
  visited.push(start);

  while (queue.length > 0) {
    const current = queue.shift() as TileCords;
    const neighbours = getNeighbours(grid, current);
    const randomIndex = Math.floor(Math.random() * neighbours.length);
    const randomNeighbour = neighbours[randomIndex];

    if (areTilesCordsEqual(randomNeighbour, goal)) {
      return visited;
    }

    visited.push(randomNeighbour);
    queue.push(randomNeighbour);
  }

  return visited;
};
