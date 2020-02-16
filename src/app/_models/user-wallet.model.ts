export interface UserWalletModel {
  account: number;
  currency: string;
  prevDeposited: number;
  prevWithdrawn: number;
  prevTransferIn: number;
  prevTransferOut: number;
  prevAmount: number;
  prevTimestamp: string;
  deltaDeposited: number;
  deltaWithdrawn: number;
  deltaTransferIn: number;
  deltaTransferOut: number;
  deltaAmount: number;
  deposited: number;
  withdrawn: number;
  transferIn: number;
  transferOut: number;
  amount: number;
  pendingCredit: number;
  pendingDebit: number;
  confirmedDebit: number;
  timestamp: string;
  addr: string;
  script: string;
  // withdrawalLock: number;
}
