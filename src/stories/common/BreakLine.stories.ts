import type { Meta, StoryObj } from '@storybook/vue3';
import BreakLine from '@/components/common/BreakLine.vue';

const meta: Meta<typeof BreakLine> = {
  component: BreakLine,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
};

export default meta;
type Story = StoryObj<typeof BreakLine>;

export const Default: Story = {
  render: (args) => ({
    components: { BreakLine },
    setup() {
      return { args };
    },
    template: '<BreakLine />',
  }),
};
