export type Category =
  | "Praias"
  | "Ilhas"
  | "Natureza"
  | "História"
  | "Cultura"
  | "Gastronomia"
  | "Passeios";

export type City = "Pontal do Paraná" | "Paranaguá" | "Ilha do Mel";
export type CityFilter = "Todos" | City;

export interface Attraction {
  id: string;
  name: string;
  category: Category;
  city: City;
  lat: number;
  lng: number;
  shortDesc: string;
  description: string;
  image: string;
  gallery: string[];
  rating: number;
  address?: string;
  altitudeM?: number;
  startDate?: string;
  endDate?: string;
  highlights: string[];
  hours?: string;
  tip?: string;
  biome?: string;
  ecoTip?: string;
  preservationStatus?: string;
}

export type EcoCategory =
  | "Parque Nacional"
  | "Estação Ecológica"
  | "Área de Proteção Ambiental"
  | "Manguezal / Restingas"
  | "Reserva Natural";

export interface EcoArea {
  id: string;
  name: string;
  category: EcoCategory;
  city: string;
  areaHectares: number;
  description: string;
  color: string;
  fillOpacity?: number;
  coordinates: [number, number][][]; // Polygon GeoJSON [lng, lat]
  center: [number, number]; // [lng, lat]
  fauna: string[];
  flora: string[];
  importance: string;
  guidelines: string[];
  image: string;
}

export interface WeatherCurrent {
  temp: number;
  condition: string;
  conditionCode: number;
  windSpeed: number; // km/h
  windDirection: number;
  windKnots: number;
  precipitationProb: number;
  humidity: number;
  uvIndex: number;
  apparentTemp: number;
}

export interface WeatherForecastDay {
  date: string;
  tempMax: number;
  tempMin: number;
  condition: string;
  precipitationProb: number;
}

export interface TideEvent {
  time: string; // e.g. "04:35"
  type: "Alta" | "Baixa";
  height: number; // meters e.g. 1.7
}

export interface TideDay {
  date: string;
  tides: TideEvent[];
  currentLevel?: string;
  crossingSafety: "Excelente" | "Boa" | "Atenção" | "Desfavorável";
  crossingTip: string;
}

export interface WeatherData {
  city: string;
  current: WeatherCurrent;
  forecast: WeatherForecastDay[];
  tides: TideDay;
  updatedAt: string;
}

export interface MapViewState {
  longitude: number;
  latitude: number;
  zoom: number;
  pitch: number;
  bearing: number;
}

// ─── Roteiros Turísticos & Guiados ───
export interface RouteStop {
  attractionId: string;
  title: string;
  order: number;
  coordinates: [number, number]; // [lng, lat]
  tip?: string;
}

export interface TourRoute {
  id: string;
  title: string;
  category: "História" | "Praias" | "Ecológico" | "Gastronomia";
  badge: string;
  description: string;
  distanceKm: number;
  estimatedDuration: string;
  color: string;
  icon: string;
  coordinates: [number, number][]; // GeoJSON LineString coordinates
  stops: RouteStop[];
}

// ─── Calendário de Eventos Culturais ───
export interface LitoralEvent {
  id: string;
  title: string;
  category: "Religioso" | "Gastronômico" | "Cultural" | "Ecológico";
  month: string;
  dateRange: string;
  city: City;
  location: string;
  description: string;
  highlights: string[];
  image: string;
  coordinates: [number, number]; // [lng, lat]
}
