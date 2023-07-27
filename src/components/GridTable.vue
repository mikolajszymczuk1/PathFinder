<template>
  <div class="flex flex-col gap-[4px]">
    <div
      class="flex gap-[4px]"
      v-for="row, indexRow in tableData"
      :key="indexRow"
    >
        <GridTile
          v-for="col, indexCol in row"
          :key="`${indexRow}x${indexCol}`"
          :content-type="col"
          :row="indexRow"
          :col="indexCol"
          @tileCords="handleTileCords"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import GridTile from '@/components/GridTile.vue';
import type { TileCords } from '@/types/CommonTypes';
import { usePathEditorStore } from '@/stores/PathEditorStore';

const store = usePathEditorStore();

defineProps({
  tableData: {
    type: Array,
    required: true
  },
});

/** Handle emited cords from tile component and do store operation */
const handleTileCords = (cords: TileCords): void => {
  store.doOperation(cords);
}
</script>
