import type { TileCords } from "@/types/CommonTypes";
import {
  getNeighbours,
  areTilesCordsEqual,
} from "@/modules/commonFunctions/searchingHelpers";

/**
 * RW (Random Walk) algorithm
 * @param {string[][]} grid Area where function should search
 * @param {TileCords} start Start cordinates
 * @param {TileCords} goal Goal cordinates
 * @return {TileCords[]} Array of discovered tiles
 */
export const rw = (
  grid: string[][],
  start: TileCords,
  goal: TileCords
): TileCords[] => {
  const path: TileCords[] = [start];
  const sRoot: TileCords = start;
  let foundGoal = false;

  const backtrack = (oldRoot: TileCords) => {
    const neighbours = getNeighbours(grid, oldRoot)
      .filter((n) => path.every((p) => !areTilesCordsEqual(n, p)))
      .sort(() => Math.random() - 0.5);

    neighbours.forEach((nRoot) => {
      if (areTilesCordsEqual(nRoot, goal)) {
        foundGoal = true;
        return;
      }

      if (foundGoal) {
        return;
      }

      path.push(nRoot);

      backtrack(nRoot);
    });
  };

  backtrack(sRoot);

  return path;
};
