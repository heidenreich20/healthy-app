import React, { memo } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

const CategoryButton = memo(({ isSelected, category, colors, handleCategory }) => (
  <View key={category.id}>
    <Button
      raised
      onPress={() => handleCategory(category)}
      title={category.name}
      containerStyle={styles.container}
      icon={<Icon name={category.icon} size={16} color={colors.accent} />}
      buttonStyle={[
        styles.button, { backgroundColor: isSelected ? colors.accent : colors.background, borderColor: colors.accent },
      ]}
      titleStyle={[styles.title, { color: isSelected ? 'white' : colors.text}]}
      type="outline"
    />
  </View>
));

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 50,
  },
  button: {
    borderRadius: 50,
  },
  title: {
    fontSize: 12, 
    textTransform: 'capitalize' 
  },
});

export default CategoryButton;
