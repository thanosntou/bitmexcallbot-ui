export class PositionModel {
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


  constructor(symbol: string, currentQty: number, homeNotional: number, avgEntryPrice: number, markPrice: number, maintMargin: number, liquidationPrice: number,
              leverage: number, unrealisedPnl: number, unrealisedRoePcnt: number, realisedPnl: number, execCost: number,
              currentCost: number, unrealisedCost: number, posMargin: number) {
    this.symbol = symbol;
    this.avgEntryPrice = avgEntryPrice;
    this.homeNotional = homeNotional;
    this.markPrice = markPrice;
    this.maintMargin = maintMargin;
    this.liquidationPrice = liquidationPrice;
    this.leverage = leverage;
    this.unrealisedPnl = unrealisedPnl;
    this.unrealisedRoePcnt = unrealisedRoePcnt;
    this.realisedPnl = realisedPnl;
    this.execCost = execCost;
    this.currentCost = currentCost;
    this.unrealisedCost = unrealisedCost;
    this.posMargin = posMargin;
  }
}
