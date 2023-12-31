export type TileCords = {
  row: number,
  col: number,
};

export type ControlButton = {
  icon: string,
  drawTool: string,
  tooltipContent: string,
};

export type PriorityTileCords = {
  tileCords: TileCords,
  priority: number,
};
