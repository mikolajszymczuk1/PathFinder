import { mount, type VueWrapper } from "@vue/test-utils";
import { describe, vi, it, expect } from "vitest";
import ClearTableButton from "../buttons/ClearTableButton.vue";
import { createTestingPinia } from "@pinia/testing";
import { ref, type Ref } from "vue";
import { getNewTilesSize } from "@/modules/commonFunctions/resizeCommon";
import { EDITOR_CONST } from "@/modules/consts/editorConst";
import { usePathEditorStore } from "@/stores/PathEditorStore";
import CellModesEnum from "@/modules/enums/cellModesEnum";

describe('ClearTableButton', () => {
  let wrapper: VueWrapper;
  const createComponent = (config = {}) => {
    wrapper = mount(ClearTableButton, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn, stubActions: false})],
        stubs: ['FontAwesomeIcon'],
      },
      ...config,
    });
  }

  const findClearBtn = () => wrapper.find('[data-test="test-clear-btn"]')

  it('Should clear table', () => {
    createComponent();
    const pathStore = usePathEditorStore();

    const clearBtn = findClearBtn();

    clearBtn.trigger('click');

    pathStore.tableData.forEach((row) => {
      const result = row.every((cell) => cell === CellModesEnum.EMPTY);
      expect(result).toBe(true);
    });
  })
});
