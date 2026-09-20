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
  MapPin,
  ChevronDown,
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
      className="absolute top-3 sm:top-3.5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-between gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl sm:rounded-3xl shadow-2xl backdrop-blur-2xl border border-white/15 pointer-events-auto"
      style={{
        background: "rgba(8, 18, 38, 0.95)",
        width: "calc(100% - 1.5rem)",
        maxWidth: "1380px",
        boxShadow:
          "0 14px 40px rgba(0,0,0,0.6), 0 0 24px rgba(34,197,217,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* ── Left: Logo + City Selector ── */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-base sm:text-lg shadow-lg shrink-0"
            style={{ background: "linear-gradient(135deg, #0d7a8a, #22c5d9)" }}
          >
            🌊
          </div>
          <div className="hidden md:block">
            <div className="text-xs sm:text-sm font-bold text-white leading-none">
              EcoPortal
            </div>
            <div className="text-[9px] text-cyan-300 font-semibold tracking-wider uppercase mt-0.5">
              Litoral do Paraná
            </div>
          </div>
        </div>

        <div className="w-px h-6 bg-white/10 hidden sm:block" />

        {/* City Switcher - Segmented Pills on XL screens */}
        <div className="hidden 2xl:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5 shrink-0">
          {CITIES.map((c) => (
            <button
              key={c}
              onClick={() => handleCityChange(c)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                activeCity === c
                  ? "bg-cyan-500 text-slate-950 shadow-md font-bold"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Compact Dropdown on Medium/Smaller screens */}
        <div className="relative 2xl:hidden flex items-center">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-white/80 hover:bg-white/10 transition-colors">
            <MapPin size={13} className="text-cyan-400 shrink-0" />
            <select
              value={activeCity}
              onChange={(e) => handleCityChange(e.target.value as CityFilter)}
              className="bg-transparent text-white text-xs font-semibold focus:outline-none cursor-pointer appearance-none pr-4"
              style={{ colorScheme: "dark" }}
            >
              {CITIES.map((c) => (
                <option key={c} value={c} className="bg-slate-900 text-white">
                  {c}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="text-white/40 absolute right-2 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* ── Center: Search Trigger ── */}
      <button
        onClick={() => setShowSearchDialog(true)}
        className="flex-1 flex items-center justify-between gap-2 px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm text-white/40 hover:text-white/75 bg-white/5 hover:bg-white/10 border border-white/5 transition-all cursor-pointer min-w-[130px] max-w-sm"
      >
        <div className="flex items-center gap-2 truncate">
          <Search size={14} className="text-cyan-400 shrink-0" />
          <span className="truncate">Buscar praias, história, mangues...</span>
        </div>
        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/10 text-white/60 rounded border border-white/10 shrink-0">
          /
        </kbd>
      </button>

      {/* ── Right: Action Buttons & Navigation Modals ── */}
      <div className="flex items-center gap-1 sm:gap-2 shrink-0">
        {/* Roteiros Guiados Button */}
        <button
          onClick={() => setShowRoutesModal(!showRoutesModal)}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border whitespace-nowrap ${
            showRoutesModal
              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 font-bold"
              : "bg-amber-500/15 text-amber-300 border-amber-500/30 hover:bg-amber-500/25"
          }`}
          title="Roteiros Turísticos & Circuitos Guiados"
        >
          <Footprints size={14} className="shrink-0" />
          <span className="hidden sm:inline">Roteiros</span>
        </button>

        {/* Calendário de Eventos Button */}
        <button
          onClick={() => setShowEventsModal(!showEventsModal)}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border whitespace-nowrap ${
            showEventsModal
              ? "bg-purple-500 text-white border-purple-400 shadow-lg shadow-purple-500/20 font-bold"
              : "bg-purple-500/15 text-purple-300 border-purple-500/30 hover:bg-purple-500/25"
          }`}
          title="Calendário Cultural & Festividades"
        >
          <Calendar size={14} className="shrink-0" />
          <span className="hidden md:inline">Eventos</span>
        </button>

        {/* Weather & Tides Button */}
        <button
          onClick={() => setShowWeatherModal(!showWeatherModal)}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border whitespace-nowrap ${
            showWeatherModal
              ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20 font-bold"
              : "bg-cyan-500/15 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/25"
          }`}
          title="Tábua de Marés & Condições Climáticas"
        >
          <Waves size={14} className="shrink-0" />
          <span className="hidden lg:inline">Marés & Clima</span>
        </button>

        {/* Eco Layer Toggle */}
        <button
          onClick={() => setShowEcoLayer((v) => !v)}
          className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer border whitespace-nowrap ${
            showEcoLayer
              ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
              : "bg-white/5 text-white/40 border-white/5 hover:text-white"
          }`}
          title="Alternar camada de Preservação Ambiental & Mata Atlântica"
        >
          <Trees
            size={14}
            className={`shrink-0 ${showEcoLayer ? "text-emerald-400" : ""}`}
          />
          <span className="hidden xl:inline">Preservação</span>
        </button>

        <div className="w-px h-5 bg-white/10 mx-0.5 hidden sm:block" />

        {/* Quick Utilities: Totem, Satellite, Geolocation, Fullscreen */}
        <div className="flex items-center gap-1">
          {/* Modo Totem / Apresentação */}
          <button
            onClick={() => setIsTotemActive(!isTotemActive)}
            className={`p-2 rounded-xl transition-all cursor-pointer hidden sm:flex items-center justify-center ${
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
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer hidden sm:flex items-center justify-center"
            title={
              isSatellite ? "Mudar para Mapa Noturno" : "Mudar para Satélite"
            }
          >
            <Layers size={15} />
          </button>

          {/* Geolocation Button */}
          <button
            onClick={onGeolocate}
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
            title="Minha Localização GPS"
          >
            <Navigation2 size={15} />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer hidden md:flex items-center justify-center"
            title={isFullscreen ? "Sair da Tela Cheia" : "Tela Cheia"}
          >
            {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}
