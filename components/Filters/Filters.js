import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Button } from 'react-native-elements'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { addCategory, removeCategory } from '../../redux/features/categories/categoriesSlice'
import { categoriesLoading } from '../../redux/features/categories/categoriesSlice'
import { useSelector, useDispatch } from 'react-redux'
import ExpandButton from './ExpandButton'
import CategoryButton from './CategoryButton'

const categories = [
  {
    id: 1,
    name: 'Vegan',
    icon: 'leaf',
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
  {
    id: 18,
    name: 'High Vitamin D',
  },
  {
    id: 19,
    name: 'High Vitamin B12',
  },
  {
    id: 20,
    name: 'High Vitamin A',
  },
  {
    id: 21,
    name: 'High Vitamin K',
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
    height.value = height.value === 0 ? 400 : 0;
  }

  const handleCategory = async (category) => {
    const isSelected = filters.includes(category.name);
    if (isSelected) {
      setFilters(filters.filter((filter) => filter !== category.name))
    } else {
      setFilters([...filters, category.name])
    }
  };

  const applyFilters = () => {
    dispatch(categoriesLoading(true));
    try {
      dispatch(addCategory(filters));
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(categoriesLoading(false));
    }
  }

  // const applyFilters = () => {
  //   const isSelected = storeCategories.includes(category.name);
  //   dispatch(categoriesLoading(true));
  //   try {
  //     if (isSelected) {
  //       dispatch(removeCategory(category.name));
  //     } else {
  //       dispatch(addCategory(category.name));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     dispatch(categoriesLoading(false));
  //   }
  // }

  console.log(filters.length)

  return (
    <View style={[!storeCategories ? styles.categoryContainer : null, styles.container]}>
      <ExpandButton isExpanded={isExpanded} colors={colors} handleExpand={handleExpand} />
      <Animated.View style={[style, { flex: 0, overflow: 'hidden', alignItems: 'center', backgroundColor: colors.primary, alignContent: 'center', borderRadius: 6, padding: 12 }]}>
        <View style={styles.categoryWrapper}>
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
        <Button disabled={filters.length === 0 || filters === storeCategories} onPress={applyFilters} buttonStyle={{ backgroundColor: colors.accent, paddingHorizontal: 32 }} title='filter' />
      </Animated.View>
      <View style={[storeCategories.length ? { flex: 0, marginTop: 12 } : { display: 'none' }, styles.categoryListWrapper]}>
        <Text style={[styles.title, { color: colors.text }]}>Filters:</Text>
        {storeCategories.map((category) => {
          return (
            <Text style={[styles.categoryButton, { color: colors.primary, backgroundColor: colors.accent }]} key={category.id}>{category}</Text>
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
    alignItems: 'center',
    gap: 6,
    flexDirection: 'row'
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