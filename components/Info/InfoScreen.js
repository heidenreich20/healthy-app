import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import data from '../../utils/data'
import InfoCard from './InfoCard';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { supabase } from '../../supabase/supabase';
import { startLoading, finishLoading } from '../../redux/features/loading/loadingSlice';
import { useDispatch } from 'react-redux';

const InfoScreen = () => {
  const dispatch = useDispatch();
  const [expandedCard, setExpandedCard] = useState(null);
  const { colors } = useTheme()
  const [filter, setFilter] = useState(data.foods)
  const search = useSelector(state => state.search)
  const loading = useSelector(state => state.loading.isLoading)
  const categories = useSelector(state => state.categories.filters)
  const [foodList, setFoodList] = useState([])
  const [foodInfo, setFoodInfo] = useState({})

  const fetchInfo = useMemo(() => async (name) => {
    try {
      const response = await supabase
        .from('foods')
        .select(`
          description,
          benefits,
          nutritional_information (calories, protein, carbohydrates)`)
        .eq('name', name)
        .single();
      return response;
    } catch (error) {
      console.log('Error fetching info:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const fetchCategory = async () => {
        try {
          dispatch(startLoading());
          const { data } = await supabase
            .from('foods')
            .select(`id, name, season_icon, product_category`)
          .contains('benefits', categories)
          setFoodList(data);
        } catch (error) {
          console.log('Error fetching info:', error);
          throw error;
        } finally {
          dispatch(finishLoading());
        }
      }
      fetchCategory()
    } else {
      const fetchFood = async () => {
        const { data } = await supabase
          .from('foods')
          .select(`
          id, 
          name,
          season_icon,
          product_category`)
        setFoodList(data)
      }
      fetchFood()
    }
  }, [categories])

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
      {loading ? (
        <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.accent} />
      ) : (
        filter.length === 0 || foodList.length === 0
          ? <Text style={styles.text}>No results found</Text>
          : (
            <FlatList
              data={foodList}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <InfoCard fetchInfo={fetchInfo} foodInfo={foodInfo} expandedCard={expandedCard} loading={loading} setExpandedCard={setExpandedCard} food={item} />}
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