import React, {  useState } from 'react'
import { View, Text } from 'react-native'
import { useTheme } from '@react-navigation/native'
import { Button } from 'react-native-elements'
import Icon from '@expo/vector-icons/Ionicons'
import Animated, { FadeInUp, FadeOutDown, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import ExpandIcon from '@expo/vector-icons/MaterialIcons';
import { addCategory, removeCategory } from '../../redux/features/categories/categoriesSlice'
import { categoriesLoading } from '../../redux/features/categories/categoriesSlice'
import { useSelector, useDispatch } from 'react-redux'

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

  const style = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value),
      marginHorizontal: withTiming(height.value === 0 ? 0 : 16),
    };
  });

  const handleExpand = () => {
    setExpanded(!isExpanded);
    height.value = height.value === 0 ? 300 : 0;
  }

  const handleCategory = async (category) => {
    const isSelected = storeCategories.includes(category.name);
    dispatch(categoriesLoading(true));
    try {
      if (isSelected) {
        dispatch(removeCategory(category.name));
      } else {
        dispatch(addCategory(category.name));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(categoriesLoading(false));
    }
  };

  return (
    <View style={[!storeCategories ? {flex: 0, gap: 12} : null, {overflow: 'hidden', marginVertical: 6}]}>
      <Button iconRight icon={<ExpandIcon style={isExpanded ? { transform: [{ rotate: '180deg' }] } : null} name='expand-more' size={24} />} titleStyle={{ color: colors.text }} type='clear' title='Categorías' buttonStyle={{ overflow: 'hidden' }} onPress={handleExpand} />
      <Animated.View style={[style, { flex: 0, overflow: 'hidden', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', backgroundColor: colors.primary, alignContent: 'center', gap: 6, borderRadius: 6 }]}>
        {categories.map((category, index) => {
          const isSelected = storeCategories.includes(category.name);
          return (
            <Button
              raised
              key={index}
              onPress={() => handleCategory(category)}
              title={category.name}
              containerStyle={{ overflow: 'hidden', borderRadius: 50 }}
              icon={<Icon name={category.icon} size={16} color={colors.accent} />}
              buttonStyle={[{ backgroundColor: isSelected ? colors.accent : colors.background, borderRadius: 50, borderColor: colors.accent }]}
              titleStyle={{ color: isSelected ? 'white' : colors.text, fontSize: 12, textTransform: 'capitalize' }}
              type="outline"
            />
          )
        })}
      </Animated.View>
      <View style={[storeCategories.length ? {flex: 0, marginTop: 12} : {display: 'none'}, {flexDirection: 'row', gap: 6, marginHorizontal: 16}]}>
        <Text style={{fontWeight: '500', color: colors.text}}>Filters:</Text>
        {storeCategories.map((category, index) => {
          return (
            <Text style={{color: colors.primary, fontSize: 12, textAlignVertical: 'center', backgroundColor: colors.accent, paddingHorizontal: 6, borderRadius: 50}} key={index}>{category}</Text>
          )
        }
        )}
      </View>
    </View>
  )
}

export default Filters