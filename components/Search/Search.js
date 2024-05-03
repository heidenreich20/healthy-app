import * as React from "react";
import { View } from 'react-native';
import { SearchBar } from "@rneui/base";
import { updateSearchQuery, searchLoading } from '../../redux/features/search/searchSlice';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from "use-debounce";
import { useTheme } from '@react-navigation/native';
import Filters from '../Filters/Filters';
import { Button } from 'react-native-elements';
import Feather from '@expo/vector-icons/Feather';

export default Search = ({ navigation }) => {
  const { colors } = useTheme()
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch()

  const debounced = useDebouncedCallback(
    (value) => {
      dispatch(updateSearchQuery(value))
      dispatch(searchLoading(false))
    },
    400
  );

  const handleCancel = () => {
    setValue(""),
      dispatch(updateSearchQuery(""))
  }

  return (
    <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.accent}}>
      <Button containerStyle={{marginLeft: 6}} titleStyle={{color: 'white', marginLeft: 4}} type='clear' title='Filters' icon={<Feather color='white' name='sliders' size={18} />} onPress={() => navigation.navigate('Filters')} />
      <SearchBar
        platform="default"
        inputContainerStyle={{ backgroundColor: colors.background, borderRadius: 50, paddingHorizontal: 6 }}
        containerStyle={{ flex: 1, backgroundColor: 'transparent', marginRight: 6, borderBottomWidth: 0, borderTopWidth: 0 }}
        onChangeText={(newValue) => {
          setValue(newValue);
          debounced(newValue);
          dispatch(searchLoading(true))
        }}
        onClearText={() => console.log(onClearText())}
        placeholder="Search..."
        placeholderTextColor="#888"
        showCancel
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        onCancel={() => handleCancel}
        value={value}
      />
    </View>
  );
}
