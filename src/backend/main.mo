import Types "types/dbank-core";
import DbankCoreMixin "mixins/dbank-core-api";
import Map "mo:core/Map";
import List "mo:core/List";

actor {
  let accounts = Map.empty<Types.UserId, Types.Account>();
  let transactions = Map.empty<Types.UserId, List.List<Types.Transaction>>();

  include DbankCoreMixin(accounts, transactions);
};
