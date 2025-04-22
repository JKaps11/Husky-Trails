//==============================================[Imports]==============================================
import { Modal, Portal, List, IconButton } from 'react-native-paper';
import { Building, Marker, ZoomInfo } from '@/types/mapTypes';
import { searchModalStyles } from './searchModelStyles';
import useBuildings from '@/hooks/useBuildings';
import { useEffect } from 'react';

//==============================================[Props Definition]==============================================
interface SearchModalProps {
  visible: boolean;
  routeMode: boolean;
  hideModal: () => void;
  query: string;
  setQuery: (s: string) => void;
  zoomFunction: (zi: ZoomInfo) => void;
  routeFunction: (b: Building) => void;
  searchRouteFunction: (m: Marker) => void;
  setCenterMarkerToNotVisible: () => void;
  onValidUserLocation: (f: (userLocation: [number, number]) => void) => void;
  getRecommendations: (search: string, count: number) => Building[];
}

//==============================================[Component]==============================================
const SearchModal: React.FC<SearchModalProps> = ({
  visible,
  routeMode,
  hideModal,
  query,
  setQuery,
  zoomFunction,
  routeFunction,
  searchRouteFunction,
  setCenterMarkerToNotVisible = () => {},
  getRecommendations,
}: SearchModalProps) => {
  //==============================================[Handlers]==============================================
  const goToLocation = (b: Building) => {
    setQuery(b.name);
    hideModal();
    const zoomInfo: ZoomInfo = {
      coordinates: [b.coordinates.longitude, b.coordinates.latitude],
      zoomLevel: 17,
      animationDuration: 1000,
    };
    zoomFunction(zoomInfo);

    const newMarker: Marker = {
      id: `marker-${[b.coordinates.longitude, b.coordinates.latitude].join('-')}`,
      name: b.name,
      coordinates: [b.coordinates.longitude, b.coordinates.latitude],
    };
    searchRouteFunction(newMarker);
  };

  const selectRoute = (b: Building) => {
    routeFunction(b);
    hideModal();
  };

  const displayBuildingsMenuItems = (buildings: Building[]) => {
    return buildings.map((b: Building) => (
      <List.Item
        key={b.name + b.coordinates.latitude}
        onPress={() => (routeMode ? selectRoute(b) : goToLocation(b))}
        title={b.name}
        style={searchModalStyles.ListItem}
        titleStyle={searchModalStyles.ListItemTitle}
      />
    ));
  };

  const buidlingRecommendations: Building[] = getRecommendations(query, 10);

  //==============================================[Render]==============================================
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        dismissableBackButton
        style={
          routeMode
            ? searchModalStyles.ModalWrapperRouteMode
            : searchModalStyles.ModalWrapper
        }
        contentContainerStyle={searchModalStyles.ModalContainer}
      >
        <IconButton
          icon="close"
          size={20}
          iconColor={searchModalStyles.Button.color}
          containerColor={searchModalStyles.Button.backgroundColor}
          style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1000,
          }}
          onPress={() => {
            hideModal();
            setCenterMarkerToNotVisible();
          }}
        />
        <List.Section style={searchModalStyles.ListSectionStyle}>
          {displayBuildingsMenuItems(buidlingRecommendations)}
        </List.Section>
      </Modal>
    </Portal>
  );
};

export default SearchModal;
