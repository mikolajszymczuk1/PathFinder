import type { Meta, StoryObj } from '@storybook/vue3';
import EditorHistoryControl from '@/widgets/EditorHistoryControl.vue';

const meta: Meta<typeof EditorHistoryControl> = {
  component: EditorHistoryControl,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EditorHistoryControl>;

export const Default: Story = {
  render: (args) => ({
    components: { EditorHistoryControl },
    setup() {
      return { args };
    },
    template: `
      <div class="flex">
        <EditorHistoryControl />
      </div>
    `,
  }),
};
