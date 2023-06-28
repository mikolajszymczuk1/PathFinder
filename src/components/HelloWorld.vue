<template>
  <h1 class="text-cyan-500 text-[1.875rem] text-center p-5">
    {{ msg }}
  </h1>
</template>

<script setup lang="ts">
defineProps({
  msg: {
    type: String,
    default: 'Hello World'
  }
});
</script>
