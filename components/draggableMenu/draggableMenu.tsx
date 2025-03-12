import React, { useRef } from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  View,
} from 'react-native';
import { Surface } from 'react-native-paper';
import draggableMenuStyles from './draggableMenuStyle';
import { Filter } from '@/types/mapTypes';
import useFuzzySearch from '@/hooks/useFuzzySearch';

interface DraggableMenuProps {
  filter: Filter;
}

const SCREEN_HEIGHT: number = Dimensions.get('window').height;
const MIN_HEIGHT: number = SCREEN_HEIGHT * 0.2;
const MAX_HEIGHT: number = SCREEN_HEIGHT * 0.7;

const DraggableMenu: React.FC<DraggableMenuProps> = ({
  filter,
}: DraggableMenuProps) => {
  const getReccomendations = useFuzzySearch(filter);

  const animatedHeight: Animated.Value = useRef(
    new Animated.Value(MIN_HEIGHT),
  ).current;

  const panResponder: PanResponderInstance = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ): boolean => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ): void => {
        const newHeight: number = Math.max(
          MIN_HEIGHT,
          Math.min(MAX_HEIGHT, MIN_HEIGHT - gestureState.dy),
        );
        animatedHeight.setValue(newHeight);
      },
      onPanResponderRelease: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ): void => {
        const currentValue: number = Math.max(
          MIN_HEIGHT,
          Math.min(MAX_HEIGHT, MIN_HEIGHT - gestureState.dy),
        );
        Animated.spring(animatedHeight, {
          toValue: currentValue,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[draggableMenuStyles.container, { height: animatedHeight }]}
    >
      <Surface style={draggableMenuStyles.handle} {...panResponder.panHandlers}>
        <View style={draggableMenuStyles.handleIndicator} />
      </Surface>
      <View style={draggableMenuStyles.content}>
        <View style={draggableMenuStyles.placeholder}>
          <Animated.Text>Draggable Menu Content</Animated.Text>
        </View>
      </View>
    </Animated.View>
  );
};

export default DraggableMenu;
