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
import { ZoomInfo } from '@/types/mapTypes';
import { MaterialIcons } from '@expo/vector-icons';

interface MapProps {
  zoomInfo: ZoomInfo;
}

const UConnMap: React.FC<MapProps> = memo(({ zoomInfo }: MapProps) => {
  const [assetUri, setAssetUri] = useState<string | null>(null);
  const [assets] = useAssets([require('../../assets/uconnVector.mbtiles')]);
  const [isMapLoaded, setIsMapLoaded] = useState<boolean>(false);

  const cameraRef: React.RefObject<CameraRef> = useRef<CameraRef>(null);
  const cameraBounds: CameraBounds = {
    ne: [-72.24, 41.82], // Northeast corner of campus
    sw: [-72.27, 41.8], // Southwest corner of campus
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

  return (
    <MapView
      style={{ flex: 1 }}
      compassEnabled={false}
      attributionEnabled={false}
      onDidFinishLoadingMap={() => {
        console.log('Map finished loading');
        setIsMapLoaded(true);
      }}
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
        {/* Buildings Name Layer */}
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
      </VectorSource>
      {isMapLoaded && (
        <MarkerView
          key={`marker-${zoomInfo.coordinates.join('-')}`}
          id="zoom-marker"
          coordinate={zoomInfo.coordinates}
          style={{ zIndex: 1000 }}
          anchor={{ x: 0, y: 0 }} // Tip of the icon at coordinate
        >
          <MaterialIcons
            name="location-pin"
            size={40}
            color="#000E2F"
            style={{
              shadowColor: '#2b2d42',
              shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 3,
            }}
          />
        </MarkerView>
      )}
    </MapView>
  );
});

export default UConnMap;
