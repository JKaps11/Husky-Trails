import React, { useState, useEffect } from 'react';
import { TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider, ActivityIndicator } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Entypo from '@expo/vector-icons/Entypo';
import { COLORS, CustomTheme } from '@/constants/theme';
import { defaultStyles } from './defaultStyles';
import FilterButtons from '@/components/filterButtons/filterButtons';
import UConnMap from '@/components/maps/uconnHomeMap';

const Index: React.FC = () => {

  const [placeSearcherd, setPlaceSearched] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const handleSearch = (): void => {
    setSearch(placeSearcherd);
  };

  return (
    <PaperProvider theme={CustomTheme}>
      <SafeAreaView style={defaultStyles.container}>
        <StatusBar hidden={true} />
        <View style={defaultStyles.topBar}>
          <Entypo.Button
            name="menu"
            size={30}
            color={COLORS.defaultText}
            backgroundColor="#00000000"
            iconStyle={{ margin: 0 }}
          />
          <TextInput
            style={defaultStyles.textInput}
            autoCorrect={true}
            value={placeSearcherd}
            onSubmitEditing={handleSearch}
            placeholder="Search"
            selectionColor={COLORS.primary}
          />
        </View>
        <FilterButtons />
          <UConnMap/> 
       
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Index;
