import type { TileCords } from '@/types/CommonTypes';
import { getNeighbors } from '@/modules/commonFunctions/searchingHelpers';
import { areTilesCordsEqual, isTileCordsInArray } from '@/modules/commonFunctions/searchingHelpers';

const bfs = (grid: string[][], start: TileCords, goal: TileCords): TileCords[] => {
  const visited: TileCords[] = [];
  const queue: TileCords[] = [start];
  const discoveredTiles: TileCords[] = [start];
  visited.push(start);

  while (queue.length > 0) {
    const current = queue.shift() as TileCords;

    if (areTilesCordsEqual(current, goal)) {
      break;
    }

    for (const neighbor of getNeighbors(grid, current)) {
      if (!isTileCordsInArray(visited, neighbor)) {
        visited.push(neighbor);
        queue.push(neighbor);
        discoveredTiles.push(neighbor);
      }
    }
  }

  return discoveredTiles;
};

export default bfs;
