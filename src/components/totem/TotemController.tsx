"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useMapStore } from "@/store/useMapStore";
import type { MapRef } from "react-map-gl/maplibre";
import { Sparkles, X } from "lucide-react";

interface TotemControllerProps {
  mapRef: React.RefObject<MapRef | null>;
}

// Key stops for auto-presentation
const DEMO_POINTS = [
  {
    name: "Ilha do Mel — Farol & Praias",
    lng: -48.3,
    lat: -25.51,
    zoom: 13.8,
    pitch: 55,
    bearing: -30,
  },
  {
    name: "Centro Histórico de Paranaguá",
    lng: -48.51,
    lat: -25.52,
    zoom: 14.5,
    pitch: 50,
    bearing: 45,
  },
  {
    name: "Parque Nacional Saint-Hilaire/Lange (Mata Atlântica)",
    lng: -48.52,
    lat: -25.55,
    zoom: 12.8,
    pitch: 60,
    bearing: 90,
  },
  {
    name: "Pontal do Sul & Santuário dos Botos",
    lng: -48.35,
    lat: -25.57,
    zoom: 13.5,
    pitch: 48,
    bearing: 180,
  },
  {
    name: "Praia de Leste & Balneários",
    lng: -48.38,
    lat: -25.58,
    zoom: 13.2,
    pitch: 45,
    bearing: 220,
  },
];

export function TotemController({ mapRef }: TotemControllerProps) {
  const {
    isTotemActive,
    setIsTotemActive,
    showWeatherModal,
    showRoutesModal,
    showEventsModal,
    showSearchDialog,
    detailAttraction,
    selectedEcoArea,
  } = useMapStore();

  const [currentDemoIndex, setCurrentDemoIndex] = useState(0);
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Stop totem mode on any direct user interaction
  const handleUserActivity = useCallback(() => {
    if (isTotemActive) {
      setIsTotemActive(false);
    }

    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current);
    }

    // Don't start auto-idle if any modal or sheet is currently open
    const hasOpenModal =
      showWeatherModal ||
      showRoutesModal ||
      showEventsModal ||
      showSearchDialog ||
      detailAttraction !== null ||
      selectedEcoArea !== null;

    if (!hasOpenModal) {
      idleTimerRef.current = setTimeout(() => {
        setIsTotemActive(true);
      }, 70000); // 70 seconds of idle
    }
  }, [
    isTotemActive,
    setIsTotemActive,
    showWeatherModal,
    showRoutesModal,
    showEventsModal,
    showSearchDialog,
    detailAttraction,
    selectedEcoArea,
  ]);

  // Attach global event listeners for user activity
  useEffect(() => {
    const events = ["pointerdown", "keydown", "touchstart", "wheel"];
    events.forEach((evt) =>
      window.addEventListener(evt, handleUserActivity, { passive: true }),
    );

    // Initialize timer
    idleTimerRef.current = setTimeout(() => {
      setIsTotemActive(true);
    }, 70000);

    return () => {
      events.forEach((evt) =>
        window.removeEventListener(evt, handleUserActivity),
      );
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [handleUserActivity, setIsTotemActive]);

  // Handle tour progression when totem mode is active
  useEffect(() => {
    if (!isTotemActive) return;

    const point = DEMO_POINTS[currentDemoIndex];
    mapRef.current?.flyTo({
      center: [point.lng, point.lat],
      zoom: point.zoom,
      pitch: point.pitch,
      bearing: point.bearing,
      duration: 5000,
      essential: true,
    });

    const interval = setInterval(() => {
      setCurrentDemoIndex((prev) => (prev + 1) % DEMO_POINTS.length);
    }, 8500);

    return () => clearInterval(interval);
  }, [isTotemActive, currentDemoIndex, mapRef]);

  if (!isTotemActive) return null;

  const currentPoint = DEMO_POINTS[currentDemoIndex];

  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 animate-fade-in pointer-events-auto">
      <div
        className="px-5 py-2.5 rounded-2xl shadow-2xl backdrop-blur-2xl border border-cyan-400/40 text-white flex items-center gap-3"
        style={{ background: "rgba(6, 18, 36, 0.95)" }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-cyan-300 animate-pulse" />
          <span className="text-xs font-bold text-cyan-200">
            Apresentação Automática:
          </span>
          <span className="text-xs text-white/90 font-medium">
            {currentPoint.name}
          </span>
        </div>

        <div className="w-px h-4 bg-white/20 mx-1" />

        <button
          onClick={() => setIsTotemActive(false)}
          className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1"
        >
          <span>Interagir</span>
          <X size={12} />
        </button>
      </div>
    </div>
  );
}
