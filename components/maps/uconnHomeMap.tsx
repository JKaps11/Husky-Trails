import React, { useState, useEffect, useRef, memo } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import {
  Camera,
  CameraRef,
  MapView,
  VectorSource,
  FillLayer,
  LineLayer,
  SymbolLayer,
} from '@maplibre/maplibre-react-native';
import { useAssets } from 'expo-asset';
import { ZoomInfo } from '@/types/mapTypes';

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

  useEffect(() => {
    if (cameraRef.current && isMapLoaded) {
      console.log('attempting camera move');
      cameraRef.current.setCamera({
        centerCoordinate: zoomInfo.coordinates,
        zoomLevel: zoomInfo.zoomLevel,
        animationDuration: zoomInfo.animationDuration,
      });
    } else {
      console.log('camera not working');
    }
  }, [zoomInfo, isMapLoaded]);

  const centerCoordinate = [-72.2538, 41.8157];

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
        centerCoordinate={centerCoordinate}
        animationDuration={0}
        zoomLevel={13}
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
    </MapView>
  );
});

export default UConnMap;
