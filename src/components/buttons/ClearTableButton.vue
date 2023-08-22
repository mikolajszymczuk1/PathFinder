<template>
  <div class="flex align-middle px-4 rounded-lg bg-lime">
    <SingleControlButton icon-name="fa-trash" :large-icon="true" @click-action="clearTable" data-test="test-clear-btn"/>
  </div>
</template>

<script setup lang="ts">
import { useWindowSize } from '@vueuse/core';
import SingleControlButton from './SingleControlButton.vue';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { getNewTilesSize } from '@/modules/commonFunctions/resizeCommon';

const pathStore = usePathEditorStore();

const clearTable = () => {
  const { width, height } = useWindowSize();
  const { twidth, theight } = getNewTilesSize(width, height);

  pathStore.createTable(twidth, theight);
}
</script>
