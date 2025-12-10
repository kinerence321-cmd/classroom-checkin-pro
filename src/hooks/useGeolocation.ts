import { useState, useCallback, useEffect } from 'react';
import type { LocationState, Classroom } from '@/types';

// Haversine formula to calculate distance between two coordinates
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export function useGeolocation(classroom?: Classroom) {
  const [state, setState] = useState<LocationState>({
    isLoading: false,
    isWithinRange: false,
    error: null,
    currentPosition: null,
  });

  const checkLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        isLoading: false,
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (classroom) {
          const distance = calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            classroom.latitude,
            classroom.longitude
          );

          setState({
            isLoading: false,
            isWithinRange: distance <= classroom.radiusMeters,
            error: null,
            currentPosition: position,
          });
        } else {
          setState({
            isLoading: false,
            isWithinRange: false,
            error: null,
            currentPosition: position,
          });
        }
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.';
            break;
        }

        setState({
          isLoading: false,
          isWithinRange: false,
          error: errorMessage,
          currentPosition: null,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, [classroom]);

  // Auto-check location when classroom changes
  useEffect(() => {
    if (classroom) {
      checkLocation();
    }
  }, [classroom, checkLocation]);

  return { ...state, checkLocation };
}
