//==============================================[Imports]==============================================
import React, { useEffect, useState } from 'react';
import CustomSearchBar from '@/components/searchFeature/searchBar/customSearchBar';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { CustomTheme } from '@/constants/theme';
import { defaultStyles } from './defaultStyles';
import UConnMap from '@/components/maps/uconnHomeMap';
import SearchModal from '@/components/searchFeature/searchModal/searchModal';
import { Filter, ZoomInfo } from '@/types/mapTypes';
import DraggableMenu from '@/components/draggableMenu/draggableMenu';
import FilterButtons from '@/components/filterFeature/filterButtons/filterButtons';
import { useLiveNetworkState } from '@/hooks/useLiveNetworkState';
import RouteButton from '@/components/routingFeature/routeButton';
import { useRouteSearch } from '@/hooks/useRouteSearch';
import OfflineScreen from '@/components/network/offlineScreen';
import RouteStartPopup from '@/components/routingFeature/routeStartPopup/routeStartPopup';
import RouteTopBar from '@/components/routingFeature/routeTopBar/routeTopBar';
import MapModal from '@/components/maps/MapModal';

//==============================================[Component]==============================================
const Index: React.FC = () => {
  //==============================[Network]=================================
  const isConnected: boolean | undefined = useLiveNetworkState();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );

  //==============================[Modals + Zoom]=================================
  const [visibleModal, setModalVisible] = useState<boolean>(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [showMapModal, setShowMapModal] = useState(false);
  const [mapModalMessage, setMapModalMessage] = useState('');

  const showMapModalWithMessage = (msg: string) => {
    setTimeout(() => {
      setMapModalMessage(msg);
      setShowMapModal(true);
    }, 500);
  };

  const [zoomInfo, setZoomInfo] = useState<ZoomInfo>({
    coordinates: [-72.2548, 41.8087],
    zoomLevel: 15,
    animationDuration: 0,
  });

  const [centerMarkerVisible, setCenterMarkerVisible] =
    useState<boolean>(false);

  const zoomToLocation: (zi: ZoomInfo, showMarker?: boolean) => void = (
    zi,
    showMarker = false,
  ) => {
    setZoomInfo(zi);
    setCenterMarkerVisible(showMarker);
  };

  //==============================[Filter Feature Functions]=================================
  const [selectedFilter, setSelectedFilter] = useState<Filter>(undefined);
  const setFilter = (filter: Filter) => setSelectedFilter(filter);

  //==============================[Route Feature Functions]=================================
  const [routeMode, setRouteMode] = useState<boolean>(false);

  const setToRouteMode = () => {
    setRouteMode((prev) => !prev);
  };

  const {
    routeInfo,
    routeSearchQuery,
    setRouteSearchQuery,
    routeModalVisible,
    showRouteSearchModalFor,
    hideRouteModal,
    selectRouteBuilding,
    updateRouteFieldText,
    setTransportationMethod,
    routeLineCoords,
    startSelected,
    endSelected,
    clearRoute,
  } = useRouteSearch(() => setZoomInfo);

  const routingSearchModalProps = {
    visible: routeModalVisible,
    routeMode: true,
    hideModal: hideRouteModal,
    query: routeSearchQuery,
    setQuery: setRouteSearchQuery,
    zoomFunction: () => {},
    routeFunction: selectRouteBuilding,
    setCenterMarkerToNotVisible: () => {},
  };

  const showRoutePopup = startSelected && endSelected;

  const onRouteStart = () => {
    if (userLocation === null) {
      showMapModalWithMessage(
        'You need to be on Campus for this feature to work',
      );
      setRouteMode(false);
      return;
    }
  };

  useEffect(clearRoute, [routeMode]);

  //==============================[Regular Search Feature Functions]=================================
  const [searchQuery, setSearchQuery] = useState<string>('');
  const onSearchBarType: (query: string) => string = (query: string) => {
    showModal();
    setSearchQuery(query);
    return query;
  };
  const setSearchBarQuery: (query: string) => void = (query: string) => {
    setSearchQuery(query);
  };

  const regularSearchModalProps = {
    visible: visibleModal,
    routeMode: false,
    hideModal: hideModal,
    query: searchQuery,
    setQuery: setSearchBarQuery,
    zoomFunction: (zi: ZoomInfo) => zoomToLocation(zi, true),
    routeFunction: () => {},
    setCenterMarkerToNotVisible: () => setCenterMarkerVisible(false),
  };

  //==============================[On Component Mount]=================================
  useEffect(() => {
    setTimeout(() => {
      setZoomInfo({
        coordinates: [-72.2548, 41.8087],
        zoomLevel: 15,
        animationDuration: 1000,
      });
    }, 1000);
  }, []);

  const searchModalProps = routeMode
    ? routingSearchModalProps
    : regularSearchModalProps;

  if (!isConnected) return <OfflineScreen />;

  //==============================[Render]=================================
  return (
    <PaperProvider theme={CustomTheme}>
      <SafeAreaProvider>
        <SafeAreaView
          style={defaultStyles.container}
          edges={['left', 'right', 'bottom']}
        >
          <StatusBar hidden />
          {!routeMode && (
            <View
              style={
                visibleModal ? defaultStyles.topBar2 : defaultStyles.topBar
              }
            >
              <CustomSearchBar
                alternate={false}
                value={searchQuery}
                onType={onSearchBarType}
                onFocus={() => {}}
              />
            </View>
          )}
          <SearchModal {...searchModalProps} />

          <RouteButton setToRouteMode={setToRouteMode} />
          {routeMode && (
            <RouteTopBar
              routeTopBarMode={!showRoutePopup}
              routeInfo={routeInfo}
              clearRoute={clearRoute}
              onType={updateRouteFieldText}
              onSearchFieldFocus={showRouteSearchModalFor}
              onTransportationChange={setTransportationMethod}
            />
          )}
          {showRoutePopup && routeMode && (
            <RouteStartPopup
              startName={routeInfo.startingLocation.name}
              endName={routeInfo.destination.name}
              method={routeInfo.transportationMethod}
              onChangeMethod={setTransportationMethod}
              onStart={onRouteStart}
              onClear={clearRoute}
            />
          )}

          {!routeMode && (
            <FilterButtons
              setFilterState={setFilter}
              zoomToLocation={zoomToLocation}
            />
          )}

          {selectedFilter != undefined && (
            <DraggableMenu
              filter={selectedFilter}
              setFilter={setFilter}
              zoomFunction={(zi: ZoomInfo) => zoomToLocation(zi, true)}
              setQuery={setSearchBarQuery}
            />
          )}

          {/* Location Error/ Network Error Modal */}
          <MapModal
            visible={showMapModal}
            message={mapModalMessage}
            onClose={() => setShowMapModal(false)}
          />

          <UConnMap
            zoomInfo={zoomInfo}
            filter={selectedFilter}
            routeLine={routeLineCoords}
            centerMarkerVisible={centerMarkerVisible}
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            showModalWithMessage={showMapModalWithMessage}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default Index;
