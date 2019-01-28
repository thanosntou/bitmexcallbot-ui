export class PositionModel {
  symbol: string;
  currentQty: number;
  avgEntryPrice: number;
  markPrice: number;
  maintMargin: number;
  unrealisedPnl: number;
  unrealisedRoePcnt: number;
  realisedPnl: number;
  execCost: number;
  currentCost: number;
  unrealisedCost: number;
  posMargin: number;


  constructor(symbol: string, currentQty: number, avgEntryPrice: number, markPrice: number, maintMargin: number,
              unrealisedPnl: number, unrealisedRoePcnt: number, realisedPnl: number, execCost: number,
              currentCost: number, unrealisedCost: number, posMargin: number) {
    this.symbol = symbol;
    this.avgEntryPrice = avgEntryPrice;
    this.markPrice = markPrice;
    this.maintMargin = maintMargin;
    this.unrealisedPnl = unrealisedPnl;
    this.unrealisedRoePcnt = unrealisedRoePcnt;
    this.realisedPnl = realisedPnl;
    this.execCost = execCost;
    this.currentCost = currentCost;
    this.unrealisedCost = unrealisedCost;
    this.posMargin = posMargin;
  }
}
