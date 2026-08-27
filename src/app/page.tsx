"use client";

import { useRef, useEffect, useCallback } from "react";
import type { MapRef } from "react-map-gl/maplibre";
import { useMapStore } from "@/store/useMapStore";
import { useGeolocation } from "@/hooks/useGeolocation";
import { MapView } from "@/components/map/MapView";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { FloatingControls } from "@/components/map/FloatingControls";
import { AttractionDetailSheet } from "@/components/sheet/AttractionDetailSheet";
import { EcoAreaModal } from "@/components/eco/EcoAreaModal";
import { EcoLegend } from "@/components/eco/EcoLegend";
import { WeatherTideModal } from "@/components/weather/WeatherTideModal";
import { SearchDialog } from "@/components/search/SearchDialog";
import { RoutesModal } from "@/components/routes/RoutesModal";
import { ActiveRouteController } from "@/components/routes/ActiveRouteController";
import { EventsModal } from "@/components/events/EventsModal";
import { TotemController } from "@/components/totem/TotemController";

export default function Home() {
  const mapRef = useRef<MapRef>(null);
  const { setUserLocation } = useMapStore();
  const { lat, lng, requestLocation } = useGeolocation();

  // Sync GPS location to store when available
  useEffect(() => {
    if (lat !== null && lng !== null) {
      setUserLocation({ lat, lng });
    }
  }, [lat, lng, setUserLocation]);

  const handleGeolocate = useCallback(() => {
    requestLocation();
    if (lat !== null && lng !== null) {
      mapRef.current?.flyTo({
        center: [lng, lat],
        zoom: 14,
        duration: 1200,
      });
    }
  }, [lat, lng, requestLocation]);

  const handleZoomIn = useCallback(() => {
    mapRef.current?.zoomIn({ duration: 300 });
  }, []);

  const handleZoomOut = useCallback(() => {
    mapRef.current?.zoomOut({ duration: 300 });
  }, []);

  return (
    <main
      className="relative w-full h-full overflow-hidden select-none app-shell"
      style={{ fontFamily: "'Outfit', sans-serif" }}
    >
      {/* ─── Interactive Map with Polyline Tours & Eco Polygons ─── */}
      <MapView mapRef={mapRef} />
      <div className="map-atmosphere" aria-hidden="true" />

      {/* ─── Top Navigation Header with Routes & Events ─── */}
      <Header onGeolocate={handleGeolocate} />

      {/* ─── Left Categories & Attractions Sidebar ─── */}
      <Sidebar />

      {/* ─── Floating Map Controls (Zoom, 3D, Satellite, GPS) ─── */}
      <FloatingControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onGeolocate={handleGeolocate}
      />

      {/* ─── Visual Legend for Environmental Preservation Areas ─── */}
      <EcoLegend />

      {/* ─── Active Route Step-by-Step Floating Controller ─── */}
      <ActiveRouteController />

      {/* ─── Attraction Details Drawer Sheet ─── */}
      <AttractionDetailSheet />

      {/* ─── Environmental Preservation / Mata Atlântica Modal ─── */}
      <EcoAreaModal />

      {/* ─── Weather, Forecast & Tide Tables Modal ─── */}
      <WeatherTideModal />

      {/* ─── Guided Tour Routes Modal ─── */}
      <RoutesModal />

      {/* ─── Cultural Calendar & Traditional Events Modal ─── */}
      <EventsModal />

      {/* ─── Totem Presentation Mode / Auto-Tour Controller ─── */}
      <TotemController mapRef={mapRef} />

      {/* ─── Global Fuzzy Search Dialog (Ctrl+K or /) ─── */}
      <SearchDialog />
    </main>
  );
}
