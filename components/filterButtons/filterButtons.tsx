import { useState } from 'react';
import { fabStyles } from '../filterButtons/filterButtonStyles';
import filterButtonsOptions from './config';
import { Portal, FAB } from 'react-native-paper';
import { COLORS } from '@/constants/theme';

const FilterButtons: React.FC = () => {
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
        actions={filterButtonsOptions}
        onStateChange={handleStateChange}
      />
    </Portal>
  );
};

export default FilterButtons;
