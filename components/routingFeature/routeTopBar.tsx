import { SegmentedButtons } from 'react-native-paper';
import routeStyles from './routeButtonStyles';
import { useState } from 'react';
import CustomSearchBar from '../searchFeature/searchBar/customSearchBar';
import { COLORS } from '@/constants/theme';
import { View } from 'react-native';

interface RouteModalProps {}
const RouteTopBar: React.FC<RouteModalProps> = ({}: RouteModalProps) => {
  const [transportationMethod, setTransportationMethod] =
    useState<string>('Walking');
  const [startingLocation, setStartingLocation] = useState<string>('');
  const [destination, setDestination] = useState<string>('');

  const changeStartingLocation = (place: string) => setStartingLocation(place);
  const changeDestination = (place: string) => setDestination(place);

  return (
    <View style={routeStyles.View}>
      <CustomSearchBar
        value={startingLocation}
        onType={changeStartingLocation}
        alternate={true}
      />
      <CustomSearchBar
        value={destination}
        onType={changeDestination}
        alternate={true}
      />

      <SegmentedButtons
        value={transportationMethod}
        onValueChange={setTransportationMethod}
        buttons={[
          {
            value: 'Walking',
            icon: 'walk',
            label: 'Walking',
            style: {
              backgroundColor:
                transportationMethod === 'Walking'
                  ? COLORS.tertiary
                  : COLORS.defaultText,
            },
            checkedColor: COLORS.primary,
            uncheckedColor: COLORS.primary,
          },
          {
            value: 'Driving',
            icon: 'car',
            label: 'Driving',
            style: {
              backgroundColor:
                transportationMethod === 'Driving'
                  ? COLORS.tertiary
                  : COLORS.defaultText,
            },
            checkedColor: COLORS.primary,
            uncheckedColor: COLORS.primary,
          },
        ]}
      />
    </View>
  );
};

export default RouteTopBar;
