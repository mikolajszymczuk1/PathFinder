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
          @tile-cords-brush="handleTileCordsBrush"
          @tile-cords-point="handleTileCordsPoint"
          :data-content-type="col"
          data-test="single-tile"
        />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import type { TileCords } from '@/types/CommonTypes';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { useWindowSize } from '@vueuse/core';
import { getNewTilesSize } from '@/modules/commonFunctions/resizeCommon';
import { useMousePressed } from '@vueuse/core';

import GridTile from '@/components/GridTile.vue';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import { useTableHistoryStore } from '@/stores/TableHistoryStore';

const store = usePathEditorStore();
const historyStore = useTableHistoryStore();
const { width, height } = useWindowSize();
const { pressed } = useMousePressed();

const tileAtcoords = ref<string | null>(null);
const tileCoords = ref<TileCords | null>(null);

const recordedTiles = ref<TileCords[] | null>(null);

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
const handleTileCordsBrush = (cords: TileCords): void => {
  if (!pressed.value) {
    tileAtcoords.value = null;
    tileCoords.value = null;

    endRecordChanges();
    return;
  }

  if (store.activePenMode === DrawModesEnum.SELECT) {
    grabTile(cords);
    return;
  }

  recordChanges(cords);
}

const handleTileCordsPoint = (cords: TileCords): void => {
  store.doOperation(cords);
}

const recordChanges = (coords: TileCords) => {
  if (recordedTiles.value === null) {
    recordedTiles.value = [];
  }

  recordedTiles.value.push(coords);
  store.updateTableWothTilesCoords(recordedTiles.value)
}

const endRecordChanges = () => {
  historyStore.pushHistory(store.tableData);
  recordedTiles.value = null;
}

const grabTile = (cords: TileCords): void => {
  if (tileAtcoords.value === null) {
    tileAtcoords.value = store.tableData[cords.row][cords.col];
  }

  if(tileCoords.value !== null) {
    store.tableData[tileCoords.value.row][tileCoords.value.col] = CellModesEnum.EMPTY;
  }
  store.tableData[cords.row][cords.col] = tileAtcoords.value;

  tileCoords.value = cords;
}
</script>
