import type { Meta, StoryObj } from '@storybook/vue3';
import EditorNavControl from '@/widgets/EditorNavControl.vue';

const meta: Meta<typeof EditorNavControl> = {
  component: EditorNavControl,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EditorNavControl>;

export const Default: Story = {
  render: (args) => ({
    components: { EditorNavControl },
    setup() {
      return { args };
    },
    template: `
      <div class="flex">
        <EditorNavControl />
      </div>
    `,
  }),
};
