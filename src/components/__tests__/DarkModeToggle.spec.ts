import { expect, it, describe } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import DarkModeToggle from '@/components/buttons/DarkModeToggle.vue';

describe('DarkModeToggle', () => {
  let wrapper: VueWrapper;
  const createComponent = () => {
    wrapper = mount(DarkModeToggle, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    });
  };

  it('Should set dark mode class in html element after click', async () => {
    createComponent();
    expect(document.documentElement.classList.contains('dark')).toBeFalsy();
    await wrapper.trigger('click');
    expect(document.documentElement.classList.contains('dark')).toBeTruthy();
  });
});
