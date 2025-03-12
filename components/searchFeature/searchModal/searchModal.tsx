import { Modal, Portal, List } from 'react-native-paper';
import { Building, ZoomInfo } from '@/types/mapTypes';
import { searchModalStyles } from './searchModelStyles';
import useBuildings from '@/hooks/useBuildings';

interface searchModalProps {
  visible: boolean;
  hideModal: () => void;
  query: string;
  setQuery: (s: string) => void;
  zoomFunction: (zi: ZoomInfo) => void;
}

const SearchModal: React.FC<searchModalProps> = ({
  visible,
  hideModal,
  query,
  setQuery,
  zoomFunction,
}: searchModalProps) => {
  const { getRecommendations } = useBuildings();

  const goToLocation: (b: Building) => void = (b: Building) => {
    setQuery(b.name); //TODO Not Working
    hideModal();
    const zoomInfo: ZoomInfo = {
      // Need to swap latitude and longitude due to the order in which the MapView component takes the corresponding parameter
      coordinates: [b.coordinates.longitude, b.coordinates.latitude],
      zoomLevel: 17,
      animationDuration: 1000,
    };
    zoomFunction(zoomInfo);
  };

  const displayBuildingsMenuItems = (buildings: Building[]) => {
    return buildings.map((b: Building) => {
      return (
        <List.Item
          key={b.name + b.coordinates.latitude}
          onPress={() => goToLocation(b)}
          title={b.name}
          style={searchModalStyles.ListItem}
          titleStyle={searchModalStyles.ListItemTitle}
        />
      );
    });
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        style={searchModalStyles.ModalWrapper}
        contentContainerStyle={searchModalStyles.ModalContainer}
      >
        <List.Section style={searchModalStyles.ListSectionStyle}>
          {displayBuildingsMenuItems(getRecommendations(query, 10))}
        </List.Section>
      </Modal>
    </Portal>
  );
};

export default SearchModal;
