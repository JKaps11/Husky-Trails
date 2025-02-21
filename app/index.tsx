import React, { useState } from 'react';
import { TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MapView } from '@maplibre/maplibre-react-native';
import { COLORS, CustomTheme } from '@/constants/theme';
import { defaultStyles } from './defaultStyles';
import FilterButtons from '@/components/filterButtons/filterButtons';

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
        {/* <View style={defaultStyles.bottomNavBar}>
          <FontAwesome.Button
            name="search"
            size={30}
            color={COLORS.defaultText}
            backgroundColor="#00000000"
          /> 
        </View> */}
        <FilterButtons />
        <MapView style={defaultStyles.map} />
      </SafeAreaView>
    </PaperProvider>
  );
};

export default Index;
