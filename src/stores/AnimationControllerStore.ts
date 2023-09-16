import { defineStore } from 'pinia';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import { areStartAndGoalPlaced, areTilesCordsEqual } from '@/modules/commonFunctions/searchingHelpers';
import { EDITOR_CONST } from '@/modules/consts/editorConst';
import { delay } from '@/modules/commonFunctions/delayHelpers';
import { bfs } from '@/modules/pathfindingAlgorithms/bfs';
import { dfs } from '@/modules/pathfindingAlgorithms/dfs';
import { gbfs } from '@/modules/pathfindingAlgorithms/gbfs';
import { recontructShortestPath } from '@/modules/commonFunctions/pathfindingHelpers';
import type { TileCords } from '@/types/CommonTypes';
import { toast } from '@/modules/toasts/pathFinderToasts';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import PathfindingAlgorithmsEnum from '@/modules/enums/pathfindingAlgorithmsEnum';
import ToastTypeEnum from '@/modules/enums/toastTypesEnum';

interface State {
  isPaused: boolean,
  isAnimFinished: boolean,
}

export const useAnimationControllerStore = defineStore('animationController', {
  state: (): State => ({
    isPaused: true,
    isAnimFinished: true,
  }),
  getters: {
    /** Returns data for each type of algorithm */
    algorithmData(): { discovered: TileCords[], path: TileCords[] } {
      const store = usePathEditorStore();
      const { start, goal } = store.startAndGoalCords;
      let discovered: TileCords[];
      let path: TileCords[];

      switch (store.selectedAlgorithm) {
        case PathfindingAlgorithmsEnum.BFS:
          discovered = bfs(store.tableData, start, goal);
          path = recontructShortestPath(store.tableData, discovered, goal);
          break;

        case PathfindingAlgorithmsEnum.DFS:
          discovered = dfs(store.tableData, start, goal);
          path = recontructShortestPath(store.tableData, discovered, goal);
          break;

        case PathfindingAlgorithmsEnum.GBFS:
          discovered = gbfs(store.tableData, start, goal);
          path = recontructShortestPath(store.tableData, discovered, goal);
          break;

        default:
          discovered = bfs(store.tableData, start, goal);
          path = recontructShortestPath(store.tableData, discovered, goal);
          break;
      }

      return { discovered, path };
    },
  },
  actions: {
    /** Function to create pasue and wait until ```isPaused``` will be again true */
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
      if (!areStartAndGoalPlaced(store.tableData)) {
        toast(ToastTypeEnum.WARNING, 'Put start and goal tiles to run simulation !');
        return;
      }

      this.isPaused = !this.isPaused;
      // User can use pause functionality until simulation is not finished
      if (!this.isPaused && this.isAnimFinished) {
        this.isAnimFinished = false;
        await this.doSimulation();
      }
    },

    /**
     * Animate tiles based on ```tilesArr``` array
     * @param {TileCords[]} tilesArr Array of tiles to animate
     * @param {string} tileToShow The type of tile that should be placed instead of empty tiles
    */
    async animateFromArray(tilesArr: TileCords[], tileToShow: string): Promise<void> {
      const store = usePathEditorStore();
      const { start, goal } = store.startAndGoalCords;

      for (const cords of tilesArr) {
        await this.pause();
        if (!areTilesCordsEqual(cords, start) && !areTilesCordsEqual(cords, goal)) {
          store.tableData[cords.row][cords.col] = tileToShow;
          await delay(EDITOR_CONST.ANIMATION_CONTROLLER_CONF.TILE_DISCOVER_DELAY);
        }
      }
    },

    /** Main animation controller */
    async doSimulation(): Promise<void> {
      const store = usePathEditorStore();
      if (!areStartAndGoalPlaced(store.tableData)) return;

      // Prepare data for simulation
      const { discovered, path } = this.algorithmData;
      store.clearTable();

      // ------ Simulate searching process ------
      await this.animateFromArray(discovered, CellModesEnum.DISCOVERED);

      // ------ Simulate finding path process ------
      await this.animateFromArray(path, CellModesEnum.PATH);

      this.isAnimFinished = true;
      this.isPaused = true;
      toast(ToastTypeEnum.SUCCESS, 'Simulation finished :)');
    }
  },
});
