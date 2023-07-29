<template>
  <div class="flex justify-center mt-[78.5px]">
    <GridTable :table-data="store.tableData" />
  </div>
</template>

<script setup lang="ts">
import GridTable from '@/components/GridTable.vue';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { useWindowSize } from '@vueuse/core';
import { getNewTilesSize } from '@/modules/commonFunctions/resizeCommon';

const store = usePathEditorStore();
const { width, height } = useWindowSize();
const { twidth, theight } = getNewTilesSize(width, height);
store.createTable(twidth, theight);
</script>
