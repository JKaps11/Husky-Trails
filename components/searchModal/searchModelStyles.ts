import { COLORS } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const searchModalStyles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
  },
  ModalWrapper: {
    top: 70,
  },
  MenuItem: {
    color: COLORS.defaultText,
  },
  MenuItemTitle: {
    color: COLORS.primary,
  },
});
