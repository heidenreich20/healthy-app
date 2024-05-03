import React, { useState } from 'react'
import { View, StyleSheet, Switch, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Button } from 'react-native-elements'
import { addCategory, toggleVegan } from '../../redux/features/categories/categoriesSlice'
import { useSelector, useDispatch } from 'react-redux'
import CategoryButton from './CategoryButton'

const categories = [
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
    name: "High Magnesium"
  }
]

const Filters = ({ navigation }) => {
  const dispatch = useDispatch()
  const { colors } = useTheme()
  const storeCategories = useSelector(state => state.categories.filters)
  const vegan = useSelector(state => state.categories.vegan)
  const [filters, setFilters] = useState(storeCategories)
  const [veganFilter, setVeganFilter] = useState(vegan)

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
      if (veganFilter !== vegan) {
        dispatch(toggleVegan())
      }
      dispatch(addCategory(filters));
    } catch (error) {
      console.log(error);
    } finally {
      navigation.goBack()
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <View style={{ flex: 0, justifyContent: 'center'}}>
        <View style={[styles.veganContainer, {backgroundColor: colors.background, borderBottomColor: colors.accent}]}>
          <Text style={{color: '#3e3e3e', fontWeight: '400', fontSize: 16}}>Vegano</Text>
          <Switch
          style={{width: 50}}
            trackColor={{ false: '#767577', true: colors.accent }}
            thumbColor='white'
            ios_backgroundColor="#3e3e3e"
            onValueChange={() => setVeganFilter(!veganFilter)}
            value={veganFilter}
          />
        </View>
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
        <Button disabled={filters === storeCategories && veganFilter === vegan} onPress={applyFilters} containerStyle={{ flex: 0, alignItems: 'center', marginTop: 24 }} buttonStyle={{ width: '33%', backgroundColor: colors.accent }} title='filter' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    marginBottom: 12
  },
  veganContainer: {
    flex: 0, 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 12, 
    borderBottomWidth: 1, 
  },
  // categoryContainer: {
  //   flex: 1,
  //   gap: 12,
  // },
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