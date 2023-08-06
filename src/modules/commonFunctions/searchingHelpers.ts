import type { TileCords } from "@/types/CommonTypes";
import CellModesEnum from "@/modules/enums/cellModesEnum";

/**
 * Function returns all neigbers for the given tile cords
 * @param {string[][]} grid Area where function should search
 * @param {TileCords} tile The tile whose neighbors the function should return
 * @return {TileCords[]} Array of neighbors
 */
export const getNeighbors = (grid: string[][], tile: TileCords): TileCords[] => {
  const neigbers: TileCords[] = [];

  const topCords: TileCords = { row: tile.row - 1, col: tile.col };
  const bottomCords: TileCords = { row: tile.row + 1, col: tile.col };
  const leftCords: TileCords = { row: tile.row, col: tile.col - 1 };
  const rightCords: TileCords = { row: tile.row, col: tile.col + 1 };

  grid?.[topCords.row]?.[topCords.col] ? neigbers.push(topCords) : null;
  grid?.[bottomCords.row]?.[bottomCords.col] ? neigbers.push(bottomCords) : null;
  grid?.[leftCords.row]?.[leftCords.col] ? neigbers.push(leftCords) : null;
  grid?.[rightCords.row]?.[rightCords.col] ? neigbers.push(rightCords) : null;

  return neigbers;
};

/**
 * Function returns cords for start and goal tiles \
 * ```Important thing is that this function only works when the goal and start appear only once on the board```
 * @param {string[][]} grid Area where function should search
 * @return {{ start: TileCords, goal: TileCords }} Object that contains start and goal cords
 */
export const getStartAndGoalCords = (grid: string[][]): { start: TileCords, goal: TileCords } => {
  const start: TileCords = { row: 0, col: 0};
  const goal: TileCords = { row: 0, col: 0};

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const currentTileCords = grid[i][j];
      if (currentTileCords === CellModesEnum.START) {
        start.row = i;
        start.col = j;
      } else if (currentTileCords === CellModesEnum.GOAL) {
        goal.row = i;
        goal.col = j;
      }
    }
  }

  return { start, goal };
};

/**
 * Function returns true if start and goal are places on the ```grid```
 * @param {string[][]} grid Area where function should search
 * @return {boolean} Returns true if start and goal are on the grid
 */
export const areStartAndGoalPlaced = (grid: string[][]): boolean => {
  let isStart: boolean = false;
  let isGoal: boolean = false;

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const currentTileCords = grid[i][j];
      if (currentTileCords === CellModesEnum.START) {
        isStart = true;
      } else if (currentTileCords === CellModesEnum.GOAL) {
        isGoal = true;
      }
    }
  }

  return isStart && isGoal;
};
