// Haversine formula to compute great-circle distance between two points in km
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Estimate approximate travel time (assuming average coastal speed 50 km/h or boat 25 km/h)
export function estimateTravelTime(
  distanceKm: number,
  isIsland: boolean = false,
): string {
  if (distanceKm < 1) return "< 5 min";
  if (isIsland) {
    const boatMinutes = Math.round((distanceKm / 25) * 60) + 15; // include boarding
    if (boatMinutes >= 60) {
      const h = Math.floor(boatMinutes / 60);
      const m = boatMinutes % 60;
      return `~${h}h ${m}m (barco/lancha)`;
    }
    return `~${boatMinutes} min (barco/lancha)`;
  }

  const carMinutes = Math.round((distanceKm / 45) * 60);
  if (carMinutes >= 60) {
    const h = Math.floor(carMinutes / 60);
    const m = carMinutes % 60;
    return `~${h}h ${m}m de carro`;
  }
  return `~${carMinutes} min de carro`;
}

// Generate direct Google Maps navigation URL
export function getGoogleMapsUrl(
  lat: number,
  lng: number,
  name?: string,
): string {
  if (name) {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

// Generate direct Waze navigation URL
export function getWazeUrl(lat: number, lng: number): string {
  return `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;
}

// Generate Apple Maps navigation URL
export function getAppleMapsUrl(
  lat: number,
  lng: number,
  name?: string,
): string {
  return `https://maps.apple.com/?daddr=${lat},${lng}&q=${encodeURIComponent(name || "Destino")}`;
}
