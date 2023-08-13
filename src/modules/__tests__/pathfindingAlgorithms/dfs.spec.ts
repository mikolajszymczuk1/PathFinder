import { describe, it, expect } from 'vitest';
import { dfs } from '@/modules/pathfindingAlgorithms/dfs';
import { getStartAndGoalCords } from '@/modules/commonFunctions/searchingHelpers';

describe('dfs', () => {
  it('Should correctly returns array with visited tiles', () => {
    const testTableData: string[][] = [
      ['E', 'S', 'E', 'E'],
      ['E', 'E', 'E', 'E'],
      ['E', 'W', 'W', 'W'],
      ['E', 'E', 'G', 'E'],
    ];

    const { start, goal } = getStartAndGoalCords(testTableData);
    const visitedTiles = dfs(testTableData, start, goal);

    expect(visitedTiles).toEqual([
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
      { row: 3, col: 2 },
    ]);
  });
});
