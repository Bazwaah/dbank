import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type UserId = Principal;
export type Timestamp = bigint;
export interface AccountInfo {
    earnedYield: number;
    balance: number;
    owner: UserId;
    totalWithdrawals: number;
    totalDeposits: number;
}
export type WithdrawalResult = {
    __kind__: "ok";
    ok: AccountInfo;
} | {
    __kind__: "err";
    err: string;
};
export type DepositResult = {
    __kind__: "ok";
    ok: AccountInfo;
} | {
    __kind__: "err";
    err: string;
};
export interface Transaction {
    id: bigint;
    timestamp: Timestamp;
    txType: TransactionType;
    balanceAfter: number;
    amount: number;
}
export enum TransactionType {
    deposit = "deposit",
    withdrawal = "withdrawal"
}
export interface backendInterface {
    deposit(amount: number): Promise<DepositResult>;
    getAccount(): Promise<AccountInfo>;
    getTransactions(): Promise<Array<Transaction>>;
    withdraw(amount: number): Promise<WithdrawalResult>;
}
