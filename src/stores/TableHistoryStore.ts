import { hashTable, unHashTable } from "@/modules/commonFunctions/tableHashHelpers";
import { defineStore } from "pinia";

interface ITableHistory {
  _tables: string[],
  pointer: number,
  length: number,
}


export const useTableHistoryStore = defineStore("tableHistory", {
  state: (): ITableHistory => ({
    _tables: [],
    pointer: 0,
    length: -1,
  }),

  getters: {
    /**
     * Returns the n-th previous table from history if possible. \
     * ``` This getter is not unhashing the table ``` \
     * ``` Can be used to get actual table ```
     * @param depth n-th table from pointer
     * @param state
     * @returns
     */
    getPreviousTable: (state) => {
      return (depth = 1): string | undefined => {
        if (state.pointer < depth) {
          return undefined;
        }

        return state._tables[state.pointer - depth];
      };
    },
    /**
     * Returns the n-th next table from history if possible. \
     * ``` This getter is not unhashing the table ``` \
     * ``` Can be used to get actual table ```
     * @param depth n-th table from pointer
     * @param state
     * @returns
     */
    getNextTable: (state) => {
      return (depth = 1): string | undefined => {
        if (state.pointer + depth >= state._tables.length) {
          return undefined;
        }

        return state._tables[state.pointer + depth];
      };
    },
  },

  actions: {
    pushHistory(table: string[][]): string {
      const hash = hashTable(table);

      if (this.length > 0 && this._tables.length > this.length) {
        while (this._tables.length <= this.length) {
          this._tables.shift();
        }
      }

      if (this._tables.length > this.pointer) {
        this._tables = this._tables.slice(0, this.pointer);
      }

      this._tables.push(hash);
      this.pointer += 1;
      return hash;
    },

    popHistory(): string | undefined {
      if (this._tables.length <= 1) {
        return undefined;
      }

      const grid = this._tables.shift();
      this.pointer -= 1;
      return grid;
    },

    setPreviousTable(): string[][] | undefined {
      const prevTable = this.getPreviousTable();
      if (prevTable === undefined) {
        return undefined;
      }

      this.pointer -= 1;
      return unHashTable(prevTable);
    },

    setNextTable(): string[][] | undefined {
      const nextTable = this.getNextTable();
      if (nextTable === undefined) {
        return undefined;
      }

      this.pointer += 1;
      return unHashTable(nextTable);
    },

    setMaxLength(maxLength: number): void {

    }
  },
});
