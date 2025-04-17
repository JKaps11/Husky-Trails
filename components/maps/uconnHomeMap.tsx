import React, { useState, useEffect, useRef, memo } from 'react';
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
import MapModal from './MapModal';
import { COLORS } from '@/constants/theme';

interface MapProps {
  zoomInfo: ZoomInfo;
  filter: Filter;
}

const UConnMap: React.FC<MapProps> = memo(({ zoomInfo, filter }: MapProps) => {
  //==============================================[Initialize Map State]=========================================
  const MAP_API_ENDPOINT = ["https://cse-4939w-mapping-routes-qlq8.onrender.com/tiles/{z}/{x}/{y}.pbf"]
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const cameraRef: React.RefObject<CameraRef> = useRef<CameraRef>(null);
  const cameraBounds: CameraBounds = {
    ne: [-72.235, 41.825], // Northeast corner of campus
    sw: [-72.275, 41.75], // Southwest corner of campus
  };

  const campusBounds = {
    ne: [-72.2405, 41.802], // Tighter, real campus area
    sw: [-72.265, 41.77],
  };

  //==============================================[Get User Location]==============================================
  const showModalWithMessage = (msg: string) => {
    setTimeout(() => {
      setModalMessage(msg);
      setShowModal(true);
    }, 500); // Smooth delay
  };

  // Check if user location is within campus bounds
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
          console.log('Permission status:', status);
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
            console.warn('Permission denied after second try');
            showModalWithMessage(
              'Location access is required to show your current position on the map. Please enable location permissions in your device settings.',
            );
            return;
          }
        }

        console.log('Getting current position...');
        const location = await getCurrentPositionAsync(); // ← no timeout param
        console.log('Location received:', location);

        const { latitude, longitude } = location.coords;
        console.log('User coordinates:', { latitude, longitude });

        if (
          isNaN(latitude) ||
          isNaN(longitude) ||
          latitude === 0 ||
          longitude === 0
        ) {
          console.warn('Invalid coordinates detected');
          throw new Error('Invalid coordinates returned');
        }

        const onCampus = isOnCampus(longitude, latitude);
        console.log('Is on campus?', onCampus);

        if (onCampus) {
          console.log('Setting user location');
          setUserLocation([longitude, latitude]);
        } else {
          console.log('User is off campus — showing modal');
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

  //==============================================[Utility Functions]==============================================
  const displayMapPins = (markers: Marker[]): React.JSX.Element[] => {
    return markers.map((marker: Marker) => (
      <CustomMarker marker={marker} key={marker.id} />
    ));
  };

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
        <VectorSource
          id="uconnSource"
          tileUrlTemplates={MAP_API_ENDPOINT}
          minZoomLevel={0}
          maxZoomLevel={12}
        >
          {/* Buildings Fill Layer */}
          <FillLayer
            id="buildings-layer"
            sourceID="uconnSource"
            sourceLayerID="Buildings"
            style={{
              fillColor: '#f8f9fa', // Very light neutral
              fillOpacity: 0.4,
            }}
          />

          {/* Buildings Outline Layer */}
          <LineLayer
            id="buildings-outline-layer"
            sourceID="uconnSource"
            sourceLayerID="Buildings"
            style={{
              lineColor: '#6c757d', // Medium gray
              lineWidth: 1.5,
              lineOpacity: 0.8,
            }}
          />
          {/* Roads Layer */}
          <LineLayer
            sourceID="uconnSource"
            sourceLayerID="Roads"
            id="roads-layer"
            style={{
              lineColor: '#495057', // Dark charcoal
              lineWidth: [
                'match',
                ['get', 'type'], // If your data has road types
                'primary',
                4,
                'secondary',
                3,
                2, // Default
              ],
            }}
          />
          {filter === undefined && (
            <SymbolLayer
              id="building-names-layer"
              sourceID="uconnSource"
              sourceLayerID="Buildings" // source layer with building names
              style={{
                textColor: '#2b2d42', // Dark navy
                textHaloColor: '#f8f9fa', // Matches building fill
                textHaloWidth: 2,
                textSize: 12,
                textField: ['get', 'name'],
              }}
            />
          )}
        </VectorSource>
        {isMapLoaded &&
          filter != undefined &&
          displayMapPins(getMarkerData(filter))}
        {isMapLoaded && filter === undefined && (
          <MarkerView
            key={`marker-${zoomInfo.coordinates.join('-')}`}
            id="zoom-marker"
            coordinate={zoomInfo.coordinates}
            style={{ zIndex: 1000 }}
            anchor={{ x: 0, y: 0 }} // Tip of the icon at coordinate
          >
            <View style={{ alignItems: 'center' }}>
              <MaterialIcons
                name="location-on" // Make sure the icon name is valid
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

        {/* 👤 User location marker */}
        {userLocation && (
          <MarkerView
            id="user-location"
            coordinate={userLocation}
            anchor={{ x: 0.5, y: 0.5 }}
            style={{ zIndex: 2000 }}
          >
            <View style={{ alignItems: 'center' }}>
              <MaterialIcons
                name="navigation"
                size={28}
                color={COLORS.primaryO}
                style={{
                  backgroundColor: 'white',
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
      <MapModal
        visible={showModal}
        message={modalMessage}
        onClose={() => setShowModal(false)}
      />
    </>
  );
});

export default UConnMap;
