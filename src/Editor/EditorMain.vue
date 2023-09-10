<template>
  <header>
    <nav
      class="flex justify-between items-center mb-[12px] mt-[33px] mx-auto md:ml-auto md:mr-[33px] lg:mt-[24px] lg:mr-[45px] lg:mb-[17px]"
      :style="{ 'width': `${elWidth}px` }"
    >
      <div class="relative lg:flex lg:flex-row-reverse lg:gap-[38px]">
        <div class="flex items-center gap-[6px] absolute top-[calc(-100%-6px)] lg:relative lg:gap-[11px]">
          <a class="flex" href="https://github.com/mikolajszymczuk1/PathFinder">
            <FontAwesomeIcon class="w-[17px] h-auto text-gray-medium dark:text-white lg:w-[25px]" :icon="['fab', 'github']" />
          </a>
          <DarkModeToggle />
        </div>

        <LogoIcon class="md:w-[203px] md:h-auto" />
      </div>

      <div class="flex self-end gap-[14px]">
        <EditorResetButton class="hidden md:flex" />
        <EditorHistoryControl class="hidden md:flex" />
        <EditorNavControl />
      </div>
    </nav>
  </header>

  <main class="md:flex md:flex-row-reverse md:items-center">
    <div class="flex justify-center md:justify-end md:mr-[33px] lg:mr-[45px]">
      <GridTable ref="el" :table-data="store.tableData" />
    </div>

    <div class="flex justify-center mt-[27.5px] md:mt-0 md:mr-[1%] lg:mr-[31px]">
      <EditorToolbox />
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
import DarkModeToggle from '@/components/buttons/DarkModeToggle.vue';

import EditorToolbox from '@/widgets/EditorToolbox.vue';
import EditorNavControl from '@/widgets/EditorNavControl.vue';
import EditorHistoryControl from '@/widgets/EditorHistoryControl.vue';
import EditorResetButton from '@/widgets/EditorResetButton.vue';

// Grid initalization
const store = usePathEditorStore();
const { width, height } = useWindowSize();
const { twidth, theight } = getNewTilesSize(width, height);
store.createTable(twidth, theight);

// Helper for correctly nav bar positioning
const el: Ref<HTMLElement | null> = ref(null);
const { width: elWidth } = useElementSize(el);
</script>
