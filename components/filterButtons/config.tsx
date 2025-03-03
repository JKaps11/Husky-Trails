import {
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
  ColorValue,
} from 'react-native';
import { Animated } from 'react-native';

type FabAction = {
  icon: string;
  label?: string;
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

export const filterButtonsOptions: FilterButtonOption[] = [
  {
    label: 'Bus Stops',
    icon: 'bus',
    onPress: () => console.log('Pressed bus'),
  },
  {
    label: 'Study Rooms',
    icon: 'book',
    onPress: () => console.log('Pressed study room'),
  },
  {
    label: 'Bathrooms',
    icon: 'toilet',
    onPress: () => console.log('Pressed bathroom'),
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

export default filterButtonsOptions;
