"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "@/hooks/useWallet";
import LoginButton from "@/components/LoginButton";

export default function LoginPage() {
  const { connect, loading, isConnected } = useWallet();
  const router = useRouter();

  useEffect(() => {
    if (isConnected) router.push("/dashboard");
  }, [isConnected, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm space-y-8">

        {/* Logo + titre */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white text-xl font-bold shadow"
              style={{ backgroundColor: "#2563EB" }}
            >
              W
            </span>
            <h1 className="text-2xl font-bold text-gray-900">Auto Wallet</h1>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Création automatique d&apos;un wallet blockchain lors de
            l&apos;inscription
          </p>
        </div>

        {/* Bouton connexion */}
        <LoginButton onClick={connect} loading={loading} />

        {/* Séparateur */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-gray-50 px-3 text-xs text-gray-400">
              Pourquoi Auto Wallet ?
            </span>
          </div>
        </div>

        {/* 3 features */}
        <div className="grid grid-cols-3 gap-3 text-center">
          <Feature
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a1 1 0 110 2 1 1 0 010-2z" />
              </svg>
            }
            label="Wallet automatique"
          />
          <Feature
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
              </svg>
            }
            label="Réseau Polygon"
          />
          <Feature
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.657-1.343-3-3-3S6 9.343 6 11v4h12v-4c0-1.657-1.343-3-3-3s-3 1.343-3 3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 15v2a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            }
            label="100% sécurisé"
          />
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400">
          Démo technique — Polygon Amoy Testnet
        </p>
      </div>
    </main>
  );
}

function Feature({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 rounded-xl bg-white p-3 shadow-sm border border-gray-100">
      <span className="text-blue-600">{icon}</span>
      <span className="text-xs font-medium text-gray-600 leading-tight">{label}</span>
    </div>
  );
}
