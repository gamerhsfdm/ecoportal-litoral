"use client";

import { useMapStore } from "@/store/useMapStore";
import { ECO_CATEGORIES_CONFIG } from "@/data/ecoAreas";
import { Trees, X } from "lucide-react";
import { useState } from "react";

export function EcoLegend() {
  const { showEcoLayer, setShowEcoLayer } = useMapStore();
  const [collapsed, setCollapsed] = useState(false);

  if (!showEcoLayer) return null;

  return (
    <div
      className="absolute bottom-4 left-3 right-16 z-20 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl border border-emerald-500/20 text-white animate-fade-in pointer-events-auto sm:bottom-8 sm:left-4 sm:right-auto"
      style={{ background: "rgba(6, 20, 32, 0.92)", maxWidth: "280px" }}
    >
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10 bg-emerald-950/40">
        <div className="flex items-center gap-2">
          <Trees size={14} className="text-emerald-400" />
          <span className="text-xs font-semibold text-emerald-300">
            Preservação Ambiental
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCollapsed((v) => !v)}
            className="text-[10px] text-white/50 hover:text-white px-1 py-0.5 rounded cursor-pointer"
          >
            {collapsed ? "Expandir" : "Recolher"}
          </button>
          <button
            onClick={() => setShowEcoLayer(false)}
            className="text-white/40 hover:text-white p-0.5 rounded cursor-pointer"
            title="Ocultar camada"
          >
            <X size={12} />
          </button>
        </div>
      </div>

      {!collapsed && (
        <div className="p-3 space-y-2 text-xs">
          <p className="text-[11px] text-white/60 leading-tight">
            Polígonos no mapa indicam áreas de Mata Atlântica e conservação
            integral ou sustentável:
          </p>
          <div className="space-y-1.5 pt-1">
            {Object.entries(ECO_CATEGORIES_CONFIG).map(([key, item]) => (
              <div key={key} className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-md flex-shrink-0 border"
                  style={{
                    backgroundColor: item.color + "40",
                    borderColor: item.color,
                  }}
                />
                <span className="text-[11px] text-white/80 truncate">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-2 border-t border-white/10 text-[10px] text-emerald-400/80 flex items-center gap-1 font-medium">
            <span>
              💡 Clique em qualquer área verde para abrir os dados ecológicos.
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
