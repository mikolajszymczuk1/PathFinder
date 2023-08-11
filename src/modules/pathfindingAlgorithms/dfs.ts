// Implementation of Depth First Search algorithm

import type { TileCords } from "@/types/CommonTypes";
import { areStartAndGoalPlaced, getNeighbors, getStartAndGoalCords } from "@/modules/commonFunctions/searchingHelpers";

/**
 * Function implements Depth First Search algorithm.
 *
 * @param grid grid on which to perform algorithm,
 * @param ingoreCells algorithm will ignore cells of given type,
 * @returns All visited cellls with start and goal included
 */
export const DFSAlgorithm = (grid: string[][], ingoreCells: string[]) => {
  if (!areStartAndGoalPlaced(grid)) {
    return;
  }

  const { start, goal } = getStartAndGoalCords(grid);
  let root: TileCords | undefined = undefined;
  const stack: TileCords[] = [start];
  const visitedCells: TileCords[] = [];

  while (stack.length > 0) {
    root = stack.pop();

    // Stupid check, compiler needs it to check if root is not undefined later even though it will never be
    if (root === undefined) {
      break;
    }

    visitedCells.push(root);

    // Break when found the goal
    if (goal.row === root.row && goal.col === root.col) {
      return visitedCells;
    }

    getNeighbors(grid, root)
      .filter((n) => !ingoreCells.includes(grid[n.row][n.col]))
      .forEach((n) => {
        if (
          visitedCells.some(
            (visited) => visited.row === n.row && visited.col === n.col
          )
        ) {
          return;
        }

        stack.push(n);
      });
  }

  return visitedCells;
}
