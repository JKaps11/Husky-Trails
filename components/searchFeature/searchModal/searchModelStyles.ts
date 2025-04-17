import { COLORS } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const searchModalStyles = StyleSheet.create({
  ModalContainer: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
  },
  ModalWrapper: {
    top: 55,
  },
  ModalWrapperRouteMode: {
    top: '20%',
  },
  ListItem: {
    backgroundColor: COLORS.defaultText,
    borderRadius: '50px',
    borderColor: COLORS.primary,
    borderBottomWidth: 1,
  },
  ListItemTitle: {
    color: COLORS.primary,
  },
  ListSectionStyle: {
    flex: 1,
  },
  Button: {
    backgroundColor: COLORS.primary,
    color: COLORS.defaultText,
  },
});
