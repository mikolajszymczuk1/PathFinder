import PriorityQueue from 'ts-priority-queue';
import type { TileCords, PriorityTileCords } from '@/types/CommonTypes';
import { getNeighbours, areTilesCordsEqual, heuristic } from '@/modules/commonFunctions/searchingHelpers';

/**
 * GBFS (Greedy Breadth-first search) algorithm
 * @param {string[][]} grid Area where function should search
 * @param {TileCords} start Start cordinates
 * @param {TileCords} goal Goal cordinates
 * @return {TileCords[]} Array of discovered tiles
 */
export const gbfs = (grid: string[][], start: TileCords, goal: TileCords): TileCords[] => {
  const visited: TileCords[] = [];
  const queue = new PriorityQueue({ comparator: (a: PriorityTileCords, b: PriorityTileCords) => { return a.priority - b.priority; } });
  queue.queue({ tileCords: start, priority: 0 });
  visited.push(start);

  while (queue.length > 0) {
    const current = queue.dequeue().tileCords as TileCords;

    for (const neighbour of getNeighbours(grid, current)) {
      if (areTilesCordsEqual(neighbour, goal)) {
        return visited;
      }

      if (visited.some((visitedCords) => areTilesCordsEqual(visitedCords, neighbour))) {
        continue;
      }

      visited.push(neighbour);
      queue.queue({ tileCords: neighbour, priority: heuristic(goal, neighbour)});
    }
  }

  return visited;
};
