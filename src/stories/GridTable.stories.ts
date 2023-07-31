import type { Meta, StoryObj } from '@storybook/vue3';
import GridTable from '@/components/GridTable.vue';
import { usePathEditorStore } from '@/stores/PathEditorStore';

const storyTableData: string[][] = [
  ['E', 'E', 'E', 'E', 'E'],
  ['E', 'W', 'E', 'S', 'E'],
  ['E', 'W', 'E', 'P', 'E'],
  ['E', 'W', 'P', 'P', 'E'],
  ['G', 'P', 'P', 'E', 'E'],
  ['E', 'E', 'E', 'E', 'E'],
];

const meta: Meta<typeof GridTable> = {
  component: GridTable,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GridTable>;

export const Default: Story = {
  render: (args) => ({
    components: { GridTable },
    setup() {
      const store = usePathEditorStore();
      store.tableData = storyTableData;
      return { args };
    },
    template: '<GridTable v-bind="args" />',
  }),
  args: {
    tableData: storyTableData,
  },
};
