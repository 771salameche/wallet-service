# Auto Wallet Demo

Démo technique : création automatique d'un wallet Polygon Amoy lors de l'inscription, sans MetaMask, via Web3Auth.

## Ce que la démo démontre

- Wallet Polygon Amoy créé automatiquement à l'inscription (sans MetaMask)
- Connexion Gmail ou email passwordless sans extension browser
- Adresse wallet réelle, copiable, visible sur PolygonScan
- Solde POL en temps réel via ethers.js v6
- Déconnexion propre avec réinitialisation de session

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Web3Auth Modal SDK v9 (Sapphire Devnet)
- Polygon Amoy Testnet (chainId: 0x13882)
- ethers.js v6

---

## Setup

### 1. Cloner et installer

```bash
git clone <repo-url>
cd wallet-demo
npm install
```

### 2. Obtenir un Client ID Web3Auth

1. Aller sur [https://dashboard.web3auth.io](https://dashboard.web3auth.io)
2. Créer un projet (ex : "Auto Wallet Demo")
3. Sélectionner **Sapphire Devnet**
4. Copier le **Client ID**

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env.local
```

Éditer `.env.local` :

```env
NEXT_PUBLIC_WEB3AUTH_CLIENT_ID=<votre-client-id>
NEXT_PUBLIC_POLYGON_AMOY_RPC=https://rpc-amoy.polygon.technology
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
│   ├── page.tsx              # Page Login
│   ├── dashboard/page.tsx    # Dashboard wallet
│   ├── not-found.tsx         # Page 404
│   ├── layout.tsx            # Layout global
│   └── globals.css           # Tailwind + animations
├── components/
│   ├── LoginButton.tsx       # Bouton connexion Web3Auth
│   ├── WalletCard.tsx        # Carte adresse + solde
│   └── TransactionHistory.tsx
├── hooks/
│   └── useWallet.ts          # Logique wallet centralisée
└── lib/
    ├── web3auth.ts           # Instance Web3Auth singleton
    └── polygon.ts            # Config Polygon Amoy + helpers
```

---

## Notes

- Web3Auth Sapphire Devnet est gratuit jusqu'à 1 000 utilisateurs actifs/mois
- Ne jamais committer `.env.local`
- Les clés privées sont gérées entièrement par Web3Auth — elles ne transitent jamais par l'application
