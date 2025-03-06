import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { searchBarStyles } from './searchBarSyles';
import { COLORS } from '@/constants/theme';
import { useState } from 'react';

interface CustomSearchBarProps {
  value: string;
  onType: (query: string) => void;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  value,
  onType,
}: CustomSearchBarProps) => {
  return (
    <View style={{ height: '70%', width: '80%' }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onType}
        value={value}
        style={searchBarStyles.searchBar}
        inputStyle={searchBarStyles.searchBarText}
        iconColor={COLORS.defaultText}
        placeholderTextColor={COLORS.defaultText}
      />
    </View>
  );
};

export default CustomSearchBar;
