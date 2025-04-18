import { useState, useEffect, useMemo } from 'react';
import geojsonData from '@/assets/maplist/buildingsCentroid.json';
import { Building } from '@/types/mapTypes';
import Fuse from 'fuse.js';

export default function useBuildings() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // Map over the GeoJSON features to convert them to Building objects.
      const buildingsArray = geojsonData.features.map((feature: any) => ({
        name: feature.properties.name,
        coordinates: {
          // GeoJSON uses [longitude, latitude], so we swap the order.
          latitude: feature.geometry.coordinates[1],
          longitude: feature.geometry.coordinates[0],
        },
      }));
      setBuildings(buildingsArray);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a Fuse instance for fuzzy searching.
  const fuse = useMemo(() => {
    return new Fuse(buildings, {
      keys: ['name'],
      threshold: 0.4,
      includeScore: true,
    });
  }, [buildings]);

  const addUserLocationToReccomendations = (userLocation: [number, number]) => {
    const location: Building = {
      name: 'Your Location',
      coordinates: {
        longitude: userLocation.at(1) ?? 72.2454,
        latitude: userLocation.at(0) ?? 41.6135,
      },
    };
    setBuildings((buildings: Building[]) => buildings.concat(location))
  }

  const searchBuildings = (query: string): Building[] => {
    if (!query) return buildings;
    const results = fuse.search(query);
    return results.map((result) => result.item);
  };

  const getRecommendations = (search: string, count: number): Building[] => {
    if (buildings.length === 0) return [];
    if (!search) {
      // Return random recommendations.
      const shuffled = [...buildings].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
    const results = fuse.search(search);
    return results.map((result) => result.item).slice(0, count);
  };

  return { buildings, loading, error, searchBuildings, getRecommendations, addUserLocationToReccomendations };
}
