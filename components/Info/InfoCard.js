import React, { useState } from 'react';
import { Card, Image } from 'react-native-elements';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { View } from 'react-native';
import { supabase } from '../../supabase/supabase';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Counts from './Counts';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { Skeleton } from '@rneui/base';

const InfoCard = ({ food, expandedCard, setExpandedCard, fetchInfo }) => {
  const { name, season_icon, product_category } = food;
  const [loading, setLoading] = useState(false)
  const [foodInfo, setFoodInfo] = useState(null);
  const { colors } = useTheme()
  const isExpanded = expandedCard === name;

  const imageUrl = supabase.storage.from('products').getPublicUrl(`${name.toLowerCase()}.webp`)

  const handleFetch = async (name) => {
    if (isExpanded) {
      setExpandedCard(false);
      return;
    }
    setLoading(true);
    try {
      const response = await fetchInfo(name)
      setFoodInfo(response.data);
    } catch (error) {
      console.log('Error fetching info:', error);
      throw error;
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Card containerStyle={[styles.container, { backgroundColor: colors.primary, borderColor: colors.accent }]}>
      <View style={styles.wrapper}>
        <View style={styles.card}>
          <Image
            style={styles.image}
            transition
            PlaceholderContent={<Skeleton circle skeletonStyle={{ opacity: 0.3 }} width={50} height={50} />}
            placeholderStyle={{ backgroundColor: colors.primary }}
            source={{
              uri: imageUrl.data.publicUrl,
            }}
          />
          <Card.Title style={[styles.title, { color: colors.secondary_text }]}>
            {name}
          </Card.Title>
        </View>
        <MaterialIcons.Button iconStyle={[isExpanded ? { transform: [{ rotate: '180deg' }] } : null, { marginRight: 0 }]} underlayColor='none' backgroundColor='transparent' color={colors.text}
          onPress={
            () => {
              setExpandedCard(isExpanded ? null : name);
              handleFetch(name)
            }
          } name="expand-more" size={30} />
      </View>
      <View style={[styles.description, isExpanded ? { height: 'fit' } : { height: 0, }]}>
        <Card.Divider style={{ borderColor: '#fff', marginHorizontal: 12 }} />
        {loading ? <ActivityIndicator size="large" style={{ padding: 6 }} color={colors.accent} /> : null}
        {foodInfo && !loading
          ? (
            <Animated.View entering={FadeInUp} style={{ paddingBottom: 12 }}>
              <Counts
                product_category={product_category}
                season_icon={season_icon}
                nutritional_information={foodInfo?.nutritional_information}
                description={foodInfo?.description}
              />
            </Animated.View>
          )
          : null}
        {/* <Benefits benefits={benefits} /> */}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
    margin: 8,
    marginBottom: 8,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
  },
  card: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  image: {
    width: 50,
    height: 50,
    objectFit: "contain"
  },
  title: {
    textAlign: 'left',
    marginBottom: 0
  },
  description: {
    overflow: 'hidden',
  }
});

export default InfoCard;
