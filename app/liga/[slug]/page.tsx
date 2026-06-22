"use client";
import Link from "next/link";

export default function LeaguePage() {
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
              {["Apertura 2025","Jornada 17 de 17","México","18 equipos"].map(b => (
                <span key={b} className="text-xs px-2.5 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600">{b}</span>
              ))}
            </div>
            <div className="flex gap-5 text-xs text-gray-500">
              <span>📅 Jul 2025 — Dic 2025</span>
              <span>👥 288 partidos en total</span>
              <span>🏅 Campeón defensor: América</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 min-w-48">
            <div className="text-xs text-gray-400 mb-1">Favorito al campeonato</div>
            <div className="text-xl font-medium text-emerald-600">América · 38%</div>
            <div className="text-xs text-gray-400 mt-1">$142k de volumen · +5% esta semana</div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[["Partidos jugados","153","de 288 en total"],["Goles totales","412","2.69 por partido"],["Máximo goleador","Funes Mori","11 goles · América"],["Más asistencias","Fidalgo","7 asistencias · América"]].map(([label,val,sub]) => (
            <div key={label} className="bg-gray-100 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">{label}</div>
              <div className="text-lg font-medium text-gray-900">{val}</div>
              <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Table */}
          <div className="col-span-2">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Tabla de posiciones</p>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-8 px-4 py-2 bg-gray-50 text-xs text-gray-400 border-b border-gray-100">
                <div>#</div><div className="col-span-2">Equipo</div><div className="text-center">PJ</div><div className="text-center">G</div><div className="text-center">E</div><div className="text-center">P</div><div className="text-center">Pts</div>
              </div>
              {[
                [1,"América","#FFD700",17,11,3,3,36,true],
                [2,"Tigres","#FF6600",17,10,3,4,33,false],
                [3,"Rayados","#004A97",17,9,4,4,31,false],
                [4,"Chivas","#CC0000",17,8,4,5,28,false],
                [5,"Cruz Azul","#003087",17,7,5,5,26,false],
                [6,"Pumas","#0033A0",17,7,4,6,25,false],
                [7,"Toluca","#D01212",17,6,5,6,23,false],
              ].map(([pos,name,color,pj,g,e,p,pts,hl]) => (
                <div key={String(name)} className={`grid grid-cols-8 px-4 py-2.5 text-sm border-b border-gray-50 items-center ${hl ? "text-emerald-600" : "text-gray-700"}`}>
                  <div className="font-medium">{String(pos)}</div>
                  <div className="col-span-2 flex items-center gap-2">
                    <svg width="12" height="12" viewBox="0 0 40 40"><path d="M9 5 L4 12 L11 14 L11 35 L29 35 L29 14 L36 12 L31 5 L24 8 Q20 10 16 8 Z" fill={String(color)} stroke="#55555566" strokeWidth="1.5"/></svg>
                    <Link href={`/equipo/${String(name).toLowerCase().replace(" ","-")}`} className="hover:underline">{String(name)}</Link>
                  </div>
                  <div className="text-center text-gray-500">{String(pj)}</div>
                  <div className="text-center text-gray-500">{String(g)}</div>
                  <div className="text-center text-gray-500">{String(e)}</div>
                  <div className="text-center text-gray-500">{String(p)}</div>
                  <div className="text-center font-medium">{String(pts)}</div>
                </div>
              ))}
            </div>

            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3 mt-4">Goleadores</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              {[["FM","Funes Mori","América",11,100],["AG","A. González","Tigres",8,73],["JM","J. Macías","Chivas",6,55],["AF","Fidalgo","América",5,45],["LQ","L. Quiñones","Rayados",5,45]].map(([init,name,team,goals,pct]) => (
                <div key={String(name)} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-xs font-medium text-amber-700">{String(init)}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      <Link href={`/jugador/${String(name).toLowerCase().replace(" ","-")}`} className="hover:underline">{String(name)}</Link>
                    </div>
                    <div className="text-xs text-gray-400">{String(team)}</div>
                    <div className="h-1 bg-gray-100 rounded-full mt-1 overflow-hidden"><div className="h-full bg-emerald-400 rounded-full" style={{width:`${pct}%`}}/></div>
                  </div>
                  <div className="text-sm font-medium text-emerald-600">{String(goals)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Insights del mercado</p>
            {[["¿Ganará América el Apertura 2025?",38,"$142k · +5% esta semana"],["¿Llegará Funes Mori a 15 goles?",62,"$38k · +8% en 24h"],["¿Descenderá Mazatlán esta temporada?",81,"$19k · estable"]].map(([title,prob,meta]) => (
              <div key={String(title)} className="bg-white border border-gray-100 rounded-2xl p-4 mb-3">
                <div className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-1">Predicción activa</div>
                <div className="text-sm font-medium text-gray-900 leading-snug mb-2">{String(title)}</div>
                <div className="text-xl font-medium text-emerald-600 mb-1">{String(prob)}%</div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-1.5"><div className="h-full bg-emerald-500 rounded-full" style={{width:`${prob}%`}}/></div>
                <div className="text-xs text-gray-400">{String(meta)}</div>
              </div>
            ))}
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3 mt-4">Noticias de la liga</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              {[["América sigue líder tras clásico ante Chivas","Hace 2 h"],["Tigres golea a Cruz Azul y se acerca a la liguilla","Hace 3 h"],["Mazatlán en zona de descenso con 3 partidos restantes","Hace 5 h"]].map(([text,time]) => (
                <div key={String(text)} className="flex gap-2 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-6 h-6 min-w-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">📰</div>
                  <div><p className="text-xs text-gray-600 leading-relaxed">{String(text)}</p><p className="text-xs text-gray-400 mt-0.5">{String(time)}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}