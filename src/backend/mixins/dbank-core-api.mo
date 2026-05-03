import Types "../types/dbank-core";
import DBank "../lib/dbank-core";
import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";

mixin (
  accounts : Map.Map<Types.UserId, Types.Account>,
  transactions : Map.Map<Types.UserId, List.List<Types.Transaction>>,
) {
  var nextTxId : Nat = 0;
  /// Returns the account info for the calling principal.
  /// Auto-creates the account on first call.
  public shared ({ caller }) func getAccount() : async Types.AccountInfo {
    if (caller.isAnonymous()) Runtime.trap("Anonymous caller not allowed");
    let account = DBank.getOrCreateAccount(accounts, caller);
    DBank.toAccountInfo(account);
  };

  /// Deposit the given amount into the caller's account.
  public shared ({ caller }) func deposit(amount : Float) : async Types.DepositResult {
    if (caller.isAnonymous()) Runtime.trap("Anonymous caller not allowed");
    if (amount <= 0.0) return #err("Deposit amount must be greater than zero");
    let (info, newId) = DBank.deposit(accounts, transactions, caller, amount, nextTxId);
    nextTxId := newId;
    #ok(info);
  };

  /// Withdraw the given amount from the caller's account.
  /// Returns #err if funds are insufficient.
  public shared ({ caller }) func withdraw(amount : Float) : async Types.WithdrawalResult {
    if (caller.isAnonymous()) Runtime.trap("Anonymous caller not allowed");
    if (amount <= 0.0) return #err("Withdrawal amount must be greater than zero");
    let (result, newId) = DBank.withdraw(accounts, transactions, caller, amount, nextTxId);
    switch (result) {
      case (#ok(_)) { nextTxId := newId };
      case (#err(_)) {};
    };
    result;
  };

  /// Return the full transaction history for the calling principal.
  public shared query ({ caller }) func getTransactions() : async [Types.Transaction] {
    if (caller.isAnonymous()) Runtime.trap("Anonymous caller not allowed");
    DBank.getTransactions(transactions, caller);
  };
};
