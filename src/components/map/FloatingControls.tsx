"use client";

import { useMapStore } from "@/store/useMapStore";
import { Layers, Compass, Plus, Minus, Navigation2, Trees } from "lucide-react";

interface FloatingControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onGeolocate: () => void;
}

export function FloatingControls({
  onZoomIn,
  onZoomOut,
  onGeolocate,
}: FloatingControlsProps) {
  const {
    isSatellite,
    setIsSatellite,
    pitch3D,
    togglePitch3D,
    showEcoLayer,
    setShowEcoLayer,
    resetToOverview,
  } = useMapStore();

  return (
    <div className="absolute bottom-8 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
      {/* Zoom controls */}
      <div
        className="flex flex-col rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white/10"
        style={{ background: "rgba(8, 18, 38, 0.88)" }}
      >
        <button
          onClick={onZoomIn}
          aria-label="Aumentar zoom"
          className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-b border-white/5"
          title="Aproximar (+)"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={onZoomOut}
          aria-label="Diminuir zoom"
          className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Afastar (-)"
        >
          <Minus size={16} />
        </button>
      </div>

      {/* Map mode and layer buttons */}
      <div
        className="flex flex-col rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl border border-white/10"
        style={{ background: "rgba(8, 18, 38, 0.88)" }}
      >
        {/* Toggle 3D pitch */}
        <button
          onClick={togglePitch3D}
          className={`p-2.5 transition-colors cursor-pointer flex items-center justify-center border-b border-white/5 ${
            pitch3D
              ? "bg-cyan-500/20 text-cyan-400 font-bold"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
          title={pitch3D ? "Visão Plana 2D" : "Visão 3D Inclinada"}
        >
          <span className="text-xs font-bold leading-none">3D</span>
        </button>

        {/* Toggle Satellite / Dark Map */}
        <button
          onClick={() => setIsSatellite((prev) => !prev)}
          className={`p-2.5 transition-colors cursor-pointer border-b border-white/5 ${
            isSatellite
              ? "text-cyan-400 bg-cyan-500/10"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
          title={
            isSatellite
              ? "Mudar para Mapa Vetorial Escuro"
              : "Mudar para Imagem de Satélite"
          }
        >
          <Layers size={16} />
        </button>

        {/* Toggle Eco Layer */}
        <button
          onClick={() => setShowEcoLayer((prev) => !prev)}
          className={`p-2.5 transition-colors cursor-pointer border-b border-white/5 ${
            showEcoLayer
              ? "text-emerald-400 bg-emerald-500/15"
              : "text-white/40 hover:text-white hover:bg-white/10"
          }`}
          title={
            showEcoLayer
              ? "Ocultar Áreas de Preservação"
              : "Exibir Áreas de Preservação & Mata Atlântica"
          }
        >
          <Trees size={16} />
        </button>

        {/* GPS Geolocate */}
        <button
          onClick={onGeolocate}
          className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-b border-white/5"
          title="Minha Localização"
        >
          <Navigation2 size={16} />
        </button>

        {/* Reset view */}
        <button
          onClick={resetToOverview}
          className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          title="Centralizar Litoral Paranaense"
        >
          <Compass size={16} />
        </button>
      </div>
    </div>
  );
}
