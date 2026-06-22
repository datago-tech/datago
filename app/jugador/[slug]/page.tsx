"use client";
import Link from "next/link";

export default function PlayerPage() {
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
        <span>›</span>
        <Link href="/equipo/america" className="hover:text-gray-600">América</Link>
        <span>›</span><span>Alejandro Fidalgo</span>
      </div>
      <div className="px-6 pb-6 max-w-6xl">
        {/* Header */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 mb-4 flex gap-5 items-center">
          <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-xl font-medium text-emerald-700">AF</div>
          <div className="flex-1">
            <h1 className="text-xl font-medium text-gray-900 mb-1">Alejandro Fidalgo</h1>
            <div className="flex gap-2 flex-wrap mb-2">
              <Link href="/equipo/america"><span className="text-xs px-2.5 py-0.5 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 cursor-pointer">🛡️ Club América</span></Link>
              <Link href="/liga/liga-mx"><span className="text-xs px-2.5 py-0.5 rounded-full border border-amber-200 bg-amber-50 text-amber-700 cursor-pointer">🏆 Liga MX</span></Link>
              {["Mediocampista","España"].map(b => (
                <span key={b} className="text-xs px-2.5 py-0.5 rounded-full border border-gray-200 bg-gray-50 text-gray-600">{b}</span>
              ))}
            </div>
            <div className="flex gap-5 text-xs text-gray-500">
              <span>📅 28 años · 14 Ago 1996</span>
              <span>📏 1.77 m</span>
              <span>👕 Dorsal #8</span>
              <span>🕐 En América desde 2022</span>
            </div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 min-w-48">
            <div className="text-xs text-gray-400 mb-1">Prob. goleador Liga MX</div>
            <div className="text-xl font-medium text-emerald-600">31%</div>
            <div className="text-xs text-gray-400 mt-1">$48k de volumen · +4% esta semana</div>
          </div>
        </div>

        {/* Season stats */}
        <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Temporada actual — Apertura 2025</p>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[["Partidos jugados","14","13 titular"],["Goles","5","0.36 por partido"],["Asistencias","7","0.5 por partido"],["Minutos jugados","1,186","84.7 por partido"]].map(([label,val,sub]) => (
            <div key={String(label)} className="bg-gray-100 rounded-xl p-3">
              <div className="text-xs text-gray-400 mb-1">{label}</div>
              <div className="text-lg font-medium text-gray-900">{val}</div>
              <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Left — recent games */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Partidos recientes</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4">
              {[["Jun 14","América vs Chivas",1,1,"90'","G"],["Jun 7","Pachuca vs América",0,2,"90'","G"],["May 31","América vs Cruz Azul",1,0,"78'","E"],["May 24","Tigres vs América",0,1,"90'","P"],["May 17","América vs Rayados",2,1,"90'","G"]].map(([date,match,g,a,min,result]) => (
                <div key={String(match)} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 text-xs">
                  <span className="text-gray-400 min-w-12">{date}</span>
                  <span className="flex-1 text-gray-700">{match}</span>
                  <span className="text-gray-500">{g}G</span>
                  <span className="text-gray-500">{a}A</span>
                  <span className="text-gray-400">{min}</span>
                  <span className={`font-medium px-1.5 py-0.5 rounded-full ${result==="G"?"bg-emerald-50 text-emerald-700":result==="P"?"bg-red-50 text-red-700":"bg-amber-50 text-amber-700"}`}>{result}</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Historial de transferencias</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              {[["2022","Celta Vigo B","Club América","$2.1M","Traspaso","blue"],["2021","Celta Vigo","Celta Vigo B","—","Cantera","green"],["2019","Dep. Alavés","Celta Vigo","Libre","Libre","green"],["2018","Dep. Alavés B","Dep. Alavés","—","Préstamo","amber"]].map(([year,from,to,fee,type,color]) => (
                <div key={String(year)} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 text-xs">
                  <span className="text-gray-400 min-w-8">{year}</span>
                  <div className="flex-1">
                    <div className="text-gray-700">{from} → {to}</div>
                    <div className="text-gray-400 mt-0.5">{fee}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full border text-xs ${color==="blue"?"bg-blue-50 text-blue-700 border-blue-200":color==="amber"?"bg-amber-50 text-amber-700 border-amber-200":"bg-emerald-50 text-emerald-700 border-emerald-200"}`}>{type}</span>
                </div>
              ))}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-gray-100">
                {[["Valor de mercado","$4.5M USD"],["En América desde","2022 · 3 años"]].map(([l,v]) => (
                  <div key={l} className="bg-gray-50 rounded-lg p-2">
                    <div className="text-xs text-gray-400">{l}</div>
                    <div className="text-sm font-medium text-gray-900">{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle — season history */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Historial de temporadas</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4">
              {[["2024/25","Club América",14,5,7],["2023/24","Club América",32,7,9],["2022/23","Club América",28,3,4],["2021/22","Celta Vigo B",24,2,5],["2020/21","Celta Vigo B",19,1,3]].map(([year,team,pj,g,a]) => (
                <div key={String(year)} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0 text-sm">
                  <span className="font-medium text-gray-900 min-w-16">{year}</span>
                  <span className="flex-1 text-gray-500 text-xs">{team}</span>
                  <span className="text-xs text-gray-400">{String(pj)} PJ</span>
                  <span className="text-xs text-gray-400">{String(g)}G</span>
                  <span className="text-xs text-gray-400">{String(a)}A</span>
                </div>
              ))}
            </div>

            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Goles y asistencias por temporada</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              {[["2020/21",1,3],["2021/22",2,5],["2022/23",3,4],["2023/24",7,9],["2024/25*",5,7]].map(([year,g,a]) => (
                <div key={String(year)} className="flex items-center gap-2 py-1.5">
                  <span className="text-xs text-gray-400 min-w-16">{year}</span>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <div className="h-2 rounded-full bg-emerald-500" style={{width:`${Number(g)*9}px`, minWidth:"4px"}}/>
                      <span className="text-xs text-gray-400">{g}G</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="h-2 rounded-full bg-emerald-200" style={{width:`${Number(a)*9}px`, minWidth:"4px"}}/>
                      <span className="text-xs text-gray-400">{a}A</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — market insights + news */}
          <div>
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3">Insights del mercado</p>
            {[["¿Anotará Fidalgo vs Pumas?",58,"$12k · +6% en 24h"],["¿Terminará entre los 5 mejores asistidores?",72,"$31k · estable"],["¿Renovará con América antes de diciembre?",84,"$8k · +11% en 7 días"]].map(([title,prob,meta]) => (
              <div key={String(title)} className="bg-white border border-gray-100 rounded-2xl p-4 mb-3">
                <div className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-1">Predicción activa</div>
                <div className="text-sm font-medium text-gray-900 leading-snug mb-2">{String(title)}</div>
                <div className="text-xl font-medium text-emerald-600 mb-1">{String(prob)}%</div>
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden mb-1.5"><div className="h-full bg-emerald-500 rounded-full" style={{width:`${prob}%`}}/></div>
                <div className="text-xs text-gray-400">{String(meta)}</div>
              </div>
            ))}
            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-3 mt-2">Noticias sobre Fidalgo</p>
            <div className="bg-white border border-gray-100 rounded-2xl p-4">
              {[["Fidalgo confirma que seguirá en América la próxima temporada","Hace 14 min"],["Fidalgo, figura del clásico con un gol y dos asistencias","Hace 5 días"],["El mediocampista español suma 12 participaciones en gol","Hace 1 sem"]].map(([text,time]) => (
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