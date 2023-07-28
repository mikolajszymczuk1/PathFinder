<template>
  <div
    class="flex justify-center items-center w-[40px] h-[40px] rounded-[3px] text-white"
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

const props = defineProps({
  contentType: {
    type: String,
    default: 'E', // As empty
    validator(value: string): boolean {
      return ['E', 'W', 'P', 'S', 'F'].includes(value);
    }
  },
  row: {
    type: Number,
    required: true,
  },
  col: {
    type: Number,
    required: true,
  }
});

const emit = defineEmits<{
  (e: 'tileCords', cords: TileCords): void
}>();

/** Return specific icon based on 'contentType' */
const getIcon = computed<string>(() => {
  if (props.contentType === 'S') {
    return 'location-pin';
  } else if (props.contentType === 'F') {
    return 'flag-checkered';
  }

  return '';
});

/** Return classes for font awesome icon */
const getIconClasses = computed<string>(() => {
  if (props.contentType === 'S') {
    return 'w-[44%]';
  } else if (props.contentType === 'F') {
    return 'w-[53%]';
  }

  return '';
});

/** Get classes for main component container */
const getClasses = computed<string>(() => {
  switch (props.contentType) {
    case 'E':
      return 'bg-gray-light';

    case 'W':
      return 'bg-gray-medium';

    case 'P':
      return 'bg-orange';

    case 'S':
      return 'bg-lime';

    case 'F':
      return 'bg-red';
  }

  return '';
});

/** Emit row and col value to parent component */
const emitCords = (): void => {
  const cords: TileCords = { row: props.row, col: props.col };
  emit('tileCords', cords);
}
</script>
