import { COLORS } from "@/constants/theme";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { MapView } from "@maplibre/maplibre-react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [placeSearcherd, setPlaceSearched] = useState<string>("")
  const [search, setSearch] = useState<string>("");

  const handleSearch = () => {
    setSearch(placeSearcherd)
  }

  return (
    <SafeAreaView style={defaultStyles.container}>
      <StatusBar hidden={true}/>
      <View style={defaultStyles.topBar}>
      <Entypo.Button name="menu" size={30} color={COLORS.defaultText} backgroundColor="#00000000" iconStyle={{margin:0}}/>
        <TextInput
          style={defaultStyles.textInput}
          autoCorrect={true}
          value={placeSearcherd}
          onSubmitEditing={handleSearch}
          placeholder="Search"
          selectionColor={COLORS.primary}
        />
      </View>
      <View style={defaultStyles.bottomNavBar}>
        <FontAwesome.Button name="search" size={30} color={COLORS.defaultText} backgroundColor="#00000000"/>
        <FontAwesome.Button name="filter" size={30} color={COLORS.defaultText} backgroundColor="#00000000"/>
      </View>
      <MapView style={defaultStyles.map} />
    </SafeAreaView>
    );
}

const defaultStyles = StyleSheet.create({
  container: {
    position:"relative",
    width:"100%",
    height:"100%",
    backgroundColor:COLORS.primary
  },
  textInput: {
    backgroundColor:"white",
    color:"black",
    borderRadius:50,
    width:"80%",
    height:"40%",
    textAlign: "center",
  },
  topBar: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor:COLORS.primary,
    top:0,
    left:0,
    width:"100%",
    height:"10%",
    zIndex:2,
  },
  bottomNavBar: {
    position: "absolute",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor:COLORS.primary,
    borderRadius:50,
    top: "80%",
    left: "15%",
    width: "70%",
    height: "7.5%",
    zIndex: 2,
  },
  map: {
    position: "absolute",
    left:0,
    right:0,
    bottom:0,
    height:"100%",
    width:"100%",
    top:0,
    zIndex: 1
  }
})