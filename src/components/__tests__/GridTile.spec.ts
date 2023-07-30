import { expect, it, describe } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import GridTile from '@/components/GridTile.vue';

describe('GridTile', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => {
    wrapper = mount(GridTile, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      ...config,
    });
  };

  const findTile = () => wrapper.find('[data-test="tile"]');
  const findTileIcon = () => wrapper.find('[data-test="tile-icon"]');

  it('Should set correct styles and icon based on contentType prop', async () => {
    createComponent({
      props: {
        contentType: 'E',
        col: 3,
        row: 2,
      }
    });

    expect(findTile().classes()).toContain('bg-gray-light');

    await wrapper.setProps({ contentType: 'W' });
    expect(findTile().classes()).toContain('bg-gray-medium');

    await wrapper.setProps({ contentType: 'P' });
    expect(findTile().classes()).toContain('bg-orange');

    await wrapper.setProps({ contentType: 'S' });
    expect(findTile().classes()).toContain('bg-lime');
    expect(findTileIcon().attributes('icon')).toContain('location-pin');

    await wrapper.setProps({ contentType: 'G' });
    expect(findTile().classes()).toContain('bg-red');
    expect(findTileIcon().attributes('icon')).toContain('flag-checkered');
  });

  it('Should emit cords when user clicks on tile', async () => {
    createComponent({
      props: {
        contentType: 'E',
        col: 2,
        row: 6,
      }
    });

    await wrapper.trigger('click');
    const emitedCords = wrapper.emitted('tileCords');
    expect(emitedCords).toHaveLength(1);
    expect(emitedCords![0]).toEqual([{ col: 2, row: 6 }]);
  });
});
