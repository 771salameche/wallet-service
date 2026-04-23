# Auto Wallet Demo

Démo technique : création automatique d'un wallet Polygon Amoy lors de l'inscription, sans MetaMask, via Thirdweb.

## Ce que la démo démontre

- Wallet Polygon Amoy créé automatiquement à l'inscription (sans MetaMask)
- Connexion Gmail ou email passwordless sans extension browser
- Adresse wallet réelle, copiable, visible sur PolygonScan
- Solde POL en temps réel via Thirdweb React hooks
- Déconnexion propre avec réinitialisation de session

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Thirdweb v5 SDK (in-app wallet)
- Polygon Amoy Testnet (chainId: 0x13882)
- ethers.js v6

---

## Setup

### 1. Cloner et installer

```bash
git clone https://github.com/771salameche/wallet-service
cd wallet-demo
npm install
```

### 2. Obtenir un Client ID Thirdweb

1. Aller sur [https://thirdweb.com/dashboard](https://thirdweb.com/dashboard)
2. Créer un projet
3. Copier le **Client ID**

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Éditer `.env.local` :

```env
NEXT_PUBLIC_THIRDWEB_CLIENT_ID=<votre-client-id>
```

### 4. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

---

## Obtenir des POL de test (faucet)

Le réseau Polygon Amoy est un testnet — les tokens n'ont aucune valeur réelle.

Pour obtenir des POL de test :

1. Aller sur [https://faucet.polygon.technology](https://faucet.polygon.technology)
2. Sélectionner **Amoy**
3. Coller votre adresse wallet (visible sur le dashboard)
4. Recevoir des POL de test

---

## Structure du projet

```
wallet-demo/
├── app/
│   ├── page.tsx                  # Page Login
│   ├── dashboard/page.tsx        # Dashboard wallet
│   ├── api/balance/route.ts      # API route — solde wallet (server-side)
│   ├── not-found.tsx             # Page 404 personnalisée
│   ├── layout.tsx                # Layout global
│   └── globals.css               # Tailwind + animations
├── components/
│   ├── Providers.tsx             # ThirdwebProvider wrapper
│   ├── WalletCard.tsx            # Carte adresse + solde
│   └── TransactionHistory.tsx    # Historique (placeholder)
├── hooks/
│   └── useWallet.ts              # Logique wallet centralisée
└── lib/
    └── thirdweb.ts               # Client Thirdweb singleton + config Polygon Amoy
```

---

## Notes

- Ne jamais committer `.env.local`
- Les clés privées sont gérées entièrement par Thirdweb — elles ne transitent jamais par l'application
