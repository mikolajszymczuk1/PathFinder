import { mount, type VueWrapper } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createTestingPinia } from '@pinia/testing';
import { useTableHistoryStore } from '@/stores/TableHistoryStore';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { useAnimationControllerStore } from '@/stores/AnimationControllerStore';
import EditorHistoryControl from '@/widgets/EditorHistoryControl.vue';

describe('EditorHistoryControl', () => {
  let wrapper: VueWrapper;
  let testHistory: string[];
  let testPointer: number;

  const tippy = vi.fn();
  const createComponent = (config = {}) => {
    wrapper = mount(EditorHistoryControl, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn, stubActions: false })],
        stubs: ['FontAwesomeIcon', 'tippy'],
        directives: { tippy },
      },
      ...config,
    });
  }

  beforeEach(() => {
    testHistory = ['2a', '3a', '4a'];
    testPointer = 1;
  });

  const findUndoActionButton = () => wrapper.find('[data-test="undo-action-button"]');
  const findRedoActionButton = () => wrapper.find('[data-test="redo-action-button"]');

  it('Should change table to previous', async () => {
    createComponent();

    const historyStore = useTableHistoryStore();
    const pathStore = usePathEditorStore();

    historyStore.tables = testHistory;
    historyStore.pointer = testPointer;

    await findUndoActionButton().trigger('click');

    expect(pathStore.tableData).toStrictEqual([['a', 'a']]);
  });

  it('Should change table to next', async () => {
    createComponent();

    const historyStore = useTableHistoryStore();
    const pathStore = usePathEditorStore();

    historyStore.tables = testHistory;
    historyStore.pointer = testPointer;

    await findRedoActionButton().trigger('click');

    expect(pathStore.tableData).toStrictEqual([['a', 'a', 'a', 'a']]);
  });

  it('Undo / Redo button should do nothing when animation is running', async () => {
    createComponent();

    const historyStore = useTableHistoryStore();
    const pathStore = usePathEditorStore();
    const animationControllerStore = useAnimationControllerStore();

    animationControllerStore.isAnimFinished = false;
    historyStore.tables = testHistory;
    historyStore.pointer = testPointer;

    await findUndoActionButton().trigger('click');
    expect(pathStore.tableData).toStrictEqual([]);
    await findRedoActionButton().trigger('click');
    expect(pathStore.tableData).toStrictEqual([]);
  });
});
