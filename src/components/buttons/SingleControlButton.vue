<template>
  <button
    class="flex justify-center items-center group"
    @click="emitClick()"
    data-test="single-control-button"
  >
    <FontAwesomeIcon
      class="text-white group-hover:text-lime dark:group-hover:text-purple md:rounded-[8px]"
      :class="[largeIcon ? 'md:w-auto md:h-[25px]' : 'md:w-[16px] md:h-auto', isActive ? 'text-orange' : 'text-white']"
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
  },

  /** Change icon size and responsive behaviour for it */
  largeIcon: {
    type: Boolean,
    default: false,
  },

  isActive: {
    type: Boolean,
    default: false,
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
