import { mount, type VueWrapper } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import EditorHistoryControl from "../EditorHistoryControl.vue";
import { createTestingPinia } from "@pinia/testing";
import { useTableHistoryStore } from "@/stores/TableHistoryStore";
import { usePathEditorStore } from "@/stores/PathEditorStore";

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

  const findUndoActionButton = () => wrapper.find('[data-test="UndoActionButton"]');
  const findRedoActionButton = () => wrapper.find('[data-test="RedoActionButton"]');

  const testHistory = ['2a', '3a', '4a'];
  const testPointer = 1;

  it('Should change table to previous', () => {
    createComponent();

    const hStore = useTableHistoryStore();
    const pStore = usePathEditorStore();

    hStore._tables = testHistory;
    hStore.pointer = testPointer;

    const undoBtn = findUndoActionButton();
    undoBtn.trigger('click');

    expect(pStore.tableData).toStrictEqual([['a', 'a']]);
  });

  it('Should change table to next', () => {
    createComponent();

    const hStore = useTableHistoryStore();
    const pStore = usePathEditorStore();

    hStore._tables = testHistory;
    hStore.pointer = testPointer;

    const redoBtn = findRedoActionButton();
    redoBtn.trigger('click');

    expect(pStore.tableData).toStrictEqual([['a', 'a', 'a', 'a']]);
  });
});
