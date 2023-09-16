<template>
  <div
    class="flex justify-center items-center w-[40px] h-[40px] rounded-[3px] text-white hover:scale-[0.90]
      hover:bg-gray-highlight dark:hover:bg-white/20"
    :class="`${getClasses} ${getAnimationClasses}`"
    @mousemove.left="emitCordsBrush"
    @click.left="emitCordsPoint"
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
import { getEnumValues } from '@/modules/commonFunctions/enumHelpers';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { useAnimationControllerStore } from '@/stores/AnimationControllerStore';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import { get } from '@vueuse/core';

const pathEditorStore = usePathEditorStore();
const animationControllerStore = useAnimationControllerStore();

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
  (e: 'tileCordsBrush', cords: TileCords): void,
  (e: 'tileCordsPoint', cords: TileCords): void,
}>();

/** Return tile cords object */
const tileCords = computed<TileCords>(() => {
  return { row: props.row, col: props.col };
});

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
      return 'bg-gray-light dark:bg-dark-medium';

    case CellModesEnum.WALL:
      return '!bg-gray-medium dark:!bg-dark-light';

    case CellModesEnum.PATH:
      return '!bg-orange dark:!bg-purple';

    case CellModesEnum.START:
      return '!bg-lime';

    case CellModesEnum.GOAL:
      return '!bg-red';

    case CellModesEnum.DISCOVERED:
      return '!bg-blue dark:!bg-dark-soft';

    default:
      return '';
  }
});

/** Get classes for animation setup */
const getAnimationClasses = computed<string>(() => {
  switch (props.contentType) {
    case CellModesEnum.DISCOVERED:
      return 'transition-all animate-discoverTile';

    case CellModesEnum.PATH:
      return 'transition-all animate-discoverPath';

    default:
      return 'transition-transform';
  }
});

/** Emit row and col value to parent component */
const emitCordsBrush = (): void => {
  if (!pathEditorStore.isTableCleared || !animationControllerStore.isAnimFinished) return;
  emit('tileCordsBrush', get(tileCords));
}

/** Emit row and col value to parent component */
const emitCordsPoint = (): void => {
  emit('tileCordsPoint', get(tileCords));
}
</script>
