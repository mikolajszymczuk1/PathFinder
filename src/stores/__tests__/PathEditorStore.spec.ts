
import { expect, it, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { useAnimationControllerStore } from '@/stores/AnimationControllerStore';
import type { TileCords } from '@/types/CommonTypes';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
import PathfindingAlgorithmsEnum from '@/modules/enums/pathfindingAlgorithmsEnum';

describe('PathEditorStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('getters', () => {
    describe('startAndGoalCords', () => {
      it('should returns position of start and goal tiles', () => {
        const store = usePathEditorStore();
        expect(store.startAndGoalCords).toEqual({
          start: { row: -1, col: -1 },
          goal: { row: -1, col: -1 },
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

    describe('isTableCleared', () => {
      it('should return true if there are not any path and discover tiles', () => {
        const store = usePathEditorStore();

        store.tableData = [
          ['E', 'S', 'E'],
          ['E', 'G', 'E'],
          ['E', 'E', 'E'],
        ];

        expect(store.isTableCleared).toBeTruthy();

        store.tableData = [
          ['E', 'S', 'E'],
          ['P', 'G', 'E'],
          ['P', 'E', 'E'],
        ];

        expect(store.isTableCleared).toBeFalsy();
      });
    });
  });

  describe('actions', () => {
    describe('createTable', () => {
      it('should create correct structure of tableData', () => {
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

      it('should correctly reset tableData state without deleting start, goal and wall tiles', () => {
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
    });

    describe('clearTable', () => {
      it('should clear the table by setting all tiles as empty without special tiles types', () => {
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
    });

    describe('resetTable', () => {
      it('should reset all table by setting each cell as Empty', () => {
        const store = usePathEditorStore();
        store.tableData = [
          ['S', 'P', 'P', 'D'],
          ['W', 'W', 'P', 'D'],
          ['D', 'W', 'P', 'P'],
          ['D', 'W', 'W', 'P'],
          ['G', 'P', 'P', 'P'],
        ];

        store.resetTable();
        expect(store.tableData).toEqual([
          ['E', 'E', 'E', 'E'],
          ['E', 'E', 'E', 'E'],
          ['E', 'E', 'E', 'E'],
          ['E', 'E', 'E', 'E'],
          ['E', 'E', 'E', 'E'],
        ]);
      });
    });

    describe('changeAlgorithm', () => {
      it('should set correctly new algorithm', () => {
        const store = usePathEditorStore();
        expect(store.selectedAlgorithm).toBe(PathfindingAlgorithmsEnum.BFS);
        store.changeAlgorithm(PathfindingAlgorithmsEnum.DFS);
        expect(store.selectedAlgorithm).toBe(PathfindingAlgorithmsEnum.DFS);
      });
    });

    describe('updateTableWithTilesCords', () => {
      it('should correctly change state of specific tiles', () => {
        const store = usePathEditorStore();
        const testCords: TileCords[] = [{ row: 0, col: 1 }, { row: 1, col: 2 }];
        store.createTable(2, 3);
        expect(store.tableData[testCords[0].row][testCords[0].col]).toBe(CellModesEnum.EMPTY);

        store.updateTableWithTilesCords(testCords);
        expect(store.tableData[testCords[0].row][testCords[0].col]).toBe(CellModesEnum.EMPTY);
        expect(store.tableData[testCords[1].row][testCords[1].col]).toBe(CellModesEnum.EMPTY);

        store.selectDrawTool(DrawModesEnum.DRAW_GOAL);
        store.updateTableWithTilesCords(testCords);
        expect(store.tableData[testCords[0].row][testCords[0].col]).toBe(CellModesEnum.EMPTY);
        expect(store.tableData[testCords[1].row][testCords[1].col]).toBe(CellModesEnum.GOAL);

        store.selectDrawTool(DrawModesEnum.DRAW_START);
        store.updateTableWithTilesCords(testCords);
        expect(store.tableData[testCords[0].row][testCords[0].col]).toBe(CellModesEnum.EMPTY);
        expect(store.tableData[testCords[1].row][testCords[1].col]).toBe(CellModesEnum.START);

        store.selectDrawTool(DrawModesEnum.DRAW_WALL);
        store.updateTableWithTilesCords(testCords);
        expect(store.tableData[testCords[0].row][testCords[0].col]).toBe(CellModesEnum.WALL);
        expect(store.tableData[testCords[1].row][testCords[1].col]).toBe(CellModesEnum.WALL);
      });

      it('should not do any operation when animation is running', () => {
        const pathEditorStore = usePathEditorStore();
        const animationControllerStore = useAnimationControllerStore();
        const testCords: TileCords[] = [{ row: 0, col: 1 }];

        pathEditorStore.createTable(2, 3);
        pathEditorStore.selectDrawTool(DrawModesEnum.DRAW_GOAL);
        pathEditorStore.updateTableWithTilesCords(testCords);

        expect(pathEditorStore.tableData[testCords[0].row][testCords[0].col]).toBe(CellModesEnum.GOAL);

        animationControllerStore.isPaused = false;
        pathEditorStore.selectDrawTool(DrawModesEnum.DRAW_WALL);
        pathEditorStore.updateTableWithTilesCords(testCords);
        expect(pathEditorStore.tableData[testCords[0].row][testCords[0].col]).toBe(CellModesEnum.GOAL);
      });
    });

    describe('selectDrawTool', () => {
      it('should correctly set new pen mode', () => {
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
    });

    describe('deleteAllTilesByType', () => {
      it('should correctly delete specific type of tile on board', () => {
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
});
