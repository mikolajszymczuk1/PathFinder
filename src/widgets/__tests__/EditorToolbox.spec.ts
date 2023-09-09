import { expect, it, describe, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { getEnumValues } from '@/modules/commonFunctions/enumHelpers';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
import PathfindingAlgorithmsEnum from '@/modules/enums/pathfindingAlgorithmsEnum';
import EditorToolbox from '@/widgets/EditorToolbox.vue';
import SingleControlButton from '@/components/buttons/SingleControlButton.vue';

describe('EditorToolbox', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => {
    wrapper = mount(EditorToolbox, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn, stubActions: false, })],
        stubs: ['FontAwesomeIcon'],
      },
      ...config,
    });
  };

  const findAllControlButtons = () => wrapper.findAllComponents(SingleControlButton);
  const findChangeAlgButton = () => wrapper.find('[data-test="change-alg-button"]');
  const findMenuButton = () => wrapper.find('[data-test="menu-button"]');
  const findMenu = () => wrapper.find('[data-test="menu"]');

  it('Should correctly set draw mode when click on control buttons', async () => {
    createComponent();
    const store = usePathEditorStore();
    const allControlButtons = findAllControlButtons();
    const expectedDrawModes: string[] = getEnumValues(DrawModesEnum);

    for (let i = 0; i < allControlButtons.length; i++) {
      await allControlButtons[i].trigger('click');
      expect(allControlButtons[i].emitted()).toHaveProperty('clickAction');
      expect(store.activePenMode).toBe(expectedDrawModes[i]);
    }
  });

  it('When click change algorithm button, should correctly switch between exist algorithms', async () => {
    createComponent();
    const store = usePathEditorStore();
    expect(store.selectedAlgorithm).toBe(PathfindingAlgorithmsEnum.BFS);

    await findChangeAlgButton().trigger('click');
    expect(store.selectedAlgorithm).toBe(PathfindingAlgorithmsEnum.DFS);

    await findChangeAlgButton().trigger('click');
    expect(store.selectedAlgorithm).toBe(PathfindingAlgorithmsEnum.BFS);
  });

  it('Should activate or deactivate menu correctly', async () => {
    createComponent();
    expect(findMenu().exists()).toBeFalsy();
    await findMenuButton().trigger('click');
    expect(findMenu().exists()).toBeTruthy();
  });
});
