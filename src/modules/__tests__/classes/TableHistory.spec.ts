import TableHistory from "@/modules/classes/TableHistory";
import { describe, expect, it } from "vitest";

describe('Table history', () => {
  describe('Hash function', () => {
    it('Should hash table', () => {
      const testTable = [
        ['A', 'A', 'D', 'D'],
        ['B', 'B', 'B', 'B'],
        ['C', 'C', 'C', 'C'],
        ['A', 'A', 'A', 'A']
      ];

      const hashedTable = TableHistory.hashTable(testTable);

      expect(hashedTable).toEqual('2A2D\n4B\n4C\n4A');
    });

    it('Should hash table', () => {
      const testTable = [
        ['A', 'B', 'C', 'B'],
        ['B', 'B', 'B', 'B'],
        ['C', 'C', 'C', 'C'],
        ['A', 'A', 'A', 'A']
      ];

      expect(TableHistory.hashTable(testTable)).toEqual('1A1B1C1B\n4B\n4C\n4A')
    });

    it('Should hash table', () => {
      const testTable = [
        ['A', 'B', 'C', 'D'],
        ['D', 'B', 'B', 'B'],
        ['C', 'C', 'C', 'C'],
        ['A', 'A', 'A', 'G']
      ];

      expect(TableHistory.hashTable(testTable)).toEqual('1A1B1C1D\n1D3B\n4C\n3A1G')
    });
  });

  describe('Dehash function', () => {
    it('Should return one row of A', () => {
      const testHash = '5A';

      expect(TableHistory.dehashTable(testHash)).toEqual([['A', 'A', 'A', 'A', 'A']]);
    });

    it('Should create real table from hash', () => {
      const testHash = '5a\n1b3d1e\n4r1w\n3r2r\n5t';
      expect(TableHistory.dehashTable(testHash)).toEqual([
        ['a', 'a', 'a', 'a', 'a'],
        ['b', 'd', 'd', 'd', 'e'],
        ['r', 'r', 'r', 'r', 'w'],
        ['r', 'r', 'r', 'r', 'r'],
        ['t', 't', 't', 't', 't'],
      ]);
    })
  })
});
