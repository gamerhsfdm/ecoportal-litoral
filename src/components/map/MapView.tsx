"use client";

import { useMemo, useCallback } from "react";
import Map, {
  Marker,
  Popup,
  Source,
  Layer,
  type MapRef,
  type MapLayerMouseEvent,
} from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import Image from "next/image";
import { useMapStore } from "@/store/useMapStore";
import { attractions, CATEGORY_CONFIG } from "@/data/attractions";
import { ecoAreas } from "@/data/ecoAreas";
import { Attraction, RouteStop } from "@/types";
import { X, ChevronRight } from "lucide-react";
import type { FeatureCollection, Polygon } from "geojson";

// Map Tile Styles
const SATELLITE_STYLE = {
  version: 8 as const,
  sources: {
    "esri-satellite": {
      type: "raster" as const,
      tiles: [
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      ],
      tileSize: 256,
      attribution: "Tiles &copy; Esri",
      maxzoom: 19,
    },
    "carto-labels": {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
      attribution: "&copy; CartoDB",
    },
  },
  layers: [
    {
      id: "esri-satellite",
      type: "raster" as const,
      source: "esri-satellite",
    },
    {
      id: "carto-labels",
      type: "raster" as const,
      source: "carto-labels",
    },
  ],
};

const STREET_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

interface MapViewProps {
  mapRef: React.RefObject<MapRef | null>;
}

export function MapView({ mapRef }: MapViewProps) {
  const {
    viewState,
    setViewState,
    isSatellite,
    showEcoLayer,
    activeCategories,
    activeCity,
    selectedAttraction,
    setSelectedAttraction,
    setDetailAttraction,
    setSelectedEcoArea,
    userLocation,
    activeRoute,
    currentStopIndex,
    setCurrentStopIndex,
    selectedEvent,
    setSelectedEvent,
  } = useMapStore();

  // Filtered attractions based on Category and City
  const filteredAttractions = useMemo(() => {
    return attractions.filter((a) => {
      const matchCategory = activeCategories.has(a.category);
      const matchCity = activeCity === "Todos" || a.city === activeCity;
      return matchCategory && matchCity;
    });
  }, [activeCategories, activeCity]);

  // GeoJSON FeatureCollection for Conservation Areas
  const ecoGeoJson: FeatureCollection<Polygon> = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: ecoAreas.map((area) => ({
        type: "Feature",
        id: area.id,
        properties: {
          id: area.id,
          name: area.name,
          category: area.category,
          color: area.color,
          fillOpacity: area.fillOpacity || 0.25,
        },
        geometry: {
          type: "Polygon",
          coordinates: area.coordinates,
        },
      })),
    };
  }, []);

  // GeoJSON LineString for Active Tour Route
  const routeGeoJson = useMemo(() => {
    if (!activeRoute) return null;
    return {
      type: "Feature" as const,
      properties: {
        color: activeRoute.color,
      },
      geometry: {
        type: "LineString" as const,
        coordinates: activeRoute.coordinates,
      },
    };
  }, [activeRoute]);

  // Sync internal map movement with store
  const handleMove = useCallback(
    (evt: { viewState: typeof viewState }) => {
      setViewState(evt.viewState);
    },
    [setViewState],
  );

  const handleAttractionClick = useCallback(
    (attraction: Attraction) => {
      setSelectedAttraction(attraction);
      mapRef.current?.flyTo({
        center: [attraction.lng, attraction.lat],
        zoom: 14.5,
        duration: 1200,
      });
    },
    [setSelectedAttraction, mapRef],
  );

  const handleStopClick = useCallback(
    (stop: RouteStop, index: number) => {
      setCurrentStopIndex(index);
      mapRef.current?.flyTo({
        center: [stop.coordinates[0], stop.coordinates[1]],
        zoom: 14.5,
        duration: 1000,
      });
    },
    [setCurrentStopIndex, mapRef],
  );

  // Handle click on GeoJSON Eco Layer polygon
  const handleMapClick = useCallback(
    (e: MapLayerMouseEvent) => {
      if (!showEcoLayer) return;
      const features = e.features;
      if (features && features.length > 0) {
        const ecoFeature = features.find(
          (f) => f.layer.id === "eco-polygons-fill",
        );
        if (ecoFeature && ecoFeature.properties?.id) {
          const area = ecoAreas.find((a) => a.id === ecoFeature.properties?.id);
          if (area) {
            setSelectedEcoArea(area);
            mapRef.current?.flyTo({
              center: area.center,
              zoom: 12,
              duration: 1200,
            });
          }
        }
      }
    },
    [showEcoLayer, setSelectedEcoArea, mapRef],
  );

  return (
    <div className="relative w-full h-full">
      <Map
        ref={mapRef}
        {...viewState}
        onMove={handleMove}
        mapStyle={isSatellite ? SATELLITE_STYLE : STREET_STYLE}
        style={{ width: "100%", height: "100%" }}
        attributionControl={false}
        interactiveLayerIds={showEcoLayer ? ["eco-polygons-fill"] : []}
        onClick={handleMapClick}
      >
        {/* Environmental Preservation Areas (GeoJSON Layer) */}
        {showEcoLayer && (
          <Source id="eco-areas-source" type="geojson" data={ecoGeoJson}>
            {/* Polygon fill */}
            <Layer
              id="eco-polygons-fill"
              type="fill"
              paint={{
                "fill-color": ["get", "color"],
                "fill-opacity": ["get", "fillOpacity"],
              }}
            />
            {/* Polygon border */}
            <Layer
              id="eco-polygons-line"
              type="line"
              paint={{
                "line-color": ["get", "color"],
                "line-width": 2,
                "line-dasharray": [2, 1],
              }}
            />
          </Source>
        )}

        {/* Active Tour Route LineString Layer */}
        {routeGeoJson && (
          <Source id="active-route-source" type="geojson" data={routeGeoJson}>
            {/* Glow line */}
            <Layer
              id="route-glow-line"
              type="line"
              paint={{
                "line-color": activeRoute?.color || "#fbbf24",
                "line-width": 8,
                "line-opacity": 0.35,
              }}
            />
            {/* Main route line */}
            <Layer
              id="route-main-line"
              type="line"
              paint={{
                "line-color": activeRoute?.color || "#fbbf24",
                "line-width": 4,
                "line-dasharray": [2, 1],
              }}
            />
          </Source>
        )}

        {/* User GPS Location Marker */}
        {userLocation && (
          <Marker
            longitude={userLocation.lng}
            latitude={userLocation.lat}
            anchor="center"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-cyan-500/30 animate-ping absolute" />
              <div className="w-4 h-4 rounded-full bg-cyan-400 border-2 border-white shadow-lg z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
          </Marker>
        )}

        {/* Numbered Stops Markers if Active Route is on */}
        {activeRoute &&
          activeRoute.stops.map((stop, idx) => {
            const isCurrentStop = idx === currentStopIndex;
            return (
              <Marker
                key={stop.attractionId}
                longitude={stop.coordinates[0]}
                latitude={stop.coordinates[1]}
                anchor="center"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  handleStopClick(stop, idx);
                }}
              >
                <div
                  className="relative cursor-pointer group flex items-center justify-center"
                  style={{
                    transform: isCurrentStop ? "scale(1.3)" : "scale(1)",
                    transition:
                      "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  {isCurrentStop && (
                    <div
                      className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        backgroundColor: activeRoute.color,
                        opacity: 0.6,
                      }}
                    />
                  )}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-2xl border-2 border-white z-10"
                    style={{
                      background: isCurrentStop ? "#ffffff" : activeRoute.color,
                      color: isCurrentStop ? activeRoute.color : "#081226",
                    }}
                  >
                    {stop.order}
                  </div>

                  {/* Tooltip */}
                  <div
                    className="absolute bottom-10 whitespace-nowrap px-2.5 py-1 rounded-xl text-xs font-bold text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl border border-white/20 z-30"
                    style={{ background: "rgba(6, 18, 34, 0.95)" }}
                  >
                    <span>{stop.title}</span>
                  </div>
                </div>
              </Marker>
            );
          })}

        {/* Regular Tourist Attraction Markers (hidden when activeRoute is running to avoid clutter) */}
        {!activeRoute &&
          filteredAttractions.map((attraction) => {
            const cfg = CATEGORY_CONFIG[attraction.category] || {
              color: "#22c5d9",
              icon: "📍",
            };
            const isSelected = selectedAttraction?.id === attraction.id;

            return (
              <Marker
                key={attraction.id}
                longitude={attraction.lng}
                latitude={attraction.lat}
                anchor="bottom"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  handleAttractionClick(attraction);
                }}
              >
                <div
                  className="relative cursor-pointer group"
                  style={{
                    transform: isSelected
                      ? "scale(1.22) translateY(-4px)"
                      : "scale(1)",
                    transition:
                      "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  }}
                >
                  {isSelected && (
                    <div
                      className="absolute inset-0 rounded-full marker-pulse"
                      style={{ background: cfg.color, opacity: 0.5 }}
                    />
                  )}
                  <div
                    className="relative w-9 h-9 rounded-2xl flex items-center justify-center text-base shadow-xl"
                    style={{
                      background: isSelected
                        ? cfg.color
                        : "rgba(8, 18, 38, 0.95)",
                      border: `2px solid ${cfg.color}`,
                      boxShadow: isSelected
                        ? `0 0 24px ${cfg.color}80`
                        : "0 6px 20px rgba(0,0,0,0.6)",
                    }}
                  >
                    {cfg.icon}
                  </div>

                  {/* Hover Tooltip */}
                  <div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-xl text-xs font-semibold text-white pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-xl border border-white/20 z-30"
                    style={{ background: "rgba(6, 18, 34, 0.95)" }}
                  >
                    <span>{attraction.name}</span>
                  </div>
                </div>
              </Marker>
            );
          })}

        {/* Selected Event Popup Marker */}
        {selectedEvent && (
          <Popup
            longitude={selectedEvent.coordinates[0]}
            latitude={selectedEvent.coordinates[1]}
            anchor="bottom"
            offset={40}
            closeButton={false}
            closeOnClick={false}
            onClose={() => setSelectedEvent(null)}
          >
            <div
              className="w-64 rounded-2xl overflow-hidden shadow-2xl animate-fade-in border border-purple-500/30 text-white"
              style={{ background: "rgba(6, 18, 36, 0.98)" }}
            >
              <div className="relative h-28 w-full overflow-hidden bg-slate-900">
                <Image
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  fill
                  className="object-cover"
                  sizes="256px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,18,36,0.95)] via-transparent to-black/30" />

                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>

                <div className="absolute bottom-2 left-2.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/30 text-purple-200 border border-purple-500/40">
                    🗓️ {selectedEvent.month}
                  </span>
                </div>
              </div>

              <div className="p-3 space-y-1.5">
                <h3 className="font-bold text-white text-xs leading-snug">
                  {selectedEvent.title}
                </h3>
                <div className="text-[11px] text-purple-300 font-medium">
                  {selectedEvent.dateRange}
                </div>
                <p className="text-[11px] text-white/60 line-clamp-2 leading-relaxed">
                  {selectedEvent.description}
                </p>
              </div>
            </div>
          </Popup>
        )}

        {/* Selected Attraction Popup */}
        {selectedAttraction && !activeRoute && (
          <Popup
            longitude={selectedAttraction.lng}
            latitude={selectedAttraction.lat}
            anchor="bottom"
            offset={50}
            closeButton={false}
            closeOnClick={false}
            onClose={() => setSelectedAttraction(null)}
          >
            <div
              className="w-[min(19rem,calc(100vw-1.25rem))] rounded-2xl overflow-hidden shadow-2xl animate-fade-in border border-white/15 text-white"
              style={{
                background:
                  "linear-gradient(155deg, rgba(8, 25, 49, 0.99), rgba(5, 16, 34, 0.99))",
                boxShadow:
                  "0 18px 46px rgba(0,0,0,0.56), 0 1px 0 rgba(255,255,255,0.08) inset",
              }}
            >
              <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                <Image
                  src={selectedAttraction.image}
                  alt={selectedAttraction.name}
                  fill
                  className="object-cover"
                  sizes="288px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(5,16,34,0.96)] via-slate-950/15 to-black/25" />

                <button
                  onClick={() => setSelectedAttraction(null)}
                  className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center bg-slate-950/70 hover:bg-slate-950 text-white border border-white/15 transition-colors cursor-pointer"
                >
                  <X size={12} />
                </button>

                <div className="absolute bottom-2 left-3">
                  <span
                    className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                    style={{
                      background:
                        CATEGORY_CONFIG[selectedAttraction.category]?.bg ||
                        "rgba(255,255,255,0.1)",
                      color:
                        CATEGORY_CONFIG[selectedAttraction.category]?.color ||
                        "#fff",
                      border: `1px solid ${
                        CATEGORY_CONFIG[selectedAttraction.category]?.color ||
                        "#fff"
                      }40`,
                    }}
                  >
                    {CATEGORY_CONFIG[selectedAttraction.category]?.icon}{" "}
                    {selectedAttraction.category}
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-2.5">
                <div>
                  <h3 className="font-bold text-white text-[15px] leading-snug tracking-tight">
                    {selectedAttraction.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-1 text-[11px] text-white/50">
                    <span>★ {selectedAttraction.rating.toFixed(1)}</span>
                    <span>·</span>
                    <span>{selectedAttraction.city}</span>
                  </div>
                </div>

                <p className="text-xs text-white/65 line-clamp-2 leading-relaxed">
                  {selectedAttraction.shortDesc}
                </p>

                <div className="pt-2.5 flex items-center justify-between border-t border-white/10">
                  <button
                    onClick={() => setDetailAttraction(selectedAttraction)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all hover:brightness-110 active:scale-[0.98] cursor-pointer shadow-md"
                    style={{
                      background:
                        CATEGORY_CONFIG[selectedAttraction.category]?.color ||
                        "#22c5d9",
                      color: "#081226",
                    }}
                  >
                    <span>Ver detalhes & Navegação</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
}
