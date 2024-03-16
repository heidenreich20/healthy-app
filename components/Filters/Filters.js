import React, { useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Button } from 'react-native-elements'
import { addCategory } from '../../redux/features/categories/categoriesSlice'
import { useSelector, useDispatch } from 'react-redux'
import CategoryButton from './CategoryButton'

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
    name: 'High Vitamin K1',
  },
  {
    id: 22,
    name: 'High Iron',
  }
]

const Filters = ({ navigation }) => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const storeCategories = useSelector(state => state.categories.filters)
  const [filters, setFilters] = useState(storeCategories)

  const handleCategory = (category) => {
    const isSelected = filters.includes(category.name);
    if (isSelected) {
      setFilters(filters.filter((filter) => filter !== category.name))
    } else {
      setFilters([...filters, category.name])
    }
  };

  const applyFilters = () => {
    try {
      dispatch(addCategory(filters));
    } catch (error) {
      console.log(error);
    } finally {
      navigation.goBack()
    }
  }

  return (
    <View style={{flex: 1}}>
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: colors.primary }}>
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
          <Button disabled={filters === storeCategories} onPress={applyFilters} containerStyle={{ flex: 0, alignItems: 'center' }} buttonStyle={{ width: '33%', backgroundColor: colors.accent }} title='filter' />
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
    gap: 12,
  },
  categoryListWrapper: {
    flexDirection: 'row',
    gap: 6,
    marginHorizontal: 16,
  },
  categoryWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    gap: 6,
    flexDirection: 'row',
    padding: 12,
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