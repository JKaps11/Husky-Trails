// DraggableMenu.tsx
import React, { useRef, useState, useCallback } from 'react';
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  View,
} from 'react-native';
import { Surface } from 'react-native-paper';
import draggableMenuStyles from './draggableMenuStyle';
import { Filter, Marker } from '@/types/mapTypes';
import useFuzzySearch from '@/hooks/useFuzzySearch';
import CustomSearchBar from '../searchFeature/searchBar/customSearchBar';
import SelectableListItem from './selectableListItem';
import { ZoomInfo } from '@/types/mapTypes';
const SCREEN_HEIGHT: number = Dimensions.get('window').height;
const MIN_HEIGHT: number = SCREEN_HEIGHT * 0.2;
const MAX_HEIGHT: number = SCREEN_HEIGHT * 0.7;

interface RecommendationItem {
  id: string;
  marker: Marker;
}

interface DraggableMenuProps {
  filter: Filter;
  setFilter: (filter: Filter) => void;
  setQuery: (s: string) => void;
  zoomFunction: (zi: ZoomInfo) => void;
  setRoute: (m: Marker) => void;
}
const DraggableMenu: React.FC<DraggableMenuProps> = ({
  filter,
  setFilter,
  setQuery,
  zoomFunction,
  setRoute,
}: DraggableMenuProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<RecommendationItem | null>(
    null,
  );

  const onSearchBarType = (query: string) => {
    setSearchQuery(query);
    return query;
  };

  const { getRecommendations } = useFuzzySearch(filter);
  const animatedHeight: Animated.Value = useRef(
    new Animated.Value(MIN_HEIGHT),
  ).current;

  const panResponder: PanResponderInstance = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => Math.abs(gestureState.dy) > 5,
      onPanResponderMove: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        const newHeight = Math.max(
          MIN_HEIGHT,
          Math.min(MAX_HEIGHT, MIN_HEIGHT - gestureState.dy),
        );
        animatedHeight.setValue(newHeight);
      },
      onPanResponderRelease: (
        _event: GestureResponderEvent,
        gestureState: PanResponderGestureState,
      ) => {
        const currentValue = Math.max(
          MIN_HEIGHT,
          Math.min(MAX_HEIGHT, MIN_HEIGHT - gestureState.dy),
        );
        Animated.spring(animatedHeight, {
          toValue: currentValue,
          useNativeDriver: false,
        }).start();
      },
    }),
  ).current;

  // Memoized selection handler that receives the full item.
  const handleSelect = useCallback((item: RecommendationItem) => {
    setSelectedItem(item);
    setQuery(item.marker.name);
    setFilter(undefined);
    // const zoomInfo: ZoomInfo = {
    //   coordinates: item.marker.coordinates,
    //   zoomLevel: 17,
    //   animationDuration: 1000,
    // };
    // zoomFunction(zoomInfo);
    setRoute(item.marker);
  }, []);

  return (
    <Animated.View
      style={[draggableMenuStyles.container, { height: animatedHeight }]}
    >
      <Surface style={draggableMenuStyles.handle} {...panResponder.panHandlers}>
        <View style={draggableMenuStyles.handleIndicator} />
      </Surface>
      <View style={draggableMenuStyles.content}>
        <View style={draggableMenuStyles.searchBarContainer}>
          <CustomSearchBar
            value={searchQuery}
            onType={onSearchBarType}
            alternate={false}
            onFocus={() => {}}
          />
        </View>
        <Animated.FlatList
          data={getRecommendations(searchQuery, 6).map((marker) => ({
            id: marker.id,
            marker,
          }))}
          keyExtractor={(item: RecommendationItem) => item.id.toString()}
          renderItem={({ item }: { item: RecommendationItem }) => (
            <SelectableListItem
              item={item}
              isSelected={selectedItem?.id === item.id}
              onSelect={handleSelect}
            />
          )}
          scrollEnabled={true}
        />
      </View>
    </Animated.View>
  );
};

export default DraggableMenu;
