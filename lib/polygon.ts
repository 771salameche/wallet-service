export function getExplorerAddressUrl(address: string): string {
  return `https://amoy.polygonscan.com/address/${address}`;
}

export function formatAddress(address: string): string {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
