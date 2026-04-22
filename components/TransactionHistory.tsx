"use client";

interface TransactionHistoryProps {
  address: string;
}

export default function TransactionHistory({
  address,
}: TransactionHistoryProps) {
  const today = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const explorerUrl = `https://amoy.polygonscan.com/address/${address}`;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-base font-semibold text-gray-800">
        Historique
      </h2>

      {/* Placeholder transaction */}
      <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Icône */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-4 w-4 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">
              Wallet créé sur Polygon Amoy
            </p>
            <p className="text-xs text-gray-400">{today}</p>
          </div>
        </div>
        <span className="text-sm font-semibold text-gray-500">0.0000 POL</span>
      </div>

      {/* Explorer link */}
      <div className="mt-4 text-center">
        <a
          href={explorerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 underline-offset-2 hover:underline transition"
        >
          Voir toutes les transactions sur PolygonScan →
        </a>
      </div>
    </div>
  );
}
