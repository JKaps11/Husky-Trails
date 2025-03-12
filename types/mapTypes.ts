export interface Building {
  name: string;
  coordinates: { latitude: number; longitude: number };
}

export interface ZoomInfo {
  coordinates: [number, number];
  zoomLevel: number;
  animationDuration: number;
}

export interface Marker {
  id: string;
  name: string;
  coordinates: [number, number];
}

export type Filter =
  | 'Dining Halls'
  | 'Bathrooms'
  | 'Study Rooms'
  | 'Sports Fields'
  | 'Bus Stops'
  | undefined;
