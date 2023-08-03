import { expect, it, describe } from "vitest";
import { preventAdditionalBlocks, preventAndDeleteAdditionalBlocks } from "../commonFunctions/editorCommon";
import CellModesEnum from "../enums/cellModesEnum";

describe('editorCommon', () => {
  describe('preventAdditionalBlocks', () => {
    const testBoard: any[][] = [
      ['E', 'W', 'S'],
      ['E', 'E', 'E'],
      ['E', 'E', 'G'],
    ];

    it('Shouldn`t allow user to put another start block, so function will return false', () => {
      const testBlock = CellModesEnum.START;
      const testMaxBlocks = 1;

      const canPlaceStartBlock = preventAdditionalBlocks(testBoard, testBlock, testMaxBlocks);
      expect(canPlaceStartBlock).toBe(false);
    });

    it('Should allow user to place another wall block, function will return true', () => {
      const testBlock = CellModesEnum.WALL;
      const testMaxBlocks = 10;

      const canplaceWallBlock = preventAdditionalBlocks(testBoard, testBlock, testMaxBlocks);
      expect(canplaceWallBlock).toBe(true);
    })
  });

  describe('preventAndDeleteAdditionalBlocks', () => {
    it('Delete all start blocks but one', () => {
      const testBoard = [
        ['E', 'E', 'S'],
        ['S', 'S', 'S'],
        ['E', 'E', 'E'],
      ];
      const testBlock = CellModesEnum.START;
      const maxCount = 1;

      preventAndDeleteAdditionalBlocks({
        grid: testBoard,
        blockToExclude: testBlock,
        maxCount: maxCount,
      });

      expect(testBoard).toEqual([
        ['E', 'E', 'E'],
        ['E', 'E', 'S'],
        ['E', 'E', 'E'],
      ]);
    })
  });
});
