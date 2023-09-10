import type { Meta, StoryObj } from '@storybook/vue3';
import DarkModeToggle from '@/components/buttons/DarkModeToggle.vue';

const meta: Meta<typeof DarkModeToggle> = {
  component: DarkModeToggle,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DarkModeToggle>;

export const Default: Story = {
  render: (args) => ({
    components: { DarkModeToggle },
    setup() {
      return { args };
    },
    template: '<DarkModeToggle />',
  }),
};
