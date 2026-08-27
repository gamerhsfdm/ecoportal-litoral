"use client";

import { useState } from "react";
import Image from "next/image";
import { useMapStore } from "@/store/useMapStore";
import { CATEGORY_CONFIG } from "@/data/attractions";
import { useSpeechNarration } from "@/hooks/useSpeechNarration";
import {
  calculateDistanceKm,
  estimateTravelTime,
  getGoogleMapsUrl,
  getWazeUrl,
  getAppleMapsUrl,
} from "@/lib/geoUtils";
import {
  X,
  Star,
  Clock,
  Lightbulb,
  MapPin,
  Volume2,
  VolumeX,
  Navigation,
  ExternalLink,
  Leaf,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Share2,
} from "lucide-react";

export function AttractionDetailSheet() {
  const {
    detailAttraction,
    setDetailAttraction,
    userLocation,
  } = useMapStore();
  const [activeImg, setActiveImg] = useState(0);
  const [copied, setCopied] = useState(false);
  const { isPlaying, toggle, stop } = useSpeechNarration();

  if (!detailAttraction) return null;

  const cfg = CATEGORY_CONFIG[detailAttraction.category] || {
    color: "#22c5d9",
    bg: "rgba(34,197,217,0.15)",
    icon: "📍",
    accent: "#0d7a8a",
  };

  const handleClose = () => {
    stop();
    setDetailAttraction(null);
  };

  // Distance calculation if userLocation is available
  const distanceKm = userLocation
    ? calculateDistanceKm(
        userLocation.lat,
        userLocation.lng,
        detailAttraction.lat,
        detailAttraction.lng
      )
    : null;

  const isIsland = detailAttraction.city === "Ilha do Mel";
  const travelTime = distanceKm !== null ? estimateTravelTime(distanceKm, isIsland) : null;

  // Narration text construction
  const narrationText = `${detailAttraction.name}. Localizado em ${detailAttraction.city}. ${detailAttraction.description} ${detailAttraction.tip ? `Dica de visitação: ${detailAttraction.tip}` : ""} ${detailAttraction.ecoTip ? `Dica ecológica: ${detailAttraction.ecoTip}` : ""}`;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: detailAttraction.name,
        text: `Conheça ${detailAttraction.name} no EcoPortal Litoral!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(
        `${detailAttraction.name} - ${getGoogleMapsUrl(detailAttraction.lat, detailAttraction.lng, detailAttraction.name)}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end pointer-events-none">
      <div
        className="pointer-events-auto w-full sm:w-[500px] h-[88vh] sm:h-[94vh] rounded-t-3xl sm:rounded-3xl sm:mr-4 sm:my-auto overflow-hidden shadow-2xl animate-slide-right flex flex-col border border-white/15"
        style={{
          background: "rgba(8, 18, 38, 0.98)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        {/* Top Image Gallery */}
        <div className="relative h-60 w-full flex-shrink-0 bg-slate-900 overflow-hidden">
          <Image
            src={detailAttraction.gallery[activeImg] || detailAttraction.image}
            alt={detailAttraction.name}
            fill
            className="object-cover transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 500px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[rgba(8,18,38,0.95)]" />

          {/* Top actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full text-white/90 shadow-lg flex items-center gap-1.5"
              style={{
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              📍 {detailAttraction.city}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-colors cursor-pointer shadow-lg"
                title="Compartilhar ou copiar link"
              >
                <Share2 size={15} />
              </button>
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full flex items-center justify-center bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-colors cursor-pointer shadow-lg"
                title="Fechar"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Gallery navigation controls if multiple images */}
          {detailAttraction.gallery.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImg(
                    (prev) =>
                      (prev - 1 + detailAttraction.gallery.length) %
                      detailAttraction.gallery.length
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() =>
                  setActiveImg(
                    (prev) => (prev + 1) % detailAttraction.gallery.length
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {detailAttraction.gallery.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className="w-2 h-2 rounded-full transition-all cursor-pointer"
                    style={{
                      background:
                        i === activeImg ? cfg.color : "rgba(255,255,255,0.4)",
                      transform: i === activeImg ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Title & category */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                {detailAttraction.name}
              </h2>
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shrink-0"
                style={{
                  background: cfg.bg,
                  color: cfg.color,
                  border: `1px solid ${cfg.color}40`,
                }}
              >
                <span>{cfg.icon}</span>
                {detailAttraction.category}
              </span>
            </div>

            {/* Rating and Audio-Guide action */}
            <div className="mt-2.5 flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={
                      s <= Math.round(detailAttraction.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-white/20"
                    }
                  />
                ))}
                <span className="ml-1.5 text-xs font-bold text-white/90">
                  {detailAttraction.rating.toFixed(1)}
                </span>
                <span className="text-xs text-white/40 ml-1">
                  (Avaliação turística)
                </span>
              </div>

              {/* Audio-Guide button */}
              <button
                onClick={() => toggle(narrationText)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer shadow-md ${
                  isPlaying
                    ? "bg-amber-500 text-slate-950 animate-pulse"
                    : "bg-white/10 hover:bg-white/20 text-cyan-300 border border-cyan-400/30"
                }`}
                title="Ouvir áudio-guia com narração em voz"
              >
                {isPlaying ? <VolumeX size={14} /> : <Volume2 size={14} />}
                <span>{isPlaying ? "Pausar Áudio" : "Ouvir Guia"}</span>
              </button>
            </div>
          </div>

          {/* "Como Chegar" Box with GPS Navigation */}
          <div
            className="p-4 rounded-2xl border border-cyan-500/30 shadow-lg space-y-3"
            style={{
              background:
                "linear-gradient(135deg, rgba(13, 122, 138, 0.25) 0%, rgba(8, 28, 54, 0.4) 100%)",
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Navigation size={16} className="text-cyan-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  Como Chegar & Navegação GPS
                </h3>
              </div>
              {distanceKm !== null && (
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-200 border border-cyan-500/30">
                  {distanceKm} km de você
                </span>
              )}
            </div>

            {travelTime && (
              <div className="text-xs text-white/80">
                ⏱️ Tempo estimado: <span className="font-semibold text-white">{travelTime}</span>
              </div>
            )}

            {/* Navigation links grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              <a
                href={getGoogleMapsUrl(
                  detailAttraction.lat,
                  detailAttraction.lng,
                  detailAttraction.name
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-md cursor-pointer text-center"
              >
                <span>Google Maps</span>
                <ExternalLink size={12} />
              </a>

              <a
                href={getWazeUrl(detailAttraction.lat, detailAttraction.lng)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-semibold transition-all shadow-md cursor-pointer text-center"
              >
                <span>Waze</span>
                <ExternalLink size={12} />
              </a>

              <a
                href={getAppleMapsUrl(
                  detailAttraction.lat,
                  detailAttraction.lng,
                  detailAttraction.name
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all border border-white/15 cursor-pointer text-center"
              >
                <span>Apple Maps</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-white/75 leading-relaxed">
            {detailAttraction.description}
          </p>

          {/* Highlights */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-2.5">
              Destaques do Local
            </h4>
            <div className="flex flex-wrap gap-2">
              {detailAttraction.highlights.map((h) => (
                <span
                  key={h}
                  className="text-xs px-3 py-1 rounded-full text-white/80 bg-white/5 border border-white/10 font-medium"
                >
                  ✓ {h}
                </span>
              ))}
            </div>
          </div>

          {/* Practical Info cards (Hours, Tips, Biome) */}
          <div className="space-y-2.5">
            {(detailAttraction.address || detailAttraction.altitudeM !== undefined) && (
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 text-cyan-300">
                  <MapPin size={16} />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">
                    Referência do local
                  </div>
                  {detailAttraction.address && (
                    <div className="text-xs text-white/80 leading-relaxed mt-0.5">
                      {detailAttraction.address}
                    </div>
                  )}
                  {detailAttraction.altitudeM !== undefined && (
                    <div className="text-[11px] text-cyan-200/75 mt-1">
                      Altitude aproximada: {detailAttraction.altitudeM} m
                    </div>
                  )}
                </div>
              </div>
            )}

            {(detailAttraction.startDate || detailAttraction.endDate) && (
              <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-2xl bg-amber-500/8 border border-amber-400/15 text-xs text-amber-100/80">
                <Clock size={14} className="text-amber-300 shrink-0" />
                <span>
                  Período de referência: <strong className="text-amber-100">{detailAttraction.startDate}</strong>
                  {detailAttraction.endDate && detailAttraction.endDate !== detailAttraction.startDate ? ` — ${detailAttraction.endDate}` : ""}
                </span>
              </div>
            )}

            {detailAttraction.hours && (
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: cfg.bg }}
                >
                  <Clock size={16} style={{ color: cfg.color }} />
                </div>
                <div>
                  <div className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">
                    Horário de Funcionamento
                  </div>
                  <div className="text-sm text-white/90 font-medium">
                    {detailAttraction.hours}
                  </div>
                </div>
              </div>
            )}

            {detailAttraction.tip && (
              <div
                className="flex items-start gap-3 p-3.5 rounded-2xl border"
                style={{
                  background: `${cfg.bg}`,
                  borderColor: `${cfg.color}30`,
                }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: cfg.bg }}
                >
                  <Lightbulb size={16} style={{ color: cfg.color }} />
                </div>
                <div>
                  <div
                    className="text-[10px] font-bold uppercase tracking-wider mb-0.5"
                    style={{ color: cfg.color }}
                  >
                    Dica do Guia
                  </div>
                  <div className="text-xs text-white/80 leading-relaxed">
                    {detailAttraction.tip}
                  </div>
                </div>
              </div>
            )}

            {detailAttraction.ecoTip && (
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5 text-emerald-400">
                  <Leaf size={16} />
                </div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-0.5 text-emerald-400">
                    Preservação & Dica Ecológica
                  </div>
                  <div className="text-xs text-emerald-100/80 leading-relaxed">
                    {detailAttraction.ecoTip}
                  </div>
                </div>
              </div>
            )}

            {detailAttraction.biome && (
              <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white/60">
                <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
                <span>Bioma: <strong className="text-white/80">{detailAttraction.biome}</strong></span>
              </div>
            )}
          </div>

          {/* Coordinates footer */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 text-xs text-white/40">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} />
              {detailAttraction.lat.toFixed(4)}, {detailAttraction.lng.toFixed(4)}
            </span>
            {copied && (
              <span className="text-emerald-400 font-semibold">
                Link copiado!
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
