"use client";

import { useMapStore } from "@/store/useMapStore";
import { attractions, CATEGORY_CONFIG } from "@/data/attractions";
import { Category } from "@/types";
import {
  Filter,
  ChevronDown,
  Compass,
  X,
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
    // Auto-close sidebar on mobile after selecting
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const cityLabel =
    activeCity === "Todos" ? "Litoral PR" : activeCity.split(" ")[0];

  return (
    <>
      {/* Mobile toggle button — positioned below the two-row header */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute left-3 z-30 lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-white cursor-pointer shadow-xl backdrop-blur-xl border border-white/10 transition-all active:scale-95"
        style={{
          top: "6.25rem",
          background:
            "linear-gradient(135deg, rgba(8,18,42,0.96) 0%, rgba(11,24,52,0.94) 100%)",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.06) inset",
        }}
      >
        <Filter size={12} className="text-cyan-400" />
        <span className="font-semibold">Filtros ({filtered.length})</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${sidebarOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Mobile backdrop overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[18] lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`absolute z-20 flex flex-col gap-2 transition-all duration-300 pointer-events-auto ${
          sidebarOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-3 pointer-events-none lg:opacity-100 lg:translate-x-0 lg:pointer-events-auto"
        }`}
        style={{
          top: "6.25rem",
          left: "0.75rem",
          maxHeight: "calc(100dvh - 7.25rem)",
          width: "min(256px, calc(100vw - 1.5rem))",
        }}
      >
        {/* Category Filters Panel */}
        <div
          className="rounded-2xl p-3 shadow-2xl backdrop-blur-2xl border border-white/10 animate-slide-left flex-shrink-0"
          style={{
            background:
              "linear-gradient(160deg, rgba(8,18,42,0.96) 0%, rgba(10,24,52,0.93) 100%)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.07) inset",
          }}
        >
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 flex items-center gap-1.5">
              <Compass size={11} className="text-cyan-400" />
              <span>Categorias</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-cyan-400/80 font-semibold">
                {cityLabel}
              </span>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden w-5 h-5 rounded-full bg-white/8 hover:bg-white/15 text-white/50 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={10} />
              </button>
            </div>
          </div>

          {/* 2-column grid of category buttons */}
          <div className="grid grid-cols-2 gap-1">
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
                  className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-xs transition-all cursor-pointer text-left active:scale-95"
                  style={{
                    background: active
                      ? cfg.bg
                      : "rgba(255,255,255,0.04)",
                    border: `1px solid ${
                      active ? cfg.color + "40" : "rgba(255,255,255,0.07)"
                    }`,
                  }}
                >
                  <span className="text-sm leading-none flex-shrink-0">{cfg.icon}</span>
                  <span
                    className="flex-1 font-medium text-[11px] truncate"
                    style={{
                      color: active ? cfg.color : "rgba(255,255,255,0.4)",
                    }}
                  >
                    {cat}
                  </span>
                  <span
                    className="text-[9px] font-bold px-1 py-0.5 rounded-full min-w-[16px] text-center flex-shrink-0"
                    style={{
                      background: active
                        ? cfg.color + "22"
                        : "rgba(255,255,255,0.05)",
                      color: active ? cfg.color : "rgba(255,255,255,0.25)",
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
          className="rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl border border-white/10 flex flex-col animate-slide-left"
          style={{
            background:
              "linear-gradient(160deg, rgba(8,18,42,0.96) 0%, rgba(10,24,52,0.93) 100%)",
            boxShadow:
              "0 8px 32px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.07) inset",
            maxHeight: "300px",
          }}
        >
          <div className="px-3 pt-3 pb-2 flex items-center justify-between border-b border-white/6 flex-shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">
              {filtered.length} Localidade{filtered.length !== 1 ? "s" : ""}
            </span>
            <span className="text-[10px] text-white/25">Toque para ir</span>
          </div>

          <div className="overflow-y-auto flex-1 p-1.5">
            {filtered.length === 0 ? (
              <div className="p-4 text-center text-[11px] text-white/35">
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
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl transition-all cursor-pointer text-left my-0.5 border border-transparent active:scale-[0.98]"
                    style={{
                      background: isSelected ? cfg.bg : "transparent",
                      borderColor: isSelected ? cfg.color + "35" : "transparent",
                    }}
                  >
                    <span className="text-base flex-shrink-0 leading-none">{cfg.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-xs font-semibold truncate leading-tight"
                        style={{
                          color: isSelected
                            ? cfg.color
                            : "rgba(255,255,255,0.88)",
                        }}
                      >
                        {a.name}
                      </div>
                      <div className="text-[10px] text-white/35 truncate mt-0.5">
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
