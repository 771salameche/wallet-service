"use client";

import { useState, useEffect, useCallback } from "react";
import { ethers } from "ethers";
import type { IProvider } from "@web3auth/base";
import { web3auth, getUserInfo, type UserInfo } from "@/lib/web3auth";

interface WalletState {
  address: string;
  balance: string;
  loading: boolean;
  isConnected: boolean;
  userInfo: Partial<UserInfo> | null;
}

const INITIAL_STATE: WalletState = {
  address: "",
  balance: "",
  loading: false,
  isConnected: false,
  userInfo: null,
};

async function loadWalletData(
  web3authProvider: IProvider
): Promise<Pick<WalletState, "address" | "balance" | "userInfo">> {
  const ethersProvider = new ethers.BrowserProvider(
    web3authProvider as ethers.Eip1193Provider
  );
  const signer = await ethersProvider.getSigner();
  const address = await signer.getAddress();
  const rawBalance = await ethersProvider.getBalance(address);
  const balance = parseFloat(ethers.formatEther(rawBalance)).toFixed(4);
  const userInfo = await getUserInfo();

  return { address, balance, userInfo };
}

export function useWallet() {
  const [state, setState] = useState<WalletState>(INITIAL_STATE);

  const setLoading = (loading: boolean) =>
    setState((prev) => ({ ...prev, loading }));

  // Initialisation Web3Auth + reprise de session existante
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        await web3auth.initModal();

        if (web3auth.connected && web3auth.provider) {
          const data = await loadWalletData(web3auth.provider);
          setState({
            ...data,
            loading: false,
            isConnected: true,
          });
        } else {
          setLoading(false);
        }
      } catch (err) {
        console.error("[useWallet] init error:", err);
        setLoading(false);
      }
    };

    init();
  }, []);

  const connect = useCallback(async () => {
    try {
      setLoading(true);
      const provider = await web3auth.connect();
      if (!provider) throw new Error("No provider returned by Web3Auth");

      const data = await loadWalletData(provider);
      setState({
        ...data,
        loading: false,
        isConnected: true,
      });
    } catch (err) {
      console.error("[useWallet] connect error:", err);
      setLoading(false);
    }
  }, []);

  const disconnect = useCallback(async () => {
    try {
      setLoading(true);
      await web3auth.logout();
      setState(INITIAL_STATE);
    } catch (err) {
      console.error("[useWallet] disconnect error:", err);
      setLoading(false);
    }
  }, []);

  const refreshBalance = useCallback(async () => {
    if (!web3auth.connected || !web3auth.provider) return;
    try {
      setLoading(true);
      const ethersProvider = new ethers.BrowserProvider(
        web3auth.provider as ethers.Eip1193Provider
      );
      const signer = await ethersProvider.getSigner();
      const address = await signer.getAddress();
      const rawBalance = await ethersProvider.getBalance(address);
      const balance = parseFloat(ethers.formatEther(rawBalance)).toFixed(4);
      setState((prev) => ({ ...prev, balance, loading: false }));
    } catch (err) {
      console.error("[useWallet] refreshBalance error:", err);
      setLoading(false);
    }
  }, []);

  return {
    connect,
    disconnect,
    refreshBalance,
    address: state.address,
    balance: state.balance,
    loading: state.loading,
    isConnected: state.isConnected,
    userInfo: state.userInfo,
  };
}
