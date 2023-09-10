<template>
  <div class="flex justify-center w-[56px] rounded-[9px] bg-lime dark:bg-purple md:w-[50px]">
    <SingleControlButton
      icon-name="fa-trash"
      :large-icon="true"
      @click-action="resetTable()"
      data-test="reset-button"
      v-tippy="{ content: 'Reset Board', theme: 'material', placement: 'top', animation: 'shift-away' }"
    />
  </div>
</template>

<script setup lang="ts">
import { usePathEditorStore } from '@/stores/PathEditorStore';
import SingleControlButton from '@/components/buttons/SingleControlButton.vue';

const store = usePathEditorStore();

/** Reset grid table */
const resetTable = (): void => store.resetTable();
</script>
