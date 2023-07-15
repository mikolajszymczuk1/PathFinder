<template>
  <FontAwesomeIcon
    class=""
    :icon="['fas', getIcon]"
  />
</template>

<script setup lang='ts'>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';



const props = defineProps({
  PenMode: {
    type: String,
    required: true,
    validator(value: string): boolean {
      return [].includes(value);
    }
  }
});

const getIcon = computed<string>(() => {
  let icon = 'arrow-pointer';
  switch (props.PenMode) {
    case 'DrawStart':
      icon = 'location-pin';
      break;
    case 'DrawGoal':
      icon = 'flag-checkered';
      break;
    case 'DrawWall':
      icon = 'square-xmark';
      break;
    case 'EraseCell':
      icon = 'eraser';
      break;
  }
  return icon;
})
</script>
