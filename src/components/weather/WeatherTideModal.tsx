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
} from "lucide-react";

export function WeatherTideModal() {
  const { showWeatherModal, setShowWeatherModal } = useMapStore();
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedCity, setSelectedCity] = useState("Pontal do Paraná");

  useEffect(() => {
    if (!showWeatherModal) return;

    let isMounted = true;
    fetchLitoralWeather(selectedCity)
      .then((res) => {
        if (isMounted) {
          setData(res);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [showWeatherModal, selectedCity]);

  const handleManualRefresh = () => {
    setLoading(true);
    fetchLitoralWeather(selectedCity)
      .then((res) => setData(res))
      .finally(() => setLoading(false));
  };

  if (!showWeatherModal) return null;

  const safetyBadgeColors = {
    Excelente: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    Boa: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    Atenção: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    Desfavorável: "bg-rose-500/20 text-rose-300 border-rose-500/40",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in pointer-events-auto">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-cyan-500/30 text-white"
        style={{ background: "rgba(6, 18, 36, 0.97)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-cyan-950/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
              <Waves size={20} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white leading-tight">
                Tábua de Marés & Clima Costeiro
              </h2>
              <p className="text-xs text-white/50">
                Condições em tempo real para navegação, praias e travessias
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleManualRefresh}
              className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Atualizar dados"
            >
              <RefreshCw
                size={15}
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

        {/* City Switcher */}
        <div className="px-6 py-3 border-b border-white/5 flex gap-2">
          {["Pontal do Paraná", "Paranaguá", "Ilha do Mel"].map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                selectedCity === city
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Modal content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
          {loading && !data ? (
            <div className="py-16 text-center text-white/40 flex flex-col items-center justify-center gap-3">
              <RefreshCw className="animate-spin w-8 h-8 text-cyan-400" />
              <span>Consultando boias meteorológicas e marégrafos...</span>
            </div>
          ) : data ? (
            <>
              {/* Current conditions card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Main temperature and weather */}
                <div
                  className="p-5 rounded-3xl border border-white/10 flex flex-col justify-between"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(14, 42, 71, 0.6) 0%, rgba(8, 24, 44, 0.8) 100%)",
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                        {data.city}
                      </span>
                      <div className="text-4xl font-extrabold text-white mt-1">
                        {data.current.temp}°C
                      </div>
                      <div className="text-xs text-white/60 mt-0.5">
                        Sensação térmica de {data.current.apparentTemp}°C
                      </div>
                    </div>
                    <div className="text-3xl">
                      <CloudSun size={36} className="text-amber-400" />
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/80">
                    <span className="font-medium text-cyan-200">
                      {data.current.condition}
                    </span>
                    <span className="text-white/40">{data.updatedAt}</span>
                  </div>
                </div>

                {/* Secondary stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-cyan-300 text-xs font-semibold">
                      <Wind size={14} />
                      <span>Vento</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {data.current.windKnots} nós
                      </div>
                      <div className="text-[10px] text-white/50">
                        {data.current.windSpeed} km/h
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-blue-300 text-xs font-semibold">
                      <Droplets size={14} />
                      <span>Chuva / Umidade</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {data.current.precipitationProb}%
                      </div>
                      <div className="text-[10px] text-white/50">
                        Umidade: {data.current.humidity}%
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
                      <Sun size={14} />
                      <span>Índice UV</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">
                        {data.current.uvIndex} (Alto)
                      </div>
                      <div className="text-[10px] text-white/50">
                        Use protetor solar
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-emerald-300 text-xs font-semibold">
                      <Compass size={14} />
                      <span>Direção</span>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">
                        Leste / SE
                      </div>
                      <div className="text-[10px] text-white/50">
                        Vento marítimo constante
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tides section */}
              <div className="p-5 rounded-3xl bg-cyan-950/20 border border-cyan-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Waves size={16} className="text-cyan-400" />
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                      Tábua de Marés de Hoje
                    </h3>
                  </div>
                  <span className="text-xs text-white/50">
                    {data.tides.date}
                  </span>
                </div>

                {/* Tide pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {data.tides.tides.map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center text-center"
                    >
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full mb-1.5 ${
                          t.type === "Alta"
                            ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        Maré {t.type}
                      </span>
                      <div className="text-lg font-bold text-white">
                        {t.time}
                      </div>
                      <span className="text-[11px] text-white/60">
                        {t.height.toFixed(1)}m de altura
                      </span>
                    </div>
                  ))}
                </div>

                {/* Marine Crossing Safety Notice */}
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-start gap-3">
                  <Ship className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        Travessia Pontal do Sul ↔ Ilha do Mel
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          safetyBadgeColors[data.tides.crossingSafety]
                        }`}
                      >
                        {data.tides.crossingSafety}
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
                <h4 className="text-xs font-bold uppercase tracking-wider text-white/40 mb-3">
                  Previsão para os Próximos Dias
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {data.forecast.map((f, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center text-center"
                    >
                      <span className="text-xs font-semibold text-white/90">
                        {f.date}
                      </span>
                      <div className="text-sm font-bold text-white my-1">
                        {f.tempMax}° / {f.tempMin}°
                      </div>
                      <span className="text-[10px] text-cyan-300 truncate w-full">
                        {f.condition}
                      </span>
                      <span className="text-[9px] text-white/40 mt-1">
                        💧 {f.precipitationProb}% chuva
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-white/10 bg-black/40 flex items-center justify-between text-xs text-white/40">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-cyan-400" />
            Dados oceanográficos e meteorológicos abertos
          </span>
          <button
            onClick={() => setShowWeatherModal(false)}
            className="px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
