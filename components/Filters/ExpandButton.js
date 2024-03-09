import React, { memo } from 'react';
import { Button } from 'react-native-elements';
import ExpandIcon from '@expo/vector-icons/MaterialIcons';

const MemoizedButton = memo(({ isExpanded, colors, handleExpand }) => (
  <Button
    iconRight
    icon={<ExpandIcon style={isExpanded ? { transform: [{ rotate: '180deg' }] } : null} name='expand-more' size={24} />}
    titleStyle={{ color: colors.text }}
    type='clear'
    title='Categorías'
    buttonStyle={{ overflow: 'hidden' }}
    onPress={handleExpand}
  />
));

export default MemoizedButton;