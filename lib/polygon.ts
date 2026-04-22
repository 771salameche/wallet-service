import { CHAIN_NAMESPACES, type CustomChainConfig } from "@web3auth/base";

export const POLYGON_AMOY_CHAIN_CONFIG: CustomChainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x13882",
  rpcTarget:
    process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC ||
    "https://rpc-amoy.polygon.technology",
  displayName: "Polygon Amoy Testnet",
  blockExplorerUrl: "https://amoy.polygonscan.com",
  ticker: "POL",
  tickerName: "POL",
};

export function getExplorerAddressUrl(address: string): string {
  return `https://amoy.polygonscan.com/address/${address}`;
}

export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
