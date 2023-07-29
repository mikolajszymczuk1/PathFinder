<template>
  <FontAwesomeIcon
    class='h-[1.75rem] py-[1.4rem] px-[.5rem] hover:text-green last:border-none'
    :class="isActive"
    :icon="['fas', getIcon]"
    @click="store.selectDrawTool(penIcon)"
  />
</template>

<script setup lang='ts'>
import DrawModesEnum from '@/modules/enums/drawModesEnum';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';

import { usePathEditorStore } from '@/stores/PathEditorStore';
import { getEnumValues } from '@/modules/commonFunctions/enumHelpers';

const store = usePathEditorStore();

const props = defineProps({
  penIcon: {
    type: String,
    required: true,
    validator(value: string): boolean {
      return getEnumValues(DrawModesEnum).includes(value);
    }
  }
});

const isActive = computed<string>(() => {
  return props.penIcon === store.activePenMode.toString() ? "text-lime" : 'text-white';
});

const getIcon = computed<string>(() => {
  let icon = 'arrow-pointer';
  switch (props.penIcon) {
    case DrawModesEnum.DRAW_START:
      icon = 'location-pin';
      break;
    case DrawModesEnum.DRAW_GOAL:
      icon = 'flag-checkered';
      break;
    case DrawModesEnum.DRAW_WALL:
      icon = 'square-xmark';
      break;
    case DrawModesEnum.ERASE_CELL:
      icon = 'eraser';
      break;
  }
  return icon;
})
</script>
