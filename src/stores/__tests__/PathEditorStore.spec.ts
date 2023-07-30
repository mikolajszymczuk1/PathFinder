
import { expect, it, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import type { TileCords } from '@/types/CommonTypes';

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
    expect(store.tableData[testCords.row][testCords.col]).toBe('E');
    store.doOperation(testCords);
    expect(store.tableData[testCords.row][testCords.col]).toBe('E');
  });
});
