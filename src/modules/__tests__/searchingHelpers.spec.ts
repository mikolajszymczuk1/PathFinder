import { expect, it, describe } from 'vitest';
import { getNeighbors, getStartAndGoalCords, areStartAndGoalPlaced } from '@/modules/commonFunctions/searchingHelpers';

describe('searchingHelpers', () => {
  describe('getNeighbors', () => {
    it('Should return 4 neighbors when tile is on some place in the middle part of grid', () => {
      const testTable = [
        ['E', 'E', 'E'],
        ['E', 'S', 'E'],
        ['E', 'E', 'E'],
      ];

      const expectedNeighbors = [{ row: 0, col: 1 }, { row: 2, col: 1 }, { row: 1, col: 0 }, { row: 1, col: 2 }];
      expect(getNeighbors(testTable, { row: 1, col: 1 })).toEqual(expectedNeighbors);
    });

    it('Should return 3 neighbors when tile is on one of grid edge', () => {
      const testTable = [
        ['E', 'S', 'E'],
        ['E', 'E', 'E'],
        ['E', 'E', 'E'],
      ];

      const expectedNeighbors = [{ row: 1, col: 1 }, { row: 0, col: 0 }, { row: 0, col: 2 }];
      expect(getNeighbors(testTable, { row: 0, col: 1 })).toEqual(expectedNeighbors);
    });

    it('Should return 2 neighbors when tile is on one of grid corner', () => {
      const testTable = [
        ['S', 'E', 'E'],
        ['E', 'E', 'E'],
        ['E', 'E', 'E'],
      ];

      const expectedNeighbors = [{ row: 1, col: 0 }, { row: 0, col: 1 }];
      expect(getNeighbors(testTable, { row: 0, col: 0 })).toEqual(expectedNeighbors);
    });
  });

  it('getStartAndGoalCords should return correct coridnates for start and goal tiles', () => {
    const testTable = [
      ['S', 'E', 'E'],
      ['E', 'E', 'E'],
      ['E', 'E', 'G'],
    ];

    expect(getStartAndGoalCords(testTable)).toEqual({
      start: { row: 0, col: 0 },
      goal: { row: 2, col: 2 },
    });
  });

  describe('areStartAndGoalPlaced', () => {
    it('should return true if start and goal are on the grid', () => {
      const testTable = [
        ['S', 'E', 'E'],
        ['E', 'G', 'E'],
        ['E', 'E', 'G'],
      ];

      expect(areStartAndGoalPlaced(testTable)).toBeTruthy();
    });

    it('should return false if start and goal are not on the grid', () => {
      const testTable = [
        ['E', 'E', 'E'],
        ['E', 'E', 'E'],
        ['E', 'E', 'E'],
      ];

      expect(areStartAndGoalPlaced(testTable)).toBeFalsy();
    });

    it('should return false if only start or only goal is on the grid', () => {
      const testTable = [
        ['E', 'E', 'E'],
        ['E', 'E', 'E'],
        ['E', 'E', 'G'],
      ];

      expect(areStartAndGoalPlaced(testTable)).toBeFalsy();
    });
  });
});
