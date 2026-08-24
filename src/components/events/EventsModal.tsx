"use client";

import { useState } from "react";
import Image from "next/image";
import { useMapStore } from "@/store/useMapStore";
import { litoralEvents } from "@/data/events";
import { LitoralEvent } from "@/types";
import { X, Calendar, MapPin, PartyPopper } from "lucide-react";

export function EventsModal() {
  const { showEventsModal, setShowEventsModal, setSelectedEvent } =
    useMapStore();
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  if (!showEventsModal) return null;

  const categories = [
    "Todos",
    "Religioso",
    "Gastronômico",
    "Cultural",
    "Ecológico",
  ];

  const filteredEvents =
    selectedCategory === "Todos"
      ? litoralEvents
      : litoralEvents.filter((e) => e.category === selectedCategory);

  const handleSelectEvent = (event: LitoralEvent) => {
    setSelectedEvent(event);
  };

  const categoryBadgeColors: Record<
    string,
    { bg: string; text: string; border: string }
  > = {
    Religioso: {
      bg: "bg-amber-500/20",
      text: "text-amber-300",
      border: "border-amber-500/30",
    },
    Gastronômico: {
      bg: "bg-orange-500/20",
      text: "text-orange-300",
      border: "border-orange-500/30",
    },
    Cultural: {
      bg: "bg-purple-500/20",
      text: "text-purple-300",
      border: "border-purple-500/30",
    },
    Ecológico: {
      bg: "bg-emerald-500/20",
      text: "text-emerald-300",
      border: "border-emerald-500/30",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div
        className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-purple-500/30 text-white"
        style={{ background: "rgba(6, 18, 36, 0.98)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-purple-950/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center text-purple-300">
              <Calendar size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight flex items-center gap-2">
                <span>Calendário Cultural & Festividades</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Litoral PR
                </span>
              </h2>
              <p className="text-xs text-white/50">
                Festas tradicionais, gastronomia caiçara, fé e ecoturismo
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowEventsModal(false)}
            className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-6 py-3 border-b border-white/5 flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? "bg-purple-500 text-white shadow-md shadow-purple-500/20"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEvents.map((event) => {
              const badge = categoryBadgeColors[event.category] || {
                bg: "bg-white/10",
                text: "text-white",
                border: "border-white/10",
              };

              return (
                <div
                  key={event.id}
                  className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden hover:border-purple-500/40 hover:bg-white/8 transition-all flex flex-col justify-between group shadow-xl"
                >
                  <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 400px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,18,36,0.95)] via-transparent to-black/30" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}
                      >
                        {event.category}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white/90">
                        🗓️ {event.month}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3 right-3">
                      <span className="text-xs font-semibold text-purple-200">
                        {event.dateRange}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                        {event.title}
                      </h3>
                      <div className="text-[11px] text-white/50 flex items-center gap-1 mt-1">
                        <MapPin
                          size={11}
                          className="text-purple-400 shrink-0"
                        />
                        <span>
                          {event.location} · {event.city}
                        </span>
                      </div>
                      <p className="text-xs text-white/65 mt-2 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>

                      <div className="mt-2.5 space-y-1">
                        {event.highlights.slice(0, 2).map((h, idx) => (
                          <div
                            key={idx}
                            className="text-[11px] text-white/75 flex items-center gap-1.5 truncate"
                          >
                            <span className="w-1 h-1 rounded-full bg-purple-400 shrink-0" />
                            <span className="truncate">{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectEvent(event)}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer mt-2"
                    >
                      <MapPin size={13} />
                      <span>Ver Local no Mapa</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <PartyPopper size={13} className="text-purple-400" />
            Cultura tradicional caiçara preservada
          </span>
          <button
            onClick={() => setShowEventsModal(false)}
            className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
