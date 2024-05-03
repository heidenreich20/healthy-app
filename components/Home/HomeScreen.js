import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { SearchBar } from '@rneui/themed';
import InfoScreen from '../Info/InfoScreen';
import Search from '../Search/Search';
import Footer from '../Footer/Footer';

const HomeScreen = ({ navigation }) => {

  return (
    <View style={{flex: 1}}>
      <Search navigation={navigation} />
      <InfoScreen />
    </View>
  )
}

export default HomeScreen