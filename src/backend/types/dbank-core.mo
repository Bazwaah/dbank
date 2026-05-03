import Time "mo:core/Time";

module {
  public type UserId = Principal;
  public type Timestamp = Time.Time;

  public type TransactionType = {
    #deposit;
    #withdrawal;
  };

  public type Transaction = {
    id : Nat;
    txType : TransactionType;
    amount : Float;
    balanceAfter : Float;
    timestamp : Timestamp;
  };

  public type Account = {
    owner : UserId;
    var balance : Float;
    var totalDeposits : Float;
    var totalWithdrawals : Float;
    var lastYieldTimestamp : Timestamp;
  };

  // Shared-safe versions for API boundary
  public type AccountInfo = {
    owner : UserId;
    balance : Float;
    totalDeposits : Float;
    totalWithdrawals : Float;
    earnedYield : Float;
  };

  public type DepositResult = {
    #ok : AccountInfo;
    #err : Text;
  };

  public type WithdrawalResult = {
    #ok : AccountInfo;
    #err : Text;
  };
};
