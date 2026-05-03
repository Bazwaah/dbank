import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { AccountInfo, Transaction } from "../types";

export function useAccount() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<AccountInfo>({
    queryKey: ["account"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getAccount();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
    retry: 2,
  });
}

export function useTransactions() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      return actor.getTransactions();
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
    retry: 2,
  });
}

export function useDeposit() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: number) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.deposit(amount);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}

export function useWithdraw() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amount: number) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await actor.withdraw(amount);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account"] });
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
