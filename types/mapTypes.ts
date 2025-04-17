export interface Building {
  name: string;
  coordinates: { latitude: number; longitude: number };
}

export interface ZoomInfo {
  coordinates: [number, number];
  zoomLevel: number;
  animationDuration: number;
  markerLocation?: [number, number];
}

export interface Marker {
  id: string;
  name: string;
  coordinates: [number, number];
}

export interface RouteInfo {
  transportationMethod: Transportation;
  startingLocation: Building;
  destination: Building;
}

export type Transportation = 'Walking' | 'Driving' | 'Biking';

export type Filter =
  | 'Dining Halls'
  | 'Bathrooms'
  | 'Study Rooms'
  | 'Sports Fields'
  | 'Bus Stops'
  | undefined;
