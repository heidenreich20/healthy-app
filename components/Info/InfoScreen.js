import React, { useState, useEffect, useMemo } from 'react';
import { FlatList, ActivityIndicator, Text, StyleSheet, View } from 'react-native';
import data from '../../utils/data'
import InfoCard from './InfoCard';
import { useSelector } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import { supabase } from '../../supabase/supabase';
import { startLoading, finishLoading } from '../../redux/features/loading/loadingSlice';
import { useDispatch } from 'react-redux';
import Footer from '../Footer/Footer';
import { Button } from 'react-native-elements';

const InfoScreen = () => {
  const dispatch = useDispatch();
  const [expandedCard, setExpandedCard] = useState(null);
  const { colors } = useTheme()
  const [filter, setFilter] = useState(data.foods)
  const search = useSelector(state => state.search)
  const loading = useSelector(state => state.loading.isLoading)
  const categories = useSelector(state => state.categories.filters)
  const vegan = useSelector(state => state.categories.vegan)
  const [foodList, setFoodList] = useState([])
  const [minRange, setMinRange] = useState(0)
  const [maxRange, setMaxRange] = useState(15)
  const [count, setCount] = useState(null)

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
    if (categories.length > 0 || vegan) {
      const fetchCategory = async () => {
        try {
          dispatch(startLoading());
          if (vegan === false) {
            const { data } = await supabase
              .from('foods')
              .select(`id, name, season_icon, product_category`)
              .contains('benefits', categories)
              .range(minRange, maxRange)
            setFoodList(data);
          } else {
            const { data } = await supabase
              .from('foods')
              .select(`id, name, season_icon, product_category`)
              .contains('benefits', categories)
              .eq('vegan', true)
            setFoodList(data);
          }
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
        try {
          dispatch(startLoading());
          const { data, count } = await supabase
            .from('foods')
            .select(`
            id, 
            name,
            season_icon,
            product_category`, { count: 'exact' })
            .range(minRange + 1, maxRange)
            if (minRange === 0) {
              setFoodList(data);
            } else {
              setFoodList(prevFoodList => [...prevFoodList, ...data]);
            }
          setCount(count - 1)
        } catch (error) {
          console.log('Error fetching info:', error);
          throw error;
        } finally {
          dispatch(finishLoading());
        }
      }
      fetchFood()
    }
  }, [categories, vegan, minRange])

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

  // useEffect(() => {
  //   const fetchOnReachEnded = async () => {
  //     try {
  //       dispatch(startLoading());
  //       const { data, count } = await supabase
  //         .from('foods')
  //         .select(`
  //         id, 
  //         name,
  //         season_icon,
  //         product_category`,
  //           { count: 'exact' })
  //         .range(minRange, nextRange)
  //       setMaxRange(count)
  //       setFoodList(data)
  //     } catch (error) {
  //       console.log('Error fetching info:', error);
  //       throw error;
  //     } finally {
  //       dispatch(finishLoading());
  //     }
  //   }
  //   fetchOnReachEnded()
  // }, [minRange])

  const handleRange =  () => {
    if ((maxRange + 2) > count || minRange === maxRange) {
      setMaxRange(count)
    } else {
      setMinRange(maxRange)
      setMaxRange(maxRange + 2)
    }
  }

  return (
    <>
      {
        filter.length === 0 || foodList.length === 0
          ? <Text style={styles.text}>No results found</Text>
          : (
            <FlatList
              onEndReachedThreshold={0.2}
              onEndReached={({ distanceFromEnd }) => {
                if (distanceFromEnd >= 0) {
                  handleRange()
                }
              }}
              ListFooterComponent={
                <>
                  {loading ? <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.accent} /> : null}
                  <Footer />
                </>
              }
              data={foodList}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <InfoCard fetchInfo={fetchInfo} expandedCard={expandedCard} loading={loading} setExpandedCard={setExpandedCard} food={item} />}
            />
          )
      }
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