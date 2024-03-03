import * as React from "react";
import { SearchBar } from "@rneui/base";
import { updateSearchQuery, searchLoading } from '../../redux/features/search/searchSlice';
import { useDispatch } from 'react-redux';
import { useDebouncedCallback } from "use-debounce";
import { useTheme } from '@react-navigation/native';

export default Search = () => {
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
    <SearchBar
      platform="default"
      inputContainerStyle={{ backgroundColor: colors.background, borderRadius: 50, paddingHorizontal: 6 }}
      containerStyle={{ paddingHorizontal: 32, backgroundColor: colors.primary, borderBottomWidth: 0, borderTopWidth: 0 }}
      onChangeText={(newValue) => {
        setValue(newValue);
        debounced(newValue);
        dispatch(searchLoading(true))
      }}
      onClearText={() => console.log(onClearText())}
      placeholder="Buscar..."
      placeholderTextColor="#888"
      showCancel
      cancelButtonTitle="Cancel"
      cancelButtonProps={{}}
      onCancel={() => handleCancel}
      value={value}
    />
  );
}
