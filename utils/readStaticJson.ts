import busGeoJsonData from '@/assets/maplist/bus.json';
import sportsGeoJsonData from '@/assets/maplist/sports.json';
import diningHallsGeoJsonData from '@/assets/maplist/dining_halls.json';
import cafeGeoJosnData from '@/assets/maplist/cafes.json'
import { Filter, Marker } from '@/types/mapTypes';

interface GeoJSONFeature {
  type: string;
  properties: {
    name: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}

interface GeoJSONData {
  type: string;
  name: string;
  crs: {
    type: string;
    properties: {
      name: string;
    };
  };
  features: GeoJSONFeature[];
}

const filterToJsonMap: Map<Filter, GeoJSONData> = new Map<Filter, GeoJSONData>([
  ['Bus Stops', busGeoJsonData],
  ['Dining Halls', diningHallsGeoJsonData],
  ['Sports Fields', sportsGeoJsonData],
  ['Cafes', cafeGeoJosnData]
]);

export const getMarkerData = (filter: Filter): Marker[] => {
  const geoJsonData: GeoJSONData | undefined = filterToJsonMap.get(filter);

  if (geoJsonData === undefined) {
    console.log('waiting on json development');
    return [];
  }
  return geoJsonData.features.map((feature: GeoJSONFeature) => ({
    id: `${feature.properties.name}${feature.geometry.coordinates[0]}_${feature.geometry.coordinates[1]}`,
    name: feature.properties.name,
    coordinates: [
      feature.geometry.coordinates[0],
      feature.geometry.coordinates[1],
    ],
  }));
};

export default getMarkerData;
