import { expect, it, describe } from 'vitest';
import { recontructShortestPath } from '@/modules/commonFunctions/pathfindingHelpers';
import { getStartAndGoalCords } from '@/modules/commonFunctions/searchingHelpers';
import { bfs } from '@/modules/pathfindingAlgorithms/bfs';
import { dfs } from '@/modules/pathfindingAlgorithms/dfs';

describe('PathfindingHelpers', () => {
  describe('recontructShortestPath', () => {
    it('Should return correct path for bfs', () => {
      const testTableData: string[][] = [
        ['E', 'S', 'E', 'E'],
        ['E', 'E', 'E', 'E'],
        ['E', 'W', 'W', 'W'],
        ['E', 'E', 'G', 'E'],
      ];

      const { start, goal } = getStartAndGoalCords(testTableData);
      const visited = bfs(testTableData, start, goal);
      const path = recontructShortestPath(testTableData, visited, goal);

      expect(path).toEqual([
        { row: 0, col: 1 },
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
        { row: 3, col: 0 },
        { row: 3, col: 1 },
      ]);
    });

    it('Should return correct path for dfs', () => {
      const testTableData: string[][] = [
        ['E', 'S', 'E', 'E'],
        ['E', 'E', 'E', 'E'],
        ['E', 'W', 'W', 'W'],
        ['E', 'E', 'G', 'E'],
      ];

      const { start, goal } = getStartAndGoalCords(testTableData);
      const visited = dfs(testTableData, start, goal);
      const path = recontructShortestPath(testTableData, visited, goal);

      expect(path).toEqual([
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: 1, col: 3 },
        { row: 1, col: 2 },
        { row: 1, col: 1 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
        { row: 3, col: 0 },
        { row: 3, col: 1 },
      ]);
    });
  });
});
