<template>
  <div
    class="flex items-center justify-center gap-[15px] px-[20px] py-[14px] rounded-[10px]
    bg-gray-medium dark:bg-dark-medium md:px-[18px] md:py-[11px] md:gap-[19px]"
  >
    <SingleControlButton
      icon-name="fa-arrow-rotate-left"
      large-icon @click-action="undoHistory()"
      data-test="undo-action-button"
      v-tippy="{ content: 'Undo', theme: 'material', placement: 'top', animation: 'shift-away' }"
    />

    <BreakLine />

    <SingleControlButton
      icon-name="fa-arrow-rotate-right"
      large-icon @click-action="redoHistory()"
      data-test="redo-action-button"
      v-tippy="{ content: 'Redo', theme: 'material', placement: 'top', animation: 'shift-away' }"
    />
  </div>
</template>

<script setup lang="ts">
import { useTableHistoryStore } from '@/stores/TableHistoryStore';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { useAnimationControllerStore } from '@/stores/AnimationControllerStore';
import ToastTypeEnum from '@/modules/enums/toastTypesEnum';
import { toast } from '@/modules/toasts/pathFinderToasts';

import BreakLine from '@/components/common/BreakLine.vue';
import SingleControlButton from '@/components/buttons/SingleControlButton.vue';

const pathStore = usePathEditorStore();
const historyStore = useTableHistoryStore();
const animationControllerStore = useAnimationControllerStore();

/** Undo history */
const undoHistory = (): void => {
  if (!animationControllerStore.isAnimFinished) {
    toast(ToastTypeEnum.ERROR, 'You cannot use undo button while the animation is running !');
    return;
  }

  const prevTable = historyStore.setPreviousTable();
  if (prevTable.length === 0) {
    return;
  }

  pathStore.tableData = prevTable;
};

/** Redo history */
const redoHistory = (): void => {
  if (!animationControllerStore.isAnimFinished) {
    toast(ToastTypeEnum.ERROR, 'You cannot use redo button while the animation is running !');
    return;
  }

  const nextTable = historyStore.setNextTable();
  if (nextTable.length === 0) {
    return;
  }

  pathStore.tableData = nextTable;
};
</script>
