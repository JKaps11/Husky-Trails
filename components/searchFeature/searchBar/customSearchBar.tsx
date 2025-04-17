import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { searchBarStyles } from './searchBarSyles';

interface CustomSearchBarProps {
  value: string;
  onType: (query: string) => void;
  alternate: boolean;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  value,
  onType,
  alternate,
}) => {
  return (
    <View style={searchBarStyles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onType}
        value={value}
        style={
          alternate
            ? searchBarStyles.alternateSearchBar
            : searchBarStyles.searchBar
        }
        inputStyle={
          alternate
            ? searchBarStyles.alternateSearchBarText
            : searchBarStyles.searchBarText
        }
        iconColor={
          alternate
            ? searchBarStyles.alternateSearchBarText.color
            : searchBarStyles.searchBarText.color
        }
        placeholderTextColor={
          alternate
            ? searchBarStyles.alternateSearchBarText.color
            : searchBarStyles.searchBarText.color
        }
      />
    </View>
  );
};

export default CustomSearchBar;
