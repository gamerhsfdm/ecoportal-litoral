"use client";

import { useMapStore } from "@/store/useMapStore";
import { tourRoutes } from "@/data/routes";
import { TourRoute } from "@/types";
import {
  X,
  Footprints,
  Compass,
  Clock,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export function RoutesModal() {
  const { showRoutesModal, setShowRoutesModal, setActiveRoute } = useMapStore();

  if (!showRoutesModal) return null;

  const handleStartRoute = (route: TourRoute) => {
    setActiveRoute(route);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-amber-500/30 text-white"
        style={{ background: "rgba(6, 18, 36, 0.98)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-amber-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <Footprints size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight flex items-center gap-2">
                <span>Roteiros & Circuitos Guiados</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Novidade
                </span>
              </h2>
              <p className="text-xs text-white/50">
                Experiências temáticas passo a passo com navegação no mapa
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowRoutesModal(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Routes Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tourRoutes.map((route) => (
              <div
                key={route.id}
                className="p-5 rounded-3xl border border-white/10 bg-white/5 hover:border-amber-500/40 hover:bg-white/8 transition-all flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1"
                      style={{
                        backgroundColor: route.color + "25",
                        color: route.color,
                        border: `1px solid ${route.color}50`,
                      }}
                    >
                      <span>{route.icon}</span>
                      {route.category}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                      {route.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {route.title}
                  </h3>
                  <p className="text-xs text-white/65 mt-1.5 line-clamp-2 leading-relaxed">
                    {route.description}
                  </p>

                  {/* Stops preview */}
                  <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1.5">
                      {route.stops.length} Paradas Principais:
                    </div>
                    {route.stops.map((s) => (
                      <div
                        key={s.order}
                        className="text-xs text-white/80 flex items-center gap-2"
                      >
                        <span
                          className="w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center shrink-0"
                          style={{
                            background: route.color,
                            color: "#081226",
                          }}
                        >
                          {s.order}
                        </span>
                        <span className="truncate">{s.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer stats and Action */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <Compass size={13} className="text-amber-400" />
                      {route.distanceKm} km
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={13} className="text-cyan-400" />
                      {route.estimatedDuration}
                    </span>
                  </div>

                  <button
                    onClick={() => handleStartRoute(route)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer hover:brightness-110"
                    style={{
                      backgroundColor: route.color,
                      color: "#081226",
                    }}
                  >
                    <span>Iniciar</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <Sparkles size={13} className="text-amber-400" />
            Desenha a rota com paradas numeradas no mapa
          </span>
          <button
            onClick={() => setShowRoutesModal(false)}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
