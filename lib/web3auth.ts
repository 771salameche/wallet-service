import { Web3Auth } from "@web3auth/modal";
import { WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { POLYGON_AMOY_CHAIN_CONFIG } from "./polygon";

export interface UserInfo {
  email: string;
  name: string;
  profileImage: string;
}

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig: POLYGON_AMOY_CHAIN_CONFIG },
});

// Singleton — instancié une seule fois côté client
export const web3auth = new Web3Auth({
  clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID!,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
  uiConfig: {
    appName: "wallet-demo",
    theme: { primary: "#2563EB" },
    loginMethodsOrder: ["google", "email_passwordless"],
  },
});

export async function getUserInfo(): Promise<UserInfo> {
  const info = await web3auth.getUserInfo();
  return {
    email: info.email ?? "",
    name: info.name ?? "",
    profileImage: info.profileImage ?? "",
  };
}
