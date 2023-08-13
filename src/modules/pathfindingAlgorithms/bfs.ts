import type { TileCords } from '@/types/CommonTypes';
import { getNeighbors, areTilesCordsEqual, isTileCordsInArray } from '@/modules/commonFunctions/searchingHelpers';

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
  visited.push(start);

  while (queue.length > 0) {
    const current = queue.shift() as TileCords;

    for (const neighbour of getNeighbours(grid, current)) {
      if (areTilesCordsEqual(neighbour, goal)) {
        return visited;
      }

      if (visited.some((visitedCords) => areTilesCordsEqual(visitedCords, neighbour))) {
        continue;
      }

      visited.push(neighbour);
      queue.push(neighbour);
    }
  }

  return visited;
};
