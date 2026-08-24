"use client";

import { useMapStore } from "@/store/useMapStore";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

export function ActiveRouteController() {
  const {
    activeRoute,
    currentStopIndex,
    nextRouteStop,
    prevRouteStop,
    setActiveRoute,
  } = useMapStore();

  if (!activeRoute) return null;

  const currentStop = activeRoute.stops[currentStopIndex];
  const isFirst = currentStopIndex === 0;
  const isLast = currentStopIndex === activeRoute.stops.length - 1;

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 w-full max-w-lg px-4 pointer-events-auto animate-fade-in">
      <div
        className="rounded-3xl p-4 shadow-2xl border backdrop-blur-2xl text-white flex flex-col gap-3"
        style={{
          background: "rgba(6, 18, 36, 0.96)",
          borderColor: activeRoute.color + "50",
          boxShadow: `0 10px 40px rgba(0,0,0,0.6), 0 0 20px ${activeRoute.color}25`,
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
              style={{
                backgroundColor: activeRoute.color + "30",
                color: activeRoute.color,
              }}
            >
              {activeRoute.icon}
            </span>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>{activeRoute.title}</span>
                <span className="text-[10px] text-white/50">
                  ({activeRoute.distanceKm} km)
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveRoute(null)}
            className="text-white/40 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            title="Encerrar Roteiro"
          >
            <X size={15} />
          </button>
        </div>

        {/* Current Stop details */}
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 shadow-lg mt-0.5"
            style={{
              background: activeRoute.color,
              color: "#081226",
            }}
          >
            {currentStopIndex + 1}
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              Parada {currentStopIndex + 1} de {activeRoute.stops.length}
            </div>
            <div className="text-sm font-bold text-white truncate">
              {currentStop?.title}
            </div>
            {currentStop?.tip && (
              <p className="text-xs text-white/70 mt-1 flex items-start gap-1 leading-tight">
                <Lightbulb
                  size={12}
                  className="text-amber-400 shrink-0 mt-0.5"
                />
                <span>{currentStop.tip}</span>
              </p>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-1">
          <button
            disabled={isFirst}
            onClick={prevRouteStop}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isFirst
                ? "opacity-30 cursor-not-allowed text-white/40"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
          >
            <ChevronLeft size={14} />
            <span>Anterior</span>
          </button>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5">
            {activeRoute.stops.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-all"
                style={{
                  background:
                    i === currentStopIndex
                      ? activeRoute.color
                      : i < currentStopIndex
                        ? "rgba(255,255,255,0.6)"
                        : "rgba(255,255,255,0.2)",
                  transform: i === currentStopIndex ? "scale(1.3)" : "scale(1)",
                }}
              />
            ))}
          </div>

          <button
            onClick={isLast ? () => setActiveRoute(null) : nextRouteStop}
            className="flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer hover:brightness-110"
            style={{
              background: activeRoute.color,
              color: "#081226",
            }}
          >
            <span>{isLast ? "Concluir Rota" : "Próxima Parada"}</span>
            {isLast ? <CheckCircle2 size={14} /> : <ChevronRight size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
}
