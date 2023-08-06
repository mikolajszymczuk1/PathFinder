import { expect, it, describe, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { getEnumValues } from '@/modules/commonFunctions/enumHelpers';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
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
});
