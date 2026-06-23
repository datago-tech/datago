import { NextResponse } from "next/server";

const GAMMA_BASE = "https://gamma-api.polymarket.com";

export async function GET() {
  try {
    const res = await fetch(
      `${GAMMA_BASE}/events?tag_slug=sports&active=true&closed=false&order=volume24hr&ascending=false&limit=50`,
      { next: { revalidate: 300 } }
    );
    const events = await res.json();

    const markets = events.flatMap((event: any) =>
      (event.markets || []).map((m: any) => {
        let yesPrice = null;
        try {
          const prices = JSON.parse(m.outcomePrices || "[]");
          yesPrice = prices[0] ? parseFloat(prices[0]) : null;
        } catch {}
        return {
          eventId: event.id,
          eventTitle: event.title,
          eventSlug: event.slug,
          question: m.question,
          marketSlug: m.slug,
          yesPrice,
          priceChange24h: m.oneDayPriceChange,
          volume24h: m.volume24hr,
          liquidity: m.liquidityNum,
        };
      })
    );

    return NextResponse.json({ markets });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch Polymarket data" }, { status: 500 });
  }
}