import { Filter, ZoomInfo } from '@/types/mapTypes';
import {
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  ColorValue,
} from 'react-native';
import { Animated } from 'react-native';

type FabAction = {
  icon: string;
  label?: Filter;
  color?: string;
  labelTextColor?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  style?: Animated.WithAnimatedValue<ViewStyle>;
  containerStyle?: Animated.WithAnimatedValue<ViewStyle>;
  labelStyle?: TextStyle;
  labelMaxFontSizeMultiplier?: number;
  onPress: (e: GestureResponderEvent) => void;
  size?: 'small' | 'medium';
  testID?: string;
  rippleColor?: ColorValue;
};

type FilterButtonOption = FabAction;

const filterButtonsOptions: FilterButtonOption[] = [
  {
    label: 'Bus Stops',
    icon: 'bus',
    onPress: () => console.log('Pressed bus'),
  },
  {
    label: 'Cafes',
    icon: 'coffee',
    onPress: () => console.log('Pressed bus'),
  },
  {
    label: 'Dining Halls',
    icon: 'silverware-fork',
    onPress: () => console.log('Pressed dining hall'),
  },
  {
    label: 'Sports Fields',
    icon: 'soccer-field',
    onPress: () => console.log('Pressed sports fields'),
  },
];

const getFilterButtonOptions = (
  setFilterState: (filter: Filter) => void,
  zoomToLocation: (zoomInfo: ZoomInfo) => void,
): FilterButtonOption[] => {
  return filterButtonsOptions.map((option) => ({
    ...option,
    onPress: (e: GestureResponderEvent) => {
      e.preventDefault();
      zoomToLocation({
        coordinates: [-72.2548, 41.8087],
        zoomLevel: 14,
        animationDuration: 0,
      });
      setFilterState(option.label);
    },
  }));
};

export default getFilterButtonOptions;
