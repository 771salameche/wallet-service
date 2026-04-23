import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <div className="space-y-2">
        <p className="text-6xl font-bold text-gray-200">404</p>
        <h1 className="text-xl font-semibold text-gray-800">Page introuvable</h1>
        <p className="text-sm text-gray-500">
          Cette page n&apos;existe pas ou a été déplacée.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-xl px-6 py-3 text-sm font-semibold text-white shadow transition hover:opacity-90 active:scale-95"
        style={{ backgroundColor: "#2563EB" }}
      >
        ← Retour à l&apos;accueil
      </Link>
    </main>
  );
}
