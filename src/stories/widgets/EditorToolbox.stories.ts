import type { Meta, StoryObj } from '@storybook/vue3';
import EditorToolbox from '@/widgets/EditorToolbox.vue';

const meta: Meta<typeof EditorToolbox> = {
  component: EditorToolbox,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EditorToolbox>;

export const Default: Story = {
  render: (args) => ({
    components: { EditorToolbox },
    setup() {
      return { args };
    },
    template: '<EditorToolbox />',
  }),
};
