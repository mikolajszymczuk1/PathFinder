<template>
  <button
    class=""
    @click="emitClick()"
  >
    <FontAwesomeIcon class="" :icon="['fas', iconName]" />
  </button>
</template>

<script setup lang="ts">
defineProps({
  iconName: {
    type: String,
    required: true,
  }
});

const emit = defineEmits<{
  /** Emit click action that can be handled */
  (e: 'clickAction'): void
}>();

/** Emit click action that can be handled by parent component */
const emitClick = (): void => {
  emit('clickAction');
}
</script>
