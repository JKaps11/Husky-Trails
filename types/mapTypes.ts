export interface Building {
  name: string;
  coordinates: { latitude: number; longitude: number };
}

export interface ZoomInfo {
  coordinates: [number, number];
  zoomLevel: number;
  animationDuration: number;
}
