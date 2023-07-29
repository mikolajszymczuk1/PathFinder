<template>
  <div class="flex">
    <SingleControlButton icon-name="fa-backward-step" />
    <div class=""></div>
    <SingleControlButton icon-name="fa-play" />
    <div class=""></div>
    <SingleControlButton icon-name="fa-forward-step" />
  </div>
</template>

<script setup lang="ts">
import SingleControlButton from '@/components/buttons/SingleControlButton.vue';
</script>
