import { defineStore } from 'pinia';
import type { TileCords } from '@/types/CommonTypes';
import { isValueInEnum } from '@/modules/commonFunctions/enumHelpers';
import { getStartAndGoalCords } from '@/modules/commonFunctions/searchingHelpers';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import PathfindingAlgorithmsEnum from '@/modules/enums/pathfindingAlgorithmsEnum';
import { toast } from '@/modules/toasts/pathFinderToasts';
import ToastTypeEnum from '@/modules/enums/toastTypesEnum';

import { useTableHistoryStore } from './TableHistoryStore';

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

      for (let rowIndex = 0; rowIndex < height; rowIndex++) {
        this.tableData[rowIndex] = new Array(width).fill(CellModesEnum.EMPTY);
      }

      const historyStore = useTableHistoryStore();
      historyStore.$reset();
      historyStore.pushHistory(this.tableData);
    },

    /** Function clear grid by setting each cell as Empty without cells: `start`, `goal`, `wall` */
    clearTable(): void {
      const tilesToAvoid: string[] = [CellModesEnum.START, CellModesEnum.GOAL, CellModesEnum.WALL];
      for (let i = 0; i < this.tableData.length; i++) {
        for (let j = 0; j < this.tableData[i].length; j++) {
          if (!tilesToAvoid.includes(this.tableData[i][j])) {
            this.tableData[i][j] = CellModesEnum.EMPTY;
          }
        }
      }
    },

    /** Function reset all table */
    resetTable(): void {
      for (let i = 0; i < this.tableData.length; i++) {
        for (let j = 0; j < this.tableData[i].length; j++) {
          this.tableData[i][j] = CellModesEnum.EMPTY;
        }
      }

      toast(ToastTypeEnum.SUCCESS, 'Board have been successfully reset');
    },

    updateTableWothTilesCoords(coords: TileCords[]) {
      coords.forEach((coord, id) => {
        this.tableData[coord.row][coord.col] = ((): string => {
          switch (this.activePenMode) {
            case DrawModesEnum.SELECT:
              return this.tableData[coord.row][coord.col];

            case DrawModesEnum.DRAW_WALL:
              return CellModesEnum.WALL;

            case DrawModesEnum.ERASE_CELL:
              return CellModesEnum.EMPTY;

            case DrawModesEnum.DRAW_GOAL:
              return id === 0? CellModesEnum.GOAL : CellModesEnum.EMPTY;

            case DrawModesEnum.DRAW_START:
              return id === 0? CellModesEnum.START : CellModesEnum.EMPTY;

            default:
              return CellModesEnum.EMPTY;
          }
        })()
      });
    },

    /**
     * Function change current search algorithm
     * @param {string} newAlg New search algorithm to set
     */
    changeAlgorithm(newAlg: string): void {
      this.selectedAlgorithm = newAlg;
      toast(ToastTypeEnum.SUCCESS, `Switched to ${newAlg.toUpperCase()} algorithm`);
    },

    /**
     * Do editor operation on selected tile
     * @type {void}
     * @param {TileCords} cords Specific tile cords
    */
    doOperation(cords: TileCords): void {
      const { row, col } = cords;
      const historyStore = useTableHistoryStore();

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

      this.clearTable();
      if (this.activePenMode !== DrawModesEnum.SELECT) {
        historyStore.pushHistory(this.tableData);
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
      this.tableData.forEach((row, rowIndex) => {
        if (!row.includes(tileTypeToDelete)) {
          return;
        }

        row.forEach((cell, colIndex) => {
          if (cell !== tileTypeToDelete) {
            return;
          }

          this.tableData[rowIndex][colIndex] = CellModesEnum.EMPTY;
        })
      });
    },
  },
});
