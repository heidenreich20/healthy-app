import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'

const Benefits = ({benefits}) => {
  const { colors } = useTheme()

  return (
    <View style={{flex: 1, backgroundColor: colors.background, borderRadius: 6, margin: 12, borderRadius: 4}}>
      {benefits?.map((item, index) => {
        return (
          <View key={index} style={{flex: 1, flexDirection: 'row', alignItems: 'center', padding: 12, borderBottomWidth: 1, borderBottomColor: colors.accent}}>
            <Text style={{color: colors.secondary_text, marginLeft: 12, lineHeight: 18, fontSize: 12}}>{item}</Text>
          </View>
        )
      })}
    </View>
  )
}

export default Benefits