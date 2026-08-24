"use client";

import { useMapStore } from "@/store/useMapStore";
import { ECO_CATEGORIES_CONFIG } from "@/data/ecoAreas";
import {
  X,
  ShieldCheck,
  TreePine,
  PawPrint,
  Flower2,
  AlertTriangle,
  MapPin,
} from "lucide-react";
import Image from "next/image";

export function EcoAreaModal() {
  const { selectedEcoArea, setSelectedEcoArea } = useMapStore();

  if (!selectedEcoArea) return null;

  const cfg = ECO_CATEGORIES_CONFIG[selectedEcoArea.category] || {
    color: "#22c55e",
    border: "#16a34a",
    icon: "🌿",
    label: selectedEcoArea.category,
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-emerald-500/30 text-white"
        style={{ background: "rgba(6, 20, 32, 0.96)" }}
      >
        {/* Banner with image */}
        <div className="relative h-56 w-full flex-shrink-0 bg-slate-900 overflow-hidden">
          <Image
            src={selectedEcoArea.image}
            alt={selectedEcoArea.name}
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,20,32,0.95)] via-transparent to-black/30" />

          {/* Close button */}
          <button
            onClick={() => setSelectedEcoArea(null)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>

          {/* Category and location tags */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center gap-2">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-lg"
              style={{
                backgroundColor: cfg.color + "30",
                color: cfg.color,
                border: `1px solid ${cfg.color}60`,
              }}
            >
              <span>{cfg.icon}</span>
              {selectedEcoArea.category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-sm border border-white/15 text-white/90 flex items-center gap-1">
              <MapPin size={12} className="text-emerald-400" />
              {selectedEcoArea.city}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 backdrop-blur-sm border border-white/15 text-emerald-300">
              📐 {selectedEcoArea.areaHectares.toLocaleString("pt-BR")} hectares
            </span>
          </div>
        </div>

        {/* Modal content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <div>
            <h2 className="text-2xl font-bold text-white leading-tight">
              {selectedEcoArea.name}
            </h2>
            <p className="mt-2 text-sm text-white/70 leading-relaxed">
              {selectedEcoArea.description}
            </p>
          </div>

          {/* Importance callout */}
          <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/25 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Importância Ecológica & Mata Atlântica
              </h4>
              <p className="text-xs text-white/80 mt-1 leading-relaxed">
                {selectedEcoArea.importance}
              </p>
            </div>
          </div>

          {/* Fauna and Flora grids */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fauna */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                <PawPrint size={14} />
                <span>Fauna Notável & Protegida</span>
              </div>
              <ul className="space-y-1.5 pt-1">
                {selectedEcoArea.fauna.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-white/80 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Flora */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-lime-400 font-semibold text-xs uppercase tracking-wider">
                <Flower2 size={14} />
                <span>Flora & Vegetação Típica</span>
              </div>
              <ul className="space-y-1.5 pt-1">
                {selectedEcoArea.flora.map((item, i) => (
                  <li
                    key={i}
                    className="text-xs text-white/80 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-400 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Guidelines / Regras de conduta */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
              <AlertTriangle size={14} />
              <span>Conduta Consciente & Normas de Visitação</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {selectedEcoArea.guidelines.map((guide, idx) => (
                <div
                  key={idx}
                  className="text-xs text-white/75 flex items-start gap-2"
                >
                  <span className="text-amber-400 text-xs">✓</span>
                  <span>{guide}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 flex items-center justify-between bg-black/40">
          <span className="text-xs text-white/40 flex items-center gap-1.5">
            <TreePine size={13} className="text-emerald-400" />
            Patrimônio Natural do Litoral do Paraná
          </span>
          <button
            onClick={() => setSelectedEcoArea(null)}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-lg"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
