"use client";

import { useEffect, useState } from "react";
import { useMapStore } from "@/store/useMapStore";
import { fetchLitoralWeather } from "@/services/weatherService";
import { WeatherData } from "@/types";
import {
  X,
  CloudSun,
  Droplets,
  Wind,
  Compass,
  Ship,
  Sun,
  ShieldCheck,
  RefreshCw,
  Waves,
  MapPin,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export function WeatherTideModal() {
  const { showWeatherModal, setShowWeatherModal, activeCity } = useMapStore();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>(() =>
    activeCity === "Todos" ? "Pontal do Paraná" : activeCity
  );

  // Sync selectedCity with activeCity when activeCity changes or modal is triggered
  useEffect(() => {
    if (!showWeatherModal) return;
    const targetCity =
      selectedCity || (activeCity === "Todos" ? "Pontal do Paraná" : activeCity);

    let isMounted = true;

    fetchLitoralWeather(targetCity)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [showWeatherModal, selectedCity, activeCity]);

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
    setLoading(true);
  };

  const handleManualRefresh = () => {
    setLoading(true);
    fetchLitoralWeather(selectedCity)
      .then((res) => setData(res))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  if (!showWeatherModal) return null;

  const safetyBadgeColors: Record<string, string> = {
    Excelente: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    Boa: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    Atenção: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    Desfavorável: "bg-rose-500/20 text-rose-300 border-rose-500/40",
  };

  const citiesList = ["Pontal do Paraná", "Paranaguá", "Ilha do Mel"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div
        className="relative w-full max-w-2xl max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-cyan-400/30 text-white"
        style={{
          background:
            "linear-gradient(175deg, rgba(8, 22, 46, 0.98) 0%, rgba(5, 14, 30, 0.99) 100%)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.7), 0 0 30px rgba(34,197,217,0.15)",
        }}
      >
        {/* Header Wave Glow */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-cyan-950/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-lg shadow-cyan-500/20">
              <Waves size={20} className="animate-pulse" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white leading-tight flex items-center gap-2">
                <span>Tábua de Marés & Clima</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
                  Tempo Real
                </span>
              </h2>
              <p className="text-xs text-white/50">
                Previsões e marés atualizadas por localidade
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleManualRefresh}
              className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Atualizar dados agora"
            >
              <RefreshCw
                size={16}
                className={loading ? "animate-spin text-cyan-400" : ""}
              />
            </button>
            <button
              onClick={() => setShowWeatherModal(false)}
              className="w-9 h-9 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Dynamic City Switcher Tabs */}
        <div className="px-5 sm:px-6 py-3 border-b border-white/5 bg-black/20 flex gap-1.5 overflow-x-auto scrollbar-none">
          {citiesList.map((city) => (
            <button
              key={city}
              onClick={() => handleCityChange(city)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                selectedCity === city
                  ? "bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-md shadow-cyan-500/30 scale-[1.02]"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              <MapPin size={12} className={selectedCity === city ? "text-slate-950" : "text-cyan-400"} />
              <span>{city}</span>
            </button>
          ))}
        </div>

        {/* Modal content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-5">
          {loading && !data ? (
            <div className="py-20 text-center text-white/50 flex flex-col items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              <span className="text-sm font-medium">
                Consultando boias meteorológicas de {selectedCity}...
              </span>
            </div>
          ) : data ? (
            <>
              {/* Current conditions card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {/* Main temperature and weather */}
                <div
                  className="p-5 rounded-3xl border border-cyan-400/20 flex flex-col justify-between relative overflow-hidden group shadow-xl"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(14, 46, 80, 0.7) 0%, rgba(8, 26, 48, 0.85) 100%)",
                  }}
                >
                  <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-300">
                        <MapPin size={12} />
                        <span>{data.city}</span>
                      </div>
                      <div className="text-4xl sm:text-5xl font-black text-white mt-2 tracking-tight">
                        {data.current.temp}°C
                      </div>
                      <div className="text-xs text-white/60 mt-1">
                        Sensação térmica de {data.current.apparentTemp}°C
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/20 text-amber-300">
                      <CloudSun size={38} className="animate-pulse" />
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/80 relative z-10">
                    <span className="font-semibold text-cyan-200">
                      {data.current.condition}
                    </span>
                    <span className="text-[11px] text-white/45 flex items-center gap-1">
                      <Clock size={11} />
                      {data.updatedAt}
                    </span>
                  </div>
                </div>

                {/* Secondary stats grid */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-cyan-500/30 transition-colors">
                    <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-bold">
                      <Wind size={14} />
                      <span>Vento</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-base sm:text-lg font-black text-white">
                        {data.current.windKnots} nós
                      </div>
                      <div className="text-[10px] text-white/50">
                        {data.current.windSpeed} km/h
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-blue-500/30 transition-colors">
                    <div className="flex items-center gap-1.5 text-blue-300 text-xs font-bold">
                      <Droplets size={14} />
                      <span>Chuva / Umidade</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-base sm:text-lg font-black text-white">
                        {data.current.precipitationProb}%
                      </div>
                      <div className="text-[10px] text-white/50">
                        Umidade: {data.current.humidity}%
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-amber-500/30 transition-colors">
                    <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold">
                      <Sun size={14} />
                      <span>Índice UV</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-base sm:text-lg font-black text-white">
                        {data.current.uvIndex} (Alto)
                      </div>
                      <div className="text-[10px] text-white/50">
                        Protetor recomendado
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-colors">
                    <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-bold">
                      <Compass size={14} />
                      <span>Direção</span>
                    </div>
                    <div className="mt-2">
                      <div className="text-base sm:text-lg font-black text-white">
                        Leste / SE
                      </div>
                      <div className="text-[10px] text-white/50">
                        Brisa marítima constante
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tides section with visual high/low indicators */}
              <div className="p-4 sm:p-5 rounded-3xl bg-cyan-950/25 border border-cyan-500/30 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Waves size={17} className="text-cyan-400" />
                    <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                      Tábua de Marés — {data.city}
                    </h3>
                  </div>
                  <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                    {data.tides.date}
                  </span>
                </div>

                {/* Tide pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {data.tides.tides.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center relative overflow-hidden group hover:border-cyan-400/40 transition-all"
                    >
                      <div className="flex items-center gap-1 mb-1">
                        {t.type === "Alta" ? (
                          <ArrowUpRight size={13} className="text-cyan-400" />
                        ) : (
                          <ArrowDownRight size={13} className="text-blue-400" />
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            t.type === "Alta"
                              ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                              : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                          }`}
                        >
                          Maré {t.type}
                        </span>
                      </div>
                      <div className="text-lg sm:text-xl font-black text-white tracking-tight">
                        {t.time}
                      </div>
                      <span className="text-[11px] text-white/60 mt-0.5 font-medium">
                        {t.height.toFixed(2)}m
                      </span>
                    </div>
                  ))}
                </div>

                {/* Marine Crossing Safety Notice */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-300 shrink-0">
                    <Ship size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">
                        Navegação & Travessias ({data.city})
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          safetyBadgeColors[data.tides.crossingSafety] ||
                          "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        }`}
                      >
                        Condição: {data.tides.crossingSafety}
                      </span>
                    </div>
                    <p className="text-xs text-white/70 mt-1 leading-relaxed">
                      {data.tides.crossingTip}
                    </p>
                  </div>
                </div>
              </div>

              {/* 5-day forecast */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-2.5">
                  Previsão para os Próximos 5 Dias
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {data.forecast.map((f, i) => (
                    <div
                      key={i}
                      className="p-2.5 sm:p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center hover:bg-white/8 transition-colors"
                    >
                      <span className="text-xs font-bold text-white/90">
                        {f.date}
                      </span>
                      <div className="text-sm font-black text-white my-1">
                        {f.tempMax}° / {f.tempMin}°
                      </div>
                      <span className="text-[10px] text-cyan-300 font-medium truncate w-full">
                        {f.condition}
                      </span>
                      <span className="text-[10px] text-white/40 mt-1">
                        💧 {f.precipitationProb}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-white/40">
          <span className="flex items-center gap-1.5 text-[11px] truncate">
            <ShieldCheck size={13} className="text-cyan-400 shrink-0" />
            <span>Dados abertos Open-Meteo & Centro de Estudos do Mar</span>
          </span>
          <button
            onClick={() => setShowWeatherModal(false)}
            className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all cursor-pointer shadow-md text-xs shrink-0"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
