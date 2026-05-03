import type { Principal } from "@icp-sdk/core/principal";

export type UserId = Principal;
export type Timestamp = bigint;

export interface AccountInfo {
  earnedYield: number;
  balance: number;
  owner: UserId;
  totalWithdrawals: number;
  totalDeposits: number;
}

export type DepositResult =
  | { __kind__: "ok"; ok: AccountInfo }
  | { __kind__: "err"; err: string };

export type WithdrawalResult =
  | { __kind__: "ok"; ok: AccountInfo }
  | { __kind__: "err"; err: string };

export enum TransactionType {
  deposit = "deposit",
  withdrawal = "withdrawal",
}

export interface Transaction {
  id: bigint;
  timestamp: Timestamp;
  txType: TransactionType;
  balanceAfter: number;
  amount: number;
}
