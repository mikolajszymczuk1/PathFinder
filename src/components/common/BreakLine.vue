<template>
  <div
    class="w-[1px] h-[20px] bg-gray-light/30"
    :class="horizontalOnLargeScreens ? 'md:w-[53px] md:h-[2px]' : 'md:w-[2px] md:h-[28px]'"
  ></div>
</template>

<script setup lang="ts">
defineProps({
  horizontalOnLargeScreens: {
    type: Boolean,
    default: false,
  }
});
</script>
