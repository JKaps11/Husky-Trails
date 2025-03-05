import React from 'react';
import CustomSearchBar from '@/components/searchBar/customSearchBar';
import { View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { CustomTheme } from '@/constants/theme';
import { defaultStyles } from './defaultStyles';
import FilterButtons from '@/components/filterButtons/filterButtons';
import UConnMap from '@/components/maps/uconnHomeMap';
import SearchModal from '@/components/searchModal/searchModal';
import { useState } from 'react';
import { ZoomInfo } from '@/types/mapTypes';

const Index: React.FC = () => {
  const [visibleModal, setModalVisible] = useState<boolean>(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const onSearchBarType: (query: string) => string = (query: string) => {
    showModal();
    setSearchQuery(query);
    return query;
  };
  //TODO Not Working
  const onBuildingListItemPress: (query: string) => void = (query: string) => {
    setSearchQuery(query);
  };

  const [zoomInfo, setZoomInfo] = useState<ZoomInfo>({
    coordinates: [-72.2538, 41.8157],
    zoomLevel: 13,
    animationDuration: 0,
  });

  const zoomToLocation: (zi: ZoomInfo) => void = (zi: ZoomInfo) => {
    setZoomInfo(zi);
  };

  return (
    <PaperProvider theme={CustomTheme}>
      <SafeAreaProvider>
        <SafeAreaView
          style={defaultStyles.container}
          edges={['left', 'right', 'bottom']}
        >
          <StatusBar hidden />
          <View style={defaultStyles.topBar}>
            {/* <Entypo.Button
            name="menu"
            size={30}
            color={COLORS.defaultText}
            backgroundColor="#00000000"
            iconStyle={{ margin: 0 }}
          />
          */}
            <CustomSearchBar onType={onSearchBarType} />
          </View>
          <SearchModal
            visible={visibleModal}
            hideModal={hideModal}
            query={searchQuery}
            setQuery={onBuildingListItemPress}
            zoomFunction={zoomToLocation}
          />
          <FilterButtons />
          <UConnMap zoomInfo={zoomInfo} />
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
};

export default Index;
