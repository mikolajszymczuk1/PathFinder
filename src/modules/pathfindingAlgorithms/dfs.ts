import type { TileCords } from "@/types/CommonTypes";
import { getNeighbors, areTilesCordsEqual } from "@/modules/commonFunctions/searchingHelpers";

/**
 * Function implements DFS (Depth First Search algorithm).
 * @param {string[][]} grid Grid on which to perform algorithm,
 * @param {TileCords} start Cordinates of Start
 * @param {TileCords} goal Cordinates of Goal
 * @returns All visited cellls with start and goal included
 */
export const dfs = (grid: string[][], start: TileCords, goal: TileCords): TileCords[] => {
  let root: TileCords | undefined = undefined;
  const stack: TileCords[] = [start];
  const visitedCells: TileCords[] = [];

  while (stack.length > 0) {
    root = stack.pop();

    // Compiler needs it to check if root is not undefined later even though it will never be
    if (root === undefined) {
      break;
    }

    visitedCells.push(root);

    // Break when found the goal
    if (areTilesCordsEqual(root, goal)) {
      return visitedCells;
    }

    getNeighbors(grid, root).forEach((neighbor: TileCords) => {
      if (visitedCells.some((visited) => areTilesCordsEqual(visited, neighbor))) {
        return;
      }

      stack.push(neighbor);
    });
  }

  return visitedCells;
};
