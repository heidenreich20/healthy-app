import React from 'react';
import { Card, Image } from 'react-native-elements';
import { View } from 'react-native';
import { supabase } from '../../supabase/supabase';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Benefits from './Benefits';
import Counts from './Counts';
import CustomIcon from '../CustomIcon/CustomIcon';
import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';
import { Skeleton } from '@rneui/base';

const InfoCard = ({ food, expandedCard, setExpandedCard }) => {
  const { name, nutritional_information, description, season_info, benefits } = food;
  const { colors } = useTheme()

  const isExpanded = expandedCard === name;

  const imageUrl = supabase.storage.from('products').getPublicUrl(`${name.toLowerCase()}.webp`)
  
  return (
    <Card containerStyle={{ marginTop: 0, backgroundColor: colors.primary, borderColor: colors.accent, borderRadius: 6, padding: 0 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 6 }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <Image
            style={{ width: 50, height: 50, objectFit: "contain" }}
            transition
            PlaceholderContent={<Skeleton circle skeletonStyle={{opacity: 0.3}} width={50} height={50} />}
            placeholderStyle={{ backgroundColor: colors.primary }}
            source={{
              uri: imageUrl.data.publicUrl,
            }}
          />
          <Card.Title style={{ color: colors.secondary_text, textAlign: 'left', marginBottom: 0 }}>
            {name}
          </Card.Title>
        </View>
        <View style={{ flex: 0, gap: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.background, borderWidth: 1, borderColor: colors.accent, borderRadius: 50, paddingVertical: 4, paddingHorizontal: 8 }}>
          {season_info?.icon?.map((icon, index) => {
            return (
              <CustomIcon
                key={index}
                name={icon}
                color={
                  icon === 'spring-icon' ? '#4CAF50' :
                    icon === 'summer-icon' ? '#FFC107' :
                      icon === 'autumn-icon' ? '#f47b20' :
                        icon === 'winter-icon' ? '#03A9F4' :
                          null
                }
                size={24} />
            )
          })}
        </View>
        <MaterialIcons.Button iconStyle={[isExpanded ? { transform: [{ rotate: '180deg' }] } : null, { marginRight: 0 }]} underlayColor='none' backgroundColor='transparent' color={colors.text}
          onPress={() => {
            setExpandedCard(isExpanded ? null : name);
          }} name="expand-more" size={30} />
      </View>
      <Animated.View entering={FadeInUp} exiting={FadeOutDown} style={[{ overflow: 'hidden' }, isExpanded ? { height: 'fit' } : { height: 0, }]}>
        <View style={{ flex: 1, height: 'fit' }}>
          <Card.Divider style={{ borderColor: '#fff' }} />
          <Counts
            nutritional_information={nutritional_information}
            description={description}
          />
          <Benefits benefits={benefits} />
        </View>
      </Animated.View>
    </Card>
  );
};

export default InfoCard;
