import type { TileCords } from '@/types/CommonTypes';
import CellModesEnum from '@/modules/enums/cellModesEnum';

/**
 * Function check if given cell is wall or not and if exists
 * @param {string[][]} grid Area where function should search
 * @param {TileCords} cords Cords to check
 * @return {boolean} true if cell is not a wall and exists
 */
export const checkNeighbour = (grid: string[][], cords: TileCords): boolean => {
  if (grid?.[cords.row]?.[cords.col] && grid[cords.row][cords.col] !== CellModesEnum.WALL) {
    return true;
  }

  return false;
};

/**
 * Function returns all neighbours for the given tile cords
 * @param {string[][]} grid Area where function should search
 * @param {TileCords} tile The tile whose neighbors the function should return
 * @return {TileCords[]} Array of neighbors
 */
export const getNeighbours = (grid: string[][], tile: TileCords): TileCords[] => {
  const neighbours: TileCords[] = [];

  const topCords: TileCords = { row: tile.row - 1, col: tile.col };
  const bottomCords: TileCords = { row: tile.row + 1, col: tile.col };
  const leftCords: TileCords = { row: tile.row, col: tile.col - 1 };
  const rightCords: TileCords = { row: tile.row, col: tile.col + 1 };

  checkNeighbour(grid, topCords) ? neighbours.push(topCords) : null;
  checkNeighbour(grid, bottomCords) ? neighbours.push(bottomCords) : null;
  checkNeighbour(grid, leftCords) ? neighbours.push(leftCords) : null;
  checkNeighbour(grid, rightCords) ? neighbours.push(rightCords) : null;

  return neighbours;
};

/**
 * Function returns cords for start and goal tiles \
 * ```Important thing is this function only returns the lowest indexed start and goal if start ang goal are present in grid, otherwise it returns -1 coordinates```
 * @param {string[][]} grid Area where function should search
 * @return {{ start: TileCords, goal: TileCords }} Object that contains start and goal cords
 */
export const getStartAndGoalCords = (grid: string[][]): { start: TileCords, goal: TileCords } => {
  let start: TileCords | null = null;
  let goal: TileCords | null = null;

  grid.forEach((row, rowIndex) => {
    if (row.includes(CellModesEnum.START)) {
      start = start ?? { row: rowIndex, col: row.indexOf(CellModesEnum.START) }
    }

    if (row.includes(CellModesEnum.GOAL)) {
      goal = goal ?? { row: rowIndex, col: row.indexOf(CellModesEnum.GOAL) }
    }

  })

  if (start === null || goal === null) {
    return {
      start: { row: -1, col: -1 },
      goal: { row: -1, col: -1 },
    };
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

  grid.forEach((row) => {
    !isStart && (isStart = row.includes(CellModesEnum.START));
    !isGoal && (isGoal = row.includes(CellModesEnum.GOAL));
  });

  return isStart && isGoal;
};

/**
 * Function compares cords of two tiles and return true if they are equal
 * @param {TileCords} tileCordsA Cords of tile A
 * @param {TileCords} tileCordsB Cords of tile B
 * @return {boolean} return true if cords are euqal
 */
export const areTilesCordsEqual = (tileCordsA: TileCords, tileCordsB: TileCords): boolean => {
  return tileCordsA.row === tileCordsB.row && tileCordsA.col === tileCordsB.col;
};
