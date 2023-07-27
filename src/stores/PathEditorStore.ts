import { defineStore } from 'pinia';
import PenDrawModesEnum from '../modules/enums/penDrawModesEnum';

interface State {  // Example state interface for type definitions (change on own)
  activePenMode: PenDrawModesEnum,

}

export const pathEditorStore = defineStore('pathEditorStore', {
  state: (): State => ({
    activePenMode: PenDrawModesEnum.SELECT,
  }),
  getters: {

  },
  actions: {
    updatePen(newMode: PenDrawModesEnum): void {
      this.activePenMode = newMode;
    }
  }
});
