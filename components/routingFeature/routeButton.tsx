import { COLORS } from '@/constants/theme';
import React, { useState } from 'react';
import { Portal } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import routeStyles from './routeButtonStyles';

interface RouteButtonProps {
  setToRouteMode: () => void;
}

const RouteButton: React.FC<RouteButtonProps> = ({
  setToRouteMode,
}: RouteButtonProps) => {
  const handleRouteButtonPress = () => {
    setToRouteMode();
  };
  return (
    <Portal>
      <FAB
        visible
        variant={'primary'}
        color={COLORS.defaultText}
        style={routeStyles.fabTrigger}
        icon={'routes'}
        onPress={handleRouteButtonPress}
      ></FAB>
    </Portal>
  );
};
export default RouteButton;
