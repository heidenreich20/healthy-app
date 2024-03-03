import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import { Pressable } from 'react-native'
import veggies from '../../assets/veggies.webp'
import premium from '../../assets/vegetales@0,5x.png'

const Welcome = () => {
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()

  return (
    <View style={{ flex: 1, justifyContent: 'center', gap: 64, marginTop: insets.top, backgroundColor: colors.background }}>
      <View>
        <Text style={{ color: colors.primary, textAlign: 'center', fontSize: 32 }}>Welcome!</Text>
        <Text style={{ color: colors.primary, textAlign: 'center', fontSize: 24, fontWeight: '300' }}>Tell us, what kind of ingredients you usually have at home?</Text>
      </View>
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-around' }}>
        <Pressable style={[styles.bigBtn, { backgroundColor: colors.buttonBg }]}>
          <Image style={styles.img} source={veggies}></Image>
          <Text style={[styles.btnText, { backgroundColor: colors.primary }]}>Basic</Text>
        </Pressable>
        <Pressable style={[styles.bigBtn, { backgroundColor: colors.buttonBg }]}>
          <Image style={styles.img} source={premium}></Image>
          <Text style={[styles.btnText, { backgroundColor: colors.primary }]}>Varied</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bigBtn: {
    width: '45%',
    height: 320,
    borderRadius: 6,
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative'
  },
  btnText: {
    color: '#3e3e3e',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#e3e3e3',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 5,
  },
  img: {
    position: 'absolute',
    width: '100%',
    height: '70%',
  }
})

export default Welcome

