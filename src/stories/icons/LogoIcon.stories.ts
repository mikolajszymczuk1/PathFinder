import type { Meta, StoryObj } from '@storybook/vue3';
import LogoIcon from '@/components/icons/LogoIcon.vue';

const meta: Meta<typeof LogoIcon> = {
  component: LogoIcon,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LogoIcon>;

export const Default: Story = {
  render: (args) => ({
    components: { LogoIcon },
    setup() {
      return { args };
    },
    template: '<LogoIcon />',
  }),
};
