import React, { useEffect } from 'react';
import CustomSearchBar from '@/components/searchFeature/searchBar/customSearchBar';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { CustomTheme } from '@/constants/theme';
import { defaultStyles } from './defaultStyles';
import UConnMap from '@/components/maps/uconnHomeMap';
import SearchModal from '@/components/searchFeature/searchModal/searchModal';
import { useState } from 'react';
import { Filter, ZoomInfo } from '@/types/mapTypes';
import DraggableMenu from '@/components/draggableMenu/draggableMenu';
import FilterButtons from '@/components/filterFeature/filterButtons/filterButtons';

const Index: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<Filter>(undefined);
  const setFilter = (filter: Filter) => setSelectedFilter(filter);

  const [visibleModal, setModalVisible] = useState<boolean>(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const onSearchBarType: (query: string) => string = (query: string) => {
    showModal();
    setSearchQuery(query);
    return query;
  };

  const onBuildingListItemPress: (query: string) => void = (query: string) => {
    setSearchQuery(query);
  };

  // need to do a timeout here to stall state change
  const [zoomInfo, setZoomInfo] = useState<ZoomInfo>({
    coordinates: [-72.2548, 41.8087],
    zoomLevel: 15,
    animationDuration: 1000,
  });

  const zoomToLocation: (zi: ZoomInfo) => void = (zi: ZoomInfo) => {
    setZoomInfo(JSON.parse(JSON.stringify(zi)));
  };

  return (
    <PaperProvider theme={CustomTheme}>
      <SafeAreaProvider>
        <SafeAreaView
          style={defaultStyles.container}
          edges={['left', 'right', 'bottom']}
        >
          <StatusBar hidden />
          <View
            style={visibleModal ? defaultStyles.topBar2 : defaultStyles.topBar}
          >
            {/* <Entypo.Button
            name="menu"
            size={30}
            color={COLORS.defaultText}
            backgroundColor="#00000000"
            iconStyle={{ margin: 0 }}
          />
          */}
            <CustomSearchBar value={searchQuery} onType={onSearchBarType} />
          </View>
          <SearchModal
            visible={visibleModal}
            hideModal={hideModal}
            query={searchQuery}
            setQuery={onBuildingListItemPress}
            zoomFunction={zoomToLocation}
          />
          <FilterButtons setFilterState={setFilter} />
          {selectedFilter && <DraggableMenu filter={selectedFilter} />}
          <UConnMap zoomInfo={zoomInfo} filter={selectedFilter} />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default Index;
