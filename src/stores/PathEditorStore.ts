import type { TileCords } from '@/types/CommonTypes';
import { defineStore } from 'pinia';

interface State {
  tableData: string[][],
}

export const usePathEditorStore = defineStore('pathEditor', {
  state: (): State => ({
    tableData: [],
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

    /** Do editor operation on selected tile */
    doOperation(cords: TileCords): void {
      const { row, col } = cords;
      this.tableData[row][col] = 'W';
    }
  },
});
