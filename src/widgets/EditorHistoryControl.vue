<template>
  <div
    class="flex items-center justify-center gap-[15px] px-[20px] py-[14px] rounded-[10px]
    bg-gray-medium md:px-[18px] md:py-[11px] md:gap-[19px]"
  >
    <SingleControlButton icon-name="fa-arrow-rotate-left" large-icon @click-action="undoHistory()" data-test="undo-action-button" />
    <BreakLine />
    <SingleControlButton icon-name="fa-arrow-rotate-right" large-icon @click-action="redoHistory()" data-test="redo-action-button" />
  </div>
</template>

<script setup lang="ts">
import { useTableHistoryStore } from '@/stores/TableHistoryStore';
import { usePathEditorStore } from '@/stores/PathEditorStore';

import BreakLine from '@/components/common/BreakLine.vue';
import SingleControlButton from '@/components/buttons/SingleControlButton.vue';

const pathStore = usePathEditorStore();
const historyStore = useTableHistoryStore();

/** Undo history */
const undoHistory = () => {
  const prevTable = historyStore.setPreviousTable();
  if (prevTable === undefined) {
    return;
  }

  pathStore.tableData = prevTable;
};

/** Redo history */
const redoHistory = () => {
  const nextTable = historyStore.setNextTable();
  if (nextTable === undefined) {
    return;
  }

  pathStore.tableData = nextTable;
};
</script>
