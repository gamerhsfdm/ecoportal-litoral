"use client";

import { useState, useEffect } from "react";
import { useMapStore } from "@/store/useMapStore";
import { attractions, CATEGORY_CONFIG } from "@/data/attractions";
import { ecoAreas, ECO_CATEGORIES_CONFIG } from "@/data/ecoAreas";
import { Attraction, EcoArea } from "@/types";
import { Search, X, ChevronRight, Trees, MapPin } from "lucide-react";

export function SearchDialog() {
  const {
    showSearchDialog,
    setShowSearchDialog,
    setSelectedAttraction,
    setSelectedEcoArea,
    flyToLocation,
  } = useMapStore();

  const [query, setQuery] = useState("");

  // Keyboard shortcut listener (Ctrl+K or / to open, Esc to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setShowSearchDialog(true);
      } else if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)
      ) {
        e.preventDefault();
        setShowSearchDialog(true);
      } else if (e.key === "Escape" && showSearchDialog) {
        setShowSearchDialog(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showSearchDialog, setShowSearchDialog]);

  if (!showSearchDialog) return null;

  const q = query.toLowerCase().trim();

  const matchedAttractions = q
    ? attractions.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.highlights.some((h) => h.toLowerCase().includes(q)),
      )
    : attractions.slice(0, 5);

  const matchedEcoAreas = q
    ? ecoAreas.filter(
        (e) =>
          e.name.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q) ||
          e.fauna.some((f) => f.toLowerCase().includes(q)),
      )
    : ecoAreas.slice(0, 3);

  const handleSelectAttraction = (a: Attraction) => {
    setSelectedAttraction(a);
    flyToLocation(a.lng, a.lat, 14.5);
    setShowSearchDialog(false);
  };

  const handleSelectEco = (e: EcoArea) => {
    setSelectedEcoArea(e);
    flyToLocation(e.center[0], e.center[1], 12.5);
    setShowSearchDialog(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/65 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div
        className="w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl border border-white/15 text-white flex flex-col max-h-[80vh]"
        style={{ background: "rgba(8, 18, 38, 0.98)" }}
      >
        {/* Search input bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
          <Search size={18} className="text-cyan-400 shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar praias, história, Mata Atlântica, botos..."
            className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs text-white/40 hover:text-white px-1.5 py-0.5 rounded cursor-pointer"
            >
              Limpar
            </button>
          )}
          <button
            onClick={() => setShowSearchDialog(false)}
            className="p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {/* Attractions section */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-white/40 px-3 py-1">
              Pontos Turísticos & Culturais ({matchedAttractions.length})
            </div>
            {matchedAttractions.length === 0 ? (
              <div className="px-3 py-2 text-xs text-white/40 italic">
                Nenhum ponto turístico encontrado para &quot;{query}&quot;
              </div>
            ) : (
              <div className="space-y-1 mt-1">
                {matchedAttractions.map((a) => {
                  const cfg = CATEGORY_CONFIG[a.category];
                  return (
                    <button
                      key={a.id}
                      onClick={() => handleSelectAttraction(a)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-white/5 transition-all text-left cursor-pointer group"
                    >
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0 border border-white/5"
                        style={{
                          background: cfg?.bg || "rgba(255,255,255,0.05)",
                        }}
                      >
                        {cfg?.icon || "📍"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors truncate">
                          {a.name}
                        </div>
                        <div className="text-xs text-white/50 flex items-center gap-1.5">
                          <MapPin size={11} />
                          <span>{a.city}</span>
                          <span>·</span>
                          <span>{a.category}</span>
                        </div>
                      </div>
                      <ChevronRight
                        size={15}
                        className="text-white/20 group-hover:text-white/70 transition-colors shrink-0"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Eco Areas section */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/80 px-3 py-1 flex items-center gap-1.5">
              <Trees size={12} />
              <span>
                Áreas de Preservação & Mata Atlântica ({matchedEcoAreas.length})
              </span>
            </div>
            {matchedEcoAreas.length === 0 ? (
              <div className="px-3 py-2 text-xs text-white/40 italic">
                Nenhuma área de preservação encontrada
              </div>
            ) : (
              <div className="space-y-1 mt-1">
                {matchedEcoAreas.map((e) => {
                  const cfg = ECO_CATEGORIES_CONFIG[e.category];
                  return (
                    <button
                      key={e.id}
                      onClick={() => handleSelectEco(e)}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-emerald-950/30 border border-transparent hover:border-emerald-500/20 transition-all text-left cursor-pointer group"
                    >
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-base shrink-0">
                        {cfg?.icon || "🌲"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-emerald-100 group-hover:text-emerald-300 transition-colors truncate">
                          {e.name}
                        </div>
                        <div className="text-xs text-white/50 truncate">
                          {e.category} ·{" "}
                          {e.areaHectares.toLocaleString("pt-BR")} ha
                        </div>
                      </div>
                      <ChevronRight
                        size={15}
                        className="text-emerald-400/40 group-hover:text-emerald-300 transition-colors shrink-0"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer shortcuts */}
        <div className="px-5 py-2.5 border-t border-white/10 bg-black/30 flex items-center justify-between text-[11px] text-white/40">
          <span>Dica: Use as setas e Enter para navegar</span>
          <kbd className="px-2 py-0.5 rounded bg-white/10 font-mono text-[10px] text-white/70">
            ESC para fechar
          </kbd>
        </div>
      </div>
    </div>
  );
}
