import { useState, useEffect } from 'react';
import buildingsData from '@/assets/maplist/uconnBuildings.json'; // Ensure the path is correct
import { Building } from '@/types/mapTypes';
import { MapViewRef } from '@maplibre/maplibre-react-native';

export default function useBuildings() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      setBuildings(buildingsData);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Search buildings by name (case-insensitive)
  const searchBuildings = (query: string): Building[] => {
    if (!query) return buildings;
    return buildings.filter((building) =>
      building.name.toLowerCase().includes(query.toLowerCase()),
    );
  };

  function levenshtein(a: string, b: string): number {
    const lowerA = a.toLowerCase();
    const lowerB = b.toLowerCase();
    const matrix: number[][] = [];
    const aLen = lowerA.length;
    const bLen = lowerB.length;

    if (aLen === 0) return bLen;
    if (bLen === 0) return aLen;

    // initialize matrix
    for (let i = 0; i <= bLen; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= aLen; j++) {
      matrix[0][j] = j;
    }

    // compute distances
    for (let i = 1; i <= bLen; i++) {
      for (let j = 1; j <= aLen; j++) {
        if (lowerB.charAt(i - 1) === lowerA.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1, // deletion
            matrix[i][j - 1] + 1, // insertion
            matrix[i - 1][j - 1] + 1, // substitution
          );
        }
      }
    }
    return matrix[bLen][aLen];
  }

  // Updated recommendations method that uses closeness based on the search string.
  const getRecommendations = (search: string, count: number): Building[] => {
    if (buildings.length === 0) return [];

    if (!search) {
      // if search string is empty, return random recommendations
      const shuffled = [...buildings].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    // Sort buildings by closeness (lowest Levenshtein distance first)
    const sortedByCloseness = [...buildings].sort((a, b) => {
      const distanceA = levenshtein(search, a.name);
      const distanceB = levenshtein(search, b.name);
      return distanceA - distanceB;
    });
    return sortedByCloseness.slice(0, count);
  };

  return { buildings, loading, error, searchBuildings, getRecommendations };
}
