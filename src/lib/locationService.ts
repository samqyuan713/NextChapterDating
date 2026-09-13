/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Geolocation, Position } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';

export interface GeoCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  city?: string;
  source: 'gps' | 'manual' | 'preset';
}

export interface CityPreset {
  name: string;
  label: string;
  shortName?: string;
  flag?: string;
  latitude: number;
  longitude: number;
  region?: 'sea' | 'asia' | 'namerica' | 'europe';
}

// Southeast Asian regional presets
export const SEA_CITY_PRESETS: CityPreset[] = [
  { name: "Singapore", label: "Singapore", shortName: "Singapore", flag: "🇸🇬", latitude: 1.3521, longitude: 103.8198, region: 'sea' },
  { name: "Kuala Lumpur, MY", label: "Kuala Lumpur, Malaysia", shortName: "Kuala Lumpur", flag: "🇲🇾", latitude: 3.1390, longitude: 101.6869, region: 'sea' },
  { name: "Penang, MY", label: "Penang, Malaysia", shortName: "Penang", flag: "🇲🇾", latitude: 5.4141, longitude: 100.3288, region: 'sea' },
  { name: "Bangkok, TH", label: "Bangkok, Thailand", shortName: "Bangkok", flag: "🇹🇭", latitude: 13.7563, longitude: 100.5018, region: 'sea' },
  { name: "Jakarta, ID", label: "Jakarta, Indonesia", shortName: "Jakarta", flag: "🇮🇩", latitude: -6.2088, longitude: 106.8456, region: 'sea' },
  { name: "Bali, ID", label: "Bali / Denpasar, Indonesia", shortName: "Bali", flag: "🇮🇩", latitude: -8.6705, longitude: 115.2126, region: 'sea' },
  { name: "Manila, PH", label: "Manila, Philippines", shortName: "Manila", flag: "🇵🇭", latitude: 14.5995, longitude: 120.9842, region: 'sea' },
  { name: "Ho Chi Minh City, VN", label: "Ho Chi Minh City, Vietnam", shortName: "Ho Chi Minh", flag: "🇻🇳", latitude: 10.8231, longitude: 106.6297, region: 'sea' },
];

// Extended Asian regional cities (East Asia & South Asia)
export const ASIA_EXTENDED_PRESETS: CityPreset[] = [
  { name: "Tokyo, Japan", label: "Tokyo, Japan", shortName: "Tokyo", flag: "🇯🇵", latitude: 35.6762, longitude: 139.6503, region: 'asia' },
  { name: "Kyoto, Japan", label: "Kyoto, Japan", shortName: "Kyoto", flag: "🇯🇵", latitude: 35.0116, longitude: 135.7681, region: 'asia' },
  { name: "Hong Kong", label: "Hong Kong", shortName: "Hong Kong", flag: "🇭🇰", latitude: 22.3193, longitude: 114.1694, region: 'asia' },
  { name: "Taipei, Taiwan", label: "Taipei, Taiwan", shortName: "Taipei", flag: "🇹🇼", latitude: 25.0330, longitude: 121.5654, region: 'asia' },
  { name: "Seoul, Korea", label: "Seoul, South Korea", shortName: "Seoul", flag: "🇰🇷", latitude: 37.5665, longitude: 126.9780, region: 'asia' },
  { name: "Mumbai, India", label: "Mumbai, India", shortName: "Mumbai", flag: "🇮🇳", latitude: 19.0760, longitude: 72.8777, region: 'asia' }
];

export const ASIAN_REGIONAL_PRESETS: CityPreset[] = [
  ...SEA_CITY_PRESETS,
  ...ASIA_EXTENDED_PRESETS
];

// North American city presets (with concise labels so dropdowns do not exceed container width)
export const NORTH_AMERICA_PRESETS: CityPreset[] = [
  { name: "Sausalito, CA", label: "Sausalito / SF Bay, CA", shortName: "Sausalito", flag: "🇺🇸", latitude: 37.8591, longitude: -122.4853, region: 'namerica' },
  { name: "Oakwood Hills, IL", label: "Oakwood Hills / Chicago, IL", shortName: "Chicago Metro", flag: "🇺🇸", latitude: 42.2314, longitude: -88.2570, region: 'namerica' },
  { name: "Austin, TX", label: "Austin, TX", shortName: "Austin", flag: "🇺🇸", latitude: 30.2672, longitude: -97.7431, region: 'namerica' },
  { name: "Seattle, WA", label: "Seattle, WA", shortName: "Seattle", flag: "🇺🇸", latitude: 47.6062, longitude: -122.3321, region: 'namerica' },
  { name: "Portland, OR", label: "Portland, OR", shortName: "Portland", flag: "🇺🇸", latitude: 45.5152, longitude: -122.6784, region: 'namerica' },
  { name: "Boulder, CO", label: "Boulder, CO", shortName: "Boulder", flag: "🇺🇸", latitude: 40.0150, longitude: -105.2705, region: 'namerica' },
  { name: "Savannah, GA", label: "Savannah, GA", shortName: "Savannah", flag: "🇺🇸", latitude: 32.0809, longitude: -81.0912, region: 'namerica' },
  { name: "New York, NY", label: "New York, NY", shortName: "New York", flag: "🇺🇸", latitude: 40.7128, longitude: -74.0060, region: 'namerica' },
];

// European city presets
export const EUROPE_PRESETS: CityPreset[] = [
  { name: "London, UK", label: "London, UK", shortName: "London", flag: "🇬🇧", latitude: 51.5074, longitude: -0.1278, region: 'europe' },
  { name: "Paris, France", label: "Paris, France", shortName: "Paris", flag: "🇫🇷", latitude: 48.8566, longitude: 2.3522, region: 'europe' },
  { name: "Berlin, Germany", label: "Berlin, Germany", shortName: "Berlin", flag: "🇩🇪", latitude: 52.5200, longitude: 13.4050, region: 'europe' },
  { name: "Amsterdam, NL", label: "Amsterdam, NL", shortName: "Amsterdam", flag: "🇳🇱", latitude: 52.3676, longitude: 4.9041, region: 'europe' },
];

// Comprehensive catalog of all presets
export const ALL_CITY_PRESETS: CityPreset[] = [
  ...ASIAN_REGIONAL_PRESETS,
  ...NORTH_AMERICA_PRESETS,
  ...EUROPE_PRESETS
];

// Backward-compatible default list
export const POPULAR_CITY_PRESETS: CityPreset[] = ALL_CITY_PRESETS;

export type WorldRegion = 'sea' | 'asia' | 'namerica' | 'europe' | 'global';

/**
 * Detects the macro region based on GPS coordinates.
 * Defaults to Southeast Asia (Singapore) when coordinates are unavailable or in SEA.
 */
export function detectWorldRegion(lat?: number, lon?: number): WorldRegion {
  if (lat === undefined || lon === undefined) {
    return 'sea'; // Default home region is Southeast Asia
  }

  // Southeast Asia (approx: lat -12° to 25°N, lon 92° to 142°E)
  if (lat >= -12 && lat <= 25 && lon >= 92 && lon <= 142) {
    return 'sea';
  }

  // Broader East / South / North Asia (lat -12° to 55°N, lon 65° to 150°E)
  if (lat >= -12 && lat <= 55 && lon >= 65 && lon <= 150) {
    return 'asia';
  }

  // Europe (lat 35° to 72°N, lon -15° to 45°E)
  if (lat >= 35 && lat <= 72 && lon >= -15 && lon <= 45) {
    return 'europe';
  }

  // North America (lat 15° to 75°N, lon -170° to -50°W)
  if (lat >= 15 && lat <= 75 && lon >= -170 && lon <= -50) {
    return 'namerica';
  }

  return 'global';
}

export interface RegionPresetData {
  region: WorldRegion;
  regionLabel: string;
  regionShortBadge: string;
  regionalPresets: CityPreset[];
  otherPresets: CityPreset[];
  allPresets: CityPreset[];
}

/**
 * Returns prioritized city presets dynamically adapted to current GPS coordinates.
 * When in SEA or broader Asia, returns Asian regional cities as primary presets.
 */
export function getPresetsForLocation(lat?: number, lon?: number): RegionPresetData {
  const region = detectWorldRegion(lat, lon);

  let regionLabel = "Asian Regional";
  let regionShortBadge = "SEA / Asia";
  let regionalPresets: CityPreset[] = ASIAN_REGIONAL_PRESETS;
  let otherPresets: CityPreset[] = [...NORTH_AMERICA_PRESETS, ...EUROPE_PRESETS];

  if (region === 'sea') {
    regionLabel = "Southeast Asia (SEA)";
    regionShortBadge = "SEA";
    regionalPresets = ASIAN_REGIONAL_PRESETS;
    otherPresets = [...NORTH_AMERICA_PRESETS, ...EUROPE_PRESETS];
  } else if (region === 'asia') {
    regionLabel = "Asia Regional";
    regionShortBadge = "Asia";
    regionalPresets = ASIAN_REGIONAL_PRESETS;
    otherPresets = [...NORTH_AMERICA_PRESETS, ...EUROPE_PRESETS];
  } else if (region === 'namerica') {
    regionLabel = "North America";
    regionShortBadge = "N. America";
    regionalPresets = NORTH_AMERICA_PRESETS;
    otherPresets = [...ASIAN_REGIONAL_PRESETS, ...EUROPE_PRESETS];
  } else if (region === 'europe') {
    regionLabel = "Europe";
    regionShortBadge = "Europe";
    regionalPresets = EUROPE_PRESETS;
    otherPresets = [...ASIAN_REGIONAL_PRESETS, ...NORTH_AMERICA_PRESETS];
  } else {
    regionLabel = "Global Presets";
    regionShortBadge = "Global";
    regionalPresets = ALL_CITY_PRESETS;
    otherPresets = [];
  }

  return {
    region,
    regionLabel,
    regionShortBadge,
    regionalPresets,
    otherPresets,
    allPresets: ALL_CITY_PRESETS
  };
}

/**
 * Calculates great-circle distance between two points on the Earth's surface (Haversine formula).
 * Returns { miles, km }.
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { miles: number; km: number } {
  const R_KM = 6371; // Earth radius in kilometers
  const R_MILES = 3958.8; // Earth radius in miles

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const km = Math.round(R_KM * c * 10) / 10;
  const miles = Math.round(R_MILES * c * 10) / 10;

  return { miles, km };
}

/**
 * Formats a distance into a human-friendly Tinder-style distance string
 */
export function formatDistance(miles?: number, km?: number): string {
  if (miles === undefined && km === undefined) return "Nearby";
  if (miles !== undefined) {
    if (miles < 1) return "< 1 mile away";
    if (miles === 1) return "1 mile away";
    if (miles < 100) return `${Math.round(miles)} miles away`;
    return `${Math.round(miles).toLocaleString()} miles away`;
  }
  if (km !== undefined) {
    if (km < 1) return "< 1 km away";
    if (km < 100) return `${Math.round(km)} km away`;
    return `${Math.round(km).toLocaleString()} km away`;
  }
  return "Nearby";
}

/**
 * Attempts to reverse geocode latitude and longitude to a human-readable city string.
 */
export async function reverseGeocodeCity(lat: number, lon: number): Promise<string> {
  // Check against our curated preset list first for instant resolution
  for (const preset of POPULAR_CITY_PRESETS) {
    const dist = calculateDistance(lat, lon, preset.latitude, preset.longitude);
    if (dist.km < 25) {
      return preset.name;
    }
  }

  // Attempt Nominatim reverse geocoding with quick timeout
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
      {
        headers: { 'Accept-Language': 'en' },
        signal: controller.signal
      }
    );
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const addr = data.address || {};
      const city = addr.city || addr.town || addr.village || addr.suburb || addr.municipality || addr.state;
      const country = addr.country || "";
      if (city && country) {
        return `${city}, ${country}`;
      } else if (city) {
        return city;
      }
    }
  } catch (err) {
    // Graceful fallback
  }

  return `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`;
}

/**
 * Retrieves the current GPS location using Capacitor Geolocation (Native)
 * or Browser Geolocation API.
 */
export async function requestCurrentLocation(): Promise<{
  success: boolean;
  coordinates?: GeoCoordinates;
  error?: string;
}> {
  try {
    // 1. Try Native Capacitor Geolocation first if running on Android/iOS
    if (Capacitor.isNativePlatform()) {
      try {
        const permStatus = await Geolocation.checkPermissions();
        if (permStatus.location !== 'granted') {
          const reqStatus = await Geolocation.requestPermissions();
          if (reqStatus.location !== 'granted') {
            return {
              success: false,
              error: 'Location permission was denied. Please allow location access in your device settings to discover nearby matches.'
            };
          }
        }

        const position: Position = await Geolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        });

        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const city = await reverseGeocodeCity(lat, lon);

        return {
          success: true,
          coordinates: {
            latitude: lat,
            longitude: lon,
            accuracy: position.coords.accuracy,
            city,
            source: 'gps'
          }
        };
      } catch (nativeErr: any) {
        console.warn("[locationService] Native geolocation error:", nativeErr);
      }
    }

    // 2. Web Geolocation API fallback (Browsers & Webview)
    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const city = await reverseGeocodeCity(lat, lon);
            resolve({
              success: true,
              coordinates: {
                latitude: lat,
                longitude: lon,
                accuracy: pos.coords.accuracy,
                city,
                source: 'gps'
              }
            });
          },
          (err) => {
            let message = "Could not retrieve GPS coordinates.";
            if (err.code === err.PERMISSION_DENIED) {
              message = "Location permission denied. You can select your city or preset location manually.";
            } else if (err.code === err.TIMEOUT) {
              message = "Location request timed out. Please try again or select a location preset.";
            } else if (err.code === err.POSITION_UNAVAILABLE) {
              message = "GPS signal unavailable. Please ensure location services are enabled on your device.";
            }
            resolve({
              success: false,
              error: message
            });
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 60000
          }
        );
      });
    }

    return {
      success: false,
      error: "Geolocation is not supported by your current device/browser."
    };
  } catch (globalErr: any) {
    return {
      success: false,
      error: globalErr?.message || "Failed to retrieve location"
    };
  }
}
