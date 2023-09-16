<template>
  <div class="flex flex-col gap-[4px] select-none">
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
import { ref, type Ref, watch } from 'vue';
import type { TileCords } from '@/types/CommonTypes';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { useTableHistoryStore } from '@/stores/TableHistoryStore';
import { useWindowSize, useMousePressed, get, set } from '@vueuse/core';
import { getNewTilesSize } from '@/modules/commonFunctions/resizeCommon';
import DrawModesEnum from '@/modules/enums/drawModesEnum';
import CellModesEnum from '@/modules/enums/cellModesEnum';

import GridTile from '@/components/GridTile.vue';

const pathEditorStore = usePathEditorStore();
const historyStore = useTableHistoryStore();

const { width, height } = useWindowSize();
const { pressed } = useMousePressed();

const grabbedTile: Ref<string> = ref('');
const grabbedTileCoords: Ref<TileCords> = ref({ row: -1, col: -1 });
const tileUnderneathGrabbed: Ref<string> = ref(CellModesEnum.EMPTY);
const recordedTiles: Ref<TileCords[]> = ref([]);

defineProps({
  /** Structure of grid */
  tableData: {
    type: Array,
    required: true
  },
});

watch([width, height], () => {
  const { twidth, theight } = getNewTilesSize(width, height);
  pathEditorStore.createTable(twidth, theight);
});

/**
 * Handle emited cords from tile component and do brush action
 * @param {TileCords} cords Tile cords
 */
const handleTileCordsBrush = (cords: TileCords): void => {
  if (!get(pressed)) {
    set(grabbedTile, '');
    set(grabbedTileCoords, { row: -1, col: -1 });
    endRecordChanges();
    return;
  }

  if (pathEditorStore.activePenMode === DrawModesEnum.SELECT) {
    grabTile(cords);
    return;
  }

  recordChanges(cords);
}

/**
 * Handle emited cords from tile component and do store operation
 * @param {TileCords} cords Tile cords
 */
const handleTileCordsPoint = (cords: TileCords): void => {
  pathEditorStore.updateTableWithTilesCords([cords]);
}

/**
 * TODO: Add comment here
 * @param {TileCords} cords Tile cords
 */
const recordChanges = (cords: TileCords): void => {
  get(recordedTiles).push(cords);
  pathEditorStore.updateTableWithTilesCords(get(recordedTiles) as TileCords[]);
}

/** TODO: Add comment here */
const endRecordChanges = (): void => {
  historyStore.pushHistory(pathEditorStore.tableData);
  set(recordedTiles, []);
}

/**
 * TODO: Add comment here
 * @param {TileCords} cords Tile cords
 */
const grabTile = (cords: TileCords): void => {
  // Check if there is already grabbed tile
  if (get(grabbedTile) === '') {
    set(grabbedTile, pathEditorStore.tableData[cords.row][cords.col]);
    set(grabbedTileCoords, cords);
  }

  pathEditorStore.tableData[get(grabbedTileCoords).row][get(grabbedTileCoords).col] = get(tileUnderneathGrabbed);
  set(tileUnderneathGrabbed, pathEditorStore.tableData[cords.row][cords.col]);
  pathEditorStore.tableData[cords.row][cords.col] = get(grabbedTile);
  set(grabbedTileCoords, cords);
}
</script>
