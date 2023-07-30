import { expect, it, describe, vi } from 'vitest';
import { DOMWrapper, mount, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import GridTable from '@/components/GridTable.vue';

describe('GridTable', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => { wrapper = mount(GridTable, config); };
  const findTiles = (parent: VueWrapper | DOMWrapper<Element>) => parent.findAll('[data-test="single-tile"]');
  const findRows = () => wrapper.findAll('[data-test="single-row"]');

  it('Should correctly render grid based on tableData structure', () => {
    const testData: string[][] = [
      ['S', 'E', 'W'],
      ['E', 'E', 'G'],
      ['E', 'W', 'W'],
    ];

    createComponent({
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })],
        stubs: ['FontAwesomeIcon'],
      },
      props: {
        tableData: testData,
      },
    });

    expect(findRows().length).toBe(3);
    expect(findTiles(wrapper).length).toBe(9);

    const allRows = findRows();
    for (let i = 0; i < allRows.length; i++) {
      const tilesFromRow = findTiles(allRows[i]);
      for (let j = 0; j < tilesFromRow.length; j++) {
        expect(tilesFromRow[j].attributes('data-content-type')).toBe(testData[i][j]);
      }
    }
  });
});
