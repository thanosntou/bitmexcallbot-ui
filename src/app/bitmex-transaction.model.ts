export class BitmexTransactionModel {
  transactID: string;
  account: number;
  currency: string;
  transactType: string;
  amount: number;
  walletBalance: number;
  marginBalance: number;
  symbol: string;
  pendingDebit: number;
  realizedPnl: number;
  unrealizedPnl: number;
  fee: number;
  transactStatus: string;
  address: string;
  tx: string;
  text: string;
  transactTime: string;
  timestamp: string;
}
