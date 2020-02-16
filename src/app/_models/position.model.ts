export interface PositionModel {
  symbol: string;
  currentQty: number;
  homeNotional: number;
  avgEntryPrice: number;
  markPrice: number;
  maintMargin: number;
  liquidationPrice: number;
  leverage: number;
  unrealisedPnl: number;
  unrealisedRoePcnt: number;
  realisedPnl: number;
  execCost: number;
  currentCost: number;
  unrealisedCost: number;
  posMargin: number;
}
