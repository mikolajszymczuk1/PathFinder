import { defineStore } from 'pinia';
import type { TileCords } from '@/types/CommonTypes';
import { isValueInEnum } from '@/modules/commonFunctions/enumHelpers';
import { areStartAndGoalPlaced, getStartAndGoalCords, areTilesCordsEqual } from '@/modules/commonFunctions/searchingHelpers';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import { EDITOR_CONST } from '@/modules/consts/editorConst';

import bfs from '@/modules/pathfindingAlgorithms/bfs';
import { DFSAlgorithm } from '@/modules/pathfindingAlgorithms/dfs';
import TableHistory from '@/modules/classes/tableHistory/TableHistory';

interface State {
  tableData: string[][],
  tableHistory: TableHistory,
  activePenMode: string,
  isPaused: boolean,
  isAnimFinished: boolean,
}

export const usePathEditorStore = defineStore('pathEditor', {
  state: (): State => ({
    tableData: [],
    tableHistory: new TableHistory,
    activePenMode: DrawModesEnum.SELECT,
    isPaused: true,
    isAnimFinished: true,
  }),
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

      this.tableHistory.pushHistory(this.tableData);
    },

    /** Function clear grid by setting each cell as Empty */
    clearTable(): void {
      for (let i = 0; i < this.tableData.length; i++) {
        for (let j = 0; j < this.tableData[i].length; j++) {
          if (this.tableData[i][j] !== CellModesEnum.START && this.tableData[i][j] !== CellModesEnum.GOAL && this.tableData[i][j] !== CellModesEnum.WALL) {
            this.tableData[i][j] = CellModesEnum.EMPTY;
          }
        }

      for (let rowId = 0; rowId < height; rowId++) {
        this.tableData[rowId] = new Array(width).fill(CellModesEnum.EMPTY);
      }

      this.tableHistory.pushHistory(this.tableData);
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
      if (!isValueInEnum(DrawModesEnum, newMode) || newMode === this.activePenMode) {
        return;
      }

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
        });
      });
    },

    /** Function to run or pause simulation */
    async playPauseSimulation(): Promise<void> {
      if (!areStartAndGoalPlaced(this.tableData)) return;
      this.isPaused = !this.isPaused;
      // User can use pause functionality until simulation is not finished
      if (!this.isPaused && this.isAnimFinished) {
        this.isAnimFinished = false;
        await this.doSimulation();
      }
    },

    /** Main animation controller */
    async doSimulation(): Promise<void> {
      if (areStartAndGoalPlaced(this.tableData)) {
        this.clearTable();
        const { start, goal } = getStartAndGoalCords(this.tableData);
        const discoverdTiles = DFSAlgorithm(this.tableData, [CellModesEnum.WALL]) as TileCords[];
        for (const cords of discoverdTiles) {
          if (this.isPaused) {
            // When simulation is paused, create promise and wait for resolve
            await new Promise((res: CallableFunction) => {
              const interval = setInterval(() => {
                if (!this.isPaused) {
                  clearInterval(interval);
                  res();
                }
              }, EDITOR_CONST.ANIMATION_CONTROLLER_CONF.INTERVAL_TIME);
            });
          }

          if (!areTilesCordsEqual(cords, start) && !areTilesCordsEqual(cords, goal)) {
            this.tableData[cords.row][cords.col] = CellModesEnum.DISCOVERED;
            // Simple promise for animation delay
            await new Promise((res) => setTimeout(res, EDITOR_CONST.ANIMATION_CONTROLLER_CONF.TILE_DISCOVER_DELAY));
          }
        }

        this.isAnimFinished = true;
      }
    },

    /** Function to run or pause simulation */
    async playPauseSimulation(): Promise<void> {
      if (!areStartAndGoalPlaced(this.tableData)) return;
      this.isPaused = !this.isPaused;
      // User can use pause functionality until simulation is not finished
      if (!this.isPaused && this.isAnimFinished) {
        this.isAnimFinished = false;
        await this.doSimulation();
      }
    },

    /** Main animation controller */
    async doSimulation(): Promise<void> {
      if (areStartAndGoalPlaced(this.tableData)) {
        this.clearTable();
        const { start, goal } = getStartAndGoalCords(this.tableData);
        const discoverdTiles = DFSAlgorithm(this.tableData, [CellModesEnum.WALL]) as TileCords[];
        for (const cords of discoverdTiles) {
          if (this.isPaused) {
            // When simulation is paused, create promise and wait for resolve
            await new Promise((res: CallableFunction) => {
              const interval = setInterval(() => {
                if (!this.isPaused) {
                  clearInterval(interval);
                  res();
                }
              }, EDITOR_CONST.ANIMATION_CONTROLLER_CONF.INTERVAL_TIME);
            });
          }

          if (!areTilesCordsEqual(cords, start) && !areTilesCordsEqual(cords, goal)) {
            this.tableData[cords.row][cords.col] = CellModesEnum.DISCOVERED;
            // Simple promise for animation delay
            await new Promise((res) => setTimeout(res, EDITOR_CONST.ANIMATION_CONTROLLER_CONF.TILE_DISCOVER_DELAY));
          }
        }

        this.isAnimFinished = true;
      }
    }
  },
});
