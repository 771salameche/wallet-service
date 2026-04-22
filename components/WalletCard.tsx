"use client";

import { useState } from "react";
import { formatAddress, getExplorerAddressUrl } from "@/lib/polygon";

interface WalletCardProps {
  address: string;
  balance: string;
}

export default function WalletCard({ address, balance }: WalletCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback silencieux si clipboard non disponible
    }
  };

  return (
    <div
      className="rounded-2xl p-6 text-white shadow-lg"
      style={{ background: "linear-gradient(135deg, #2563EB, #1d4ed8)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-blue-200">
          Mon Wallet Polygon Amoy
        </span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold tracking-wide">
          Testnet
        </span>
      </div>

      {/* Adresse */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-mono text-lg font-semibold tracking-wider">
          {formatAddress(address)}
        </span>
        <button
          onClick={handleCopy}
          className="rounded-lg bg-white/20 px-3 py-1 text-xs font-medium transition hover:bg-white/30 active:scale-95"
        >
          {copied ? "Copié ✓" : "Copier"}
        </button>
      </div>

      {/* Solde */}
      <div className="mb-6">
        <p className="text-sm text-blue-200 mb-1">Solde</p>
        <p className="text-4xl font-bold tracking-tight">
          {parseFloat(balance || "0").toFixed(4)}
          <span className="ml-2 text-xl font-medium text-blue-200">POL</span>
        </p>
      </div>

      {/* Explorer link */}
      <a
        href={getExplorerAddressUrl(address)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-blue-200 underline-offset-2 hover:text-white hover:underline transition"
      >
        Voir sur PolygonScan
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
