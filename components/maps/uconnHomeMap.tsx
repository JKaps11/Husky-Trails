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
  const centerCoordinate = [-72.2538, 41.8177];

  return assetUri ? (
    <MapView style={{ flex: 1 }}>
      <Camera
        centerCoordinate={centerCoordinate}
        zoomLevel={14}
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
            fillColor: '#f0e68c',    // A light khaki color
            fillOpacity: 0.3,
          }}
        />

        {/* Buildings Outline Layer */}
        <LineLayer
          id="buildings-outline-layer"
          sourceID="uconnSource"
          sourceLayerID="Buildings"
          style={{
            lineColor: '#8B4513',        // Color of the outline
            lineWidth: 2,
            lineOpacity: .5,
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
            textField: ["get", "name"],
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
