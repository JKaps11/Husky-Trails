import { COLORS } from '@/constants/theme';
import { StyleSheet } from 'react-native';

const draggableMenuStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
    zIndex: 5,
  },
  itemContainerSelected: {
    backgroundColor: '#007AFF', // blue color (iOS default blue)
  },
  searchBarContainer: {
    height: 50, // fixed height in pixels
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  handle: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
  },
  handleIndicator: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default draggableMenuStyles;
