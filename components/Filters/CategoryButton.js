import React, { memo } from 'react';
import { Button } from 'react-native-elements';
import Icon from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';

const CategoryButton = memo(({ isSelected, category, colors, handleCategory }) => (
  <Button
    raised
    key={category.id}
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
