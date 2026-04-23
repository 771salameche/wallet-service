import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address");

  if (!address || !ethers.isAddress(address)) {
    return NextResponse.json({ error: "Invalid address" }, { status: 400 });
  }

  try {
    const rpc = new ethers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_POLYGON_AMOY_RPC ||
        "https://rpc-amoy.polygon.technology"
    );
    const raw = await rpc.getBalance(address);
    const balance = parseFloat(ethers.formatEther(raw)).toFixed(4);
    return NextResponse.json({ balance });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch balance" },
      { status: 500 }
    );
  }
}
