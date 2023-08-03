import CellModesEnum from "../enums/cellModesEnum";
import type { TileCords } from "@/types/CommonTypes";

/**
 * function searches for given cell type and prevents user from placing any additional cells in given grid
 *
 * @param table - cell grid in which we want to limit some cells
 * @param blockType - cell type to limit
 * @param maxCount - maximum number of cells of given type, default 1
 * @returns {boolean} true if user is able to place cell, false otherwise
 */
export const preventAdditionalBlocks = (table: any[][], blockType: CellModesEnum, maxCount = 1): boolean => {
  let cellCount = 0;

  table.forEach(row => {
    const filteredRow = row.filter(cell => cell === blockType);
    cellCount += filteredRow.length;
  });

  return cellCount < maxCount;
}

/**
 * Function will take an array and delete given number of args.blockToExclude from args.grid.
 * Values are deleted in order with respect to index number, smaller indexes wil be deleted first.
 * @param args.grid - 2D array of values,
 * @param args.blockToExclude - block to delete,
 * @param args.maxCount - number of cells to remain
 */
export const preventAndDeleteAdditionalBlocks = (args: {
  grid: Array<Array<any>>,
  blockToExclude: CellModesEnum,
  maxCount: number,
}) => {
  const cellsPositions: Array<TileCords> = [];

  args.grid.forEach((col, colIndex) => {
    col.forEach((cell, rowIndex) => {
      if (cell === args.blockToExclude) {
        cellsPositions.push({ row: rowIndex, col: colIndex });
      }
    });
  });

  cellsPositions.forEach((position, iterator) => {
    if (iterator >= cellsPositions.length - args.maxCount) {
      return false;
    }
    args.grid[position.col][position.row] = CellModesEnum.EMPTY;
  });
};
