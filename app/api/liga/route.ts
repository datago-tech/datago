import { NextResponse } from "next/server";

const KEY = process.env.API_FOOTBALL_KEY!;
const BASE = "https://v3.football.api-sports.io";
const LIGA_MX_ID = 262;
const SEASON = 2024;

export async function GET() {
  try {
    const [fixturesRes, standingsRes, topScorersRes, topAssistsRes] = await Promise.all([
      fetch(`${BASE}/fixtures?league=${LIGA_MX_ID}&season=${SEASON}&last=10`, {
        headers: { "x-apisports-key": KEY },
        next: { revalidate: 300 },
      }),
      fetch(`${BASE}/standings?league=${LIGA_MX_ID}&season=${SEASON}`, {
        headers: { "x-apisports-key": KEY },
        next: { revalidate: 3600 },
      }),
      fetch(`${BASE}/players/topscorers?league=${LIGA_MX_ID}&season=${SEASON}`, {
        headers: { "x-apisports-key": KEY },
        next: { revalidate: 3600 },
      }),
      fetch(`${BASE}/players/topassists?league=${LIGA_MX_ID}&season=${SEASON}`, {
        headers: { "x-apisports-key": KEY },
        next: { revalidate: 3600 },
      }),
    ]);

    const [fixtures, standings, topScorers, topAssists] = await Promise.all([
      fixturesRes.json(),
      standingsRes.json(),
      topScorersRes.json(),
      topAssistsRes.json(),
    ]);

    return NextResponse.json({
      fixtures: fixtures.response || [],
      standings: standings.response?.[0]?.league?.standings?.[0] || [],
      topScorers: topScorers.response || [],
      topAssists: topAssists.response || [],
    });
  } catch (e) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}