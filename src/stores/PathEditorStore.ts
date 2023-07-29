import type { TileCords } from '@/types/CommonTypes';
import { defineStore } from 'pinia';
import PenDrawModesEnum from '../modules/enums/penDrawModesEnum';

interface State {
  tableData: string[][],
  activePenMode: string,
}

export const usePathEditorStore = defineStore('pathEditor', {
  state: (): State => ({
    tableData: [],
    activePenMode: PenDrawModesEnum.SELECT,
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
          row.push('E');
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
      this.tableData[row][col] = 'W';
    },

    updatePen(newMode: string): void {
      this.activePenMode = newMode;
    }
  },
});
