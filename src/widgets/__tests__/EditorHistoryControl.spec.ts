import { mount, type VueWrapper } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import EditorHistoryControl from '@/widgets/EditorHistoryControl.vue';
import { createTestingPinia } from '@pinia/testing';
import { useTableHistoryStore } from '@/stores/TableHistoryStore';
import { usePathEditorStore } from '@/stores/PathEditorStore';

describe('EditorHistoryControl', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => {
    wrapper = mount(EditorHistoryControl, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn, stubActions: false })],
        stubs: ['FontAwesomeIcon'],
      },
      ...config,
    });
  }

  const findUndoActionButton = () => wrapper.find('[data-test="undo-action-button"]');
  const findRedoActionButton = () => wrapper.find('[data-test="redo-action-button"]');

  const testHistory = ['2a', '3a', '4a'];
  const testPointer = 1;

  it('Should change table to previous', () => {
    createComponent();

    const historyStore = useTableHistoryStore();
    const pathStore = usePathEditorStore();

    historyStore.tables = testHistory;
    historyStore.pointer = testPointer;

    const undoBtn = findUndoActionButton();
    undoBtn.trigger('click');

    expect(pathStore.tableData).toStrictEqual([['a', 'a']]);
  });

  it('Should change table to next', () => {
    createComponent();

    const historyStore = useTableHistoryStore();
    const pathStore = usePathEditorStore();

    historyStore.tables = testHistory;
    historyStore.pointer = testPointer;

    const redoBtn = findRedoActionButton();
    redoBtn.trigger('click');

    expect(pathStore.tableData).toStrictEqual([['a', 'a', 'a', 'a']]);
  });
});
