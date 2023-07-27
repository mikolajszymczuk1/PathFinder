<template>
  <FontAwesomeIcon
    class='h-[1.75rem] py-[1.4rem] px-[.5rem] hover:text-green-200 last:border-none'
    :class="isActive"
    :icon="['fas', getIcon]"
    @click="selectDrawingTool()"
  />
</template>

<script setup lang='ts'>
import PenDrawModesEnum from '@/modules/enums/penDrawModesEnum';
import { deconstructPenDrawModes } from '@/modules/enums/penDrawModesEnum';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';

import { pathEditorStore } from '@/stores/PathEditorStore';

const store = pathEditorStore();

const props = defineProps({
  penIcon: {
    type: String,
    required: true,
    validator(value: string): boolean {
      return deconstructPenDrawModes().includes(value);
    }
  }
});

const selectDrawingTool = () => {
  let newMode = PenDrawModesEnum.SELECT;
  switch (props.penIcon) {
    case PenDrawModesEnum.DRAW_START:
      newMode = PenDrawModesEnum.DRAW_START;
      break;
    case PenDrawModesEnum.DRAW_GOAL:
      newMode = PenDrawModesEnum.DRAW_GOAL;
      break;
    case PenDrawModesEnum.DRAW_WALL:
      newMode = PenDrawModesEnum.DRAW_WALL;
      break;
    case PenDrawModesEnum.ERASE_CELL:
      newMode = PenDrawModesEnum.ERASE_CELL;
      break;
  }
  store.updatePen(newMode);
}

const isActive = computed<string>(() => {
  return props.penIcon === store.activePenMode.toString() ? "text-green-300" : 'text-gray-100';
});

const getIcon = computed<string>(() => {
  let icon = 'arrow-pointer';
  switch (props.penIcon) {
    case PenDrawModesEnum.DRAW_START:
      icon = 'location-pin';
      break;
    case PenDrawModesEnum.DRAW_GOAL:
      icon = 'flag-checkered';
      break;
    case PenDrawModesEnum.DRAW_WALL:
      icon = 'square-xmark';
      break;
    case PenDrawModesEnum.ERASE_CELL:
      icon = 'eraser';
      break;
  }
  return icon;
})
</script>
