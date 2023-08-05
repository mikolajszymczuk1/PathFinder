import { expect, it, describe } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import BreakLine from '@/components/common/BreakLine.vue';

describe('BreakLine', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(BreakLine, config); };

  it('Should change styles for vertical and horizontal version of BreakLine', async () => {
    createComponent();
    expect(wrapper.classes()).toContain('md:w-[2px]');
    expect(wrapper.classes()).toContain('md:h-[28px]');
    await wrapper.setProps({ horizontalOnLargeScreens: true });
    expect(wrapper.classes()).toContain('md:w-[53px]');
    expect(wrapper.classes()).toContain('md:h-[2px]');
  });
});
