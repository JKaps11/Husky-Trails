import { useState } from 'react';
import { fabStyles } from './filterButtonStyles';
import filterButtonsOptions from './config';
import { Portal, FAB } from 'react-native-paper';
import { COLORS } from '@/constants/theme';
import { Filter, ZoomInfo } from '@/types/mapTypes';

interface FilterButtonsProps {
  setFilterState: (filter: Filter) => void;
  zoomToLocation: (zoomInfo: ZoomInfo) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
  setFilterState,
  zoomToLocation,
}: FilterButtonsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleStateChange = () => {
    setIsOpen((previousState) => !previousState);
  };

  return (
    <Portal>
      <FAB.Group
        open={isOpen}
        visible
        variant={'primary'}
        color={COLORS.defaultText}
        fabStyle={fabStyles.fabTrigger}
        icon={'filter'}
        actions={filterButtonsOptions(setFilterState, zoomToLocation)}
        onStateChange={handleStateChange}
      />
    </Portal>
  );
};

export default FilterButtons;
