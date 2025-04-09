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
import { useAssets } from 'expo-asset';
import { Filter, Marker, ZoomInfo } from '@/types/mapTypes';
import { MaterialIcons } from '@expo/vector-icons';
import getMarkerData from '@/utils/readStaticJson';
import { Text } from 'react-native-paper';
import CustomMarker from './customMarker';
import { View } from 'react-native';

interface MapProps {
  zoomInfo: ZoomInfo;
  filter: Filter;
}

const UConnMap: React.FC<MapProps> = memo(({ zoomInfo, filter }: MapProps) => {
  const [assetUri, setAssetUri] = useState<string | null>(null);
  const [assets] = useAssets([require('../../assets/uconnVector.mbtiles')]);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  const cameraRef: React.RefObject<CameraRef> = useRef<CameraRef>(null);
  const cameraBounds: CameraBounds = {
    ne: [-72.235, 41.825], // Northeast corner of campus
    sw: [-72.275, 41.75], // Southwest corner of campus
  };

  useEffect(() => {
    if (assets && assets[0]) {
      const localUri = assets[0].localUri || assets[0].uri;
      if (localUri) {
        const cleanedUri = localUri.startsWith('file://')
          ? localUri.replace('file://', '')
          : localUri;
        setAssetUri(cleanedUri);
      }
    }
  }, [assets]);

  const displayMapPins = (markers: Marker[]): React.JSX.Element[] => {
    return markers.map((marker: Marker) => (
      <CustomMarker marker={marker} key={marker.id} />
    ));
  };
  return (
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
        tileUrlTemplates={[`mbtiles:///${assetUri}`]}
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
            {
              // TODO Text does not work
              /* <Text
                    style={{
                      color: '#2b2d42',
                      fontWeight: 'bold',
                      fontSize: 12,
                      marginTop: 4, // add some space between icon and text
                    }}
                  >
                    {marker.name}
                  </Text> */
            }
          </View>
        </MarkerView>
      )}
    </MapView>
  );
});

export default UConnMap;
