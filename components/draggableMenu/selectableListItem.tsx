import React from 'react';
import { Pressable, Text } from 'react-native';
import draggableMenuStyles from './draggableMenuStyle';
import { Marker } from '@/types/mapTypes';

interface ListItemProps {
  item: { id: string; marker: Marker };
  isSelected: boolean;
  onSelect: (item: { id: string; marker: Marker }) => void;
}

const SelectableListItem: React.FC<ListItemProps> = ({
  item,
  isSelected,
  onSelect,
}) => {
  return (
    <Pressable
      onPress={() => onSelect(item)}
      style={[
        draggableMenuStyles.itemContainer,
        isSelected && draggableMenuStyles.itemContainerSelected,
      ]}
    >
      <Text style={draggableMenuStyles.itemText}>{item.marker.name}</Text>
    </Pressable>
  );
};

export default React.memo(
  SelectableListItem,
  (prevProps, nextProps) =>
    prevProps.isSelected === nextProps.isSelected &&
    prevProps.item.id === nextProps.item.id,
);
