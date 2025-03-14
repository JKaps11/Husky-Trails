import React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { searchBarStyles } from './searchBarSyles';

interface CustomSearchBarProps {
  value: string;
  onType: (query: string) => void;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({ value, onType }) => {
  return (
    <View style={searchBarStyles.container}>
      <Searchbar
        placeholder="Search"
        onChangeText={onType}
        value={value}
        style={searchBarStyles.searchBar}
        inputStyle={searchBarStyles.searchBarText}
        iconColor={searchBarStyles.searchBarText.color}
        placeholderTextColor={searchBarStyles.searchBarText.color}
      />
    </View>
  );
};

export default CustomSearchBar;
