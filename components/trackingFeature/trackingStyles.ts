import { StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';

export const trackingPopupStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: '82%',
    padding: 16,
    backgroundColor: COLORS.primary,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: -2 },
    elevation: 5,
    gap: 12,
    zIndex: 20,
  },
  summary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.defaultText,
    textAlign: 'center',
  },
  containerSmall: {
    borderRadius: 12,
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    zIndex: 30,
  },
  button: {
    backgroundColor: COLORS.tertiary,
    color: COLORS.defaultText,
  },
});
