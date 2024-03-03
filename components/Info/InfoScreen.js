import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import data from '../../utils/data'
import InfoCard from './InfoCard';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Animated, { BounceInRight } from 'react-native-reanimated';

const InfoScreen = () => {
  const [expandedCard, setExpandedCard] = useState(null);
  const { colors } = useTheme()
  const [filter, setFilter] = useState(data.foods)
  const search = useSelector(state => state.search)
  const loading = useSelector(state => state.search.loading)
  const [loadingFilters, setLoadingFilters] = useState(false)
  const categories = useSelector(state => state.categories.filters)

  useEffect(() => {
    const categoryFilter = async () => {
      setLoadingFilters(true)
      try {
        const filteredResults = data?.foods?.filter(item =>
          categories.every(category => item.categories.includes(category))
        );
        if (categories.length === 0) {
          setFilter(data.foods)
        } else
        setFilter(filteredResults);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingFilters(false)
      }
    }
    categoryFilter()
  }, [categories]);

  useEffect(() => {
    const filterFunc = () => {
      try {
        const filteredResults = data?.foods?.filter(item =>
          item.name.toLowerCase().startsWith(search?.query?.toLowerCase())
        );
        setFilter(filteredResults);
      } catch (error) {
        console.log(error);
      }
    };
    filterFunc();
  }, [search]);

  return (
    <>
      {loading || loadingFilters ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.accent} />
      ) : (
        filter.length === 0
          ? <Text style={styles.text}>No results found</Text>
          : (
            <FlatList
              style={{ flex: 1, marginBottom: 12 }}
              data={filter}
              ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <Animated.View entering={BounceInRight}><InfoCard expandedCard={expandedCard} loading={loading || loadingFilters} setExpandedCard={setExpandedCard} food={item} /></Animated.View>}
            />
          )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: 'rgba(38, 38, 38, 0.6)',
  },
});

export default InfoScreen;