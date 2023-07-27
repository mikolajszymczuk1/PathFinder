<template>
  <div class="flex justify-center mt-[78.5px]">
    <GridTable :table-data="store.tableData" />
  </div>
</template>

<script setup lang="ts">
import GridTable from '@/components/GridTable.vue';
import { usePathEditorStore } from '@/stores/PathEditorStore';

const store = usePathEditorStore();
store.createTable(7, 11);
</script>
