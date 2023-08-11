import { defineStore } from 'pinia';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { areStartAndGoalPlaced, getStartAndGoalCords, areTilesCordsEqual } from '@/modules/commonFunctions/searchingHelpers';
import { EDITOR_CONST } from '@/modules/consts/editorConst';
import { delay } from '@/modules/commonFunctions/delayHelpers';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import { bfs, bfsShortnesPath } from '@/modules/pathfindingAlgorithms/bfs';

interface State {
  isPaused: boolean,
  isAnimFinished: boolean,
}

export const useAnimationControllerStore = defineStore('animationController', {
  state: (): State => ({
    isPaused: true,
    isAnimFinished: true,
  }),
  actions: {
    /** Function to create pasue and wait until ```pauseState``` will be again true */
    async pause(): Promise<void> {
      if (this.isPaused) {
        // When is paused, create promise and wait for resolve
        await new Promise((res: CallableFunction) => {
          const interval = setInterval(() => {
            if (!this.isPaused) {
              clearInterval(interval);
              res();
            }
          }, EDITOR_CONST.ANIMATION_CONTROLLER_CONF.INTERVAL_TIME);
        });
      }
    },

    /** Function to run or pause simulation */
    async playPauseSimulation(): Promise<void> {
      const store = usePathEditorStore();
      if (!areStartAndGoalPlaced(store.tableData)) return;
      this.isPaused = !this.isPaused;
      // User can use pause functionality until simulation is not finished
      if (!this.isPaused && this.isAnimFinished) {
        this.isAnimFinished = false;
        await this.doSimulation();
      }
    },

    /** Main animation controller */
    async doSimulation(): Promise<void> {
      const store = usePathEditorStore();
      if (!areStartAndGoalPlaced(store.tableData)) return;

      // ------ Simulate searching process ------
      store.clearTable();
      const { start, goal } = getStartAndGoalCords(store.tableData);
      const discoverdTiles = bfs(store.tableData, start, goal);
      for (const cords of discoverdTiles) {
        await this.pause();
        if (!areTilesCordsEqual(cords, start) && !areTilesCordsEqual(cords, goal)) {
          store.tableData[cords.row][cords.col] = CellModesEnum.DISCOVERED;
          await delay(EDITOR_CONST.ANIMATION_CONTROLLER_CONF.TILE_DISCOVER_DELAY);
        }
      }

      // ------ Simulate finding path process ------
      const shortnesPath = bfsShortnesPath(store.tableData, discoverdTiles, goal);
      for (const pathCords of shortnesPath) {
        await this.pause();
        if (!areTilesCordsEqual(pathCords, start) && !areTilesCordsEqual(pathCords, goal)) {
          store.tableData[pathCords.row][pathCords.col] = CellModesEnum.PATH;
          await delay(EDITOR_CONST.ANIMATION_CONTROLLER_CONF.TILE_DISCOVER_DELAY);
        }
      }

      this.isAnimFinished = true;
    }
  },
});
