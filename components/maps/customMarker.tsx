import { Marker } from '@/types/mapTypes';
import { MaterialIcons } from '@expo/vector-icons';
import { MarkerView } from '@maplibre/maplibre-react-native';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

interface CustomMarkerProps {
  marker: Marker;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ marker }) => {
  return (
    <MarkerView
      id={`marker-${marker.id}`}
      coordinate={marker.coordinates}
      style={{ zIndex: 1000 }}
      // Adjust the anchor so the bottom of the marker aligns with the coordinate
      anchor={{ x: 0.5, y: 1 }}
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
  );
};

export default CustomMarker;
