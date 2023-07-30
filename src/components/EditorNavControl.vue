<template>
  <div
    class="flex items-center justify-center gap-[13px] px-[15px] py-[7px] rounded-[10px]
    bg-gray-medium md:px-[22px] md:py-[11px] md:gap-[19px]"
  >
    <SingleControlButton icon-name="fa-backward-step" @clickAction="goToPrevStep()" />
    <BreakLine />
    <SingleControlButton icon-name="fa-play" @clickAction="playPauseSimulation()" />
    <BreakLine />
    <SingleControlButton icon-name="fa-forward-step" @clickAction="goToNextStep()" />
  </div>
</template>

<script setup lang="ts">
import SingleControlButton from '@/components/buttons/SingleControlButton.vue';
import BreakLine from '@/components/common/BreakLine.vue';

/** Go to the previous step in simulation */
const goToPrevStep = (): void => { console.log('Prev Step'); };

/** Go to the next step in simulation */
const goToNextStep = (): void => { console.log('Next Step'); };

/** Play or pause simulation */
const playPauseSimulation = (): void => { console.log('Play Pause'); };
</script>
