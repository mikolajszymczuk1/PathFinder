import { defineStore } from 'pinia';
import type { TileCords } from '@/types/CommonTypes';
import { isValueInEnum } from '@/modules/commonFunctions/enumHelpers';
import { getStartAndGoalCords } from '@/modules/commonFunctions/searchingHelpers';
import { toast } from '@/modules/toasts/pathFinderToasts';
import { useTableHistoryStore } from '@/stores/TableHistoryStore';
import { useAnimationControllerStore } from '@/stores/AnimationControllerStore';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import PathfindingAlgorithmsEnum from '@/modules/enums/pathfindingAlgorithmsEnum';
import ToastTypeEnum from '@/modules/enums/toastTypesEnum';

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
    /**
     * Returns position of start and goald tiles
     * @return {{ start: TileCords, goal: TileCords }} Start and goal positions
     */
    startAndGoalCords(): { start: TileCords, goal: TileCords } {
      return getStartAndGoalCords(this.tableData);
    },

    /**
     * Return true if there are not animation staff
     * @return {boolean} True if there are not animation staff
     */
    isTableCleared(): boolean {
      for (let i = 0; i < this.tableData.length; i++) {
        for (let j = 0; j < this.tableData[i].length; j++) {
          if (this.tableData[i][j] === CellModesEnum.DISCOVERED || this.tableData[i][j] === CellModesEnum.PATH) {
            return false;
          }
        }
      }

      return true;
    }
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

    /**
     * TODO: Add comment here
     * @param {TileCords[]} cords Array of tile cords
     */
    updateTableWithTilesCords(cords: TileCords[]): void {
      const animationControllerStore = useAnimationControllerStore();

      // Block toolbox when animation is running
      if (!animationControllerStore.isPaused) {
        toast(ToastTypeEnum.ERROR, 'You cannot use tools while the animation is running !');
        return;
      }

      cords.forEach((cord, index) => {
        this.tableData[cord.row][cord.col] = ((): string => {
          switch (this.activePenMode) {
            case DrawModesEnum.SELECT:
              return this.tableData[cord.row][cord.col];

            case DrawModesEnum.DRAW_WALL:
              return CellModesEnum.WALL;

            case DrawModesEnum.ERASE_CELL:
              return CellModesEnum.EMPTY;

            case DrawModesEnum.DRAW_GOAL:
              this.deleteAllTilesByType(CellModesEnum.GOAL);
              return index >= cords.length - 1 ? CellModesEnum.GOAL : CellModesEnum.EMPTY;

            case DrawModesEnum.DRAW_START:
              this.deleteAllTilesByType(CellModesEnum.START);
              return index >= cords.length - 1 ? CellModesEnum.START : CellModesEnum.EMPTY;

            default:
              return CellModesEnum.EMPTY;
          }
        })();
      });

      this.clearTable();
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
        });
      });
    },
  },
});
