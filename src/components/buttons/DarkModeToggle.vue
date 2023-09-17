<template>
  <button
    class="flex items-center justify-start relative w-[30px] h-[16px] px-[1px] border-solid border-[1px] border-gray-medium
      rounded-[25px] dark:border-white lg:w-[46px] lg:h-[24px]"
    @click="switchMode()"
  >
    <div
      class="flex justify-center items-center absolute w-[12px] h-[12px] transition-transform rounded-[50%] bg-gray-medium
        dark:bg-white lg:w-[20px] lg:h-[20px]"
      :class="isActive ? ' translate-x-[14px] lg:translate-x-[22px]' : ''"
    >
      <FontAwesomeIcon class="w-[6px] h-auto text-lime dark:text-purple lg:w-[12px]" :icon="['fas', isActive ? DARK_MODE_ICON : LIGHT_MODE_ICON]" />
    </div>
  </button>
</template>

<script setup lang="ts">
import { ref, type Ref, onMounted } from 'vue';
import { get, set, useStorage } from '@vueuse/core';
import { toast } from '@/modules/toasts/pathFinderToasts';
import ToastTypeEnum from '@/modules/enums/toastTypesEnum';

const LIGHT_MODE_ICON = 'sun';
const DARK_MODE_ICON = 'moon';
const DARK_MODE_CLASS = 'dark';

/** Store dark mode active status in localStorage */
const storage = useStorage('dark-mode', false);

/** Dark mode active status */
const isActive: Ref<boolean> = ref(false);

/** Change mode status */
const switchMode = (): void => {
  set(isActive, !get(isActive));
  set(storage, !get(storage));
  document.documentElement.classList.toggle(DARK_MODE_CLASS);
  toast(ToastTypeEnum.SUCCESS, `Dark mode ${get(isActive) ? 'ON' : 'OFF'} !`);
};

onMounted(() => {
  get(storage)
    ? document.documentElement.classList.add(DARK_MODE_CLASS)
    : document.documentElement.classList.remove(DARK_MODE_CLASS);

  set(isActive, get(storage));
});
</script>
