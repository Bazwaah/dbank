import { useInternetIdentity } from "@caffeineai/core-infrastructure";

export function useAuth() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();

  const isAuthenticated = loginStatus === "success" && identity !== null;
  const isLoading = loginStatus === "logging-in";
  const principalText = identity?.getPrincipal().toText() ?? null;

  const shortPrincipal = principalText
    ? `${principalText.slice(0, 6)}...${principalText.slice(-4)}`
    : null;

  return {
    login,
    logout: clear,
    isAuthenticated,
    isLoading,
    identity,
    principalText,
    shortPrincipal,
    loginStatus,
  };
}
