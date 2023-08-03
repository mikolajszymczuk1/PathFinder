import { defineStore } from 'pinia';
import type { TileCords } from '@/types/CommonTypes';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import { preventAndDeleteAdditionalBlocks } from '@/modules/commonFunctions/editorCommon';

interface State {
  tableData: string[][],
  activePenMode: string,
}

export const usePathEditorStore = defineStore('pathEditor', {
  state: (): State => ({
    tableData: [],
    activePenMode: DrawModesEnum.SELECT,
  }),
  actions: {
    /**
     * Create new empty data table for grid component with specific size
     * @type {void}
     * @param {number} width Width of the table
     * @param {number} height Height of the table
    */
    createTable(width: number, height: number): void {
      this.tableData = []; // Reset table before create structure
      for (let i = 0; i < height; i++) {
        const row: string[] = [];
        for (let j = 0; j < width; j++) {
          row.push(CellModesEnum.EMPTY);
        }

        this.tableData.push(row);
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
          preventAndDeleteAdditionalBlocks({
            grid: this.tableData,
            blockToExclude: CellModesEnum.START,
            maxCount: 0,
          });
          this.tableData[row][col] = CellModesEnum.START;
          break;

        case DrawModesEnum.DRAW_GOAL:
          preventAndDeleteAdditionalBlocks({
            grid: this.tableData,
            blockToExclude: CellModesEnum.GOAL,
            maxCount: 0,
          });
          this.tableData[row][col] = CellModesEnum.GOAL;
          break;

        case DrawModesEnum.DRAW_WALL:
          this.tableData[row][col] = CellModesEnum.WALL;
          break;

        case DrawModesEnum.ERASE_CELL:
        default:
          this.tableData[row][col] = CellModesEnum.EMPTY;
          break;
      }

      return;
    },

    selectDrawTool(newMode: string) {
      if (newMode === this.activePenMode.toString()) {
        return; // No action is needed
      }

      switch (newMode) {
        case DrawModesEnum.SELECT:
          this.activePenMode = DrawModesEnum.SELECT;
          break;

        case DrawModesEnum.DRAW_START:
          this.activePenMode = DrawModesEnum.DRAW_START;
          break;

        case DrawModesEnum.DRAW_GOAL:
          this.activePenMode = DrawModesEnum.DRAW_GOAL;
          break;

        case DrawModesEnum.DRAW_WALL:
          this.activePenMode = DrawModesEnum.DRAW_WALL;
          break;

        case DrawModesEnum.ERASE_CELL:
          this.activePenMode = DrawModesEnum.ERASE_CELL;
          break;
      }
      return;
    },
  },
});
