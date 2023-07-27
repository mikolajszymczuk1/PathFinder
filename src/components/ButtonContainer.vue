<template>
  <div
    class="flex w-fit p-[1rem] rounded-[0.5rem] bg-gray-500"
    :class="flexDirection">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">

const props = defineProps({
  flexDirection: {
    type: String,
    default: "flex-col",
    required: false,
    validator(value: string): boolean {
      return ['flex-col', 'flex-row'].includes(value);
    }
  }
});

</script>
