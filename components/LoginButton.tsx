"use client";

interface LoginButtonProps {
  onClick: () => void;
  loading: boolean;
}

export default function LoginButton({ onClick, loading }: LoginButtonProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={onClick}
        disabled={loading}
        className="flex w-full items-center justify-center gap-3 rounded-xl px-6 py-4 text-base font-semibold text-white shadow-md transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
        style={{ backgroundColor: "#2563EB" }}
      >
        {loading ? (
          <>
            <svg
              className="h-5 w-5 animate-spin"
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
            Connexion en cours...
          </>
        ) : (
          <>
            {/* Icône wallet */}
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h14a2 2 0 002-2v-5z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 12a1 1 0 110 2 1 1 0 010-2z"
              />
            </svg>
            Se connecter / Créer un compte
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        Connexion par email ou Google — aucune installation requise
      </p>
    </div>
  );
}
