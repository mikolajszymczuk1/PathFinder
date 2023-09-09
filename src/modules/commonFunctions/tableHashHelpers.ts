/** TODO: Add comment here */
export const hashTable = (table: string[][]): string => {
  let hash = '';
  let counter = 0;

  table.forEach((row) => {
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
};

/** TODO: Add comment here */
export const unHashTable = (hash: string): string[][] => {
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

    chunks.forEach((chunk) => {
      const repeat = parseInt(chunk);
      const key = chunk.at(END);

      table[rowId] = table[rowId].concat(new Array(repeat).fill(key));
    });
  });

  return table;
};
