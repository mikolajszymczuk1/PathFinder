<template>
  <div class="flex items-center justify-center gap-[13px] px-[15px] py-[7px] rounded-[10px]
    bg-gray-medium md:px-[22px] md:py-[11px] md:gap-[19px]">
    <SingleControlButton icon-name="fa-arrow-rotate-left" @click-action="undoHistory()"></SingleControlButton>
    <BreakLine></BreakLine>
    <SingleControlButton icon-name="fa-arrow-rotate-right" @click-action="redoHistory()"></SingleControlButton>
  </div>
</template>

<script setup lang="ts">
import BreakLine from './common/BreakLine.vue';
import SingleControlButton from './buttons/SingleControlButton.vue';

import { useTableHistoryStore } from '@/stores/TableHistoryStore';
import { usePathEditorStore } from '@/stores/PathEditorStore';

const pathStore = usePathEditorStore();
const historyStore = useTableHistoryStore();

const undoHistory = () => {
  const prevTable = historyStore.setPreviousTable();
  if (prevTable === undefined) {
    return;
  }

  pathStore.tableData = prevTable;
};

const redoHistory = () => {
  const nextTable = historyStore.setNextTable();
  if (nextTable === undefined) {
    return;
  }

  pathStore.tableData = nextTable;
};

</script>
