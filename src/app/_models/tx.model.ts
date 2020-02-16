export interface TxModel {
  symbol: string;
  side: string;
  ordType: string;
  ordStatus: string;
  orderQty: string;
  price: number;
  stopPx: number;
  currency: string;
  transactTime: string;
  cumQty: number;
  avgPx: number;
  text: string;
}
