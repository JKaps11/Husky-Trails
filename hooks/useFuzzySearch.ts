import { Filter, Marker } from '@/types/mapTypes';
import getMarkerData from '@/utils/readStaticJson';
import Fuse from 'fuse.js';
import { useMemo } from 'react';

export default function useFuzzySearch(filter: Filter) {
  const items: Marker[] = getMarkerData(filter);

  const fuse = useMemo(() => {
    return new Fuse(items, {
      keys: ['name'],
      threshold: 0.4,
      includeScore: true,
    });
  }, [items]);

  const searchItems = (query: string): Marker[] => {
    if (!query) return items;
    const results = fuse.search(query);
    return results.map((result) => result.item);
  };

  const getRecommendations: (search: string, count: number) => Marker[] = (
    search: string,
    count: number,
  ) => {
    if (items.length === 0) return [];
    if (!search) {
      // Return random recommendations.
      const shuffled = [...items].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }
    const results = fuse.search(search);
    return results.map((result) => result.item).slice(0, count);
  };
  return { searchItems, getRecommendations };
}
