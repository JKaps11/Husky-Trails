import * as React from 'react';
import { View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { searchBarStyles } from './searchBarSyles';
import { COLORS } from '@/constants/theme';
import { useState } from 'react';

interface CustomSearchBarProps {
  onType: (query: string) => string;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  onType,
}: CustomSearchBarProps) => {
  const [text, setText] = useState<string>('');

  const handleTextChange = (query: string) => {
    setText(onType(query));
  };

  return (
    <View style={{ height: '70%', width: '80%' }}>
      <Searchbar
        placeholder="Search"
        onChangeText={handleTextChange}
        value={text}
        style={searchBarStyles.searchBar}
        inputStyle={searchBarStyles.searchBarText}
        iconColor={COLORS.defaultText}
        placeholderTextColor={COLORS.defaultText}
      />
    </View>
  );
};

export default CustomSearchBar;
