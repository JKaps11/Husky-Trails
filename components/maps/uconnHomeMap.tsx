import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { MapView, Camera, VectorSource, FillLayer, LineLayer, SymbolLayer } from '@maplibre/maplibre-react-native';
import { useAssets } from 'expo-asset';

const UConnMap: React.FC = () => {
  const [assetUri, setAssetUri] = useState<string | null>(null);
  const [assets] = useAssets([require('../../assets/uconnVector.mbtiles')]);

  useEffect(() => {
    if (assets && assets[0]) {
      const localUri = assets[0].localUri || assets[0].uri;
      if (localUri) {
        const cleanedUri = localUri.startsWith("file://") ? localUri.replace("file://", "") : localUri;
        setAssetUri(cleanedUri);
      }
    }
  }, [assets]);

  // Using the MBTiles metadata bounds:
  // bounds: -72.2837,41.7872,-72.2238,41.8482
  // Calculate a center roughly by averaging these values:
  const centerCoordinate = [-72.2538, 41.8177];

  return assetUri ? (
    <MapView style={{ flex: 1 }}>
      <Camera
        centerCoordinate={centerCoordinate}
        // With your MBTiles max zoom of 3, use the highest zoom available.
        zoomLevel={13}
        // Optionally, constrain panning to the MBTiles bounds if your version supports it.
        
      />
      <VectorSource
        id="uconnSource"
        tileUrlTemplates={[`mbtiles:///${assetUri}`]}
        minZoomLevel={0}
        maxZoomLevel={3}
      >
        {/* Buildings Layer */}
        <FillLayer
          id="buildings-layer"
          sourceID="uconnSource"
          sourceLayerID="Buildings" // must match the layer name in your MBTiles metadata
          style={{
            fillColor: '#f0e68c',    // a light khaki color
            fillOpacity: 0.7,
          }}
        />
        {/* Roads Layer */}
        <LineLayer
          id="roads-layer"
          sourceID="uconnSource"
          sourceLayerID="Roads"
          style={{
            lineColor: '#555',
            lineWidth: 2,
          }}
        />
        {/* Points Layer (for points of interest) */}
        <SymbolLayer
  id="points-layer"
  sourceID="uconnSource"
  sourceLayerID="Points"
  style={{
    // Wrap the text expression with "format"
    textField: ["format", ["get", "name"], {}],
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
  ) : (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator animating={true} />
    </View>
  );
};

export default UConnMap;
