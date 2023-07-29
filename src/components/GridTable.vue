<template>
  <div class="flex flex-col gap-[4px]">
    <div
      class="flex gap-[4px]"
      v-for="row, indexRow in tableData"
      :key="indexRow"
      data-test="single-row"
    >
        <GridTile
          v-for="col, indexCol in row"
          :key="`${indexRow}x${indexCol}`"
          :content-type="col"
          :row="indexRow"
          :col="indexCol"
          @tileCords="handleTileCords"
          :data-content-type="col"
          data-test="single-tile"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue';
import GridTile from '@/components/GridTile.vue';
import type { TileCords } from '@/types/CommonTypes';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { useWindowSize } from '@vueuse/core';
import { getNewTilesSize } from '@/modules/commonFunctions/resizeCommon';

const store = usePathEditorStore();
const { width, height } = useWindowSize();

defineProps({
  /** Structure of grid */
  tableData: {
    type: Array,
    required: true
  },
});

watch([width, height], () => {
  const { twidth, theight } = getNewTilesSize(width, height);
  store.createTable(twidth, theight);
});

/** Handle emited cords from tile component and do store operation */
const handleTileCords = (cords: TileCords): void => {
  store.doOperation(cords);
}
</script>
