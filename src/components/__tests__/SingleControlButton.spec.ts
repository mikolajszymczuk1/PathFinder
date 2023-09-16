import { expect, it, describe } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import SingleControlButton from '../buttons/SingleControlButton.vue';

describe('SingleControlButton', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => {
    wrapper = mount(SingleControlButton, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      ...config,
    });
  };

  const findControlButton = () => wrapper.find('[data-test="single-control-button"]');
  const findControlIcon = () => wrapper.find('[data-test="single-control-icon"]');

  it('Icon should has correct icon value based on iconName prop value', () => {
    createComponent({
      props: {
        iconName: 'fa-pause',
      },
    });

    expect(findControlIcon().attributes('icon')).toContain('fa-pause');
  });

  it('When click button, it should emits click event', async () => {
    createComponent({
      props: {
        iconName: 'fa-play',
      },
    });

    await findControlButton().trigger('click');
    const emited = wrapper.emitted('clickAction');
    expect(emited).toHaveLength(1);
    expect(emited![0]).toEqual([]);
  });

  it('Should set correct styles based on largeIcon prop value', async () => {
    createComponent({
      props: {
        iconName: 'fa-play',
      },
    });

    expect(findControlIcon().classes()).toContain('md:w-[16px]');
    expect(findControlIcon().classes()).toContain('md:h-auto');
    await wrapper.setProps({ largeIcon: true});
    expect(findControlIcon().classes()).toContain('md:w-auto');
    expect(findControlIcon().classes()).toContain('md:h-[25px]');
  });

  it('When isActive prop is active, should highlight icon', () => {
    createComponent({
      props: {
        iconName: 'fa-play',
        isActive: true,
      }
    });

    expect(findControlIcon().classes()).toContain('text-lime');
    expect(findControlIcon().classes()).toContain('dark:text-orange');
  });
});
