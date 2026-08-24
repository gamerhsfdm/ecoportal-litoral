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
      className="absolute top-4 left-1/2 -translate-x-1/2 z-30 flex items-center justify-between gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl shadow-2xl backdrop-blur-2xl border border-white/15 pointer-events-auto"
      style={{
        background: "rgba(8, 18, 38, 0.92)",
        width: "calc(100% - 1.5rem)",
        maxWidth: "1080px",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div
          className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-lg shadow-lg"
          style={{ background: "linear-gradient(135deg, #0d7a8a, #22c5d9)" }}
        >
          🌊
        </div>
        <div className="hidden md:block">
          <div className="text-xs sm:text-sm font-bold text-white leading-none">
            EcoPortal
          </div>
          <div className="text-[9px] text-cyan-300 font-semibold tracking-wider uppercase">
            Litoral do Paraná
          </div>
        </div>
      </div>

      <div className="w-px h-6 bg-white/10 mx-0.5 hidden md:block" />

      {/* City Switcher Tabs */}
      <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
        {CITIES.map((c) => (
          <button
            key={c}
            onClick={() => handleCityChange(c)}
            className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeCity === c
                ? "bg-cyan-500 text-slate-950 shadow-md"
                : "text-white/60 hover:text-white hover:bg-white/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Search trigger */}
      <button
        onClick={() => setShowSearchDialog(true)}
        className="flex-1 flex items-center justify-between gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm text-white/40 hover:text-white/70 bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer min-w-0"
      >
        <div className="flex items-center gap-2 truncate">
          <Search size={14} className="text-cyan-400 shrink-0" />
          <span className="truncate">Buscar praias, história, mangues...</span>
        </div>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/10 text-white/60 rounded border border-white/10 shrink-0">
          /
        </kbd>
      </button>

      {/* Action Buttons */}
      <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
        {/* Roteiros Guiados Button */}
        <button
          onClick={() => setShowRoutesModal(!showRoutesModal)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
            showRoutesModal
              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20"
              : "bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25"
          }`}
          title="Roteiros Turísticos & Circuitos Guiados"
        >
          <Footprints size={14} />
          <span className="hidden sm:inline">Roteiros</span>
        </button>

        {/* Calendário de Eventos Button */}
        <button
          onClick={() => setShowEventsModal(!showEventsModal)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
            showEventsModal
              ? "bg-purple-500 text-white border-purple-400 shadow-lg shadow-purple-500/20"
              : "bg-purple-500/15 text-purple-300 border-purple-500/30 hover:bg-purple-500/25"
          }`}
          title="Calendário Cultural & Festividades"
        >
          <Calendar size={14} />
          <span className="hidden md:inline">Eventos</span>
        </button>

        {/* Weather & Tides Button */}
        <button
          onClick={() => setShowWeatherModal(!showWeatherModal)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
            showWeatherModal
              ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20"
              : "bg-cyan-500/15 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/25"
          }`}
          title="Tábua de Marés & Condições Climáticas"
        >
          <Waves size={14} />
          <span className="hidden lg:inline">Marés & Clima</span>
        </button>

        {/* Eco Layer Toggle */}
        <button
          onClick={() => setShowEcoLayer((v) => !v)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${
            showEcoLayer
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
              : "bg-white/5 text-white/40 border-white/5 hover:text-white"
          }`}
          title="Alternar camada de Preservação Ambiental & Mata Atlântica"
        >
          <Trees size={14} className={showEcoLayer ? "text-emerald-400" : ""} />
          <span className="hidden xl:inline">Preservação</span>
        </button>

        {/* Modo Totem / Apresentação */}
        <button
          onClick={() => setIsTotemActive(!isTotemActive)}
          className={`p-2 rounded-xl transition-all cursor-pointer hidden sm:flex ${
            isTotemActive
              ? "bg-cyan-400 text-slate-950 font-bold shadow-md shadow-cyan-400/30 animate-pulse"
              : "text-white/60 hover:text-white hover:bg-white/10"
          }`}
          title="Modo Apresentação Automática (Totem)"
        >
          <Sparkles size={15} />
        </button>

        {/* Satellite Toggle */}
        <button
          onClick={() => setIsSatellite((v) => !v)}
          className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer hidden sm:flex"
          title={isSatellite ? "Mudar para Mapa Noturno" : "Mudar para Satélite"}
        >
          <Layers size={15} />
        </button>

        {/* Geolocation Button */}
        <button
          onClick={onGeolocate}
          className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Minha Localização"
        >
          <Navigation2 size={15} />
        </button>

        {/* Fullscreen Button */}
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer hidden md:flex"
          title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>
    </header>
  );
}
