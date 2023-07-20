import { defineStore } from 'pinia';

interface State {  // Example state interface for type definitions (change on own)
  exampleState: string,
}

export const pathEditorStore = defineStore('pathEditorStore', {
  state: (): State => ({
    exampleState: 'Hello Pinia',  // Example state (change on own)
  }),
});
