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
  ListItem: {
    color: COLORS.defaultText,
    borderRadius: '50px',
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  ListItemTitle: {
    color: COLORS.primary,
  },
  ListSectionStyle: {
    borderRadius: '50px',
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
});
