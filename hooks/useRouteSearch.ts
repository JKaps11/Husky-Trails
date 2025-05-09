//==============================================[Imports]==============================================
import { useEffect, useMemo, useState } from 'react';
import { Building, Marker, RouteInfo, Transportation, ZoomInfo } from '@/types/mapTypes';

//==============================================[Hook Definition]==============================================
export function useRouteSearch(setZoomInfo: (zi: ZoomInfo) => void) {
  const ROUTE_ENDPOINT =
    'routeEndpointGoesHere';

  //==============================================[State]==============================================
  const [routeInfo, setRouteInfo] = useState<RouteInfo>({
    transportationMethod: 'Walking',
    startingLocation: { name: '', coordinates: { latitude: 0, longitude: 0 } },
    destination: { name: '', coordinates: { latitude: 0, longitude: 0 } },
  });

  const [routeLines, setRouteLines] = useState<Record<Transportation, [number, number][]>>({
    Walking: [],
    Driving: [],
    Biking: []
  });
  
  const [routeSearchQuery, setRouteSearchQuery] = useState<string>('');
  const [activeRouteField, setActiveRouteField] = useState<
    'start' | 'end' | null
  >(null);
  const [routeModalVisible, setRouteModalVisible] = useState(false);
  const [startSelected, setStartSelected] = useState(false);
  const [endSelected, setEndSelected] = useState(false);
  const [isFetchingRoute, setIsFetchingRoute] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);

  const isRouteReady = startSelected && endSelected;

  //==============================================[API Call]==============================================
  const fetchRoutePath = async () => {
    if (!startSelected || !endSelected) return;

    const startCoords = routeInfo.startingLocation.coordinates;
    const endCoords = routeInfo.destination.coordinates;

    setIsFetchingRoute(true);
    setRouteError(null);

    try {
      const bodyBase = {
        start: [startCoords.longitude, startCoords.latitude],
        end: [endCoords.longitude, endCoords.latitude],
      };
  
      const [walkRes, driveRes, bikeRes] = await Promise.all([
        fetch(ROUTE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...bodyBase, profile: 'foot' }),
        }),
        fetch(ROUTE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...bodyBase, profile: 'car' }),
        }),
        fetch(ROUTE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...bodyBase, profile: 'bike' }),
        }),
      ]);
  
      const [walkData, driveData, bikeData] = await Promise.all([
        walkRes.json(),
        driveRes.json(),
        bikeRes.json(),
      ]);

      if (!walkData.coordinates || !driveData.coordinates || !bikeData.coordinates) {
        throw new Error('Invalid route data');
      }

      if (
        !Array.isArray(walkData.coordinates) ||
        !Array.isArray(driveData.coordinates) ||
        !Array.isArray(bikeData.coordinates)
      ) {
        console.error('Invalid route data: one or more coordinate arrays are invalid');
        return;
      }
      
      
      setRouteLines({
        Walking: walkData.coordinates,
        Driving: driveData.coordinates,
        Biking: bikeData.coordinates
      })

      zoomToRoute(walkData.coordinates);
    } catch (err) {
      setRouteError('Could not fetch route. Try again.');
    } finally {
      setIsFetchingRoute(false);
    }
  };

  useEffect(() => {
    if (startSelected && endSelected) {
      fetchRoutePath();
    }
  }, [startSelected, endSelected]);

  //==============================================[Handle Zoom]==============================================
  const zoomToRoute = (coordinates: [number, number][]) => {
    const lngs = coordinates.map((c) => c[0]);
    const lats = coordinates.map((c) => c[1]);

    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);
    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);

    const center: [number, number] = [
      (minLng + maxLng) / 2,
      (minLat + maxLat) / 2,
    ];

    // crude zoom level estimate — can be refined if needed
    const zoomLevel = 14; // good default for campus-scale

    setZoomInfo({
      coordinates: center,
      zoomLevel,
      animationDuration: 1000,
    });
  };
  //==============================================[Modal Control]==============================================
  const showRouteSearchModalFor = (field: 'start' | 'end') => {
    setActiveRouteField(field);
    setRouteSearchQuery(
      field === 'start'
        ? routeInfo.startingLocation.name
        : routeInfo.destination.name,
    );
    setRouteModalVisible(true);
  };

  const hideRouteModal = () => {
    setRouteModalVisible(false);
    setActiveRouteField(null);
  };

  //==============================================[Functions for User]==============================================
  /**
   * Sets the starting location in route info to the user location or the center of campus
   * @param userLocation Coordinates for where the user is located
   * @returns nothing if userLocation is null or not available
   */
  const setStartingLocationToUserLocation = (
    userLocation: [number, number],
  ) => {
    const location: Building = {
      name: 'Your Location',
      coordinates: {
        longitude: userLocation.at(0) ?? 72.2454,
        latitude: userLocation.at(1) ?? 41.6135,
      },
    };

    setRouteInfo((prev) => ({
      ...prev,
      startingLocation: location,
    }));

    setStartSelected(true);
  };

  const setRouteWithInitialStartingLocationUser = (m: Marker) => {
    const location: Building = {
      name: m.name,
      coordinates: {
        longitude: m.coordinates.at(0) ?? 72.2454,
        latitude: m.coordinates.at(1) ?? 41.6135,
      },
    };
    setRouteInfo((prev) => ({
      ...prev,
      destination: location,
    }));
    setEndSelected(true);
  };

  //==============================================[Input Handling]==============================================
  const getRouteLine = useMemo(() => {
    const method = routeInfo.transportationMethod;
    if (method === "Walking") return routeLines.Walking;
    if (method === "Driving") return routeLines.Driving;
    if (method === "Biking") return routeLines.Biking;
    return [];
  }, [routeInfo.transportationMethod, routeLines]);
  

  const clearRoute = () => {
    setRouteInfo({
      transportationMethod: 'Walking',
      startingLocation: {
        name: '',
        coordinates: { latitude: 0, longitude: 0 },
      },
      destination: { name: '', coordinates: { latitude: 0, longitude: 0 } },
    });
    setRouteLines({
      Walking: [],
      Driving: [],
      Biking: []
    })
    setStartSelected(false);
    setEndSelected(false);
    setRouteSearchQuery('');
    setRouteModalVisible(false);
    setActiveRouteField(null);
  };

  const selectRouteBuilding = (building: Building) => {
    if (activeRouteField === 'start') {
      setRouteInfo((prev) => ({
        ...prev,
        startingLocation: building,
      }));
      setStartSelected(true);
    } else if (activeRouteField === 'end') {
      setRouteInfo((prev) => ({
        ...prev,
        destination: building,
      }));
      setEndSelected(true);
    }

    setRouteSearchQuery(building.name);
    hideRouteModal();
  };

  const updateRouteFieldText = (text: string, field: 'start' | 'end') => {
    setRouteInfo((prev) => ({
      ...prev,
      [field === 'start' ? 'startingLocation' : 'destination']: {
        ...prev[field === 'start' ? 'startingLocation' : 'destination'],
        name: text,
      },
    }));
    setRouteSearchQuery(text);

    if (field === 'start') setStartSelected(false);
    if (field === 'end') setEndSelected(false);

    if (!routeModalVisible || activeRouteField !== field) {
      showRouteSearchModalFor(field);
    }
  };

  const setTransportationMethod = (
    method: 'Walking' | 'Driving' | 'Biking',
  ) => {
    setRouteInfo((prev) => ({
      ...prev,
      transportationMethod: method,
    }));
  };
  //==============================================[Return Values]==============================================
  return {
    routeInfo,
    setRouteInfo,
    routeSearchQuery,
    setRouteSearchQuery,
    routeModalVisible,
    showRouteSearchModalFor,
    hideRouteModal,
    selectRouteBuilding,
    activeRouteField,
    updateRouteFieldText,
    setTransportationMethod,
    getRouteLine,
    startSelected,
    endSelected,
    clearRoute,
    setStartingLocationToUserLocation,
    setRouteWithInitialStartingLocationUser,
    isRouteReady,
    isFetchingRoute,
  };
}
