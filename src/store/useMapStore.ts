import { create } from "zustand";
import {
  Attraction,
  Category,
  CityFilter,
  EcoArea,
  MapViewState,
  TourRoute,
  LitoralEvent,
} from "@/types";

const ALL_CATEGORIES: Category[] = [
  "Praias",
  "Ilhas",
  "Natureza",
  "História",
  "Cultura",
  "Gastronomia",
  "Passeios",
];

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: -48.43,
  latitude: -25.545,
  zoom: 10.8,
  pitch: 0,
  bearing: 0,
};

interface MapStore {
  // Selections & Modals
  selectedAttraction: Attraction | null;
  detailAttraction: Attraction | null;
  selectedEcoArea: EcoArea | null;
  showWeatherModal: boolean;
  showSearchDialog: boolean;
  showRoutesModal: boolean;
  showEventsModal: boolean;
  isTotemActive: boolean;
  sidebarOpen: boolean;

  // Routes & Tours
  activeRoute: TourRoute | null;
  currentStopIndex: number;

  // Events
  selectedEvent: LitoralEvent | null;

  // Layer & Map modes
  showEcoLayer: boolean;
  isSatellite: boolean;
  pitch3D: boolean;
  activeCategories: Set<Category>;
  activeCity: CityFilter;

  // View state & GPS
  viewState: MapViewState;
  userLocation: { lat: number; lng: number } | null;

  // Actions
  setSelectedAttraction: (attraction: Attraction | null) => void;
  setDetailAttraction: (attraction: Attraction | null) => void;
  setSelectedEcoArea: (ecoArea: EcoArea | null) => void;
  setShowWeatherModal: (show: boolean) => void;
  setShowSearchDialog: (show: boolean) => void;
  setShowRoutesModal: (show: boolean) => void;
  setShowEventsModal: (show: boolean) => void;
  setIsTotemActive: (active: boolean | ((prev: boolean) => boolean)) => void;
  setSidebarOpen: (open: boolean | ((prev: boolean) => boolean)) => void;

  setActiveRoute: (route: TourRoute | null) => void;
  setCurrentStopIndex: (index: number) => void;
  nextRouteStop: () => void;
  prevRouteStop: () => void;

  setSelectedEvent: (event: LitoralEvent | null) => void;

  setShowEcoLayer: (show: boolean | ((prev: boolean) => boolean)) => void;
  setIsSatellite: (isSat: boolean | ((prev: boolean) => boolean)) => void;
  setPitch3D: (pitch3D: boolean | ((prev: boolean) => boolean)) => void;
  togglePitch3D: () => void;

  toggleCategory: (category: Category) => void;
  setAllCategories: () => void;
  setActiveCity: (city: CityFilter) => void;

  setViewState: (viewState: MapViewState) => void;
  setUserLocation: (loc: { lat: number; lng: number } | null) => void;
  flyToLocation: (
    lng: number,
    lat: number,
    zoom?: number,
    pitch?: number,
    bearing?: number,
  ) => void;
  resetToOverview: () => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  selectedAttraction: null,
  detailAttraction: null,
  selectedEcoArea: null,
  showWeatherModal: false,
  showSearchDialog: false,
  showRoutesModal: false,
  showEventsModal: false,
  isTotemActive: false,
  sidebarOpen: false,

  activeRoute: null,
  currentStopIndex: 0,
  selectedEvent: null,

  showEcoLayer: true,
  isSatellite: true,
  pitch3D: false,
  activeCategories: new Set<Category>(ALL_CATEGORIES),
  activeCity: "Todos",

  viewState: INITIAL_VIEW_STATE,
  userLocation: null,

  setSelectedAttraction: (attraction) =>
    set((state) => ({
      selectedAttraction: attraction,
      selectedEcoArea: attraction ? null : state.selectedEcoArea,
      selectedEvent: null,
    })),

  setDetailAttraction: (attraction) => set({ detailAttraction: attraction }),

  setSelectedEcoArea: (ecoArea) =>
    set((state) => ({
      selectedEcoArea: ecoArea,
      selectedAttraction: ecoArea ? null : state.selectedAttraction,
      selectedEvent: null,
    })),

  setShowWeatherModal: (show) => set({ showWeatherModal: show }),
  setShowSearchDialog: (show) => set({ showSearchDialog: show }),
  setShowRoutesModal: (show) => set({ showRoutesModal: show }),
  setShowEventsModal: (show) => set({ showEventsModal: show }),

  setIsTotemActive: (active) =>
    set((state) => ({
      isTotemActive:
        typeof active === "function" ? active(state.isTotemActive) : active,
    })),

  setSidebarOpen: (open) =>
    set((state) => ({
      sidebarOpen: typeof open === "function" ? open(state.sidebarOpen) : open,
    })),

  setActiveRoute: (route) => {
    if (!route) {
      set({ activeRoute: null, currentStopIndex: 0 });
      return;
    }
    const firstStop = route.stops[0];
    set({
      activeRoute: route,
      currentStopIndex: 0,
      showRoutesModal: false,
      sidebarOpen: false,
      viewState: {
        ...get().viewState,
        longitude: firstStop
          ? firstStop.coordinates[0]
          : route.coordinates[0][0],
        latitude: firstStop
          ? firstStop.coordinates[1]
          : route.coordinates[0][1],
        zoom: 13.5,
        pitch: 45,
      },
    });
  },

  setCurrentStopIndex: (index) => {
    const route = get().activeRoute;
    if (route && route.stops[index]) {
      const stop = route.stops[index];
      set({
        currentStopIndex: index,
        viewState: {
          ...get().viewState,
          longitude: stop.coordinates[0],
          latitude: stop.coordinates[1],
          zoom: 14.5,
          pitch: 50,
        },
      });
    }
  },

  nextRouteStop: () => {
    const { activeRoute, currentStopIndex } = get();
    if (activeRoute && currentStopIndex < activeRoute.stops.length - 1) {
      get().setCurrentStopIndex(currentStopIndex + 1);
    }
  },

  prevRouteStop: () => {
    const { activeRoute, currentStopIndex } = get();
    if (activeRoute && currentStopIndex > 0) {
      get().setCurrentStopIndex(currentStopIndex - 1);
    }
  },

  setSelectedEvent: (event) =>
    set((state) => {
      if (!event) return { selectedEvent: null };
      return {
        selectedEvent: event,
        selectedAttraction: null,
        selectedEcoArea: null,
        showEventsModal: false,
        sidebarOpen: false,
        viewState: {
          ...state.viewState,
          longitude: event.coordinates[0],
          latitude: event.coordinates[1],
          zoom: 14,
          pitch: 35,
        },
      };
    }),

  setShowEcoLayer: (show) =>
    set((state) => ({
      showEcoLayer:
        typeof show === "function" ? show(state.showEcoLayer) : show,
    })),

  setIsSatellite: (isSat) =>
    set((state) => ({
      isSatellite:
        typeof isSat === "function" ? isSat(state.isSatellite) : isSat,
    })),

  setPitch3D: (pitch) =>
    set((state) => {
      const is3D = typeof pitch === "function" ? pitch(state.pitch3D) : pitch;
      return {
        pitch3D: is3D,
        viewState: {
          ...state.viewState,
          pitch: is3D ? 52 : 0,
          bearing: is3D ? -20 : 0,
        },
      };
    }),

  togglePitch3D: () =>
    set((state) => {
      const nextPitch = !state.pitch3D;
      return {
        pitch3D: nextPitch,
        viewState: {
          ...state.viewState,
          pitch: nextPitch ? 52 : 0,
          bearing: nextPitch ? -20 : 0,
        },
      };
    }),

  toggleCategory: (category) =>
    set((state) => {
      const next = new Set(state.activeCategories);
      if (next.has(category)) {
        if (next.size > 1) next.delete(category);
      } else {
        next.add(category);
      }
      return { activeCategories: next };
    }),

  setAllCategories: () =>
    set({ activeCategories: new Set<Category>(ALL_CATEGORIES) }),

  setActiveCity: (city) => set({ activeCity: city }),

  setViewState: (viewState) => set({ viewState }),

  setUserLocation: (loc) => set({ userLocation: loc }),

  flyToLocation: (lng, lat, zoom = 14, pitch, bearing) =>
    set((state) => ({
      viewState: {
        ...state.viewState,
        longitude: lng,
        latitude: lat,
        zoom,
        pitch: pitch !== undefined ? pitch : state.viewState.pitch,
        bearing: bearing !== undefined ? bearing : state.viewState.bearing,
      },
    })),

  resetToOverview: () =>
    set({
      viewState: INITIAL_VIEW_STATE,
      pitch3D: false,
      activeCity: "Todos",
      activeRoute: null,
      activeCategories: new Set<Category>(ALL_CATEGORIES),
    }),
}));
