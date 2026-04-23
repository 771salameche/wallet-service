"use client";

import { useState, useEffect, useCallback } from "react";
import {
  useActiveAccount,
  useActiveWallet,
  useActiveWalletConnectionStatus,
  useConnectModal,
  useDisconnect,
  useWalletBalance,
} from "thirdweb/react";
import { inAppWallet } from "thirdweb/wallets";
import { getUserEmail } from "thirdweb/wallets/in-app";
import { getClient, polygonAmoy } from "@/lib/thirdweb";

export interface WalletUserInfo {
  email?: string;
  name?: string;
  profileImage?: string;
}

export function useWallet() {
  const account = useActiveAccount();
  const wallet = useActiveWallet();
  const { disconnect } = useDisconnect();
  const connectionStatus = useActiveWalletConnectionStatus();
  const { connect: openModal, isConnecting } = useConnectModal();
  const [userInfo, setUserInfo] = useState<WalletUserInfo | null>(null);

  const { data: balanceData, isLoading: balanceLoading, refetch } = useWalletBalance({
    client: getClient(),
    chain: polygonAmoy,
    address: account?.address,
  });

  useEffect(() => {
    if (!account) {
      setUserInfo(null);
      return;
    }
    getUserEmail({ client: getClient() })
      .then((email) => setUserInfo({ email: email ?? undefined }))
      .catch(() => setUserInfo({}));
  }, [account]);

  const connect = useCallback(async () => {
    try {
      await openModal({
        client: getClient(),
        chain: polygonAmoy,
        wallets: [
          inAppWallet({
            auth: { options: ["google", "email"] },
          }),
        ],
        title: "Auto Wallet",
      });
    } catch (err) {
      console.error("[useWallet] connect error:", err);
    }
  }, [openModal]);

  const disconnectWallet = useCallback(() => {
    if (wallet) disconnect(wallet);
  }, [wallet, disconnect]);

  const refreshBalance = useCallback(() => {
    refetch();
  }, [refetch]);

  const address = account?.address ?? "";
  const balance = balanceData
    ? parseFloat(balanceData.displayValue).toFixed(4)
    : "";

  // "unknown" : Thirdweb vérifie s'il y a une session enregistrée.
  // On l'expose séparément pour ne PAS l'inclure dans le loading du bouton de
  // connexion — le bouton doit rester cliquable pendant l'initialisation.
  const isInitializing = connectionStatus === "unknown";

  // loading du bouton : uniquement quand l'utilisateur a activement lancé une connexion
  // ou quand on recharge le solde après connexion.
  const loading = isConnecting || (!!account && balanceLoading);

  const isConnected = connectionStatus === "connected";

  return {
    connect,
    disconnect: disconnectWallet,
    refreshBalance,
    address,
    balance,
    loading,
    isInitializing,
    isConnected,
    userInfo,
  };
}
