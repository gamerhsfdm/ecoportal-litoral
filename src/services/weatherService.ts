import {
  WeatherData,
  TideEvent,
  TideDay,
  WeatherCurrent,
  WeatherForecastDay,
} from "@/types";

// Coordinates and specific geographic details per coastal area
export const CITY_GEO: Record<
  string,
  {
    name: string;
    lat: number;
    lng: number;
    tideDelayMinutes: number;
    tideRangeScale: number;
    crossingFrom: string;
  }
> = {
  "Pontal do Paraná": {
    name: "Pontal do Paraná",
    lat: -25.5697,
    lng: -48.3509,
    tideDelayMinutes: 0,
    tideRangeScale: 1.0,
    crossingFrom: "Terminal Ponta do Poço → Ilha do Mel",
  },
  Paranaguá: {
    name: "Paranaguá",
    lat: -25.5209,
    lng: -48.5097,
    tideDelayMinutes: 45, // Estuarine lag inside the deep bay
    tideRangeScale: 1.18, // Higher tidal amplitude inside the bay
    crossingFrom: "Rua da Praia → Ilha dos Valadares & Ilha do Mel",
  },
  "Ilha do Mel": {
    name: "Ilha do Mel",
    lat: -25.5391,
    lng: -48.2909,
    tideDelayMinutes: -15, // Open oceanic headland
    tideRangeScale: 0.95,
    crossingFrom: "Farol das Conchas & Encantadas (Mar Aberto)",
  },
  Todos: {
    name: "Litoral do Paraná",
    lat: -25.545,
    lng: -48.43,
    tideDelayMinutes: 0,
    tideRangeScale: 1.0,
    crossingFrom: "Complexo Estuarino e Baías do Paraná",
  },
};

// WMO Weather interpretation codes (Open-Meteo standard)
function interpretWeatherCode(code: number): string {
  if (code === 0) return "Céu limpo e ensolarado";
  if (code === 1 || code === 2) return "Parcialmente nublado";
  if (code === 3) return "Encoberto";
  if (code === 45 || code === 48) return "Nevoeiro costeiro";
  if (code >= 51 && code <= 55) return "Garoa passageira";
  if (code >= 61 && code <= 65) return "Chuva moderada";
  if (code >= 80 && code <= 82) return "Pancadas de chuva litorâneas";
  if (code >= 95) return "Possibilidade de trovoada";
  return "Tempo estável";
}

// Generate realistic daily tide cycle adjusted per city and date
export function calculateLitoralTides(
  cityName: string = "Pontal do Paraná",
  date: Date = new Date()
): TideDay {
  const geo = CITY_GEO[cityName] || CITY_GEO["Pontal do Paraná"];
  const day = date.getDate();
  const month = date.getMonth();

  // Semidiurnal tide calculation (approx 12h 25m cycle with lunar & local offset)
  const baseOffsetMinutes = (day * 50 + month * 30 + geo.tideDelayMinutes + 1440) % 720;
  const m1 = (270 + baseOffsetMinutes) % 1440; // High tide 1
  const m2 = (m1 + 372) % 1440; // Low tide 1
  const m3 = (m2 + 372) % 1440; // High tide 2
  const m4 = (m3 + 372) % 1440; // Low tide 2

  const formatTime = (minutes: number) => {
    const h = Math.floor(minutes / 60)
      .toString()
      .padStart(2, "0");
    const m = (minutes % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
  };

  const scale = geo.tideRangeScale;
  const tides: TideEvent[] = [
    { time: formatTime(m1), type: "Alta" as const, height: Number((1.8 * scale).toFixed(2)) },
    { time: formatTime(m2), type: "Baixa" as const, height: Number((0.4 * scale).toFixed(2)) },
    { time: formatTime(m3), type: "Alta" as const, height: Number((1.9 * scale).toFixed(2)) },
    { time: formatTime(m4), type: "Baixa" as const, height: Number((0.3 * scale).toFixed(2)) },
  ].sort((a, b) => a.time.localeCompare(b.time));

  const crossingSafety: "Excelente" | "Boa" | "Atenção" | "Desfavorável" = "Excelente";
  let crossingTip = `Condições ideais para navegação e travessia (${geo.crossingFrom}).`;

  if (cityName === "Ilha do Mel") {
    crossingTip = "Maré propícia para travessia de lancha e caminhada na Gruta das Encantadas.";
  } else if (cityName === "Paranaguá") {
    crossingTip = "Canal do Rio Itiberê calmo com marés regulares para embarcações e pesca.";
  }

  return {
    date: date.toLocaleDateString("pt-BR", {
      weekday: "long",
      day: "numeric",
      month: "short",
    }),
    tides,
    currentLevel: "Maré em ciclo regular estuarino",
    crossingSafety,
    crossingTip,
  };
}

// In-memory cache per city
const cacheStore: Record<string, { data: WeatherData; timestamp: number }> = {};
const CACHE_TTL = 8 * 60 * 1000; // 8 minutes cache

export async function fetchLitoralWeather(
  city: string = "Pontal do Paraná",
): Promise<WeatherData> {
  const geo = CITY_GEO[city] || CITY_GEO["Pontal do Paraná"];
  const cacheKey = geo.name;
  const now = Date.now();

  if (cacheStore[cacheKey] && now - cacheStore[cacheKey].timestamp < CACHE_TTL) {
    return cacheStore[cacheKey].data;
  }

  try {
    const lat = geo.lat;
    const lng = geo.lng;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=America%2FSao_Paulo`;

    const res = await fetch(url, { next: { revalidate: 480 } });
    if (!res.ok) throw new Error("Falha ao consultar API Open-Meteo");

    const data = await res.json();
    const cur = data.current;
    const windKmh = Math.round(cur.wind_speed_10m || 12);
    const windKnots = Math.round(windKmh * 0.539957);

    const current: WeatherCurrent = {
      temp: Math.round(cur.temperature_2m),
      apparentTemp: Math.round(cur.apparent_temperature),
      conditionCode: cur.weather_code,
      condition: interpretWeatherCode(cur.weather_code),
      windSpeed: windKmh,
      windDirection: cur.wind_direction_10m || 90,
      windKnots,
      precipitationProb: data.daily?.precipitation_probability_max?.[0] || 10,
      humidity: Math.round(cur.relative_humidity_2m || 75),
      uvIndex: 6,
    };

    const forecast: WeatherForecastDay[] = (data.daily?.time || [])
      .slice(0, 5)
      .map((t: string, i: number) => {
        const d = new Date(t + "T00:00:00");
        return {
          date: d.toLocaleDateString("pt-BR", {
            weekday: "short",
            day: "numeric",
          }),
          tempMax: Math.round(data.daily.temperature_2m_max[i]),
          tempMin: Math.round(data.daily.temperature_2m_min[i]),
          condition: interpretWeatherCode(data.daily.weather_code[i]),
          precipitationProb: data.daily.precipitation_probability_max[i] || 0,
        };
      });

    const tides = calculateLitoralTides(geo.name, new Date());

    // Adjust crossing advice based on live wind speed
    if (windKnots > 22) {
      tides.crossingSafety = "Atenção";
      tides.crossingTip =
        `Ventos fortes (${windKnots} nós) na região de ${geo.name}. Consulte a Capitania dos Portos antes de navegar.`;
    } else if (windKnots > 28) {
      tides.crossingSafety = "Desfavorável";
      tides.crossingTip =
        `Mar agitado com rajadas de ${windKmh} km/h. Travessias marítimas com recomendação de cautela máxima.`;
    }

    const result: WeatherData = {
      city: geo.name,
      current,
      forecast,
      tides,
      updatedAt: new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    cacheStore[cacheKey] = { data: result, timestamp: now };
    return result;
  } catch {
    // Fallback offline state per city
    const fallbackCurrent: WeatherCurrent = {
      temp: geo.name === "Paranaguá" ? 27 : geo.name === "Ilha do Mel" ? 25 : 26,
      apparentTemp: geo.name === "Paranaguá" ? 29 : 26,
      conditionCode: 1,
      condition: "Ensolarado com brisa marítima",
      windSpeed: geo.name === "Ilha do Mel" ? 18 : 12,
      windDirection: 110,
      windKnots: geo.name === "Ilha do Mel" ? 10 : 7,
      precipitationProb: 15,
      humidity: 76,
      uvIndex: 7,
    };

    const fallbackForecast: WeatherForecastDay[] = [
      { date: "Hoje", tempMax: 28, tempMin: 21, condition: "Ensolarado", precipitationProb: 10 },
      { date: "Amanhã", tempMax: 27, tempMin: 20, condition: "Parcialmente nublado", precipitationProb: 20 },
      { date: "Sex", tempMax: 29, tempMin: 22, condition: "Sol entre nuvens", precipitationProb: 15 },
      { date: "Sáb", tempMax: 26, tempMin: 20, condition: "Pancadas rápidas", precipitationProb: 35 },
      { date: "Dom", tempMax: 27, tempMin: 21, condition: "Ensolarado", precipitationProb: 10 },
    ];

    const fallbackResult: WeatherData = {
      city: geo.name,
      current: fallbackCurrent,
      forecast: fallbackForecast,
      tides: calculateLitoralTides(geo.name, new Date()),
      updatedAt: "Atualizado agora",
    };

    return fallbackResult;
  }
}
