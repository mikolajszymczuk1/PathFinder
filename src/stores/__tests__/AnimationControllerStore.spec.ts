import { expect, it, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useAnimationControllerStore } from '@/stores/AnimationControllerStore';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import type { TileCords } from '@/types/CommonTypes';
import PathfindingAlgorithmsEnum from '@/modules/enums/pathfindingAlgorithmsEnum';

describe('AnimationControllerStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('getters', () => {
    it('algorithmData should return specific data from pathfinding algorithm based on selectedAlgorithm state', () => {
      const animationControllerStore = useAnimationControllerStore();
      const pathEditorStore = usePathEditorStore();

      pathEditorStore.tableData = [
        ['E', 'S', 'E', 'E'],
        ['E', 'E', 'E', 'E'],
        ['E', 'W', 'W', 'W'],
        ['E', 'E', 'G', 'E'],
      ];

      const testDataA = animationControllerStore.algorithmData;
      pathEditorStore.changeAlgorithm(PathfindingAlgorithmsEnum.DFS);
      const testDataB = animationControllerStore.algorithmData;

      expect(testDataA.discovered).toEqual([
        { row: 0, col: 1 },
        { row: 1, col: 1 },
        { row: 0, col: 0 },
        { row: 0, col: 2 },
        { row: 1, col: 0 },
        { row: 1, col: 2 },
        { row: 0, col: 3 },
        { row: 2, col: 0 },
        { row: 1, col: 3 },
        { row: 3, col: 0 },
        { row: 3, col: 1 },
      ]);

      expect(testDataA.path).toEqual([
        { row: 0, col: 1 },
        { row: 0, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
        { row: 3, col: 0 },
        { row: 3, col: 1 },
      ]);

      expect(testDataB.discovered).toEqual([
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: 1, col: 3 },
        { row: 1, col: 2 },
        { row: 1, col: 1 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
        { row: 3, col: 0 },
        { row: 3, col: 1 },
        { row: 3, col: 2 },
      ]);

      expect(testDataB.path).toEqual([
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 0, col: 3 },
        { row: 1, col: 3 },
        { row: 1, col: 2 },
        { row: 1, col: 1 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
        { row: 3, col: 0 },
        { row: 3, col: 1 },
      ]);
    });
  });

  describe('actions', () => {
    it('pause function should create correct pause event and wait for resume moment', async () => {
      const store = useAnimationControllerStore();
      const pausePromise = store.pause();
      const offPausePromise = new Promise((res: CallableFunction) => {
        setTimeout(() => {
          store.isPaused = false;
          res();
        }, 200);
      });

      expect(store.isPaused).toBeTruthy();

      await Promise.all([pausePromise, offPausePromise]).then(() => {
        expect(store.isPaused).toBeFalsy();
      });
    });

    it('playPauseSimulation should toggle isPaused state correctly', async () => {
      const animationControllerStore = useAnimationControllerStore();
      const pathEditorStore = usePathEditorStore();

      pathEditorStore.tableData = [
        ['S', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E'],
        ['E', 'E', 'E', 'E'],
        ['E', 'G', 'E', 'E'],
      ];

      expect(animationControllerStore.isPaused).toBeTruthy();
      await animationControllerStore.playPauseSimulation();
      expect(animationControllerStore.isPaused).toBeTruthy();
    });

    it('animateFromArray should discover all tiles with cords from array', async () => {
      const animationControllerStore = useAnimationControllerStore();
      const pathEditorStore = usePathEditorStore();
      const testCordsToAnimate: TileCords[] = [
        { row: 3, col: 0 },
        { row: 1, col: 0 },
        { row: 2, col: 0 },
        { row: 1, col: 1 },
        { row: 1, col: 2 },
      ];

      animationControllerStore.isPaused = false;
      pathEditorStore.createTable(4, 4);

      await animationControllerStore.animateFromArray(testCordsToAnimate, CellModesEnum.DISCOVERED);

      expect(pathEditorStore.tableData).toEqual([
        ['E', 'E', 'E', 'E'],
        ['D', 'D', 'D', 'E'],
        ['D', 'E', 'E', 'E'],
        ['D', 'E', 'E', 'E'],
      ]);
    });

    it('doSimulation should correctly show all discovered and path tiles', async () => {
      const animationControllerStore = useAnimationControllerStore();
      const pathEditorStore = usePathEditorStore();
      animationControllerStore.isPaused = false;

      pathEditorStore.tableData = [
        ['E', 'S', 'E', 'E'],
        ['E', 'E', 'E', 'E'],
        ['E', 'W', 'W', 'W'],
        ['E', 'E', 'G', 'E'],
      ];

      await animationControllerStore.doSimulation();
      expect(pathEditorStore.tableData).toEqual([
        ['P', 'S', 'D', 'D'],
        ['P', 'D', 'D', 'D'],
        ['P', 'W', 'W', 'W'],
        ['P', 'P', 'G', 'E'],
      ]);
    });
  });
});
