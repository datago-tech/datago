"use client";
import Link from "next/link";

export default function TeamPage() {
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
        <span>›</span>
        <Link href="/liga/liga-mx" className="hover:text-gray-600">Liga MX</Link>
        <span>›</span><span>Club América</span>
      </div>
      <div className="px-6 pb-6 max-w-6xl">
        {/* Header */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex gap-5 items-center">
          <div className="w-16 h-16 rounded-xl bg-yellow-50 border border-yellow-100 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40"><path d="M9 5 L4 12 L11 14 L11 35 L29 35 L29 14 L36 12 L31 5 L24 8 Q20 10 16 8 Z" fill="#FFD700" stroke="#555" strokeWidth="0.8"/></svg>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-medium text-gray-900 mb-1">Club América</h1>
            <div className="flex gap-2 flex-wrap mb-2">
              <Link href="/liga/liga-mx"><span className="text-xs px-2.5 py-0.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 cursor-pointer">🏆 Liga MX</span></Link>
              {["Apertura 2025","Ciudad de México","Fundado 1916"].map(b => (
                <span key={b} className="text-xs px-2.5 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600">{b}</span>
              ))}
            </div>
            <div className="flex gap-5 text-xs text-gray-500">
              <span>🏟️ Estadio Azteca · 87,500</span>
              <span>👕 Amarillo y negro</span>
              <span>👤 DT: André Jardine</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 min-w-48">
            <div className="text-xs text-gray-400 mb-1">Prob. campeonato · Apertura 2025</div>
            <div className="text-xl font-medium text-emerald-600">38%</div>
            <div className="text-xs text-gray-400 mt-1">$142k de volumen · +5% esta semana</div>
          </div>
        </div>

        {/* Season stats */}
        <div className="grid grid-cols-5 gap-3 mb-4">
          {[["Posición","1°","Liga MX"],["Partidos","17","G11 · E3 · P3"],["Goles anotados","34","2.0 por partido"],["Goles recibidos","14","0.82 por partido"],["Puntos","36","2.1 por partido"]].map(([label,val,sub]) => (
            <div key={String(label)} className="bg-gray-100 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">{label}</div>
              <div className="text-lg font-medium text-gray-900">{val}</div>
              <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-2">Forma reciente</p>
        <div className="flex gap-1.5 mb-4 items-center">
          {[["G","win"],["G","win"],["E","draw"],["P","loss"],["G","win"],["G","win"],["G","win"],["E","draw"],["G","win"],["P","loss"]].map(([r,type],i) => (
            <div key={i} className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${type==="win"?"bg-emerald-50 text-emerald-700":type==="loss"?"bg-red-50 text-red-700":"bg-amber-50 text-amber-700"}`}>{r}</div>
          ))}
          <span className="text-xs text-gray-400 ml-2">últimos 10 partidos</span>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Left */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Partidos recientes</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4">
              {[["Jun 14","América vs Chivas","2—1","G"],["Jun 7","Pachuca vs América","1—2","G"],["May 31","América vs Cruz Azul","1—1","E"],["May 24","Tigres vs América","2—0","P"],["May 17","América vs Rayados","3—1","G"]].map(([date,match,score,result]) => (
                <div key={String(match)} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 text-sm">
                  <span className="text-xs text-gray-400 min-w-12">{date}</span>
                  <span className="flex-1 text-gray-700">{match}</span>
                  <span className="font-medium text-gray-900 min-w-8 text-center">{score}</span>
                  <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${result==="G"?"bg-emerald-50 text-emerald-700":result==="P"?"bg-red-50 text-red-700":"bg-amber-50 text-amber-700"}`}>{result}</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Líderes del equipo</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              <div className="text-xs font-medium text-amber-700 mb-2">⚽ Goles</div>
              {[["FM","Funes Mori","Delantero",11,100],["AF","Fidalgo","Mediocampista",5,45],["HM","H. Martínez","Delantero",4,36]].map(([init,name,pos,val,pct]) => (
                <div key={String(name)} className="flex items-center gap-2 py-1.5">
                  <div className="w-6 h-6 rounded-full bg-amber-50 flex items-center justify-center text-xs font-medium text-amber-700">{init}</div>
                  <div className="flex-1">
                    <div className="text-xs font-medium text-gray-900">
                      <Link href={`/jugador/${String(name).toLowerCase().replace(" ","-")}`} className="hover:underline">{String(name)}</Link>
                    </div>
                    <div className="h-1 bg-gray-100 rounded-full mt-0.5 overflow-hidden"><div className="h-full bg-emerald-400 rounded-full" style={{width:`${pct}%`}}/></div>
                  </div>
                  <div className="text-sm font-medium text-emerald-600">{String(val)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Tabla de posiciones</p>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-4">
              {[["1","América","#FFD700",36,true],["2","Tigres","#FF6600",33,false],["3","Rayados","#004A97",31,false],["4","Chivas","#CC0000",28,false],["5","Cruz Azul","#003087",26,false]].map(([pos,name,color,pts,hl]) => (
                <div key={String(name)} className={`flex items-center gap-2 px-4 py-2.5 border-b border-gray-50 last:border-0 text-sm ${hl?"text-emerald-600 font-medium":"text-gray-700"}`}>
                  <span className="min-w-5">{pos}</span>
                  <svg width="12" height="12" viewBox="0 0 40 40"><path d="M9 5 L4 12 L11 14 L11 35 L29 35 L29 14 L36 12 L31 5 L24 8 Q20 10 16 8 Z" fill={String(color)} stroke="#55555566" strokeWidth="1.5"/></svg>
                  <span className="flex-1">{name}</span>
                  <span className="font-medium">{String(pts)}</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Historial de temporadas</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              {[["2024/25","Club América",14,5,7],["2023/24","Club América",32,7,9],["2022/23","Club América",28,3,4],["2021/22","Celta Vigo B",24,2,5]].map(([year,team,pj,g,a]) => (
                <div key={String(year)} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 text-sm">
                  <span className="font-medium text-gray-900 min-w-16">{year}</span>
                  <span className="flex-1 text-gray-500 text-xs">{team}</span>
                  <span className="text-xs text-gray-400">{String(pj)} PJ</span>
                  <span className="text-xs text-gray-400">{String(g)}G</span>
                  <span className="text-xs text-gray-400">{String(a)}A</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Insights del mercado</p>
            {[["¿Ganará América el Apertura 2025?",38,"$142k · +5% esta semana"],["¿Terminará América en primer lugar?",61,"$88k · estable"],["¿Anotará América más de 2 goles vs Pumas?",54,"$22k · +9% en 24h"]].map(([title,prob,meta]) => (
              <div key={String(title)} className="bg-white border border-gray-100 rounded-2xl p-4 mb-3">
                <div className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-1">Predicción activa</div>
                <div className="text-sm font-medium text-gray-900 leading-snug mb-2">{String(title)}</div>
                <div className="text-xl font-medium text-emerald-600 mb-1">{String(prob)}%</div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-1.5"><div className="h-full bg-emerald-500 rounded-full" style={{width:`${prob}%`}}/></div>
                <div className="text-xs text-gray-400">{String(meta)}</div>
              </div>
            ))}
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3 mt-2">Noticias del equipo</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              {[["América sigue líder tras vencer al Chivas","Hace 2 h"],["Jardine confirma que Funes Mori estará vs Pumas","Hace 5 h"],["América negocia la renovación de Fidalgo hasta 2027","Hace 1 día"]].map(([text,time]) => (
                <div key={String(text)} className="flex gap-2 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-6 h-6 min-w-6 rounded-full bg-gray-100 flex items-center justify-center text-xs">📰</div>
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