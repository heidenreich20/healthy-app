import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Button } from 'react-native-elements'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { addCategory, removeCategory } from '../../redux/features/categories/categoriesSlice'
import { categoriesLoading } from '../../redux/features/categories/categoriesSlice'
import { useSelector, useDispatch } from 'react-redux'
import ExpandButton from './ExpandButton'
import CategoryButton from './CategoryButton'
import { startLoading, finishLoading } from '../../redux/features/loading/loadingSlice'

const categories = [
  {
    id: 1,
    name: 'Vegan',
  },
  {
    id: 2,
    name: 'Vegetarian',
  },
  {
    id: 3,
    name: 'Gluten Free',
  },
  {
    id: 4,
    name: 'Dairy Free',
  },
  {
    id: 5,
    name: 'Keto',
  },
  {
    id: 6,
    name: 'Paleo',
  },
  {
    id: 7,
    name: 'Low FODMAP',
  },
  {
    id: 8,
    name: 'Low Carb',
  },
  {
    id: 9,
    name: 'Low Sugar',
  },
  {
    id: 10,
    name: 'Low Fat',
  },
  {
    id: 11,
    name: 'Low Sodium',
  },
  {
    id: 12,
    name: 'High Protein',
  },
  {
    id: 13,
    name: 'High Fiber',
  },
  {
    id: 14,
    name: 'High Iron',
  },
  {
    id: 15,
    name: 'High Potassium',
  },
  {
    id: 16,
    name: 'High Calcium',
  },
  {
    id: 17,
    name: 'High Vitamin C',
  },
]

const Filters = () => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const [isExpanded, setExpanded] = useState(false)
  const height = useSharedValue(0);
  const storeCategories = useSelector(state => state.categories.filters)
  const [filters, setFilters] = useState(storeCategories)

  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value),
      marginHorizontal: withTiming(height.value === 0 ? 0 : 16),
    };
  });

  const handleExpand = () => {
    setExpanded(!isExpanded);
    height.value = height.value === 0 ? 250 : 0;
  }

  const handleCategory = async (category) => {
    const isSelected = filters.includes(category.name);
    if (isSelected) {
      setFilters(filters.filter((filter) => filter !== category.name))
    } else {
      setFilters([...filters, category.name])
    }
  };

  const applyFilters = async () => {
    try {
      dispatch(addCategory(filters));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={[!storeCategories ? styles.categoryContainer : null, styles.container]}>
      <ExpandButton isExpanded={isExpanded} colors={colors} handleExpand={handleExpand} />
      <View style={{ flex: 0, gap: 12, alignContent: 'center', justifyContent: 'center' }}>
        <Animated.View style={[style, { flex: 0, overflow: 'hidden', backgroundColor: 'rgba(255, 255, 255, 1)', alignContent: 'center', borderRadius: 6, gap: 12 }]}>
          <View style={[styles.categoryWrapper, { backgroundColor: colors.primary }]}>
            {categories.map((category) => {
              return (
                <CategoryButton
                  key={category.id}
                  isSelected={filters.includes(category.name)}
                  category={category}
                  colors={colors}
                  handleCategory={handleCategory}
                />
              )
            })}
          </View>
        </Animated.View>
        {isExpanded ? <Button disabled={filters === storeCategories} onPress={applyFilters} containerStyle={{ flex: 0, alignItems: 'center' }} buttonStyle={{ width: '33%', backgroundColor: colors.accent }} title='filter' /> : null}
      </View>
      <View style={[storeCategories.length ? { flex: 0, marginTop: 12 } : { display: 'none' }, styles.categoryListWrapper]}>
        <Text style={[styles.title, { color: colors.text }]}>Filters:</Text>
        {storeCategories.map((category, index) => {
          return (
            <Text key={index} style={[styles.categoryButton, { color: colors.primary, backgroundColor: colors.accent }]}>{category}</Text>
          )
        }
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginBottom: 12
  },
  categoryContainer: {
    flex: 0,
    gap: 12
  },
  categoryListWrapper: {
    flexDirection: 'row',
    gap: 6,
    marginHorizontal: 16
  },
  categoryWrapper: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 6,
    flexDirection: 'row',
    padding: 12,
    overflow: 'hidden',
  },
  categoryButton: {
    fontSize: 12,
    textAlignVertical: 'center',
    paddingHorizontal: 6,
    borderRadius: 50
  },
  title: {
    fontWeight: '500',
  }
});

export default Filters