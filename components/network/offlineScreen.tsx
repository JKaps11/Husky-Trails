//==============================================[Imports]==============================================
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';

//==============================================[Component]==============================================
const OfflineScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="cloud-off" size={80} color={COLORS.primary} />
      <Text style={styles.title}>Offline Mode</Text>
      <Text style={styles.subtitle}>
        This app requires an internet connection to display the campus map and
        routes.
      </Text>
    </View>
  );
};

export default OfflineScreen;

//==============================================[Styles]==============================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },
});
