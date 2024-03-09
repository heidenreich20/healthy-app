import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomIcon from '../CustomIcon/CustomIcon';

const SeasonIcons = memo(({ seasonInfo, colors }) => (
  <View style={[styles.seasons, { borderColor: colors.accent, backgroundColor: colors.background }]}>
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
    flex: 0, 
    gap: 6, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',  
    borderWidth: 1, 
    borderRadius: 50, 
    paddingVertical: 4, 
    paddingHorizontal: 8, 
  },
});

export default SeasonIcons;