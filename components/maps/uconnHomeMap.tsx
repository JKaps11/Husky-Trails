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

  const cameraRef = useRef<CameraRef>(null);

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

        // Optionally, constrain panning to the MBTiles bounds if your version supports it.
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
            fillColor: '#f0e68c', // A light khaki color
            fillOpacity: 0.3,
          }}
        />

        {/* Buildings Outline Layer */}
        <LineLayer
          id="buildings-outline-layer"
          sourceID="uconnSource"
          sourceLayerID="Buildings"
          style={{
            lineColor: '#8B4513', // Color of the outline
            lineWidth: 2,
            lineOpacity: 0.5,
          }}
        />

        {/* Roads Layer */}
        <LineLayer
          id="roads-layer"
          sourceID="uconnSource"
          sourceLayerID="Roads"
          style={{
            lineColor: '#555',
            lineWidth: 3,
          }}
        />

        {/* Buildings Name Layer */}
        <SymbolLayer
          id="building-names-layer"
          sourceID="uconnSource"
          sourceLayerID="Buildings" // source layer with building names
          style={{
            textField: ['get', 'name'],
            textSize: 10,
            textColor: '#333',
            textHaloColor: '#fff',
            textHaloWidth: 1,
          }}
        />

        {/* Points Layer */}
        <SymbolLayer
          id="points-layer"
          sourceID="uconnSource"
          sourceLayerID="Points"
          style={{
            // Wrap the text expression with "format"
            textField: ['format', ['get', 'name'], {}],
            textSize: 10,
            textColor: '#333',
            textHaloColor: '#fff',
            textHaloWidth: 1,
            iconImage: 'marker-15',
            iconSize: 1,
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
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
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
