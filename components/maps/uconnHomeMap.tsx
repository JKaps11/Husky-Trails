//==============================================[Imports]==============================================
import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import {
  Camera,
  CameraRef,
  MapView,
  VectorSource,
  FillLayer,
  LineLayer,
  SymbolLayer,
  MarkerView,
  CameraBounds,
  ShapeSource,
  CircleLayer,
} from '@maplibre/maplibre-react-native';
import { Filter, Marker, ZoomInfo } from '@/types/mapTypes';
import { MaterialIcons } from '@expo/vector-icons';
import getMarkerData from '@/utils/readStaticJson';
import CustomMarker from './customMarker';
import { View } from 'react-native';
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location';
import { COLORS } from '@/constants/theme';

//==============================================[Component Props]==============================================
interface MapProps {
  zoomInfo: ZoomInfo;
  filter: Filter;
  routeLine?: [number, number][];
  centerMarkerVisible?: boolean;
  userLocation: [number, number] | null;
  setUserLocation: (coords: [number, number] | null) => void;
  showModalWithMessage: (msg: string) => void;
}

const UConnMap: React.FC<MapProps> = memo(
  ({
    zoomInfo,
    filter,
    routeLine,
    centerMarkerVisible = false,
    userLocation,
    setUserLocation,
    showModalWithMessage,
  }: MapProps) => {
    //==============================================[Map Initialization State]==============================================
    const MAP_API_ENDPOINT = [
      'https://cse-4939w-mapping-routes-qlq8.onrender.com/tiles/{z}/{x}/{y}.pbf',
    ];
    const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

    const cameraRef: React.RefObject<CameraRef> = useRef<CameraRef>(null);
    const cameraBounds: CameraBounds = {
      ne: [-72.235, 41.825],
      sw: [-72.275, 41.75],
    };

    const campusBounds = {
      ne: [-72.2405, 41.802],
      sw: [-72.265, 41.77],
    };

    //==============================================[Location Permissions + Handling]==============================================

    const isOnCampus = (lon: number, lat: number): boolean => {
      const withinLon = lon >= campusBounds.sw[0] && lon <= campusBounds.ne[0];
      const withinLat = lat >= campusBounds.sw[1] && lat <= campusBounds.ne[1];
      return withinLon && withinLat;
    };

    useEffect(() => {
      (async () => {
        const askPermission = async () => {
          try {
            const { status } = await requestForegroundPermissionsAsync();
            return status === 'granted';
          } catch (e) {
            console.error('Permission request error:', e);
            return false;
          }
        };

        try {
          const permissionGranted = await askPermission();
          if (!permissionGranted) {
            const secondTry = await askPermission();
            if (!secondTry) {
              showModalWithMessage(
                'Location access is required to show your current position on the map. Please enable location permissions in your device settings.',
              );
              return;
            }
          }

          const location = await getCurrentPositionAsync();
          const { latitude, longitude } = location.coords;

          if (
            isNaN(latitude) ||
            isNaN(longitude) ||
            latitude === 0 ||
            longitude === 0
          ) {
            throw new Error('Invalid coordinates returned');
          }

          const onCampus = isOnCampus(longitude, latitude);
          if (onCampus) {
            setUserLocation([longitude, latitude]);
          } else {
            showModalWithMessage(
              'To use location features, please reopen the app while on campus.',
            );
          }
        } catch (err: any) {
          console.error('Location fetch failed:', err);
          if (
            err?.message?.toLowerCase()?.includes('timeout') ||
            err?.code === 3
          ) {
            showModalWithMessage(
              'We couldn’t get your location in time. Please try again outdoors or check your GPS connection.',
            );
          } else {
            showModalWithMessage(
              'An error occurred while getting your location. Please check your device settings and try again.',
            );
          }
        }
      })();
    }, []);

    //==============================================[Utility Renderers]==============================================
    const displayMapPins = (markers: Marker[]): React.JSX.Element[] => {
      return markers.map((marker: Marker) => (
        <CustomMarker marker={marker} key={marker.id} />
      ));
    };

    const displayedPins = useMemo(() => {
      if (!isMapLoaded || !filter) return null;
      return displayMapPins(getMarkerData(filter));
    }, [isMapLoaded, filter]);

    //==============================================[Render]==============================================
    return (
      <>
        <MapView
          style={{ flex: 1 }}
          compassEnabled={false}
          attributionEnabled={false}
          onDidFinishLoadingMap={() => setIsMapLoaded(true)}
        >
          <Camera
            ref={cameraRef}
            key={`${zoomInfo.coordinates[0]}_${zoomInfo.coordinates[1]}_${zoomInfo.zoomLevel}`}
            centerCoordinate={zoomInfo.coordinates}
            animationDuration={zoomInfo.animationDuration}
            zoomLevel={zoomInfo.zoomLevel}
            minZoomLevel={13}
            maxBounds={cameraBounds}
          />

          {/* Base Map Tiles */}
          <VectorSource
            id="uconnSource"
            tileUrlTemplates={MAP_API_ENDPOINT}
            minZoomLevel={0}
            maxZoomLevel={12}
          >
            <FillLayer
              id="buildings-layer"
              sourceID="uconnSource"
              sourceLayerID="Buildings"
              style={{ fillColor: '#f8f9fa', fillOpacity: 0.4 }}
            />
            <LineLayer
              id="buildings-outline-layer"
              sourceID="uconnSource"
              sourceLayerID="Buildings"
              style={{ lineColor: '#6c757d', lineWidth: 1.5, lineOpacity: 0.8 }}
            />
            <LineLayer
              id="roads-layer"
              sourceID="uconnSource"
              sourceLayerID="Roads"
              style={{
                lineColor: '#495057',
                lineWidth: [
                  'match',
                  ['get', 'type'],
                  'primary',
                  4,
                  'secondary',
                  3,
                  2,
                ],
              }}
            />
            {filter === undefined && (
              <SymbolLayer
                id="building-names-layer"
                sourceID="uconnSource"
                sourceLayerID="Buildings"
                style={{
                  textColor: '#2b2d42',
                  textHaloColor: '#f8f9fa',
                  textHaloWidth: 2,
                  textSize: 12,
                  textField: ['get', 'name'],
                }}
              />
            )}
          </VectorSource>

          {/* Route Line + Endpoints */}
          {isMapLoaded && routeLine && routeLine.length > 0 && (
            <ShapeSource
              id="routeSource"
              shape={{
                type: 'FeatureCollection',
                features: [
                  {
                    type: 'Feature',
                    geometry: { type: 'LineString', coordinates: routeLine },
                    properties: { type: 'route' },
                  },
                  {
                    type: 'Feature',
                    geometry: { type: 'Point', coordinates: routeLine[0] },
                    properties: { type: 'endpoint', pointType: 'start' },
                  },
                  {
                    type: 'Feature',
                    geometry: {
                      type: 'Point',
                      coordinates: routeLine[routeLine.length - 1],
                    },
                    properties: { type: 'endpoint', pointType: 'end' },
                  },
                ],
              }}
            >
              <LineLayer
                id="route-line"
                sourceID="routeSource"
                filter={['==', ['get', 'type'], 'route']}
                style={{
                  lineColor: COLORS.tertiary,
                  lineWidth: 4,
                  lineOpacity: 0.9,
                }}
              />
              <CircleLayer
                id="route-endpoints"
                sourceID="routeSource"
                filter={['==', ['get', 'type'], 'endpoint']}
                style={{
                  circleRadius: 6,
                  circleColor: COLORS.primary,
                  circleStrokeColor: '#fff',
                  circleStrokeWidth: 2,
                }}
              />
            </ShapeSource>
          )}

          {/* Pins & Zoom Marker */}
          {displayedPins}

          {isMapLoaded && centerMarkerVisible && (
            <MarkerView
              key={`marker-${zoomInfo.coordinates.join('-')}`}
              id="zoom-marker"
              coordinate={zoomInfo.coordinates}
              style={{ zIndex: 1000 }}
              anchor={{ x: 0, y: 0 }}
            >
              <View style={{ alignItems: 'center' }}>
                <MaterialIcons
                  name="location-on"
                  size={40}
                  color="#000E2F"
                  style={{
                    shadowColor: '#2b2d42',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                  }}
                />
              </View>
            </MarkerView>
          )}

          {/* User Location Marker */}
          {userLocation && isMapLoaded && (
            <MarkerView
              id="user-location"
              coordinate={userLocation}
              anchor={{ x: 0.5, y: 0.5 }}
              style={{ zIndex: 2000 }}
            >
              <View style={{ alignItems: 'center' }}>
                <MaterialIcons
                  name="navigation"
                  size={40}
                  color={COLORS.primaryO}
                  style={{
                    backgroundColor: 'transparent',
                    borderRadius: 14,
                    padding: 2,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.2,
                    shadowRadius: 2,
                  }}
                />
              </View>
            </MarkerView>
          )}
        </MapView>
      </>
    );
  },
);

export default UConnMap;
