//==============================================[Imports]==============================================
import React from 'react';
import { View, Pressable } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { routePopupStyles } from './routePopupStyles';
import { Transportation } from '@/types/mapTypes';
import TransportationSelector from '../transportationMethodChange/transportationSelector';

//==============================================[Props]==============================================
interface RouteStartPopupProps {
  startName: string;
  endName: string;
  method: Transportation;
  onChangeMethod: (method: Transportation) => void;
  onStart: () => void;
  onClear: () => void;
}

//==============================================[Component]==============================================
const RouteStartPopup: React.FC<RouteStartPopupProps> = ({
  startName,
  endName,
  method,
  onChangeMethod,
  onStart,
  onClear,
}) => {
  return (
    <View style={routePopupStyles.container}>
      <Pressable onPress={onClear}>
        <Text style={routePopupStyles.summary}>
          {startName} → {endName}
        </Text>
      </Pressable>

      <View style={routePopupStyles.containerSmall}>
        <TransportationSelector
          value={method}
          onTransportationChange={onChangeMethod}
          sizeLarge={false}
        />
        <IconButton
          icon="check"
          iconColor={routePopupStyles.button.color}
          containerColor={routePopupStyles.button.backgroundColor}
          size={25}
          onPress={onStart}
        />
      </View>
    </View>
  );
};

export default RouteStartPopup;
