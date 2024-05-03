import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import SeasonIcons from './SeasonIcon';

const Counts = ({ nutritional_information, description, product_category, season_icon }) => {
  const { calories, protein, carbohydrates } = nutritional_information[0];
  const { colors } = useTheme()

  return (
    <View style={styles.container}>
      {product_category === 'Fruta' ? (
        <View style={[styles.seasons, {backgroundColor: colors.background}]}>
          <Text style={{ marginRight: 6, fontWeight: 500, color: colors.text }}>Season:</Text>
          <SeasonIcons seasonInfo={season_icon} />
        </View>
      ) : null}
      <Text style={[styles.description, { backgroundColor: colors.background }]}>{description}</Text>
      <View style={{ flex: 1, flexDirection: 'row', gap: 12 }}>
        <Card containerStyle={[styles.card, { backgroundColor: colors.background, borderRadius: 6 }]}>
          <Card.Title style={{ color: colors.secondary_text, textAlign: 'center', marginBottom: 0 }}>Calories</Card.Title>
          <Text style={styles.text}>{calories}kcal</Text>
        </Card>
        <Card containerStyle={[styles.card, { backgroundColor: colors.background, borderRadius: 6 }]}>
          <Card.Title style={{ color: colors.secondary_text, textAlign: 'center', marginBottom: 0 }}>Protein</Card.Title>
          <Text style={styles.text}>{protein}g</Text>
        </Card>
        <Card containerStyle={[styles.card, { backgroundColor: colors.background, borderRadius: 6 }]}>
          <Card.Title style={{ color: colors.secondary_text, textAlign: 'center', marginBottom: 0 }}>Fats</Card.Title>
          <Text style={styles.text}>{carbohydrates}g</Text>
        </Card>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 12,
    marginHorizontal: 12
  },
  seasons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%',
    padding: 6,
    borderRadius: 12
  },
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