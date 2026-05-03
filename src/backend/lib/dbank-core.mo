import Types "../types/dbank-core";
import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Int "mo:core/Int";

module {
  public type Account = Types.Account;
  public type AccountInfo = Types.AccountInfo;
  public type Transaction = Types.Transaction;
  public type UserId = Types.UserId;

  let SECONDS_PER_YEAR : Float = 31_536_000.0;
  let APY : Float = 0.05;
  let NANOS_PER_SECOND : Float = 1_000_000_000.0;

  /// Retrieve or auto-create an account for the given principal.
  public func getOrCreateAccount(
    accounts : Map.Map<UserId, Account>,
    owner : UserId,
  ) : Account {
    switch (accounts.get(owner)) {
      case (?existing) { existing };
      case null {
        let account : Account = {
          owner;
          var balance = 0.0;
          var totalDeposits = 0.0;
          var totalWithdrawals = 0.0;
          var lastYieldTimestamp = Time.now();
        };
        accounts.add(owner, account);
        account;
      };
    };
  };

  /// Convert internal Account to shared-safe AccountInfo.
  /// earnedYield shows the pending yield not yet applied to balance.
  public func toAccountInfo(account : Account) : AccountInfo {
    let now = Time.now();
    let secondsElapsed = (now - account.lastYieldTimestamp).toFloat() / NANOS_PER_SECOND;
    let pendingYield = if (secondsElapsed > 0.0) {
      account.balance * APY * (secondsElapsed / SECONDS_PER_YEAR);
    } else { 0.0 };
    {
      owner = account.owner;
      balance = account.balance + pendingYield;
      totalDeposits = account.totalDeposits;
      totalWithdrawals = account.totalWithdrawals;
      earnedYield = pendingYield;
    };
  };

  /// Apply 5% annual yield accrual to the account balance.
  public func accrueYield(account : Account) : () {
    let now = Time.now();
    let secondsElapsed = (now - account.lastYieldTimestamp).toFloat() / NANOS_PER_SECOND;
    if (secondsElapsed > 0.0) {
      let yieldAmount = account.balance * APY * (secondsElapsed / SECONDS_PER_YEAR);
      account.balance += yieldAmount;
      account.lastYieldTimestamp := now;
    };
  };

  /// Add a deposit amount to the account and record the transaction.
  public func deposit(
    accounts : Map.Map<UserId, Account>,
    transactions : Map.Map<UserId, List.List<Transaction>>,
    owner : UserId,
    amount : Float,
    nextTxId : Nat,
  ) : (AccountInfo, Nat) {
    let account = getOrCreateAccount(accounts, owner);
    accrueYield(account);
    account.balance += amount;
    account.totalDeposits += amount;

    let tx : Transaction = {
      id = nextTxId;
      txType = #deposit;
      amount;
      balanceAfter = account.balance;
      timestamp = Time.now();
    };
    let userTxList = switch (transactions.get(owner)) {
      case (?list) { list };
      case null {
        let newList = List.empty<Transaction>();
        transactions.add(owner, newList);
        newList;
      };
    };
    userTxList.add(tx);

    (toAccountInfo(account), nextTxId + 1);
  };

  /// Subtract a withdrawal amount from the account and record the transaction.
  /// Returns #err if balance is insufficient.
  public func withdraw(
    accounts : Map.Map<UserId, Account>,
    transactions : Map.Map<UserId, List.List<Transaction>>,
    owner : UserId,
    amount : Float,
    nextTxId : Nat,
  ) : (Types.WithdrawalResult, Nat) {
    let account = getOrCreateAccount(accounts, owner);
    accrueYield(account);

    if (account.balance < amount) {
      return (#err("Insufficient funds"), nextTxId);
    };

    account.balance -= amount;
    account.totalWithdrawals += amount;

    let tx : Transaction = {
      id = nextTxId;
      txType = #withdrawal;
      amount;
      balanceAfter = account.balance;
      timestamp = Time.now();
    };
    let userTxList = switch (transactions.get(owner)) {
      case (?list) { list };
      case null {
        let newList = List.empty<Transaction>();
        transactions.add(owner, newList);
        newList;
      };
    };
    userTxList.add(tx);

    (#ok(toAccountInfo(account)), nextTxId + 1);
  };

  /// Return all transactions for the given user, sorted by timestamp ascending.
  public func getTransactions(
    transactions : Map.Map<UserId, List.List<Transaction>>,
    owner : UserId,
  ) : [Transaction] {
    switch (transactions.get(owner)) {
      case null { [] };
      case (?list) {
        list.toArray().sort(func(a : Transaction, b : Transaction) : Order.Order = Int.compare(a.timestamp, b.timestamp));
      };
    };
  };
};
