//==============================================[Imports]==============================================
import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { trackingPopupStyles } from './trackingStyles';

//==============================================[Props]==============================================
interface TrackingPopupProps {
  startName: string;
  endName: string;
  exitTracking: () => void;
}

//==============================================[Component]==============================================
const TrackingPopup: React.FC<TrackingPopupProps> = ({
  startName,
  endName,
  exitTracking,
}) => {
  return (
    <View style={trackingPopupStyles.container}>
      <Text style={trackingPopupStyles.summary}>
        {startName} → {endName}
      </Text>

      <View style={trackingPopupStyles.containerSmall}>
        <IconButton
          icon="close"
          iconColor={trackingPopupStyles.button.color}
          containerColor={trackingPopupStyles.button.backgroundColor}
          size={40}
          onPress={exitTracking}
        />
      </View>
    </View>
  );
};

export default TrackingPopup;
