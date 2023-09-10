<template>
  <div
    class="flex items-center justify-center gap-[13px] px-[15px] py-[7px] rounded-[10px]
    bg-gray-medium dark:bg-dark-medium md:px-[22px] md:py-[11px] md:gap-[19px]"
  >
    <SingleControlButton
      icon-name="fa-backward-step"
      @clickAction="goToPrevStep()"
      data-test="undo-button"
      v-tippy="{ content: 'Prev Step', theme: 'material', placement: 'bottom', animation: 'shift-away' }"
    />

    <BreakLine />

    <SingleControlButton
      :icon-name="animationStatusIcon"
      @clickAction="playPauseSimulation()"
      data-test="play-pause-button"
      v-tippy="{ content: 'Play / Pause', theme: 'material', placement: 'bottom', animation: 'shift-away' }"
    />

    <BreakLine />

    <SingleControlButton
      icon-name="fa-forward-step"
      @clickAction="goToNextStep()"
      data-test="redo-button"
      v-tippy="{ content: 'Next Step', theme: 'material', placement: 'bottom', animation: 'shift-away' }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAnimationControllerStore } from '@/stores/AnimationControllerStore';

import SingleControlButton from '@/components/buttons/SingleControlButton.vue';
import BreakLine from '@/components/common/BreakLine.vue';
import { useTableHistoryStore } from '@/stores/TableHistoryStore';

const store = useAnimationControllerStore();

/** Return icon based on pasue status in store */
const animationStatusIcon = computed<string>(() => store.isPaused ? 'fa-play' : 'fa-pause');

/** Go to the previous step in simulation */
const goToPrevStep = (): void => { console.log('Prev Step'); };

/** Go to the next step in simulation */
const goToNextStep = (): void => { console.log('Next Step'); };

/** Play or pause simulation */
const playPauseSimulation = async (): Promise<void> => {
  const historyStore = useTableHistoryStore();

  if (store.isAnimFinished) {
    store.animStartHashCode = historyStore.getNextTable(0) as string;
  }

  return await store.playPauseSimulation()};
</script>
