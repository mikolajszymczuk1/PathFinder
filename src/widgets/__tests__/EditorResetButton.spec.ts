import { describe, it, expect, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import EditorResetButton from '@/widgets/EditorResetButton.vue';

describe('EditorResetButton', () => {
  let wrapper: VueWrapper;
  const tippy = vi.fn();
  const createComponent = (config = {}) => {
    wrapper = mount(EditorResetButton, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: ['FontAwesomeIcon'],
        directives: { tippy },
      },
      ...config,
    });
  };

  const findResetButton = () => wrapper.find('[data-test="reset-button"]');

  it('Should call store resetTable method when click reset button', async () => {
    createComponent();
    const store = usePathEditorStore();
    await findResetButton().trigger('click');
    expect(store.resetTable).toHaveBeenCalledTimes(1);
  });
});
