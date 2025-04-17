//==============================================[Imports]==============================================
import { Text } from 'react-native-paper';
import { Pressable, View } from 'react-native';
import { RouteInfo, Transportation } from '@/types/mapTypes';
import routeTopBarStyles from './routeTopBarStyles';
import CustomSearchBar from '@/components/searchFeature/searchBar/customSearchBar';
import TransportationSelector from '../transportationMethodChange/transportationSelector';

//==============================================[Props Definition]==============================================
interface RouteTopBarProps {
  routeTopBarMode: boolean;
  routeInfo: RouteInfo;
  clearRoute: () => void;
  onType: (text: string, field: 'start' | 'end') => void;
  onSearchFieldFocus: (field: 'start' | 'end') => void;
  onTransportationChange: (method: Transportation) => void;
}

//==============================================[Component]==============================================
const RouteTopBar: React.FC<RouteTopBarProps> = ({
  routeTopBarMode,
  routeInfo,
  clearRoute,
  onType,
  onSearchFieldFocus,
  onTransportationChange,
}) => {
  return routeTopBarMode ? (
    <View style={routeTopBarStyles.View}>
      {/* Starting Point Input */}
      <CustomSearchBar
        value={routeInfo.startingLocation.name}
        onType={(text: string) => onType(text, 'start')}
        onFocus={() => onSearchFieldFocus('start')}
        alternate={true}
      />

      {/* Destination Input */}
      <CustomSearchBar
        value={routeInfo.destination.name}
        onType={(text: string) => onType(text, 'end')}
        onFocus={() => onSearchFieldFocus('end')}
        alternate={true}
      />

      {/* Transportation Selector */}
      <TransportationSelector
        value={routeInfo.transportationMethod}
        onTransportationChange={onTransportationChange}
        sizeLarge={true}
      />
    </View>
  ) : (
    <View style={routeTopBarStyles.container}>
      <Pressable
        style={routeTopBarStyles.inputPill}
        onPress={() => {
          clearRoute();
          onSearchFieldFocus('start');
        }}
      >
        <Text style={routeTopBarStyles.text}>
          {routeInfo.startingLocation.name || 'Start location'}
        </Text>
        <View style={routeTopBarStyles.divider} />
        <Text style={routeTopBarStyles.text}>
          {routeInfo.destination.name || 'Destination'}
        </Text>
      </Pressable>
    </View>
  );
};

export default RouteTopBar;
