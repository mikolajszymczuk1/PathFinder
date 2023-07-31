import type { Meta, StoryObj } from '@storybook/vue3';
import { getEnumValues } from '@/modules/commonFunctions/enumHelpers';
import CellModesEnum from '@/modules/enums/cellModesEnum';
import GridTile from '@/components/GridTile.vue';

const meta: Meta<typeof GridTile> = {
  component: GridTile,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GridTile>;

export const Default: Story = {
  argTypes: {
    contentType: {
      options: getEnumValues(CellModesEnum),
      control: { type: 'select' },
    }
  },
  render: (args) => ({
    components: { GridTile },
    setup() {
      return { args };
    },
    template: '<GridTile v-bind="args" />',
  }),
  args: {
    contentType: CellModesEnum.EMPTY,
    row: 3,
    col: 4,
  },
};
