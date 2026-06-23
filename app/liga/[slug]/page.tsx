"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

interface Standing {
  rank: number;
  team: { id: number; name: string; logo: string };
  points: number;
  all: { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } };
  goalsDiff: number;
  form: string;
}

interface Player {
  player: { id: number; firstname: string; lastname: string; photo: string };
  statistics: { team: { name: string }; goals: { total: number }; assists: number }[];
}

interface Fixture {
  fixture: { id: number; date: string; status: { short: string; elapsed: number | null } };
  teams: { home: { id: number; name: string; logo: string; winner: boolean | null }; away: { id: number; name: string; logo: string; winner: boolean | null } };
  goals: { home: number | null; away: number | null };
  league: { round: string };
}

function FormDot({ result }: { result: string }) {
  const style =
    result === "W" ? "bg-emerald-50 text-emerald-700" :
    result === "L" ? "bg-red-50 text-red-700" :
    "bg-amber-50 text-amber-700";
  const label = result === "W" ? "G" : result === "L" ? "P" : "E";
  return <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${style}`}>{label}</div>;
}

export default function LeaguePage() {
  const [data, setData] = useState<{ fixtures: Fixture[]; standings: Standing[]; topScorers: Player[]; topAssists: Player[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/liga")
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const standings = data?.standings || [];
  const topScorers = data?.topScorers?.slice(0, 5) || [];
  const topAssists = data?.topAssists?.slice(0, 5) || [];
  const recentFixtures = data?.fixtures?.slice(0, 6) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-100 px-6 flex items-center gap-5 h-13 sticky top-0 z-50">
        <Link href="/" className="text-lg font-medium text-gray-900 tracking-tight">data<span className="text-emerald-600">go</span></Link>
        <div className="flex-1 max-w-md flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 h-9 gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <span className="text-sm text-gray-400">Buscar jugador, equipo o liga…</span>
        </div>
        <div className="flex gap-5 ml-auto">
          {["Mercados","Estadísticas","Noticias"].map(l => <a key={l} href="#" className="text-sm text-gray-500 hover:text-gray-800">{l}</a>)}
        </div>
      </nav>

      <div className="px-6 py-2 text-xs text-gray-400 flex items-center gap-1">
        <Link href="/" className="hover:text-gray-600">Inicio</Link>
        <span>›</span><span>Liga MX</span>
      </div>

      <div className="px-6 pb-6 max-w-6xl">
        {/* Header */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex gap-5 items-center">
          <div className="w-16 h-16 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-3xl">🏆</div>
          <div className="flex-1">
            <h1 className="text-xl font-medium text-gray-900 mb-1">Liga MX</h1>
            <div className="flex gap-2 flex-wrap mb-2">
              {["Clausura 2024","México","18 equipos"].map(b => (
                <span key={b} className="text-xs px-2.5 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600">{b}</span>
              ))}
            </div>
            <div className="flex gap-5 text-xs text-gray-500">
              <span>📅 Temporada 2024</span>
              <span>👥 Datos en tiempo real via API-Football</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-sm text-gray-400">Cargando datos reales de Liga MX…</div>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {/* Left — standings */}
            <div className="col-span-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Tabla de posiciones</p>
              <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4">
                <div className="grid grid-cols-9 px-4 py-2 bg-gray-50 text-xs text-gray-400 border-b border-gray-100">
                  <div>#</div>
                  <div className="col-span-3">Equipo</div>
                  <div className="text-center">PJ</div>
                  <div className="text-center">G</div>
                  <div className="text-center">E</div>
                  <div className="text-center">P</div>
                  <div className="text-center font-medium">Pts</div>
                </div>
                {standings.slice(0, 12).map((s, i) => (
                  <div key={s.team.id} className={`grid grid-cols-9 px-4 py-2.5 text-sm border-b border-gray-50 items-center ${i < 8 ? "text-emerald-600" : "text-gray-700"}`}>
                    <div className="font-medium text-xs">{s.rank}</div>
                    <div className="col-span-3 flex items-center gap-2">
                      <img src={s.team.logo} alt={s.team.name} className="w-5 h-5 object-contain" />
                      <Link href={`/equipo/${s.team.name.toLowerCase().replace(/ /g, "-")}`} className="hover:underline text-xs truncate">{s.team.name}</Link>
                    </div>
                    <div className="text-center text-xs text-gray-500">{s.all.played}</div>
                    <div className="text-center text-xs text-gray-500">{s.all.win}</div>
                    <div className="text-center text-xs text-gray-500">{s.all.draw}</div>
                    <div className="text-center text-xs text-gray-500">{s.all.lose}</div>
                    <div className="text-center text-xs font-medium">{s.points}</div>
                  </div>
                ))}
              </div>

              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Goleadores</p>
              <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4">
                {topScorers.map((p, i) => {
                  const goals = p.statistics[0]?.goals?.total || 0;
                  const max = topScorers[0]?.statistics[0]?.goals?.total || 1;
                  return (
                    <div key={p.player.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${i === 0 ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-500"}`}>{i + 1}</div>
                      <img src={p.player.photo} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{p.player.firstname} {p.player.lastname}</div>
                        <div className="text-xs text-gray-400">{p.statistics[0]?.team?.name}</div>
                        <div className="h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${(goals / max) * 100}%` }} />
                        </div>
                      </div>
                      <div className="text-sm font-medium text-emerald-600">{goals}</div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Partidos recientes</p>
              <div className="grid grid-cols-2 gap-3">
                {recentFixtures.map(f => {
                  const isLive = ["1H","2H","HT","ET","BT","P","SUSP","INT"].includes(f.fixture.status.short);
                  const isDone = f.fixture.status.short === "FT";
                  const homeWin = f.teams.home.winner;
                  return (
                    <div key={f.fixture.id} className="bg-white border border-gray-100 rounded-2xl p-4">
                      <div className="flex justify-between text-xs text-gray-400 mb-3">
                        <span>{f.league.round}</span>
                        {isLive && <span className="inline-flex items-center gap-1 text-red-700 bg-red-50 rounded-full px-2 py-0.5 font-medium"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>{f.fixture.status.elapsed}'</span>}
                        {isDone && <span className="text-gray-400">Final</span>}
                        {!isLive && !isDone && <span className="text-gray-400">{new Date(f.fixture.date).toLocaleDateString("es-MX", { month: "short", day: "numeric" })}</span>}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <img src={f.teams.home.logo} alt={f.teams.home.name} className="w-8 h-8 object-contain" />
                          <span className={`text-xs font-medium text-center ${homeWin === true ? "text-emerald-600" : homeWin === false ? "text-gray-400" : "text-gray-700"}`}>{f.teams.home.name}</span>
                        </div>
                        <div className="text-xl font-medium text-gray-900 min-w-16 text-center">
                          {f.goals.home !== null ? `${f.goals.home} — ${f.goals.away}` : "vs"}
                        </div>
                        <div className="flex flex-col items-center gap-1 flex-1">
                          <img src={f.teams.away.logo} alt={f.teams.away.name} className="w-8 h-8 object-contain" />
                          <span className={`text-xs font-medium text-center ${homeWin === false ? "text-emerald-600" : homeWin === true ? "text-gray-400" : "text-gray-700"}`}>{f.teams.away.name}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right */}
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Máximos asistidores</p>
              <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4">
                {topAssists.map((p, i) => {
                  const assists = p.statistics[0]?.assists || 0;
                  const max = topAssists[0]?.statistics[0]?.assists || 1;
                  return (
                    <div key={p.player.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${i === 0 ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-500"}`}>{i + 1}</div>
                      <img src={p.player.photo} alt="" className="w-7 h-7 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{p.player.firstname} {p.player.lastname}</div>
                        <div className="text-xs text-gray-400">{p.statistics[0]?.team?.name}</div>
                        <div className="h-1 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div className="h-full bg-blue-300 rounded-full" style={{ width: `${(assists / max) * 100}%` }} />
                        </div>
                      </div>
                      <div className="text-sm font-medium text-blue-600">{assists}</div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Insights del mercado</p>
              <PolymarketInsights />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PolymarketInsights() {
  const [markets, setMarkets] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/polymarket")
      .then(r => r.json())
      .then(d => {
        const football = (d.markets || [])
          .filter((m: any) => m.yesPrice !== null)
          .slice(0, 4);
        setMarkets(football);
      });
  }, []);

  if (!markets.length) return <div className="text-xs text-gray-400 py-4 text-center">Cargando mercados…</div>;

  return (
    <div className="flex flex-col gap-3">
      {markets.map((m: any) => (
        <div key={m.marketSlug} className="bg-white border border-gray-100 rounded-2xl p-4">
          <div className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-1">Predicción activa</div>
          <div className="text-sm font-medium text-gray-900 leading-snug mb-2">{m.question}</div>
          <div className="text-xl font-medium text-emerald-600 mb-1">{Math.round((m.yesPrice || 0) * 100)}%</div>
          <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-1.5">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(m.yesPrice || 0) * 100}%` }} />
          </div>
          <div className="text-xs text-gray-400">Vol: ${Math.round(m.volume24h || 0).toLocaleString()} · 24h</div>
        </div>
      ))}
    </div>
  );
}
