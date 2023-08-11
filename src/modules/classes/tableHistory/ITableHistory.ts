export default interface ITableHistory {
  /**
   * Holds at most 20 tables
   */
  tables: string[];

  /**
   * Points to actual table in history
   */
  pointer: number;

  /**
   * pushes given table to history
   * @param table table to save
   */
  pushHistory(table: string[][]): number;

  /**
   * Removes the oldest table from history, but keeps at least one
   * @returns true if table was removed otherwise false
   */
  popHistory(): string | undefined;

  /**
   * Parses table from history at given position to 2D array
   * @param pointer index in history
   * @returns 2D string array or null if parsing was not possible
   */
  parseFromHistory(pointer: number): string[][] | null;

  /**
   * Parses 2D array to compressed version
   * @param table 2D array to parse
   * @returns 2D table as string
   */
  compressToHistory(table: string[][]): string;

  /**
   * Creates a new file with given table
   * @param table table to save, will be parsed to string
   * @param fileName file name
   * @param destination where to save file
   */
  saveToNewFile(table: string[][], fileName: string, destination: string): string;

  /**
   * Reads from file
   * @param filePath path to file
   * @returns Returns compressed table
   */
  readFromFile(filePath: string): string;

  /**
   * @returns next table if posiible, null otherwise
   */
  getNext(): string | null; // redo

  /**
   * @returns previous table if posiible, null otherwise
   */
  getPrevious(): string | null; // undo
}
