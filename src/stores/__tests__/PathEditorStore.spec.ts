
import { expect, it, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import type { TileCords } from '@/types/CommonTypes';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import DrawModesEnum from '@/modules/enums/drawModesEnum';

describe('PathEditorStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

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
