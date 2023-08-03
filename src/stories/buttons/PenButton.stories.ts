import type { Meta, StoryObj } from '@storybook/vue3';
import PenButton from '@/components/buttons/PenButton.vue';
import DrawModesEnum from '@/modules/enums/drawModesEnum';

type Story = StoryObj<typeof PenButton>;

const meta: Meta<typeof PenButton> = {
  component: PenButton,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  }
}

export const Default: Story = {
  argTypes: {
    penIcon: {
      options: [
        DrawModesEnum.SELECT,
        DrawModesEnum.DRAW_START,
        DrawModesEnum.DRAW_GOAL,
        DrawModesEnum.DRAW_WALL,
        DrawModesEnum.ERASE_CELL,
      ],
      control: { type: 'select' },
    }
  },
  render: (args) => ({
    components: { PenButton },
    setup: () => {
      return { args };
    },
    template: '<PenButton v-bind="args"',
  }),
  args: {
    penIcon: DrawModesEnum.SELECT,
  }
}

export default meta;
