<template>
  <div class="flex relative w-[355px] h-[56px] bg-gray-light rounded-[10px] md:w-[77px] md:h-[597px] dark:bg-purple md:flex-col md:rounded-[8px]">
    <button
      class="ml-[16px] mr-[15px] md:flex md:justify-center md:items-center md:mr-0 md:ml-0 md:h-[72px]"
      @click="toggleMenu()"
      data-test="menu-button"
    >
      <MenuIcon class="md:w-[25px] md:h-auto" />
    </button>

    <div
      class="flex justify-between absolute top-[calc(-100%-3px)] w-full h-[56px]"
      v-if="isMenuActive"
      data-test="menu"
    >
      <EditorResetButton class="md:hidden" />
      <EditorHistoryControl class="md:hidden" />
    </div>

    <div class="flex justify-between flex-1 pl-[22px] bg-gray-medium rounded-[10px] dark:bg-dark-medium md:flex-col md:pl-0 md:pt-[40px] md:rounded-t-[12px] md:rounded-b-[8px]">
      <div class="flex items-center md:flex-col">
        <template v-for="controlButton, index in controlButtonsData" :key="controlButton.icon">
          <SingleControlButton
            :icon-name="controlButton.icon"
            large-icon
            @clickAction="setDrawTool(controlButton.drawTool)"
            v-tippy="{ content: controlButton.tooltipContent, theme: 'material', placement: 'auto', animation: 'shift-away' }"
          />

          <BreakLine v-if="index !== (controlButtonsData.length - 1)" class="mx-[15px] md:mx-0 md:my-[21px]" horizontal-on-large-screens />
        </template>
      </div>

      <button
        class="flex justify-center items-center w-[54px] my-[3px] mr-[3px] rounded-[8px] bg-lime text-[0.8125rem] font-comfortaa
          dark:bg-purple dark:text-white md:w-auto md:h-[55px] md:mx-[3px] md:mt-0 md:text-[0.9375rem]"
        @click="changePathAlg()"
        data-test="change-alg-button"
      >
        {{ pathStore.selectedAlgorithm.toUpperCase() }}
      </button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, type Ref } from 'vue';
import { get, set } from '@vueuse/core';
import type { ControlButton } from '@/types/CommonTypes';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { getEnumValues } from '@/modules/commonFunctions/enumHelpers';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
import PathfindingAlgorithmsEnum from '@/modules/enums/pathfindingAlgorithmsEnum';

import MenuIcon from '@/components/icons/MenuIcon.vue';
import SingleControlButton from '@/components/buttons/SingleControlButton.vue';
import BreakLine from '@/components/common/BreakLine.vue';
import EditorHistoryControl from '@/widgets/EditorHistoryControl.vue';
import EditorResetButton from '@/widgets/EditorResetButton.vue';
import { useAnimationControllerStore } from '@/stores/AnimationControllerStore';

const pathStore = usePathEditorStore();
const animStore = useAnimationControllerStore();

/** Current index for algorithm select */
const currentAlgorithmIndex: Ref<number> = ref(0);

/** Menu active status */
const isMenuActive: Ref<boolean> = ref(false);

/** Array of all search algorithms */
const searchAlgorithms = getEnumValues(PathfindingAlgorithmsEnum);

/** Data for render toolbox control buttons */
const controlButtonsData: ControlButton[] = [
  { icon: 'fa-arrow-pointer', drawTool: DrawModesEnum.SELECT, tooltipContent: 'Pointer' },
  { icon: 'fa-location-pin', drawTool: DrawModesEnum.DRAW_START, tooltipContent: 'Start' },
  { icon: 'fa-flag-checkered', drawTool: DrawModesEnum.DRAW_GOAL, tooltipContent: 'Goal' },
  { icon: 'fa-square-xmark', drawTool: DrawModesEnum.DRAW_WALL, tooltipContent: 'Wall' },
  { icon: 'fa-eraser', drawTool: DrawModesEnum.ERASE_CELL, tooltipContent: 'Erase' },
];

/**
 * Set new tool as actve
 * @param newTool new tool to set
 */
const setDrawTool = (newTool: string): void => {
  pathStore.selectDrawTool(newTool);
};

/** Switch to another path finding alghoritm */
const changePathAlg = (): void => {
  if (get(currentAlgorithmIndex) < searchAlgorithms.length - 1) {
    set(currentAlgorithmIndex, get(currentAlgorithmIndex) + 1);
  } else {
    set(currentAlgorithmIndex, 0);
  }

  pathStore.changeAlgorithm(searchAlgorithms[get(currentAlgorithmIndex)]);
};

/** Activate or deactivate menu */
const toggleMenu = (): void => set(isMenuActive, !get(isMenuActive));
</script>
