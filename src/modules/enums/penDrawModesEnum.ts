enum PenDrawModesEnum {
  SELECT = 'select',
  DRAW_START = 'draw_start',
  DRAW_GOAL = 'draw_goal',
  DRAW_WALL = 'draw_wall',
  ERASE_CELL = 'erase_cell',
}

export const deconstructPenDrawModes = () : Array<string> => {
  return Object.values(PenDrawModesEnum) as Array<string>;
}

export default PenDrawModesEnum;
