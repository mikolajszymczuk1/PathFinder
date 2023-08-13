import { expect, it, describe } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import CellModesEnum from '@/modules/enums/cellModesEnum';
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
        contentType: CellModesEnum.EMPTY,
        col: 3,
        row: 2,
      }
    });

    expect(findTile().classes()).toContain('bg-gray-light');

    await wrapper.setProps({ contentType: CellModesEnum.WALL });
    expect(findTile().classes()).toContain('!bg-gray-medium');

    await wrapper.setProps({ contentType: CellModesEnum.PATH });
    expect(findTile().classes()).toContain('!bg-orange');
    expect(findTile().classes()).toContain('animate-discoverPath');
    expect(findTile().classes()).toContain('transition-all');

    await wrapper.setProps({ contentType: CellModesEnum.START });
    expect(findTile().classes()).toContain('!bg-lime');
    expect(findTileIcon().attributes('icon')).toContain('location-pin');

    await wrapper.setProps({ contentType: CellModesEnum.GOAL });
    expect(findTile().classes()).toContain('!bg-red');
    expect(findTileIcon().attributes('icon')).toContain('flag-checkered');

    await wrapper.setProps({ contentType: CellModesEnum.DISCOVERED });
    expect(findTile().classes()).toContain('!bg-blue');
    expect(findTile().classes()).toContain('animate-discoverTile');
    expect(findTile().classes()).toContain('transition-all');
  });

  it('Should emit cords when user clicks on tile', async () => {
    createComponent({
      props: {
        contentType: CellModesEnum.EMPTY,
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
