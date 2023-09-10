import { expect, it, describe, vi } from 'vitest';
import { mount, type VueWrapper } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import { useAnimationControllerStore } from '@/stores/AnimationControllerStore';
import { usePathEditorStore } from '@/stores/PathEditorStore';
import EditorNavControl from '@/widgets/EditorNavControl.vue';

describe('EditorNavControl', () => {
  let wrapper: VueWrapper;
  const tippy = vi.fn();
  const createComponent = (config = {}) => {
    wrapper = mount(EditorNavControl, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn, stubActions: false, })],
        stubs: ['FontAwesomeIcon'],
        directives: { tippy },
      },
      ...config,
    });
  };

  // const findUndoButton = () => wrapper.find('[data-test="undo-button"]');
  // const findRedoButton = () => wrapper.find('[data-test="redo-button"]');
  const findPlayPauseButton = () => wrapper.find('[data-test="play-pause-button"]');

  it('After click playPause buttons should call plauPauseSimulation store action', async () => {
    createComponent();
    const animationControllerStore = useAnimationControllerStore();
    const pathEditorStore = usePathEditorStore();
    const playPauseButton = findPlayPauseButton();

    pathEditorStore.tableData = [
      ['S', 'E', 'E', 'E'],
      ['E', 'E', 'E', 'E'],
      ['E', 'E', 'E', 'E'],
      ['E', 'G', 'E', 'E'],
    ];

    expect(animationControllerStore.isPaused).toBeTruthy();
    await playPauseButton.trigger('click');
    expect(animationControllerStore.playPauseSimulation).toHaveBeenCalled();
    expect(animationControllerStore.isPaused).toBeFalsy();
  });
});
