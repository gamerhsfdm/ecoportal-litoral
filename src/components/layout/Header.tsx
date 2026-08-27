"use client";

import { useState } from "react";
import { useMapStore } from "@/store/useMapStore";
import { CityFilter } from "@/types";
import {
  Search,
  Waves,
  Trees,
  Maximize2,
  Minimize2,
  Navigation2,
  Layers,
  Footprints,
  Calendar,
  Sparkles,
} from "lucide-react";

interface HeaderProps {
  onGeolocate: () => void;
}

const CITIES: CityFilter[] = [
  "Todos",
  "Pontal do Paraná",
  "Paranaguá",
  "Ilha do Mel",
];

export function Header({ onGeolocate }: HeaderProps) {
  const {
    activeCity,
    setActiveCity,
    setShowSearchDialog,
    showWeatherModal,
    setShowWeatherModal,
    showRoutesModal,
    setShowRoutesModal,
    showEventsModal,
    setShowEventsModal,
    isTotemActive,
    setIsTotemActive,
    showEcoLayer,
    setShowEcoLayer,
    isSatellite,
    setIsSatellite,
    flyToLocation,
  } = useMapStore();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      // Ignored if forbidden in iframe
    }
  };

  const handleCityChange = (city: CityFilter) => {
    setActiveCity(city);
    if (city === "Pontal do Paraná") {
      flyToLocation(-48.4, -25.56, 11.5);
    } else if (city === "Paranaguá") {
      flyToLocation(-48.51, -25.52, 12.8);
    } else if (city === "Ilha do Mel") {
      flyToLocation(-48.31, -25.52, 12.5);
    } else {
      flyToLocation(-48.43, -25.545, 10.8);
    }
  };

  return (
    <header
      className="header-glow absolute z-30 flex flex-col rounded-2xl backdrop-blur-2xl border border-white/10 pointer-events-auto overflow-hidden"
      style={{
        background:
          "linear-gradient(145deg, rgba(8,18,42,0.97) 0%, rgba(11,24,52,0.95) 100%)",
        top: "max(0.625rem, env(safe-area-inset-top))",
        left: "max(0.625rem, env(safe-area-inset-left))",
        right: "max(0.625rem, env(safe-area-inset-right))",
        width: "auto",
        maxWidth: "1100px",
        marginInline: "auto",
      }}
    >
      {/* ── Main row ── */}
      <div className="flex min-w-0 items-center gap-1.5 px-2.5 py-2 sm:gap-2 sm:px-4 sm:py-2.5">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base shadow-lg flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #0d7a8a, #22c5d9)",
              boxShadow: "0 2px 14px rgba(34,197,217,0.35)",
            }}
          >
            🌊
          </div>
          <div className="hidden sm:block flex-shrink-0">
            <div className="text-sm font-bold text-white leading-tight tracking-tight">
              EcoPortal
            </div>
            <div className="text-[9px] text-cyan-400/75 font-semibold tracking-widest uppercase">
              Litoral do Paraná
            </div>
          </div>
        </div>

        {/* Desktop City Tabs */}
        <div className="hidden lg:flex items-center gap-0.5 bg-white/5 p-0.5 rounded-xl border border-white/6 flex-shrink-0">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => handleCityChange(c)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCity === c
                  ? "bg-cyan-500 text-slate-950 shadow-sm"
                  : "text-white/50 hover:text-white hover:bg-white/8"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Search trigger */}
        <button
          onClick={() => setShowSearchDialog(true)}
          className="flex-1 min-w-0 flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-white/35 hover:text-white/65 bg-white/5 hover:bg-white/8 border border-white/6 transition-all cursor-pointer sm:px-3"
        >
          <Search size={13} className="text-cyan-400 flex-shrink-0" />
          <span className="text-[11px] truncate hidden sm:inline">
            Buscar praias, história, mangues...
          </span>
          <span className="text-[11px] text-white/30 sm:hidden">Buscar...</span>
          <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[9px] font-mono bg-white/8 text-white/35 rounded border border-white/10 flex-shrink-0">
            /
          </kbd>
        </button>

        {/* Action Buttons */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Roteiros */}
          <button
            onClick={() => setShowRoutesModal(!showRoutesModal)}
            className={`hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer border flex-shrink-0 ${
              showRoutesModal
                ? "bg-amber-500 text-slate-950 border-amber-400 shadow-sm shadow-amber-500/25"
                : "bg-amber-500/10 text-amber-300 border-amber-500/22 hover:bg-amber-500/20"
            }`}
            title="Roteiros Turísticos & Circuitos Guiados"
          >
            <Footprints size={14} />
            <span className="hidden sm:inline">Roteiros</span>
          </button>

          {/* Eventos */}
          <button
            onClick={() => setShowEventsModal(!showEventsModal)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer border flex-shrink-0 ${
              showEventsModal
                ? "bg-purple-500 text-white border-purple-400 shadow-sm shadow-purple-500/25"
                : "bg-purple-500/10 text-purple-300 border-purple-500/22 hover:bg-purple-500/20"
            }`}
            title="Calendário Cultural & Festividades"
          >
            <Calendar size={14} />
            <span className="hidden md:inline">Eventos</span>
          </button>

          {/* Marés & Clima */}
          <button
            onClick={() => setShowWeatherModal(!showWeatherModal)}
            className={`flex items-center gap-1 px-2 py-1.5 rounded-xl text-[11px] font-semibold transition-all cursor-pointer border flex-shrink-0 ${
              showWeatherModal
                ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm shadow-cyan-500/25"
                : "bg-cyan-500/10 text-cyan-300 border-cyan-500/22 hover:bg-cyan-500/20"
            }`}
            title="Tábua de Marés & Condições Climáticas"
          >
            <Waves size={14} />
            <span className="hidden lg:inline">Marés</span>
          </button>

          {/* Eco Layer */}
          <button
            onClick={() => setShowEcoLayer((v) => !v)}
            className={`hidden sm:block p-2 rounded-xl transition-all cursor-pointer border flex-shrink-0 ${
              showEcoLayer
                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                : "bg-white/5 text-white/35 border-white/6 hover:text-white hover:bg-white/8"
            }`}
            title="Alternar camada de Preservação Ambiental & Mata Atlântica"
          >
            <Trees size={14} className={showEcoLayer ? "text-emerald-400" : ""} />
          </button>

          {/* Totem */}
          <button
            onClick={() => setIsTotemActive(!isTotemActive)}
            className={`p-2 rounded-xl transition-all cursor-pointer hidden sm:flex flex-shrink-0 ${
              isTotemActive
                ? "bg-cyan-400/90 text-slate-950 shadow-sm shadow-cyan-400/30"
                : "text-white/45 hover:text-white hover:bg-white/8"
            }`}
            title="Modo Apresentação Automática (Totem)"
          >
            <Sparkles size={14} />
          </button>

          {/* Satellite */}
          <button
            onClick={() => setIsSatellite((v) => !v)}
            className="p-2 rounded-xl text-white/45 hover:text-white hover:bg-white/8 transition-colors cursor-pointer hidden sm:flex flex-shrink-0"
            title={isSatellite ? "Mudar para Mapa Noturno" : "Mudar para Satélite"}
          >
            <Layers size={14} />
          </button>

          {/* Geolocation */}
          <button
            onClick={onGeolocate}
            className="p-2 rounded-xl text-white/45 hover:text-white hover:bg-white/8 transition-colors cursor-pointer flex-shrink-0"
            title="Minha Localização"
          >
            <Navigation2 size={14} />
          </button>

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-white/45 hover:text-white hover:bg-white/8 transition-colors cursor-pointer hidden md:flex flex-shrink-0"
            title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
          >
            {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
        </div>
      </div>

      {/* ── Mobile City Selector Row (< lg) ── */}
      <div className="lg:hidden border-t border-white/6 px-3 py-1.5">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => handleCityChange(c)}
              className={`flex-shrink-0 px-3 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCity === c
                  ? "bg-cyan-500 text-slate-950"
                  : "bg-white/6 text-white/50 hover:text-white hover:bg-white/10 border border-white/8"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
