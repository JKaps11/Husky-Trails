import { COLORS } from '@/constants/theme'
import Entypo from '@expo/vector-icons/Entypo'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { MapView } from '@maplibre/maplibre-react-native'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { defaultStyles } from './defaultStyles'

export default function Index() {
  const [placeSearcherd, setPlaceSearched] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const handleSearch = () => {
    setSearch(placeSearcherd)
  }

  return (
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
      <View style={defaultStyles.bottomNavBar}>
        <FontAwesome.Button
          name="search"
          size={30}
          color={COLORS.defaultText}
          backgroundColor="#00000000"
        />
        <FontAwesome.Button
          name="filter"
          size={30}
          color={COLORS.defaultText}
          backgroundColor="#00000000"
        />
      </View>
      <MapView style={defaultStyles.map} />
    </SafeAreaView>
  )
}
