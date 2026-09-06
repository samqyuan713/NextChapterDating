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
  latitude: number;
  longitude: number;
}

export const POPULAR_CITY_PRESETS: CityPreset[] = [
  { name: "Singapore", label: "Singapore (Central)", latitude: 1.3521, longitude: 103.8198 },
  { name: "Sausalito, CA", label: "San Francisco Bay Area / Sausalito, CA", latitude: 37.8591, longitude: -122.4853 },
  { name: "Oakwood Hills, IL", label: "Chicago Metro / Oakwood Hills, IL", latitude: 42.2314, longitude: -88.2570 },
  { name: "Austin, TX", label: "Austin, TX", latitude: 30.2672, longitude: -97.7431 },
  { name: "Savannah, GA", label: "Savannah, GA", latitude: 32.0809, longitude: -81.0912 },
  { name: "Portland, OR", label: "Portland, OR", latitude: 45.5152, longitude: -122.6784 },
  { name: "Boulder, CO", label: "Boulder, CO", latitude: 40.0150, longitude: -105.2705 },
  { name: "Seattle, WA", label: "Seattle, WA", latitude: 47.6062, longitude: -122.3321 },
  { name: "Kyoto, Japan", label: "Kyoto, Japan", latitude: 35.0116, longitude: 135.7681 },
  { name: "London, UK", label: "London, United Kingdom", latitude: 51.5074, longitude: -0.1278 }
];

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
