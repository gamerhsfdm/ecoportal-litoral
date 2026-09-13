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
    <div className="absolute bottom-6 right-3 sm:bottom-8 sm:right-4 z-20 flex flex-col gap-2 pointer-events-auto">
      {/* Zoom controls */}
      <div
        className="flex flex-col rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl border border-white/10"
        style={{
          background:
            "linear-gradient(165deg, rgba(8, 22, 46, 0.94) 0%, rgba(6, 16, 36, 0.96) 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        <button
          onClick={onZoomIn}
          aria-label="Aumentar zoom"
          className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-b border-white/5 active:scale-95 flex items-center justify-center"
          title="Aproximar (+)"
        >
          <Plus size={15} />
        </button>
        <button
          onClick={onZoomOut}
          aria-label="Diminuir zoom"
          className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer active:scale-95 flex items-center justify-center"
          title="Afastar (-)"
        >
          <Minus size={15} />
        </button>
      </div>

      {/* Map mode and layer buttons */}
      <div
        className="flex flex-col rounded-2xl overflow-hidden shadow-2xl backdrop-blur-2xl border border-white/10"
        style={{
          background:
            "linear-gradient(165deg, rgba(8, 22, 46, 0.94) 0%, rgba(6, 16, 36, 0.96) 100%)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        }}
      >
        {/* Toggle 3D pitch */}
        <button
          onClick={togglePitch3D}
          className={`p-2.5 transition-all cursor-pointer flex items-center justify-center border-b border-white/5 active:scale-95 ${
            pitch3D
              ? "bg-cyan-500/20 text-cyan-300 font-bold"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
          title={pitch3D ? "Visão Plana 2D" : "Visão 3D Inclinada"}
        >
          <span className="text-[11px] font-black leading-none tracking-wider">
            3D
          </span>
        </button>

        {/* Toggle Satellite / Dark Map */}
        <button
          onClick={() => setIsSatellite((prev) => !prev)}
          className={`p-2.5 transition-all cursor-pointer border-b border-white/5 active:scale-95 flex items-center justify-center ${
            isSatellite
              ? "text-cyan-400 bg-cyan-500/10"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
          title={
            isSatellite
              ? "Mudar para Mapa Noturno"
              : "Mudar para Imagem de Satélite"
          }
        >
          <Layers size={15} />
        </button>

        {/* Toggle Eco Layer */}
        <button
          onClick={() => setShowEcoLayer((prev) => !prev)}
          className={`p-2.5 transition-all cursor-pointer border-b border-white/5 active:scale-95 flex items-center justify-center ${
            showEcoLayer
              ? "text-emerald-300 bg-emerald-500/20"
              : "text-white/40 hover:text-white hover:bg-white/10"
          }`}
          title={
            showEcoLayer
              ? "Ocultar Áreas de Preservação"
              : "Exibir Áreas de Preservação & Mata Atlântica"
          }
        >
          <Trees size={15} />
        </button>

        {/* GPS Geolocate */}
        <button
          onClick={onGeolocate}
          className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border-b border-white/5 active:scale-95 flex items-center justify-center"
          title="Minha Localização"
        >
          <Navigation2 size={15} />
        </button>

        {/* Reset view */}
        <button
          onClick={resetToOverview}
          className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer active:scale-95 flex items-center justify-center"
          title="Centralizar Litoral Paranaense"
        >
          <Compass size={15} />
        </button>
      </div>
    </div>
  );
}
