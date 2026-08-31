"use client";

import { useMapStore } from "@/store/useMapStore";
import { ECO_CATEGORIES_CONFIG } from "@/data/ecoAreas";
import { Trees, X, ChevronUp, ChevronDown } from "lucide-react";
import { useState } from "react";

export function EcoLegend() {
  const { showEcoLayer, setShowEcoLayer } = useMapStore();
  const [collapsed, setCollapsed] = useState(true); // Default collapsed on mobile for clean uncluttered view

  if (!showEcoLayer) return null;

  return (
    <div
      className="absolute bottom-6 left-3 sm:bottom-8 sm:left-4 z-20 pointer-events-auto transition-all duration-300"
      style={{ maxWidth: collapsed ? "auto" : "280px" }}
    >
      {/* ── Compact Floating Pill when collapsed ── */}
      {collapsed ? (
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 px-3 py-2 rounded-2xl text-xs font-bold text-emerald-300 shadow-xl backdrop-blur-xl border border-emerald-500/30 transition-all hover:bg-emerald-500/20 active:scale-95 cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg, rgba(6, 24, 20, 0.95) 0%, rgba(8, 32, 28, 0.92) 100%)",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.5), 0 0 15px rgba(74,222,128,0.15)",
          }}
        >
          <Trees size={14} className="text-emerald-400 animate-pulse" />
          <span>Áreas Protegidas</span>
          <ChevronUp size={13} className="text-emerald-400/70" />
        </button>
      ) : (
        /* ── Full Legend Card when expanded ── */
        <div
          className="rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl border border-emerald-500/30 text-white animate-fade-in"
          style={{
            background:
              "linear-gradient(165deg, rgba(6, 24, 20, 0.97) 0%, rgba(4, 18, 16, 0.98) 100%)",
            boxShadow:
              "0 16px 40px rgba(0,0,0,0.6), 0 0 20px rgba(74,222,128,0.12)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-emerald-500/20 bg-emerald-950/40">
            <div className="flex items-center gap-2">
              <Trees size={14} className="text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300">
                Preservação Ambiental
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCollapsed(true)}
                className="text-[10px] font-semibold text-white/60 hover:text-white px-2 py-0.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center gap-0.5"
              >
                <span>Recolher</span>
                <ChevronDown size={11} />
              </button>
              <button
                onClick={() => setShowEcoLayer(false)}
                className="text-white/40 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
                title="Ocultar camada verde"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-3.5 space-y-2 text-xs">
            <p className="text-[11px] text-white/60 leading-tight">
              Polígonos no mapa indicam unidades de conservação e bioma:
            </p>
            <div className="space-y-1.5 pt-1">
              {Object.entries(ECO_CATEGORIES_CONFIG).map(([key, item]) => (
                <div key={key} className="flex items-center gap-2">
                  <span
                    className="w-3.5 h-3.5 rounded-md flex-shrink-0 border"
                    style={{
                      backgroundColor: item.color + "45",
                      borderColor: item.color,
                    }}
                  />
                  <span className="text-[11px] text-white/80 font-medium truncate">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-emerald-500/20 text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <span>💡 Toque em qualquer área verde para inspecionar fauna e flora.</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
