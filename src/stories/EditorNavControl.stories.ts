import type { Meta, StoryObj } from '@storybook/vue3';
import EditorNavControl from '@/components/EditorNavControl.vue';

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
      <div style='display: flex'>
        <EditorNavControl />
      </div>
    `,
  }),
};
