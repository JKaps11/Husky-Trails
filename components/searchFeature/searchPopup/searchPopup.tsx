//==============================================[Imports]==============================================
import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { searchPopupStyles } from './searchStyles';

//==============================================[Props]==============================================
interface SearchPopupProps {
  startRoute: () => void;
}

//==============================================[Component]==============================================
const SearchPopup: React.FC<SearchPopupProps> = ({ startRoute }) => {
  return (
    <View style={searchPopupStyles.container}>
      <Text style={searchPopupStyles.summary}>
        Would you like to travel here?
      </Text>

      <View style={searchPopupStyles.containerSmall}>
        <IconButton
          icon="check"
          iconColor={searchPopupStyles.button.color}
          containerColor={searchPopupStyles.button.backgroundColor}
          size={30}
          onPress={startRoute}
        />
      </View>
    </View>
  );
};

export default SearchPopup;
