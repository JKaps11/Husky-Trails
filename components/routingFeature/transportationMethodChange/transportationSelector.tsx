import { COLORS } from '@/constants/theme';
import { Transportation } from '@/types/mapTypes';
import { SegmentedButtons } from 'react-native-paper';

interface TransportationSelectorProps {
  value: Transportation;
  onTransportationChange: (val: Transportation) => void;
  sizeLarge: boolean;
}
const TransportationSelector: React.FC<TransportationSelectorProps> = ({
  value,
  onTransportationChange,
  sizeLarge,
}: TransportationSelectorProps) => {
  return (
    <SegmentedButtons
      value={value}
      density={sizeLarge ? 'regular' : 'small'}
      onValueChange={(val) => onTransportationChange(val as Transportation)}
      style={sizeLarge ? { width: '90%' } : { width: '60%' }}
      buttons={
        sizeLarge
          ? [
              {
                value: 'Walking',
                icon: 'walk',
                label: 'Walking',
                style: {
                  backgroundColor:
                    value === 'Walking' ? COLORS.tertiary : COLORS.defaultText,
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
                    value === 'Driving' ? COLORS.tertiary : COLORS.defaultText,
                },
                checkedColor: COLORS.primary,
                uncheckedColor: COLORS.primary,
              },
              {
                value: 'Biking',
                icon: 'bike',
                label: 'Biking',
                style: {
                  backgroundColor:
                    value === 'Biking' ? COLORS.tertiary : COLORS.defaultText,
                },
                checkedColor: COLORS.primary,
                uncheckedColor: COLORS.primary,
              },
            ]
          : [
              {
                value: 'Walking',
                icon: 'walk',
                style: {
                  backgroundColor:
                    value === 'Walking' ? COLORS.tertiary : COLORS.defaultText,
                },
                checkedColor: COLORS.primary,
                uncheckedColor: COLORS.primary,
              },
              {
                value: 'Driving',
                icon: 'car',
                style: {
                  backgroundColor:
                    value === 'Driving' ? COLORS.tertiary : COLORS.defaultText,
                },
                checkedColor: COLORS.primary,
                uncheckedColor: COLORS.primary,
              },
              {
                value: 'Biking',
                icon: 'bike',
                style: {
                  backgroundColor:
                    value === 'Biking' ? COLORS.tertiary : COLORS.defaultText,
                },
                checkedColor: COLORS.primary,
                uncheckedColor: COLORS.primary,
              },
            ]
      }
    />
  );
};

export default TransportationSelector;
