<template>
  <header>
    <nav
      class="mb-[12px] mt-[33px] mx-auto md:ml-auto md:mr-[33px]"
      :style="{ 'width': `${elWidth}px` }"
    >
      <LogoIcon />
    </nav>
  </header>

  <main>
    <div class="flex justify-center md:justify-end md:mr-[33px]">
      <GridTable ref="el" :table-data="store.tableData" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { useWindowSize, useElementSize } from '@vueuse/core';
import { getNewTilesSize } from '@/modules/commonFunctions/resizeCommon';

import GridTable from '@/components/GridTable.vue';
import LogoIcon from '@/components/icons/LogoIcon.vue';

// Grid initalization
const store = usePathEditorStore();
const { width, height } = useWindowSize();
const { twidth, theight } = getNewTilesSize(width, height);
store.createTable(twidth, theight);

// Helper for correctly nav bar positioning
const el: Ref<HTMLElement | null> = ref(null);
const { width: elWidth } = useElementSize(el);
</script>