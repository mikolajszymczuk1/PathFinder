import type { Meta, StoryObj } from '@storybook/vue3';
import GridTile from '@/components/GridTile.vue';

const meta: Meta<typeof GridTile> = {
  component: GridTile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GridTile>;

export const Default: Story = {
  argTypes: {
    contentType: {
      options: ['E', 'W', 'P', 'S', 'G'],
      control: { type: 'select' },
    }
  },
  render: (args) => ({
    components: { GridTile },
    setup() {
      return { args };
    },
    template: '<GridTile v-bind="args" />',
  }),
  args: {
    contentType: 'E',
    row: 3,
    col: 4,
  },
};
