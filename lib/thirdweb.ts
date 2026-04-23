import { createThirdwebClient, type ThirdwebClient } from "thirdweb";
import { defineChain } from "thirdweb/chains";

// Polygon Amoy Testnet — chainId 80002 (0x13882)
export const polygonAmoy = defineChain(80002);

// Singleton lazy : createThirdwebClient valide clientId à l'instanciation
// et throw si vide — on évite l'évaluation au niveau module (crash SSR/build).
let _client: ThirdwebClient | null = null;

export function getClient(): ThirdwebClient {
  if (!_client) {
    _client = createThirdwebClient({
      clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
    });
  }
  return _client;
}
