import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'

const Footer = () => {
  const { colors } = useTheme()
  return (
   <View style={[styles.container, {backgroundColor: colors.accent}]}>
    <Text style={styles.text}>Made by Pablo Heidenreich - 2024</Text>
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12, 
  },
  text: {
    textAlign: 'center', 
    color: 'white'
  }
})

export default Footer