<template>
  <button
    class="flex justify-center items-center group"
    @click="emitClick()"
    data-test="single-control-button"
  >
    <FontAwesomeIcon
      class="text-white group-hover:text-lime md:w-[16px] md:h-auto md:rounded-[8px]"
      :icon="['fas', iconName]"
      data-test="single-control-icon"
    />
  </button>
</template>

<script setup lang="ts">
defineProps({
  /** Special name of fontawesome icon */
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
