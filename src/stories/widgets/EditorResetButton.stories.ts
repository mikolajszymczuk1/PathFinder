import type { Meta, StoryObj } from '@storybook/vue3';
import EditorResetButton from '@/widgets/EditorResetButton.vue';

const meta: Meta<typeof EditorResetButton> = {
  component: EditorResetButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EditorResetButton>;

export const Default: Story = {
  render: (args) => ({
    components: { EditorResetButton },
    setup() {
      return { args };
    },
    template: '<EditorResetButton class="h-[50px]" />',
  }),
};
