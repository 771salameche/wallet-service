"use client";

import { useState } from "react";
import { formatAddress, getExplorerAddressUrl } from "@/lib/polygon";

interface WalletCardProps {
  address: string;
  balance: string;
  loading?: boolean;
}

export default function WalletCard({ address, balance, loading = false }: WalletCardProps) {
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
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm font-medium text-blue-200">
          Mon Wallet Polygon Amoy
        </span>
        <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold tracking-wide">
          Testnet
        </span>
      </div>

      {/* Adresse + tooltip */}
      <div className="mb-6 flex items-center gap-2">
        <div className="group relative">
          <span className="cursor-help font-mono text-lg font-semibold tracking-wider">
            {formatAddress(address)}
          </span>
          {/* Tooltip adresse complète */}
          <div className="pointer-events-none absolute bottom-full left-0 mb-2 hidden group-hover:block">
            <div className="whitespace-nowrap rounded-lg bg-gray-900/90 px-3 py-1.5 font-mono text-xs text-white shadow-lg">
              {address}
            </div>
            {/* Flèche */}
            <div className="ml-3 h-0 w-0 border-x-4 border-t-4 border-x-transparent border-t-gray-900/90" />
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="rounded-lg bg-white/20 px-3 py-1 text-xs font-medium transition hover:bg-white/30 active:scale-95"
        >
          {copied ? "Copié ✓" : "Copier"}
        </button>
      </div>

      {/* Solde — pulse pendant le chargement */}
      <div className="mb-6">
        <p className="mb-1 text-sm text-blue-200">Solde</p>
        <p className={`text-4xl font-bold tracking-tight transition-opacity ${loading ? "animate-pulse opacity-60" : "opacity-100"}`}>
          {parseFloat(balance || "0").toFixed(4)}
          <span className="ml-2 text-xl font-medium text-blue-200">POL</span>
        </p>
      </div>

      {/* Explorer link */}
      <a
        href={getExplorerAddressUrl(address)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm text-blue-200 underline-offset-2 transition hover:text-white hover:underline"
      >
        Voir sur PolygonScan
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
