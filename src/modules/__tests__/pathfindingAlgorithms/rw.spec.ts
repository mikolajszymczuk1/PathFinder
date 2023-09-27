import { describe, it, expect, vi } from 'vitest';
import { rw } from '@/modules/pathfindingAlgorithms/rw';
import { getStartAndGoalCords } from '@/modules/commonFunctions/searchingHelpers';

describe('rw', () => {
  it('Should correctly returns array with visited tiles', () => {
    const randomValues = [0.5, 0.5, 0.2, 0.5];
    let randomValueIndex = 0;

    vi
      .spyOn(global.Math, 'random')
      .mockImplementation(() => randomValues[randomValueIndex++]);

    const testTableData: string[][] = [
      ['E', 'E', 'S'],
      ['E', 'E', 'E'],
      ['G', 'W', 'W'],
    ];

    const { start, goal } = getStartAndGoalCords(testTableData);
    const visitedTiles = rw(testTableData, start, goal);

    expect(visitedTiles).toEqual([
      { row: 0, col: 2 },
      { row: 0, col: 1 },
      { row: 0, col: 0 },
      { row: 1, col: 0 },
    ]);
  });
});
