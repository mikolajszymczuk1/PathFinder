<template>
  <div
    class="flex justify-center items-center w-[40px] h-[40px] rounded-[3px] text-white transition-transform
      hover:scale-[0.90] hover:bg-gray-highlight"
    :class="getClasses"
    @click="emitCords()"
    data-test="tile"
  >
    <FontAwesomeIcon
      class="h-[auto]"
      v-if="getIcon"
      :icon="['fas', getIcon]"
      :class="getIconClasses"
      data-test="tile-icon"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TileCords } from '@/types/CommonTypes';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import { getEnumValues } from '@/modules/commonFunctions/enumHelpers';

const props = defineProps({
  /** Type of tile for example wall, start, stop, ... */
  contentType: {
    type: String,
    default: 'E', // As empty
    validator(value: string): boolean {
      return getEnumValues(CellModesEnum).includes(value);
    }
  },

  /** Index of row position */
  row: {
    type: Number,
    required: true,
  },

  /** Index of column position */
  col: {
    type: Number,
    required: true,
  }
});

const emit = defineEmits<{
  /** Emit object that contains information about tile cords */
  (e: 'tileCords', cords: TileCords): void
}>();

/** Return specific icon based on 'contentType' */
const getIcon = computed<string>(() => {
  if (props.contentType === CellModesEnum.START) {
    return 'location-pin';
  } else if (props.contentType === CellModesEnum.GOAL) {
    return 'flag-checkered';
  }

  return '';
});

/** Return classes for font awesome icon */
const getIconClasses = computed<string>(() => {
  if (props.contentType === CellModesEnum.START) {
    return 'w-[44%]';
  } else if (props.contentType === CellModesEnum.GOAL) {
    return 'w-[53%]';
  }

  return '';
});

/** Get classes for main component container */
const getClasses = computed<string>(() => {
  switch (props.contentType) {
    case CellModesEnum.EMPTY:
      return 'bg-gray-light';

    case CellModesEnum.WALL:
      return '!bg-gray-medium';

    case CellModesEnum.PATH:
      return '!bg-orange';

    case CellModesEnum.START:
      return '!bg-lime';

    case CellModesEnum.GOAL:
      return '!bg-red';
  }

  return '';
});

/** Emit row and col value to parent component */
const emitCords = (): void => {
  const cords: TileCords = { row: props.row, col: props.col };
  emit('tileCords', cords);
}
</script>
