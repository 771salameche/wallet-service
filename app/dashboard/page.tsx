"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/hooks/useWallet";
import WalletCard from "@/components/WalletCard";
import TransactionHistory from "@/components/TransactionHistory";

export default function DashboardPage() {
  const { address, balance, loading, isConnected, userInfo, disconnect, refreshBalance } =
    useWallet();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected && !loading) router.push("/");
  }, [isConnected, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <svg
          className="h-10 w-10 animate-spin text-blue-600"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      </div>
    );
  }

  if (!isConnected) return null;

  const initials = userInfo?.name
    ? userInfo.name.charAt(0).toUpperCase()
    : userInfo?.email?.charAt(0).toUpperCase() ?? "U";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="mx-auto flex max-w-lg items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white"
              style={{ backgroundColor: "#2563EB" }}
            >
              W
            </span>
            <span className="font-semibold text-gray-900">Auto Wallet</span>
          </div>

          {/* User + déconnexion */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {userInfo?.profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={userInfo.profileImage}
                  alt="avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              ) : (
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
                  {initials}
                </span>
              )}
              {userInfo?.email && (
                <span className="hidden text-sm text-gray-600 sm:block">
                  {userInfo.email}
                </span>
              )}
            </div>
            <button
              onClick={disconnect}
              className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100 active:scale-95"
            >
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <main className="mx-auto max-w-lg space-y-4 px-4 py-6">
        {/* Wallet card */}
        <WalletCard address={address} balance={balance} />

        {/* Actualiser solde */}
        <button
          onClick={refreshBalance}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95 disabled:opacity-50"
        >
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Actualiser le solde
        </button>

        {/* Historique */}
        <TransactionHistory address={address} />

        {/* Footer faucet */}
        <p className="text-center text-xs text-gray-400">
          Besoin de POL de test ?{" "}
          <a
            href="https://faucet.polygon.technology"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline-offset-2 hover:underline"
          >
            Faucet Polygon →
          </a>
        </p>
      </main>
    </div>
  );
}
