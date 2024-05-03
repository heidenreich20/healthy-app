import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomIcon from '../CustomIcon/CustomIcon';

const SeasonIcons = memo(({ seasonInfo }) => (
  <View style={styles.seasons}>
    {seasonInfo?.map((icon, index) => (
      <CustomIcon
        key={index}
        name={icon}
        color={getIconColor(icon)}
        size={24}
      />
    ))}
  </View>
));

const getIconColor = (icon) => {
  switch (icon) {
    case 'spring-icon':
      return '#4CAF50';
    case 'summer-icon':
      return '#FFC107';
    case 'autumn-icon':
      return '#f47b20';
    case 'winter-icon':
      return '#03A9F4';
    default:
      return null;
  }
};

const styles = StyleSheet.create({
  seasons: {
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 12,
    borderRadius: 50, 
    paddingVertical: 4, 
    paddingHorizontal: 8, 
  },
});

export default SeasonIcons;