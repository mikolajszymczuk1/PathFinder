<template>
  <FontAwesomeIcon
    class='h-[1.75rem] py-[1.4rem] px-[.5rem] text-white hover:text-green-300 last:border-none'
    :class="{ /* TODO: Check if active */ false : 'text-green-300'}"
    :icon="['fas', getIcon]"
    @click="selectDrawingTool()"
  />
</template>

<script setup lang='ts'>
import PenDrawModesEnum from '@/modules/enums/penDrawModesEnum';
import { deconstructPenDrawModes } from '@/modules/enums/penDrawModesEnum';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';

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
  console.log(`Sent ${props.penIcon} to Pinia`);
}

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
