"use client";

import { useMapStore } from "@/store/useMapStore";
import { attractions, CATEGORY_CONFIG } from "@/data/attractions";
import { Category } from "@/types";
import {
  Filter,
  ChevronDown,
  Compass,
  X,
  MapPin,
  Star,
  Layers,
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
    setAllCategories,
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
    activeCity === "Todos" ? "Litoral PR" : activeCity;

  return (
    <>
      {/* ── Mobile Floating Filter Button (Cleanly positioned below the single header) ── */}
      <div className="absolute top-[4.5rem] left-3 z-20 lg:hidden pointer-events-auto">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold text-white shadow-xl backdrop-blur-xl border border-cyan-500/30 transition-all active:scale-95 cursor-pointer"
          style={{
            background:
              "linear-gradient(135deg, rgba(8, 22, 46, 0.95) 0%, rgba(12, 30, 60, 0.92) 100%)",
            boxShadow:
              "0 8px 24px rgba(0,0,0,0.5), 0 0 15px rgba(34,197,217,0.15)",
          }}
        >
          <div className="w-5 h-5 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center">
            <Filter size={11} />
          </div>
          <span>Filtros & Locais</span>
          <span className="px-1.5 py-0.5 rounded-md bg-cyan-400/20 text-cyan-300 text-[10px] font-extrabold border border-cyan-400/30">
            {filtered.length}
          </span>
          <ChevronDown
            size={13}
            className={`text-white/60 transition-transform duration-300 ${
              sidebarOpen ? "rotate-180 text-cyan-400" : ""
            }`}
          />
        </button>
      </div>

      {/* ── Mobile Backdrop (Closes on tap) ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300 pointer-events-auto"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar Container (Desktop Island / Mobile Slide Sheet) ── */}
      <aside
        className={`fixed lg:absolute z-40 lg:z-20 flex flex-col gap-2.5 transition-all duration-300 pointer-events-auto ${
          sidebarOpen
            ? "opacity-100 translate-y-0 lg:translate-x-0"
            : "opacity-0 translate-y-8 lg:translate-y-0 lg:-translate-x-8 pointer-events-none lg:opacity-100 lg:translate-x-0 lg:pointer-events-auto"
        }`}
        style={{
          top: "4.5rem",
          left: "0.75rem",
          maxHeight: "calc(100vh - 5.5rem)",
          maxWidth: "320px",
        }}
      >
        {/* Category Filters Panel */}
        <div
          className="rounded-3xl p-3.5 shadow-2xl backdrop-blur-2xl border border-white/10 flex-shrink-0 relative overflow-hidden"
          style={{
            background:
              "linear-gradient(165deg, rgba(8, 22, 46, 0.97) 0%, rgba(6, 16, 36, 0.98) 100%)",
            boxShadow:
              "0 16px 40px rgba(0,0,0,0.6), 0 0 20px rgba(34,197,217,0.1)",
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2.5 px-0.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-white tracking-wide">
              <Compass size={14} className="text-cyan-400" />
              <span>Categorias</span>
              <span className="text-[10px] font-semibold text-white/40">
                ({cityLabel})
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={setAllCategories}
                className="text-[10px] font-bold text-cyan-400 hover:text-cyan-300 px-2 py-0.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors cursor-pointer"
              >
                Todas
              </button>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Fechar"
              >
                <X size={12} />
              </button>
            </div>
          </div>

          {/* 2-Column Category Grid */}
          <div className="grid grid-cols-2 gap-1.5">
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
                  className="flex items-center gap-1.5 px-2.5 py-2 rounded-2xl text-xs transition-all cursor-pointer text-left active:scale-95 group"
                  style={{
                    background: active ? cfg.bg : "rgba(255,255,255,0.04)",
                    border: `1px solid ${
                      active ? cfg.color + "50" : "rgba(255,255,255,0.06)"
                    }`,
                    boxShadow: active ? `0 0 12px ${cfg.color}20` : "none",
                  }}
                >
                  <span className="text-sm leading-none shrink-0 group-hover:scale-110 transition-transform">
                    {cfg.icon}
                  </span>
                  <span
                    className="flex-1 font-bold text-[11px] truncate"
                    style={{
                      color: active ? cfg.color : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {cat}
                  </span>
                  <span
                    className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shrink-0"
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
          className="rounded-3xl overflow-hidden shadow-2xl backdrop-blur-2xl border border-white/10 flex flex-col flex-1"
          style={{
            background:
              "linear-gradient(165deg, rgba(8, 22, 46, 0.97) 0%, rgba(6, 16, 36, 0.98) 100%)",
            boxShadow:
              "0 16px 40px rgba(0,0,0,0.6), 0 0 20px rgba(34,197,217,0.1)",
            maxHeight: "260px",
          }}
        >
          <div className="px-4 py-2.5 flex items-center justify-between border-b border-white/6 flex-shrink-0 bg-black/20">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/50 flex items-center gap-1.5">
              <Layers size={11} className="text-cyan-400" />
              <span>{filtered.length} Localidades</span>
            </span>
            <span className="text-[10px] text-cyan-300/70 font-medium">
              Toque para navegar
            </span>
          </div>

          <div className="overflow-y-auto flex-1 p-2 space-y-1">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-white/40 flex flex-col items-center gap-1">
                <span>Nenhum ponto encontrado.</span>
                <button
                  onClick={setAllCategories}
                  className="text-[11px] text-cyan-400 underline cursor-pointer mt-1"
                >
                  Restaurar filtros
                </button>
              </div>
            ) : (
              filtered.map((a) => {
                const cfg = CATEGORY_CONFIG[a.category];
                const isSelected = selectedAttraction?.id === a.id;

                return (
                  <button
                    key={a.id}
                    onClick={() => handleSelect(a)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-2xl transition-all cursor-pointer text-left border active:scale-[0.98] group"
                    style={{
                      background: isSelected
                        ? cfg.bg
                        : "rgba(255,255,255,0.03)",
                      borderColor: isSelected
                        ? cfg.color + "45"
                        : "rgba(255,255,255,0.05)",
                    }}
                  >
                    <span className="text-base shrink-0 leading-none group-hover:scale-110 transition-transform">
                      {cfg.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div
                        className="text-xs font-bold truncate leading-tight"
                        style={{
                          color: isSelected
                            ? cfg.color
                            : "rgba(255,255,255,0.92)",
                        }}
                      >
                        {a.name}
                      </div>
                      <div className="text-[10px] text-white/40 truncate flex items-center gap-1 mt-0.5">
                        <MapPin size={9} className="text-cyan-400/70" />
                        <span>{a.city}</span>
                        <span>·</span>
                        <Star size={9} className="text-amber-400 fill-amber-400" />
                        <span>{a.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    {isSelected && (
                      <div
                        className="w-2 h-2 rounded-full shrink-0 animate-pulse"
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
