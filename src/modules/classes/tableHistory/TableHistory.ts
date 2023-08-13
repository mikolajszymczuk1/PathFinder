import CellModesEnum from "@/modules/enums/cellModesEnum";
import type ITableHistory from "./ITableHistory";

export default class TableHistory implements ITableHistory {
  tables: string[] = [];
  pointer: number = 0;

  public pushHistory(table: string[][]): number {
    if (TableHistory.length >= 20) {
      this.popHistory();
    }

    const parsedTable = TableHistory.compress(table);
    if (parsedTable === null) {
      return -1;
    }

    this.pointer = this.tables.push(parsedTable) - 1;
    return this.pointer;
  }

  public popHistory(): string | undefined {
    if (this.tables.length <= 1) {
      return undefined;
    }

    const shiftedValue = this.tables.shift();
    return shiftedValue;
  }

  public static compress(table: string[][]): string | null {
    let pointer = 0;
    table.forEach((row, rowId) => {
      let counter = 0;
      let cellCode = table[rowId][pointer];

      do {

      } while (true)
    })
  }

  public static parse(table: string): string[][] {

  }

  public parseFromHistory(pointer: number): string[][] | null {

  }

  public compressToHistory(table: string[][]): string {

  }

  saveToNewFile(table: string[][], fileName: string, destination: string): string {

  }

  readFromFile(filePath: string): string {

  }

  getNext(): string | null {

  }

  getPrevious(): string | null {

  }
}
