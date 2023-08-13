
import { expect, it, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import type { TileCords } from '@/types/CommonTypes';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
import PathfindingAlgorithmsEnum from '@/modules/enums/pathfindingAlgorithmsEnum';

describe('PathEditorStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('getters', () => {
    it('startAndGoalCords should returns position of start and goal tiles', () => {
      const store = usePathEditorStore();
      expect(store.startAndGoalCords).toEqual({
        start: { row: 0, col: 0 },
        goal: { row: 0, col: 0 },
      });

      store.tableData = [
        ['E', 'S', 'E'],
        ['E', 'G', 'E'],
        ['E', 'E', 'E'],
      ];

      expect(store.startAndGoalCords).toEqual({
        start: { row: 0, col: 1 },
        goal: { row: 1, col: 1 },
      });
    });
  });

  describe('actions', () => {
    it('createTable should create correct structure of tableData', () => {
      const store = usePathEditorStore();
      expect(store.tableData).toEqual([]);
      store.createTable(4, 4);
      expect(store.tableData).toEqual([
        ['E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E'],
      ]);
    });

    it('clearTable should correctly reset tableData state without deleting start, goal and wall tiles', () => {
      const store = usePathEditorStore();
      store.tableData = [
        ['S', 'P', 'P', 'D'],
        ['W', 'W', 'P', 'D'],
        ['D', 'W', 'P', 'P'],
        ['D', 'W', 'W', 'P'],
        ['G', 'P', 'P', 'P'],
      ];

      store.clearTable();
      expect(store.tableData).toEqual([
        ['S', 'E', 'E', 'E'],
        ['W', 'W', 'E', 'E'],
        ['E', 'W', 'E', 'E'],
        ['E', 'W', 'W', 'E'],
        ['G', 'E', 'E', 'E'],
      ]);
    });

    it('changeAlgorithm should set correctly new algorithm', () => {
      const store = usePathEditorStore();
      expect(store.selectedAlgorithm).toBe(PathfindingAlgorithmsEnum.BFS);
      store.changeAlgorithm(PathfindingAlgorithmsEnum.DFS);
      expect(store.selectedAlgorithm).toBe(PathfindingAlgorithmsEnum.DFS);
    });

    it('doOperation should correctly change state of specific tile', () => {
      const store = usePathEditorStore();
      const testCords: TileCords = { row: 0, col: 1 };
      store.createTable(2, 3);
      expect(store.tableData[testCords.row][testCords.col]).toBe(CellModesEnum.EMPTY);
      store.doOperation(testCords);
      expect(store.tableData[testCords.row][testCords.col]).toBe(CellModesEnum.EMPTY);

      store.selectDrawTool(DrawModesEnum.DRAW_GOAL);
      store.doOperation(testCords);
      expect(store.tableData[testCords.row][testCords.col]).toBe(CellModesEnum.GOAL);

      store.selectDrawTool(DrawModesEnum.DRAW_START);
      store.doOperation(testCords);
      expect(store.tableData[testCords.row][testCords.col]).toBe(CellModesEnum.START);

      store.selectDrawTool(DrawModesEnum.DRAW_WALL);
      store.doOperation(testCords);
      expect(store.tableData[testCords.row][testCords.col]).toBe(CellModesEnum.WALL);
    });

    it('selectDrawTool should correctly set new pen mode', () => {
      const store = usePathEditorStore();
      expect(store.activePenMode).toBe(DrawModesEnum.SELECT);

      store.selectDrawTool('test');
      expect(store.activePenMode).toBe(DrawModesEnum.SELECT);

      store.selectDrawTool(DrawModesEnum.DRAW_START);
      expect(store.activePenMode).toBe(DrawModesEnum.DRAW_START);

      store.selectDrawTool(DrawModesEnum.DRAW_GOAL);
      expect(store.activePenMode).toBe(DrawModesEnum.DRAW_GOAL);

      store.selectDrawTool(DrawModesEnum.DRAW_WALL);
      expect(store.activePenMode).toBe(DrawModesEnum.DRAW_WALL);
    });

    it('deleteAllTilesByType should correctly delete specific type of tile on board', () => {
      const testBoard: string[][] = [
        ['E', 'E', 'S'],
        ['S', 'S', 'S'],
        ['E', 'G', 'E'],
      ];

      const store = usePathEditorStore();
      store.createTable(3, 3);
      store.tableData = testBoard;
      store.deleteAllTilesByType(CellModesEnum.START);
      expect(store.tableData).toEqual([
        ['E', 'E', 'E'],
        ['E', 'E', 'E'],
        ['E', 'G', 'E'],
      ]);
    });
  });
});
