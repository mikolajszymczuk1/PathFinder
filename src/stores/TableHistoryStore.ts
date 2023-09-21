import { hashTable, unHashTable } from '@/modules/commonFunctions/tableHashHelpers';
import { defineStore } from 'pinia';

interface State {
  tables: string[],
  pointer: number,
  length: number,
}

type GetPrevNextTableFunction = (depth?: number) => string;

export const useTableHistoryStore = defineStore('tableHistory', {
  state: (): State => ({
    tables: [],
    pointer: -1,
    length: -1,
  }),

  getters: {
    /**
     * Returns the n-th previous table from history if possible. \
     * ``` This getter is not unhashing the table ``` \
     * ``` Can be used to get actual table ```
     * @param {State} state store state
     * @param {number} depth n-th table from pointer
     * @return {GetPrevNextTableFunction}
     */
    getPreviousTable: (state: State): GetPrevNextTableFunction => {
      return (depth = 1): string => {
        if (state.pointer < depth) {
          return '';
        }

        return state.tables[state.pointer - depth];
      };
    },
    /**
     * Returns the n-th next table from history if possible. \
     * ``` This getter is not unhashing the table ``` \
     * ``` Can be used to get actual table ```
     * @param {State} state store state
     * @param {number} depth n-th table from pointer
     * @returns
     */
    getNextTable: (state: State): GetPrevNextTableFunction => {
      return (depth = 1): string => {
        if (state.pointer + depth >= state.tables.length) {
          return '';
        }

        return state.tables[state.pointer + depth];
      };
    },
  },

  actions: {
    /**
     * Appends history with specified table, if table is equal to pointed table functions only hashes table passed in param
     * @param {string[][]} table table to push into history
     * @return {string} hash of passed table
     */
    pushHistory(table: string[][]): string {
      const hash = hashTable(table);

      if (hash === this.tables.at(-1)) {
        return hash;
      }

      if (this.length > 0 && this.tables.length > this.length) {
        while (this.tables.length <= this.length) {
          this.tables.shift();
        }
      }

      if (this.tables.length > this.pointer) {
        this.tables = this.tables.slice(0, this.pointer + 1);
      }

      this.tables.push(hash);
      this.pointer += 1;
      return hash;
    },

    /** TODO: Add comment here */
    popHistory(): string {
      if (this.tables.length <= 1) {
        return '';
      }

      const grid = this.tables.shift() as string;
      this.pointer -= 1;
      return grid;
    },

    /** TODO: Add comment here */
    setPreviousTable(): string[][] {
      const prevTable = this.getPreviousTable();
      if (prevTable === '') {
        return [];
      }

      this.pointer -= 1;
      return unHashTable(prevTable);
    },

    /** TODO: Add comment here */
    setNextTable(): string[][] {
      const nextTable = this.getNextTable();
      if (nextTable === '') {
        return [];
      }

      this.pointer += 1;
      return unHashTable(nextTable);
    },

    /** TODO: Add comment here */
    setMaxLength(maxLength: number): void {
      if (maxLength <= -1 || maxLength >= this.length) {
        this.length = maxLength;
        return;
      }

      this.tables = this.tables.slice(-maxLength);
      this.pointer = this.pointer - (maxLength);

      if (this.pointer < 0) {
        this.pointer = 0;
      }
    },
  },
});
