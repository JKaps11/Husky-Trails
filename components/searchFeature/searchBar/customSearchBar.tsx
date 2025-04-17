import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { searchBarStyles } from './searchBarSyles';
import { COLORS } from '@/constants/theme';

interface CustomSearchBarProps {
  value: string;
  onType: (query: string) => void;
  alternate: boolean;
  onFocus: () => void;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  value,
  onType,
  alternate,
  onFocus,
}) => {
  return (
    <View style={searchBarStyles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onType}
        onFocus={onFocus}
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
        theme={{ colors: { primary: COLORS.primary } }}
      />
    </View>
  );
};

export default CustomSearchBar;
