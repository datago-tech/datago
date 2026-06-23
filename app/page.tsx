"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const leagues = ["Todos", "Liga MX", "Premier League", "La Liga", "Champions League", "Copa Libertadores", "Mundial"];

const heroSlides = [
  {
    homeTeam: "América", homeColor: "#FFD700", homeColor2: "#FFD700",
    awayTeam: "Chivas", awayColor: "#CC0000", awayColor2: "#fff",
    score: "2 — 1", minute: "67'", league: "Liga MX · J17",
    question: "¿Ganará el América su cuarto partido consecutivo en el Estadio Azteca?",
    homeProb: 71, drawProb: 11, awayProb: 18,
    volume: "$284k", change: "+22% últimas 6h", bigMove: "−9% Chivas · lesión portero",
    tags: [{ label: "Fidalgo", type: "player" }, { label: "Chicharito", type: "player" }, { label: "América", type: "team" }, { label: "Chivas", type: "team" }, { label: "Liga MX", type: "league" }],
    chartData: [58,59,61,60,62,60,63,62,65,66,68,67,71],
    chartAway: [26,25,24,25,23,25,22,23,21,20,19,20,18],
    chartDraw: [16,16,15,15,15,15,15,15,14,14,13,13,11],
  },
  {
    homeTeam: "Real Madrid", homeColor: "#fff", homeColor2: "#D4AF37",
    awayTeam: "Barcelona", awayColor: "#A50044", awayColor2: "#003DA5",
    score: "1 — 1", minute: "82'", league: "La Liga · J30",
    question: "¿Quién ganará el Clásico Español esta temporada?",
    homeProb: 45, drawProb: 22, awayProb: 33,
    volume: "$512k", change: "+41% últimas 6h", bigMove: "+8% Barça · Yamal regresa",
    tags: [{ label: "Mbappé", type: "player" }, { label: "Yamal", type: "player" }, { label: "Real Madrid", type: "team" }, { label: "Barcelona", type: "team" }, { label: "La Liga", type: "league" }],
    chartData: [48,47,46,48,45,46,44,45,45,44,45,45,45],
    chartAway: [28,29,30,28,31,30,32,31,31,32,31,31,33],
    chartDraw: [24,24,24,24,24,24,24,24,24,24,24,24,22],
  },
  {
    homeTeam: "México", homeColor: "#006847", homeColor2: "#CE1126",
    awayTeam: "Argentina", awayColor: "#74ACDF", awayColor2: "#fff",
    score: "vs", minute: "", league: "Mundial 2026 · Grupo C",
    question: "¿Llegará México a cuartos de final del Mundial 2026?",
    homeProb: 29, drawProb: 20, awayProb: 51,
    volume: "$198k", change: "+15% esta semana", bigMove: "+5% México · nuevo técnico",
    tags: [{ label: "Raúl Jiménez", type: "player" }, { label: "México", type: "team" }, { label: "Argentina", type: "team" }, { label: "Mundial 2026", type: "league" }],
    chartData: [22,23,24,23,25,24,26,25,27,26,28,28,29],
    chartAway: [54,53,52,53,51,52,50,51,49,50,48,49,51],
    chartDraw: [24,24,24,24,24,24,24,24,24,24,24,23,20],
  },
];

const insightCards = [
  { league: "Champions League", title: "¿Llegará Mbappé a 10 goles en esta Champions?", prob: 64, color: "#1D9E75", tags: [{ label: "Mbappé", type: "player" }, { label: "Real Madrid", type: "team" }, { label: "Champions", type: "league" }], trend: "+12% volumen 24h" },
  { league: "Copa Libertadores", title: "¿Llegará Flamengo a la final de la Libertadores?", prob: 48, color: "#BA7517", tags: [{ label: "Flamengo", type: "team" }, { label: "Libertadores", type: "league" }], trend: "+8% volumen 24h" },
  { league: "Liga MX", title: "¿Será Funes Mori el goleador de la temporada?", prob: 31, color: "#993C1D", tags: [{ label: "Funes Mori", type: "player" }, { label: "Rayados", type: "team" }, { label: "Liga MX", type: "league" }], trend: "Estable" },
  { league: "Premier League", title: "¿Ganará el City la Premier esta temporada?", prob: 55, color: "#1D9E75", tags: [{ label: "Haaland", type: "player" }, { label: "Man City", type: "team" }, { label: "Premier", type: "league" }], trend: "+5% volumen 24h" },
  { league: "La Liga", title: "¿Ganará el Barça los próximos 3 partidos en casa?", prob: 72, color: "#1D9E75", tags: [{ label: "Yamal", type: "player" }, { label: "Barcelona", type: "team" }, { label: "La Liga", type: "league" }], trend: "+18% volumen 24h" },
  { league: "Mundial 2026", title: "¿Llegará México a cuartos de final del Mundial?", prob: 29, color: "#993C1D", tags: [{ label: "México", type: "team" }, { label: "Mundial 2026", type: "league" }], trend: "Alta atención LATAM" },
];

const news = [
  { text: "Fidalgo confirma que seguirá en América la próxima temporada", time: "Hace 14 min", league: "Liga MX" },
  { text: "Mbappé anota doblete y acerca al Madrid a semis de Champions", time: "Hace 1 h", league: "Champions" },
  { text: "Selección mexicana anuncia lista para amistoso vs Argentina", time: "Hace 2 h", league: "Selección" },
  { text: "Flamengo empata y complica su clasificación en Libertadores", time: "Hace 3 h", league: "Libertadores" },
  { text: "Yamal bate récord como el jugador más joven en anotar en La Liga", time: "Hace 5 h", league: "La Liga" },
];

function Shirt({ color, color2, size = 32 }: { color: string; color2: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40">
      <path d="M9 5 L4 12 L11 14 L11 35 L29 35 L29 14 L36 12 L31 5 L24 8 Q20 10 16 8 Z" fill={color} stroke="#55555566" strokeWidth="1" />
      {color2 !== color && <path d="M20 14 L20 35 L29 35 L29 14 Z" fill={color2} opacity="0.3" />}
    </svg>
  );
}

function MiniChart({ data, away, draw }: { data: number[]; away: number[]; draw: number[] }) {
  const w = 420, h = 120, pad = 20;
  const points = (arr: number[]) => arr.map((v, i) => {
    const x = pad + (i / (arr.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - 0) / 100) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height: h }}>
      {[0, 25, 50, 75, 100].map(v => (
        <line key={v} x1={pad} x2={w - pad} y1={h - pad - (v / 100) * (h - pad * 2)} y2={h - pad - (v / 100) * (h - pad * 2)} stroke="#00000010" strokeWidth="1" />
      ))}
      <polyline points={points(draw)} fill="none" stroke="#B4B2A9" strokeWidth="1.5" strokeDasharray="4 3" />
      <polyline points={points(away)} fill="none" stroke="#CC0000" strokeWidth="2" />
      <polyline points={points(data)} fill="none" stroke="#1D9E75" strokeWidth="2.5" />
      {["72h","48h","24h","Ahora"].map((l, i) => {
        const idx = i === 0 ? 0 : i === 1 ? 4 : i === 2 ? 8 : 12;
        const x = pad + (idx / 12) * (w - pad * 2);
        return <text key={l} x={x} y={h - 2} textAnchor="middle" fontSize="9" fill="#88878080">{l}</text>;
      })}
    </svg>
  );
}

function TagPill({ label, type }: { label: string; type: string }) {
  const styles: Record<string, string> = {
    player: "bg-blue-50 text-blue-800 border-blue-200",
    team: "bg-emerald-50 text-emerald-800 border-emerald-200",
    league: "bg-amber-50 text-amber-800 border-amber-200",
  };
  const href =
    type === "player" ? `/jugador/${label.toLowerCase().replace(/ /g, "-")}` :
    type === "team" ? `/equipo/${label.toLowerCase().replace(/ /g, "-")}` :
    `/liga/${label.toLowerCase().replace(/ /g, "-")}`;
  return (
    <Link href={href} className={`text-xs px-2.5 py-0.5 rounded-full border cursor-pointer hover:opacity-80 ${styles[type]}`}>{label}</Link>
  );
} 

export default function Home() {
  const [activeLeague, setActiveLeague] = useState("Todos");
  const [slideIndex, setSlideIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setSlideIndex(i => (i + 1) % heroSlides.length), 10000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const slide = heroSlides[slideIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-6 flex items-center gap-5 h-13 sticky top-0 z-50">
        <div className="text-lg font-medium text-gray-900 tracking-tight">data<span className="text-emerald-600">go</span></div>
        <div className="flex-1 max-w-md flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 h-9 gap-2">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          <span className="text-sm text-gray-400">Buscar jugador, equipo o liga…</span>
        </div>
        <div className="flex gap-5 ml-auto">
          {["Mercados", "Estadísticas", "Noticias"].map(l => (
            <a key={l} href="#" className="text-sm text-gray-500 hover:text-gray-800">{l}</a>
          ))}
        </div>
      </nav>

      {/* Leagues bar */}
      <div className="bg-white border-b border-gray-100 px-6 flex gap-0 overflow-x-auto">
        {leagues.map(l => (
          <button key={l} onClick={() => setActiveLeague(l)}
            className={`px-4 py-2.5 text-xs whitespace-nowrap border-b-2 transition-colors ${activeLeague === l ? "text-emerald-600 border-emerald-500 font-medium" : "text-gray-500 border-transparent hover:text-gray-800"}`}>
            {l}
          </button>
        ))}
      </div>

      <div className="px-6 py-5 max-w-6xl">
        {/* Hero */}
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Destacado</p>
        <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4 flex">
          {/* Left panel */}
          <div className="w-72 min-w-72 p-5 border-r border-gray-100 flex flex-col">
            <div className="text-xs text-gray-400 mb-3 flex items-center gap-1">
              🏆 {slide.league}
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex flex-col items-center gap-1 flex-1">
                <Shirt color={slide.homeColor} color2={slide.homeColor2} size={36} />
                <span className="text-sm font-medium text-gray-900 text-center">{slide.homeTeam}</span>
                <span className="text-xs text-gray-400">Local</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-medium text-gray-900">{slide.score}</span>
                {slide.minute && (
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-50 rounded-full px-2 py-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />{slide.minute}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-center gap-1 flex-1">
                <Shirt color={slide.awayColor} color2={slide.awayColor2} size={36} />
                <span className="text-sm font-medium text-gray-900 text-center">{slide.awayTeam}</span>
                <span className="text-xs text-gray-400">Visitante</span>
              </div>
            </div>
            {/* Tri-bar */}
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium" style={{ color: "#B8960C" }}>{slide.homeTeam} {slide.homeProb}%</span>
              <span className="text-gray-400">Empate {slide.drawProb}%</span>
              <span className="font-medium text-red-700">{slide.awayTeam} {slide.awayProb}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden flex mb-4">
              <div style={{ width: `${slide.homeProb}%`, background: "#1D9E75" }} />
              <div style={{ width: `${slide.drawProb}%`, background: "#B4B2A9" }} />
              <div style={{ width: `${slide.awayProb}%`, background: "#CC0000" }} />
            </div>
            <div className="grid grid-cols-2 gap-2 mt-auto">
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-xs text-gray-400 mb-1">Volumen</div>
                <div className="text-sm font-medium text-gray-900">{slide.volume}</div>
                <div className="text-xs text-gray-400">{slide.change}</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2.5">
                <div className="text-xs text-gray-400 mb-1">Mayor mov.</div>
                <div className="text-sm font-medium text-red-600">{slide.bigMove}</div>
              </div>
            </div>
          </div>

          {/* Right panel — chart */}
          <div className="flex-1 p-5 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-500">Probabilidad de victoria — últimas 72 horas</span>
              <div className="flex gap-4">
                {[{ label: slide.homeTeam, color: "#1D9E75" }, { label: slide.awayTeam, color: "#CC0000" }, { label: "Empate", color: "#B4B2A9" }].map(l => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className="w-4 h-0.5 rounded" style={{ background: l.color }} />
                    <span className="text-xs text-gray-400">{l.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <MiniChart data={slide.chartData} away={slide.chartAway} draw={slide.chartDraw} />
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-400 self-center">Ver más:</span>
              {slide.tags.map(t => <TagPill key={t.label} {...t} />)}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mb-5">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setSlideIndex(i)}
              className={`rounded-full transition-all ${i === slideIndex ? "w-5 h-1.5 bg-emerald-500" : "w-1.5 h-1.5 bg-gray-200"}`} />
          ))}
        </div>

        {/* Insights + News */}
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Insights por relevancia</p>
            <div className="grid grid-cols-3 gap-3">
              {insightCards.map((card, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:border-gray-200 transition-colors">
                  <div className="text-xs text-gray-400 uppercase tracking-wider mb-1.5">{card.league}</div>
                  <div className="text-sm font-medium text-gray-900 leading-snug mb-2.5">{card.title}</div>
                  <div className="flex items-baseline gap-1.5 mb-2">
                    <span className="text-2xl font-medium" style={{ color: card.color }}>{card.prob}%</span>
                    <span className="text-xs text-gray-400">prob. según mercado</span>
                  </div>
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-2.5">
                    <div className="h-full rounded-full" style={{ width: `${card.prob}%`, background: card.color }} />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {card.tags.map(t => <TagPill key={t.label} {...t} />)}
                  </div>
                  <div className="text-xs text-gray-400 mt-2.5 pt-2.5 border-t border-gray-100">{card.trend}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Noticias en tendencia</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              {news.map((n, i) => (
                <div key={i} className={`flex gap-2.5 py-2.5 ${i < news.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="w-7 h-7 min-w-7 rounded-full bg-gray-100 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9" /></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 leading-relaxed">{n.text}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time} · {n.league}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
