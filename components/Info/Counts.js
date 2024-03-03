import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';

const Counts = ({ expanded, nutritional_information, description }) => {
  const { colors } = useTheme()  

  return (
      <View style={{ flex: 1, gap: 12, marginHorizontal: 12 }}>
        <Text style={[styles.description, { backgroundColor: colors.background }]}>{description}</Text>
        <View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>
          <Card containerStyle={[styles.card, { backgroundColor: colors.background, borderRadius: 6 }]}>
            <Card.Title style={{ color: colors.secondary_text, textAlign: 'center', marginBottom: 0 }}>Calorías</Card.Title>
            <Text style={styles.text}>{nutritional_information.calories}kcal</Text>
          </Card>
          <Card containerStyle={[styles.card, { backgroundColor: colors.background, borderRadius: 6 }]}>
            <Card.Title style={{ color: colors.secondary_text, textAlign: 'center', marginBottom: 0 }}>Proteínas</Card.Title>
            <Text style={styles.text}>{nutritional_information.protein}g</Text>
          </Card>
          <Card containerStyle={[styles.card, { backgroundColor: colors.background, borderRadius: 6 }]}>
            <Card.Title style={{ color: colors.secondary_text, textAlign: 'center', marginBottom: 0 }}>Grasas</Card.Title>
            <Text style={styles.text}>{nutritional_information.fat}g</Text>
          </Card>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#3e3e3e',
    textAlign: 'center',
    fontWeight: '300',
    fontStyle: 'italic'
  },
  card: {
    flex: 1,
    borderWidth: 0,
    elevation: 0,
    margin: 0,
    justifyContent: 'center',
  },
  description: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'white',
    letterSpacing: 1,
    lineHeight: 20,
    color: 'rgba(38, 38, 38, 0.7)'
  }
})

export default Counts;