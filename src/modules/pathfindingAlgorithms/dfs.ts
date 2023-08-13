import type { TileCords } from "@/types/CommonTypes";
import { getNeighbours, areTilesCordsEqual } from "@/modules/commonFunctions/searchingHelpers";

/**
 * Function implements DFS (Depth First Search algorithm).
 * @param {string[][]} grid Grid on which to perform algorithm,
 * @param {TileCords} start Cordinates of Start
 * @param {TileCords} goal Cordinates of Goal
 * @returns All visited cells with start and goal included
 */
export const dfs = (grid: string[][], start: TileCords, goal: TileCords): TileCords[] => {
  let root: TileCords | undefined = undefined;
  const stack: TileCords[] = [start];
  const visited: TileCords[] = [];

  while (stack.length > 0) {
    root = stack.pop() as TileCords;

    visitedCells.push(root);

    for (const neighbour of getNeighbours(grid, root)) {
      if (areTilesCordsEqual(root, goal)) {
        return visitedCells;
      }

      if (visitedCells.some((visited) => areTilesCordsEqual(visited, neighbour))) {
        continue;
      }

      stack.push(neighbour);
    }
  }

  return visited;
};
