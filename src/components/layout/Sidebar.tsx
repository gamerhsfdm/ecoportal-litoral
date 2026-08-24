"use client";

import { useMapStore } from "@/store/useMapStore";
import { attractions, CATEGORY_CONFIG } from "@/data/attractions";
import { Category } from "@/types";
import {
  Filter,
  ChevronDown,
  Compass,
} from "lucide-react";

const CATEGORIES: Category[] = [
  "Praias",
  "Ilhas",
  "Natureza",
  "História",
  "Cultura",
  "Gastronomia",
  "Passeios",
];

export function Sidebar() {
  const {
    activeCategories,
    toggleCategory,
    activeCity,
    selectedAttraction,
    setSelectedAttraction,
    flyToLocation,
    sidebarOpen,
    setSidebarOpen,
  } = useMapStore();

  // Filter attractions based on active city and selected categories
  const filtered = attractions.filter((a) => {
    const matchesCategory = activeCategories.has(a.category);
    const matchesCity = activeCity === "Todos" || a.city === activeCity;
    return matchesCategory && matchesCity;
  });

  const handleSelect = (a: (typeof attractions)[0]) => {
    setSelectedAttraction(a);
    flyToLocation(a.lng, a.lat, 14.5);
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-20 left-4 z-30 lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer shadow-xl backdrop-blur-xl border border-white/10"
        style={{ background: "rgba(8, 18, 38, 0.92)" }}
      >
        <Filter size={13} className="text-cyan-400" />
        <span>Filtros & Locais ({filtered.length})</span>
        <ChevronDown
          size={13}
          className={`transition-transform ${sidebarOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Sidebar container */}
      <aside
        className={`absolute top-20 left-4 z-20 flex flex-col gap-2.5 transition-all duration-300 pointer-events-auto ${
          sidebarOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-8 pointer-events-none lg:opacity-100 lg:translate-x-0 lg:pointer-events-auto"
        }`}
        style={{ maxHeight: "calc(100vh - 110px)", width: "270px" }}
      >
        {/* Category Filters Panel */}
        <div
          className="rounded-2xl p-3 shadow-2xl backdrop-blur-2xl border border-white/10 animate-slide-left"
          style={{ background: "rgba(8, 18, 38, 0.90)" }}
        >
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-1.5">
              <Compass size={12} className="text-cyan-400" />
              <span>Categorias</span>
            </div>
            <span className="text-[10px] text-cyan-300 font-semibold">
              {activeCity}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            {CATEGORIES.map((cat) => {
              const cfg = CATEGORY_CONFIG[cat];
              const count = attractions.filter((a) => {
                const cityMatch =
                  activeCity === "Todos" || a.city === activeCity;
                return a.category === cat && cityMatch;
              }).length;

              const active = activeCategories.has(cat);

              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-xs transition-all cursor-pointer text-left"
                  style={{
                    background: active ? cfg.bg : "transparent",
                    border: `1px solid ${active ? cfg.color + "40" : "transparent"}`,
                  }}
                >
                  <span className="text-sm leading-none">{cfg.icon}</span>
                  <span
                    className="flex-1 font-medium text-xs truncate"
                    style={{
                      color: active ? cfg.color : "rgba(255,255,255,0.45)",
                    }}
                  >
                    {cat}
                  </span>
                  <span
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center"
                    style={{
                      background: active
                        ? cfg.color + "25"
                        : "rgba(255,255,255,0.06)",
                      color: active ? cfg.color : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Attractions List Panel */}
        <div
          className="rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl border border-white/10 flex flex-col flex-1 animate-slide-left"
          style={{
            background: "rgba(8, 18, 38, 0.90)",
            maxHeight: "340px",
          }}
        >
          <div className="px-3 pt-3 pb-2 flex items-center justify-between border-b border-white/5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
              {filtered.length} Localidade{filtered.length !== 1 ? "s" : ""}
            </span>
            <span className="text-[10px] text-white/30">
              Clique para navegar
            </span>
          </div>

          <div className="overflow-y-auto flex-1 p-1">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-xs text-white/40">
                Nenhum ponto encontrado com os filtros atuais.
              </div>
            ) : (
              filtered.map((a) => {
                const cfg = CATEGORY_CONFIG[a.category];
                const isSelected = selectedAttraction?.id === a.id;

                return (
                  <button
                    key={a.id}
                    onClick={() => handleSelect(a)}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl transition-all cursor-pointer text-left my-0.5 border border-transparent"
                    style={{
                      background: isSelected ? cfg.bg : "transparent",
                      borderColor: isSelected ? cfg.color + "40" : "transparent",
                    }}
                  >
                    <span className="text-base flex-shrink-0">{cfg.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-xs font-semibold truncate leading-tight"
                        style={{
                          color: isSelected ? cfg.color : "rgba(255,255,255,0.9)",
                        }}
                      >
                        {a.name}
                      </div>
                      <div className="text-[10px] text-white/40 truncate mt-0.5">
                        {a.city} · ★ {a.rating.toFixed(1)}
                      </div>
                    </div>
                    {isSelected && (
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: cfg.color }}
                      />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      </aside>
    </>
  );
}