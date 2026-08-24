"use client";

import { useState, useCallback } from "react";

export interface GeoLocationState {
  lat: number | null;
  lng: number | null;
  accuracy: number | null;
  loading: boolean;
  error: string | null;
}

export function useGeolocation() {
  const [state, setState] = useState<GeoLocationState>({
    lat: null,
    lng: null,
    accuracy: null,
    loading: false,
    error: null,
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({
        ...prev,
        error: "Geolocalização não suportada no seu navegador.",
        loading: false,
      }));
      return;
    }

    setState((prev) => ({ ...prev, loading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          loading: false,
          error: null,
        });
      },
      (err) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error:
            err.code === err.PERMISSION_DENIED
              ? "Permissão de localização negada."
              : "Não foi possível obter sua localização.",
        }));
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  return { ...state, requestLocation };
}
