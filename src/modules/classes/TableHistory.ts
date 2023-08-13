export default class TableHistory {
  private _tables: string[] = [];
  public pointer: number = 0;
  public lenght: number = 0;

  /**
   * Adds a new hash to history, if length is set higher than 0 it will also remove elements from history.
   * Function can also delete entries that are in front oof actual pointer posiiton
   * @param table
   * @returns pushed hashed table
   */
  public pushHistory(table: string[][]): string {
    const hash = TableHistory.hashTable(table);

    if (this._tables.length > length) {
      while (this._tables.length <= length) {
        this._tables.shift();
      }
    }

    if (this._tables.length > this.pointer) {
      this._tables = this._tables.slice(0, this.pointer);
    }

    this._tables.push(hash);
    return hash;
  }

  /**
   * funciton pops earliest table from history
   * @returns popped dehashed table
   */
  public popHistory(): string[][] | undefined {
    if (this._tables.length <= 1) {
      return undefined;
    }

    const grid = TableHistory.dehashTable(this._tables[0]);
    return grid;
  }

  /**
   * @returns previous tabl next to pointer,or undefined if history is empty
   */
  public getPrevious(): string[][] | undefined {
    if (this.pointer <= 0) {
      return undefined
    }

    const grid = TableHistory.dehashTable(this._tables[--this.pointer]);
    return grid;
  }

  /**
   *
   * @returns next element in the history, or undefined if there are no more history in front of pointer
   */
  public getNext(): string[][] | undefined {
    if (this.pointer === this._tables.length) {
      return undefined;
    }

    const grid = TableHistory.dehashTable(this._tables[this.pointer]);
    return grid;
  }

  public saveToFile(): boolean {
    return true;
  }

  public loadFromFile(): boolean {
    return true;
  }


  /**
   * Copmresses entire table to string
   * @param table table to compress
   * @returns
   */
  public static hashTable = (table: string[][]): string => {
    let hash = '';
    let counter = 0;

    table.forEach(row => {
      let colId = 0;
      let key = row[colId];

      while (colId < row.length) {
        counter += 1;
        colId += 1;

        if (key !== row[colId]) {
          hash = hash.concat(counter.toString(), key);
          counter = 0;
          key = row[colId];
          continue;
        }

        if (colId === row.length - 1) {
          hash = hash.concat((counter + 1).toString(), key);
          break;
        }
      }
      counter = 0;

      hash = hash.concat('\n');
    });
    return hash.trimEnd();
  }

  /**
   * Reverts effects from hash function
   * @param hash hash code of table
   * @returns
   */
  public static dehashTable(hash: string): string[][] {
    const table: string[][] = [];

    const rows: string[] = [];

    for (let i = 0; i < hash.length; i++) {
      let row = '';
      while (hash[i] !== '\n') {
        row = row.concat(hash[i++]);
        if (i > hash.length - 1) {
          break;
        }
      }

      rows.push(row);
    }


    rows.forEach((row, rowId) => {
      const END = -1;

      table.push([]);

      const chunks: string[] = [];
      let chunk: string = '';

      for (let i = 0; i < row.length; i++) {
        const parse = parseInt(row[i]);

        if (isNaN(parse)) {
          chunk = chunk.concat(row[i]);
          chunks.push(chunk);
          chunk = '';
        } else {
          chunk = chunk.concat(parse.toString());
        }
      }

      chunks.forEach(chunk => {
        const repeat = parseInt(chunk);
        const key = chunk.at(END);

        table[rowId] = table[rowId].concat(new Array(repeat).fill(key));
      })
    });

    return table;
  }
}
