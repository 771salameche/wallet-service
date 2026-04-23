import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// ssr:false — ThirdwebProvider utilise des APIs navigateur (localStorage, window)
// et valide clientId à l'initialisation. Aucun code Thirdweb ne tourne côté serveur.
const Providers = dynamic(() => import("@/components/Providers"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-screen items-center justify-center">
      <svg className="h-8 w-8 animate-spin text-blue-600" viewBox="0 0 24 24" fill="none">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
    </div>
  ),
});

export const metadata: Metadata = {
  title: "Auto Wallet Demo",
  description: "Création Automatique de Wallet à l'Inscription – Thirdweb",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={`${inter.className} min-h-screen bg-gray-50`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
