import { useState, useEffect, useMemo } from 'react';
import buildingsData from '@/assets/maplist/uconnBuildings.json';
import { Building } from '@/types/mapTypes';
import Fuse from 'fuse.js';

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

  // Create a Fuse instance for fuzzy searching
  const fuse = useMemo(() => {
    return new Fuse(buildings, {
      keys: ['name'], // Search within the 'name' property of each building.
      threshold: 0.4, // Adjust threshold as needed; lower values make the search more strict.
      includeScore: true,
    });
  }, [buildings]);

  // Fuzzy search buildings by name (case-insensitive)
  const searchBuildings = (query: string): Building[] => {
    if (!query) return buildings;
    const results = fuse.search(query);
    return results.map((result) => result.item);
  };

  // getRecommendations now uses Fuse.js for a fuzzy match.
  const getRecommendations = (search: string, count: number): Building[] => {
    if (buildings.length === 0) return [];
    if (!search) {
      // If the search string is empty, return random recommendations.
      const shuffled = [...buildings].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
    const results = fuse.search(search);
    return results.map((result) => result.item).slice(0, count);
  };

  return { buildings, loading, error, searchBuildings, getRecommendations };
}
