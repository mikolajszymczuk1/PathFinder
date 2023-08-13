import { defineStore } from 'pinia';
import type { TileCords } from '@/types/CommonTypes';
import { isValueInEnum } from '@/modules/commonFunctions/enumHelpers';
import { getStartAndGoalCords } from '@/modules/commonFunctions/searchingHelpers';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import PathfindingAlgorithmsEnum from '@/modules/enums/pathfindingAlgorithmsEnum';

interface State {
  tableData: string[][],
  activePenMode: string,
  selectedAlgorithm: string,
}

export const usePathEditorStore = defineStore('pathEditor', {
  state: (): State => ({
    tableData: [],
    activePenMode: DrawModesEnum.SELECT,
    selectedAlgorithm: PathfindingAlgorithmsEnum.BFS,
  }),
  getters: {
    /** Returns position of start and goald tiles */
    startAndGoalCords(): { start: TileCords, goal: TileCords } {
      return getStartAndGoalCords(this.tableData);
    },
  },
  actions: {
    /**
     * Create new empty data table for grid component with specific size
     * @type {void}
     * @param {number} width Width of the table
     * @param {number} height Height of the table
    */
    createTable(width: number, height: number): void {
      // Reset and set new heigth before create structure
      this.tableData = new Array(height);

      for (let rowId = 0; rowId < height; rowId++) {
        this.tableData[rowId] = new Array(width).fill(CellModesEnum.EMPTY);
      }
    },

    /** Function clear grid by setting each cell as Empty */
    clearTable(): void {
      for (let i = 0; i < this.tableData.length; i++) {
        for (let j = 0; j < this.tableData[i].length; j++) {
          if (this.tableData[i][j] !== CellModesEnum.START && this.tableData[i][j] !== CellModesEnum.GOAL && this.tableData[i][j] !== CellModesEnum.WALL) {
            this.tableData[i][j] = CellModesEnum.EMPTY;
          }
        }
      }
    },

    /**
     * Function change current search algorithm
     * @param {string} newAlg New search algorithm to set
     */
    changeAlgorithm(newAlg: string): void {
      this.selectedAlgorithm = newAlg;
    },

    /**
     * Do editor operation on selected tile
     * @type {void}
     * @param {TileCords} cords Specific tile cords
    */
    doOperation(cords: TileCords): void {
      const { row, col } = cords;

      switch (this.activePenMode) {
        case DrawModesEnum.SELECT:
          // Do nothing
          break;

        case DrawModesEnum.DRAW_START:
          this.deleteAllTilesByType(CellModesEnum.START);
          this.tableData[row][col] = CellModesEnum.START;
          break;

        case DrawModesEnum.DRAW_GOAL:
          this.deleteAllTilesByType(CellModesEnum.GOAL)
          this.tableData[row][col] = CellModesEnum.GOAL;
          break;

        case DrawModesEnum.DRAW_WALL:
          this.tableData[row][col] = CellModesEnum.WALL;
          break;

        case DrawModesEnum.ERASE_CELL:
          this.tableData[row][col] = CellModesEnum.EMPTY;
          break;
      }
    },

    /**
     * Function sets new mode for activePenMode state
     * @param {string} newMode New mode to set
     */
    selectDrawTool(newMode: string): void {
      if (newMode === this.activePenMode) return;
      if (!isValueInEnum(DrawModesEnum, newMode)) return;
      this.activePenMode = newMode;
    },

    /**
     * Delete all tiles that equal to tileTypeToDelete tile type
     * @param {string} tileTypeToDelete type of tiles to delete
     */
    deleteAllTilesByType(tileTypeToDelete: string): void {
      this.tableData.forEach((row, rowId) => {
        if (!row.includes(tileTypeToDelete)) {
          return;
        }

        row.forEach((cell, colId) => {
          if (cell !== tileTypeToDelete) {
            return;
          }

          this.tableData[rowId][colId] = CellModesEnum.EMPTY;
        })
      })
    },
  },
});
