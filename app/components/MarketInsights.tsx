"use client";
import { useState, useEffect } from "react";

interface Market {
  eventTitle: string;
  question: string;
  marketSlug: string;
  yesPrice: number | null;
  priceChange24h: number | null;
  volume24h: number | null;
}

function formatVol(v: number | null) {
  if (!v) return "$0";
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`;
  return `$${Math.round(v)}`;
}

function shortQuestion(q: string) {
  return q.length > 60 ? q.slice(0, 58) + "…" : q;
}

export default function MarketInsights() {
  const [markets, setMarkets] = useState<Market[]>([]);
  const [loading, setLoading] = useState(true);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    fetch("/api/polymarket")
      .then(r => r.json())
      .then(d => {
        const all: Market[] = (d.markets || []).filter(
          (m: Market) => m.yesPrice !== null && m.priceChange24h !== null
        );
        setMarkets(all);
        setUpdated(new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" }));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const gainers = [...markets]
    .filter(m => (m.priceChange24h || 0) > 0)
    .sort((a, b) => (b.priceChange24h || 0) - (a.priceChange24h || 0))
    .slice(0, 4);

  const losers = [...markets]
    .filter(m => (m.priceChange24h || 0) < 0)
    .sort((a, b) => (a.priceChange24h || 0) - (b.priceChange24h || 0))
    .slice(0, 4);

  const hero = gainers[0];

  if (loading) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-center">
        <div className="text-sm text-gray-400">Cargando señales del mercado…</div>
      </div>
    );
  }

  if (!hero) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl p-6 flex items-center justify-center">
        <div className="text-sm text-gray-400">No hay señales disponibles en este momento.</div>
      </div>
    );
  }

  const heroProb = Math.round((hero.yesPrice || 0) * 100);
  const heroChange = Math.round((hero.priceChange24h || 0) * 100);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
            <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">Señales del mercado</div>
            <div className="text-xs text-gray-400">Polymarket · datos en vivo</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-red-700 bg-red-50 rounded-full px-2 py-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          En vivo
        </span>
      </div>

      {/* Hero insight */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="text-xs font-medium text-emerald-600 uppercase tracking-wider mb-2 flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /></svg>
          Señal más fuerte del día
        </div>
        <div className="text-sm font-medium text-gray-900 leading-snug mb-3">{hero.question}</div>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-medium text-emerald-600">{heroProb}%</span>
          <span className="text-xs text-gray-400">probabilidad · {formatVol(hero.volume24h)} vol. 24h</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
          <div className="h-full bg-emerald-500 rounded-full transition-all duration-1000" style={{ width: `${heroProb}%` }} />
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-400">
          <span className="text-emerald-600 font-medium">+{heroChange}% en 24h</span>
          <span>{hero.eventTitle}</span>
        </div>
      </div>

      {/* Signal grid */}
      <div className="grid grid-cols-2">
        {/* Gainers */}
        <div className="border-r border-gray-100">
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
            <span className="text-xs font-medium text-emerald-600 uppercase tracking-wider">Subiendo</span>
          </div>
          {gainers.slice(1, 4).map((m, i) => {
            const prob = Math.round((m.yesPrice || 0) * 100);
            const chg = Math.round((m.priceChange24h || 0) * 100);
            return (
              <div key={m.marketSlug} className={`px-4 py-3 ${i < 2 ? "border-b border-gray-50" : ""}`}>
                <div className="text-xs font-medium text-gray-900 leading-snug mb-1.5">{shortQuestion(m.question)}</div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${prob}%` }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-emerald-600">{prob}%</span>
                  <span className="text-xs text-gray-400">+{chg}% · {formatVol(m.volume24h)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Losers */}
        <div>
          <div className="px-4 py-2.5 border-b border-gray-100 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
            <span className="text-xs font-medium text-red-600 uppercase tracking-wider">Bajando</span>
          </div>
          {losers.slice(0, 3).map((m, i) => {
            const prob = Math.round((m.yesPrice || 0) * 100);
            const chg = Math.round(Math.abs(m.priceChange24h || 0) * 100);
            return (
              <div key={m.marketSlug} className={`px-4 py-3 ${i < 2 ? "border-b border-gray-50" : ""}`}>
                <div className="text-xs font-medium text-gray-900 leading-snug mb-1.5">{shortQuestion(m.question)}</div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                  <div className="h-full bg-red-300 rounded-full" style={{ width: `${prob}%` }} />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-red-600">{prob}%</span>
                  <span className="text-xs text-gray-400">−{chg}% · {formatVol(m.volume24h)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2.5 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">Actualizado a las {updated}</span>
        <a href="https://polymarket.com" target="_blank" rel="noopener noreferrer" className="text-xs text-emerald-600 flex items-center gap-1 hover:underline">
          Ver en Polymarket
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </a>
      </div>
    </div>
  );
}
