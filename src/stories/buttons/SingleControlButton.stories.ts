import type { Meta, StoryObj } from '@storybook/vue3';
import SingleControlButton from '@/components/buttons/SingleControlButton.vue';

const meta: Meta<typeof SingleControlButton> = {
  component: SingleControlButton,
  tags: ['autodocs'],
  parameters: {
    backgrounds: {
      default: 'dark',
    }
  },
};

export default meta;
type Story = StoryObj<typeof SingleControlButton>;

export const Default: Story = {
  render: (args) => ({
    components: { SingleControlButton },
    setup() {
      return { args };
    },
    template: '<SingleControlButton v-bind="args" />',
  }),
  args: {
    iconName: 'fa-play',
    largeIcon: false,
  },
};

export const LargeIcon: Story = {
  render: (args) => ({
    components: { SingleControlButton },
    setup() {
      return { args };
    },
    template: '<SingleControlButton v-bind="args" />',
  }),
  args: {
    iconName: 'fa-play',
    largeIcon: true,
  },
};

export const ActiveIcon: Story = {
  render: (args) => ({
    components: { SingleControlButton },
    setup() {
      return { args };
    },
    template: '<SingleControlButton v-bind="args" />',
  }),
  args: {
    iconName: 'fa-play',
    largeIcon: false,
    isActive: true,
  },
};
